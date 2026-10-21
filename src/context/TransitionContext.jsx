'use client';

import { createContext, useContext, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Image from 'next/image';

const TransitionContext = createContext({
  isTransitioning: false,
  startTransitionTo: () => {},
});

export function TransitionProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();

  // Estados: 'idle' | 'covering' | 'loading' | 'lifting'
  const [transitionStep, setTransitionStep] = useState('idle');

  const startTransitionTo = useCallback((url) => {
    if (pathname === url) return;

    // 1. Fase 1: Sube la lámina clara (#faf9f8) desde abajo tapando la landing
    setTransitionStep('covering');

    // 2. Apenas cubre la pantalla (300ms), disparamos la navegación
    setTimeout(() => {
      router.push(url);
    }, 300);

    // 3. A los 320ms aparece el logo roosty2 y el indicador de carga
    setTimeout(() => {
      setTransitionStep('loading');
    }, 320);

    // 4. A los 720ms la lámina se levanta fluidamente hacia arriba
    setTimeout(() => {
      setTransitionStep('lifting');
    }, 720);

    // 5. Fin de la transición limpia
    setTimeout(() => {
      setTransitionStep('idle');
    }, 1050);
  }, [pathname, router]);

  return (
    <TransitionContext.Provider value={{ isTransitioning: transitionStep !== 'idle', startTransitionTo }}>
      {children}

      {/* ─────────────────────────────────────────────────────────────
          LÁMINA CLARA (#faf9f8) QUE SUBE DESDE ABAJO + CARGA
      ───────────────────────────────────────────────────────────── */}
      {transitionStep !== 'idle' && (
        <div
          className={`
            fixed inset-0 z-[999999] bg-[#faf9f8] text-zinc-900 flex flex-col items-center justify-center p-6 select-none shadow-2xl pointer-events-auto border-t border-zinc-300/80
            ${transitionStep === 'covering' ? 'animate-curtain-up' : ''}
            ${transitionStep === 'loading' ? 'translate-y-0' : ''}
            ${transitionStep === 'lifting' ? 'animate-curtain-lift' : ''}
          `}
        >
          {/* Pantalla de carga con logotipo oficial roosty2.png */}
          <div
            className={`
              flex flex-col items-center max-w-xs w-full text-center transition-all duration-300
              ${transitionStep === 'loading' || transitionStep === 'lifting' ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
            `}
          >
            <div className="relative h-11 w-40 mb-5">
              <Image
                src="/roostylogoname.png"
                alt="Roosty POS"
                fill
                sizes="160px"
                priority
                className="object-contain"
              />
            </div>

            <div className="w-48 h-1.5 bg-zinc-200 rounded-full overflow-hidden mb-3.5">
              <div className="h-full bg-[#e85d45] rounded-full w-full animate-pulse" />
            </div>

            <p className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase font-semibold">
              Inicializando entorno demo...
            </p>
          </div>
        </div>
      )}
    </TransitionContext.Provider>
  );
}

export const useTransition = () => useContext(TransitionContext);

// Enlace que dispara la transición suave de lámina
export function DemoTransitionLink({ href = '/demo', className = '', children, onClick, ...props }) {
  const { startTransitionTo } = useTransition();

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick(e);
    startTransitionTo(href);
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
