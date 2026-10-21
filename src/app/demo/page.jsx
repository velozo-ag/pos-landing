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
        url: '/roostylogo.png',
        width: 300,
        height: 186,
        alt: 'Roosty POS Crear Demo',
      },
    ],
  },
  twitter: {
    card: 'summary',
    title: 'Crear Demo Gratis | Roosty POS',
    description:
      'Comenzá a usar el sistema operativo para tu local gastronómico en 2 minutos sin instalación.',
    images: ['/roostylogo.png'],
  },
};

export default function DemoPage() {
  return (
    <main className="h-screen max-h-screen w-full overflow-hidden bg-[#faf9f8]">
      <DemoWizardScreen />
    </main>
  );
}
