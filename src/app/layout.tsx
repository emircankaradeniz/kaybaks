import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin-ext"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  title: { default: "KAYBAKS | Oluklu Mukavva ve Ambalaj", template: "%s | KAYBAKS" },
  description: "Kayseri merkezli oluklu mukavva, kutu ve özel tasarım ambalaj çözümleri.",
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr" className={manrope.variable}><body><SiteHeader /><main className="site-main">{children}</main><SiteFooter /></body></html>;
}
