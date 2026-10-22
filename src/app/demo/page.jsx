import DemoWizardScreen from '@/components/demo/DemoWizardScreen';

export const metadata = {
  title: 'Crear Demo Gratis en 2 Minutos',
  description:
    'Creá tu cuenta demo gratis de Roosty POS por 14 días sin tarjeta de crédito. Probá el mapa de mesas, el Menú QR con tu marca, el KDS de cocina y el arqueo de caja en vivo.',
  alternates: {
    canonical: 'https://pos.roosty.com.ar/demo',
  },
  openGraph: {
    title: 'Crear Demo Gratis | Roosty POS',
    description:
      'Comenzá a usar el sistema operativo para tu local gastronómico en 2 minutos sin instalación.',
    url: 'https://pos.roosty.com.ar/demo',
    images: [
      {
        url: '/og-roosty-pos.png',
        width: 1200,
        height: 630,
        type: 'image/png',
        alt: 'Roosty POS Crear Demo Gratis',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crear Demo Gratis | Roosty POS',
    description:
      'Comenzá a usar el sistema operativo para tu local gastronómico en 2 minutos sin instalación.',
    images: ['/og-roosty-pos.png'],
  },
};

export default function DemoPage() {
  return (
    <main className="h-screen max-h-screen w-full overflow-hidden bg-[#faf9f8]">
      <DemoWizardScreen />
    </main>
  );
}
