import {
  QrCode,
  Smartphone,
  Send,
  Activity,
  UtensilsCrossed,
  Zap,
  ShieldCheck,
  Calculator,
} from "lucide-react";

export default function FeaturesGrid() {
  const features = [
    {
      icon: QrCode,
      tag: "Tu Identidad",
      title: "Carta Digital con tu Marca",
      description:
        "Tus clientes entran a tu propio subdominio con tu logo, banner panorámico y colores de marca. Cero diseños genéricos.",
      badge: "Subdominio propio",
    },
    {
      icon: Smartphone,
      tag: "Menú Interactivo",
      title: "Adicionales y Modificadores",
      description:
        "Tus comensales eligen extras (doble queso, salsas, guarniciones) o puntos de cocción con precio recalculado al instante.",
      badge: "Cero errores",
    },
    {
      icon: Send,
      tag: "Venta Online",
      title: "Pedidos Directos por WhatsApp",
      description:
        "Pedidos para Delivery o Retiro con cálculo de vuelto en efectivo que ingresan directo a tu pantalla y a tu WhatsApp.",
      badge: "0% comisiones",
    },
    {
      icon: Activity,
      tag: "Salón en Vivo",
      title: "Control de Mesas y Mozos",
      description:
        "Mapa de salón en tiempo real con cronómetros por mesa. Asignación rápida de mozos y control de cuentas abiertas.",
      badge: "Rotación ágil",
    },
    {
      icon: UtensilsCrossed,
      tag: "Cocina & KDS",
      title: "Comandas Táctiles o Impresas",
      description:
        "Elegí entre visor táctil interactivo con semáforos de demora o impresión térmica en papel para el riel de cocina.",
      badge: "A tu medida",
    },
    {
      icon: Zap,
      tag: "Mostrador",
      title: "Venta Rápida sin Vueltas",
      description:
        "Para cafeterías, heladerías y comida al paso: cobro en 1 toque y despacho inmediato sin necesidad de asignar mesa.",
      badge: "Despacho veloz",
    },
    {
      icon: Calculator,
      tag: "Control Total",
      title: "Arqueo de Caja y Libro de Gastos",
      description:
        "El dinero que ingresa por salón, delivery y barra coincide siempre con lo declarado. Registro de gastos y exportación a Excel.",
      badge: "Cuentas claras",
    },
    {
      icon: ShieldCheck,
      tag: "Seguridad",
      title: "Permisos y PINs por Empleado",
      description:
        "Asigná accesos para mozos, cajeros y encargados. Evitá anulaciones o descuentos que no hayan sido aprobados por vos.",
      badge: "Protección antifraude",
    },
  ];

  return (
    <section id="modulos" className="scroll-mt-24 py-20 md:py-28 bg-[#faf9f8] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-950 mb-5 leading-tight text-balance">
            Salón, cocina, caja y menú digital <br className="hidden sm:inline" />
            <span className="text-[#e85d45]">sin pagar software por separado.</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed text-balance">
            Unificá toda tu operación en un solo sistema web ágil que no te cobra comisiones por cada plato vendido ni te ata a contratos.
          </p>
        </div>

        {/* Bento Grid (8 blocks) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {features.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="rounded-2xl bg-white border border-zinc-200/90 p-6 flex flex-col justify-between hover:shadow-md hover:border-zinc-300 hover:-translate-y-1 transition-all duration-200 group shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#faf9f8] border border-zinc-200/80 flex items-center justify-center text-[#e85d45] group-hover:bg-[#e85d45] group-hover:text-white transition-all duration-200 shadow-2xs">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-zinc-500 bg-zinc-100/90 px-2.5 py-0.5 rounded border border-zinc-200/80">
                      {item.badge}
                    </span>
                  </div>

                  <span className="font-mono text-[11px] font-bold text-[#e85d45] uppercase tracking-wider block mb-1">
                    {item.tag}
                  </span>

                  <h3 className="font-serif text-lg font-bold text-zinc-950 mb-2 leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
