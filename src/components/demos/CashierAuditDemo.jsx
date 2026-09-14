"use client";

import { useState, useEffect, useRef } from "react";
import {
  BookOpen,
  DollarSign,
  TrendingDown,
  TrendingUp,
  FileSpreadsheet,
  CheckCircle2,
  Printer,
  History,
  Search,
  XSquare,
  ArrowDownLeft,
  Receipt,
  Plus,
  Minus,
  CreditCard,
  QrCode,
  Coins,
} from "lucide-react";

export default function CashierAuditDemo() {
  // Procedural Timeline:
  // 0: Vista Turno Activo (CAJA.png) con $131.600 facturado y fondo inicial $5.000
  // 1: El cajero ingresa el conteo de billetes en mano ($ Contado en mano: $136.600)
  // 2: Validación automática instantánea (Caja Cuadrada +$0) y botón Cerrar Turno
  // 3: Transición a la pestaña Libro Diario de Caja (LIBRO.png) con balances ($131.489)
  // 4: Visualización de movimientos contables y reset del ciclo
  const [phase, setPhase] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef(null);

  // Viewport Intersection Observer: halts execution when off-screen
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

    const durations = [3000, 2400, 2400, 4200, 2000];
    const timer = setTimeout(() => {
      setPhase((prev) => (prev + 1) % 5);
    }, durations[phase]);

    return () => clearTimeout(timer);
  }, [phase, isInView]);

  const showLibroDiario = phase >= 3;
  const isConteoIngresado = phase >= 1;
  const isCajaCuadrada = phase >= 2;

  return (
    <div
      ref={containerRef}
      className="w-full aspect-[16/10] sm:aspect-video bg-[#09090b] text-zinc-100 font-sans text-xs select-none rounded-2xl overflow-hidden border border-zinc-800 shadow-2xl relative flex flex-col justify-between pointer-events-none cursor-default"
    >
      {/* ─────────────────────────────────────────────────────────────
          VIEW 1: EXACT 100% REPLICA OF CAJA.png (!showLibroDiario)
      ───────────────────────────────────────────────────────────── */}
      {!showLibroDiario && (
        <div className="flex-1 p-2.5 sm:p-3 flex flex-col justify-between overflow-hidden bg-[#09090b]">
          
          {/* Top Title & Right Navigation Tabs (Exact CAJA.png) */}
          <div className="flex items-center justify-between gap-2 pb-1 shrink-0">
            <div>
              <h3 className="font-serif text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                <XSquare className="w-3.5 h-3.5 text-zinc-400" />
                <span>Cierre de Caja y Auditoría</span>
              </h3>
              <p className="text-[10px] text-zinc-400 font-light">
                Control de balances, arqueo en efectivo y libro diario de operaciones
              </p>
            </div>

            <div className="flex items-center gap-1 bg-[#121214] p-0.5 rounded-xl border border-zinc-800 text-[10px]">
              <span className="px-2.5 py-1 rounded-lg bg-[#27272a] text-white font-bold shadow-xs">
                Turno Actual
              </span>
              <span className="px-2.5 py-1 text-zinc-400">
                Libro Diario (0)
              </span>
              <span className="px-2.5 py-1 text-zinc-500 hidden sm:inline">
                Historial
              </span>
            </div>
          </div>

          {/* Turn Active Banner (Exact CAJA.png) */}
          <div className="flex items-center justify-between text-xs shrink-0 pt-0.5">
            <span className="text-[#22c55e] font-medium flex items-center gap-1.5 text-[10px]">
              <span>Turno Activo #1 &bull; Abierto por Administrador</span>
            </span>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-lg bg-[#1c1c1f] border border-zinc-800 text-white font-bold text-[9px]">
                + Ingreso / Egreso
              </span>
              <span className="text-zinc-400 font-mono text-[10px]">
                FONDO INICIAL <strong className="text-white font-bold ml-1">$5.000</strong>
              </span>
            </div>
          </div>

          {/* Total Facturado Display (Exact CAJA.png) */}
          <div className="p-2 sm:p-2.5 rounded-2xl bg-[#121214] border border-zinc-800 flex items-center justify-between shrink-0">
            <div>
              <span className="text-[8px] uppercase font-bold tracking-wider text-zinc-500 block">
                TOTAL FACTURADO
              </span>
              <div className="font-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                $131.600
              </div>
            </div>
            <div className="text-right">
              <span className="text-[8px] uppercase font-bold tracking-wider text-zinc-500 block">
                FONDO INICIAL
              </span>
              <span className="font-mono text-white font-bold text-sm sm:text-base">$5.000</span>
            </div>
          </div>

          {/* 4 Financial Breakdown Boxes (Exact CAJA.png) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs shrink-0">
            <div className="p-2 rounded-xl bg-[#121214] border border-zinc-800">
              <span className="text-zinc-400 text-[9px] flex items-center gap-1">
                <Coins className="w-3 h-3 text-[#22c55e]" /> Efectivo Cobrado
              </span>
              <span className="font-mono font-extrabold text-[#22c55e] text-xs sm:text-sm mt-0.5 block">
                +$131.600
              </span>
            </div>
            <div className="p-2 rounded-xl bg-[#121214] border border-zinc-800">
              <span className="text-zinc-400 text-[9px] flex items-center gap-1">
                <TrendingDown className="w-3 h-3 text-[#f43f5e]" /> Gastos / Egresos
              </span>
              <span className="font-mono font-extrabold text-[#f43f5e] text-xs sm:text-sm mt-0.5 block">
                -$0
              </span>
            </div>
            <div className="p-2 rounded-xl bg-[#121214] border border-zinc-800">
              <span className="text-zinc-400 text-[9px] flex items-center gap-1">
                <CreditCard className="w-3 h-3 text-zinc-400" /> Tarjetas
              </span>
              <span className="font-mono font-extrabold text-white text-xs sm:text-sm mt-0.5 block">
                $0
              </span>
            </div>
            <div className="p-2 rounded-xl bg-[#121214] border border-zinc-800">
              <span className="text-zinc-400 text-[9px] flex items-center gap-1">
                <QrCode className="w-3 h-3 text-zinc-400" /> QR / Transferencias
              </span>
              <span className="font-mono font-extrabold text-white text-xs sm:text-sm mt-0.5 block">
                $0
              </span>
            </div>
          </div>

          {/* Arqueo Físico de Cajón (Exact CAJA.png) */}
          <div className="p-2 sm:p-2.5 rounded-2xl bg-[#121214] border border-zinc-800 space-y-1.5 shrink-0">
            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="font-bold text-white text-[10px]">Arqueo Físico de Cajón</span>
                <span className="text-zinc-500 font-light text-[8px] ml-1.5 hidden sm:inline">
                  Fondo Inicial ($5.000) + Efectivo Cobrado ($131.600) - Gastos ($0)
                </span>
              </div>
              <span className="font-mono text-zinc-300 text-[10px]">
                Efectivo Esperado en Cajón: <strong className="text-white font-bold ml-1">$136.600</strong>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-1.5 items-center">
              <div className="sm:col-span-8">
                <div className="w-full bg-[#09090b] border border-zinc-700 rounded-xl py-1.5 px-3 text-white font-mono text-[10px] flex items-center justify-between">
                  <span>{isConteoIngresado ? "$ Contado en mano: $136.600" : "$ Contado en mano (ej: 136600)"}</span>
                  {isConteoIngresado && <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />}
                </div>
              </div>
              <div className="sm:col-span-4">
                <div className={`py-1.5 px-2.5 rounded-xl border font-bold text-[10px] flex items-center justify-between transition-colors ${
                  isCajaCuadrada
                    ? "bg-[#064e3b]/80 border-[#059669] text-[#34d399]"
                    : "bg-[#18181b] border-zinc-800 text-zinc-500"
                }`}>
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Caja Cuadrada</span>
                  </span>
                  <span className="font-mono">+$0</span>
                </div>
              </div>
            </div>

            {/* Big Crimson Cerrar Turno Button (Exact CAJA.png) */}
            <div className={`w-full py-1.5 rounded-xl font-bold text-[10px] text-white flex items-center justify-center gap-1.5 transition-all ${
              isCajaCuadrada
                ? "bg-[#e11d48] shadow-lg shadow-rose-600/30 ring-2 ring-rose-400"
                : "bg-[#e11d48]"
            }`}>
              <XSquare className="w-3 h-3" />
              <span>Cerrar Turno de Caja</span>
            </div>
          </div>

        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────
          VIEW 2: EXACT 100% REPLICA OF LIBRO.png (showLibroDiario)
      ───────────────────────────────────────────────────────────── */}
      {showLibroDiario && (
        <div className="flex-1 p-2.5 sm:p-3 flex flex-col justify-between overflow-hidden bg-[#09090b]">
          
          {/* Top Title & Right Action Buttons (Exact LIBRO.png) */}
          <div className="flex items-center justify-between gap-2 pb-1 shrink-0">
            <div>
              <h3 className="font-serif text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                <BookOpen className="w-3.5 h-3.5 text-[#f59e0b]" />
                <span>Libro Diario de Caja</span>
              </h3>
              <p className="text-[10px] text-zinc-400 font-light">
                Registro contable cronológico, auditoría de turnos cerrados y arqueos
              </p>
            </div>

            <div className="flex items-center gap-1">
              <div className="px-2 py-0.5 rounded-xl bg-[#1c1c1f] border border-zinc-800 text-zinc-200 font-bold text-[9px] flex items-center gap-1">
                <FileSpreadsheet className="w-3 h-3 text-[#22c55e]" />
                <span>Exportar CSV</span>
              </div>
              <div className="px-2 py-0.5 rounded-xl bg-[#064e3b] border border-[#059669] text-[#34d399] font-bold text-[9px]">
                + Ingreso Extra
              </div>
              <div className="px-2 py-0.5 rounded-xl bg-[#4c0519] border border-[#9f1239] text-[#fda4af] font-bold text-[9px]">
                - Registrar Egreso
              </div>
            </div>
          </div>

          {/* 3 Metric Cards (Exact LIBRO.png) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 shrink-0">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-[#121214] border border-zinc-800">
              <span className="text-[9px] font-bold text-zinc-400 flex items-center gap-1">
                <TrendingUp className="w-3 h-3 text-[#22c55e]" /> Total Ingresos
              </span>
              <span className="font-mono font-extrabold text-base sm:text-lg text-[#22c55e] block mt-0.5">
                +$131.600
              </span>
            </div>

            <div className="p-2 sm:p-2.5 rounded-2xl bg-[#121214] border border-zinc-800">
              <span className="text-[9px] font-bold text-zinc-400 flex items-center gap-1">
                <TrendingDown className="w-3 h-3 text-[#f43f5e]" /> Total Egresos
              </span>
              <span className="font-mono font-extrabold text-base sm:text-lg text-[#f43f5e] block mt-0.5">
                -$111
              </span>
            </div>

            <div className="p-2 sm:p-2.5 rounded-2xl bg-[#121214] border border-zinc-800">
              <span className="text-[9px] font-bold text-zinc-400 flex items-center gap-1">
                <BookOpen className="w-3 h-3 text-[#f59e0b]" /> Balance Neto
              </span>
              <span className="font-mono font-extrabold text-base sm:text-lg text-white block mt-0.5">
                $131.489
              </span>
            </div>
          </div>

          {/* Filter Bar & Search (Exact LIBRO.png) */}
          <div className="flex items-center justify-between gap-2 shrink-0 py-0.5">
            <div className="flex items-center gap-1 text-[10px]">
              <span className="px-2 py-0.5 rounded-lg bg-[#27272a] text-white font-bold">Todos</span>
              <span className="px-2 py-0.5 rounded-lg bg-[#121214] text-zinc-400">Ventas</span>
              <span className="px-2 py-0.5 rounded-lg bg-[#121214] text-zinc-400">Ingresos Extra</span>
              <span className="px-2 py-0.5 rounded-lg bg-[#121214] text-zinc-400">Egresos</span>
            </div>
            <div className="relative flex-1 max-w-xs">
              <Search className="w-2.5 h-2.5 absolute left-2 top-1/2 -translate-y-1/2 text-zinc-500" />
              <div className="w-full bg-[#121214] border border-zinc-800 rounded-lg py-0.5 pl-6 pr-2 text-[10px] text-zinc-400">
                Buscar por comanda, motivo...
              </div>
            </div>
          </div>

          {/* Chronological Movements List (Exact LIBRO.png) */}
          <div className="space-y-1 flex-1 min-h-0 overflow-y-auto scrollbar-none">
            
            {/* Row 1: Egreso */}
            <div className="p-1.5 rounded-xl bg-[#14080b] border border-[#e11d48]/40 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-lg bg-[#4c0519] text-[#fda4af] flex items-center justify-center">
                  <ArrowDownLeft className="w-3 h-3" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white text-[10px]">Egreso / Retiro de Caja</span>
                    <span className="text-[7px] bg-zinc-800 text-zinc-400 px-1 py-0.2 rounded font-mono font-bold">CASH</span>
                  </div>
                  <span className="text-[8px] text-zinc-500 font-mono">EGRESO &bull; 10:42 PM &bull; por Administrador</span>
                </div>
              </div>
              <span className="font-mono font-extrabold text-[#f43f5e] text-xs">-$111</span>
            </div>

            {/* Row 2: Venta #32 */}
            <div className="p-1.5 rounded-xl bg-[#121214] border border-zinc-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-lg bg-[#1c1c1f] text-zinc-400 flex items-center justify-center">
                  <Receipt className="w-3 h-3" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white text-[10px]">Venta Comanda #32</span>
                    <span className="text-[7px] bg-zinc-800 text-zinc-400 px-1 py-0.2 rounded font-mono font-bold">CASH</span>
                  </div>
                  <span className="text-[8px] text-zinc-500 font-mono">Cobro en CASH &bull; 12:47 AM &bull; por Administrador</span>
                </div>
              </div>
              <span className="font-mono font-extrabold text-[#22c55e] text-xs">+$10.700</span>
            </div>

            {/* Row 3: Venta #28 */}
            <div className="p-1.5 rounded-xl bg-[#121214] border border-zinc-800 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-lg bg-[#1c1c1f] text-zinc-400 flex items-center justify-center">
                  <Receipt className="w-3 h-3" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white text-[10px]">Venta Comanda #28</span>
                    <span className="text-[7px] bg-zinc-800 text-zinc-400 px-1 py-0.2 rounded font-mono font-bold">CASH</span>
                  </div>
                  <span className="text-[8px] text-zinc-500 font-mono">Cobro en CASH &bull; 12:44 AM &bull; por Administrador</span>
                </div>
              </div>
              <span className="font-mono font-extrabold text-[#22c55e] text-xs">+$4.500</span>
            </div>

          </div>

        </div>
      )}

      {/* Bottom Timeline Step Bar */}
      <div className="bg-[#121214] px-4 py-2 border-t border-zinc-800 flex items-center justify-between text-[10px] text-zinc-400 shrink-0">
        <div className="flex items-center gap-2 truncate">
          <span className="w-2 h-2 rounded-full bg-[#e85d45] shrink-0" />
          <span className="font-medium text-zinc-300 truncate">
            {phase === 0 && "1. Turno Activo: Facturación real ($131.600) y desglose por método de cobro"}
            {phase === 1 && "2. Arqueo Ciego: El cajero declara el efectivo físico sin ver el teórico"}
            {phase === 2 && "3. Conciliación: El sistema valida el cuadre perfecto (+$0) y cierra el turno"}
            {phase >= 3 && "4. Libro Diario: Historial contable de ingresos, egresos y balance ($131.489)"}
          </span>
        </div>
        <span className="font-mono text-zinc-500 shrink-0 ml-2">Paso {phase + 1} de 5</span>
      </div>

    </div>
  );
}
