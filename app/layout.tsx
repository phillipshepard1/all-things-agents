import type { Metadata } from "next";
import { Outfit, DM_Sans, Plus_Jakarta_Sans, Playfair_Display, Inter, Poppins, Nunito, Manrope, Cormorant_Garamond, Quicksand, Raleway, Rubik, Montserrat, Lexend, Urbanist, Dancing_Script, Caveat } from "next/font/google";
import Script from "next/script";
import { RootProvider } from "fumadocs-ui/provider/next";
import { GoogleAnalytics } from "@/components/analytics/GoogleAnalytics";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

// Keep existing fonts for Client Keeper compatibility
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const nunito = Nunito({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

const rubik = Rubik({
  variable: "--font-rubik",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  display: "swap",
});

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
  display: "swap",
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  display: "swap",
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.allthingsagents.com"
  ),
  title: "All Things Agents | Real Estate Software Suite",
  description: "A suite of simple, powerful tools for real estate agents. CRM, social media scheduling, and beautiful websites - all designed to make real estate fun again.",
  keywords: [
    "real estate software",
    "real estate CRM",
    "real estate social media",
    "real estate websites",
    "real estate tools",
  ],
  openGraph: {
    title: "All Things Agents | Real Estate Software Suite",
    description:
      "A suite of simple, powerful tools for real estate agents. CRM, social media scheduling, and beautiful websites - all designed to make real estate fun again.",
    url: "https://www.allthingsagents.com",
    siteName: "All Things Agents",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "All Things Agents - Real Estate Software Suite",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "All Things Agents | Real Estate Software Suite",
    description:
      "A suite of simple, powerful tools for real estate agents. CRM, social media scheduling, and beautiful websites.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '233734877779655');
              fbq('track', 'PageView');
            `,
          }}
        />
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=233734877779655&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body
        className={`${outfit.variable} ${dmSans.variable} ${plusJakarta.variable} ${playfair.variable} ${inter.variable} ${poppins.variable} ${nunito.variable} ${manrope.variable} ${cormorantGaramond.variable} ${quicksand.variable} ${raleway.variable} ${rubik.variable} ${montserrat.variable} ${lexend.variable} ${urbanist.variable} ${dancingScript.variable} ${caveat.variable} font-sans antialiased`}
      >
        <GoogleAnalytics />
        <RootProvider theme={{ defaultTheme: "light" }}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
