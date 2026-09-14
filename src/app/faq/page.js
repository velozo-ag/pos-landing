import Navbar from "@/components/layout/Navbar";
import FAQSection from "@/components/sections/FAQSection";
import FooterCTA from "@/components/layout/FooterCTA";
import { MessageCircle, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata = {
  title: "Preguntas Frecuentes",
  description:
    "Respondemos todas las dudas sobre Roosty POS: hardware de impresión, menús QR, cocina KDS, arqueo de caja y licencias de por vida.",
  alternates: {
    canonical: "https://roosty.site/faq",
  },
  openGraph: {
    title: "Preguntas Frecuentes | Roosty POS",
    description: "Centro de ayuda y dudas frecuentes sobre el software gastronómico Roosty POS.",
    url: "https://roosty.site/faq",
    images: [
      {
        url: "/roosty2.png",
        width: 1200,
        height: 630,
        alt: "Roosty POS Preguntas Frecuentes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preguntas Frecuentes | Roosty POS",
    description: "Centro de ayuda y dudas frecuentes sobre el software gastronómico Roosty POS.",
    images: ["/roosty2.png"],
  },
};

export default function FAQPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden w-full max-w-full">
      <Navbar />

      <main className="flex-1 pt-32 pb-20 md:pt-36 w-full max-w-full overflow-x-hidden">
        
        {/* Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-4 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 mb-5 leading-tight">
            Todo lo que necesitás <br className="hidden sm:inline" />
            <span className="text-[#e85d45]">saber antes de empezar.</span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 max-w-2xl mx-auto font-normal leading-relaxed">
            Revisá las dudas más comunes sobre compatibilidad de impresoras, licencias de por vida y puesta en marcha de tu local.
          </p>
        </div>

        {/* FAQ Accordion Section */}
        <FAQSection />

        {/* Direct WhatsApp Support Banner */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
          <div className="p-8 rounded-3xl bg-zinc-900 text-white border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xl">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#e85d45] uppercase tracking-wider mb-2">
                <MessageCircle className="w-4 h-4" />
                <span>Atención Personalizada</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mb-1">
                ¿Tenés una consulta específica sobre tu local?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 font-light">
                Nuestro equipo gastronómico te asesora sin compromiso sobre hardware, cartas y planes.
              </p>
            </div>

            <a
              href={SITE_CONFIG.urls.whatsappSales}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-xs sm:text-sm font-bold text-white bg-[#e85d45] hover:bg-[#d44c34] shadow-md shadow-[#e85d45]/30 transition-all hover:scale-105"
            >
              <span>Chatear por WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

      </main>

      <FooterCTA />
    </div>
  );
}
