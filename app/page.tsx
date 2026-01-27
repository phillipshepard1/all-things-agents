import { HubHeader } from '@/components/hub/hub-header';
import { HubFooter } from '@/components/hub/hub-footer';
import { HeroSection } from '@/components/hub/hero-section';
import { PhilosophySection } from '@/components/hub/philosophy-section';
import { ProductShowcase } from '@/components/hub/product-showcase';

export default function HubHomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <HubHeader />
      <main className="flex-1">
        <HeroSection />
        <PhilosophySection />
        <ProductShowcase />
      </main>
      <HubFooter />
    </div>
  );
}
