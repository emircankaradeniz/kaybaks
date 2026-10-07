import Link from "next/link";
import { ArrowRight, ClipboardCheck, Factory, Palette, Ruler, Truck } from "lucide-react";
import { KraftImage, QuoteBand } from "@/components/ui/kraft";

const steps = [
  [Ruler, "01", "İhtiyacın belirlenmesi", "Ürün ölçüsü, ağırlığı, kullanım alanı ve sevkiyat biçimi alınır."],
  [ClipboardCheck, "02", "Malzeme planı", "Dalga tipi, katman yapısı ve gramaj ihtiyaca göre belirlenir."],
  [Palette, "03", "Kalıp ve baskı", "Kalıp kesim ve tam renk baskı gereksinimi projelendirilir."],
  [Factory, "04", "Üretim", "Onaylanan ölçü ve teknik yapıya göre üretim gerçekleştirilir."],
  [Truck, "05", "Teslimat", "Ürünler termin planına göre hazırlanır ve sevk edilir."],
] as const;

export default function QualityPage() {
  return <>
    <section className="kb3-page-hero kb3-quality-hero"><div className="kp-container kb3-page-hero-grid"><div><p className="kb3-eyebrow">ÜRETİM &amp; TEKNİK BİLGİ</p><h1>Doğru katman, doğru ölçü, doğru baskı.</h1><p>Oluklu mukavva ambalajı; ürünün korunması, depolanması, taşınması ve sunulması için birlikte planlıyoruz.</p><Link className="kp-button kp-button-yellow" href="/iletisim#teklif">Üretim talebi oluşturun<ArrowRight size={17} /></Link></div><figure><KraftImage src="/media/enhanced/corrugated-layers-hd.jpg" alt="Oluklu mukavva katman ve dalga yapıları" width={1221} height={1289} priority /><figcaption>Sırtı açık · Tek dalga · Çift dalga · Üç dalga</figcaption></figure></div></section>

    <section className="kp-section kb3-process"><div className="kp-container"><header className="kb3-section-head"><div><small>ÜRETİM AKIŞI / 01</small><h2>İhtiyaçtan sevkiyata</h2></div><p>Her iş ürün bilgisiyle başlar, onaylanan teknik yapı ve teslim planıyla üretime alınır.</p></header><div className="kb3-process-list">{steps.map(([Icon, no, title, text]) => <article key={no}><b>{no}</b><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="kp-section kb3-wave-guide"><div className="kp-container kb3-wave-grid"><div><p className="kb3-eyebrow">DALGA SEÇENEKLERİ / 02</p><h2>Ürünün yüküne göre yapı</h2><p>F, E, B ve C dalga seçenekleri ile tek ve çift katlı oluklu mukavva kombinasyonları farklı koruma ve istifleme ihtiyaçlarına cevap verir.</p><ul><li>Ürünün ağırlığı ve hassasiyeti</li><li>İstifleme yüksekliği</li><li>Depolama ve nakliye koşulları</li><li>Ambalajın kullanım biçimi</li></ul></div><KraftImage src="/media/enhanced/flute-types-hd.jpg" alt="F E B ve C dalga oluklu mukavva karşılaştırması" width={1050} height={1498} /></div></section>

    <section className="kp-section kb3-print-detail"><div className="kp-container kb3-print-grid"><div className="kb3-print-copy"><small>BASKI &amp; KALIP / 03</small><h2>Tam renk baskı</h2><p>Ürün bilgileriniz, marka renkleriniz ve kullanım amacınız doğrultusunda baskı ve kalıp kesim detayları üretim öncesinde netleştirilir.</p><div className="kb3-cmyk"><i>C</i><i>M</i><i>Y</i><i>K</i></div><Link className="kp-button kp-button-yellow" href="/iletisim#teklif">Baskılı üretim için görüşün<ArrowRight size={17} /></Link></div><div className="kb3-print-visual"><KraftImage src="/media/enhanced/diecut-folding-example-hd.jpg" alt="Kalıp kesim kutunun açık ve katlanmış görünümü" width={1254} height={1254} /><span>Kalıp kesim · Tam renk baskı</span></div></div></section>

    <section className="kp-section kb3-material-benefits"><div className="kp-container"><header className="kb3-section-head"><div><small>OLUKLU MUKAVVA / 04</small><h2>Koruma, depolama ve sevkiyat</h2></div><p>Hafif ve dayanıklı yapısı, katlanabilirliği ve farklı ürünlere uyarlanabilmesi oluklu mukavvayı güçlü bir taşıma ambalajı yapar.</p></header><div className="kb3-benefit-grid"><article><h3>Ürünü korur</h3><p>Yüksek enerji emme kapasitesi ve katmanlı yapısıyla taşıma sırasında koruma sağlar.</p></article><article><h3>Az yer kaplar</h3><p>Düz levha halinde depolanabilir, gerektiğinde kutu haline getirilebilir.</p></article><article><h3>İstiflemeyi destekler</h3><p>Nakliye alanının daha verimli kullanılmasına yardımcı olur.</p></article><article><h3>Geri dönüştürülebilir</h3><p>Doğal ve yeniden dönüştürülebilen kâğıt bazlı malzemeden üretilir.</p></article></div></div></section>
    <QuoteBand title="Teknik ihtiyacınızı paylaşın; uygun dalga, katman ve kutu yapısını birlikte belirleyelim." />
  </>;
}
