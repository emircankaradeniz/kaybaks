import Link from "next/link";
import { ArrowRight, Boxes, Factory, Handshake, Leaf, PackageCheck, Truck } from "lucide-react";
import { KraftImage, Kicker, QuoteBand, SectionTitle } from "@/components/ui/kraft";

const principles = [
  [Handshake, "Şeffaf iletişim", "Açık, net ve sürdürülebilir bir iş birliği anlayışı."],
  [Factory, "Üretim disiplini", "Planlı ve kontrollü üretim süreçleri."],
  [Truck, "Zamanında teslim", "Planlanan termin doğrultusunda düzenli sevkiyat."],
] as const;

const journey = [
  [Boxes, "Güçlü bir başlangıç", "Ambalaj sektöründeki deneyimimizi Kayseri’den üretime taşıdık."],
  [Factory, "İstikrarlı gelişim", "Üretim bilgimizi ve süreç disiplinimizi sürekli geliştirdik."],
  [PackageCheck, "Sektörlere özel çözümler", "Farklı kullanım ve sevkiyat ihtiyaçlarına uygun yapılar geliştirdik."],
  [Leaf, "Güvenle geleceğe", "Daha verimli malzeme kullanımı ve uzun vadeli iş birlikleriyle ilerliyoruz."],
] as const;

export default function CorporatePage() {
  return <>
    <section className="kp-inner-hero kp-paper-grid"><div className="kp-container kp-inner-hero-grid"><div><Kicker>Kurumsal</Kicker><h1>Ambalajı bir üründen fazlası olarak görüyoruz.</h1><p>Kayseri’den üretime, üretimden güvene. İhtiyaca göre şekillenen ambalaj çözümlerini kurumsal üretim disipliniyle sunuyoruz.</p><Link className="kp-button kp-button-yellow" href="/iletisim">Bizimle Tanışın<ArrowRight size={17} /></Link></div><div className="kp-natural-frame kp-hero-factory"><KraftImage src="/media/kaybaks-factory-hd.jpg" alt="KAYBAKS üretim tesisi" width={1872} height={988} priority /></div></div></section>

    <section className="kp-section"><div className="kp-container kp-about-editorial"><div className="kp-editorial-copy"><Kicker>Hakkımızda</Kicker><h2>Ambalaja değer katan bir anlayışla çalışıyoruz.</h2><p>KAYBAKS; oluklu mukavva, levha, kutu ve özel tasarım ambalaj ihtiyaçlarını üretim odağında ele alır. Ölçü, kullanım amacı ve sevkiyat senaryosu birlikte değerlendirilir.</p><p>İletişimde netlik, üretimde ciddiyet ve teslim planına bağlılık; çözüm yaklaşımımızın temelini oluşturur.</p></div><div className="kp-natural-frame"><KraftImage src="/media/products/corrugated-sheet.png" alt="Oluklu mukavva levha katmanları" /></div><div className="kp-principle-list">{principles.map(([Icon, title, text]) => <article key={title}><Icon /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></div></section>

    <section className="kp-section kp-paper-grid"><div className="kp-container"><SectionTitle title="Vizyonumuz, misyonumuz ve değerlerimiz." description="Ürüne uygun çözümü güvenilir üretim yaklaşımıyla sunmak." /><div className="kp-three-cards"><article><KraftImage src="/media/kaybaks-factory.jpg" alt="KAYBAKS fabrikası" width={468} height={247} /><div><h3>Vizyonumuz</h3><p>Ürün ihtiyacına göre doğru ambalaj yapısını kurumsal disiplinle sunmak.</p></div></article><article><KraftImage src="/media/kaybaks-video-1.png" alt="Üretim alanında çalışan ekip" /><div><h3>Misyonumuz</h3><p>Oluklu mukavva ve kutu çözümlerinde planlı, sade ve güven veren bir üretim süreci yürütmek.</p></div></article><article><KraftImage src="/media/kaybaks-video-4.png" alt="İstiflenmiş oluklu mukavva ürünleri" /><div><h3>Değerlerimiz</h3><p>Şeffaf iletişim, üretim ciddiyeti, çözüm odaklılık ve teslim planına bağlılık.</p></div></article></div></div></section>

    <section className="kp-dark-section"><div className="kp-container kp-production-story"><div><Kicker light>Üretim anlayışımız</Kicker><h2>Her ürüne<br />doğru yapı.</h2><p>Hammaddeden nihai ürüne kadar tüm süreçlerde ihtiyacınıza uygun çözümler üretmek için titizlikle çalışıyoruz.</p><Link className="kp-button kp-button-yellow" href="/uretim-kalite">Üretim Süreçlerimiz<ArrowRight size={17} /></Link></div><KraftImage src="/media/kaybaks-video-2.png" alt="Oluklu mukavva üretim süreci" /><KraftImage src="/media/kaybaks-video-4.png" alt="Üretime hazır oluklu mukavva levhalar" /></div></section>

    <section className="kp-section"><div className="kp-container kp-journey"><div><Kicker>Yolculuğumuz</Kicker><h2>Sürekli gelişimle daha güçlü yarınlara.</h2></div><div className="kp-journey-list">{journey.map(([Icon, title, text]) => <article key={title}><span><Icon /></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div><div className="kp-natural-frame"><KraftImage src="/media/products/hero-box-branded.png" alt="KAYBAKS markalı oluklu mukavva kutu" width={1403} height={1121} /></div></div></section>

    <section className="kp-sustainability"><div className="kp-container kp-sustainability-grid"><div><Kicker light>Daha yaşanabilir yarınlar için</Kicker><h2>Sorumlu bir yaklaşım.</h2><p>Malzemeyi verimli kullanmayı, üretim süreçlerini düzenli yönetmeyi ve dayanıklı ambalajlarla ürün kaybını azaltmayı önemsiyoruz.</p></div><KraftImage src="/media/products/corrugated-sheet.png" alt="Geri dönüştürülebilir oluklu mukavva malzeme" /><div className="kp-sustainability-points"><span><Leaf />Verimli malzeme kullanımı</span><span><Boxes />Atıkların doğru yönetimi</span><span><PackageCheck />Dayanıklı ürün yapısı</span></div></div></section>
    <QuoteBand />
  </>;
}
