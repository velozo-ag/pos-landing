"use client";

import { useState, useEffect, useRef } from "react";
import {
  Bike,
  Bell,
  MapPin,
  Clock,
  Check,
  ShoppingBag,
} from "lucide-react";

export default function WebOrderBarDemo() {
  // Se activa tras una pausa deliberada ("un ratito más") al posarse sobre o entrar en el viewport
  const [hasTriggered, setHasTriggered] = useState(false);
  const containerRef = useRef(null);
  const timerRef = useRef(null);

  const startDelayedTrigger = () => {
    if (hasTriggered || timerRef.current) return;
    // Tarda un ratito más en aparecer (1.1 segundos)
    timerRef.current = setTimeout(() => {
      setHasTriggered(true);
    }, 1100);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          startDelayedTrigger();
        }
      },
      { threshold: 0.08, rootMargin: "60px 0px 60px 0px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
    };
  }, [hasTriggered]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Al posarse sobre (hover / touch)
  const handlePointerTrigger = () => {
    startDelayedTrigger();
  };

  // Ambos suceden al mismo tiempo y persisten sin reinicio
  const hasNewOrder = hasTriggered;
  const showTicket = hasTriggered;

  return (
    <div
      ref={containerRef}
      onMouseEnter={handlePointerTrigger}
      onTouchStart={handlePointerTrigger}
      className="relative w-full py-4 select-none group"
    >
      {/* ─────────────────────────────────────────────────────────────
          TOP ROW:
          - Left: Text with generous pb-8 spacing
          - Right: Ticket flush against the queue bar top edge (zero gap)
      ───────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-end w-full">
        
        {/* Left (7 cols): Explanatory Copy with comfortable bottom spacing */}
        <div className="lg:col-span-7 space-y-5 pb-8 sm:pb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-zinc-200/90 text-xs font-semibold text-[#e85d45] shadow-2xs">
            <Bell className="w-3.5 h-3.5" />
            <span>Paso 2 &bull; Fila de Comandas en Vivo & Despacho</span>
          </div>

          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-950 leading-tight">
            El pedido web ingresa a la fila y emite la comanda de entrega
          </h3>

          <p className="text-sm sm:text-base text-zinc-600 font-light leading-relaxed">
            Las órdenes online se insertan automáticamente en la fila de pedidos desplazando las mesas activas. El sistema calcula la distancia, asigna el cadete y emite el comprobante térmico con el vuelto exacto a llevar.
          </p>

          {/* Unboxed Editorial Pillars with Generous Breathing Room */}
          <div className="pt-2 space-y-4 border-l-2 border-zinc-200 pl-4">
            <div className="space-y-0.5">
              <h4 className="font-serif text-sm font-bold text-zinc-900">
                Inserción instantánea en pantalla
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
                El pedido web aparece en la barra superior desplazando las cuentas activas sin necesidad de recargar la página.
              </p>
            </div>

            <div className="space-y-0.5">
              <h4 className="font-serif text-sm font-bold text-zinc-900">
                Cálculo automático de envío y vuelto
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
                El ticket térmico detalla la dirección, los productos y el monto exacto de cambio que debe llevar el cadete.
              </p>
            </div>
          </div>
        </div>

        {/* Right (5 cols): Thermal Receipt Ticket Sitting 100% Flush with Zero Gap against Queue Bar */}
        <div className="lg:col-span-5 flex justify-center items-end h-[310px] sm:h-[330px] overflow-hidden relative z-10 px-4 -mb-[1px]">
          
          <div
            className="w-full max-w-[260px] sm:max-w-[275px] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform"
            style={{
              transform: showTicket ? "translateY(0%)" : "translateY(105%)",
            }}
          >
            {/* Monospace White Thermal Paper Cadete Slip with Controlled Shadow */}
            <div className="w-full bg-white text-zinc-950 font-mono p-3.5 sm:p-4 pt-4 text-[9.5px] leading-tight shadow-md shadow-zinc-950/15 space-y-1.5 [clip-path:polygon(0%_10px,2.5%_0px,5%_10px,7.5%_0px,10%_10px,12.5%_0px,15%_10px,17.5%_0px,20%_10px,22.5%_0px,25%_10px,27.5%_0px,30%_10px,32.5%_0px,35%_10px,37.5%_0px,40%_10px,42.5%_0px,45%_10px,47.5%_0px,50%_10px,52.5%_0px,55%_10px,57.5%_0px,60%_10px,62.5%_0px,65%_10px,67.5%_0px,70%_10px,72.5%_0px,75%_10px,77.5%_0px,80%_10px,82.5%_0px,85%_10px,87.5%_0px,90%_10px,92.5%_0px,95%_10px,97.5%_0px,100%_10px,100%_100%,0%_100%)] border-x border-zinc-200/50">
              
              <div className="text-center pb-1 border-b border-dashed border-zinc-400">
                <p className="font-extrabold text-[11px] tracking-wider text-black">DEMO BAR</p>
                <p className="text-[8px] text-zinc-600">Av. Corrientes 1234, CABA</p>
                <p className="font-bold text-[8.5px] tracking-widest text-[#d97706] mt-0.5">COMPROBANTE CADETE</p>
              </div>

              <div className="py-1 border-b border-dashed border-zinc-400 space-y-0.5">
                <div className="flex justify-between font-bold text-[9px]">
                  <span>ORDEN #46</span>
                  <span>10:23 PM</span>
                </div>
                <p className="text-[8px] text-zinc-500 uppercase tracking-wider">CLIENTE: CLIENTE #46</p>
                <p className="font-extrabold text-[10px] text-black">DIRECCIÓN: Av. Santa Fe 2410, 4B</p>
              </div>

              <div className="py-1 border-b border-dashed border-zinc-400 space-y-1">
                <div className="flex justify-between text-[7.5px] text-zinc-500 uppercase tracking-wider">
                  <span>CANT / PRODUCTO</span>
                  <span>SUBTOTAL</span>
                </div>
                <div className="flex justify-between font-bold text-[9px]">
                  <span>1x Burger Clásica Doble</span>
                  <span>$8.500</span>
                </div>
                <div className="flex justify-between font-bold text-[9px]">
                  <span>1x Burger Bacon Crispy</span>
                  <span>$9.200</span>
                </div>
              </div>

              <div className="space-y-0.5 pt-0.5">
                <div className="flex justify-between text-zinc-600 text-[8.5px]">
                  <span>Subtotal Productos:</span>
                  <span>$17.700</span>
                </div>
                <div className="flex justify-between text-zinc-600 text-[8.5px]">
                  <span>Costo de Envío:</span>
                  <span>$2.100</span>
                </div>
                <div className="flex justify-between font-extrabold text-[10.5px] pt-1 border-t border-dashed border-zinc-300 text-black">
                  <span>TOTAL A COBRAR:</span>
                  <span>$19.800</span>
                </div>
                <p className="text-[8.5px] text-zinc-700 pt-0.5">Forma de Pago: <strong className="text-black">TRANSFERENCIA</strong></p>
              </div>

              <div className="text-center pt-0.5 text-[7.5px] text-zinc-500">
                *** ROOSTY POS DELIVERY ***
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* ─────────────────────────────────────────────────────────────
          BOTTOM ROW: 100% FULL-WIDTH QUEUE BAR
          The ticket emerges directly from its top border slot with zero gap
      ───────────────────────────────────────────────────────────── */}
      <div
        onMouseEnter={handlePointerTrigger}
        onTouchStart={handlePointerTrigger}
        className="w-full bg-[#0e0e11] border border-zinc-800 rounded-2xl p-2.5 sm:p-3 shadow-xl overflow-hidden relative z-20 group-hover:border-zinc-700 transition-colors"
      >
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none py-0.5">
          
          {/* NUEVO PEDIDO ENTRANTE (Deslizamiento desde la izquierda junto al ticket) */}
          <div
            className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] overflow-hidden shrink-0 ${
              hasNewOrder
                ? "w-24 sm:w-28 opacity-100 scale-100 mr-0"
                : "w-0 opacity-0 scale-90 -mr-2"
            }`}
          >
            <div className="h-12 px-3 rounded-xl bg-[#2a080c] border-2 border-red-500 text-red-300 flex flex-col items-center justify-center text-center shadow-md shadow-red-950/50 animate-pulse min-w-[90px]">
              <span className="text-[8px] font-extrabold uppercase tracking-wider flex items-center gap-1 text-red-400 leading-none">
                <Bell className="w-2.5 h-2.5" />
                <span>WEB</span>
              </span>
              <span className="font-mono font-extrabold text-xs text-white leading-tight">#46</span>
              <span className="text-[7px] text-red-300 font-medium leading-none">Cliente #46</span>
            </div>
          </div>

          {/* Pedido 2: Delivery #43 */}
          <div className="h-12 px-3 py-1 rounded-xl bg-[#141417] border border-zinc-700/80 text-zinc-300 flex flex-col items-center justify-center text-center shrink-0 min-w-[90px]">
            <span className="text-[8px] font-bold uppercase tracking-wider text-amber-500/90 flex items-center gap-1 leading-none">
              <Bike className="w-2.5 h-2.5" />
              <span>DELIVERY</span>
            </span>
            <span className="font-mono font-bold text-xs text-white leading-tight">#43</span>
            <span className="text-[7px] text-zinc-400 leading-none">Cliente #1</span>
          </div>

          {/* Pedido 3: Delivery #38 (Activo) */}
          <div className="h-12 px-3 py-1 rounded-xl bg-[#1c1917] border-2 border-amber-500 text-amber-300 flex flex-col items-center justify-center text-center shrink-0 min-w-[90px] shadow-sm">
            <span className="text-[8px] font-extrabold uppercase tracking-wider text-amber-400 flex items-center gap-1 leading-none">
              <Bike className="w-2.5 h-2.5" />
              <span>DELIVERY</span>
            </span>
            <span className="font-mono font-extrabold text-xs text-white leading-tight">#38</span>
            <span className="text-[7px] text-amber-200 leading-none">Cliente #2</span>
          </div>

          {/* Pedido 4: Retiro / Mostrador #37 (Mismo estilo ámbar que Delivery) */}
          <div className="h-12 px-3 py-1 rounded-xl bg-[#141417] border border-zinc-700/80 text-zinc-300 flex flex-col items-center justify-center text-center shrink-0 min-w-[90px]">
            <span className="text-[8px] font-bold uppercase tracking-wider text-amber-500/90 flex items-center gap-1 leading-none">
              <ShoppingBag className="w-2.5 h-2.5" />
              <span>RETIRO</span>
            </span>
            <span className="font-mono font-bold text-xs text-white leading-tight">#37</span>
            <span className="text-[7px] text-zinc-400 leading-none">Cliente #3</span>
          </div>

          {/* Pedido 5: Delivery #35 */}
          <div className="h-12 px-3 py-1 rounded-xl bg-[#141417] border border-zinc-800 text-zinc-400 flex flex-col items-center justify-center text-center shrink-0 min-w-[90px]">
            <span className="text-[8px] font-bold uppercase tracking-wider text-amber-500/80 flex items-center gap-1 leading-none">
              <Bike className="w-2.5 h-2.5" />
              <span>DELIVERY</span>
            </span>
            <span className="font-mono font-bold text-xs text-zinc-300 leading-tight">#35</span>
            <span className="text-[7px] text-zinc-500 leading-none">Cliente #4</span>
          </div>

          {/* Pedido 6: Retiro #34 */}
          <div className="h-12 px-3 py-1 rounded-xl bg-[#141417] border border-zinc-800 text-zinc-400 flex flex-col items-center justify-center text-center shrink-0 min-w-[90px]">
            <span className="text-[8px] font-bold uppercase tracking-wider text-amber-500/80 flex items-center gap-1 leading-none">
              <ShoppingBag className="w-2.5 h-2.5" />
              <span>RETIRO</span>
            </span>
            <span className="font-mono font-bold text-xs text-zinc-300 leading-tight">#34</span>
            <span className="text-[7px] text-zinc-500 leading-none">Cliente #5</span>
          </div>

          {/* Mesa 02 (Roja: Ocupada) */}
          <div className="h-12 px-3.5 rounded-xl bg-[#141417] border border-zinc-800 text-zinc-300 flex items-center gap-2 shrink-0 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="font-semibold text-white text-[11px]">Mesa 02</span>
          </div>

          {/* Mesa 03 (Naranja: Esperando cobro) */}
          <div className="h-12 px-3.5 rounded-xl bg-[#141417] border border-zinc-800 text-zinc-300 flex items-center gap-2 shrink-0 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="font-semibold text-white text-[11px]">Mesa 03</span>
          </div>

          {/* Mesa 05 (Roja: Ocupada) */}
          <div className="h-12 px-3.5 rounded-xl bg-[#141417] border border-zinc-800 text-zinc-300 flex items-center gap-2 shrink-0 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="font-semibold text-white text-[11px]">Mesa 05</span>
          </div>

          {/* Mesa 08 (Naranja: Esperando cobro) */}
          <div className="h-12 px-3.5 rounded-xl bg-[#141417] border border-zinc-800 text-zinc-300 flex items-center gap-2 shrink-0 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="font-semibold text-white text-[11px]">Mesa 08</span>
          </div>

          {/* Mesa 11 (Roja: Ocupada) */}
          <div className="h-12 px-3.5 rounded-xl bg-[#141417] border border-zinc-800 text-zinc-300 flex items-center gap-2 shrink-0 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="font-semibold text-white text-[11px]">Mesa 11</span>
          </div>

          {/* Mesa 14 (Naranja: Esperando cobro) */}
          <div className="h-12 px-3.5 rounded-xl bg-[#141417] border border-zinc-800 text-zinc-300 flex items-center gap-2 shrink-0 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            <span className="font-semibold text-white text-[11px]">Mesa 14</span>
          </div>

          {/* Mesa 18 (Roja: Ocupada) */}
          <div className="h-12 px-3.5 rounded-xl bg-[#141417] border border-zinc-800 text-zinc-300 flex items-center gap-2 shrink-0 text-xs font-mono">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span className="font-semibold text-white text-[11px]">Mesa 18</span>
          </div>

        </div>
      </div>

    </div>
  );
}
