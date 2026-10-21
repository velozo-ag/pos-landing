import Navbar from "@/components/layout/Navbar";
import FuncionalidadesContent from "@/components/sections/FuncionalidadesContent";
import FooterCTA from "@/components/layout/FooterCTA";

export const metadata = {
  title: "Módulos y Funcionalidades — Salón, Menú QR, Cocina KDS y Caja",
  description:
    "Conocé todos los módulos de Roosty POS: Mapa de salón con cronómetros en vivo, Menú Digital QR con 0% comisiones por WhatsApp, Pantalla KDS de cocina e impresión térmica, y Arqueo Ciego de Caja.",
  alternates: {
    canonical: "https://pos.roosty.com.ar/funcionalidades",
  },
  openGraph: {
    title: "Módulos y Funcionalidades | Roosty POS",
    description:
      "Recorré el sistema gastronómico sección por sección: Salón y Mesas, Carta Digital QR, Cocina KDS y Control Financiero.",
    url: "https://pos.roosty.com.ar/funcionalidades",
    images: [
      {
        url: "/roostylogo.png",
        width: 300,
        height: 186,
        alt: "Roosty POS Módulos y Funcionalidades",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Módulos y Funcionalidades | Roosty POS",
    description:
      "Mapa de salón, Menú Digital QR sin comisiones, Cocina KDS y Arqueo Ciego de Caja.",
    images: ["/roostylogo.png"],
  },
};

export default function FuncionalidadesPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f8] selection:bg-[#e85d45]/20 selection:text-[#e85d45]">
      <Navbar />
      <FuncionalidadesContent />
      <FooterCTA />
    </div>
  );
}
