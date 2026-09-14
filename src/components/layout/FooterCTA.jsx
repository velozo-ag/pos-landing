import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Globe, Printer, Zap, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { DemoTransitionLink } from "@/context/TransitionContext";

export default function FooterCTA() {
  return (
    <footer className="bg-[#111111] text-zinc-100 relative overflow-hidden pt-20 pb-12 border-t border-zinc-800">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-64 bg-[#e85d45]/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Main CTA Block */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-800/80 border border-zinc-700/80 text-zinc-300 text-xs font-medium mb-6 font-mono shadow-2xs">
            <span>Alta en 2 minutos sin tarjeta de crédito</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-5 leading-tight text-balance">
            Probalo un turno. <br className="hidden sm:inline" />
            <span className="text-[#e85d45]">Después no vas a querer volver.</span>
          </h2>

          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto mb-8 font-light text-balance">
            100% Web en la nube, sin instalación en tu local. Compatible con cualquier impresora térmica y con migración de carta bonificada.
          </p>

          {/* Direct Dual Action CTAs: Self-Service + Assisted Sales */}
          <div className="max-w-md mx-auto flex flex-col sm:flex-row gap-3.5 items-center justify-center">
            <DemoTransitionLink
              href={SITE_CONFIG.urls.saasRegister}
              className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 pl-7 pr-5 py-3.5 rounded-xl text-sm font-semibold text-white bg-[#e85d45] hover:bg-[#d44c34] shadow-lg shadow-[#e85d45]/30 active:scale-[0.98] transition-all duration-150 cursor-pointer"
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
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-medium text-zinc-200 bg-zinc-800/90 hover:bg-zinc-700 border border-zinc-700 active:scale-[0.98] transition-all duration-150"
            >
              <MessageCircle className="w-4 h-4 text-[#e85d45]" />
              <span>Hablar con un asesor</span>
            </a>
          </div>

          {/* Trust Guarantees */}
          <div className="mt-8 flex flex-wrap justify-center items-center gap-3 text-xs text-zinc-400 font-medium">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/70 border border-zinc-800/80">
              <Globe className="w-3.5 h-3.5 text-[#e85d45]" />
              <span>Enlace propio incluido</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/70 border border-zinc-800/80">
              <Printer className="w-3.5 h-3.5 text-[#e85d45]" />
              <span>Tickets térmicos estándar</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/70 border border-zinc-800/80">
              <Zap className="w-3.5 h-3.5 text-[#e85d45]" />
              <span>Cero comisiones sobre ventas</span>
            </div>
          </div>
        </div>

        {/* Footer Navigation & Credits */}
        <div className="border-t border-zinc-800/80 pt-10 flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-zinc-500">
          <div className="flex items-center gap-3">
            <div className="relative h-7 w-28">
              <Image
                src="/roosty2.png"
                alt="Roosty"
                fill
                className="object-contain object-left invert opacity-90"
              />
            </div>
            <span className="text-zinc-600">|</span>
            <span className="text-xs text-zinc-400">Punto de venta y gestión gastronómica</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs text-zinc-400">
            <Link href="/funcionalidades" className="hover:text-white transition-colors">
              Módulos y Funcionalidades
            </Link>
            <Link href="/precios" className="hover:text-white transition-colors">
              Planes & Lifetime Deals
            </Link>
            <Link href="/faq" className="hover:text-white transition-colors">
              Preguntas Frecuentes
            </Link>
            <a
              href={SITE_CONFIG.urls.saasApp}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Demo en Vivo
            </a>
          </div>

          <div className="text-xs text-zinc-500">
            © {new Date().getFullYear()} Roosty POS. Todos los derechos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
}
