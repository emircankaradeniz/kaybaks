import Link from "next/link";
import { ArrowRight, Box, Factory, PackageCheck, Palette, Truck } from "lucide-react";
import { getProducts } from "@/lib/content-store";
import { KraftImage, QuoteBand, type CardProduct } from "@/components/ui/kraft";
import { createPageMetadata } from "@/lib/metadata";

export const metadata = createPageMetadata({
  title: "Kayseri Oluklu Mukavva ve Kutu Üreticisi | KAYBAKS",
  description: "Kayseri'de oluklu mukavva levha, karton kutu, kalıp kesim kutu ve özel ölçü ambalaj üretimi. KAYBAKS ile üretiminizi planlayın.",
  path: "/",
  keywords: ["Kayseri oluklu mukavva", "Kayseri kutu üreticisi", "karton kutu üretimi", "ambalaj fabrikası"],
});

export const dynamic = "force-dynamic";

const fallbackImages: Record<string, string> = {
  "oluklu-mukavva-levha": "/media/enhanced/corrugated-layers-hd.jpg",
  "normal-kutu": "/media/enhanced/normal-box-and-sheets-hd.jpg",
  "teleskopik-kutu": "/media/enhanced/box-types-hd.jpg",
  "kalip-kesim-kutu": "/media/enhanced/handled-diecut-box-hd.jpg",
  ondule: "/media/enhanced/flute-types-hd.jpg",
  "demonte-mobilya-kutulari": "/media/enhanced/box-size-variety-hd.jpg",
  "ozel-olcu-kutu": "/media/enhanced/box-types-hd.jpg",
  "ozel-tasarim-ambalaj": "/media/enhanced/diecut-folding-example-hd.jpg",
};

export default async function HomePage() {
  const managed = await getProducts();
  const products: CardProduct[] = managed.map((product) => ({
    slug: product.slug,
    title: product.name,
    description: product.shortDescription,
    category: product.category,
    image: fallbackImages[product.slug] || product.imageUrl || "/media/enhanced/normal-box-and-sheets-hd.jpg",
  }));

  return <>
    <section className="kb3-hero">
      <div className="kp-container kb3-hero-grid">
        <div className="kb3-hero-copy">
          <p className="kb3-eyebrow">KAYSERİ · OLUKLU MUKAVVA &amp; KUTU</p>
          <h1>Ürününüzü koruyan ambalajı <span>birlikte üretiyoruz.</span></h1>
          <p className="kb3-lead">Oluklu mukavva levhadan özel ölçü kutuya, kalıp kesimden tam renk baskıya kadar ihtiyacınıza uygun üretim.</p>
          <div className="kp-actions">
            <Link className="kp-button kp-button-yellow" href="/urunler">Ürünleri İnceleyin<ArrowRight size={17} /></Link>
            <Link className="kp-button kp-button-outline" href="/iletisim#teklif">Teklif İsteyin<ArrowRight size={17} /></Link>
          </div>
          <dl className="kb3-history-facts">
            <div><dt>1999</dt><dd>Üretime başlangıç</dd></div>
            <div><dt>2010</dt><dd>KAYBAKS markası</dd></div>
            <div><dt>Kayseri</dt><dd>Kendi filomuzla şehir içi sevkiyat</dd></div>
          </dl>
        </div>
        <div className="kb3-hero-product">
          <span className="kb3-figure-label">NORMAL KUTU + OLUKLU MUKAVVA LEVHA</span>
          <KraftImage src="/media/enhanced/normal-box-and-sheets-hd.jpg" alt="KAYBAKS normal kutu ve oluklu mukavva levha ürünü" width={1254} height={1254} priority />
          <div className="kb3-spec"><span>Ölçü</span><b>Ürüne göre</b><span>Gramaj</span><b>İhtiyaca göre</b></div>
        </div>
      </div>
    </section>

    <section className="kb3-capabilities" aria-label="KAYBAKS üretim kabiliyetleri">
      <div className="kp-container">
        <span><Box />Normal ve teleskopik kutu</span>
        <span><PackageCheck />Kalıp kesim ve özel ölçü</span>
        <span><Palette />Tam renk baskı</span>
        <span><Truck />Planlı sevkiyat</span>
      </div>
    </section>

    <section className="kp-section kb3-products">
      <div className="kp-container">
        <header className="kb3-section-head"><div><small>ÜRÜNLER / 01</small><h2>Üretimimizde olan ambalajlar</h2></div><p>Standart koliden ürüne özel kalıp kesim kutuya kadar farklı ölçü ve gramajlarda üretim yapıyoruz.</p><Link href="/urunler">Tüm ürünler <ArrowRight size={17} /></Link></header>
        <div className="kb3-product-grid">
          {products.slice(0, 6).map((product, index) => <Link className="kb3-product" href={`/urunler/${product.slug}`} key={product.slug}>
            <span className="kb3-product-no">0{index + 1}</span>
            <div className="kb3-product-media"><KraftImage src={product.image} alt={product.title} /></div>
            <div><small>{product.category}</small><h3>{product.title}</h3><p>{product.description}</p><b>Detayları görün <ArrowRight size={15} /></b></div>
          </Link>)}
        </div>
      </div>
    </section>

    <section className="kp-section kb3-factory">
      <div className="kp-container">
        <header className="kb3-section-head kb3-section-head-light"><div><small>FABRİKA / 02</small><h2>Gerçek üretim, gerçek tesis</h2></div><p>KAYBAKS, 1. Organize Sanayi Bölgesi’ndeki tesisinde üretim ve sevkiyat süreçlerini birlikte yönetir.</p></header>
        <div className="kb3-factory-grid">
          <figure><KraftImage src="/media/enhanced/kaybaks-factory-hd.jpg" alt="KAYBAKS 1. Organize Sanayi Bölgesi üretim tesisi" width={1446} height={1087} /><figcaption>1. Organize Sanayi Bölgesi · Melikgazi / Kayseri</figcaption></figure>
          <div className="kb3-factory-copy">
            <Factory />
            <h3>1999’dan gelen üretim deneyimi</h3>
            <p>Şirketimiz oluklu mukavva üretimine 1999 yılında başladı; 2010’dan bu yana KAYBAKS markasıyla faaliyet gösteriyor.</p>
            <p>Mobilya, gıda, tekstil, beyaz eşya, çelik eşya, kimya ve birçok farklı sektör için zamanında ve kaliteli üretime odaklanıyoruz.</p>
            <Link className="kp-button kp-button-yellow" href="/kurumsal">KAYBAKS’ı Tanıyın<ArrowRight size={17} /></Link>
          </div>
        </div>
      </div>
    </section>

    <section className="kp-section kb3-print">
      <div className="kp-container kb3-print-grid">
        <div className="kb3-print-copy"><small>BASKI &amp; KALIP / 03</small><h2>Tam renk baskı</h2><p>Ambalajı yalnızca koruyucu değil, markanızı taşıyan bir yüzey olarak da ele alıyoruz. Kutu tasarımı, kalıp kesimi ve tam renk baskı ihtiyaca göre birlikte planlanır.</p><div className="kb3-cmyk" aria-label="Tam renk baskı"><i>C</i><i>M</i><i>Y</i><i>K</i></div><Link className="kp-button kp-button-outline" href="/iletisim#teklif">Baskılı kutu için teklif alın<ArrowRight size={17} /></Link></div>
        <div className="kb3-print-visual"><KraftImage src="/media/enhanced/handled-diecut-box-hd.jpg" alt="Kalıp kesim taşıma kutusu" width={1416} height={1111} /><span>Kalıp kesim · Tam renk baskı</span></div>
      </div>
    </section>

    <section className="kp-section kb3-technical">
      <div className="kp-container">
        <header className="kb3-section-head"><div><small>TEKNİK BİLGİ / 04</small><h2>Dalga ve katman seçenekleri</h2></div><p>Ürünün ağırlığı, istifleme koşulları ve sevkiyat biçimine göre uygun oluk ve katman yapısı belirlenir.</p><Link href="/uretim-kalite">Teknik bilgileri inceleyin <ArrowRight size={17} /></Link></header>
        <div className="kb3-technical-grid"><figure><KraftImage src="/media/enhanced/corrugated-layers-hd.jpg" alt="Sırtı açık, tek dalga, çift dalga ve üç dalga oluklu mukavva yapıları" width={1221} height={1289} /><figcaption>Katman yapıları</figcaption></figure><figure><KraftImage src="/media/enhanced/flute-types-hd.jpg" alt="F, E, B ve C dalga oluklu mukavva seçenekleri" width={1050} height={1498} /><figcaption>Dalga seçenekleri</figcaption></figure></div>
      </div>
    </section>

    <QuoteBand title="Ölçünüzü, kullanım alanını ve adedi paylaşın; üretimi birlikte planlayalım." />
  </>;
}
