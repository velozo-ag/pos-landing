import Navbar from "@/components/layout/Navbar";
import FAQSection from "@/components/sections/FAQSection";
import FooterCTA from "@/components/layout/FooterCTA";
import { MessageCircle, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata = {
  title: "Preguntas Frecuentes — Hardware, Menú QR, Precios y Caja",
  description:
    "Respondemos todas las dudas sobre Roosty POS: qué es Roosty POS, compatibilidad con impresoras térmicas de 80mm y 58mm, menús QR sin comisiones, cocina KDS, arqueo ciego de caja y planes.",
  alternates: {
    canonical: "https://pos.roosty.com.ar/faq",
  },
  openGraph: {
    title: "Preguntas Frecuentes | Roosty POS",
    description: "Centro de ayuda y dudas frecuentes sobre el software gastronómico Roosty POS.",
    url: "https://pos.roosty.com.ar/faq",
    images: [
      {
        url: "/og-roosty-pos.png",
        width: 1200,
        height: 630,
        type: "image/png",
        alt: "Roosty POS Preguntas Frecuentes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Preguntas Frecuentes | Roosty POS",
    description: "Centro de ayuda y dudas frecuentes sobre el software gastronómico Roosty POS.",
    images: ["/og-roosty-pos.png"],
  },
};

export default function FAQPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Inicio",
            "item": "https://pos.roosty.com.ar",
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Preguntas Frecuentes",
            "item": "https://pos.roosty.com.ar/faq",
          },
        ],
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "¿Qué es Roosty POS y para qué tipo de locales gastronómicos sirve?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Roosty POS es un sistema de punto de venta y software de gestión gastronómica 100% web en la nube diseñado para bares, cervecerías, cafeterías, pizzerías, restaurantes y locales de delivery o takeaway. Unifica el mapa de mesas del salón, la comanda de cocina en pantalla KDS o impresora térmica, la carta digital QR con pedidos por WhatsApp sin comisiones, las cuentas de personal con Roles y Permisos y el arqueo ciego de caja.",
            },
          },
          {
            "@type": "Question",
            "name": "¿Cómo funcionan el Abono Anual con 2 meses de regalo y la Licencia Founder?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Al contratar el Abono Anual congelás tu tarifa por todo un año y recibís 2 meses completos de regalo. También podés elegir el Abono Mensual sin permanencia o consultar por los cupos limitados de la Licencia Founder de pago único de por vida.",
            },
          },
          {
            "@type": "Question",
            "name": "¿Tengo que instalar algún programa o comprar computadoras caras?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "No. Roosty POS funciona 100% en la nube desde cualquier navegador web. Podés usar las computadoras que ya tengas en el local, notebooks, tablets Android, iPads o los celulares de tus mozos.",
            },
          },
          {
            "@type": "Question",
            "name": "¿Qué impresoras térmicas puedo usar para comandas y tickets?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Podés usar cualquier impresora térmica estándar del mercado de 80mm o 58mm conectada por USB, cable de red LAN, Wi-Fi o Bluetooth.",
            },
          },
          {
            "@type": "Question",
            "name": "¿Cómo es el Menú QR para los clientes del local?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Tu negocio recibe su propio subdominio personalizado bajo roosty.site con tu logo, fotos y colores. Tus clientes eligen adicionales en vivo y envían su pedido directo a tu WhatsApp y a tu pantalla POS con 0% de comisiones.",
            },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden w-full max-w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
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
