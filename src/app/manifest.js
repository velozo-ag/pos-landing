export default function manifest() {
  return {
    name: "Roosty POS — Sistema Gastronómico y Menú QR",
    short_name: "Roosty POS",
    description:
      "Sistema de Punto de Venta (POS) y software de gestión gastronómica 100% web con Menú QR, pedidos por WhatsApp con 0% comisiones, KDS para cocina y arqueo de caja.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf9f8",
    theme_color: "#e85d45",
    icons: [
      {
        src: "/roostyicon.png",
        sizes: "64x64",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/roostylogo.png",
        sizes: "300x186",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
