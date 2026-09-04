"use client";

import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import FeaturesGrid from "@/components/sections/FeaturesGrid";
import FooterCTA from "@/components/layout/FooterCTA";
import Link from "next/link";
import {
  LayoutGrid,
  QrCode,
  UtensilsCrossed,
  Calculator,
  Lock,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import SalonTerminalDemo from "@/components/demos/SalonTerminalDemo";
import KDSDemo from "@/components/demos/KDSDemo";
import CashierAuditDemo from "@/components/demos/CashierAuditDemo";
import CustomerMenuPhoneDemo from "@/components/demos/CustomerMenuPhoneDemo";
import WebOrderBarDemo from "@/components/demos/WebOrderBarDemo";
import { SITE_CONFIG } from "@/config/site";

export default function FuncionalidadesPage() {
  const [activeSection, setActiveSection] = useState("salon");

  const navItems = [
    {
      id: "salon",
      number: "01",
      name: "Salón y Mesas",
      tagline: "Mapa de sectores y atajos",
    },
    {
      id: "menu-qr",
      number: "02",
      name: "Carta Digital & QR",
      tagline: "Marca propia y WhatsApp",
    },
    {
      id: "cocina",
      number: "03",
      name: "Cocina & KDS",
      tagline: "Tandas F8 y despacho",
    },
    {
      id: "finanzas",
      number: "04",
      name: "Caja & Finanzas",
      tagline: "Arqueo ciego y balances",
    },
    {
      id: "modulos",
      number: "05",
      name: "Resumen del Sistema",
      tagline: "8 módulos completos",
    },
  ];

  // Accurate Viewport ScrollSpy Listener
  useEffect(() => {
    const sectionIds = ["salon", "menu-qr", "cocina", "finanzas", "modulos"];

    const handleScroll = () => {
      // Dynamic trigger threshold responsive to mobile screen heights
      const triggerY = typeof window !== "undefined" && window.innerWidth < 1024 ? 170 : 220;
      let currentSection = sectionIds[0];

      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerY) {
            currentSection = id;
          }
        }
      }

      setActiveSection(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const scrollToSection = (id) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f8] selection:bg-[#e85d45]/20 selection:text-[#e85d45]">
      <Navbar />

      <main className="flex-1 pt-32 pb-24 md:pt-36">
        
        {/* Page Top Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 mb-5 leading-tight">
            Guía de Módulos <br className="hidden sm:inline" />
            <span className="text-[#e85d45]">& Funcionalidades.</span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 max-w-3xl mx-auto font-normal leading-relaxed">
            Recorré el sistema sección por sección. Descubrí cómo opera el salón, la cocina, la caja y los canales online con demostraciones interactivas procedurals y datos reales del software.
          </p>
        </div>

        {/* Mobile Sticky Horizontal Bar */}
        <div className="lg:hidden sticky top-[58px] sm:top-[64px] z-40 bg-[#faf9f8]/95 backdrop-blur-md border-y border-zinc-200/80 py-2.5 px-4 overflow-x-auto scrollbar-none shadow-xs touch-manipulation">
          <div className="flex items-center gap-2 min-w-max">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => scrollToSection(item.id)}
                  className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer whitespace-nowrap active:scale-95 touch-manipulation min-h-[36px] flex items-center ${
                    isActive
                      ? "bg-zinc-900 text-white shadow-xs"
                      : "bg-zinc-200/70 text-zinc-700 hover:bg-zinc-200"
                  }`}
                >
                  <span>{item.number}. {item.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            TOUR LAYOUT: STICKY SIDEBAR (MODULES 01 TO 04 ONLY)
        ───────────────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start relative">
            
            {/* Left Column (3 cols): Clean Minimalist Sticky TOC */}
            <aside className="hidden lg:block lg:col-span-3 sticky top-28 self-start z-30 space-y-6">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-zinc-400 mb-3 px-3">
                  Índice de Módulos
                </p>

                {/* Clean Pill Navigation */}
                <nav className="space-y-1 text-xs">
                  {navItems.map((item) => {
                    const isActive = activeSection === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => scrollToSection(item.id)}
                        className={`w-full text-left py-2 px-3 rounded-xl transition-all duration-150 flex items-center justify-between cursor-pointer ${
                          isActive
                            ? "font-semibold text-zinc-950 bg-white shadow-2xs border border-zinc-200/80"
                            : "font-normal text-zinc-600 hover:text-zinc-950 hover:bg-zinc-200/50"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          <span className={`font-mono text-[10px] ${isActive ? "text-[#e85d45] font-bold" : "text-zinc-400"}`}>
                            {item.number}
                          </span>
                          <span className="truncate">{item.name}</span>
                        </div>
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Direct Support Note */}
              <div className="pt-4 border-t border-zinc-200/60 text-xs px-2">
                <p className="font-semibold text-zinc-900 mb-1">
                  ¿Querés probarlo con tu carta?
                </p>
                <p className="text-zinc-500 font-light text-[11px] leading-relaxed mb-2.5">
                  Cargamos tu menú gratis para tu primer turno.
                </p>
                <div className="flex flex-col gap-1.5">
                  <a
                    href={SITE_CONFIG.urls.saasApp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-semibold text-zinc-700 hover:text-zinc-950 text-[11px]"
                  >
                    <span>Abrir Demo en Vivo</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href={SITE_CONFIG.urls.whatsappSales}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-[#e85d45] hover:text-[#d44c34] text-[11px]"
                  >
                    <span>Consultar por WhatsApp</span>
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </aside>

            {/* Right Column (9 cols): Deep-Dive Modules 1 to 4 */}
            <div className="lg:col-span-9 space-y-28">
              
              {/* ─────────────────────────────────────────────────────────────
                  MÓDULO 01: SALÓN Y MESAS (#salon)
              ───────────────────────────────────────────────────────────── */}
              <section id="salon" className="scroll-mt-28 space-y-8">
                
                {/* Header Context */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#e85d45] uppercase tracking-wider">
                    <LayoutGrid className="w-4 h-4" />
                    <span>Módulo 01 • Salón & Atención</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-950 leading-tight">
                    Control visual del salón con cronómetros de espera en vivo
                  </h2>

                  <p className="text-sm sm:text-base text-zinc-600 font-light leading-relaxed max-w-3xl">
                    Organizá las mesas por sectores independientes (Salón Principal, Patio, Terraza, Barra o VIP). Cada mesa refleja su estado en tiempo real para anticipar la rotación del salón.
                  </p>

                  {/* Inline Hotkeys Ribbon */}
                  <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
                    <span className="text-[11px] text-zinc-400 font-medium mr-1">Atajos en salón:</span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-zinc-200/90 font-mono text-[11px] text-zinc-800 shadow-2xs">
                      <kbd className="font-bold text-[#e85d45] bg-[#fff2ef] px-1 py-0.2 rounded border border-[#e85d45]/20">M</kbd>
                      <span>Spotlight de Mesas</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-zinc-200/90 font-mono text-[11px] text-zinc-800 shadow-2xs">
                      <kbd className="font-bold text-[#e85d45] bg-[#fff2ef] px-1 py-0.2 rounded border border-[#e85d45]/20">T</kbd>
                      <span>Modo Mostrador</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-zinc-200/90 font-mono text-[11px] text-zinc-800 shadow-2xs">
                      <kbd className="font-bold text-[#e85d45] bg-[#fff2ef] px-1 py-0.2 rounded border border-[#e85d45]/20">F8</kbd>
                      <span>Marchar Comanda</span>
                    </span>
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-zinc-200/90 font-mono text-[11px] text-zinc-800 shadow-2xs">
                      <kbd className="font-bold text-[#e85d45] bg-[#fff2ef] px-1 py-0.2 rounded border border-[#e85d45]/20">F9</kbd>
                      <span>Cobro Express</span>
                    </span>
                  </div>
                </div>

                {/* Real Procedural Salón & POS Terminal Replica */}
                <div>
                  <SalonTerminalDemo />
                </div>

                {/* Clean Editorial Feature Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 pt-2">
                  <div className="space-y-1 border-l-2 border-zinc-300 pl-4">
                    <h3 className="font-serif text-base font-bold text-zinc-900">
                      Atajo Spotlight (M)
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
                      El mozo presiona la letra M en cualquier pantalla para abrir el buscador instantáneo y acceder a la comanda en 1 segundo sin tocar el mouse.
                    </p>
                  </div>

                  <div className="space-y-1 border-l-2 border-zinc-300 pl-4">
                    <h3 className="font-serif text-base font-bold text-zinc-900">
                      Barra de Cuentas Activas
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
                      Permite saltar entre varias mesas abiertas en paralelo sin perder ningún plato cargado ni tener que volver al menú principal.
                    </p>
                  </div>

                  <div className="space-y-1 border-l-2 border-zinc-300 pl-4">
                    <h3 className="font-serif text-base font-bold text-zinc-900">
                      Modo Mostrador / Takeaway (T)
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
                      Para cafeterías al paso y barras de despacho rápido. Cobro en un toque en efectivo, QR o tarjeta sin asignar mesa física.
                    </p>
                  </div>

                  <div className="space-y-1 border-l-2 border-zinc-300 pl-4">
                    <h3 className="font-serif text-base font-bold text-zinc-900">
                      División de Pagos
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
                      División de cuenta en partes iguales o pagos mixtos (efectivo, Mercado Pago, tarjetas) con cálculo automático de vuelto.
                    </p>
                  </div>
                </div>



              </section>

              {/* ─────────────────────────────────────────────────────────────
                  MÓDULO 02: CARTA DIGITAL & QR (#menu-qr)
              ───────────────────────────────────────────────────────────── */}
              <section id="menu-qr" className="scroll-mt-28 space-y-8 pt-10 border-t border-zinc-200/80">
                
                {/* Header Context */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#e85d45] uppercase tracking-wider">
                    <QrCode className="w-4 h-4" />
                    <span>Módulo 02 • Carta Digital & WhatsApp</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-950 leading-tight">
                    Tu propia carta digital con 0% de comisiones
                  </h2>

                  <p className="text-sm sm:text-base text-zinc-600 font-light leading-relaxed max-w-3xl">
                    Tus clientes ingresan a tu subdominio propio (ej: <span className="font-mono text-zinc-900 font-semibold">tunegocio.roosty.site</span>) sin descargar apps. Eligen adicionales con precio en vivo y despachan directo a tu WhatsApp.
                  </p>
                </div>

                {/* Step 1: Smartphone Digital Menu Experience */}
                <div>
                  <CustomerMenuPhoneDemo />
                </div>

                {/* Step 2: Live Web Order Notification & Cadete Dispatch Bar */}
                <div>
                  <WebOrderBarDemo />
                </div>

                {/* Customer Journey Timeline */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
                  <div className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-zinc-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      1
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif text-base font-bold text-zinc-900">
                        Identidad propia con tu subdominio
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
                        Tus comensales ven tu logo, banner panorámico y colores de marca. Cero marcas genéricas ni publicidad de la competencia.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-zinc-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      2
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif text-base font-bold text-zinc-900">
                        Adicionales táctiles con precio en vivo
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
                        Panel inferior deslizable para elegir salsas, guarniciones y puntos de carne. El subtotal se recalcula en tiempo real.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-zinc-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      3
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif text-base font-bold text-zinc-900">
                        Comanda a WhatsApp con cálculo de vuelto
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
                        La orden llega al chat estructurada con dirección, método de pago y el cálculo de cambio que debe llevar el cadete.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-full bg-zinc-900 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      4
                    </div>
                    <div className="space-y-1">
                      <h3 className="font-serif text-base font-bold text-zinc-900">
                        Rastreo en vivo sin llamadas
                      </h3>
                      <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
                        El cliente consulta desde su teléfono el estado de su orden (En preparación, En viaje, Entregado) reduciendo llamados.
                      </p>
                    </div>
                  </div>
                </div>

              </section>

              {/* ─────────────────────────────────────────────────────────────
                  MÓDULO 03: COCINA & KDS (#cocina)
              ───────────────────────────────────────────────────────────── */}
              <section id="cocina" className="scroll-mt-28 space-y-8 pt-10 border-t border-zinc-200/80">
                
                {/* Header Context */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#e85d45] uppercase tracking-wider">
                    <UtensilsCrossed className="w-4 h-4" />
                    <span>Módulo 03 • Cocina & Despacho</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-950 leading-tight">
                    Tandas de marcha y 4 modos de organización para cocina
                  </h2>

                  <p className="text-sm sm:text-base text-zinc-600 font-light leading-relaxed max-w-3xl">
                    Al presionar el atajo <kbd className="font-mono bg-zinc-200 px-1.5 py-0.5 rounded text-zinc-900 font-bold border border-zinc-300">F8</kbd>, el mozo envía únicamente los platos nuevos sin duplicar lo que ya se preparó. Podés usar pantallas táctiles con semáforos o impresoras térmicas tradicionales.
                  </p>
                </div>

                {/* Real Procedural KDS Screen Demo */}
                <div>
                  <KDSDemo />
                </div>

                {/* 4 Dispatch Modes - Clean Editorial Flow */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-2">
                  <div className="space-y-1 border-t-2 border-zinc-300 pt-3">
                    <span className="text-xs font-bold text-zinc-900 block">1. KDS Táctil</span>
                    <p className="text-xs text-zinc-600 font-light leading-relaxed">
                      Pantalla interactiva con semáforos de demora y botón Ready-All para despachar en 1 toque.
                    </p>
                  </div>

                  <div className="space-y-1 border-t-2 border-zinc-300 pt-3">
                    <span className="text-xs font-bold text-zinc-900 block">2. Ticket Térmico</span>
                    <p className="text-xs text-zinc-600 font-light leading-relaxed">
                      Comandas clásicas de 80mm o 58mm para el riel tradicional con cantidades en mayúsculas.
                    </p>
                  </div>

                  <div className="space-y-1 border-t-2 border-zinc-300 pt-3">
                    <span className="text-xs font-bold text-zinc-900 block">3. Modo Híbrido</span>
                    <p className="text-xs text-zinc-600 font-light leading-relaxed">
                      Imprime papel en fuegos y actualiza la pantalla del jefe de cocina en tiempo real.
                    </p>
                  </div>

                  <div className="space-y-1 border-t-2 border-zinc-300 pt-3">
                    <span className="text-xs font-bold text-zinc-900 block">4. Barra Separada</span>
                    <p className="text-xs text-zinc-600 font-light leading-relaxed">
                      Los tragos van directo a las canillas o coctelería sin demorarse por la cocina.
                    </p>
                  </div>
                </div>

              </section>

              {/* ─────────────────────────────────────────────────────────────
                  MÓDULO 04: CAJA & FINANZAS (#finanzas)
              ───────────────────────────────────────────────────────────── */}
              <section id="finanzas" className="scroll-mt-28 space-y-8 pt-10 border-t border-zinc-200/80">
                
                {/* Header Context */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#e85d45] uppercase tracking-wider">
                    <Calculator className="w-4 h-4" />
                    <span>Módulo 04 • Caja & Arqueo Ciego</span>
                  </div>

                  <h2 className="font-serif text-3xl sm:text-4xl font-bold text-zinc-950 leading-tight">
                    Arqueo ciego matemático y control total de caja
                  </h2>

                  <p className="text-sm sm:text-base text-zinc-600 font-light leading-relaxed max-w-3xl">
                    Nadie puede abrir mesas ni cobrar sin declarar el fondo inicial en gaveta. Al cerrar, el cajero cuenta el dinero sin ver el teórico y el sistema concilia ventas en efectivo, QR y tarjetas de forma transparente.
                  </p>
                </div>

                {/* Real Procedural Cierre de Caja & Libro Diario Demo */}
                <div>
                  <CashierAuditDemo />
                </div>

                {/* 4 Financial Security Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-6 pt-2">
                  <div className="space-y-1 border-l-2 border-zinc-300 pl-4">
                    <h3 className="font-serif text-base font-bold text-zinc-900">
                      Fondo Inicial Obligatorio
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
                      El sistema actúa como guardián: bloquea la atención si el cajero no declaró previamente el cambio en gaveta.
                    </p>
                  </div>

                  <div className="space-y-1 border-l-2 border-zinc-300 pl-4">
                    <h3 className="font-serif text-base font-bold text-zinc-900">
                      Arqueo Ciego sin Trampas
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
                      El cajero cuenta los billetes sin ver lo esperado por el sistema. El software calcula faltantes o sobrantes al instante.
                    </p>
                  </div>

                  <div className="space-y-1 border-l-2 border-zinc-300 pl-4">
                    <h3 className="font-serif text-base font-bold text-zinc-900">
                      Libro Diario de Gastos
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
                      Anotá salidas menores de dinero en el acto (proveedores de verdura, hielo, propinas o retiros de socios).
                    </p>
                  </div>

                  <div className="space-y-1 border-l-2 border-zinc-300 pl-4">
                    <h3 className="font-serif text-base font-bold text-zinc-900">
                      Exportación a Excel
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-600 font-light leading-relaxed">
                      Descargá balances completos con desglose de ventas por medios de pago para tu contador en un solo clic.
                    </p>
                  </div>
                </div>

              </section>

            </div>

          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            FULL-WIDTH SECTION 05: RESUMEN DEL SISTEMA (#modulos)
        ───────────────────────────────────────────────────────────── */}
        <div id="modulos" className="border-t border-zinc-200/80 scroll-mt-28">
          <FeaturesGrid />
        </div>

        {/* Full-Width Final CTA Block */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900 text-white border border-zinc-800 text-center space-y-4 shadow-xl">
            <h3 className="font-serif text-2xl sm:text-4xl font-bold text-white">
              ¿Listo para poner a prueba Roosty en tu local?
            </h3>
            <p className="text-sm sm:text-base text-zinc-400 font-light max-w-xl mx-auto leading-relaxed">
              Cargamos tu carta actual gratis y te dejamos el sistema listo para operar en tu próximo turno sin contratos de permanencia.
            </p>
            <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <a
                href={SITE_CONFIG.urls.saasRegister}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#e85d45] hover:bg-[#d44c34] shadow-md shadow-[#e85d45]/30 transition-all hover:scale-105 text-center"
              >
                Probar Demo Gratis
              </a>
              <a
                href={SITE_CONFIG.urls.saasApp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl text-sm font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 transition-all text-center"
              >
                Ver Demo en Vivo
              </a>
            </div>
          </div>
        </div>

      </main>

      <FooterCTA />
    </div>
  );
}
