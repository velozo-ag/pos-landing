import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(request) {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Endpoint habilitado únicamente en entorno local de desarrollo." },
      { status: 403 }
    );
  }

  try {
    const { dataUrl } = await request.json();
    if (!dataUrl || !dataUrl.startsWith("data:image/png;base64,")) {
      return NextResponse.json(
        { error: "Formato de imagen inválido" },
        { status: 400 }
      );
    }

    const base64Data = dataUrl.replace(/^data:image\/png;base64,/, "");
    const buffer = Buffer.from(base64Data, "base64");
    const targetPath = path.join(process.cwd(), "public", "og-roosty-pos.png");

    await fs.writeFile(targetPath, buffer);

    return NextResponse.json({
      ok: true,
      path: "/og-roosty-pos.png",
      bytes: buffer.length,
    });
  } catch (err) {
    console.error("Error guardando og-roosty-pos.png:", err);
    return NextResponse.json(
      { error: "No se pudo guardar la imagen en public/og-roosty-pos.png" },
      { status: 500 }
    );
  }
}
