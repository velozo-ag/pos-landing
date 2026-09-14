"use client";

import {
  ArrowRight,
  CheckCircle2,
  Lock,
  Zap,
  MessageCircle,
} from "lucide-react";
import SalonTerminalDemo from "@/components/demos/SalonTerminalDemo";
import { SITE_CONFIG } from "@/config/site";
import Link from "next/link";
import { DemoTransitionLink } from "@/context/TransitionContext";

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-[#faf9f8] border-b border-zinc-200/80 w-full max-w-full">
      {/* Background ambient lighting - Warm minimal tone */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-[#e85d45]/6 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute inset-0 bg-grid-subtle pointer-events-none opacity-60 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Hero Header */}
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Eyebrow Chip */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-zinc-200/90 text-xs font-semibold text-zinc-800 mb-5 shadow-2xs">
            <span className="tracking-wide">Sistema Operativo Gastronómico <span className="text-[#e85d45] font-bold">100% Web</span></span>
          </div>

          {/* Main Title with text-balance */}
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 mb-6 leading-[1.12] text-balance">
            Atendé más rápido, cobrá al instante y{" "}
            <span className="relative inline-block text-[#e85d45]">
              controlá tu caja.
              <svg
                className="absolute -bottom-1.5 left-0 w-full h-2 text-[#e85d45]/30 -z-10"
                viewBox="0 0 200 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5.5C50 2 150 2 199 5.5"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          {/* Subtitle - Max 22 words, high clarity */}
          <p className="text-base sm:text-lg lg:text-xl text-zinc-600 font-light leading-relaxed mb-8 max-w-2xl mx-auto text-balance">
            El software para bares, cervecerías, cafeterías y restaurantes que vuela en horas pico. Comandas en 1 toque, carta digital propia y arqueo ciego exacto.
          </p>

          {/* CTAs: Primary (Button-in-Button Nested Architecture) + Secondary (Assisted Sales via WhatsApp) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 mb-8">
            <DemoTransitionLink
              href={SITE_CONFIG.urls.saasRegister}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 pl-7 pr-5 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-white bg-[#e85d45] hover:bg-[#d44c34] active:scale-[0.98] shadow-md shadow-[#e85d45]/25 hover:shadow-lg hover:shadow-[#e85d45]/35 transition-all duration-150 cursor-pointer"
            >
              <span>Probar demo gratis</span>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-150">
                <ArrowRight className="w-3.5 h-3.5 text-white" />
              </span>
            </DemoTransitionLink>
            <a
              href={SITE_CONFIG.urls.whatsappSales}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm sm:text-base font-medium text-zinc-700 bg-white hover:bg-zinc-50 active:scale-[0.98] border border-zinc-200/90 shadow-2xs hover:border-zinc-300 transition-all duration-150"
            >
              <MessageCircle className="w-4 h-4 text-[#e85d45]" />
              <span>Hablar con ventas</span>
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-4 text-xs sm:text-sm text-zinc-600 font-medium">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-zinc-200/70 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-[#e85d45]" />
              <span>Sin contratos de permanencia</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-zinc-200/70 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-[#e85d45]" />
              <span>Funciona en PC, tablet o celular</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/70 border border-zinc-200/70 shadow-2xs">
              <CheckCircle2 className="w-4 h-4 text-[#e85d45]" />
              <span>Cargamos tu menú gratis</span>
            </div>
          </div>
        </div>

        {/* Hero Interactive Terminal Showcase - Doppelrand Nested Architecture */}
        <div id="demo" className="mt-10 sm:mt-14 relative max-w-5xl mx-auto">
          <div className="relative rounded-2xl sm:rounded-3xl p-2 sm:p-2.5 bg-gradient-to-b from-zinc-300/80 via-zinc-200/50 to-zinc-300/70 shadow-2xl border border-zinc-200/90">
            
            {/* Terminal Window Body */}
            <div className="rounded-xl sm:rounded-2xl bg-zinc-950 overflow-hidden border border-zinc-800 shadow-2xl relative">
              
              {/* Browser Window Topbar with Real macOS UI */}
              <div className="bg-[#1c1c1f] px-4 py-2.5 border-b border-zinc-800/80 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block border border-black/20" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block border border-black/20" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block border border-black/20" />
                </div>

                {/* Clean Realistic URL Bar */}
                <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-md bg-[#121214] border border-zinc-800 text-xs font-mono select-none max-w-xs sm:max-w-sm w-full justify-center">
                  <Lock className="w-3 h-3 text-zinc-500 shrink-0" />
                  <span className="text-zinc-300 font-medium">elparron.roosty.site</span>
                  <span className="text-zinc-500">/pos</span>
                </div>

                <div className="w-12" />
              </div>

              {/* Procedural Real POS Salón & Comanda Loop */}
              <SalonTerminalDemo />

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
