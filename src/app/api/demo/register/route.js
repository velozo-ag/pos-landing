import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();

    // URL base del backend POS (Spring Boot)
    const rawApiUrl =
      process.env.INTERNAL_API_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      'http://localhost:8080/api/v1';

    const backendBase = rawApiUrl.replace(/\/+$/, '');
    const endpoint = `${backendBase}/demo/register`;

    // Conexión server-to-server desde Next.js hacia Spring Boot en localhost:8080
    const backendResponse = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(body),
    });

    let json;
    try {
      json = await backendResponse.json();
    } catch (parseError) {
      console.error('Error parseando respuesta del backend como JSON:', parseError);
      return NextResponse.json(
        {
          success: false,
          message:
            'El servicio de registro respondió de forma inesperada. Por favor comunicate por WhatsApp o intentá nuevamente en unos minutos.',
          errorCode: 'INVALID_BACKEND_RESPONSE',
        },
        { status: 502 }
      );
    }

    // Adaptación EXCLUSIVA para pruebas en red local (LAN) en desarrollo
    // Solo si el host del cliente es una IP privada (ej: 192.168.x.x o .local)
    // En dominios públicos (roosty.site, roosty.com.ar, etc.) jamás se tocan las URLs
    if (json?.success && json?.data) {
      const hostHeader = request.headers.get('host') || '';
      const clientHost = hostHeader.split(':')[0];
      const isLanIp =
        /^(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/.test(clientHost) ||
        clientHost.endsWith('.local');

      if (isLanIp) {
        if (json.data.adminUrl) {
          json.data.adminUrl = json.data.adminUrl.replace(
            /localhost|127\.0\.0\.1/,
            clientHost
          );
        }
        if (json.data.menuUrl) {
          json.data.menuUrl = json.data.menuUrl.replace(
            /localhost|127\.0\.0\.1/,
            clientHost
          );
        }
      }
    }

    return NextResponse.json(json, {
      status: backendResponse.status,
    });
  } catch (error) {
    console.error('Error en proxy /api/demo/register:', error);
    return NextResponse.json(
      {
        success: false,
        message:
          'No pudimos conectar con el servicio de registro en este momento. Por favor contactanos por WhatsApp para activarlo de inmediato o intentá nuevamente en unos minutos.',
        errorCode: 'BACKEND_CONNECTION_ERROR',
      },
      { status: 502 }
    );
  }
}
