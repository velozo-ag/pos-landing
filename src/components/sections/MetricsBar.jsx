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
                className="py-8 sm:py-10 px-4 sm:px-6 flex flex-col justify-between first:pl-0 last:pr-0"
              >
                <div>
                  <div className="flex items-center gap-2 mb-2 text-[#e85d45]">
                    <Icon className="w-4 h-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                      {item.title}
                    </span>
                  </div>
                  <div className="font-serif text-3xl sm:text-4xl font-extrabold text-zinc-950 tracking-tight mb-2">
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
