"use client";

import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/kurumsal", label: "Kurumsal" },
  { href: "/urunler", label: "Ürünlerimiz" },
  { href: "/sektorel-cozumler", label: "Sektörel Çözümler" },
  { href: "/uretim-kalite", label: "Üretim & Kalite" },
  { href: "/iletisim", label: "İletişim" },
];

export function Brand() {
  return (
    <span className="kp-brand" aria-label="KAYBAKS Oluklu Mukavva ve Kutu">
      <span className="kp-brand-mark" aria-hidden="true"><i /><i /><i /></span>
      <span className="kp-brand-type"><b><span>KAY</span><em>BAKS</em></b><small>OLUKLU MUKAVVA &amp; KUTU</small></span>
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  return (
    <header className="kp-header">
      <div className="kp-container kp-header-inner">
        <Link href="/" aria-label="KAYBAKS ana sayfa"><Brand /></Link>
        <nav className="kp-nav" aria-label="Ana menü">
          {links.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return <Link key={link.href} href={link.href} className={active ? "active" : ""}>{link.label}</Link>;
          })}
        </nav>
        <span className="kp-header-index" aria-hidden="true"><b>1999</b><small>ÜRETİME BAŞLANGIÇ</small></span>
        <Link href="/iletisim#teklif" className="kp-button kp-button-yellow kp-header-cta">Teklif Al <ArrowUpRight size={16} /></Link>
        <button className="kp-menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Menüyü kapat" : "Menüyü aç"}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="kp-mobile-nav" aria-label="Mobil menü">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}<Link href="/iletisim#teklif" className="kp-button kp-button-yellow" onClick={() => setOpen(false)}>Teklif Al <ArrowUpRight size={16} /></Link></nav>}
    </header>
  );
}
