import type { Metadata } from "next";
import { Outfit, DM_Sans, Plus_Jakarta_Sans, Playfair_Display, Inter, Poppins, Nunito, Manrope } from "next/font/google";
import { RootProvider } from "fumadocs-ui/provider/next";
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

export const metadata: Metadata = {
  title: "All Things Agents | Real Estate Software Suite",
  description: "A suite of simple, powerful tools for real estate agents. CRM, social media scheduling, and beautiful websites - all designed to make real estate fun again.",
  keywords: [
    "real estate software",
    "real estate CRM",
    "real estate social media",
    "real estate websites",
    "real estate tools",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${dmSans.variable} ${plusJakarta.variable} ${playfair.variable} ${inter.variable} ${poppins.variable} ${nunito.variable} ${manrope.variable} font-sans antialiased`}
      >
        <RootProvider theme={{ defaultTheme: "light", forcedTheme: "light" }}>
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
