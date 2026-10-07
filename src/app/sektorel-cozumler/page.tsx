import Link from "next/link";
import { ArrowRight, Box, Ruler, Scale, Truck } from "lucide-react";
import { sectors } from "@/data/sectors";
import { KraftImage, QuoteBand } from "@/components/ui/kraft";

const images = [
  "/media/enhanced/box-size-variety-hd.png",
  "/media/enhanced/handled-diecut-box-hd.png",
  "/media/enhanced/box-types-hd.png",
  "/media/enhanced/corrugated-layers-hd.png",
  "/media/enhanced/normal-box-and-sheets-hd.png",
  "/media/enhanced/flute-types-hd.png",
  "/media/enhanced/box-types-hd.png",
  "/media/enhanced/normal-box-and-sheets-hd.png",
];

export default function SectorsPage() {
  return <>
    <section className="kb3-page-hero kb3-sector-hero"><div className="kp-container kb3-page-hero-grid"><div><p className="kb3-eyebrow">SEKTÖREL ÇÖZÜMLER</p><h1>Her ürünün taşıma koşulu farklıdır.</h1><p>Ambalajı sektör adına göre değil; ürünün ölçüsü, ağırlığı, hassasiyeti ve teslim biçimine göre planlıyoruz.</p><Link className="kp-button kp-button-yellow" href="/iletisim#teklif">Sektörünüze özel teklif<ArrowRight size={17} /></Link></div><figure><KraftImage src="/media/enhanced/box-size-variety-hd.png" alt="Farklı ölçülerde oluklu mukavva kutular" width={1656} height={950} priority /><figcaption>Farklı ölçü · Farklı ürün · Uygun ambalaj</figcaption></figure></div></section>

    <section className="kb3-decision"><div className="kp-container"><span><Ruler /><b>Ölçü</b>En, boy ve yükseklik</span><span><Scale /><b>Ağırlık</b>Taşıma ve istif yükü</span><span><Box /><b>Hassasiyet</b>Koruma ve seperatör</span><span><Truck /><b>Sevkiyat</b>Depolama ve teslim biçimi</span></div></section>

    <section className="kp-section kb3-sectors"><div className="kp-container"><header className="kb3-section-head"><div><small>SEKTÖRLER / 01</small><h2>Üretim yaptığımız alanlar</h2></div><p>KAYBAKS; mobilyadan gıdaya, tekstilden beyaz eşyaya kadar farklı sektörlerin ambalaj ihtiyaçlarına üretim sağlar.</p></header><div className="kb3-sector-grid">{sectors.map((sector, index) => <article key={sector.slug}><span>0{index + 1}</span><div className="kb3-sector-media"><KraftImage src={images[index]} alt={`${sector.name} için ambalaj çözümleri`} /></div><div><h3>{sector.name}</h3><p>{sector.description}</p><ul>{sector.suitableProducts.map((product) => <li key={product}>{product}</li>)}</ul><Link href="/iletisim#teklif">Teklif isteyin <ArrowRight size={15} /></Link></div></article>)}</div></div></section>
    <QuoteBand />
  </>;
}
