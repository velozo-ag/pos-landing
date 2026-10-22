"use client";

import { useState, useEffect, useRef } from "react";
import {
  Lock,
  Search,
  Smartphone,
  MessageCircle,
  UtensilsCrossed,
  ChevronRight,
  Check,
  Clock,
  LayoutGrid,
} from "lucide-react";

export default function CustomerMenuPhoneDemo() {
  const menuPresets = [
    {
      id: "cafe",
      tag: "Cafetería & Especialidad",
      name: "CoffeeShop",
      slug: "coffeeshop",
      hours: "Jue-Dom 19:00-02:00",
      color: "#f59e0b",
      totalItems: "16 items disponibles",
      categories: ["Todo", "Cafés & Infusiones", "Tostadas & Sandwiches"],
      activeCategory: "Cafés & Infusiones",
      featured: "Café Espresso Doble",
      featuredDesc:
        "Blend 100% Arábica de tostado medio con notas a caramelo y avellanas",
      featuredPrice: "$ 1.800",
      featuredImage:
        "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
      items: [
        {
          name: "Café Espresso Doble",
          desc: "Blend 100% Arábica de tostado medio con...",
          price: "$ 1.800",
          img: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=200&q=80",
        },
        {
          name: "Flat White de Especialidad",
          desc: "Doble shot de espresso con microespuma...",
          price: "$ 2.500",
          img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=200&q=80",
        },
        {
          name: "Cappuccino Italiano",
          desc: "Espresso clásico, leche vaporizada y canela...",
          price: "$ 2.400",
          img: "https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&w=200&q=80",
        },
        {
          name: "Té en Hebras Selección",
          desc: "Variedades: Earl Grey, Frutos del Bosque o...",
          price: "$ 1.900",
          img: "https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=200&q=80",
        },
      ],
    },
    {
      id: "cerveceria",
      tag: "Cervecería & Burgers",
      name: "Roosty Taproom",
      slug: "roostytap",
      hours: "Mar-Dom 18:30-03:00",
      color: "#f59e0b",
      totalItems: "28 items disponibles",
      categories: ["Todo", "Smash Burgers", "Canillas Artesanales"],
      activeCategory: "Smash Burgers",
      featured: "Burger Bacon Crispy Doble",
      featuredDesc:
        "Doble medallón smash 120g, cuádruple cheddar, panceta ahumada y salsa de la casa",
      featuredPrice: "$ 9.200",
      featuredImage:
        "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80",
      items: [
        {
          name: "Burger Clásica Doble",
          desc: "Doble medallón 120g smash, queso cheddar...",
          price: "$ 8.500",
          img: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=200&q=80",
        },
        {
          name: "Burger Bacon Crispy",
          desc: "Cuádruple cheddar fundido, panceta crocante...",
          price: "$ 9.200",
          img: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&w=200&q=80",
        },
        {
          name: "Papas Rústicas con Cheddar",
          desc: "Papas triple cocción con cheddar fundido y...",
          price: "$ 6.500",
          img: "https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=200&q=80",
        },
        {
          name: "Pinta IPA Artesanal",
          desc: "Cerveza rubia lupulada con notas cítricas...",
          price: "$ 4.200",
          img: "https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&w=200&q=80",
        },
      ],
    },
    {
      id: "pizzeria",
      tag: "Pizzería Napolitana",
      name: "Don Antonio",
      slug: "donantonio",
      hours: "Mié-Dom 20:00-01:30",
      color: "#f59e0b",
      totalItems: "22 items disponibles",
      categories: ["Todo", "Pizzas a la Piedra", "Empanadas"],
      activeCategory: "Pizzas a la Piedra",
      featured: "Margherita di Bufala",
      featuredDesc:
        "Masa de fermentación lenta 48hs, pomodoro San Marzano, fior di latte y albahaca",
      featuredPrice: "$ 11.200",
      featuredImage:
        "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=600&q=80",
      items: [
        {
          name: "Pizza Napolitana con Ajo",
          desc: "Muzzarella gratinada, rodajas de tomate natural...",
          price: "$ 10.500",
          img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=200&q=80",
        },
        {
          name: "Pizza Cuatro Quesos",
          desc: "Muzzarella, provolone estacionado, roquefort...",
          price: "$ 12.000",
          img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=200&q=80",
        },
        {
          name: "Fugazzeta Rellena",
          desc: "Doble masa rellena de queso y cebolla...",
          price: "$ 14.200",
          img: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=200&q=80",
        },
        {
          name: "Empanada Carne a Cuchillo",
          desc: "Carne cortada a cuchillo horneada al barro...",
          price: "$ 2.200",
          img: "https://images.unsplash.com/photo-1604908554025-aaa87c152c3b?auto=format&fit=crop&w=200&q=80",
        },
      ],
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoCycling, setIsAutoCycling] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: "60px 0px 60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isAutoCycling || !isInView) return;

    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % menuPresets.length);
    }, 6000);

    return () => clearInterval(timer);
  }, [isAutoCycling, isInView, menuPresets.length]);

  const current = menuPresets[activeIdx];

  const handleSelectPreset = (idx) => {
    setActiveIdx(idx);
    setIsAutoCycling(false);
  };

  return (
    <div ref={containerRef} className="relative w-full py-2">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column (6 cols): Rubros Gastronómicos & Value Prop */}
        <div className="lg:col-span-6 space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200/90 text-xs font-semibold text-[#e85d45] shadow-2xs">
            <Smartphone className="w-3.5 h-3.5" />
            <span>Paso 1 &bull; La Experiencia del Comensal</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-950 leading-tight">
            Carta interactiva con fotos reales, adicionales y subdominio propio
          </h3>

          <p className="text-sm sm:text-base text-zinc-600 font-light leading-relaxed">
            Tus clientes exploran tus platos en su propio teléfono sin descargar nada. Seleccionan adicionales o variantes con precio recalculado al instante y envían su pedido directo a tu WhatsApp con 0% de comisiones.
          </p>

          {/* Rubro switcher tabs */}
          <div className="pt-1">
            <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2">
              Tocá un rubro para ver su carta en vivo:
            </span>
            <div className="flex flex-wrap items-center gap-2">
              {menuPresets.map((preset, idx) => {
                const isSelected = activeIdx === idx;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => handleSelectPreset(idx)}
                    className={`px-3.5 py-2 sm:py-1.5 rounded-xl text-xs font-semibold border transition-all cursor-pointer touch-manipulation min-h-[38px] flex items-center gap-2 ${
                      isSelected
                        ? "bg-zinc-900 text-white border-zinc-900 shadow-sm scale-[1.02]"
                        : "bg-white text-zinc-600 border-zinc-200/90 hover:border-zinc-300 hover:text-zinc-900 shadow-2xs"
                    }`}
                  >
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: preset.color }}
                    />
                    <span>{preset.tag}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3 Quick Benefit Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-white border border-zinc-200/80 shadow-2xs">
              <span className="text-xs font-bold text-zinc-900 block mb-0.5">
                Sin descargas
              </span>
              <p className="text-[11px] text-zinc-500 font-light leading-tight">
                Funciona directo en Safari y Chrome.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-zinc-200/80 shadow-2xs">
              <span className="text-xs font-bold text-zinc-900 block mb-0.5">
                Adicionales en vivo
              </span>
              <p className="text-[11px] text-zinc-500 font-light leading-tight">
                El total se recalcula al elegir extras.
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-white border border-zinc-200/80 shadow-2xs">
              <span className="text-xs font-bold text-zinc-900 block mb-0.5">
                0% Comisiones
              </span>
              <p className="text-[11px] text-zinc-500 font-light leading-tight">
                Ventas directas a tu WhatsApp.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column (6 cols): Large, True-to-Life Smartphone Viewport (Exact menucoffee.png structure) */}
        <div className="lg:col-span-6 flex flex-col items-center justify-center relative py-4">
          {/* Ambient Background Radial Glow */}
          <div className="absolute w-80 h-80 rounded-full bg-amber-500/20 blur-[110px] pointer-events-none -z-10" />

          {/* Generous Phone Width (360px - 390px) */}
          <div className="relative w-full max-w-[365px] sm:max-w-[385px] group">
            {/* Floating Badge Top-Left */}
            <div className="absolute -top-3 -left-4 sm:-left-8 z-40 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-zinc-200/90 shadow-xl pointer-events-none">
              <div className="w-2 h-2 rounded-full bg-emerald-500" />
              <div className="text-left">
                <span className="text-[11px] font-bold text-zinc-900 block leading-tight">
                  {current.slug}.roosty.site
                </span>
                <span className="text-[9px] font-mono text-zinc-500 leading-tight">
                  Carta QR &bull; 0% Comisiones
                </span>
              </div>
            </div>

            {/* Phone Outer Titanium Chassis */}
            <div
              onClick={() =>
                handleSelectPreset((activeIdx + 1) % menuPresets.length)
              }
              role="button"
              tabIndex={0}
              title="Tocá para cambiar de rubro"
              className="p-[3px] rounded-[46px] bg-gradient-to-tr from-zinc-700 via-zinc-400 to-zinc-800 shadow-[0_30px_70px_-15px_rgba(0,0,0,0.45)] cursor-pointer transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="rounded-[43px] p-2 bg-black border border-zinc-800">
                {/* Screen Content (Exact match to menucoffee.png) */}
                <div className="rounded-[35px] overflow-hidden bg-[#110f0d] text-white flex flex-col border border-zinc-800/80">
                  {/* 1. Top Schedule Ticker Bar */}
                  <div className="bg-[#181411] border-b border-zinc-800/80 py-2 px-3 flex items-center justify-center gap-4 text-[10px] font-mono text-zinc-400 whitespace-nowrap overflow-hidden">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#f59e0b]" />
                      <span>{current.hours}</span>
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#f59e0b]" />
                      <span>{current.hours}</span>
                    </span>
                  </div>

                  {/* 2. Store Brand Header */}
                  <div className="px-4 py-3 flex items-center justify-between border-b border-zinc-800/40 bg-[#14110e]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 p-1 flex items-center justify-center shrink-0">
                        <img
                          src="/roostyicon.png"
                          alt={current.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div>
                        <h4 className="font-serif font-bold text-white text-base leading-tight">
                          {current.name}
                        </h4>
                        <div className="flex items-center gap-1.5 text-[10px] font-mono mt-0.5">
                          <span className="text-emerald-400 font-bold">
                            Abierto
                          </span>
                          <span className="text-zinc-500">•</span>
                          <span className="text-zinc-400">{current.hours}</span>
                        </div>
                      </div>
                    </div>

                    <div className="w-9 h-9 rounded-full bg-[#f59e0b] text-zinc-950 flex items-center justify-center shadow-md shrink-0">
                      <MessageCircle className="w-4 h-4 stroke-[2.5]" />
                    </div>
                  </div>

                  {/* 3. Main Scrollable Body */}
                  <div className="p-4 space-y-4 bg-[#110f0d]">
                    {/* DESTACADO DE LA CASA Card with Photo Blend */}
                    <div className="relative rounded-3xl overflow-hidden border border-zinc-800/90 bg-[#1a1612] p-4 shadow-lg">
                      {/* Right-side Dish Photo with Left Gradient Mask */}
                      <div className="absolute inset-y-0 right-0 w-3/5 pointer-events-none">
                        <img
                          src={current.featuredImage}
                          alt={current.featured}
                          className="w-full h-full object-cover opacity-85"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1612] via-[#1a1612]/80 to-transparent" />
                      </div>

                      <div className="relative z-10 space-y-2">
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#271e12] border border-[#f59e0b]/40 text-[#f59e0b] font-mono text-[9px] font-bold uppercase tracking-widest">
                          DESTACADO DE LA CASA
                        </span>

                        <div className="max-w-[75%]">
                          <h5 className="font-serif font-bold text-white text-lg leading-snug">
                            {current.featured}
                          </h5>
                          <p className="text-[11px] text-zinc-300/90 font-light leading-snug line-clamp-2 mt-0.5">
                            {current.featuredDesc}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
                          <span className="font-mono font-extrabold text-white text-base">
                            {current.featuredPrice}
                          </span>
                          <span className="px-4 py-1.5 rounded-full bg-[#f59e0b] text-white font-serif font-bold text-xs flex items-center gap-1 shadow-md">
                            <span>Pedir</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* "Nuestra Carta" + Search + Categories */}
                    <div className="space-y-2.5">
                      <div>
                        <h5 className="font-serif text-xl font-bold text-white leading-tight">
                          Nuestra Carta
                        </h5>
                        <p className="text-[11px] font-mono text-zinc-400">
                          {current.totalItems}
                        </p>
                      </div>

                      {/* Search Bar Row */}
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-[#1b1815] border border-zinc-800 rounded-full py-2 px-3.5 flex items-center gap-2 text-xs text-zinc-400">
                          <Search className="w-3.5 h-3.5 text-zinc-500" />
                          <span>Buscar en la carta...</span>
                        </div>
                        <div className="px-3 py-2 rounded-full bg-[#1b1815] border border-zinc-800 flex items-center gap-1.5 text-xs">
                          <LayoutGrid className="w-3.5 h-3.5 text-[#f59e0b]" />
                          <span className="font-mono font-bold text-[#f59e0b] text-[11px]">
                            4
                          </span>
                        </div>
                      </div>

                      {/* Category Pills */}
                      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-0.5">
                        <span className="px-3.5 py-1.5 rounded-full bg-[#f59e0b] text-white font-bold text-xs flex items-center gap-1.5 shrink-0 shadow-xs">
                          <LayoutGrid className="w-3 h-3" />
                          <span>Todo</span>
                        </span>
                        {current.categories.slice(1).map((cat, cIdx) => (
                          <span
                            key={cIdx}
                            className="px-3 py-1.5 rounded-full bg-[#1b1815] border border-zinc-800 text-zinc-200 text-xs flex items-center gap-1.5 shrink-0"
                          >
                            <UtensilsCrossed className="w-3 h-3 text-zinc-400" />
                            <span>{cat}</span>
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Category Section Heading with Amber Underline */}
                    <div>
                      <div className="inline-block border-b-2 border-[#f59e0b] pb-1 mb-2.5">
                        <h6 className="font-serif font-bold text-white text-base">
                          {current.activeCategory}
                        </h6>
                      </div>

                      {/* Items List with Square Rounded Photos */}
                      <div className="space-y-2">
                        {current.items.slice(0, 3).map((item, iIdx) => (
                          <div
                            key={iIdx}
                            className="p-2.5 rounded-2xl bg-[#161310] border border-zinc-800/80 flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-3 min-w-0">
                              <img
                                src={item.img}
                                alt={item.name}
                                className="w-13 h-13 rounded-2xl object-cover shrink-0 border border-zinc-700/60"
                              />
                              <div className="min-w-0">
                                <p className="font-serif font-bold text-white text-sm truncate">
                                  {item.name}
                                </p>
                                <p className="text-[11px] text-zinc-400 truncate mt-0.5">
                                  {item.desc}
                                </p>
                              </div>
                            </div>

                            <div className="flex flex-col items-end gap-1.5 shrink-0">
                              <span className="font-mono font-bold text-[#f59e0b] text-xs">
                                {item.price}
                              </span>
                              <span className="w-6 h-6 rounded-full bg-[#221e1a] border border-zinc-700/80 flex items-center justify-center text-zinc-300">
                                <ChevronRight className="w-3.5 h-3.5" />
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
