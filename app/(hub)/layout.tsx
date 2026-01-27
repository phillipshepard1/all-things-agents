import { HubHeader } from '@/components/hub/hub-header';
import { HubFooter } from '@/components/hub/hub-footer';

export default function HubLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <HubHeader />
      <main className="flex-1">{children}</main>
      <HubFooter />
    </div>
  );
}
