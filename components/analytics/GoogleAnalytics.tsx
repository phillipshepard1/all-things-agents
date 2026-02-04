"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";

const GA_MEASUREMENT_ID = "G-3DBF0QT5HC";

export function GoogleAnalytics() {
  const pathname = usePathname();

  // Don't track admin or login pages
  if (pathname?.startsWith("/admin") || pathname?.startsWith("/login")) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}
