"use client";

import { useState, Fragment } from "react";
import {
  Check,
  X,
  ArrowRight,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
} from "lucide-react";
import { SITE_CONFIG, getWhatsAppLink } from "@/config/site";
import Link from "next/link";
import { DemoTransitionLink } from "@/context/TransitionContext";

export default function PricingSection({ isPreciosPage = false }) {
  const [billingType, setBillingType] = useState("ltd"); // "ltd" | "monthly"
  const [showMatrix, setShowMatrix] = useState(false);

  const plans = [
    {
      code: "STARTER_TAKEAWAY",
      name: "Starter Takeaway",
      badge: "Mostrador & Delivery",
      headline: "Velocidad extrema de mostrador, cero enredos y pedidos online sin comisiones.",
      target: "Cafeterías al paso, hamburgueserías, dark kitchens, food trucks y rotiserías.",
      monthly: {
        price: "$30.000",
        period: "/mes",
        note: "Abono mensual fijo sin contratos de permanencia",
      },
      ltd: {
        price: "$250.000",
        period: "pago único de por vida",
        note: "Equivale a ~7 meses de abono. No pagás nunca más una cuota.",
        spots: "Cupo de lanzamiento: Primeros 15 locales",
      },
      popular: false,
      buttonText: billingType === "ltd" ? "Consultar Licencia Founder" : "Probar 14 días gratis",
      buttonStyle: "bg-zinc-900 hover:bg-zinc-800 text-white shadow-xs",
      whatsappMessage: billingType === "ltd"
        ? "Hola! Quiero consultar disponibilidad para la Licencia Founder de por vida del plan Starter Takeaway."
        : "Hola! Quiero probar 14 días gratis del plan Starter Takeaway de Roosty POS.",
      limits: {
        tables: "0 mesas (Modo Mostrador / Takeaway)",
        users: "Hasta 5 usuarios con PIN",
      },
      keyFeatures: [
        "Terminal POS de venta rápida con tickets numerados (#VR-101)",
        "Catálogo con buscador instantáneo y carga en 1 toque",
        "Cobro express en efectivo, QR y tarjetas",
        "Menú digital con identidad propia y subdominio",
        "Recepción de pedidos online con confirmación a WhatsApp",
        "Ticket para cadete con cálculo de vuelto a llevar",
        "Seguimiento de pedidos en tiempo real para el cliente",
        "Turno de caja con fondo inicial y arqueo ciego",
        "Libro diario de ingresos y gastos menores",
        "Todas las actualizaciones futuras bonificadas",
      ],
    },
    {
      code: "PRO_SALON",
      name: "Pro Salón",
      badge: "El Plan Más Elegido",
      headline: "El control total de tu salón, barra y cocina con comanda ágil y KDS en vivo.",
      target: "Bares, cervecerías, restaurantes tradicionales, parrillas y pizzerías con salón.",
      monthly: {
        price: "$55.000",
        period: "/mes",
        note: "El estándar más completo para locales con atención en salón",
      },
      ltd: {
        price: "$450.000",
        period: "pago único de por vida",
        note: "Inversión recuperada en 7 meses. Chau aumentos por inflación.",
        spots: "Cupo de lanzamiento: Primeros 20 locales",
      },
      popular: true,
      buttonText: billingType === "ltd" ? "Consultar Licencia Pro Founder" : "Probar 14 días gratis",
      buttonStyle: "bg-[#e85d45] hover:bg-[#d44c34] text-white shadow-md shadow-[#e85d45]/25",
      whatsappMessage: billingType === "ltd"
        ? "Hola! Quiero consultar disponibilidad para la Licencia Founder de por vida del plan Pro Salón."
        : "Hola! Quiero probar 14 días gratis del plan Pro Salón de Roosty POS.",
      limits: {
        tables: "Hasta 30 mesas dinámicas",
        users: "Hasta 15 mozos y cajeros",
      },
      keyFeatures: [
        "Todo lo incluido en el plan Starter Takeaway",
        "Mapa de mesas con sectores (Salón, Patio, Terraza, Barra, VIP)",
        "Estados en vivo con cronómetro de permanencia por mesa",
        "Asignación rápida de mozos y comensales por cuenta",
        "Atajo Spotlight de mesas en 1 segundo por teclado (M)",
        "Barra de mesas activas para saltar entre cuentas sin salir",
        "Tandas de marcha a cocina sin duplicar platos (F8)",
        "Pantalla KDS táctil interactiva o comanderas térmicas",
        "Checkout con pagos divididos y cobros mixtos",
        "Dashboard con reportes de ventas y exportación a Excel",
      ],
    },
    {
      code: "BUSINESS_ENTERPRISE",
      name: "Business Enterprise",
      badge: "Capacidad Masiva",
      headline: "Potencia masiva, capacidad sin límites y soporte prioritario para alto volumen.",
      target: "Cervecerías multiespacio (+50 mesas), grandes salones, grupos y franquicias.",
      monthly: {
        price: "$95.000",
        period: "/sucursal /mes",
        note: "Para operaciones masivas y múltiples terminales",
      },
      ltd: {
        price: "$750.000",
        period: "pago único de por vida",
        note: "Capacidad ilimitada para siempre sin cuotas mensuales.",
        spots: "Cupo de lanzamiento: Primeros 5 locales",
      },
      popular: false,
      buttonText: billingType === "ltd" ? "Hablar con un Asesor VIP" : "Hablar con un asesor",
      buttonStyle: "bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-300 shadow-xs",
      whatsappMessage: billingType === "ltd"
        ? "Hola! Quiero asesoramiento para la Licencia Founder Enterprise de Roosty POS."
        : "Hola! Quiero solicitar una demo y asesoramiento para el plan Business Enterprise de Roosty POS.",
      limits: {
        tables: "Mesas Ilimitadas",
        users: "Usuarios y Mozos Ilimitados",
      },
      keyFeatures: [
        "Todo lo incluido en el plan Pro Salón",
        "Mesas, sectores físicos y barras de despacho sin restricciones",
        "Cuentas de usuario ilimitadas con roles y PIN individual",
        "Arquitectura multi-estación (PCs de caja + tablets de mozos)",
        "Pantallas KDS independientes para Cocina, Parrilla y Barra",
        "Migración asistida y carga de cartas complejas en 30 min",
        "Configuración de branding integral y subdominio propio",
        "Auditoría histórica de turnos y métricas avanzadas",
        "Soporte técnico prioritario 24/7 y garantía de disponibilidad",
      ],
    },
  ];

  const comparisonMatrix = [
    {
      category: "Capacidad & Salón",
      rows: [
        {
          feature: "Capacidad de Mesas",
          starter: "0 mesas (Takeaway)",
          pro: "Hasta 30 mesas",
          enterprise: "Ilimitadas",
          type: "text",
        },
        {
          feature: "Cuentas de Personal (Staff con PIN)",
          starter: "Hasta 5 usuarios",
          pro: "Hasta 15 usuarios",
          enterprise: "Ilimitadas",
          type: "text",
        },
        {
          feature: "Venta Rápida / Mostrador (Atajo T)",
          starter: true,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Mapa de Salón y Sectores Dinámicos",
          starter: false,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Cronómetro de Ocupación en Vivo por Mesa",
          starter: false,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Control de Comensales y Mozos por Mesa",
          starter: false,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Spotlight de Mesas por Teclado (Atajo M)",
          starter: false,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
      ],
    },
    {
      category: "Comandas & Terminal POS",
      rows: [
        {
          feature: "Buscador de Catálogo Instantáneo (/ o Ctrl+K)",
          starter: true,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Pool de Adicionales & Extras en Vivo",
          starter: true,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Notas de Cocina Específicas por Plato",
          starter: true,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Cobro Express en Efectivo (Fast Cash)",
          starter: true,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Barra de Mesas Activas en Paralelo",
          starter: false,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Multi-estación en Simultáneo (PCs + Tablets)",
          starter: false,
          pro: "Hasta 2 terminales",
          enterprise: "Ilimitadas sincronizadas",
          type: "text",
        },
      ],
    },
    {
      category: "Cocina & Despacho",
      rows: [
        {
          feature: "Despacho por Tandas a Cocina (F8)",
          starter: false,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Impresión de Tickets Térmicos (80mm / 58mm)",
          starter: "Opcional",
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Pantalla KDS Digital Interactiva con Semáforo",
          starter: false,
          pro: true,
          enterprise: "Multi-pantalla (Cocina/Barra)",
          type: "text",
        },
      ],
    },
    {
      category: "Caja & Finanzas",
      rows: [
        {
          feature: "Turnos de Caja con Fondo Inicial Obligatorio",
          starter: true,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Arqueo Ciego y Cálculo de Diferencias",
          starter: true,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Libro Diario de Gastos e Ingresos Menores",
          starter: true,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Historial de Cierres y Exportación a Excel",
          starter: true,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Checkout Multimedio y Pagos Divididos",
          starter: true,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
      ],
    },
    {
      category: "Carta Digital & Delivery",
      rows: [
        {
          feature: "Carta Digital con Identidad y Subdominio Propio",
          starter: true,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Comisión por Pedido Online",
          starter: "0% comisiones",
          pro: "0% comisiones",
          enterprise: "0% comisiones",
          type: "text",
        },
        {
          feature: "Recepción Directa y Confirmación a WhatsApp",
          starter: true,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Rastreo de Pedido en Vivo para el Cliente",
          starter: true,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Ticket para Cadete con Cálculo de Vuelto",
          starter: true,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
      ],
    },
    {
      category: "Soporte & Onboarding",
      rows: [
        {
          feature: "Carga y Migración de Menú Actual",
          starter: "Gratuita",
          pro: "Prioritaria Asistida",
          enterprise: "VIP Sub-30 min",
          type: "text",
        },
        {
          feature: "Guía de Capacitación para Personal",
          starter: true,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Nivel de Soporte Técnico",
          starter: "Estándar por WhatsApp",
          pro: "Prioritario en Horario Pico",
          enterprise: "VIP Dedicado 24/7",
          type: "text",
        },
      ],
    },
  ];

  return (
    <section
      id="precios"
      className={`${
        isPreciosPage ? "pb-20 md:pb-28" : "py-20 md:py-28"
      } bg-[#faf9f8] relative border-b border-zinc-200/80 w-full max-w-full overflow-hidden`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header (H1 on /precios, H2 on Home) */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          {isPreciosPage ? (
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-zinc-950 mb-5 leading-tight text-balance">
              Elegí cómo querés <br className="hidden sm:inline" />
              <span className="text-[#e85d45]">adquirir Roosty POS.</span>
            </h1>
          ) : (
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-950 mb-5 leading-tight text-balance">
              Elegí cómo querés <br className="hidden sm:inline" />
              <span className="text-[#e85d45]">adquirir Roosty POS.</span>
            </h2>
          )}

          <p className="text-base sm:text-lg text-zinc-600 font-normal leading-relaxed text-balance">
            Sin costos ocultos por comensal, sin aumentos sorpresivos y con 14 días de prueba con todas las funciones habilitadas.
          </p>

          {/* 3 Guarantees Ribbon */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-6 text-xs text-zinc-600 font-medium">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#e85d45]" />
              <span>14 días de prueba sin compromiso</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#e85d45]" />
              <span>0% de comisiones por pedidos</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#e85d45]" />
              <span>Carga de menú inicial bonificada</span>
            </div>
          </div>
        </div>

        {/* Switcher Toggle (Lifetime Deal vs Mensual) */}
        <div className="flex flex-col items-center justify-center mb-14 space-y-3">
          <div className="p-1.5 rounded-2xl bg-zinc-200/80 border border-zinc-300/80 flex items-center gap-1">
            <button
              type="button"
              onClick={() => setBillingType("ltd")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                billingType === "ltd"
                  ? "bg-[#e85d45] text-white shadow-md shadow-[#e85d45]/25"
                  : "text-zinc-700 hover:text-zinc-950"
              }`}
            >
              <span>Pago Único de por Vida</span>
              <span className={`text-[10px] uppercase tracking-wider px-1.5 py-0.2 rounded-md font-extrabold ${
                billingType === "ltd" ? "bg-white/20 text-white" : "bg-zinc-300 text-zinc-800"
              }`}>
                Founder
              </span>
            </button>

            <button
              type="button"
              onClick={() => setBillingType("monthly")}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                billingType === "monthly"
                  ? "bg-zinc-900 text-white shadow-md shadow-zinc-950/20"
                  : "text-zinc-700 hover:text-zinc-950"
              }`}
            >
              <span>Abono Mensual</span>
            </button>
          </div>

          <p className="text-xs text-zinc-500 font-light text-center">
            {billingType === "ltd"
              ? "Edición Founder: Abonás una sola vez para tu local físico y no volvés a pagar cuotas mensuales."
              : "Suscripción mensual fija en pesos argentinos sin contratos de permanencia. Cancelás cuando quieras."}
          </p>
        </div>

        {/* Pricing Cards Grid (Cleanly aligned, equal heights) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto mb-16">
          {plans.map((plan, idx) => {
            const pricing = billingType === "ltd" ? plan.ltd : plan.monthly;
            const waLink = getWhatsAppLink(plan.whatsappMessage);

            return (
              <div
                key={plan.code}
                className={`rounded-3xl p-7 sm:p-8 flex flex-col justify-between h-full transition-all duration-200 ${
                  plan.popular
                    ? "bg-white border-2 border-[#e85d45] shadow-xl relative lg:-translate-y-2 ring-4 ring-[#e85d45]/10"
                    : "bg-white border border-zinc-200/90 shadow-sm hover:border-zinc-300 hover:shadow-md hover:-translate-y-1"
                }`}
              >
                <div className="flex-1 flex flex-col">
                  {/* Top Badge */}
                  <div className="mb-3">
                    {plan.popular ? (
                      <div className="inline-block bg-[#e85d45] text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
                        {plan.badge}
                      </div>
                    ) : (
                      <span className="inline-block text-[11px] font-bold text-zinc-500 uppercase tracking-wider bg-zinc-100 px-2.5 py-0.5 rounded-md">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  {/* Header Titles (Fixed vertical cadence) */}
                  <div className="mb-4">
                    <h3 className="font-serif text-2xl font-bold text-zinc-900 mb-1">
                      {plan.name}
                    </h3>
                    <p className="text-xs font-semibold text-[#e85d45] mb-2 leading-snug min-h-[34px]">
                      {plan.headline}
                    </p>
                    <p className="text-xs text-zinc-500 leading-relaxed font-light min-h-[40px]">
                      {plan.target}
                    </p>
                  </div>

                  {/* Price in ARS */}
                  <div className="mb-5 pb-4 border-b border-zinc-100">
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-serif text-4xl sm:text-5xl font-extrabold text-zinc-950 tabular-nums">
                        {pricing.price}
                      </span>
                      <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">
                        ARS
                      </span>
                    </div>
                    <span className="text-xs font-medium text-zinc-500 block mt-0.5">
                      {pricing.period}
                    </span>

                    {/* Subtle muted note */}
                    <p className="mt-2 text-xs text-zinc-600 font-light leading-snug">
                      {pricing.note}
                    </p>

                    {billingType === "ltd" && (
                      <p className="mt-1 text-[11px] font-semibold text-[#e85d45]">
                        {plan.ltd.spots}
                      </p>
                    )}
                  </div>

                  {/* Operational Limits (Clean key-value format without box clutter) */}
                  <div className="mb-6 space-y-2 text-xs text-zinc-700 py-3 border-y border-zinc-100">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500 font-light">Capacidad de Salón:</span>
                      <span className="font-semibold text-zinc-900">{plan.limits.tables}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500 font-light">Cuentas de Personal:</span>
                      <span className="font-semibold text-zinc-900">{plan.limits.users}</span>
                    </div>
                  </div>

                  {/* Feature Bullet List */}
                  <div className="space-y-3 mb-8 flex-1">
                    <p className="text-xs font-bold text-zinc-900 uppercase tracking-wider">
                      {billingType === "ltd" ? "Qué incluye de por vida:" : "Funcionalidades incluidas:"}
                    </p>
                    {plan.keyFeatures.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700">
                        <div className="w-4 h-4 rounded-full bg-zinc-100 text-zinc-800 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span className="font-light leading-snug">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Action Button (Links to Contact / WhatsApp) */}
                <div className="pt-2">
                  <a
                    href={waLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group w-full py-3.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 active:scale-[0.98] transition-all duration-150 ${plan.buttonStyle}`}
                  >
                    <span>{plan.buttonText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform duration-150" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Self-Serve Free Trial Alternative Banner */}
        <div className="max-w-2xl mx-auto mb-12 text-center p-4 sm:p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs">
          <p className="text-xs sm:text-sm text-zinc-600 font-light">
            ¿Preferís explorar el sistema antes de elegir un plan?{" "}
            <DemoTransitionLink
              href={SITE_CONFIG.urls.saasRegister}
              className="font-bold text-[#e85d45] hover:text-[#d44c34] underline decoration-[#e85d45]/40 hover:decoration-[#e85d45] transition-all inline-flex items-center gap-1 cursor-pointer"
            >
              <span>Creá tu cuenta demo gratis por 14 días</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </DemoTransitionLink>
          </p>
        </div>

        {/* Lifetime Deal Pitch */}
        {billingType === "ltd" && (
          <div className="max-w-4xl mx-auto mb-14 p-7 sm:p-8 rounded-3xl bg-white border border-zinc-200/90 shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-zinc-900 mb-2">
              ¿Por qué un pago único de por vida?
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed font-light mb-5">
              Los sistemas tradicionales te cobran entre $40.000 y $80.000 todos los meses y aumentan constantemente por inflación. Con Roosty pagás una sola vez: en ~7 meses ya recuperaste la inversión y te olvidás de costos fijos mensuales para siempre.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-medium text-zinc-700 pt-4 border-t border-zinc-100">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#e85d45] shrink-0" />
                <span>1 Licencia por local físico</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#e85d45] shrink-0" />
                <span>Todas las updates incluidas</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#e85d45] shrink-0" />
                <span>0% de comisiones por venta</span>
              </div>
            </div>
          </div>
        )}

        {/* Interactive Toggle for the Detailed Comparison Matrix */}
        <div className="max-w-4xl mx-auto text-center mb-8">
          <button
            type="button"
            onClick={() => setShowMatrix(!showMatrix)}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white border border-zinc-300 hover:border-zinc-400 text-zinc-800 font-semibold text-sm shadow-xs transition-all hover:bg-zinc-50 cursor-pointer"
          >
            <span>{showMatrix ? "Ocultar matriz comparativa completa" : "Ver matriz comparativa detallada (25 características)"}</span>
            {showMatrix ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {/* Detailed Comparison Matrix Table */}
        {showMatrix && (
          <div className="max-w-6xl mx-auto rounded-3xl border border-zinc-200/90 shadow-sm overflow-hidden bg-white mb-12 w-full">
            <div className="p-6 bg-zinc-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-xl font-bold text-white">
                  Matriz Comparativa de Planes
                </h3>
                <p className="text-xs text-zinc-400 font-light mt-0.5">
                  Revisá en detalle cada característica de los módulos de salón, comanda, cocina, caja y delivery.
                </p>
              </div>
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 border border-zinc-700">
                100% Cloud SaaS
              </span>
            </div>

            <div className="overflow-x-auto w-full">
              <table className="w-full min-w-[580px] text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-200 bg-[#faf9f8]">
                    <th className="py-4 px-6 text-xs sm:text-sm font-semibold text-zinc-900 w-2/5">
                      Característica / Módulo
                    </th>
                    <th className="py-4 px-4 text-center text-xs sm:text-sm font-bold text-zinc-800 w-1/5 border-l border-zinc-200/70">
                      Starter Takeaway
                    </th>
                    <th className="py-4 px-4 text-center text-xs sm:text-sm font-bold text-[#e85d45] bg-[#fff2ef]/60 w-1/5 border-x border-[#e85d45]/20">
                      Pro Salón
                    </th>
                    <th className="py-4 px-4 text-center text-xs sm:text-sm font-bold text-zinc-900 w-1/5 border-l border-zinc-200/70">
                      Business Enterprise
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-200/70 text-xs sm:text-sm">
                  {comparisonMatrix.map((section, sIdx) => (
                    <Fragment key={sIdx}>
                      <tr className="bg-zinc-100/70 border-t border-b border-zinc-200/80">
                        <td
                          colSpan={4}
                          className="py-2.5 px-6 font-bold text-xs uppercase tracking-wider text-zinc-700"
                        >
                          {section.category}
                        </td>
                      </tr>

                      {section.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-zinc-50/60 transition-colors">
                          <td className="py-3.5 px-6 font-medium text-zinc-900">
                            {row.feature}
                          </td>

                          <td className="py-3.5 px-4 text-center border-l border-zinc-200/60 text-zinc-600">
                            {row.type === "boolean" ? (
                              row.starter ? (
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-zinc-100 text-zinc-800 mx-auto">
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </span>
                              ) : (
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-zinc-100 text-zinc-400 mx-auto">
                                  <X className="w-3.5 h-3.5" />
                                </span>
                              )
                            ) : (
                              <span className="font-medium">{row.starter}</span>
                            )}
                          </td>

                          <td className="py-3.5 px-4 text-center bg-[#fff2ef]/20 border-x border-[#e85d45]/15 text-zinc-900 font-semibold">
                            {row.type === "boolean" ? (
                              row.pro ? (
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[#e85d45] text-white mx-auto shadow-xs">
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </span>
                              ) : (
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-zinc-100 text-zinc-400 mx-auto">
                                  <X className="w-3.5 h-3.5" />
                                </span>
                              )
                            ) : (
                              <span className="font-semibold text-[#e85d45]">{row.pro}</span>
                            )}
                          </td>

                          <td className="py-3.5 px-4 text-center border-l border-zinc-200/60 text-zinc-900">
                            {row.type === "boolean" ? (
                              row.enterprise ? (
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-zinc-100 text-zinc-800 mx-auto">
                                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                                </span>
                              ) : (
                                <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-zinc-100 text-zinc-400 mx-auto">
                                  <X className="w-3.5 h-3.5" />
                                </span>
                              )
                            ) : (
                              <span className="font-medium">{row.enterprise}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reassurance Footer */}
        <div className="text-center text-xs text-zinc-500 flex items-center justify-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#e85d45]" />
          <span>Precios en pesos argentinos (ARS). 0% de comisiones por pedidos en el Menú QR. 14 días de prueba gratis.</span>
        </div>

      </div>
    </section>
  );
}
