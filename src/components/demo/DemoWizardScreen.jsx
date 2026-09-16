'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { QRCodeSVG } from 'qrcode.react';
import { Turnstile } from '@marsidev/react-turnstile';
import {
  ArrowRight,
  CheckCircle2,
  Store,
  Coffee,
  Pizza,
  Beer,
  UtensilsCrossed,
  Loader2,
  User,
  Mail,
  Phone,
  Check,
  ChevronLeft,
  Sparkles,
  ExternalLink,
  ShieldCheck,
  Lock,
  Search,
  Plus,
  Bike,
  Smartphone,
  Globe,
  MessageCircle,
} from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLink } from '@/config/site';

// Presets dinámicos para el widget interactivo del teléfono
const INDUSTRY_DATA = {
  HAMBURGUESERIA: {
    tag: 'Smash Burgers & Papas',
    defaultName: 'BURGER BROS',
    accentColor: '#e85d45',
    category: 'Smash Burgers',
    slug: 'burgerbros',
    items: [
      {
        name: 'Doble Bacon Smash',
        desc: 'Doble medallón 120g, cheddar, panceta crocante.',
        price: '$ 11.500',
      },
      {
        name: 'Papas Rústicas Cheddar',
        desc: 'Papas con salsa cheddar casera y verdeo.',
        price: '$ 5.200',
      },
    ],
    cart: '2 ítems • $ 16.700',
  },
  CAFETERIA: {
    tag: 'Café de Especialidad',
    defaultName: 'CAFÉ BOTÁNICO',
    accentColor: '#10b981',
    category: 'Cafetería & Brunch',
    slug: 'cafebotanico',
    items: [
      {
        name: 'Flat White Doble Shot',
        desc: 'Café 100% arábica de origen y leche texturizada.',
        price: '$ 3.800',
      },
      {
        name: 'Croissant con Pistacho',
        desc: 'Hojaldre artesanal relleno de crema de pistacho.',
        price: '$ 5.200',
      },
    ],
    cart: '2 ítems • $ 9.000',
  },
  PIZZERIA: {
    tag: 'Pizzería & Empanadas',
    defaultName: 'DON ANTONIO',
    accentColor: '#f43f5e',
    category: 'Pizzas a la Leña',
    slug: 'donantonio',
    items: [
      {
        name: 'Margherita Gigante',
        desc: 'Masa fermentada 48hs, fior di latte y albahaca fresca.',
        price: '$ 14.800',
      },
      {
        name: 'Fainá Clásica',
        desc: 'Crocante con pimienta negra recién molida.',
        price: '$ 2.400',
      },
    ],
    cart: '1 ítem • $ 14.800',
  },
  BAR: {
    tag: 'Bar & Cervecería',
    defaultName: 'ROOSTY TAPROOM',
    accentColor: '#f59e0b',
    category: 'Canillas Artesanales',
    slug: 'roostytap',
    items: [
      {
        name: 'Pinta IPA Artesanal',
        desc: 'Canilla #04 • Cerveza rubia con lúpulo cítrico.',
        price: '$ 4.500',
      },
      {
        name: 'Tabla de Picada 2P',
        desc: 'Quesos de campo, jamón crudo y aceitunas marinadas.',
        price: '$ 14.200',
      },
    ],
    cart: '2 ítems • $ 18.700',
  },
  RESTAURANTE_GENERAL: {
    tag: 'Restaurante & Salón',
    defaultName: 'RESTÓ CENTRAL',
    accentColor: '#e85d45',
    category: 'Carnes & Especialidades',
    slug: 'restocentral',
    items: [
      {
        name: 'Ojo de Bife con Papas',
        desc: 'Corte 400g a punto con guarnición de papas fritas.',
        price: '$ 18.500',
      },
      {
        name: 'Risotto de Hongos',
        desc: 'Arroz arborio, champignons y queso parmesano.',
        price: '$ 15.200',
      },
    ],
    cart: '2 ítems • $ 33.700',
  },
};

const INDUSTRIES = [
  { id: 'HAMBURGUESERIA', label: 'Hamburguesería', icon: UtensilsCrossed, desc: 'Smash burgers, combos y KDS' },
  { id: 'CAFETERIA', label: 'Cafetería', icon: Coffee, desc: 'Especialidad, brunch y mostrador' },
  { id: 'PIZZERIA', label: 'Pizzería', icon: Pizza, desc: 'A la leña, mitades y delivery' },
  { id: 'BAR', label: 'Bar & Cervecería', icon: Beer, desc: 'Canillas, barra y happy hours' },
  { id: 'RESTAURANTE_GENERAL', label: 'Restaurante', icon: Store, desc: 'Salón de mesas y vinos' },
];

export default function DemoWizardScreen() {
  const [stage1Ready, setStage1Ready] = useState(true);
  const [stage2Ready, setStage2Ready] = useState(true);

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const isTestTurnstile =
    !process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
    process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY === '1x00000000000000000000AA';
  const [turnstileOk, setTurnstileOk] = useState(isTestTurnstile);
  const [globalError, setGlobalError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [successData, setSuccessData] = useState(null);
  const [countdown, setCountdown] = useState(10);
  const [hasOpened, setHasOpened] = useState(false);

  const businessInputRef = useRef(null);

  const [formData, setFormData] = useState({
    ownerName: '',
    email: '',
    whatsapp: '',
    businessName: '',
    industry: 'HAMBURGUESERIA',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleStep1Submit = (e) => {
    if (e) e.preventDefault();
    const errors = {};

    if (!formData.ownerName || formData.ownerName.trim().length < 2) {
      errors.ownerName = 'Ingresá tu nombre completo';
    }
    if (!formData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errors.email = 'Ingresá un email válido';
    }
    if (!formData.whatsapp || formData.whatsapp.trim().length < 7) {
      errors.whatsapp = 'Ingresá tu WhatsApp con código de área';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    setStep(2);
    setTimeout(() => businessInputRef.current?.focus(), 200);
  };

  const handleStep2Submit = async (e) => {
    if (e) e.preventDefault();
    const errors = {};

    if (!formData.businessName || formData.businessName.trim().length < 2) {
      errors.businessName = 'Ingresá el nombre de tu local';
    }
    if (!formData.industry) {
      errors.industry = 'Seleccioná el rubro';
    }

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setLoading(true);
    setGlobalError('');

    const payload = {
      businessName: formData.businessName.trim(),
      ownerName: formData.ownerName.trim(),
      email: formData.email.trim(),
      whatsapp: formData.whatsapp.trim(),
      industry: formData.industry,
    };

    try {
      // 1. Usar proxy interno /api/demo/register de Next.js para eliminar problemas de localhost en celulares/LAN y CORS
      let response;
      try {
        response = await fetch('/api/demo/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } catch {
        // Fallback directo a NEXT_PUBLIC_API_URL si no estuviera disponible el proxy relativo
        const fallbackUrl = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1'}/demo/register`;
        response = await fetch(fallbackUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const json = await response.json();

      if (!response.ok || !json.success) {
        if (json.errorCode === 'VALIDATION_FAILED') {
          setFieldErrors(json.fieldErrors || {});
        } else if (json.errorCode === 'EMAIL_ALREADY_EXISTS') {
          setGlobalError('Ya existe una cuenta con este correo.');
        } else {
          setGlobalError(json.message || 'Error al generar la demo. Intentá de nuevo.');
        }
        return;
      }

      // 2. Adaptar URLs EXCLUSIVAMENTE para pruebas en red local (LAN) en desarrollo
      // Solo si el usuario entra por IP privada (192.168.x.x o .local).
      // En dominios públicos (roosty.site, roosty.com.ar, vercel, etc.) se respetan al 100% las URLs del backend.
      const adaptedData = { ...json.data };
      if (typeof window !== 'undefined') {
        const currentHostname = window.location.hostname;
        const isLanIp =
          /^(192\.168\.|10\.|172\.(1[6-9]|2[0-9]|3[0-1])\.)/.test(currentHostname) ||
          currentHostname.endsWith('.local');

        if (isLanIp) {
          if (adaptedData.adminUrl) {
            adaptedData.adminUrl = adaptedData.adminUrl.replace(/localhost|127\.0\.0\.1/, currentHostname);
          }
          if (adaptedData.menuUrl) {
            adaptedData.menuUrl = adaptedData.menuUrl.replace(/localhost|127\.0\.0\.1/, currentHostname);
          }
        }
      }

      setSuccessData(adaptedData);
      setStep(3);
    } catch {
      setGlobalError('No pudimos conectar con el servidor. Por favor verificá tu conexión o contactanos por WhatsApp.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (step !== 3 || !successData || hasOpened) return;

    if (countdown === 0) {
      const redirectUrl = `${successData.adminUrl}?token=${encodeURIComponent(successData.token)}`;
      try {
        window.open(redirectUrl, '_blank', 'noopener,noreferrer');
      } catch (e) {
        console.error('Error abriendo nueva pestaña:', e);
      }
      setHasOpened(true);
      return;
    }

    const timer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [step, successData, countdown, hasOpened]);

  const activePreset = INDUSTRY_DATA[formData.industry] || INDUSTRY_DATA.HAMBURGUESERIA;
  const displayLocalName = formData.businessName?.trim() || activePreset.defaultName;
  const displaySlug = formData.businessName?.trim()
    ? formData.businessName.toLowerCase().replace(/[^a-z0-9]/g, '')
    : activePreset.slug;

  const redirectTargetUrl = successData
    ? `${successData.adminUrl}?token=${encodeURIComponent(successData.token)}`
    : '#';

  return (
    <div className="relative h-screen max-h-screen w-full overflow-hidden bg-[#faf9f8] select-none">
      


      {/* Turnstile completamente invisible e imperceptible */}
      <div className="sr-only pointer-events-none opacity-0 absolute">
        <Turnstile
          siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
          onSuccess={() => setTurnstileOk(true)}
          onError={() => setTurnstileOk(false)}
        />
      </div>

      {/* ─────────────────────────────────────────────────────────────
          SPLIT SCREEN 50/50 SIN SCROLL (h-screen max-h-screen)
      ───────────────────────────────────────────────────────────── */}
      <div className="h-full w-full flex flex-col lg:flex-row overflow-y-auto lg:overflow-hidden">

        {/* ─────────────────────────────────────────────────────────────
            LADO IZQUIERDO: WIDGET INTERACTIVO PERSONALIZABLE
        ───────────────────────────────────────────────────────────── */}
        <div
          className={`
            w-full lg:w-1/2 h-auto lg:h-full bg-[#0e0e11] text-zinc-100 p-6 sm:p-8 lg:p-8 xl:p-10 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-zinc-800/80 shrink-0
            transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${stage1Ready ? 'translate-x-0 opacity-100' : '-translate-x-12 opacity-0'}
          `}
        >
          {/* Luz ambiental */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[350px] bg-[#e85d45]/10 blur-[120px] pointer-events-none rounded-full" />

          {/* Header Superior Izquierdo */}
          <div className="relative z-10 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="relative h-7 w-28 transition-transform duration-200 group-hover:opacity-85">
                <Image
                  src="/roosty2.png"
                  alt="Roosty POS"
                  fill
                  priority
                  className="object-contain object-left invert opacity-90"
                />
              </div>
            </Link>

            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900/90 border border-zinc-800 text-[10px] font-mono text-zinc-400">
              <Sparkles className="w-3 h-3 text-[#e85d45]" />
              <span>Simulador de Carta & Pedidos</span>
            </span>
          </div>

          {/* Centro: Smartphone Mockup Interactivo Reactivo al Formulario */}
          <div
            className={`
              relative z-10 my-auto py-2 flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
              ${stage2Ready ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}
            `}
          >
            {/* Cuerpo del Smartphone */}
            <div className="w-[280px] sm:w-[310px] rounded-[38px] p-2 bg-gradient-to-b from-zinc-700 via-zinc-800 to-zinc-950 shadow-2xl border border-zinc-700/70">
              <div className="w-full rounded-[30px] bg-[#16161a] text-zinc-100 overflow-hidden border border-zinc-800 flex flex-col justify-between h-[380px] sm:h-[420px] shadow-inner text-xs">
                
                {/* Dynamic Island / Notch */}
                <div className="pt-2 px-4 pb-1.5 bg-[#121215] flex items-center justify-between border-b border-zinc-800/60">
                  <div className="text-[10px] font-mono text-zinc-400">9:41</div>
                  <div className="w-16 h-3 rounded-full bg-black mx-auto" />
                  <div className="text-[10px] font-mono text-emerald-400">5G</div>
                </div>

                {/* Barra de Navegación del Subdominio */}
                <div className="px-3 py-1.5 bg-[#141418] border-b border-zinc-800/80 flex items-center justify-between gap-1.5">
                  <div className="flex-1 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-400 truncate">
                    <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                    <span className="text-zinc-200 font-semibold truncate">{displaySlug}</span>
                    <span>.roosty.site</span>
                  </div>
                  <Globe className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                </div>

                {/* Contenido de la Carta Digital */}
                <div className="p-3.5 flex-1 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#141418] to-[#121215]">
                  <div>
                    {/* Header del Local */}
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-9 h-9 rounded-xl bg-[#e85d45] text-white font-serif font-bold text-base flex items-center justify-center shadow-sm shrink-0">
                        {displayLocalName.charAt(0).toUpperCase()}
                      </div>
                      <div className="truncate">
                        <div className="font-bold text-white text-xs truncate leading-tight">
                          {displayLocalName}
                        </div>
                        <div className="text-[10px] text-zinc-400 leading-tight mt-0.5">
                          {activePreset.tag}
                        </div>
                      </div>
                    </div>

                    {/* Categoría activa */}
                    <div className="inline-block px-2.5 py-1 rounded-md bg-zinc-800/80 text-[10px] font-semibold text-[#e85d45] mb-2.5 border border-zinc-700/50">
                      {activePreset.category}
                    </div>

                    {/* Ítems del Menú */}
                    <div className="space-y-2">
                      {activePreset.items.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-2 rounded-xl bg-zinc-900/90 border border-zinc-800/90 flex items-center justify-between gap-2 shadow-xs"
                        >
                          <div className="truncate">
                            <div className="font-medium text-[11px] text-zinc-100 truncate">{item.name}</div>
                            <div className="text-[9px] text-zinc-400 truncate">{item.desc}</div>
                          </div>
                          <div className="flex items-center gap-1.5 shrink-0">
                            <span className="font-mono text-[11px] font-semibold text-zinc-200">{item.price}</span>
                            <div className="w-5 h-5 rounded-md bg-[#e85d45] text-white flex items-center justify-center">
                              <Plus className="w-3 h-3 stroke-[3]" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Barra Flotante de WhatsApp en el Teléfono */}
                  <div className="mt-2.5 p-2 rounded-xl bg-[#e85d45] text-white flex items-center justify-between shadow-md shadow-[#e85d45]/30">
                    <span className="text-[10px] font-bold truncate">{activePreset.cart}</span>
                    <span className="text-[10px] font-semibold flex items-center gap-1 shrink-0">
                      <span>Pedir</span>
                      <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Widget Inferior: Notificación de Pedido Web Despachado */}
            <div className="w-[280px] sm:w-[310px] mt-3 p-2.5 rounded-2xl bg-zinc-900/95 border border-zinc-800 flex items-center justify-between gap-2 shadow-lg backdrop-blur-xs">
              <div className="flex items-center gap-2 truncate">
                <div className="w-7 h-7 rounded-lg bg-[#e85d45]/20 text-[#e85d45] flex items-center justify-center shrink-0">
                  <Bike className="w-3.5 h-3.5" />
                </div>
                <div className="truncate text-left">
                  <div className="text-[11px] font-semibold text-white truncate">
                    Nuevo Pedido Web #108
                  </div>
                  <div className="text-[9px] text-zinc-400 truncate">
                    Despachado directo a WhatsApp
                  </div>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[9px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                0% Comisión
              </span>
            </div>
          </div>

          {/* Footer Inferior Izquierdo */}
          <div className="relative z-10 text-xs text-zinc-500 flex items-center justify-between pt-2 border-t border-zinc-800/60">
            <span className="text-[11px]">14 días de prueba gratis</span>
            <div className="flex items-center gap-2 opacity-80">
              <div className="relative h-3.5 w-14">
                <Image src="/roosty2.png" alt="Roosty" fill className="object-contain invert opacity-75" />
              </div>
              <span className="font-mono text-[9px] text-zinc-400">v2.4</span>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            LADO DERECHO: FORMULARIO DIRECTO EN CANVAS (SIN SCROLL)
        ───────────────────────────────────────────────────────────── */}
        <div
          className={`
            w-full lg:w-1/2 h-auto lg:h-full bg-[#faf9f8] p-6 sm:p-8 lg:p-8 xl:p-12 flex flex-col justify-between shrink-0
            transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]
            ${stage1Ready ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}
          `}
        >
          {/* Header Superior Derecho con Barra de Progreso */}
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-zinc-500 mb-2">
              <span className="font-mono uppercase tracking-wider text-zinc-700">
                {step === 1 && 'Paso 01 / 02 — Tus Datos'}
                {step === 2 && 'Paso 02 / 02 — Tu Local'}
                {step === 3 && '¡Tu cuenta está lista!'}
              </span>
              <span className="font-mono text-zinc-900 font-bold tabular-nums">
                {step === 1 ? '50%' : step === 2 ? '90%' : '100%'}
              </span>
            </div>

            <div className="h-1.5 w-full bg-zinc-200 rounded-full overflow-hidden mb-4">
              <div
                className="h-full bg-[#e85d45] rounded-full transition-all duration-500 ease-out"
                style={{
                  width: step === 1 ? '50%' : step === 2 ? '90%' : '100%',
                }}
              />
            </div>
          </div>

          {/* Cuerpo Central del Formulario */}
          <div className="my-auto max-w-md w-full mx-auto py-2">
            
            {/* PASO 1: TUS DATOS */}
            {step === 1 && (
              <form onSubmit={handleStep1Submit} className="space-y-4">
                <div
                  className={`transition-all duration-500 delay-100 ${
                    stage2Ready ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                >
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight leading-tight">
                    Comencemos por vos.
                  </h1>
                  <p className="text-zinc-500 text-xs sm:text-sm mt-1">
                    Creá tu usuario administrador para ingresar a la demo.
                  </p>
                </div>

                <div className="space-y-3 pt-1">
                  {/* Nombre */}
                  <div
                    className={`transition-all duration-500 delay-200 ${
                      stage2Ready ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}
                  >
                    <label htmlFor="ownerName" className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 mb-1">
                      Tu Nombre Completo
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        id="ownerName"
                        name="ownerName"
                        value={formData.ownerName}
                        onChange={handleChange}
                        placeholder="Ej. Juan Pérez"
                        className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-white border border-zinc-300 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#e85d45] focus:ring-4 focus:ring-[#e85d45]/12 transition-all outline-none"
                      />
                    </div>
                    {fieldErrors.ownerName && (
                      <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.ownerName}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div
                    className={`transition-all duration-500 delay-300 ${
                      stage2Ready ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}
                  >
                    <label htmlFor="email" className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 mb-1">
                      Correo Electrónico
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="juan@tulocal.com"
                        className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-white border border-zinc-300 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#e85d45] focus:ring-4 focus:ring-[#e85d45]/12 transition-all outline-none"
                      />
                    </div>
                    {fieldErrors.email && (
                      <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.email}</p>
                    )}
                  </div>

                  {/* WhatsApp */}
                  <div
                    className={`transition-all duration-500 delay-400 ${
                      stage2Ready ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                    }`}
                  >
                    <label htmlFor="whatsapp" className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 mb-1">
                      Número de WhatsApp
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                        <Phone className="w-4 h-4" />
                      </div>
                      <input
                        type="tel"
                        id="whatsapp"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        placeholder="+54 9 11 2233-4455"
                        className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-white border border-zinc-300 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#e85d45] focus:ring-4 focus:ring-[#e85d45]/12 transition-all outline-none"
                      />
                    </div>
                    {fieldErrors.whatsapp && (
                      <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.whatsapp}</p>
                    )}
                  </div>
                </div>

                {/* Botón táctil */}
                <div
                  className={`pt-2 transition-all duration-500 delay-500 ${
                    stage2Ready ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                  }`}
                >
                  <button
                    type="submit"
                    className="group w-full h-12 inline-flex items-center justify-center gap-2.5 px-5 rounded-xl text-sm font-semibold text-white bg-[#e85d45] hover:bg-[#d44c34] active:scale-[0.98] shadow-md shadow-[#e85d45]/25 hover:shadow-lg hover:shadow-[#e85d45]/35 transition-all duration-150 cursor-pointer"
                  >
                    <span>Continuar al local</span>
                    <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform duration-150">
                      <ArrowRight className="w-3 h-3 text-white" />
                    </span>
                    <span className="ml-1 text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono">
                      Enter ↵
                    </span>
                  </button>
                </div>
              </form>
            )}

            {/* PASO 2: TU LOCAL & RUBRO */}
            {step === 2 && (
              <form onSubmit={handleStep2Submit} className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
                <div>
                  <h1 className="font-serif text-2xl sm:text-3xl font-bold text-zinc-950 tracking-tight leading-tight">
                    Tu Negocio.
                  </h1>
                  <p className="text-zinc-500 text-xs sm:text-sm mt-0.5">
                    Configurá tu marca y rubro para inyectar datos reales.
                  </p>
                </div>

                {/* Nombre del local */}
                <div>
                  <label htmlFor="businessName" className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 mb-1">
                    Nombre del Local
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-400">
                      <Store className="w-4 h-4" />
                    </div>
                    <input
                      ref={businessInputRef}
                      type="text"
                      id="businessName"
                      name="businessName"
                      value={formData.businessName}
                      onChange={handleChange}
                      placeholder="Ej. Burger Bros, Café Botánico..."
                      className="w-full h-11 pl-10 pr-3.5 rounded-xl bg-white border border-zinc-300 text-sm text-zinc-900 placeholder:text-zinc-400 focus:border-[#e85d45] focus:ring-4 focus:ring-[#e85d45]/12 transition-all outline-none"
                    />
                  </div>
                  {fieldErrors.businessName && (
                    <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.businessName}</p>
                  )}
                </div>

                {/* Selector de Rubros Compacto */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-zinc-700 mb-1.5">
                    Elegí tu Rubro
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {INDUSTRIES.map((ind) => {
                      const isSelected = formData.industry === ind.id;
                      const Icon = ind.icon;
                      return (
                        <div
                          key={ind.id}
                          onClick={() => {
                            setFormData((prev) => ({ ...prev, industry: ind.id }));
                            if (fieldErrors.industry) {
                              setFieldErrors((prev) => ({ ...prev, industry: '' }));
                            }
                          }}
                          className={`
                            p-2.5 rounded-xl cursor-pointer transition-all duration-150 active:scale-[0.98] flex items-center gap-2
                            ${
                              isSelected
                                ? 'bg-[#fff2ef] border-2 border-[#e85d45] shadow-xs ring-2 ring-[#e85d45]/15'
                                : 'bg-white border border-zinc-200/90 hover:border-zinc-300'
                            }
                          `}
                        >
                          <div className={`p-1.5 rounded-lg shrink-0 ${isSelected ? 'bg-[#e85d45] text-white' : 'bg-zinc-100 text-zinc-600'}`}>
                            <Icon className="w-3.5 h-3.5" />
                          </div>
                          <div className="truncate">
                            <div className={`font-semibold text-xs truncate ${isSelected ? 'text-zinc-950 font-bold' : 'text-zinc-800'}`}>
                              {ind.label}
                            </div>
                            <div className="text-[10px] text-zinc-500 truncate leading-none mt-0.5">
                              {ind.desc}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {fieldErrors.industry && (
                    <p className="text-red-500 text-xs mt-1 font-medium">{fieldErrors.industry}</p>
                  )}
                </div>

                {globalError && (
                  <div className="p-3.5 rounded-xl bg-red-50 border border-red-200/90 text-xs text-red-800 space-y-2">
                    <p className="font-medium leading-relaxed">{globalError}</p>
                    <a
                      href={getWhatsAppLink(
                        `Hola equipo Roosty, quise crear la demo de mi local "${formData.businessName || 'mi negocio'}" y ocurrió un error al procesar el alta. ¿Me ayudan a activarla?`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-semibold text-[#e85d45] hover:text-[#d44c34] hover:underline"
                    >
                      <MessageCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>Activar por WhatsApp con un asesor →</span>
                    </a>
                  </div>
                )}

                {/* Acciones */}
                <div className="flex gap-2.5 pt-1">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    disabled={loading}
                    className="px-4 h-12 rounded-xl bg-white border border-zinc-300 hover:bg-zinc-50 active:scale-[0.98] text-zinc-700 text-xs font-semibold flex items-center gap-1 transition-all cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Atrás</span>
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 h-12 inline-flex items-center justify-center gap-2 px-5 rounded-xl text-sm font-semibold text-white bg-[#e85d45] hover:bg-[#d44c34] active:scale-[0.98] disabled:bg-zinc-300 disabled:cursor-not-allowed shadow-md shadow-[#e85d45]/25 hover:shadow-lg hover:shadow-[#e85d45]/35 transition-all duration-150 cursor-pointer"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                        <span>Creando tu panel...</span>
                      </>
                    ) : (
                      <>
                        <span>Crear mi demo gratis</span>
                        <span className="ml-1 text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-mono">
                          Enter ↵
                        </span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* PASO 3: ÉXITO */}
            {step === 3 && successData && (
              <div className="flex flex-col items-center text-center animate-in zoom-in-95 duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#fff2ef] border border-[#e85d45]/30 text-[#e85d45] flex items-center justify-center mb-3 shadow-sm">
                  <CheckCircle2 className="w-6 h-6" />
                </div>

                <h1 className="font-serif text-2xl font-bold text-zinc-950 tracking-tight mb-1">
                  ¡Tu local está listo!
                </h1>
                <p className="text-zinc-600 text-xs max-w-xs mb-4">
                  Escaneá el código para ver tu Carta Digital o ingresá directo a tu panel.
                </p>

                {/* QR */}
                <div className="p-3 bg-white border border-zinc-200/90 rounded-2xl shadow-sm mb-2.5 inline-block">
                  <QRCodeSVG value={successData.menuUrl} size={130} />
                </div>

                <a
                  href={successData.menuUrl}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-[#e85d45] hover:text-[#d44c34] mb-4"
                >
                  <span>Ver Carta Digital online</span>
                  <ExternalLink className="w-3 h-3" />
                </a>

                {/* Credenciales */}
                <div className="w-full bg-white border border-zinc-200/90 rounded-xl p-3 text-left mb-4 shadow-xs">
                  <div className="flex items-center justify-between py-1 border-b border-zinc-100 text-xs">
                    <span className="text-zinc-600 font-medium">Usuario</span>
                    <span className="font-mono bg-zinc-50 px-2 py-0.5 rounded border border-zinc-200 font-semibold text-zinc-900 select-all cursor-text">
                      {successData.credentials.username}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-1 text-xs">
                    <span className="text-zinc-600 font-medium">Contraseña</span>
                    <span className="font-mono bg-zinc-50 px-2 py-0.5 rounded border border-zinc-200 font-semibold text-zinc-900 select-all cursor-text">
                      {successData.credentials.password}
                    </span>
                  </div>
                </div>

                {/* Botón de Apertura en Nueva Pestaña y Contador */}
                <a
                  href={redirectTargetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setHasOpened(true)}
                  className="w-full h-12 inline-flex items-center justify-between px-5 rounded-xl bg-zinc-950 hover:bg-zinc-900 text-white text-xs font-semibold shadow-md active:scale-[0.98] transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <span>{hasOpened ? 'Volver a abrir panel' : 'Abrir panel en nueva pestaña'}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
                  </div>
                  {!hasOpened && countdown > 0 ? (
                    <div className="flex items-center gap-1.5 text-zinc-400 font-normal">
                      <span className="text-[11px]">Auto-apertura en</span>
                      <span className="font-mono text-xs font-bold text-[#e85d45] tabular-nums bg-white/10 px-2 py-0.5 rounded">
                        {countdown}s
                      </span>
                    </div>
                  ) : (
                    <span className="text-[10px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                      Abierto en pestaña
                    </span>
                  )}
                </a>
              </div>
            )}

          </div>

          {/* Footer Inferior Derecho */}
          <div className="pt-3 border-t border-zinc-200/80 flex items-center justify-between text-xs text-zinc-500">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#e85d45]" />
              <span className="text-[11px]">Cifrado SSL bancario</span>
            </div>
            <div className="flex items-center gap-1.5 opacity-80">
              <div className="relative h-4 w-16">
                <Image src="/roosty2.png" alt="Roosty POS" fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
