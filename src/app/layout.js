import { Merriweather, Inter } from "next/font/google";
import "./globals.css";
import { TransitionProvider } from "@/context/TransitionContext";

const merriweather = Merriweather({
  variable: "--font-merriweather",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  metadataBase: new URL("https://pos.roosty.com.ar"),
  applicationName: "Roosty POS",
  title: {
    template: "%s | Roosty POS",
    default: "Roosty POS — Sistema de Punto de Venta Gastronómico y Menú QR",
  },
  description:
    "Roosty POS es el software gastronómico y sistema de punto de venta 100% web líder en Argentina. Acelerá tus ventas con Menú QR, pedidos a WhatsApp con 0% comisiones, KDS de cocina y arqueo ciego de caja para restaurantes, bares y cafeterías.",
  keywords: [
    "Roosty POS",
    "Roosty",
    "POS gastronómico",
    "sistema para restaurantes",
    "software de gestión gastronómica",
    "menú QR",
    "carta digital QR",
    "pedidos online por WhatsApp",
    "punto de venta restaurantes Argentina",
    "software para bares y cervecerías",
    "KDS cocina",
    "comanda digital",
    "arqueo de caja",
    "delivery y takeaway sin comisiones",
  ],
  authors: [{ name: "Roosty POS", url: "https://pos.roosty.com.ar" }],
  creator: "Roosty POS",
  publisher: "Roosty POS",
  alternates: {
    canonical: "https://pos.roosty.com.ar",
  },
  icons: {
    icon: [
      { url: "/roostyicon.png", type: "image/png", sizes: "64x64" },
      { url: "/roostylogo.png", type: "image/png", sizes: "300x186" },
    ],
    shortcut: ["/roostyicon.png"],
    apple: [
      { url: "/roostyicon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: "Roosty POS — Sistema Gastronómico y Menú QR",
    description:
      "Atendé más rápido, cobrá al instante y controlá tu caja. Software gastronómico 100% web con Menú QR, pedidos a WhatsApp sin comisiones y KDS en vivo.",
    url: "https://pos.roosty.com.ar",
    siteName: "Roosty POS",
    images: [
      {
        url: "/roostylogoname.png",
        width: 595,
        height: 215,
        alt: "Roosty POS — Logo Oficial",
      },
      {
        url: "/roostylogo.png",
        width: 300,
        height: 186,
        alt: "Roosty POS — Isotipo Oficial",
      },
    ],
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roosty POS — Sistema Gastronómico y Menú QR",
    description:
      "Sistema gastronómico 100% web con Menú QR, pedidos a WhatsApp sin comisiones, KDS para cocina y arqueo ciego de caja.",
    images: ["/roostylogoname.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://pos.roosty.com.ar/#website",
        "name": "Roosty POS",
        "alternateName": [
          "Roosty",
          "Roosty Sistema Gastronómico",
          "Roosty Punto de Venta",
        ],
        "url": "https://pos.roosty.com.ar",
        "inLanguage": "es-AR",
        "publisher": {
          "@id": "https://pos.roosty.com.ar/#organization",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://pos.roosty.com.ar/#organization",
        "name": "Roosty POS",
        "legalName": "Roosty POS",
        "alternateName": "Roosty",
        "url": "https://pos.roosty.com.ar",
        "logo": {
          "@type": "ImageObject",
          "@id": "https://pos.roosty.com.ar/#logo",
          "url": "https://pos.roosty.com.ar/roostylogo.png",
          "contentUrl": "https://pos.roosty.com.ar/roostylogo.png",
          "width": 300,
          "height": 186,
          "caption": "Roosty POS",
        },
        "image": "https://pos.roosty.com.ar/roostylogo.png",
        "description":
          "Desarrolladores de Roosty POS, el sistema de punto de venta (POS) y software de gestión gastronómica 100% web en la nube para restaurantes, bares, cervecerías y cafeterías en Argentina.",
        "contactPoint": [
          {
            "@type": "ContactPoint",
            "telephone": "+54-9-3482-626653",
            "contactType": "sales",
            "areaServed": "AR",
            "availableLanguage": ["Spanish"],
          },
        ],
      },
      {
        "@type": "SoftwareApplication",
        "@id": "https://pos.roosty.com.ar/#software",
        "name": "Roosty POS",
        "applicationCategory": "BusinessApplication",
        "applicationSubCategory":
          "Restaurant Point of Sale (POS) & Management Software",
        "operatingSystem": "Web, Cloud SaaS, Windows, macOS, Android, iOS",
        "description":
          "Sistema de Punto de Venta (POS) Gastronómico 100% web con mapa de mesas en vivo, Menú Digital QR con subdominio propio y 0% comisiones por pedido a WhatsApp, pantalla KDS para cocina, impresión térmica universal (80mm y 58mm) y arqueo ciego de caja.",
        "url": "https://pos.roosty.com.ar",
        "image": "https://pos.roosty.com.ar/roostylogo.png",
        "screenshot": "https://pos.roosty.com.ar/examples/banner_composed.jpg",
        "publisher": {
          "@id": "https://pos.roosty.com.ar/#organization",
        },
        "featureList": [
          "Mapa de salón y sectores dinámicos con cronómetro de ocupación en vivo",
          "Terminal de comandas rápida con atajos de teclado (M, T, F8, F9)",
          "Menú Digital QR con subdominio propio y pedidos a WhatsApp con 0% de comisiones",
          "Pantalla KDS interactiva para cocina y barra con semáforo de demoras",
          "Impresión de tickets térmicos universales de 80mm y 58mm sin servidores locales",
          "Arqueo ciego de caja, fondo inicial obligatorio, libro diario y exportación a Excel",
        ],
        "offers": {
          "@type": "AggregateOffer",
          "priceCurrency": "ARS",
          "lowPrice": "25000",
          "highPrice": "1290000",
          "offerCount": "3",
          "offers": [
            {
              "@type": "Offer",
              "name": "Plan Starter Takeaway Anual",
              "price": "25000",
              "priceCurrency": "ARS",
              "description":
                "Ideal para mostrador, cafeterías al paso y delivery. $25.000/mes contratando el año con 2 meses de regalo o $30.000/mes mensual.",
              "url": "https://pos.roosty.com.ar/precios",
            },
            {
              "@type": "Offer",
              "name": "Plan Pro Salón Anual",
              "price": "45800",
              "priceCurrency": "ARS",
              "description":
                "Control total de salón hasta 30 mesas, KDS y comandas. $45.800/mes contratando el año con 2 meses de regalo o $55.000/mes mensual.",
              "url": "https://pos.roosty.com.ar/precios",
            },
            {
              "@type": "Offer",
              "name": "Plan Business Enterprise Anual",
              "price": "79100",
              "priceCurrency": "ARS",
              "description":
                "Mesas y usuarios ilimitados con soporte VIP 24/7. $79.100/mes contratando el año con 2 meses de regalo o $95.000/mes mensual.",
              "url": "https://pos.roosty.com.ar/precios",
            },
          ],
        },
      },
    ],
  };

  return (
    <html
      lang="es"
      className={`${inter.variable} ${merriweather.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className="min-h-screen flex flex-col font-sans bg-white text-zinc-900 antialiased selection:bg-[#e85d45]/20 selection:text-[#e85d45] relative"
        suppressHydrationWarning
      >
        <TransitionProvider>
          {children}
        </TransitionProvider>
      </body>
    </html>
  );
}
