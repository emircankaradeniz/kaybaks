import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Yönetim Paneli",
  description: "KAYBAKS site yönetim paneli.",
  alternates: { canonical: "/admin" },
  robots: { index: false, follow: false, noarchive: true },
};

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
