import DemoWizardScreen from '@/components/demo/DemoWizardScreen';

export const metadata = {
  title: 'Crear Demo | Roosty POS',
  description: 'Comenzá a usar el sistema operativo para tu local gastronómico sin instalación.',
  openGraph: {
    title: 'Crear Demo | Roosty POS',
    description: 'Comenzá a usar el sistema operativo para tu local gastronómico sin instalación.',
    url: 'https://roosty.site/demo',
    images: [
      {
        url: '/roosty2.png',
        width: 1200,
        height: 630,
        alt: 'Roosty POS Crear Demo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Crear Demo | Roosty POS',
    description: 'Comenzá a usar el sistema operativo para tu local gastronómico sin instalación.',
    images: ['/roosty2.png'],
  },
};

export default function DemoPage() {
  return (
    <main className="h-screen max-h-screen w-full overflow-hidden bg-[#faf9f8]">
      <DemoWizardScreen />
    </main>
  );
}
