import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "KAYBAKS | Oluklu Mukavva ve Ambalaj",
    template: "%s | KAYBAKS",
  },
  description:
    "Kayseri merkezli oluklu mukavva, kutu ve özel tasarım ambalaj çözümleri.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>{children}</body>
    </html>
  );
}
