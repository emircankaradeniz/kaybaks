import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Phone } from "lucide-react";

export type CardProduct = { slug: string; title: string; description: string; category: string; image: string };

type KraftImageProps = { src: string; alt: string; className?: string; width?: number; height?: number; priority?: boolean };

export function KraftImage({ src, alt, className = "", width = 1536, height = 1024, priority = false }: KraftImageProps) {
  return <Image className={`kp-image ${className}`} src={src} alt={alt} width={width} height={height} sizes="(max-width: 760px) 100vw, (max-width: 1200px) 50vw, 33vw" priority={priority} />;
}

export function Kicker({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <span className={`kp-kicker${light ? " kp-kicker-light" : ""}`}>{children}</span>;
}

export function SectionTitle({ kicker, title, description, action }: { kicker?: string; title: string; description?: string; action?: { href: string; label: string } }) {
  return <div className="kp-section-heading"><div>{kicker && <Kicker>{kicker}</Kicker>}<h2>{title}</h2></div>{description && <p>{description}</p>}{action && <Link className="kp-text-link" href={action.href}>{action.label}<ArrowRight size={17} /></Link>}</div>;
}

export function ProductCard({ product }: { product: CardProduct }) {
  return <article className="kp-product-card"><Link href={`/urunler/${product.slug}`} className="kp-product-media"><KraftImage src={product.image} alt={product.title} /></Link><div className="kp-product-copy"><Kicker>{product.category}</Kicker><h3>{product.title}</h3><p>{product.description}</p><Link className="kp-text-link" href={`/urunler/${product.slug}`}>Detayları Gör<ArrowRight size={16} /></Link></div></article>;
}

export function CheckList({ items }: { items: string[] }) {
  return <ul className="kp-check-list">{items.map((item) => <li key={item}><span><Check size={14} /></span>{item}</li>)}</ul>;
}

export function QuoteBand({ title = "Sizin için doğru ambalaj çözümünü birlikte oluşturalım.", product }: { title?: string; product?: string }) {
  const href = product ? `/iletisim?urun=${encodeURIComponent(product)}#teklif` : "/iletisim#teklif";
  return <section className="kp-quote-band"><div className="kp-container kp-quote-inner"><div><Kicker>Ambalajda güvenli yarınlar</Kicker><h2>{title}</h2></div><div className="kp-quote-actions"><a className="kp-phone-link" href="tel:+903523222801"><Phone size={17} />+90 352 322 28 01</a><Link className="kp-button kp-button-yellow" href={href}>Teklif Al<ArrowUpRight size={17} /></Link></div></div></section>;
}

export function PageIntro({ eyebrow, title, lead, children }: { eyebrow: string; title: string; lead: string; children?: React.ReactNode }) {
  return <div className="kp-page-intro"><Kicker>{eyebrow}</Kicker><h1>{title}</h1><p>{lead}</p>{children}</div>;
}
