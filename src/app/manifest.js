export default function manifest() {
  return {
    name: "Roosty POS — Sistema Gastronómico y Menú QR",
    short_name: "Roosty POS",
    description:
      "Sistema de Punto de Venta y software de gestión gastronómica 100% web con Menú QR, pedidos por WhatsApp con 0% comisiones, KDS para cocina y arqueo de caja.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf9f8",
    theme_color: "#e85d45",
    icons: [
      {
        src: "/icon-48.png",
        sizes: "48x48",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-96.png",
        sizes: "96x96",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/roostyicon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
