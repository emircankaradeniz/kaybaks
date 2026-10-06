import Link from "next/link";
import { ArrowRight, Box, ClipboardCheck, PackageCheck, Settings, Truck } from "lucide-react";
import { sectors } from "@/data/sectors";
import { KraftImage, Kicker, QuoteBand } from "@/components/ui/kraft";

const sectorImages = [
  "/media/products/furniture-box.png", "/media/products/die-cut-box.png", "/media/products/custom-size-box.png", "/media/products/corrugated-sheet.png", "/media/products/ondule-products.png", "/media/products/telescope-box.png", "/media/products/standard-box.png", "/media/products/premium-packaging.png",
];

const flow = [
  [Box, "Ürün özelliği", "Ürününüzün boyutu, ağırlığı ve hassasiyeti."],
  [Settings, "Kullanım koşulu", "Depolama, taşıma ve ortam koşulları."],
  [Truck, "Sevkiyat şekli", "Tekli, çoklu veya paletli sevkiyat."],
  [PackageCheck, "Uygun çözüm", "Doğru ambalaj yapısı ve malzeme düzeni."],
] as const;

export default function SectorsPage() {
  return <>
    <section className="kp-sector-hero kp-paper-grid"><div className="kp-container kp-sector-hero-grid"><div><Kicker>Sektörel Çözümler</Kicker><h1>Her sektör için<br /><span>doğru ambalaj.</span></h1><p>Ürününüzü, sevkiyatınızı ve kullanım koşullarınızı birlikte değerlendiriyoruz.</p></div><div className="kp-sector-collage"><KraftImage src="/media/products/die-cut-box.png" alt="Özel kalıp kesim ambalaj" /><KraftImage src="/media/kaybaks-video-4.png" alt="Üretim ve sevkiyat alanı" /><KraftImage src="/media/products/telescope-box.png" alt="Teleskopik ambalaj kutusu" /></div></div></section>

    <section className="kp-section"><div className="kp-container kp-sector-mosaic">{sectors.map((sector, index) => <article className={`kp-sector-card kp-sector-card-${(index % 3) + 1}`} key={sector.slug}><div className="kp-sector-card-image"><KraftImage src={sectorImages[index]} alt={`${sector.name} sektörüne uygun ambalaj`} /></div><div className="kp-sector-card-copy"><div><Kicker>Sektörel Uyum</Kicker><h2>{sector.name}</h2><p>{sector.description}</p></div><div><strong>Uygun ürünler</strong><div className="kp-tags">{sector.suitableProducts.map((product) => <span key={product}>{product}</span>)}</div></div><Link className="kp-square-link" href="/iletisim#teklif" aria-label={`${sector.name} için teklif al`}><ArrowRight /></Link></div></article>)}</div></section>

    <section className="kp-dark-section"><div className="kp-container kp-sector-guide"><div><Kicker light>Sektör karşılaştırma rehberi</Kicker><h2>Sizin sektörünüz için en uygun çözümü bulun.</h2><p>Ürün özellikleri ve sevkiyat koşulları üzerinden doğru ambalaj yapısını birlikte değerlendiriyoruz.</p><Link className="kp-button kp-button-yellow" href="/iletisim#teklif">Sektörünüze özel teklif alın<ArrowRight size={17} /></Link></div><div className="kp-sector-flow">{flow.map(([Icon, title, text]) => <article key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="kp-simple-steps"><div className="kp-container"><Kicker>Nasıl ilerliyoruz?</Kicker><div className="kp-simple-steps-grid"><h2>3 adımda doğru çözüm.</h2><article><span>1</span><ClipboardCheck /><b>İhtiyacı anlatın</b></article><article><span>2</span><Box /><b>Çözümü birlikte belirleyelim</b></article><article><span>3</span><Settings /><b>Üretime geçelim</b></article></div></div></section>
    <QuoteBand />
  </>;
}
