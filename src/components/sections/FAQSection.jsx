"use client";

import { useState } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      q: "¿Qué es Roosty POS y para qué tipo de locales gastronómicos sirve?",
      a: "Roosty POS es un sistema de punto de venta y software de gestión gastronómica 100% web en la nube diseñado para bares, cervecerías, cafeterías, pizzerías, restaurantes y locales de delivery o takeaway. Unifica el mapa de mesas del salón, la comanda de cocina en pantalla KDS o impresora térmica, la carta digital QR con pedidos por WhatsApp sin comisiones y el arqueo ciego de caja.",
    },
    {
      q: "¿Cómo funcionan el Abono Anual con 2 meses de regalo y la Licencia Founder?",
      a: "Al contratar el Abono Anual congelás tu tarifa por todo un año y te regalamos 2 meses completos sin cargo, evitando cualquier aumento por inflación durante 12 meses. También podés optar por el Abono Mensual sin permanencia, o consultar disponibilidad para la Licencia Founder de pago único de por vida con cupos limitados.",
    },
    {
      q: "¿Tengo que instalar algún programa o comprar computadoras caras?",
      a: "No. Roosty funciona directamente en internet desde cualquier navegador. Podés usar las computadoras que ya tengas en el local, tablets Android, iPads, notebooks o incluso los celulares de tus mozos. No necesitás comprar equipos especiales.",
    },
    {
      q: "¿Qué impresoras térmicas puedo usar para comandas y tickets?",
      a: "Podés usar cualquier impresora térmica estándar del mercado de 80mm o 58mm que se conecte por USB, cable de red o Bluetooth. El sistema imprime directo desde el navegador sin instalar controladores raros.",
    },
    {
      q: "¿Cómo es el Menú QR para los clientes del local?",
      a: "Tu negocio tiene su propio enlace personalizado con tu logo, fotos y colores. Tus clientes pueden ver los platos destacados, elegir adicionales interactivos como salsas, guarniciones o puntos de carne, pedir por WhatsApp y seguir el estado de su comida en tiempo real con 0% de comisiones.",
    },
    {
      q: "¿Cómo cargo los platos y precios de mi local al sistema?",
      a: "Podés crearlos vos mismo en minutos desde el panel de control o nuestro equipo de soporte carga toda tu carta gratis a partir de una foto de tu menú, un PDF o una lista antes de tu primer turno.",
    },
    {
      q: "¿Qué opciones tengo para el despacho en cocina?",
      a: "Vos elegís: podés colocar una tablet o monitor en cocina para ver las comandas en pantalla táctil con avisos de demora, imprimir el ticket tradicional de papel térmico al enviar la mesa, o usar ambas cosas juntas.",
    },
    {
      q: "¿Cómo me aseguro de que la caja cierre sin diferencias?",
      a: "El sistema no permite cobrar si no se abrió el turno con su fondo inicial en efectivo. Al cerrar, el cajero declara lo que contó y el sistema concilia ventas en efectivo, tarjetas y pagos por QR, avisándote si hubo faltantes o sobrantes y permitiéndote exportar el reporte a Excel.",
    },
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (No AI pill, direct bold title) */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-950 mb-5 leading-tight">
            Preguntas Frecuentes
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed">
            Todo lo que necesitás saber antes de empezar a operar con Roosty POS.
          </p>
        </div>

        {/* Accordion list */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? "border-zinc-300 bg-[#faf9f8] shadow-xs"
                    : "border-zinc-200/80 bg-white hover:border-zinc-300"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full py-5 px-6 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-zinc-900 leading-snug">
                    {faq.q}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 bg-[#e85d45] text-white" : "bg-zinc-100 text-zinc-600"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-zinc-600 leading-relaxed border-t border-zinc-200/40 font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-[#faf9f8] border border-zinc-200/80">
          <p className="text-sm text-zinc-700 font-medium mb-2">
            ¿Tenés alguna consulta sobre el flujo particular de tu local o la oferta Founder?
          </p>
          <a
            href={SITE_CONFIG.urls.whatsappSales}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold text-[#e85d45] hover:text-[#d44c34] inline-flex items-center gap-1.5"
          >
            <span>Chatear con un asesor gastronómico por WhatsApp</span>
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
