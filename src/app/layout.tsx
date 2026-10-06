import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";
import "./kaybaks-v2.css";

const manrope = Manrope({ subsets: ["latin-ext"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://kaybaks.com.tr"),
  title: { default: "KAYBAKS | Oluklu Mukavva ve Ambalaj", template: "%s | KAYBAKS" },
  description: "Kayseri merkezli oluklu mukavva, kutu ve özel tasarım ambalaj çözümleri.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/favicon-16.png", type: "image/png", sizes: "16x16" },
    ],
    apple: [{ url: "/apple-touch-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr" className={manrope.variable}><body><SiteHeader /><main className="site-main">{children}</main><SiteFooter /></body></html>;
}
