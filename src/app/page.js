import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import MetricsBar from "@/components/sections/MetricsBar";
import SpeedSection from "@/components/sections/SpeedSection";
import MobileMenuSection from "@/components/sections/MobileMenuSection";
import FinanceSection from "@/components/sections/FinanceSection";
import PricingSection from "@/components/sections/PricingSection";
import FooterCTA from "@/components/layout/FooterCTA";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-[#e85d45]/20 selection:text-[#e85d45] overflow-x-hidden w-full max-w-full">
      <Navbar />

      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        <HeroSection />
        <MetricsBar />
        <SpeedSection />
        <MobileMenuSection />
        <FinanceSection />
        <PricingSection />
      </main>

      <FooterCTA />
    </div>
  );
}
