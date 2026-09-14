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

    const json = await backendResponse.json();

    // Adaptación para dispositivos en la red local (LAN)
    // Si un usuario accede desde su celular (ej: 192.168.1.X), adaptamos localhost en las URLs de retorno
    // para que el redirect al POS (puerto 5173) y el menú QR funcionen desde ese dispositivo.
    if (json?.success && json?.data) {
      const hostHeader = request.headers.get('host') || '';
      const clientHost = hostHeader.split(':')[0];

      if (
        clientHost &&
        clientHost !== 'localhost' &&
        clientHost !== '127.0.0.1' &&
        !clientHost.endsWith('.roosty.site')
      ) {
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
          'No se pudo conectar con el servidor backend (Spring Boot en localhost:8080). Verificá que esté encendido.',
        errorCode: 'BACKEND_CONNECTION_ERROR',
      },
      { status: 502 }
    );
  }
}
