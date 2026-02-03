import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { WebAppHero } from "@/components/sections/web-app/hero";
import { WebAppFeatures } from "@/components/sections/web-app/features";
import { DashboardPreview } from "@/components/sections/web-app/dashboard-preview";
import { WebAppScreens } from "@/components/sections/web-app/screens";
import { WebMobileComparison } from "@/components/sections/web-app/comparison";
import { WebAppCTA } from "@/components/sections/web-app/cta";
import { StickyBottomCTA } from "@/components/shared/sticky-bottom-cta";

export const metadata = {
  title: "Web App | Client Keeper",
  description: "Access Client Keeper from any browser. Full-featured CRM for real estate agents with dashboard, contact management, pipeline tracking, and AI assistant.",
};

export default function WebAppPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <WebAppHero />
        <WebAppFeatures />
        <DashboardPreview />
        <WebAppScreens />
        <WebMobileComparison />
        <WebAppCTA />
      </main>
      <StickyBottomCTA />
      <Footer />
    </div>
  );
}
