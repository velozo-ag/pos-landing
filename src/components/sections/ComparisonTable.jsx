import { Check, X } from "lucide-react";
import Image from "next/image";

export default function ComparisonTable() {
  const comparisonRows = [
    {
      feature: "Puesta en marcha y acceso",
      roosty: "Listo en 2 min: abrís el navegador en cualquier PC, tablet o celular",
      traditional: "Días de instalación técnica y servidores locales pesados",
      highlight: true,
    },
    {
      feature: "Impresión de comandas y tickets",
      roosty: "Compatible con cualquier impresora térmica 80mm o 58mm",
      traditional: "Obligan a comprar impresoras propietarias caras",
      highlight: false,
    },
    {
      feature: "Carta digital y pedidos online",
      roosty: "Menú interactivo con tu marca y 0% de comisiones por venta",
      traditional: "PDFs ilegibles o aplicaciones externas con comisión",
      highlight: true,
    },
    {
      feature: "Organización de cocina",
      roosty: "Elegís entre pantalla táctil con semáforos de demora o papel",
      traditional: "Solo comandas de papel que se pierden o manchan",
      highlight: false,
    },
    {
      feature: "Cierre de turno y arqueo de caja",
      roosty: "Arqueo ciego exacto, control de gastos y exportación a Excel",
      traditional: "Planillas manuales de papel propensas a diferencias",
      highlight: true,
    },
    {
      feature: "Actualización de precios y platos",
      roosty: "Cambios en el acto desde tu celular o computadora",
      traditional: "Menús complicados que requieren asistencia técnica",
      highlight: false,
    },
    {
      feature: "Comisiones y costos adicionales",
      roosty: "Abono fijo mensual sin sorpresas ni letra chica",
      traditional: "Costos por comensal, por usuario o por cada pantalla extra",
      highlight: false,
    },
  ];

  return (
    <section id="comparativa" className="py-20 md:py-28 bg-white relative overflow-hidden w-full max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (No AI pill, direct bold title) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-950 mb-5 leading-tight">
            La diferencia entre un sistema moderno y <br className="hidden sm:inline" />
            <span className="text-[#e85d45]">uno de hace 15 años.</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed">
            Tu local no necesita servidores pesados ni contratos con letra chica. Mirá cómo se compara Roosty frente al software tradicional.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto rounded-3xl border border-zinc-200/90 shadow-sm overflow-hidden bg-white w-full">
          <div className="overflow-x-auto w-full">
            <table className="w-full min-w-[540px] text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 bg-[#faf9f8]">
                  <th className="py-5 px-6 text-sm font-bold text-zinc-900 w-1/3">
                    Característica
                  </th>
                  <th className="py-5 px-6 text-sm font-bold text-[#e85d45] w-1/3 bg-[#fff2ef]/50 border-x border-[#e85d45]/20">
                    <div className="flex items-center gap-2">
                      <div className="relative h-6 w-24">
                        <Image
                          src="/roosty2.png"
                          alt="Roosty POS"
                          fill
                          className="object-contain object-left"
                        />
                      </div>
                      <span className="text-[10px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded bg-[#e85d45]/10 text-[#e85d45] border border-[#e85d45]/20">
                        POS
                      </span>
                    </div>
                  </th>
                  <th className="py-5 px-6 text-sm font-semibold text-zinc-500 w-1/3">
                    Sistemas Tradicionales
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200/80 text-xs sm:text-sm">
                {comparisonRows.map((row, idx) => (
                  <tr
                    key={idx}
                    className="hover:bg-zinc-50/70 transition-colors duration-150"
                  >
                    <td className="py-4 px-6 font-semibold text-zinc-900">
                      {row.feature}
                    </td>

                    {/* Roosty Column */}
                    <td className="py-4 px-6 font-medium text-zinc-900 bg-[#fff2ef]/20 border-x border-[#e85d45]/15">
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-[#e85d45] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="leading-snug">{row.roosty}</span>
                      </div>
                    </td>

                    {/* Traditional Column */}
                    <td className="py-4 px-6 font-light text-zinc-500">
                      <div className="flex items-start gap-2.5">
                        <div className="w-5 h-5 rounded-full bg-zinc-100 text-zinc-400 flex items-center justify-center shrink-0 mt-0.5">
                          <X className="w-3 h-3" />
                        </div>
                        <span className="leading-snug">{row.traditional}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
