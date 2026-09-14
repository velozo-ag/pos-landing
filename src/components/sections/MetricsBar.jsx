import { Clock, FileJson, Globe, Printer } from "lucide-react";

export default function MetricsBar() {
  const metrics = [
    {
      value: "2 min",
      title: "Alta de local",
      label: "Tu subdominio propio activo (ej. tunegocio.roosty.site) sin instalaciones.",
      icon: Clock,
    },
    {
      value: "3 seg",
      title: "Carga de carta",
      label: "Importá o exportá tu menú completo de platos y combos en formato universal.",
      icon: FileJson,
    },
    {
      value: "100% Web",
      title: "Cloud SaaS",
      label: "Accesible desde cualquier tablet, PC o celular sin instalar drivers pesados.",
      icon: Globe,
    },
    {
      value: "80 y 58mm",
      title: "Tickets universales",
      label: "Impresión térmica nativa por USB, red o Bluetooth para cocina y comanda.",
      icon: Printer,
    },
  ];

  return (
    <section className="border-y border-zinc-200/80 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-zinc-200/80">
          {metrics.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={index}
                className="py-8 sm:py-10 px-4 sm:px-6 flex flex-col justify-between first:pl-0 last:pr-0 group hover:bg-[#faf9f8]/70 transition-colors duration-200"
              >
                <div>
                  <div className="flex items-center gap-2.5 mb-3">
                    <div className="w-7 h-7 rounded-md bg-zinc-100/90 border border-zinc-200/80 flex items-center justify-center text-[#e85d45] group-hover:scale-105 transition-transform duration-200 shadow-2xs">
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                      {item.title}
                    </span>
                  </div>
                  <div className="font-serif text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight mb-2 tabular-nums">
                    {item.value}
                  </div>
                </div>
                <p className="text-xs text-zinc-600 font-light leading-relaxed">
                  {item.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
