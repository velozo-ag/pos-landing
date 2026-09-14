import Image from 'next/image';

export default function DemoLoading() {
  return (
    <div className="min-h-screen w-full bg-[#faf9f8] flex flex-col items-center justify-center p-6 select-none">
      <div className="flex flex-col items-center max-w-sm w-full text-center">
        {/* Brand Logo */}
        <div className="relative h-9 w-40 mb-6">
          <Image
            src="/roosty2.png"
            alt="Roosty POS"
            fill
            priority
            className="object-contain"
          />
        </div>

        {/* Fluid Loading Bar */}
        <div className="w-48 h-1.5 bg-zinc-200 rounded-full overflow-hidden mb-4 relative">
          <div className="h-full bg-[#e85d45] rounded-full w-1/2 animate-[pulse_1s_ease-in-out_infinite]" />
        </div>

        <p className="text-xs font-medium text-zinc-500 font-mono tracking-wide">
          Preparando tu entorno de prueba...
        </p>
      </div>
    </div>
  );
}
