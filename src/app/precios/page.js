import Navbar from "@/components/layout/Navbar";
import PricingSection from "@/components/sections/PricingSection";
import FooterCTA from "@/components/layout/FooterCTA";
import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata = {
  title: "Planes y Precios — Abono Anual, Mensual y Licencia Founder",
  description:
    "Precios claros en pesos argentinos de Roosty POS: Starter Takeaway, Pro Salón y Business Enterprise. Contratá por un año con 2 meses de regalo, elegí abono mensual o consultá por cupos Founder de por vida.",
  alternates: {
    canonical: "https://roosty.site/precios",
  },
  openGraph: {
    title: "Planes y Precios | Roosty POS",
    description:
      "Abono anual con 2 meses de regalo, suscripción mensual o Licencia Founder para restaurantes, bares y cafeterías.",
    url: "https://roosty.site/precios",
    images: [
      {
        url: "/roostylogo.png",
        width: 300,
        height: 186,
        alt: "Roosty POS Planes y Precios",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Planes y Precios | Roosty POS",
    description:
      "Abono anual con 2 meses de regalo, suscripción mensual o Licencia Founder para restaurantes, bares y cafeterías.",
    images: ["/roostylogo.png"],
  },
};

export default function PreciosPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f8] selection:bg-[#e85d45]/20 selection:text-[#e85d45] overflow-x-hidden w-full max-w-full">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 md:pt-36 w-full max-w-full">
        
        {/* Master Pricing Engine */}
        <PricingSection isPreciosPage={true} />

        {/* Direct WhatsApp & FAQ Consultation Banner */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900 text-white border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
            <div className="space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 text-xs font-semibold text-[#e85d45] uppercase tracking-wider">
                <MessageCircle className="w-4 h-4" />
                <span>Asesoramiento Gastronómico</span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
                ¿Tenés dudas sobre cuál es el plan ideal para tu local?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-light max-w-xl leading-relaxed">
                Analizamos el volumen de tu salón y te recomendamos la configuración exacta de comanderas y terminales sin sobrecostos.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
              <Link
                href="/faq"
                className="w-full sm:w-auto text-center px-6 py-3.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-xs sm:text-sm font-semibold text-zinc-200 transition-all"
              >
                Ver Preguntas Frecuentes
              </Link>
              <a
                href={SITE_CONFIG.urls.whatsappSales}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#e85d45] hover:bg-[#d44c34] shadow-md shadow-[#e85d45]/30 transition-all hover:scale-105"
              >
                <span>Chatear por WhatsApp</span>
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

      </main>

      <FooterCTA />
    </div>
  );
}
