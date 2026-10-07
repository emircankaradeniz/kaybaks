import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { RouteScrollReset } from "@/components/layout/route-scroll-reset";
import { JsonLd } from "@/components/seo/json-ld";
import { company } from "@/data/company";
import { absoluteUrl, siteUrl } from "@/lib/metadata";
import "./globals.css";
import "./kaybaks-real.css";

const manrope = Manrope({ subsets: ["latin-ext"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: company.shortName,
  title: { default: "Kayseri Oluklu Mukavva ve Kutu Üreticisi | KAYBAKS", template: "%s | KAYBAKS" },
  description: "Kayseri'de oluklu mukavva levha, karton kutu, kalıp kesim kutu ve özel ölçü ambalaj üretimi. KAYBAKS'tan ihtiyacınıza uygun teklif alın.",
  keywords: ["oluklu mukavva", "karton kutu", "kutu üreticisi", "ambalaj üreticisi", "Kayseri kutu", "Kayseri oluklu mukavva", "özel ölçü kutu", "kalıp kesim kutu"],
  authors: [{ name: company.shortName, url: siteUrl }],
  creator: company.shortName,
  publisher: company.legalName,
  category: "Ambalaj Üretimi",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "tr_TR",
    url: siteUrl,
    siteName: company.shortName,
    title: "Kayseri Oluklu Mukavva ve Kutu Üreticisi | KAYBAKS",
    description: "Oluklu mukavva levha, karton kutu ve özel ölçü ambalaj çözümleri için Kayseri'de üretim.",
  },
  twitter: { card: "summary_large_image" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 },
  },
  formatDetection: { email: false, address: false, telephone: false },
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

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `${siteUrl}/#organization`,
  name: company.shortName,
  alternateName: "KAYBAKS Oluklu Mukavva & Kutu",
  legalName: company.legalName,
  url: siteUrl,
  logo: absoluteUrl("/brand/kaybaks-logo-clean-hd.png"),
  image: absoluteUrl("/media/enhanced/kaybaks-factory-hd.jpg"),
  description: company.description,
  foundingDate: "1999",
  telephone: company.phone,
  email: company.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.addressLine,
    addressLocality: company.locality,
    addressRegion: company.region,
    postalCode: company.postalCode,
    addressCountry: company.country,
  },
  areaServed: { "@type": "Country", name: "Türkiye" },
  sameAs: [company.youtube],
  knowsAbout: ["Oluklu mukavva", "Karton kutu", "Kalıp kesim kutu", "Özel ölçü kutu", "Ambalaj üretimi"],
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:30", closes: "18:00" },
    { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "08:30", closes: "13:00" },
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  url: siteUrl,
  name: company.shortName,
  alternateName: "KAYBAKS Oluklu Mukavva",
  inLanguage: "tr-TR",
  publisher: { "@id": `${siteUrl}/#organization` },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="tr" className={manrope.variable} data-scroll-behavior="smooth"><body><JsonLd data={organizationSchema} /><JsonLd data={websiteSchema} /><RouteScrollReset /><SiteHeader /><main className="site-main">{children}</main><SiteFooter /></body></html>;
}
