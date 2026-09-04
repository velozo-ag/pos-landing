"use client";

import { useState, useEffect, useRef } from "react";
import {
  UtensilsCrossed,
  Check,
  Printer,
  Maximize2,
  RefreshCw,
  Clock,
} from "lucide-react";

export default function KDSDemo() {
  // Procedural Timeline (5 exact phases):
  // 0: Entrada de comanda - Llega el ticket térmico físico desde el POS (F8)
  // 1: Popup en KDS - La comanda #038 (Mesa 02) hace popup en pantalla como nuevo pedido (0/2 listos)
  // 2: Tache 1 - El cocinero tacha el primer plato (Burger Bacon Crispy) -> 1/2 listos
  // 3: Tache 2 - El cocinero tacha el segundo plato (Burger Clásica Doble) -> 2/2 listos
  // 4: Despacho - Al estar 2/2 listos se despacha de una (Comanda Completa Despachada)
  const [phase, setPhase] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  // Viewport Intersection Observer: completely pauses when off-screen
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

  // Continuous procedural timer loop (5 phases in bucle)
  useEffect(() => {
    if (!isInView) return;

    const durations = [2800, 2200, 1400, 1400, 3200];
    const timer = setTimeout(() => {
      setPhase((prev) => (prev + 1) % 5);
    }, durations[phase]);

    return () => clearTimeout(timer);
  }, [phase, isInView]);

  const showIncomingTicket = phase === 0;
  const isPopupEntry = phase === 1;
  const item1Done = phase >= 2;
  const item2Done = phase >= 3;
  const allItemsDone = phase >= 3;
  const isDispatched = phase >= 4;

  return (
    <div
      ref={containerRef}
      className="w-full aspect-[16/10] sm:aspect-video bg-[#09090b] text-zinc-100 font-sans text-xs select-none rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl relative flex flex-col justify-between pointer-events-none cursor-default"
    >
      {/* ─────────────────────────────────────────────────────────────
          MAIN KDS WORKSPACE (Exact 100% replica of KDS.png)
      ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 p-2.5 sm:p-3 flex flex-col justify-between overflow-hidden bg-[#09090b]">
        
        {/* KDS Header Banner (Exact KDS.png) */}
        <div className="p-2 sm:p-2.5 rounded-2xl bg-[#121214] border border-zinc-800 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-xl bg-[#231507] border border-[#78350f] text-[#f59e0b] flex items-center justify-center shrink-0">
              <UtensilsCrossed className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-xs sm:text-sm tracking-wider">
                  COCINA & BARRA KDS
                </h3>
                <span className="text-[8px] font-extrabold uppercase px-1.5 py-0.2 rounded-full bg-[#042f1f] border border-[#15803d] text-[#22c55e] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-ping" />
                  EN VIVO
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 font-mono">
                <strong className="text-white">{isDispatched ? "1" : "2"}</strong> comandas pendientes &bull; <strong className="text-white">{isDispatched ? "1" : (allItemsDone ? "0" : (item1Done ? "1" : "2"))}</strong> platos/tragos por marchar
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-1 rounded-xl bg-[#27272a] text-white font-bold text-[10px] shadow-xs">
              Todos (3)
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-[#121214] text-zinc-400 text-[10px] hidden sm:inline">
              Pendientes ({isDispatched ? "1" : "2"})
            </span>
            <span className="px-2.5 py-1 rounded-xl bg-[#121214] text-zinc-400 text-[10px] hidden sm:inline">
              Listos ({isDispatched ? "2" : "1"})
            </span>
            <div className="p-1 rounded-xl bg-[#121214] border border-zinc-800 text-zinc-400">
              <RefreshCw className="w-3 h-3" />
            </div>
            <div className="p-1 rounded-xl bg-[#121214] border border-zinc-800 text-zinc-400">
              <Maximize2 className="w-3 h-3" />
            </div>
          </div>
        </div>

        {/* 3 KDS Cards Grid (Exact KDS.png) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 flex-1 min-h-0 pt-1.5">
          
          {/* Card 1: #043 Mesa (Comanda Completa Despachada) */}
          <div className="p-2.5 rounded-2xl bg-[#08120c] border border-[#064e3b] flex flex-col justify-between opacity-75">
            <div>
              <div className="flex items-center justify-between mb-0.5 text-[10px]">
                <span className="font-mono text-zinc-400 font-bold">#043</span>
                <span className="text-[8px] font-bold text-[#34d399] bg-[#064e3b] px-1.5 py-0.2 rounded-full border border-[#059669]">
                  0m Nuevo
                </span>
              </div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-extrabold text-white text-xs">MESA 04</span>
                <span className="text-[9px] text-zinc-400 font-mono">1/1 listos</span>
              </div>

              <div className="p-1.5 rounded-xl bg-[#06100a] border border-[#064e3b]/50 flex items-center justify-between opacity-50">
                <span className="line-through text-zinc-500 text-[10px]">1x Pinta IPA Artesanal</span>
                <span className="w-3.5 h-3.5 rounded bg-[#064e3b] text-[#34d399] flex items-center justify-center">
                  <Check className="w-2 h-2" />
                </span>
              </div>
            </div>

            <div className="w-full py-1.5 rounded-xl bg-[#064e3b]/70 border border-[#059669] text-[#34d399] font-bold text-[10px] flex items-center justify-center gap-1">
              <Check className="w-3 h-3" />
              <span>Comanda Completa Despachada</span>
            </div>
          </div>

          {/* Card 2: #038 Mesa 02 (The Active Interactive Ticket) */}
          <div
            className={`p-2.5 rounded-2xl border-2 transition-all duration-300 flex flex-col justify-between ${
              isDispatched
                ? "bg-[#08120c] border-[#064e3b] shadow-lg shadow-emerald-950/40"
                : isPopupEntry
                ? "bg-[#14080b] border-[#e11d48] scale-[1.02] ring-2 ring-rose-500/40 shadow-xl"
                : "bg-[#14080b] border-[#e11d48]"
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-0.5 text-[10px]">
                <span className="font-mono text-zinc-400 font-bold">#038</span>
                <span
                  className={`text-[8px] font-bold px-1.5 py-0.2 rounded-full border ${
                    isDispatched
                      ? "text-[#34d399] bg-[#064e3b] border-[#059669]"
                      : "text-[#fda4af] bg-[#4c0519] border-[#9f1239]"
                  }`}
                >
                  {isDispatched ? "0m Listo" : isPopupEntry ? "0m Nuevo" : "4m Demorado"}
                </span>
              </div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-extrabold text-white text-xs">MESA 02</span>
                <span className="text-[9px] font-mono font-bold text-zinc-400">
                  {allItemsDone
                    ? "2/2 listos"
                    : item1Done
                    ? "1/2 listos"
                    : "0/2 listos"}
                </span>
              </div>

              <div className="space-y-1">
                {/* Item 1: Burger Bacon Crispy */}
                <div
                  className={`p-1.5 rounded-xl border flex items-center justify-between transition-all duration-200 ${
                    item1Done
                      ? "bg-[#06100a] border-[#064e3b]/50 opacity-60"
                      : "bg-[#1c0e12] border-zinc-800/80"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-3.5 h-3.5 rounded font-extrabold flex items-center justify-center text-[9px] ${
                        item1Done ? "bg-zinc-800 text-zinc-400" : "bg-[#f59e0b] text-black"
                      }`}>
                        1x
                      </span>
                      <span className={item1Done ? "line-through text-zinc-500 text-[10px]" : "font-bold text-white text-[10px]"}>
                        Burger Bacon Crispy
                      </span>
                    </div>
                    <span className="text-[8px] text-[#f59e0b] block font-light ml-4">+ Papas fritas</span>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-lg flex items-center justify-center transition-colors ${
                      item1Done ? "bg-[#064e3b] text-[#34d399]" : "bg-[#1c1c1f] text-zinc-600 border border-zinc-800"
                    }`}
                  >
                    <Check className="w-2.5 h-2.5" />
                  </div>
                </div>

                {/* Item 2: Burger Clásica Doble */}
                <div
                  className={`p-1.5 rounded-xl border flex items-center justify-between transition-all duration-200 ${
                    item2Done
                      ? "bg-[#06100a] border-[#064e3b]/50 opacity-60"
                      : phase === 2
                      ? "bg-[#1c0e12] border-[#f59e0b] shadow-xs"
                      : "bg-[#1c0e12] border-zinc-800/80"
                  }`}
                >
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className={`w-3.5 h-3.5 rounded font-extrabold flex items-center justify-center text-[9px] ${
                        item2Done ? "bg-zinc-800 text-zinc-400" : "bg-[#f59e0b] text-black"
                      }`}>
                        1x
                      </span>
                      <span className={item2Done ? "line-through text-zinc-500 text-[10px]" : "font-bold text-white text-[10px]"}>
                        Burger Clásica Doble
                      </span>
                    </div>
                    <span className="text-[8px] text-[#f59e0b] block font-light ml-4">+ Papas fritas</span>
                  </div>
                  <div
                    className={`w-4 h-4 rounded-lg flex items-center justify-center transition-colors ${
                      item2Done ? "bg-[#064e3b] text-[#34d399]" : "bg-[#1c1c1f] text-zinc-600 border border-zinc-800"
                    }`}
                  >
                    <Check className="w-2.5 h-2.5" />
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Card Action: Marchar Todo el Ticket -> Comanda Completa Despachada */}
            <div
              className={`w-full py-1.5 rounded-xl font-bold text-[10px] flex items-center justify-center gap-1 transition-all ${
                isDispatched
                  ? "bg-[#064e3b] border border-[#059669] text-[#34d399]"
                  : "bg-[#00c978] text-black shadow-sm"
              }`}
            >
              <Check className="w-3 h-3" />
              <span>
                {isDispatched
                  ? "Comanda Completa Despachada"
                  : "Marchar Todo el Ticket"}
              </span>
            </div>
          </div>

          {/* Card 3: #037 Mesa 03 (Beverages in Queue) */}
          <div className="p-2.5 rounded-2xl bg-[#14080b] border-2 border-[#e11d48] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-0.5 text-[10px]">
                <span className="font-mono text-zinc-400 font-bold">#037</span>
                <span className="text-[8px] font-bold text-[#fda4af] bg-[#4c0519] px-1.5 py-0.2 rounded-full border border-[#9f1239]">
                  6m Demorado
                </span>
              </div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-extrabold text-white text-xs">MESA 03</span>
                <span className="text-[9px] text-zinc-400 font-mono">0/2 listos</span>
              </div>

              <div className="space-y-1">
                <div className="p-1.5 rounded-xl bg-[#1c0e12] border border-zinc-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded bg-[#f59e0b] text-black font-extrabold flex items-center justify-center text-[9px]">
                      2x
                    </span>
                    <span className="text-zinc-200 text-[10px] font-medium">Corona Porrón 330ml</span>
                  </div>
                  <div className="w-3.5 h-3.5 rounded-lg bg-[#1c1c1f] text-zinc-600 border border-zinc-800 flex items-center justify-center">
                    <Check className="w-2 h-2" />
                  </div>
                </div>

                <div className="p-1.5 rounded-xl bg-[#1c0e12] border border-zinc-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3.5 h-3.5 rounded bg-[#f59e0b] text-black font-extrabold flex items-center justify-center text-[9px]">
                      1x
                    </span>
                    <span className="text-zinc-200 text-[10px] font-medium">Pinta Honey</span>
                  </div>
                  <div className="w-3.5 h-3.5 rounded-lg bg-[#1c1c1f] text-zinc-600 border border-zinc-800 flex items-center justify-center">
                    <Check className="w-2 h-2" />
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full py-1.5 rounded-xl bg-[#00c978] text-black font-bold text-[10px] flex items-center justify-center gap-1">
              <Check className="w-3 h-3" />
              <span>Marchar Todo el Ticket</span>
            </div>
          </div>

        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          INCOMING THERMAL 80mm KITCHEN SLIP AT THE START (From POS / F8)
          Puntiaguda / Serrated Paper Cut on Top (Pure 100% White Paper)
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-x-0 bottom-0 top-0 z-30 flex items-end justify-center pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
        style={{
          transform: showIncomingTicket ? "translateY(0%)" : "translateY(105%)",
        }}
      >
        {/* Solid dark backdrop */}
        <div className="absolute inset-0 bg-black/85" />

        {/* 80mm Kitchen Thermal Paper Slip with Direct Serrated Jagged Top Clip-Path */}
        <div className="relative w-full max-w-xs bg-white text-zinc-950 font-mono p-4 sm:p-5 pt-5 text-[10px] leading-tight shadow-2xl space-y-2 [clip-path:polygon(0%_10px,2.5%_0px,5%_10px,7.5%_0px,10%_10px,12.5%_0px,15%_10px,17.5%_0px,20%_10px,22.5%_0px,25%_10px,27.5%_0px,30%_10px,32.5%_0px,35%_10px,37.5%_0px,40%_10px,42.5%_0px,45%_10px,47.5%_0px,50%_10px,52.5%_0px,55%_10px,57.5%_0px,60%_10px,62.5%_0px,65%_10px,67.5%_0px,70%_10px,72.5%_0px,75%_10px,77.5%_0px,80%_10px,82.5%_0px,85%_10px,87.5%_0px,90%_10px,92.5%_0px,95%_10px,97.5%_0px,100%_10px,100%_100%,0%_100%)]">
          
          {/* Header */}
          <div className="text-center pb-2 border-b border-dashed border-zinc-400">
            <p className="font-extrabold text-xs tracking-wider text-black">*** COMANDA DE COCINA ***</p>
            <p className="font-bold text-xs mt-1 text-black">MESA 02 - SALÓN (ELABORACIÓN)</p>
            <div className="flex justify-between text-[9px] text-zinc-600 mt-1">
              <span>Hora: 07:43 p. m. hs</span>
              <span>Ticket: #038</span>
            </div>
            <div className="flex justify-start text-[9px] text-zinc-600">
              <span>Fecha: 30/08/2026</span>
            </div>
          </div>

          {/* Items / Detalle */}
          <div className="py-2 border-b border-dashed border-zinc-400 space-y-1">
            <p className="text-[9px] text-zinc-500 uppercase tracking-wider font-bold">CANT / DETALLE</p>
            <p className="font-extrabold text-xs text-black">[1x] BURGER CLÁSICA DOBLE</p>
            <p className="font-extrabold text-xs text-black">[1x] BURGER BACON CRISPY</p>
          </div>

          {/* Footer Summary */}
          <div className="pt-1.5 text-center text-[9px] text-zinc-600 space-y-0.5">
            <p>Total ítems marchados: <strong className="text-black">2</strong></p>
            <p className="font-bold text-[8px] tracking-widest text-zinc-500 pt-0.5">POS BAR & RESTO</p>
          </div>

        </div>
      </div>

      {/* Bottom Timeline Step Bar (Exact 5 Steps) */}
      <div className="bg-[#121214] px-4 py-2 border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-400 shrink-0">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-[#f59e0b] shrink-0" />
          <span className="font-medium text-zinc-300 truncate">
            {phase === 0 && "1. Entrada de comanda: El ticket físico de cocina entra desde el POS (F8)"}
            {phase === 1 && "2. Pantalla KDS: La orden #038 hace popup en vivo como nuevo pedido"}
            {phase === 2 && "3. Tache táctil: El cocinero tacha el primer plato listo (1/2)"}
            {phase === 3 && "4. Tache táctil: El cocinero tacha el segundo plato listo (2/2)"}
            {phase === 4 && "5. Despacho automático: Al estar todo listo la comanda se despacha de una"}
          </span>
        </div>
        <span className="font-mono text-zinc-500 shrink-0 ml-2">Paso {phase + 1} de 5</span>
      </div>

    </div>
  );
}
