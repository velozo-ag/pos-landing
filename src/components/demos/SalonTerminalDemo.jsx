"use client";

import { useState, useEffect, useRef } from "react";
import {
  Search,
  Plus,
  Trash2,
  Printer,
  CreditCard,
  Clock,
  Users,
  Eye,
  Zap,
  RotateCcw,
  Truck,
  Layers,
  MoreVertical,
  LayoutGrid,
  CheckCircle2,
  Check,
} from "lucide-react";

export default function SalonTerminalDemo() {
  // Procedural Timeline:
  // 0: Salón map view
  // 1: Mesa 02 active selection
  // 2: Smooth Track Slide to Comanda + Product 1 (Burger Clásica) added
  // 3: Product 2 (Burger Bacon) added
  // 4: Product 3 (Pinta IPA) added ($25.800 total)
  // 5: Cobro F9 confirmed
  // 6: 80mm Thermal Receipt slides up from bottom (Sale closed)
  const [phase, setPhase] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  // Viewport Intersection Observer: pauses execution completely when not visible
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

  // Continuous procedural timer loop (7 phases in bucle)
  useEffect(() => {
    if (!isInView) return;

    const durations = [2200, 700, 1300, 1200, 1300, 1000, 3200];
    const timer = setTimeout(() => {
      setPhase((prev) => (prev + 1) % 7);
    }, durations[phase]);

    return () => clearTimeout(timer);
  }, [phase, isInView]);

  // Clean derived states
  const isComandaView = phase >= 2 && phase <= 5;
  const isMesaPressed = phase === 1;
  const showProduct1 = phase >= 2;
  const showProduct2 = phase >= 3;
  const showProduct3 = phase >= 4;
  const isCobrando = phase >= 5;
  const showTicket = phase === 6;

  const currentTotal = showProduct3
    ? "$25.800"
    : showProduct2
    ? "$21.600"
    : showProduct1
    ? "$11.500"
    : "$0";

  const itemCount = (showProduct1 ? 1 : 0) + (showProduct2 ? 1 : 0) + (showProduct3 ? 1 : 0);

  return (
    <div
      ref={containerRef}
      className="w-full aspect-[16/10] sm:aspect-video bg-[#09090b] text-zinc-100 font-sans text-xs select-none rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl relative flex flex-col justify-between pointer-events-none cursor-default"
    >
      {/* ─────────────────────────────────────────────────────────────
          GPU-ACCELERATED HORIZONTAL 2-PANEL SLIDING TRACK
      ───────────────────────────────────────────────────────────── */}
      <div className="relative flex-1 overflow-hidden">
        <div
          className="flex w-[200%] h-full transition-transform duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] will-change-transform"
          style={{
            transform: isComandaView || showTicket ? "translateX(-50%)" : "translateX(0%)",
          }}
        >
          {/* ═══════════════════════════════════════════════════════════
              PANEL 1: MAPA DE MESAS (MESAS.png)
          ═══════════════════════════════════════════════════════════ */}
          <div className="w-1/2 h-full p-3 sm:p-4 flex flex-col justify-start gap-2.5 bg-[#09090b] shrink-0">
            
            {/* Top Filter Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-0.5 shrink-0">
              <div className="flex items-center gap-1">
                <span className="px-3 py-1.5 rounded-xl bg-[#1c1c1f] text-white font-semibold text-xs border border-zinc-800 shadow-xs">
                  Todos los Sectores
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-[#121214] text-zinc-400 text-xs">
                  Salón
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-[#121214] text-zinc-400 text-xs hidden sm:inline">
                  Patio
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-[#121214] text-zinc-400 text-xs hidden sm:inline">
                  Barra
                </span>
                <span className="px-3 py-1.5 rounded-xl bg-[#121214] text-zinc-400 flex items-center gap-1 text-xs hidden md:flex">
                  <Layers className="w-3.5 h-3.5" />
                  <span>Sectores</span>
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-xs font-medium shrink-0">
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-[#10b981]" /> Libres: <strong className="text-white font-bold">1</strong>
                </span>
                <span className="flex items-center gap-1.5 text-zinc-400">
                  <span className="w-2 h-2 rounded-full bg-[#f43f5e]" /> Ocupadas: <strong className="text-white font-bold">1</strong>
                </span>
                <span className="flex items-center gap-1.5 text-zinc-400 hidden sm:flex">
                  <span className="w-2 h-2 rounded-full bg-[#f59e0b]" /> Por cobrar: <strong className="text-white font-bold">1</strong>
                </span>
                <span className="text-zinc-400 hidden lg:inline">
                  En salón: <strong className="text-white font-bold">$25.800</strong>
                </span>
                <span className="px-2.5 py-1 rounded-xl bg-[#1c1509] border border-[#78350f] text-[#f59e0b] font-semibold flex items-center gap-1 text-xs">
                  <Zap className="w-3 h-3 fill-[#f59e0b]" />
                  <span>Takeaway</span>
                </span>
                <div className="px-3 py-1 rounded-xl bg-white text-zinc-950 font-bold text-xs shadow-xs flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" />
                  <span>Nueva Mesa</span>
                </div>
              </div>
            </div>

            {/* Row 2: PEDIDOS ONLINE Banner */}
            <div className="p-2 rounded-2xl bg-[#121214] border border-zinc-800 flex items-center gap-2 text-xs shrink-0">
              <span className="font-bold text-[#f59e0b] flex items-center gap-1.5 tracking-wider uppercase text-[11px] shrink-0">
                <Truck className="w-3.5 h-3.5" />
                <span>PEDIDOS ONLINE :</span>
              </span>
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none">
                <div className="px-3 py-1 rounded-xl bg-[#09090b] text-zinc-200 font-mono text-[11px] border border-zinc-800 font-semibold flex items-center gap-1.5">
                  <Truck className="w-3 h-3 text-zinc-400" />
                  <span>Delivery #43</span>
                </div>
                <div className="px-3 py-1 rounded-xl bg-[#09090b] text-zinc-200 font-mono text-[11px] border border-zinc-800 font-semibold flex items-center gap-1.5">
                  <Truck className="w-3 h-3 text-zinc-400" />
                  <span>Delivery #38</span>
                </div>
                <div className="px-3 py-1 rounded-xl bg-[#09090b] text-zinc-200 font-mono text-[11px] border border-zinc-800 font-semibold flex items-center gap-1.5">
                  <Truck className="w-3 h-3 text-zinc-400" />
                  <span>Delivery #37</span>
                </div>
              </div>
            </div>

            {/* Row 3: Tables Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-0.5">
              {/* Mesa 01: Libre */}
              <div className="p-3 rounded-2xl bg-[#121214] border border-zinc-800 flex flex-col justify-between h-[145px]">
                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-white text-sm">Mesa 01</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-zinc-400 bg-[#1f1f23] px-2 py-0.5 rounded-md font-medium">Libre</span>
                      <MoreVertical className="w-3 h-3 text-zinc-600" />
                    </div>
                  </div>
                  <span className="text-[11px] text-zinc-500 block">Salón</span>
                </div>
                <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                  <Users className="w-3.5 h-3.5 text-zinc-500" /> 4 sillas
                </span>
              </div>

              {/* Mesa 02: Ocupada (Highlights on Phase 1) */}
              <div
                className={`p-3 rounded-2xl flex flex-col justify-between h-[145px] transition-all duration-200 ${
                  isMesaPressed
                    ? "bg-[#241014] border-2 border-rose-400 scale-[0.98]"
                    : "bg-[#140c0f] border-2 border-[#e11d48]"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-white text-sm">Mesa 02</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-[#fda4af] bg-[#4c0519] border border-[#9f1239] px-2 py-0.5 rounded-md font-bold">
                        Ocupada
                      </span>
                      <MoreVertical className="w-3 h-3 text-zinc-600" />
                    </div>
                  </div>
                  <span className="text-[11px] text-zinc-500 block">Salón</span>
                  <div className="flex items-center justify-between mt-1 text-xs">
                    <span className="text-zinc-400 flex items-center gap-1">
                      <Users className="w-3 h-3" /> 2 &bull; <Clock className="w-3 h-3" /> 18m
                    </span>
                    <span className="font-mono font-bold text-white text-sm">$25.800</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 pt-1.5 border-t border-rose-950">
                  <div className={`flex-1 py-1 rounded-xl font-bold text-[11px] flex items-center justify-center gap-1 transition-colors ${
                    isMesaPressed ? "bg-rose-600 text-white" : "bg-[#1c1c1f] text-white"
                  }`}>
                    <Eye className="w-3 h-3" /> Comanda
                  </div>
                  <div className="flex-1 py-1 rounded-xl bg-[#1c1c1f] text-zinc-400 text-[11px] text-center">
                    Cuenta
                  </div>
                </div>
              </div>

              {/* Mesa 03: Cuenta */}
              <div className="p-3 rounded-2xl bg-[#151008] border-2 border-[#d97706] flex flex-col justify-between h-[145px]">
                <div>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-bold text-white text-sm">Mesa 03</span>
                    <div className="flex items-center gap-1">
                      <span className="text-[10px] text-[#fcd34d] bg-[#451a03] border border-[#92400e] px-2 py-0.5 rounded-md font-bold">
                        Cuenta
                      </span>
                      <MoreVertical className="w-3 h-3 text-zinc-600" />
                    </div>
                  </div>
                  <span className="text-[11px] text-zinc-500 block">Salón</span>
                  <div className="flex items-center justify-between mt-1 text-xs">
                    <span className="text-zinc-400 flex items-center gap-1">
                      <Users className="w-3 h-3" /> 2 &bull; <Clock className="w-3 h-3" /> 34m
                    </span>
                    <span className="font-mono font-bold text-[#f59e0b] text-sm">$14.800</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 pt-1.5 border-t border-amber-950">
                  <div className="flex-1 py-1 rounded-xl bg-[#1c1c1f] text-zinc-400 text-[11px] flex items-center justify-center gap-1">
                    <Eye className="w-3 h-3" /> Ver
                  </div>
                  <div className="flex-1 py-1 rounded-xl bg-[#f59e0b] text-zinc-950 font-bold text-[11px] text-center shadow-xs">
                    Cobrar
                  </div>
                </div>
              </div>

              {/* Empty slots */}
              <div className="p-3 rounded-2xl bg-[#0c0c0e] border border-zinc-900 hidden lg:flex h-[145px]" />
              <div className="p-3 rounded-2xl bg-[#0c0c0e] border border-zinc-900 hidden lg:flex h-[145px]" />
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════
              PANEL 2: POS COMANDA MESA 02 (POS COMANDA MESA.png)
          ═══════════════════════════════════════════════════════════ */}
          <div className="w-1/2 h-full p-2.5 sm:p-3.5 flex flex-col justify-between bg-[#09090b] shrink-0">
            
            {/* Top Active Orders Ribbon */}
            <div className="flex items-center justify-between pb-1.5 shrink-0">
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                <div className="px-3.5 py-1.5 rounded-xl bg-[#121214] border border-zinc-800 text-center">
                  <span className="text-[8px] text-[#f59e0b] font-bold block uppercase tracking-wider">
                    DELIVERY
                  </span>
                  <span className="font-mono text-white font-bold text-xs">#43</span>
                </div>

                <div className="px-3.5 py-1.5 rounded-xl bg-[#121214] border border-zinc-800 text-center">
                  <span className="text-[8px] text-[#f59e0b] font-bold block uppercase tracking-wider">
                    DELIVERY
                  </span>
                  <span className="font-mono text-white font-bold text-xs">#38</span>
                </div>

                <div className="px-3.5 py-1.5 rounded-xl bg-[#121214] border border-zinc-800 text-center hidden sm:block">
                  <span className="text-[8px] text-[#f59e0b] font-bold block uppercase tracking-wider">
                    DELIVERY
                  </span>
                  <span className="font-mono text-white font-bold text-xs">#37</span>
                </div>

                {/* Selected Active Table 02 */}
                <div className="px-3.5 py-2 rounded-xl bg-[#27272a] border border-zinc-700 text-white font-bold flex items-center gap-1.5 text-xs shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#f43f5e]" />
                  <span>Mesa 02</span>
                </div>

                <div className="px-3.5 py-2 rounded-xl bg-[#121214] border border-zinc-800 text-zinc-400 flex items-center gap-1.5 text-xs">
                  <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
                  <span>Mesa 03</span>
                </div>
              </div>

              <div className="w-7 h-7 rounded-xl bg-[#121214] border border-zinc-800 flex items-center justify-center text-zinc-400">
                <LayoutGrid className="w-3.5 h-3.5" />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-2.5 flex-1 min-h-0 items-stretch">
              
              {/* Left Column (8 cols): Dense Catalog (16 products) */}
              <div className="lg:col-span-8 flex flex-col justify-between space-y-1.5 min-h-0">
                
                {/* Search + Category Pills */}
                <div className="flex items-center gap-1 shrink-0 overflow-x-auto scrollbar-none">
                  <div className="relative flex-1 min-w-[110px]">
                    <Search className="w-3 h-3 absolute left-2 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="text"
                      readOnly
                      placeholder="Buscar... (/)"
                      className="w-full bg-[#121214] border border-zinc-800 rounded-lg py-1 pl-7 pr-6 text-[11px] text-zinc-300 outline-none font-medium"
                    />
                    <span className="absolute right-1.5 top-1/2 -translate-y-1/2 text-[9px] text-zinc-500 bg-zinc-800 px-1 rounded">/</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-lg bg-[#27272a] text-white font-bold text-[11px] whitespace-nowrap">
                    Todos (33)
                  </span>
                  <span className="px-2 py-1 rounded-lg bg-[#121214] text-zinc-400 text-[11px] whitespace-nowrap hidden sm:inline">
                    Hamburguesas
                  </span>
                  <span className="px-2 py-1 rounded-lg bg-[#121214] text-zinc-400 text-[11px] whitespace-nowrap hidden sm:inline">
                    Pizzas
                  </span>
                  <span className="px-2 py-1 rounded-lg bg-[#121214] text-zinc-400 text-[11px] whitespace-nowrap hidden md:inline">
                    Picadas
                  </span>
                  <span className="px-2 py-1 rounded-lg bg-[#121214] text-zinc-400 text-[11px] whitespace-nowrap hidden lg:inline">
                    Bebidas
                  </span>
                </div>

                {/* Product Grid: 4 cols x 4 rows */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 flex-1 min-h-0 overflow-y-auto scrollbar-none">
                  {/* 1: Burger Clásica Doble */}
                  <div className={`p-1.5 sm:p-2 rounded-xl flex flex-col justify-between transition-colors duration-150 ${
                    showProduct1
                      ? "bg-[#1c1509] border-2 border-[#d97706]"
                      : "bg-[#121214] border border-zinc-800"
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-md bg-[#1c1c1f] text-zinc-400 font-bold flex items-center justify-center text-[9px] shrink-0">
                        BU
                      </span>
                      <span className="font-bold text-white text-[11px] leading-tight truncate">Burger Clásica</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-mono font-bold text-[11px] text-[#f59e0b]">$8.500</span>
                      {showProduct1 ? (
                        <span className="w-4 h-4 rounded-full bg-[#f59e0b] text-zinc-950 font-extrabold flex items-center justify-center text-[9px]">
                          1
                        </span>
                      ) : (
                        <div className="w-4 h-4 rounded bg-[#1c1c1f] text-zinc-400 flex items-center justify-center">
                          <Plus className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 2: Burger Bacon Crispy */}
                  <div className={`p-1.5 sm:p-2 rounded-xl flex flex-col justify-between transition-colors duration-150 ${
                    showProduct2
                      ? "bg-[#1c1509] border-2 border-[#d97706]"
                      : "bg-[#121214] border border-zinc-800"
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-md bg-[#1c1c1f] text-zinc-400 font-bold flex items-center justify-center text-[9px] shrink-0">
                        BU
                      </span>
                      <span className="font-bold text-white text-[11px] leading-tight truncate">Burger Bacon</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-mono font-bold text-[11px] text-[#f59e0b]">$9.200</span>
                      {showProduct2 ? (
                        <span className="w-4 h-4 rounded-full bg-[#f59e0b] text-zinc-950 font-extrabold flex items-center justify-center text-[9px]">
                          1
                        </span>
                      ) : (
                        <div className="w-4 h-4 rounded bg-[#1c1c1f] text-zinc-400 flex items-center justify-center">
                          <Plus className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 3: Burger Cuarto de Libra */}
                  <div className="p-1.5 sm:p-2 rounded-xl bg-[#121214] border border-zinc-800 flex flex-col justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-md bg-[#1c1c1f] text-zinc-400 font-bold flex items-center justify-center text-[9px] shrink-0">
                        BU
                      </span>
                      <span className="font-medium text-white text-[11px] leading-tight truncate">Cuarto de Libra</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-mono text-zinc-200 font-bold text-[11px]">$8.800</span>
                      <div className="w-4 h-4 rounded bg-[#1c1c1f] text-zinc-400 flex items-center justify-center">
                        <Plus className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </div>

                  {/* 4: Burger Doble Smash */}
                  <div className="p-1.5 sm:p-2 rounded-xl bg-[#121214] border border-zinc-800 flex flex-col justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-md bg-[#1c1c1f] text-zinc-400 font-bold flex items-center justify-center text-[9px] shrink-0">
                        BU
                      </span>
                      <span className="font-medium text-white text-[11px] leading-tight truncate">Doble Smash</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-mono text-zinc-200 font-bold text-[11px]">$9.500</span>
                      <div className="w-4 h-4 rounded bg-[#1c1c1f] text-zinc-400 flex items-center justify-center">
                        <Plus className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </div>

                  {/* 5: Pizza Muzzarella */}
                  <div className="p-1.5 sm:p-2 rounded-xl bg-[#121214] border border-zinc-800 flex flex-col justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-md bg-[#1c1c1f] text-zinc-400 font-bold flex items-center justify-center text-[9px] shrink-0">
                        PI
                      </span>
                      <span className="font-medium text-white text-[11px] leading-tight truncate">Pizza Muzzarella</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-mono text-zinc-200 font-bold text-[11px]">$9.500</span>
                      <div className="w-4 h-4 rounded bg-[#1c1c1f] text-zinc-400 flex items-center justify-center">
                        <Plus className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </div>

                  {/* 6: Pizza Napolitana */}
                  <div className="p-1.5 sm:p-2 rounded-xl bg-[#121214] border border-zinc-800 flex flex-col justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-md bg-[#1c1c1f] text-zinc-400 font-bold flex items-center justify-center text-[9px] shrink-0">
                        PI
                      </span>
                      <span className="font-medium text-white text-[11px] leading-tight truncate">Pizza Napolitana</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-mono text-zinc-200 font-bold text-[11px]">$10.500</span>
                      <div className="w-4 h-4 rounded bg-[#1c1c1f] text-zinc-400 flex items-center justify-center">
                        <Plus className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </div>

                  {/* 7: Papas Cheddar & Bacon */}
                  <div className="p-1.5 sm:p-2 rounded-xl bg-[#121214] border border-zinc-800 flex flex-col justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-md bg-[#1c1c1f] text-zinc-400 font-bold flex items-center justify-center text-[9px] shrink-0">
                        PA
                      </span>
                      <span className="font-medium text-white text-[11px] leading-tight truncate">Papas Cheddar</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-mono text-zinc-200 font-bold text-[11px]">$6.500</span>
                      <div className="w-4 h-4 rounded bg-[#1c1c1f] text-zinc-400 flex items-center justify-center">
                        <Plus className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </div>

                  {/* 8: Bastones Muzzarella */}
                  <div className="p-1.5 sm:p-2 rounded-xl bg-[#121214] border border-zinc-800 flex flex-col justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-md bg-[#1c1c1f] text-zinc-400 font-bold flex items-center justify-center text-[9px] shrink-0">
                        BA
                      </span>
                      <span className="font-medium text-white text-[11px] leading-tight truncate">Bastones Muzza (6u)</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-mono text-zinc-200 font-bold text-[11px]">$5.800</span>
                      <div className="w-4 h-4 rounded bg-[#1c1c1f] text-zinc-400 flex items-center justify-center">
                        <Plus className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </div>

                  {/* 9: Pinta IPA */}
                  <div className={`p-1.5 sm:p-2 rounded-xl flex flex-col justify-between transition-colors duration-150 ${
                    showProduct3
                      ? "bg-[#1c1509] border-2 border-[#d97706]"
                      : "bg-[#121214] border border-zinc-800"
                  }`}>
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-md bg-[#1c1c1f] text-zinc-400 font-bold flex items-center justify-center text-[9px] shrink-0">
                        PI
                      </span>
                      <span className="font-bold text-white text-[11px] leading-tight truncate">Pinta IPA</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-mono font-bold text-[11px] text-[#f59e0b]">$4.200</span>
                      {showProduct3 ? (
                        <span className="w-4 h-4 rounded-full bg-[#f59e0b] text-zinc-950 font-extrabold flex items-center justify-center text-[9px]">
                          1
                        </span>
                      ) : (
                        <div className="w-4 h-4 rounded bg-[#1c1c1f] text-zinc-400 flex items-center justify-center">
                          <Plus className="w-2.5 h-2.5" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* 10: Pinta Honey */}
                  <div className="p-1.5 sm:p-2 rounded-xl bg-[#121214] border border-zinc-800 flex flex-col justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-md bg-[#1c1c1f] text-zinc-400 font-bold flex items-center justify-center text-[9px] shrink-0">
                        PI
                      </span>
                      <span className="font-medium text-white text-[11px] leading-tight truncate">Pinta Honey</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-mono text-zinc-200 font-bold text-[11px]">$4.000</span>
                      <div className="w-4 h-4 rounded bg-[#1c1c1f] text-zinc-400 flex items-center justify-center">
                        <Plus className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </div>

                  {/* 11: Fernet Branca */}
                  <div className="p-1.5 sm:p-2 rounded-xl bg-[#121214] border border-zinc-800 flex flex-col justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-md bg-[#1c1c1f] text-zinc-400 font-bold flex items-center justify-center text-[9px] shrink-0">
                        FE
                      </span>
                      <span className="font-medium text-white text-[11px] leading-tight truncate">Fernet Branca</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-mono text-zinc-200 font-bold text-[11px]">$4.800</span>
                      <div className="w-4 h-4 rounded bg-[#1c1c1f] text-zinc-400 flex items-center justify-center">
                        <Plus className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </div>

                  {/* 12: Gin Tonic */}
                  <div className="p-1.5 sm:p-2 rounded-xl bg-[#121214] border border-zinc-800 flex flex-col justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="w-5 h-5 rounded-md bg-[#1c1c1f] text-zinc-400 font-bold flex items-center justify-center text-[9px] shrink-0">
                        GI
                      </span>
                      <span className="font-medium text-white text-[11px] leading-tight truncate">Gin Tonic Clásico</span>
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="font-mono text-zinc-200 font-bold text-[11px]">$5.200</span>
                      <div className="w-4 h-4 rounded bg-[#1c1c1f] text-zinc-400 flex items-center justify-center">
                        <Plus className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (4 cols): Comanda Drawer Panel */}
              <div className="lg:col-span-4 bg-[#121214] border border-zinc-800 rounded-2xl p-2.5 sm:p-3 flex flex-col justify-between min-h-0">
                
                <div className="min-h-0 flex flex-col">
                  {/* Comanda Header */}
                  <div className="flex items-center justify-between pb-1.5 border-b border-zinc-800/80 mb-1.5 shrink-0">
                    <div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#f43f5e]" />
                        <span className="font-bold text-white text-xs sm:text-sm">Mesa 02</span>
                        <span className="text-[8px] bg-[#1c1c1f] text-zinc-400 px-1.5 py-0.5 rounded font-semibold uppercase">
                          SALÓN
                        </span>
                      </div>
                      <span className="text-[9px] text-zinc-500">4 sillas &bull; 2 comensales &bull; {itemCount} items</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <div className="px-2 py-0.5 rounded-lg bg-[#1c1c1f] border border-zinc-800 text-zinc-200 text-[9px] font-medium flex items-center gap-1">
                        <Printer className="w-2.5 h-2.5" /> Cocina <span className="text-[8px] opacity-70">F8</span>
                      </div>
                      <div className="p-0.5 rounded-lg bg-[#1c1c1f] border border-zinc-800 text-zinc-400">
                        <RotateCcw className="w-2.5 h-2.5" />
                      </div>
                    </div>
                  </div>

                  {/* Items in Cart */}
                  <div className="space-y-1 overflow-y-auto scrollbar-none flex-1 min-h-0">
                    {itemCount === 0 && (
                      <div className="py-6 text-center text-zinc-600 text-[11px] font-light">
                        Cargando comanda...
                      </div>
                    )}

                    {/* Item 1 */}
                    {showProduct1 && (
                      <div className="p-1.5 rounded-lg bg-[#18181b] border border-zinc-800">
                        <div className="flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-1 truncate">
                            <span className="font-bold text-white truncate">1x Burger Clásica</span>
                            <span className="text-[8px] bg-[#451a03] text-[#fcd34d] border border-[#92400e] px-1 rounded font-medium">
                              Por imprimir
                            </span>
                          </div>
                          <span className="font-mono font-bold text-white shrink-0 ml-1">$8.500</span>
                        </div>
                        <div className="text-[9px] text-[#f59e0b] font-light mt-0.5 flex justify-between">
                          <span>+ Papas fritas</span>
                          <strong className="font-mono text-zinc-300">+$3.000</strong>
                        </div>
                      </div>
                    )}

                    {/* Item 2 */}
                    {showProduct2 && (
                      <div className="p-1.5 rounded-lg bg-[#18181b] border border-zinc-800">
                        <div className="flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-1 truncate">
                            <span className="font-bold text-white truncate">1x Burger Bacon</span>
                            <span className="text-[8px] bg-[#451a03] text-[#fcd34d] border border-[#92400e] px-1 rounded font-medium">
                              Por imprimir
                            </span>
                          </div>
                          <span className="font-mono font-bold text-white shrink-0 ml-1">$9.200</span>
                        </div>
                        <div className="text-[9px] text-[#f59e0b] font-light mt-0.5 flex justify-between">
                          <span>+ Papas fritas</span>
                          <strong className="font-mono text-zinc-300">+$3.000</strong>
                        </div>
                      </div>
                    )}

                    {/* Item 3 */}
                    {showProduct3 && (
                      <div className="p-1.5 rounded-lg bg-[#18181b] border border-zinc-800">
                        <div className="flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-1 truncate">
                            <span className="font-bold text-white truncate">1x Pinta IPA</span>
                            <span className="text-[8px] bg-[#451a03] text-[#fcd34d] border border-[#92400e] px-1 rounded font-medium">
                              Por imprimir
                            </span>
                          </div>
                          <span className="font-mono font-bold text-white shrink-0 ml-1">$4.200</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Subtotal & 2 Action Buttons */}
                <div className="pt-1.5 border-t border-zinc-800 space-y-1 shrink-0">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400">
                    <span className="uppercase text-[9px]">SUBTOTAL :</span>
                    <span className="text-white font-bold">{currentTotal}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono font-bold">
                    <span className="uppercase text-[9px] text-zinc-400">TOTAL COMANDA:</span>
                    <span className="text-white text-sm">{currentTotal}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5 pt-0.5">
                    <div className="py-1.5 px-1 rounded-xl font-bold text-[11px] flex items-center justify-center gap-1 bg-[#f59e0b] text-black">
                      <Printer className="w-3 h-3" />
                      <span>Imprimir ({itemCount}) [F8]</span>
                    </div>

                    <div className={`py-1.5 px-1 rounded-xl font-bold text-[11px] flex items-center justify-center gap-1 transition-colors duration-150 ${
                      isCobrando
                        ? "bg-[#10b981] text-black"
                        : "bg-white text-black"
                    }`}>
                      <CreditCard className="w-3 h-3" />
                      <span>{isCobrando ? "Cobrado [F9]" : "Cobrar [F9]"}</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────
          PHASE 6: 80MM THERMAL RECEIPT SLIDES UP FROM BOTTOM
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-x-0 bottom-0 top-0 z-30 flex items-end justify-center pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
        style={{
          transform: showTicket ? "translateY(0%)" : "translateY(105%)",
        }}
      >
        {/* Solid dark shade behind ticket (no blur) */}
        <div className="absolute inset-0 bg-black/80" />

        {/* Monospace White Thermal Paper Slip with Direct Serrated Jagged Top Clip-Path */}
        <div className="relative w-full max-w-xs bg-white text-zinc-950 font-mono p-4 sm:p-5 pt-5 text-[10px] leading-tight shadow-2xl space-y-2 [clip-path:polygon(0%_10px,2.5%_0px,5%_10px,7.5%_0px,10%_10px,12.5%_0px,15%_10px,17.5%_0px,20%_10px,22.5%_0px,25%_10px,27.5%_0px,30%_10px,32.5%_0px,35%_10px,37.5%_0px,40%_10px,42.5%_0px,45%_10px,47.5%_0px,50%_10px,52.5%_0px,55%_10px,57.5%_0px,60%_10px,62.5%_0px,65%_10px,67.5%_0px,70%_10px,72.5%_0px,75%_10px,77.5%_0px,80%_10px,82.5%_0px,85%_10px,87.5%_0px,90%_10px,92.5%_0px,95%_10px,97.5%_0px,100%_10px,100%_100%,0%_100%)]">
          
          {/* Header */}
          <div className="text-center pb-2 border-b border-dashed border-zinc-400">
            <div className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-700 uppercase tracking-wider mb-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>VENTA COBRADA &bull; MESA LIBERADA</span>
            </div>
            <p className="font-extrabold text-xs tracking-wider text-black">*** COMPROBANTE DE PAGO ***</p>
            <p className="font-bold text-xs mt-0.5 text-black">MESA 02 - SALÓN PRINCIPAL</p>
            <div className="flex justify-between text-[9px] text-zinc-600 mt-1">
              <span>Ticket: #44</span>
              <span>Mozo: Lucas M.</span>
            </div>
            <div className="flex justify-between text-[9px] text-zinc-600">
              <span>Fecha: 01/09/2026</span>
              <span>Hora: 21:42 hs</span>
            </div>
          </div>

          {/* Items */}
          <div className="py-2 border-b border-dashed border-zinc-400 space-y-1">
            <div className="flex justify-between font-bold text-black text-[10px]">
              <span>1x BURGER CLÁSICA (+ Papas)</span>
              <span>$11.500</span>
            </div>
            <div className="flex justify-between font-bold text-black text-[10px]">
              <span>1x BURGER BACON (+ Papas)</span>
              <span>$10.100</span>
            </div>
            <div className="flex justify-between font-bold text-black text-[10px]">
              <span>1x PINTA IPA ARTESANAL</span>
              <span>$4.200</span>
            </div>
          </div>

          {/* Totals */}
          <div className="space-y-0.5 pt-1.5">
            <div className="flex justify-between font-extrabold text-xs text-black border-t border-dashed border-zinc-300 pt-1">
              <span>TOTAL COBRADO:</span>
              <span className="text-emerald-700 text-sm font-bold">$25.800</span>
            </div>
            <div className="flex justify-between text-[9px] text-zinc-700 pt-0.5">
              <span>Forma de Pago:</span>
              <strong className="text-black">EFECTIVO (EXACTO)</strong>
            </div>
          </div>

          {/* Footer Receipt Summary */}
          <div className="pt-2 text-center text-[9px] text-zinc-600 space-y-0.5">
            <p className="font-bold text-[8px] tracking-widest text-zinc-500 pt-0.5">ROOSTY POS &bull; CIERRE DE MESA</p>
          </div>

        </div>
      </div>

      {/* Bottom Timeline Controller Bar */}
      <div className="bg-[#121214] px-4 py-2 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400 shrink-0">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-[#f59e0b] shrink-0" />
          <span className="font-medium text-zinc-300 truncate">
            {phase === 0 && "1. Mapa de Salón: Visualización de mesas abiertas"}
            {phase === 1 && "2. Selección de Mesa 02"}
            {phase === 2 && "3. Deslizamiento a Comanda y carga de Burger Clásica"}
            {phase === 3 && "4. Carga de Burger Bacon Crispy"}
            {phase === 4 && "5. Carga de Pinta IPA Artesanal"}
            {phase === 5 && "6. Cobro Express F9"}
            {phase === 6 && "7. Emisión de comprobante y mesa liberada al instante"}
          </span>
        </div>
        <span className="font-mono text-zinc-500 shrink-0 ml-2">Paso {phase + 1} de 7</span>
      </div>
    </div>
  );
}
