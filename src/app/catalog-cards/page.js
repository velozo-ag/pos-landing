import CatalogCardsStudio from "@/components/sections/CatalogCardsStudio";

export const metadata = {
  title: "WhatsApp Catalog Studio (1080x1080)",
  description: "Generador interno de placas para el catálogo de WhatsApp Business de Roosty POS.",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function CatalogCardsPage() {
  return <CatalogCardsStudio />;
}
