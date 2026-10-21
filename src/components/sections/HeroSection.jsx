"use client";

import {
  ArrowRight,
  CheckCircle2,
  Lock,
  Zap,
  MessageCircle,
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import Link from "next/link";
import { DemoTransitionLink } from "@/context/TransitionContext";

export default function HeroSection() {
  return (
    <section className="relative pt-24 pb-20 md:pt-28 md:pb-28 lg:pt-32 lg:pb-32 overflow-hidden bg-[#faf9f8] border-b border-zinc-200/80 w-full max-w-full flex items-center min-h-[75vh]">
      
      {/* Background Banner Video */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-[#faf9f8]">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/examples/banner_composed.jpg"
          className="absolute left-0 w-full h-full object-cover object-right opacity-100"
        >
          <source src="/examples/banner_composed_video.mp4" type="video/mp4" />
        </video>
        
        {/* Soft edge blend for the background (only on mobile so it doesn't wash out the desktop quality) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#faf9f8] via-[#faf9f8]/60 to-transparent lg:hidden" />
        
        {/* Mobile readability gradient */}
        <div className="absolute inset-0 bg-[#faf9f8]/90 lg:hidden" />
      </div>

      {/* Subtle brand glow on the left to maintain warmth */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#e85d45]/5 blur-[130px] pointer-events-none rounded-full z-0" />

      {/* Contenedor de Contenido */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-center">
          
          {/* Left Column: Main Hero Header (Ahora ocupa menos % para dejarle lugar al monitor) */}
          <div className="lg:col-span-7 xl:col-span-7 text-center lg:text-left pt-6 lg:pt-10 pb-8 lg:pb-12 flex flex-col items-center lg:items-start z-10 relative">
            
            {/* Eyebrow Chip */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-xs border border-zinc-200/90 text-xs font-semibold text-zinc-800 mb-6 sm:mb-7 shadow-2xs">
              <span className="tracking-wide"><strong className="font-bold text-zinc-950">Roosty POS</strong> • Sistema Operativo Gastronómico <span className="text-[#e85d45] font-bold">100% Web</span></span>
            </div>

            {/* Main Title with text-balance */}
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem] font-bold tracking-tight text-zinc-950 mb-7 sm:mb-8 leading-[1.14] sm:leading-[1.12] text-balance">
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

            {/* Subtitle */}
            <p className="text-base sm:text-lg lg:text-[1.125rem] text-zinc-600 font-light leading-relaxed mb-10 sm:mb-11 max-w-3xl text-balance">
              <strong className="font-semibold text-zinc-800">Roosty POS</strong> es el software de punto de venta para bares, cervecerías, cafeterías y restaurantes que vuela en horas pico. Comandas en 1 toque, carta digital QR sin comisiones y arqueo ciego exacto.
            </p>

            {/* CTAs: Primary (Button-in-Button Nested Architecture) + Secondary (Assisted Sales via WhatsApp) */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-10 sm:mb-12 w-full sm:w-auto">
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
            <div className="flex flex-wrap lg:flex-nowrap items-center justify-center lg:justify-start gap-y-2.5 gap-x-3 text-xs sm:text-[13px] xl:text-sm text-zinc-600 font-medium whitespace-nowrap">
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

          {/* Right Column: Spacer for the background image on desktop */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-5 w-full h-[400px] xl:h-[500px] pointer-events-none" />

        </div>
      </div>
    </section>
  );
}
