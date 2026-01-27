import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileHero } from "@/components/sections/mobile/hero";
import { MobileFeatures } from "@/components/sections/mobile/features";
import { MobileScreens } from "@/components/sections/mobile/screens";
import { MobileDownload } from "@/components/sections/mobile/download";
import { NotificationsPreview } from "@/components/sections/mobile/notifications-preview";
import { MobileDesktopComparison } from "@/components/sections/mobile/comparison";
import { VoiceDemo } from "@/components/sections/mobile/voice-demo";

export const metadata = {
  title: "Mobile App | Client Keeper",
  description: "Take Client Keeper anywhere with our powerful mobile app for iOS and Android. Manage contacts, follow-ups, and deals on the go.",
};

export default function MobileAppPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <MobileHero />
        <MobileFeatures />
        <NotificationsPreview />
        <MobileScreens />
        <VoiceDemo />
        <MobileDesktopComparison />
        <MobileDownload />
      </main>
      <Footer />
    </div>
  );
}
