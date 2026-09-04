import { Merriweather, Inter } from "next/font/google";
import "./globals.css";

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
  metadataBase: new URL("https://roosty.site"),
  title: {
    template: "%s | Roosty POS",
    default: "Roosty POS — Sistema de Punto de Venta Gastronómico y Menú QR",
  },
  description:
    "Roosty POS es el software gastronómico y sistema de punto de venta líder. Acelerá tus ventas con Menú QR, pedidos online sin comisiones, KDS para cocina y arqueo de caja. Ideal para restaurantes, bares y cafeterías.",
  keywords: [
    "POS gastronómico",
    "sistema para restaurantes",
    "software de gestión gastronómica",
    "menú QR",
    "carta digital QR",
    "pedidos online",
    "punto de venta restaurantes",
    "software para bares",
    "KDS cocina",
    "comanda digital",
    "cierre de caja",
    "delivery y takeaway sin comisiones",
  ],
  authors: [{ name: "Roosty POS" }],
  creator: "Roosty POS",
  openGraph: {
    title: "Roosty POS — Sistema Gastronómico y Menú QR",
    description:
      "Vender rápido. Cerrar caja tranquilo. Software gastronómico diseñado para operar a máxima velocidad en horas pico con Menú QR y Pedidos Online.",
    url: "https://roosty.site",
    siteName: "Roosty POS",
    images: [
      {
        url: "/R ROOSTY.png",
        width: 1200,
        height: 630,
        alt: "Roosty POS",
      },
    ],
    type: "website",
    locale: "es_AR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Roosty POS — Sistema Gastronómico y Menú QR",
    description:
      "Sistema gastronómico con Menú QR, pedidos online y KDS para cocina. Vender rápido, cerrar caja tranquilo.",
    images: ["/R ROOSTY.png"],
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
        "@type": "SoftwareApplication",
        "name": "Roosty POS",
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "WebBrowser",
        "description":
          "Sistema de Punto de Venta (POS) Gastronómico con Menú QR, pedidos online, KDS y control de caja.",
        "url": "https://roosty.site",
      },
      {
        "@type": "Organization",
        "name": "Roosty POS",
        "url": "https://roosty.site",
        "logo": "https://roosty.site/roosty2.png",
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
        {children}
      </body>
    </html>
  );
}
