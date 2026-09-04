"use client";

import {
  Lock,
  FileSpreadsheet,
  Calculator,
  BookOpen,
  DollarSign,
} from "lucide-react";
import CashierAuditDemo from "@/components/demos/CashierAuditDemo";

export default function FinanceSection() {
  const benefits = [
    {
      icon: Lock,
      title: "Control desde que abrís la persiana",
      description:
        "Nadie puede abrir mesas ni cobrar si no se abrió el turno con su fondo inicial en efectivo. Cada movimiento queda registrado a nombre del responsable.",
    },
    {
      icon: Calculator,
      title: "Arqueo ciego sin diferencias dudosas",
      description:
        "El cajero cuenta y declara los billetes que tiene en mano sin ver el teórico. El sistema calcula en el acto si la caja cuadra perfecta.",
    },
    {
      icon: BookOpen,
      title: "Libro diario de ingresos y gastos",
      description:
        "Anotá salidas menores de dinero (pago a proveedores de verdura, hielo o retiros) en dos clics para que la cuenta final sea exacta.",
    },
    {
      icon: FileSpreadsheet,
      title: "Exportá tus reportes a Excel",
      description:
        "Descargá el balance de ventas, desglose de cobros (efectivo, QR, tarjetas) e imprimí el ticket de cierre de turno para tu contador.",
    },
  ];

  return (
    <section id="finanzas" className="py-20 md:py-28 bg-[#09090b] text-zinc-100 relative overflow-hidden border-t border-zinc-800">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -right-40 w-96 h-96 bg-[#e85d45]/8 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute bottom-10 -left-40 w-96 h-96 bg-emerald-500/5 blur-[130px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14 md:mb-18">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-[#e85d45] mb-4 shadow-2xs">
            <DollarSign className="w-3.5 h-3.5" />
            <span>Control Financiero & Arqueo Ciego</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-5 leading-tight">
            La caja cierra sola. <br />
            <span className="text-[#e85d45]">Vos solo contás la plata.</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 font-light leading-relaxed">
            Se acabaron las horas buscando diferencias entre tickets arrugados a las 3 de la mañana. Roosty concilia efectivo, transferencias y tarjetas de forma transparente con auditoría en vivo.
          </p>
        </div>

        {/* 2 Column Layout: Bullets on Left + Real Cashier & Libro Diario Demo on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: 4 Real Financial Features */}
          <div className="lg:col-span-5 space-y-3.5">
            {benefits.map((b, i) => {
              const Icon = b.icon;
              return (
                <div
                  key={i}
                  className="p-4 sm:p-5 rounded-2xl bg-[#121214] border border-zinc-800/90 hover:border-zinc-700 transition-colors"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#e85d45] shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-serif text-sm sm:text-base font-bold text-white mb-1">
                        {b.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed font-light">
                        {b.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Real Procedural Cierre de Caja & Libro Diario Demo */}
          <div className="lg:col-span-7">
            <CashierAuditDemo />
          </div>

        </div>

      </div>
    </section>
  );
}
