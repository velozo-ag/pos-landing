"use client";

import { useState, useEffect, useRef } from "react";
import {
  Bike,
  Printer,
  MapPin,
  Phone,
  Search,
  Plus,
  Trash2,
  X,
  CreditCard,
  Truck,
  RotateCcw,
  Pencil,
  Check,
} from "lucide-react";

export default function QRMenuDeliveryDemo() {
  // Procedural Timeline:
  // 0: Web order arrives in POS (#38 with address & items)
  // 1: Blue "Enviar con Cadete" button triggers dispatch
  // 2: Thermal 80mm Cadete Ticket slides up from bottom
  const [step, setStep] = useState(0);
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
    if (!isInView) return;

    const durations = [3200, 1800, 3400];
    const timer = setTimeout(() => {
      setStep((prev) => (prev + 1) % 3);
    }, durations[step]);

    return () => clearTimeout(timer);
  }, [step, isInView]);

  const showCadeteTicket = step === 2;

  return (
    <div
      ref={containerRef}
      className="w-full aspect-[16/10] sm:aspect-video bg-[#09090b] text-zinc-100 font-sans text-xs select-none rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl relative flex flex-col justify-between pointer-events-none cursor-default"
    >
      {/* ─────────────────────────────────────────────────────────────
          MAIN CONTENT AREA (Exact replica of POS COMANDA WEB.png)
      ───────────────────────────────────────────────────────────── */}
      <div className="flex-1 p-2.5 sm:p-3.5 flex flex-col justify-between overflow-hidden bg-[#09090b]">
        
        {/* Top Active Orders Ribbon */}
        <div className="flex items-center justify-between pb-1.5 shrink-0">
          <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
            {/* Delivery Tab 43 */}
            <div className="px-3.5 py-1.5 rounded-xl bg-[#121214] border border-zinc-800 text-center">
              <span className="text-[8px] text-[#f59e0b] font-bold block uppercase tracking-wider">
                DELIVERY
              </span>
              <span className="font-mono text-white font-bold text-xs">#43</span>
            </div>

            {/* Selected Active Order #38 with Amber border & glow */}
            <div className="px-3.5 py-1.5 rounded-xl bg-[#181309] border-2 border-[#d97706] text-center shadow-xs">
              <span className="text-[8px] text-[#f59e0b] font-bold block uppercase tracking-wider">
                DELIVERY
              </span>
              <span className="font-mono text-[#f59e0b] font-bold text-xs">#38</span>
            </div>

            {/* Delivery Tab 37 */}
            <div className="px-3.5 py-1.5 rounded-xl bg-[#121214] border border-zinc-800 text-center hidden sm:block">
              <span className="text-[8px] text-[#f59e0b] font-bold block uppercase tracking-wider">
                DELIVERY
              </span>
              <span className="font-mono text-white font-bold text-xs">#37</span>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-[#121214] border border-zinc-800 text-zinc-400 flex items-center gap-1.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#f43f5e]" />
              <span>Mesa 02</span>
            </div>

            <div className="px-3.5 py-2 rounded-xl bg-[#121214] border border-zinc-800 text-zinc-400 flex items-center gap-1.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-[#f59e0b]" />
              <span>Mesa 03</span>
            </div>
          </div>

          <div className="w-7 h-7 rounded-xl bg-[#1c1c1f] border border-zinc-800 flex items-center justify-center text-zinc-400">
            <Search className="w-3.5 h-3.5" />
          </div>
        </div>

        {/* 2-Column Split: Catalog Products (Left 60%) + Comanda Delivery Panel (Right 40%) */}
        <div className="grid grid-cols-12 gap-2 flex-1 min-h-0 pt-1">
          
          {/* Left Column (7 cols): Catalog Products Grid */}
          <div className="col-span-7 flex flex-col justify-between pr-1">
            
            {/* Search Input Bar + Categories */}
            <div className="space-y-1 mb-1 shrink-0">
              <div className="flex items-center gap-1.5">
                <div className="relative flex-1">
                  <Search className="w-3 h-3 text-zinc-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <div className="w-full bg-[#121214] border border-zinc-800 rounded-lg pl-7 pr-2 py-1 text-[10px] text-zinc-400 font-mono flex items-center justify-between">
                    <span>Buscar... (/)</span>
                    <span className="text-zinc-600">/</span>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <span className="px-2 py-1 rounded-lg bg-[#27272a] text-white font-bold text-[9px]">
                    Todos (33)
                  </span>
                  <span className="px-2 py-1 rounded-lg bg-[#121214] text-zinc-400 text-[9px] hidden sm:inline">
                    Cervezas
                  </span>
                </div>
              </div>
            </div>

            {/* Products 2x3 Grid */}
            <div className="grid grid-cols-2 gap-1.5 flex-1 min-h-0">
              
              {/* Product 1: Pinta IPA */}
              <div className="p-1.5 rounded-xl bg-[#121214] border border-zinc-800/80 flex items-center justify-between gap-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-[#1c1c1f] flex items-center justify-center text-[9px] font-bold text-zinc-400 shrink-0">
                    PI
                  </div>
                  <div className="min-w-0">
                    <span className="text-white font-medium text-[10px] block truncate">
                      Pinta IPA
                    </span>
                    <span className="font-mono text-[#f59e0b] font-bold text-[10px]">
                      $4.200
                    </span>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-lg bg-[#1c1c1f] flex items-center justify-center text-zinc-400 shrink-0">
                  <Plus className="w-3 h-3" />
                </div>
              </div>

              {/* Product 2: Pinta Honey */}
              <div className="p-1.5 rounded-xl bg-[#121214] border border-zinc-800/80 flex items-center justify-between gap-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-[#1c1c1f] flex items-center justify-center text-[9px] font-bold text-zinc-400 shrink-0">
                    PH
                  </div>
                  <div className="min-w-0">
                    <span className="text-white font-medium text-[10px] block truncate">
                      Pinta Honey
                    </span>
                    <span className="font-mono text-[#f59e0b] font-bold text-[10px]">
                      $4.000
                    </span>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-lg bg-[#1c1c1f] flex items-center justify-center text-zinc-400 shrink-0">
                  <Plus className="w-3 h-3" />
                </div>
              </div>

              {/* Product 3: Burger Clásica (Selected with amber pill) */}
              <div className="p-1.5 rounded-xl bg-[#181309] border border-[#d97706] flex items-center justify-between gap-1 shadow-xs">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-[#271e0c] flex items-center justify-center text-[9px] font-bold text-[#f59e0b] shrink-0">
                    BC
                  </div>
                  <div className="min-w-0">
                    <span className="text-white font-bold text-[10px] block truncate">
                      Burger Clásica
                    </span>
                    <span className="font-mono text-[#f59e0b] font-bold text-[10px]">
                      $8.500
                    </span>
                  </div>
                </div>
                <span className="w-4 h-4 rounded bg-[#f59e0b] text-black font-extrabold text-[9px] flex items-center justify-center shrink-0">
                  1
                </span>
              </div>

              {/* Product 4: Burger Bacon Crispy (Selected with amber pill) */}
              <div className="p-1.5 rounded-xl bg-[#181309] border border-[#d97706] flex items-center justify-between gap-1 shadow-xs">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-[#271e0c] flex items-center justify-center text-[9px] font-bold text-[#f59e0b] shrink-0">
                    BB
                  </div>
                  <div className="min-w-0">
                    <span className="text-white font-bold text-[10px] block truncate">
                      Burger Bacon
                    </span>
                    <span className="font-mono text-[#f59e0b] font-bold text-[10px]">
                      $9.200
                    </span>
                  </div>
                </div>
                <span className="w-4 h-4 rounded bg-[#f59e0b] text-black font-extrabold text-[9px] flex items-center justify-center shrink-0">
                  1
                </span>
              </div>

              {/* Product 5: Fernet con Coca */}
              <div className="p-1.5 rounded-xl bg-[#121214] border border-zinc-800/80 flex items-center justify-between gap-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-[#1c1c1f] flex items-center justify-center text-[9px] font-bold text-zinc-400 shrink-0">
                    FE
                  </div>
                  <div className="min-w-0">
                    <span className="text-white font-medium text-[10px] block truncate">
                      Fernet Branca
                    </span>
                    <span className="font-mono text-[#f59e0b] font-bold text-[10px]">
                      $4.800
                    </span>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-lg bg-[#1c1c1f] flex items-center justify-center text-zinc-400 shrink-0">
                  <Plus className="w-3 h-3" />
                </div>
              </div>

              {/* Product 6: Corona Porrón */}
              <div className="p-1.5 rounded-xl bg-[#121214] border border-zinc-800/80 flex items-center justify-between gap-1">
                <div className="flex items-center gap-1.5 min-w-0">
                  <div className="w-6 h-6 rounded-lg bg-[#1c1c1f] flex items-center justify-center text-[9px] font-bold text-zinc-400 shrink-0">
                    CO
                  </div>
                  <div className="min-w-0">
                    <span className="text-white font-medium text-[10px] block truncate">
                      Corona 330ml
                    </span>
                    <span className="font-mono text-[#f59e0b] font-bold text-[10px]">
                      $3.900
                    </span>
                  </div>
                </div>
                <div className="w-5 h-5 rounded-lg bg-[#1c1c1f] flex items-center justify-center text-zinc-400 shrink-0">
                  <Plus className="w-3 h-3" />
                </div>
              </div>

            </div>
          </div>

          {/* Right Column (5 cols): Comanda Panel for Delivery #38 */}
          <div className="col-span-5 bg-[#121214] rounded-2xl border border-zinc-800 p-2.5 flex flex-col justify-between overflow-hidden">
            
            {/* Header: Delivery #38 Header + Cadete & Cocina Tags */}
            <div className="space-y-1 pb-1.5 border-b border-zinc-800 shrink-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <Bike className="w-3.5 h-3.5 text-[#f59e0b]" />
                  <span className="font-mono font-bold text-white text-[11px]">
                    Delivery #38
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="px-1.5 py-0.2 rounded bg-[#1c1509] border border-[#78350f] text-[#f59e0b] font-mono text-[9px]">
                    Cadete F7
                  </span>
                  <span className="px-1.5 py-0.2 rounded bg-[#1c1c1f] text-zinc-400 font-mono text-[9px]">
                    Cocina F8
                  </span>
                </div>
              </div>

              {/* Address & Payment Info */}
              <div className="flex items-center justify-between text-[9px] text-zinc-400 font-mono">
                <span className="flex items-center gap-1 text-zinc-300">
                  <MapPin className="w-2.5 h-2.5 text-[#f59e0b]" />
                  <span>Av. Santa Fe 2410</span>
                </span>
                <span className="bg-[#1c1c1f] px-1 py-0.2 rounded text-zinc-400">
                  TRANSFERENCIA
                </span>
              </div>
            </div>

            {/* Loaded Items in Comanda with Modifiers */}
            <div className="space-y-1.5 py-1.5 flex-1 overflow-y-auto scrollbar-none text-[10px]">
              
              {/* Item 1: Burger Clásica Doble */}
              <div className="p-1.5 rounded-xl bg-[#18181b] border border-zinc-800/80">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-[10px]">
                    1x Burger Clásica Doble
                  </span>
                  <span className="font-mono font-bold text-[#f59e0b] text-[10px]">
                    $8.500
                  </span>
                </div>
                <div className="flex items-center justify-between text-[8px] text-zinc-400 pl-1 mt-0.5">
                  <span className="text-[#f59e0b]">+ Papas fritas</span>
                  <span className="text-zinc-500 font-mono">+$3.000</span>
                </div>
              </div>

              {/* Item 2: Burger Bacon Crispy */}
              <div className="p-1.5 rounded-xl bg-[#18181b] border border-zinc-800/80">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-[10px]">
                    1x Burger Bacon Crispy
                  </span>
                  <span className="font-mono font-bold text-[#f59e0b] text-[10px]">
                    $9.200
                  </span>
                </div>
                <div className="flex items-center justify-between text-[8px] text-zinc-400 pl-1 mt-0.5">
                  <span className="text-[#f59e0b]">+ Papas fritas</span>
                  <span className="text-zinc-500 font-mono">+$3.000</span>
                </div>
              </div>

            </div>

            {/* Subtotal, Envío a Domicilio & Blue Despacho Button */}
            <div className="pt-1.5 border-t border-zinc-800 space-y-1 shrink-0">
              <div className="flex items-center justify-between text-[10px] font-mono text-zinc-400">
                <span className="uppercase text-[8px]">SUBTOTAL :</span>
                <span className="text-white font-bold">$23.700</span>
              </div>

              <div className="p-1 rounded-lg bg-[#18181b] border border-zinc-800 flex items-center justify-between text-[10px] font-mono text-[#f59e0b]">
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3" />
                  <span>Envío a Domicilio</span>
                </span>
                <div className="flex items-center gap-1">
                  <span className="font-bold">+$2.100</span>
                  <Pencil className="w-2.5 h-2.5 text-zinc-400 ml-1" />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs font-mono font-bold">
                <span className="uppercase text-[8px] text-zinc-400">TOTAL COMANDA:</span>
                <span className="text-white text-sm">$25.800</span>
              </div>

              {/* Solid Blue Dispatch Button */}
              <div
                className={`w-full py-1.5 px-2 rounded-xl text-white font-bold text-[10px] flex items-center justify-center gap-1.5 transition-all ${
                  step === 1
                    ? "bg-[#2563eb] shadow-lg shadow-blue-600/40 ring-2 ring-blue-300"
                    : "bg-[#2563eb]"
                }`}
              >
                <Bike className="w-3 h-3" />
                <span>Enviar con Cadete (Despachar)</span>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          SMOOTH THERMAL 80mm CADETE TICKET SLIP (POPUP FROM BOTTOM)
      ───────────────────────────────────────────────────────────── */}
      <div
        className="absolute inset-x-0 bottom-0 top-0 z-30 flex items-end justify-center pointer-events-none transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
        style={{
          transform: showCadeteTicket ? "translateY(0%)" : "translateY(105%)",
        }}
      >
        <div className="absolute inset-0 bg-black/80" />

        {/* Monospace White Thermal Paper Cadete Slip with Direct Serrated Jagged Top Clip-Path */}
        <div className="relative w-full max-w-xs bg-white text-zinc-950 font-mono p-4 sm:p-5 pt-5 text-[10px] leading-tight shadow-2xl space-y-2 [clip-path:polygon(0%_10px,2.5%_0px,5%_10px,7.5%_0px,10%_10px,12.5%_0px,15%_10px,17.5%_0px,20%_10px,22.5%_0px,25%_10px,27.5%_0px,30%_10px,32.5%_0px,35%_10px,37.5%_0px,40%_10px,42.5%_0px,45%_10px,47.5%_0px,50%_10px,52.5%_0px,55%_10px,57.5%_0px,60%_10px,62.5%_0px,65%_10px,67.5%_0px,70%_10px,72.5%_0px,75%_10px,77.5%_0px,80%_10px,82.5%_0px,85%_10px,87.5%_0px,90%_10px,92.5%_0px,95%_10px,97.5%_0px,100%_10px,100%_100%,0%_100%)]">
          
          <div className="text-center pb-1.5 border-b border-dashed border-zinc-400">
            <p className="font-extrabold text-xs tracking-wider text-black">DEMO BAR</p>
            <p className="text-[9px] text-zinc-600">Av. Santa Fe 2410, CABA</p>
            <p className="font-bold text-[9px] tracking-widest text-[#d97706] mt-0.5">COMPROBANTE CADETE</p>
          </div>

          <div className="py-1.5 border-b border-dashed border-zinc-400 space-y-0.5">
            <div className="flex justify-between font-bold text-[10px]">
              <span>ORDEN #38</span>
              <span>21:43 hs</span>
            </div>
            <p className="text-[9px] text-zinc-500 uppercase tracking-wider">DIRECCIÓN DE ENTREGA:</p>
            <p className="font-extrabold text-xs text-black">Av. Santa Fe 2410, 4B</p>
          </div>

          <div className="py-1.5 border-b border-dashed border-zinc-400 space-y-1">
            <div className="flex justify-between text-[8px] text-zinc-500 uppercase tracking-wider">
              <span>CANT / PRODUCTO</span>
              <span>SUBTOTAL</span>
            </div>
            <div className="flex justify-between font-bold text-[10px]">
              <span>1x Burger Clásica Doble</span>
              <span>$8.500</span>
            </div>
            <div className="flex justify-between font-bold text-[10px]">
              <span>1x Burger Bacon Crispy</span>
              <span>$9.200</span>
            </div>
          </div>

          <div className="space-y-0.5 pt-1">
            <div className="flex justify-between text-zinc-600 text-[9px]">
              <span>Subtotal Productos:</span>
              <span>$23.700</span>
            </div>
            <div className="flex justify-between text-zinc-600 text-[9px]">
              <span>Costo de Envío:</span>
              <span>$2.100</span>
            </div>
            <div className="flex justify-between font-extrabold text-xs pt-1 border-t border-dashed border-zinc-300 text-black">
              <span>TOTAL A COBRAR:</span>
              <span>$25.800</span>
            </div>
            <p className="text-[9px] text-zinc-700 pt-0.5">Forma de Pago: <strong className="text-black">TRANSFERENCIA</strong></p>
          </div>

          <div className="text-center pt-1 text-[8px] text-zinc-500">
            *** ROOSTY POS DELIVERY ***
          </div>

        </div>
      </div>

      {/* Bottom Timeline Controller Bar */}
      <div className="bg-[#121214] px-4 py-2 border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-400 shrink-0">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-[#2563eb] shrink-0" />
          <span className="font-medium text-zinc-300 truncate">
            {step === 0 && "1. Pedido Web: Entra directo al POS con dirección y pago por transferencia"}
            {step === 1 && "2. Despacho Cadete: Se asigna cadetería y se calcula el costo de envío"}
            {step === 2 && "3. Ticket Comprobante: Impresión térmica de 80mm con dirección y vuelto"}
          </span>
        </div>
        <span className="font-mono text-zinc-500 shrink-0 ml-2">Paso {step + 1} de 3</span>
      </div>

    </div>
  );
}
