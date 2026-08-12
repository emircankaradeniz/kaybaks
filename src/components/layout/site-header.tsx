"use client";

import Link from "next/link";
import { ArrowRight, FileText, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/kurumsal", label: "Kurumsal" },
  { href: "/urunler", label: "Ürünler" },
  { href: "/sektorel-cozumler", label: "Sektörler" },
  { href: "/uretim-kalite", label: "Üretim & Kalite" },
  { href: "/iletisim", label: "İletişim" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="KAYBAKS Ana Sayfa">
          <span className="brand-main">KAY<span>BAKS</span></span>
          <small>OLUKLU MUKAVVA & KUTU</small>
        </Link>
        <nav className="desktop-nav" aria-label="Ana menü">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return <Link key={link.href} href={link.href} className={active ? "active" : ""}>{link.label}</Link>;
          })}
        </nav>
        <Link href="/iletisim#teklif" className="btn btn-primary header-quote"><FileText size={15} /> Teklif Al <ArrowRight size={15} /></Link>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Menüyü aç" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && <nav className="mobile-nav" aria-label="Mobil menü">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}<Link href="/iletisim#teklif" className="btn btn-primary" onClick={() => setOpen(false)}>Teklif Al</Link></nav>}
    </header>
  );
}
