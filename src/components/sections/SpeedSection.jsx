import {
  LayoutGrid,
  PlusCircle,
  CreditCard,
  Check,
  UtensilsCrossed,
  Printer,
  Monitor,
  Lock,
} from "lucide-react";
import KDSDemo from "@/components/demos/KDSDemo";

export default function SpeedSection() {
  const steps = [
    {
      number: "01",
      badge: "Salón y Mesas",
      hotkey: "M",
      title: "Mapa visual con tiempo de espera",
      description:
        "Mirá qué mesas están comiendo, cuáles esperan la comida y quiénes pidieron la cuenta. Cronómetro en vivo para rotar el salón.",
      icon: LayoutGrid,
      detail: "Abrí mesas en un toque y asigná comensales con rapidez.",
    },
    {
      number: "02",
      badge: "Comandas y Cocina",
      hotkey: "F8",
      title: "Cargá platos y notas al instante",
      description:
        "Buscador rápido sin pantallas molestas. Marcá puntos de carne, adicionales o salsas para que salgan exactos en el KDS de cocina.",
      icon: PlusCircle,
      detail: "Se despacha a las pantallas o comanderas térmicas en 1 segundo.",
    },
    {
      number: "03",
      badge: "Cobro Ágil",
      hotkey: "F9",
      title: "Cobrá y liberá la mesa al toque",
      description:
        "Dividí cuentas entre amigos, cobrá con QR, tarjetas o efectivo con cálculo automático de vuelto. Imprimí el ticket en un segundo.",
      icon: CreditCard,
      detail: "Compatible con cualquier impresora térmica universal.",
    },
  ];

  return (
    <section id="operativa" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#faf9f8] border border-zinc-200/90 text-xs font-semibold text-[#e85d45] mb-4 shadow-2xs">
            <LayoutGrid className="w-3.5 h-3.5" />
            <span>Operativa de Alto Rendimiento</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-950 mb-5 leading-tight text-balance">
            Un sábado a las 22:30 nadie tiene tiempo de pelearse con el sistema.
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 font-light leading-relaxed text-balance">
            Eliminamos pasos innecesarios. Tu equipo domina el salón y la terminal de comandas en menos de 5 minutos de capacitación.
          </p>
        </div>

        {/* 3 Step Benefit Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-[#faf9f8] border border-zinc-200/80 p-6 sm:p-7 flex flex-col justify-between hover:border-zinc-300 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-white border border-zinc-200 flex items-center justify-center text-[#e85d45] shadow-xs group-hover:scale-105 transition-transform duration-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] text-zinc-500 flex items-center gap-1.5 font-medium">
                        Atajo <kbd className="kbd-keycap text-[#e85d45]">{step.hotkey}</kbd>
                      </span>
                      <span className="font-serif text-2xl font-bold text-zinc-300 tabular-nums">
                        {step.number}
                      </span>
                    </div>
                  </div>

                  <span className="text-[11px] font-bold text-[#e85d45] uppercase tracking-wider block mb-1 font-mono">
                    {step.badge}
                  </span>

                  <h3 className="font-serif text-xl font-bold text-zinc-900 mb-2">
                    {step.title}
                  </h3>

                  <p className="text-sm text-zinc-600 leading-relaxed font-light mb-6">
                    {step.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-zinc-200/60">
                  <p className="text-xs text-zinc-600 font-medium flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-[#10b981] shrink-0" />
                    <span>{step.detail}</span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Kitchen Flexibility Showcase with Real Procedural KDS - Doppelrand Enclosure */}
        <div className="rounded-2xl sm:rounded-3xl bg-[#09090b] text-white border border-zinc-800 p-6 sm:p-8 relative overflow-hidden shadow-2xl doppel-bezel-dark">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            
            {/* Left Description */}
            <div className="lg:col-span-5 space-y-4">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#e85d45] uppercase tracking-wider font-mono">
                <UtensilsCrossed className="w-4 h-4" />
                <span>Flexibilidad para tu Cocina</span>
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight text-balance">
                ¿Pantallas en cocina o papel tradicional? <br />
                <span className="text-[#e85d45]">Vos elegís cómo trabajar.</span>
              </h3>

              <p className="text-sm text-zinc-300 leading-relaxed font-light text-balance">
                Roosty se adapta al ritmo de tu local: podés imprimir comandas de papel térmico al marchar la mesa, usar pantallas táctiles interactivas con semáforo de demoras, o ambas cosas a la vez.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs hover:border-zinc-700 transition-colors shadow-2xs">
                  <div className="flex items-center gap-2 mb-1">
                    <Monitor className="w-4 h-4 text-[#e85d45]" />
                    <span className="font-bold text-white">Pantalla KDS</span>
                  </div>
                  <span className="text-zinc-400 font-light text-[11px]">Semáforo de demoras y aviso al mozo cuando el plato está listo.</span>
                </div>
                <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800 text-xs hover:border-zinc-700 transition-colors shadow-2xs">
                  <div className="flex items-center gap-2 mb-1">
                    <Printer className="w-4 h-4 text-[#e85d45]" />
                    <span className="font-bold text-white">Comandera Térmica</span>
                  </div>
                  <span className="text-zinc-400 font-light text-[11px]">Impresión física clásica en 80mm o 58mm para el riel de despacho.</span>
                </div>
              </div>
            </div>

            {/* Right KDS Procedural Interactive Showcase */}
            <div className="lg:col-span-7">
              <KDSDemo />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
