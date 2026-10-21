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
  const [billingType, setBillingType] = useState("annual"); // "annual" | "monthly" | "ltd"
  const [showMatrix, setShowMatrix] = useState(false);

  const plans = [
    {
      code: "STARTER_TAKEAWAY",
      name: "Starter Takeaway",
      badge: "1 Puesto en Mostrador",
      headline: "Tu puesto de mostrador y carta digital listos para vender en el día, sin comisiones.",
      target: "Cafeterías al paso, food trucks, heladerías, panaderías y locales de retiro en mostrador.",
      monthly: {
        price: "$30.000",
        period: "/mes",
        note: "Abono mensual fijo sin contratos de permanencia.",
      },
      annual: {
        price: "$25.000",
        oldPrice: "$30.000",
        period: "/mes • abono anual de $300.000",
        note: "Contratás por un año, te regalamos 2 meses y congelás tarifa.",
      },
      ltd: {
        price: "$420.000",
        period: "pago único de por vida",
        note: "Un solo pago para tu local. No pagás nunca más una cuota mensual.",
        spots: "Edición limitada a 5 licencias disponibles",
      },
      popular: false,
      buttonText:
        billingType === "ltd"
          ? "Consultar Cupo Founder"
          : billingType === "annual"
          ? "Elegir Plan Anual"
          : "Probar 14 días gratis",
      buttonStyle: "bg-zinc-900 hover:bg-zinc-800 text-white shadow-xs",
      whatsappMessage:
        billingType === "ltd"
          ? "Hola! Quiero consultar disponibilidad para la Licencia Founder de por vida del plan Starter Takeaway."
          : billingType === "annual"
          ? "Hola! Quiero contratar el Abono Anual con 2 meses de regalo del plan Starter Takeaway de Roosty POS."
          : "Hola! Quiero probar 14 días gratis del plan Starter Takeaway de Roosty POS.",
      limits: {
        tables: "1 terminal de mostrador",
        users: "Hasta 3 usuarios",
      },
      keyFeatures: [
        "1 puesto de caja para venta directa en mostrador",
        "Catálogo veloz con adicionales, variantes y notas de pedido",
        "Cobro express en efectivo, QR, transferencia y tarjetas",
        "Carta digital QR con diseño de marca y subdominio propio",
        "Pedidos online directos a tu WhatsApp con 0% de comisión",
        "Apertura y cierre de turno con resumen diario de caja",
        "Impresión de tickets térmicos de mostrador y actualizaciones incluidas",
      ],
    },
    {
      code: "PRO_SALON",
      name: "Pro Salón",
      badge: "El Plan Más Elegido",
      headline: "Operación gastronómica completa: salón, cocina KDS, múltiples dispositivos y auditoría de caja.",
      target: "Restaurantes, bares, cervecerías, pizzerías, cafeterías con mesas y dark kitchens de alto flujo.",
      monthly: {
        price: "$55.000",
        period: "/mes",
        note: "El estándar completo para locales con salón, cocina y delivery activo.",
      },
      annual: {
        price: "$45.800",
        oldPrice: "$55.000",
        period: "/mes • abono anual de $550.000",
        note: "Contratás por un año, te regalamos 2 meses y congelás tarifa.",
      },
      ltd: {
        price: "$750.000",
        period: "pago único de por vida",
        note: "Un solo pago para tu local. Amortizás el sistema para siempre.",
        spots: "Edición limitada a 5 licencias disponibles",
      },
      popular: true,
      buttonText:
        billingType === "ltd"
          ? "Consultar Cupo Pro Founder"
          : billingType === "annual"
          ? "Elegir Pro Anual"
          : "Probar 14 días gratis",
      buttonStyle: "bg-[#e85d45] hover:bg-[#d44c34] text-white shadow-md shadow-[#e85d45]/25",
      whatsappMessage:
        billingType === "ltd"
          ? "Hola! Quiero consultar disponibilidad para la Licencia Founder de por vida del plan Pro Salón."
          : billingType === "annual"
          ? "Hola! Quiero contratar el Abono Anual con 2 meses de regalo del plan Pro Salón de Roosty POS."
          : "Hola! Quiero probar 14 días gratis del plan Pro Salón de Roosty POS.",
      limits: {
        tables: "Hasta 30 mesas y multi-terminal",
        users: "Hasta 15 mozos y cajeros",
      },
      keyFeatures: [
        "Todo lo de Starter más uso simultáneo en PC de caja, tablets y celulares",
        "Pantalla KDS interactiva en cocina con semáforo de demoras en vivo",
        "Separación automática de comandas por sector entre Cocina y Barra",
        "Mapa interactivo de hasta 30 mesas con sectores y cronómetro de espera",
        "Marcha de platos por tandas y barra rápida de cuentas abiertas en paralelo",
        "División de cuenta por comensal o por ítem con cobros mixtos",
        "Arqueo de caja ciego antifraude para detectar faltantes al cerrar turno",
        "Libro diario de gastos, pago a proveedores y retiro de efectivo",
        "Fila de delivery en vivo con ticket para cadete, vuelto exacto y rastreo web",
        "Reportes de ventas exportables a Excel y soporte prioritario en horario pico",
      ],
    },
    {
      code: "BUSINESS_ENTERPRISE",
      name: "Business Enterprise",
      badge: "Capacidad Masiva",
      headline: "Escala ilimitada, estaciones sin tope y soporte VIP 24/7 para operaciones de alto volumen.",
      target: "Grandes salones, cervecerías multiespacio, patios gastronómicos, cadenas y franquicias.",
      monthly: {
        price: "$95.000",
        period: "/sucursal /mes",
        note: "Para operaciones masivas con múltiples cajas y comanderas.",
      },
      annual: {
        price: "$79.100",
        oldPrice: "$95.000",
        period: "/sucursal /mes • abono anual de $950.000",
        note: "Contratás por un año con 2 meses de regalo y soporte VIP 24/7.",
      },
      ltd: {
        price: "$1.290.000",
        period: "pago único de por vida",
        note: "Capacidad ilimitada con un único pago y cero cuotas mensuales.",
        spots: "Edición limitada a 2 licencias disponibles",
      },
      popular: false,
      buttonText:
        billingType === "ltd"
          ? "Hablar con un Asesor VIP"
          : billingType === "annual"
          ? "Solicitar Plan Anual Enterprise"
          : "Hablar con un asesor",
      buttonStyle: "bg-white hover:bg-zinc-50 text-zinc-900 border border-zinc-300 shadow-xs",
      whatsappMessage:
        billingType === "ltd"
          ? "Hola! Quiero asesoramiento para la Licencia Founder Enterprise de Roosty POS."
          : billingType === "annual"
          ? "Hola! Quiero contratar el Abono Anual con 2 meses de regalo del plan Business Enterprise de Roosty POS."
          : "Hola! Quiero solicitar una demo y asesoramiento para el plan Business Enterprise de Roosty POS.",
      limits: {
        tables: "Mesas y terminales ilimitadas",
        users: "Personal y mozos ilimitados",
      },
      keyFeatures: [
        "Todo lo incluido en el plan Pro Salón sin límites de capacidad",
        "Mesas, salones, terrazas y barras de despacho ilimitadas",
        "Terminales de caja y dispositivos de mozos simultáneos sin límite",
        "Múltiples pantallas KDS en vivo para Cocina y Barra",
        "Cuentas de personal ilimitadas con Roles y Permisos",
        "Auditoría histórica de turnos, anulaciones y trazabilidad completa",
        "Puesta en marcha VIP con migración de carta completa en menos de 30 minutos",
        "Soporte técnico dedicado 24/7 con prioridad máxima en fines de semana",
        "Acuerdo de nivel de servicio con garantía de disponibilidad continua",
      ],
    },
  ];

  const comparisonMatrix = [
    {
      category: "Capacidad, Dispositivos y Salón",
      rows: [
        {
          feature: "Dispositivos Simultáneos en Vivo",
          starter: "1 terminal de mostrador",
          pro: "Multi-dispositivo simultáneo",
          enterprise: "Terminales ilimitadas",
          type: "text",
        },
        {
          feature: "Capacidad de Salón y Mesas",
          starter: "Solo Mostrador",
          pro: "Hasta 30 mesas y sectores",
          enterprise: "Mesas y sectores ilimitados",
          type: "text",
        },
        {
          feature: "Cuentas de Personal con Roles y Permisos",
          starter: "Hasta 3 usuarios",
          pro: "Hasta 15 mozos y cajeros",
          enterprise: "Usuarios ilimitados",
          type: "text",
        },
        {
          feature: "Venta Rápida de Mostrador",
          starter: true,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Mapa de Salón con Cronómetro de Espera en Vivo",
          starter: false,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Toma de Comandas desde Celular o Tablet del Mozo",
          starter: false,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Barra Rápida de Mesas Abiertas y Buscador por Teclado",
          starter: false,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
      ],
    },
    {
      category: "Cocina KDS y Comanderas",
      rows: [
        {
          feature: "Pantalla KDS Interactiva con Semáforo de Demoras",
          starter: false,
          pro: "Incluida",
          enterprise: "Múltiples pantallas KDS en vivo",
          type: "text",
        },
        {
          feature: "Derivación Automática entre Cocina y Barra",
          starter: false,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Marcha de Platos por Tandas sin Duplicar Comandas",
          starter: false,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Buscador Instantáneo con Adicionales y Notas por Plato",
          starter: true,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Impresión de Tickets Térmicos 80mm y 58mm",
          starter: "Ticket de mostrador",
          pro: "Caja y comanderas por sector",
          enterprise: "Impresoras ilimitadas",
          type: "text",
        },
      ],
    },
    {
      category: "Caja, Auditoría y Finanzas",
      rows: [
        {
          feature: "Apertura y Cierre de Turno con Fondo Inicial",
          starter: true,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Arqueo de Caja Ciego Antifraude al Cerrar Turno",
          starter: false,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Libro Diario de Gastos, Retiros y Pago a Proveedores",
          starter: false,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "División de Cuenta por Comensal y Cobros Mixtos",
          starter: false,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Reportes de Ventas y Exportación Contable a Excel",
          starter: false,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Auditoría Histórica de Anulaciones y Movimientos",
          starter: false,
          pro: "Historial de cierres",
          enterprise: "Trazabilidad completa",
          type: "text",
        },
      ],
    },
    {
      category: "Carta Digital y Logística de Delivery",
      rows: [
        {
          feature: "Carta Digital QR con Identidad y Subdominio Propio",
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
          feature: "Recepción Directa de Pedidos en WhatsApp",
          starter: true,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Fila de Delivery en Vivo Integrada al Monitor de Cocina",
          starter: false,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Ticket de Hoja de Ruta para Cadete con Cálculo de Vuelto",
          starter: false,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Rastreo de Estado del Pedido en Vivo para el Cliente",
          starter: false,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
      ],
    },
    {
      category: "Soporte y Puesta en Marcha",
      rows: [
        {
          feature: "Carga y Migración Inicial de tu Menú",
          starter: "Bonificada",
          pro: "Prioritaria Asistida",
          enterprise: "VIP en menos de 30 min",
          type: "text",
        },
        {
          feature: "Capacitación Operativa para tu Equipo",
          starter: true,
          pro: true,
          enterprise: true,
          type: "boolean",
        },
        {
          feature: "Nivel de Soporte Técnico",
          starter: "Estándar en horario comercial",
          pro: "Prioritario en horario pico",
          enterprise: "Dedicado 24/7 todo el año",
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

        {/* Switcher Toggle */}
        <div className="flex flex-col items-center justify-center mb-14 space-y-3">
          <div className="p-1.5 rounded-2xl bg-zinc-200/80 border border-zinc-300/80 flex flex-wrap items-center justify-center gap-1">
            <button
              type="button"
              onClick={() => setBillingType("annual")}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                billingType === "annual"
                  ? "bg-[#e85d45] text-white shadow-md shadow-[#e85d45]/25"
                  : "text-zinc-700 hover:text-zinc-950"
              }`}
            >
              <span>Abono Anual</span>
              <span
                className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-md font-extrabold ${
                  billingType === "annual"
                    ? "bg-white/20 text-white"
                    : "bg-[#e85d45]/15 text-[#e85d45]"
                }`}
              >
                2 Meses de Regalo
              </span>
            </button>

            <button
              type="button"
              onClick={() => setBillingType("monthly")}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                billingType === "monthly"
                  ? "bg-zinc-900 text-white shadow-md shadow-zinc-950/20"
                  : "text-zinc-700 hover:text-zinc-950"
              }`}
            >
              <span>Abono Mensual</span>
            </button>

            <button
              type="button"
              onClick={() => setBillingType("ltd")}
              className={`px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                billingType === "ltd"
                  ? "bg-zinc-900 text-white shadow-md shadow-zinc-950/20"
                  : "text-zinc-700 hover:text-zinc-950"
              }`}
            >
              <span>Pago Único</span>
              <span
                className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded-md font-extrabold ${
                  billingType === "ltd"
                    ? "bg-[#e85d45] text-white"
                    : "bg-zinc-300 text-zinc-800"
                }`}
              >
                Founder
              </span>
            </button>
          </div>

          <p className="text-xs text-zinc-500 font-light text-center max-w-xl">
            {billingType === "annual" &&
              "Contratás por un año, te regalamos 2 meses y congelás tu tarifa frente a la inflación."}
            {billingType === "monthly" &&
              "Suscripción mensual en pesos argentinos sin contratos de permanencia. Cancelás cuando quieras."}
            {billingType === "ltd" &&
              "Edición Founder con cupos limitados: abonás una única vez para tu local físico y no volvés a pagar cuotas."}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto mb-16">
          {plans.map((plan) => {
            const pricing =
              billingType === "ltd"
                ? plan.ltd
                : billingType === "annual"
                ? plan.annual
                : plan.monthly;
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

                  {/* Header Titles */}
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
                    {billingType === "annual" && pricing.oldPrice && (
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-zinc-400 line-through font-mono">
                          {pricing.oldPrice}/mes
                        </span>
                        <span className="text-[11px] font-semibold text-[#e85d45]">
                          2 meses de regalo
                        </span>
                      </div>
                    )}

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
                      <p className="mt-1.5 text-[11px] font-semibold text-[#e85d45]">
                        {plan.ltd.spots}
                      </p>
                    )}
                  </div>

                  {/* Operational Limits */}
                  <div className="mb-6 space-y-2 text-xs text-zinc-700 py-3 border-y border-zinc-100">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-500 font-light">Capacidad Operativa:</span>
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

                {/* Card Action Button */}
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

        {/* Strategic Pitch Box */}
        {billingType === "annual" && (
          <div className="max-w-4xl mx-auto mb-14 p-7 sm:p-8 rounded-3xl bg-white border border-zinc-200/90 shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-zinc-900 mb-2">
              Contratás por un año y te regalamos 2 meses
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed font-light mb-5">
              Los softwares tradicionales ajustan su cuota todos los meses. Con el Abono Anual de Roosty congelás el valor en pesos por todo el año, recibís 2 meses bonificados y operás los 365 días sin sorpresas en tu estructura de costos.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-medium text-zinc-700 pt-4 border-t border-zinc-100">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#e85d45] shrink-0" />
                <span>2 meses de regalo incluidos</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#e85d45] shrink-0" />
                <span>Precio congelado por 12 meses</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#e85d45] shrink-0" />
                <span>Soporte y migración prioritaria</span>
              </div>
            </div>
          </div>
        )}

        {billingType === "ltd" && (
          <div className="max-w-4xl mx-auto mb-14 p-7 sm:p-8 rounded-3xl bg-white border border-zinc-200/90 shadow-sm">
            <h3 className="font-serif text-2xl font-bold text-zinc-900 mb-2">
              Licencia Founder de por vida
            </h3>
            <p className="text-sm text-zinc-600 leading-relaxed font-light mb-5">
              Para un grupo reducido de locales fundadores habilitamos la adquisición perpetua del software mediante un pago único. Una vez completados los 5 cupos de esta etapa, el sistema se comercializará exclusivamente bajo modalidad de suscripción mensual o anual.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-medium text-zinc-700 pt-4 border-t border-zinc-100">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#e85d45] shrink-0" />
                <span>1 Licencia perpetua por local físico</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#e85d45] shrink-0" />
                <span>Todas las actualizaciones incluidas</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#e85d45] shrink-0" />
                <span>Edición limitada a 5 cupos por plan</span>
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
            <span>{showMatrix ? "Ocultar matriz comparativa completa" : "Ver matriz comparativa detallada de 25 características"}</span>
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
          <span>Precios expresados en pesos argentinos. 0% de comisiones por pedidos en el Menú QR. 14 días de prueba gratis.</span>
        </div>

      </div>
    </section>
  );
}
