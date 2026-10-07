"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Menu, PhoneCall, X } from "lucide-react";
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
      <Image
        className="kp-brand-image"
        src="/brand/kaybaks-logo-clean-hd.png"
        alt="KAYBAKS Oluklu Mukavva ve Kutu"
        width={2172}
        height={724}
      />
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
        <a href="tel:+903523222801" className="kp-header-index" aria-label="KAYBAKS'ı 0352 322 28 01 numarasından ara">
          <span className="kp-header-index-icon" aria-hidden="true"><PhoneCall size={14} strokeWidth={2.2} /></span>
          <span className="kp-header-index-copy"><b>0352 322 28 01</b><small>DOĞRUDAN İLETİŞİM</small></span>
        </a>
        <Link href="/iletisim#teklif" className="kp-button kp-button-yellow kp-header-cta">Teklif Al <ArrowUpRight size={16} /></Link>
        <button className="kp-menu-button" type="button" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? "Menüyü kapat" : "Menüyü aç"}>{open ? <X /> : <Menu />}</button>
      </div>
      {open && <nav className="kp-mobile-nav" aria-label="Mobil menü">{links.map((link) => <Link key={link.href} href={link.href} onClick={() => setOpen(false)}>{link.label}</Link>)}<Link href="/iletisim#teklif" className="kp-button kp-button-yellow" onClick={() => setOpen(false)}>Teklif Al <ArrowUpRight size={16} /></Link></nav>}
    </header>
  );
}
