import Navbar from "@/components/layout/Navbar";
import ComparisonTable from "@/components/sections/ComparisonTable";
import FooterCTA from "@/components/layout/FooterCTA";
import Link from "next/link";
import { Zap, Globe, Printer } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata = {
  title: "Comparativa — Roosty POS vs Sistemas Tradicionales",
  description:
    "Compará Roosty POS frente a los sistemas gastronómicos tradicionales: hardware, velocidad de salón, comisiones de menú QR y puesta en marcha.",
  alternates: {
    canonical: "https://roosty.site/comparativa",
  },
  openGraph: {
    title: "Comparativa | Roosty POS vs Sistemas Tradicionales",
    description: "Comparativa frente a sistemas obsoletos con servidores locales y hardware propietario.",
    url: "https://roosty.site/comparativa",
  },
};

export default function ComparativaPage() {
  const advantages = [
    {
      icon: Globe,
      title: "100% Web en la Nube",
      description:
        "Sin servidores locales pesados ni técnicos cableando tu salón. Abrís el navegador en cualquier PC o tablet y ya estás facturando.",
    },
    {
      icon: Printer,
      title: "Cero Hardware Propietario",
      description:
        "Usá cualquier impresora térmica estándar de 80mm o 58mm (USB, Red o Bluetooth). No te obligamos a comprar terminales caras.",
    },
    {
      icon: Zap,
      title: "0% de Comisiones en Pedidos",
      description:
        "Tu carta digital con tu logo y tus pedidos por WhatsApp no pagan comisiones ni costos por comensal a intermediarios.",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden w-full max-w-full">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 md:pt-36 w-full max-w-full overflow-x-hidden">
        
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 mb-5 leading-tight">
            Por qué los gastronómicos <br className="hidden sm:inline" />
            <span className="text-[#e85d45]">se están pasando a Roosty.</span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 max-w-3xl mx-auto font-normal leading-relaxed">
            Eliminá los costos fijos inflados, las fallas técnicas en horas pico y los software que cobran por cada pantalla extra.
          </p>
        </div>

        {/* 3 Key Advantage Pillars */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {advantages.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="p-6 rounded-2xl bg-[#faf9f8] border border-zinc-200/80 hover:border-zinc-300 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-[#e85d45] mb-4 shadow-xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-zinc-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Comparison Table Section */}
        <ComparisonTable />

        {/* Final CTA */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center w-full">
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-900 mb-3">
            Migrá tu local en menos de 10 minutos
          </h3>
          <p className="text-sm text-zinc-600 mb-8 max-w-xl mx-auto font-light">
            Nosotros cargamos tu carta actual sin costo para que arranques a operar en tu próximo turno.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/precios"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#e85d45] hover:bg-[#d44c34] shadow-md shadow-[#e85d45]/30 transition-all"
            >
              Ver Planes & Precios
            </Link>
            <a
              href={SITE_CONFIG.urls.saasApp}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-sm font-medium text-zinc-700 bg-white border border-zinc-300 hover:bg-zinc-50 transition-all"
            >
              Probar Demo en Vivo
            </a>
          </div>
        </div>

      </main>

      <FooterCTA />
    </div>
  );
}
