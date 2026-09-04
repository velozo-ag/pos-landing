"use client";

import { useState, useEffect, useRef } from "react";
import {
  QrCode,
  Globe,
  Lock,
  Search,
  Star,
  Bike,
  ChevronRight,
  UtensilsCrossed,
  MessageSquare,
  CheckCircle2,
  ArrowRight,
  Smartphone,
  ExternalLink,
  Check,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function MobileMenuSection() {
  const menuPresets = [
    {
      id: "cerveceria",
      tag: "Cervecería & Bar",
      name: "DEMO BAR",
      slug: "demobar",
      color: "#f59e0b",
      featured: "Pinta IPA Artesanal (500ml)",
      featuredDesc: "Cerveza rubia artesanal con lúpulo aromático y notas cítricas.",
      featuredPrice: "$ 4.200",
      item1: "Burger Clásica Doble Smash",
      desc1: "Doble medallón 120g smash, queso cheddar doble, lechuga y salsa.",
      price1: "$ 8.500",
      item2: "Burger Bacon Crispy Cuádruple",
      desc2: "Doble smash, cuádruple cheddar fundido, panceta crocante y barbacoa.",
      price2: "$ 9.200",
      item3: "Papas Rústicas con Cheddar & Bacon",
      desc3: "Papas rústicas con salsa cheddar casera y lluvia de panceta.",
      price3: "$ 6.500",
      cartSummary: "2 ítems • $12.700",
    },
    {
      id: "parrilla",
      tag: "Restó & Parrilla",
      name: "LOMITOS EL TANO",
      slug: "lomitoseltano",
      color: "#e85d45",
      featured: "Lomito Completo Especial",
      featuredDesc: "Lomo tierno a la chapa con jamón, queso, huevo y papas fritas.",
      featuredPrice: "$ 14.500",
      item1: "Empanada Criolla a Cuchillo",
      desc1: "Carne cortada a cuchillo con cebolla de verdeo y aceitunas.",
      price1: "$ 2.200",
      item2: "Milanesa Napolitana con Fritas",
      desc2: "Milanesa tierna con salsa de tomate, jamón cocido y mozzarella gratinada.",
      price2: "$ 11.800",
      item3: "Provoleta a la Chapa con Orégano",
      desc3: "Queso provolone fundido con especias y oliva extra virgen.",
      price3: "$ 5.900",
      cartSummary: "2 ítems • $16.700",
    },
    {
      id: "cafe",
      tag: "Café de Especialidad",
      name: "CAFÉ BOTÁNICO",
      slug: "cafebotanico",
      color: "#10b981",
      featured: "Flat White Doble Shot",
      featuredDesc: "Café 100% arábica de origen con leche texturizada al punto.",
      featuredPrice: "$ 3.800",
      item1: "Croissant Relleno de Pistacho",
      desc1: "Hojaldre francés artesanal con crema pastelera de pistacho.",
      price1: "$ 5.200",
      item2: "Tostón con Palta & Huevo Poché",
      desc2: "Pan de masa madre tostado, palta fresca pisada, semillas y huevo.",
      price2: "$ 6.800",
      item3: "Iced Latte Vainilla",
      desc3: "Espresso doble sobre hielo con leche de almendras y toque de vainilla.",
      price3: "$ 4.400",
      cartSummary: "2 ítems • $10.600",
    },
    {
      id: "pizzeria",
      tag: "Pizzería Napolitana",
      name: "DON ANTONIO",
      slug: "donantonio",
      color: "#e11d48",
      featured: "Pizza Margherita con Albahaca",
      featuredDesc: "Masa fermentada 48hs, salsa de tomates italianos y fior di latte.",
      featuredPrice: "$ 11.200",
      item1: "Pizza Cuatro Quesos al Molde",
      desc1: "Mozzarella, provolone, gorgonzola y parmesano reggiano.",
      price1: "$ 13.500",
      item2: "Fugazzeta Rellena con Jamón",
      desc2: "Doble masa rellena de queso con abundante cebolla confitada.",
      price2: "$ 14.200",
      item3: "Fainá Clásica con Pimienta",
      desc3: "Tradicional masa de harina de garbanzos crocante al horno.",
      price3: "$ 2.100",
      cartSummary: "1 ítem • $11.200",
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
    }, 5500);

    return () => clearInterval(timer);
  }, [isAutoCycling, isInView, menuPresets.length]);

  const current = menuPresets[activeIdx];

  const handleSelectPreset = (idx) => {
    setActiveIdx(idx);
    setIsAutoCycling(false);
  };

  return (
    <section
      ref={containerRef}
      id="menu-movil"
      className="py-16 md:py-24 bg-[#faf9f8] relative overflow-hidden border-y border-zinc-200/80 w-full max-w-full"
    >
      {/* Background ambient lighting matching active preset */}
      <div
        className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] opacity-15 pointer-events-none transition-colors duration-700"
        style={{ backgroundColor: current.color }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column (7 cols): Headline, Value Prop, Rubro Tabs & 3 Key Pillars */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Eyebrow badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200/90 text-xs font-semibold text-[#e85d45] shadow-2xs">
              <QrCode className="w-3.5 h-3.5" />
              <span>Carta Digital & Pedidos WhatsApp</span>
            </div>

            {/* Main Headline */}
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-950 leading-[1.15]">
              La carta digital que tus clientes <br className="hidden sm:inline" />
              <span className="text-[#e85d45]">realmente disfrutan usar.</span>
            </h2>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-zinc-600 font-light leading-relaxed max-w-2xl">
              Sin descargar aplicaciones ni lidiar con PDFs lentos. Tus clientes exploran tus platos con fotos reales, seleccionan adicionales con precio en vivo y te envían el pedido listo a WhatsApp con 0% de comisiones.
            </p>

            {/* Rubro Switcher Tabs */}
            <div className="pt-2">
              <span className="text-[11px] font-bold text-zinc-400 uppercase tracking-wider block mb-2.5">
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

            {/* 3 Compact Feature Rows */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-white border border-zinc-200/80 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 mb-1">
                  <Smartphone className="w-4 h-4 text-[#e85d45]" />
                  <span>Acceso Instantáneo</span>
                </div>
                <p className="text-[11px] text-zinc-500 font-light leading-snug">
                  Subdominio propio con tu logo. Cero descargas en Android e iOS.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-zinc-200/80 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 mb-1">
                  <QrCode className="w-4 h-4 text-[#e85d45]" />
                  <span>Adicionales en Vivo</span>
                </div>
                <p className="text-[11px] text-zinc-500 font-light leading-snug">
                  Guarniciones, salsas y puntos con cálculo de precio al instante.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-zinc-200/80 shadow-2xs">
                <div className="flex items-center gap-2 text-xs font-bold text-zinc-900 mb-1">
                  <MessageSquare className="w-4 h-4 text-[#10b981]" />
                  <span>0% Comisiones</span>
                </div>
                <p className="text-[11px] text-zinc-500 font-light leading-snug">
                  El pedido llega formateado directo a tu WhatsApp sin intermediarios.
                </p>
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-2 flex items-center gap-4">
              <a
                href={SITE_CONFIG.urls.saasRegister}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-[#e85d45] hover:bg-[#d44c34] active:scale-[0.98] shadow-md shadow-[#e85d45]/25 transition-all duration-150"
              >
                <span>Probar demo gratis</span>
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={SITE_CONFIG.urls.saasApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-700 hover:text-zinc-950 transition-colors"
              >
                <span>Ver demo completa</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>

          {/* Right Column (5 cols): Live 3D Floating Smartphone Viewport */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center relative py-6">
            
            {/* Ambient Background Radial Glow */}
            <div
              className="absolute w-72 h-72 rounded-full blur-[110px] pointer-events-none transition-all duration-700 opacity-25 -z-10"
              style={{ backgroundColor: current.color }}
            />

            {/* 3D Perspective Canvas */}
            <div className="relative w-[285px] sm:w-[310px] [perspective:1200px] group">
              
              {/* Floating Badge 1: Top-Left Frosted Card */}
              <div className="absolute -top-3 -left-6 sm:-left-12 z-40 hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-zinc-200/90 shadow-xl shadow-zinc-950/10 pointer-events-none animate-badge-a">
                <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse shrink-0" />
                <div className="text-left">
                  <span className="text-[10px] font-bold text-zinc-900 block leading-tight">Pedido online</span>
                  <span className="text-[9px] font-mono text-zinc-500 leading-tight">En vivo &bull; $14.200</span>
                </div>
              </div>

              {/* Floating Badge 2: Bottom-Right Frosted Card */}
              <div className="absolute -bottom-2 -right-4 sm:-right-10 z-40 hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white/95 backdrop-blur-md border border-zinc-200/90 shadow-xl shadow-zinc-950/10 pointer-events-none animate-badge-b">
                <div className="w-4 h-4 rounded-full bg-[#e85d45]/15 text-[#e85d45] flex items-center justify-center shrink-0">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </div>
                <div className="text-left">
                  <span className="text-[10px] font-bold text-zinc-900 block leading-tight">0% Comisiones</span>
                  <span className="text-[9px] text-zinc-500 font-light leading-tight">Directo a WhatsApp</span>
                </div>
              </div>

              {/* Floating 3D Phone Body (Tap to cycle preset) */}
              <div
                onClick={() => handleSelectPreset((activeIdx + 1) % menuPresets.length)}
                role="button"
                tabIndex={0}
                title="Tocá para cambiar de carta"
                className="relative transition-transform duration-500 ease-out will-change-transform group-hover:[transform:translateY(-8px)_rotateY(0deg)_rotateX(0deg)] cursor-pointer touch-manipulation animate-phone-float"
              >
                
                {/* Physical Hardware Buttons (Sides) */}
                <div className="absolute -left-[3px] top-20 w-[3px] h-5 bg-gradient-to-r from-zinc-700 to-zinc-400 rounded-l-xs shadow-xs" />
                <div className="absolute -left-[3px] top-28 w-[3px] h-9 bg-gradient-to-r from-zinc-700 to-zinc-400 rounded-l-xs shadow-xs" />
                <div className="absolute -left-[3px] top-40 w-[3px] h-9 bg-gradient-to-r from-zinc-700 to-zinc-400 rounded-l-xs shadow-xs" />
                <div className="absolute -right-[3px] top-32 w-[3px] h-12 bg-gradient-to-l from-zinc-700 to-zinc-400 rounded-r-xs shadow-xs" />

                {/* Titanium Curved Bezel Outer Ring */}
                <div className="p-[2.5px] rounded-[48px] bg-gradient-to-tr from-zinc-700 via-zinc-400 to-zinc-800 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.45),0_0_30px_rgba(0,0,0,0.2)]">
                  
                  {/* Outer Bezel (Sleek Black Rim) */}
                  <div className="relative rounded-[46px] p-2 bg-black border border-zinc-800/80 ring-1 ring-white/10">
                    
                    {/* Screen Viewport with Glass Glare */}
                    <div className="relative rounded-[36px] overflow-hidden bg-[#09090b] text-zinc-100 aspect-[9/18.5] flex flex-col justify-between border border-zinc-800/90">
                      
                      {/* Subtle Diagonal Glass Sheen Reflection */}
                      <div className="absolute inset-0 pointer-events-none z-30 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent" />

                      {/* Dynamic Island with High-End Camera Sensors */}
                      <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-20 h-4.5 bg-black rounded-full z-40 flex items-center justify-between px-2.5 pointer-events-none ring-1 ring-zinc-800/60">
                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-900 ring-1 ring-zinc-800" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#0a0a14] flex items-center justify-center">
                          <div className="w-1 h-1 rounded-full bg-[#172554]/90" />
                        </div>
                      </div>

                      {/* Browser Address Bar */}
                      <div className="pt-7 px-3 pb-2 bg-[#121214] border-b border-zinc-800 text-center shrink-0">
                        <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#09090b] border border-zinc-800 text-[9px] text-zinc-400 font-mono max-w-[220px] truncate">
                          <Lock className="w-2.5 h-2.5 text-zinc-500 shrink-0" />
                          <span className="truncate">{current.slug}.roosty.site</span>
                        </div>
                      </div>

                  {/* Main Menu Screen */}
                  <div className="p-3 space-y-2.5 flex-1 overflow-y-auto scrollbar-none text-left bg-[#09090b]">
                    
                    {/* Brand Header */}
                    <div className="flex items-center justify-between pb-1">
                      <h4 className="font-serif text-base font-extrabold tracking-wider text-white">
                        {current.name}
                      </h4>
                      <div className="w-6 h-6 rounded-full bg-[#1c1c1f] flex items-center justify-center text-zinc-400">
                        <Search className="w-3 h-3" />
                      </div>
                    </div>

                    {/* Featured Item Banner */}
                    <div className="p-2.5 rounded-2xl bg-[#121214] border border-zinc-800 space-y-1">
                      <div className="flex items-center justify-between">
                        <span
                          className="text-[8px] font-bold uppercase tracking-wider flex items-center gap-1"
                          style={{ color: current.color }}
                        >
                          <Star className="w-2.5 h-2.5 fill-current" />
                          <span>PLATO DESTACADO</span>
                        </span>
                        <span className="text-[8px] text-zinc-400 font-mono">Disponible hoy &gt;</span>
                      </div>
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <span className="font-bold text-white text-xs block">{current.featured}</span>
                          <p className="text-[9px] text-zinc-400 font-light line-clamp-2 leading-tight">
                            {current.featuredDesc}
                          </p>
                        </div>
                        <span
                          className="font-mono font-bold text-xs shrink-0"
                          style={{ color: current.color }}
                        >
                          {current.featuredPrice}
                        </span>
                      </div>
                    </div>

                    {/* Active Order Tracking Banner */}
                    <div className="p-2 rounded-xl bg-[#121214] border border-zinc-800 flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <Bike className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                        <div>
                          <span className="text-[9px] font-bold text-white block">
                            Pedido #43 en curso <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] inline-block" />
                          </span>
                          <span className="text-[8px] text-zinc-400 block font-light">Consultá la preparación</span>
                        </div>
                      </div>
                      <span className="px-2 py-0.5 rounded-lg bg-[#2563eb] text-white font-bold text-[9px] shrink-0">
                        Seguir
                      </span>
                    </div>

                    {/* Menu Category Header */}
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-xs">Nuestra Carta</span>
                        <span className="text-[9px] text-zinc-500 font-mono">28 ítems</span>
                      </div>

                      {/* Category Chips */}
                      <div className="flex items-center gap-1 overflow-x-auto pt-1 pb-1">
                        <span
                          className="px-2 py-0.5 rounded-lg text-[9px] font-bold text-black shrink-0"
                          style={{ backgroundColor: current.color }}
                        >
                          Todo
                        </span>
                        <span className="px-2 py-0.5 rounded-lg bg-[#121214] text-zinc-400 text-[9px] border border-zinc-800 shrink-0">
                          Principales
                        </span>
                        <span className="px-2 py-0.5 rounded-lg bg-[#121214] text-zinc-400 text-[9px] border border-zinc-800 shrink-0">
                          Bebidas
                        </span>
                      </div>
                    </div>

                    {/* Menu Items List */}
                    <div className="space-y-1.5">
                      <div className="p-2 rounded-xl bg-[#121214] border border-zinc-800 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-[#1c1c1f] flex items-center justify-center text-zinc-500 shrink-0">
                            <UtensilsCrossed className="w-3 h-3" />
                          </div>
                          <div>
                            <span className="font-bold text-white text-[10px] block line-clamp-1">
                              {current.item1}
                            </span>
                            <span className="text-[8px] text-zinc-400 font-light line-clamp-1">
                              {current.desc1}
                            </span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span
                            className="font-mono font-bold text-[10px] block"
                            style={{ color: current.color }}
                          >
                            {current.price1}
                          </span>
                          <ChevronRight className="w-3 h-3 text-zinc-600 ml-auto" />
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-[#121214] border border-zinc-800 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-[#1c1c1f] flex items-center justify-center text-zinc-500 shrink-0">
                            <UtensilsCrossed className="w-3 h-3" />
                          </div>
                          <div>
                            <span className="font-bold text-white text-[10px] block line-clamp-1">
                              {current.item2}
                            </span>
                            <span className="text-[8px] text-zinc-400 font-light line-clamp-1">
                              {current.desc2}
                            </span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span
                            className="font-mono font-bold text-[10px] block"
                            style={{ color: current.color }}
                          >
                            {current.price2}
                          </span>
                          <ChevronRight className="w-3 h-3 text-zinc-600 ml-auto" />
                        </div>
                      </div>

                      <div className="p-2 rounded-xl bg-[#121214] border border-zinc-800 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-lg bg-[#1c1c1f] flex items-center justify-center text-zinc-500 shrink-0">
                            <UtensilsCrossed className="w-3 h-3" />
                          </div>
                          <div>
                            <span className="font-bold text-white text-[10px] block line-clamp-1">
                              {current.item3}
                            </span>
                            <span className="text-[8px] text-zinc-400 font-light line-clamp-1">
                              {current.desc3}
                            </span>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <span
                            className="font-mono font-bold text-[10px] block"
                            style={{ color: current.color }}
                          >
                            {current.price3}
                          </span>
                          <ChevronRight className="w-3 h-3 text-zinc-600 ml-auto" />
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Direct WhatsApp Order CTA Button */}
                  <div className="p-2 bg-[#121214] border-t border-zinc-800 shrink-0">
                    <div
                      className="w-full py-1.5 px-2.5 rounded-xl font-bold text-[10px] text-black flex items-center justify-between shadow-md"
                      style={{ backgroundColor: current.color }}
                    >
                      <span className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        <span>Enviar a WhatsApp</span>
                      </span>
                      <span className="font-mono bg-black/20 text-black px-1.5 py-0.2 rounded text-[9px] font-extrabold">
                        {current.cartSummary}
                      </span>
                    </div>
                  </div>

                  {/* Home Indicator */}
                  <div className="pb-1 bg-[#121214] flex justify-center shrink-0">
                    <div className="w-16 h-0.5 bg-zinc-600 rounded-full" />
                  </div>

                    </div>
                  </div>
                </div>
              </div>

              {/* Floor 3D Dynamic Drop Shadow */}
              <div className="w-3/4 h-5 bg-zinc-950/35 blur-xl rounded-[100%] mx-auto mt-5 transition-all duration-500 animate-shadow-pulse" />

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
