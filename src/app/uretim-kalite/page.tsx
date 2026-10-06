import Link from "next/link";
import { ArrowRight, Box, Boxes, ClipboardCheck, Factory, MessageSquareText, Ruler, ShieldCheck, Truck } from "lucide-react";
import { KraftImage, Kicker, QuoteBand } from "@/components/ui/kraft";

const steps = [
  [Ruler, "01", "İhtiyacın Belirlenmesi", "Ürün formu, ölçü ve kullanım senaryosu netleştirilir.", "/media/kaybaks-video-1.png"],
  [Box, "02", "Tasarım & Ölçülendirme", "Kutu yapısı, kesim ve baskı ihtiyaçları planlanır.", "/media/products/die-cut-box.png"],
  [Factory, "03", "Üretim", "Oluklu mukavva levha ve kutu üretimi seçilen formata göre işlenir.", "/media/kaybaks-video-2.png"],
  [ClipboardCheck, "04", "Kalite Kontrol", "Ebat, form ve genel üretim uygunluğu kontrol edilir.", "/media/kaybaks-video-3-hd.jpg"],
  [Truck, "05", "Sevkiyat", "Hazırlanan ürünler teslimat planına göre sevk edilir.", "/media/kaybaks-video-4.png"],
] as const;

const quality = [
  [ShieldCheck, "Ürün Uygunluğu", "Kullanım amacına uygun form ve malzeme yapısı."],
  [Factory, "Üretim Disiplini", "Planlı, kontrollü ve izlenebilir süreçler."],
  [Boxes, "Çözüm Esnekliği", "Farklı ürün ve sektörlere uyarlanabilen seçenekler."],
  [MessageSquareText, "Kurumsal İletişim", "Tekliften teslimata kadar açık ve net iletişim."],
] as const;

export default function QualityPage() {
  return <>
    <section className="kp-quality-hero kp-paper-grid"><div className="kp-container kp-quality-hero-grid"><div><Kicker>Üretim & Kalite</Kicker><h1>Her katmanda kontrol,<br /><span>her teslimatta güven.</span></h1><p>Teknik planlama, üretim akışı ve sevkiyat adımlarını sade, görünür ve kontrollü bir süreçte yürütüyoruz.</p></div><div className="kp-natural-frame"><KraftImage src="/media/kaybaks-video-2.png" alt="KAYBAKS oluklu mukavva üretim makinesi" priority /></div></div></section>

    <section className="kp-process-section"><div className="kp-container"><div className="kp-process-title"><h2>Üretim sürecimiz</h2><p>Hammadde girişinden sevkiyata kadar tüm aşamalarda planlı bir üretim akışı.</p></div><div className="kp-production-grid">{steps.map(([Icon, number, title, text, image]) => <article key={number}><div className="kp-natural-frame"><KraftImage src={image} alt={`${title} üretim aşaması`} /></div><span>{number}</span><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="kp-section"><div className="kp-container kp-material-layout"><div><Kicker>Malzemeyi tanıyoruz</Kicker><h2>Doğru katman,<br />doğru dayanım.</h2><p>Ambalajın performansını belirleyen oluk yapısı, katman düzeni ve ölçü uygunluğunu birlikte değerlendiriyoruz.</p></div><div className="kp-natural-frame"><KraftImage src="/media/products/corrugated-sheet.png" alt="Oluklu mukavva katman yapısı" /></div><div className="kp-material-notes"><article><b>Oluk yapısı</b><p>Ürünün taşıma ve istifleme ihtiyacına göre değerlendirilir.</p></article><article><b>Katman dayanımı</b><p>Kâğıt kalitesi ve katman birleşimi birlikte ele alınır.</p></article><article><b>Ölçü uygunluğu</b><p>Ürüne özel ölçülerle gereksiz boşluk azaltılır.</p></article></div></div></section>

    <section className="kp-section kp-paper-grid"><div className="kp-container"><div className="kp-quality-checks-title"><Kicker>Kalite kontrol noktalarımız</Kicker><h2>Her aşamada görünür kontrol.</h2></div><div className="kp-quality-checks">{[["Oluk yapısı","/media/products/ondule-products.png"],["Katman dayanımı","/media/products/corrugated-sheet.png"],["Ölçü uygunluğu","/media/products/custom-size-box.png"],["Form kontrolü","/media/products/die-cut-box.png"]].map(([title,image]) => <article key={title}><KraftImage src={image} alt={title} /><h3>{title}</h3></article>)}</div></div></section>

    <section className="kp-dark-section"><div className="kp-container kp-quality-values"><div><Kicker light>Güvenilir üretim</Kicker><h2>Sürdürülebilir başarı.</h2><p>Kaliteli hammadde, doğru proses ve kontrollü üretim yaklaşımı.</p><Link className="kp-button kp-button-yellow" href="/iletisim#teklif">Üretim için teklif al<ArrowRight size={17} /></Link></div>{quality.map(([Icon,title,text]) => <article key={title}><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div></section>

    <section className="kp-section"><div className="kp-container kp-production-gallery"><div><Kicker>Üretimden kareler</Kicker><h2>Üretim alanını yakından görün.</h2></div>{["/media/kaybaks-video-1.png","/media/kaybaks-video-2.png","/media/kaybaks-video-3-hd.jpg","/media/kaybaks-video-4.png"].map((image,index) => <KraftImage key={image} src={image} alt={`KAYBAKS üretim alanı ${index + 1}`} width={index === 2 ? 1920 : 1448} height={index === 2 ? 1440 : 1086} />)}</div></section>
    <QuoteBand title="Üretim ihtiyacınızı birlikte planlayalım." />
  </>;
}
