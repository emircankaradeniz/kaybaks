import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Award, Box, CheckCircle2, Factory, Globe2, Package, Ruler, ShieldCheck, ShoppingCart, Sofa, Truck, Users } from "lucide-react";
import { CTA, keyFeatures, ProductCardCode, SectionHead } from "@/components/ui/kaybaks-blocks";
import { getProducts, getSettings } from "@/lib/content-store";

export const dynamic = "force-dynamic";

const sectors = [
  { icon: ShoppingCart, title: "E-Ticaret", text: "Kargo ve e-ticaret kutuları" },
  { icon: Sofa, title: "Mobilya", text: "Mobilya ve aksesuar ambalajları" },
  { icon: Package, title: "Gıda", text: "Gıda ürünleri için güvenli ambalajlar" },
  { icon: Factory, title: "Sanayi", text: "Sanayi ürünleri için dayanıklı çözümler" },
  { icon: Truck, title: "Lojistik", text: "Taşıma ve depolama çözümleri" },
  { icon: Box, title: "Perakende", text: "Mağaza ve perakende ambalajları" },
];

export default async function HomePage() {
  const [managedProducts, siteSettings] = await Promise.all([getProducts(), getSettings()]);
  const displayProducts = managedProducts.map((product) => ({ slug: product.slug, title: product.name, text: product.shortDescription, crop: [product.cropX, product.cropY], imageUrl: product.imageUrl }));
  const heroTitle = siteSettings.hero_title || "Yeni Nesil Oluklu Mukavva ve Ambalaj Çözümleri";
  const heroParts = heroTitle.split(/(Ambalaj.*)/i);
  const heroLeadParts = heroParts[0].trim().split(/(?=Oluklu)/i).filter(Boolean);
  return <>
    <section className="hero home-hero">
      <div className="home-hero-pattern" aria-hidden="true" />
      <div className="container home-hero-content">
        <div className="home-hero-main">
          <div className="hero-copy">
            <span className="eyebrow">{siteSettings.hero_eyebrow}</span>
            <h1>{heroLeadParts.map((part) => <span className="hero-title-line" key={part}>{part}</span>)}{heroParts[1]&&<span className="yellow hero-title-line">{heroParts[1]}</span>}</h1>
            <p>Modern tesisimizde, ihtiyacınıza özel oluklu mukavva ve kutu üretimi yapıyor; markanıza değer katan ambalaj çözümleri sunuyoruz.</p>
            <div className="hero-actions">
              <Link href="/urunler" className="btn btn-primary">Ürünleri İncele <ArrowRight size={16} /></Link>
              <Link href="/iletisim#teklif" className="btn btn-outline">Teklif Al <ArrowRight size={16} /></Link>
            </div>
            <div className="hero-metrics" aria-label="KAYBAKS öne çıkan bilgiler">
              <div className="hero-metric"><span><Users size={25} /></span><div><strong>{siteSettings.customer_count}</strong><small>Mutlu Müşteri</small></div></div>
              <div className="hero-metric"><span><Factory size={25} /></span><div><strong>20+ <em>Yıl</em></strong><small>Sektör Deneyimi</small></div></div>
              <div className="hero-metric"><span><Award size={25} /></span><div><strong>Yüksek Kalite</strong><small>Güvenilir Üretim</small></div></div>
              <div className="hero-metric"><span><Globe2 size={25} /></span><div><strong>Türkiye’ye ve</strong><small>Dünyaya İhracat</small></div></div>
            </div>
          </div>
          <div className="home-hero-visual">
            <div className="home-yellow-corner" aria-hidden="true" />
            <div className="home-dot-field" aria-hidden="true" />
            <div className="home-factory-frame">
              <div className="home-factory-photo" role="img" aria-label="KAYBAKS üretim tesisi" style={siteSettings.hero_image?{backgroundImage:`url('${siteSettings.hero_image}')`}:undefined}/>
            </div>
            <div className="home-product-stage" aria-hidden="true">
              <Image className="home-sheets" src="/media/products/hero-sheets-cutout.png" alt="" width={1388} height={612} priority />
              <div className="home-box-wrap">
                <Image className="home-box" src="/media/products/hero-box-branded.png" alt="KAYBAKS baskılı oluklu mukavva kutu" width={1403} height={1121} priority />
              </div>
            </div>
            <div className="home-trust-badge">
              <span><ShieldCheck size={28} /></span>
              <div><strong>Güvenilir Üretim</strong><small>Kalite Standartlarında Üretim</small></div>
              <CheckCircle2 size={20} />
            </div>
          </div>
        </div>
        <div className="home-feature-grid">
          {keyFeatures.map(({ icon: Icon, title, text }, index) => <article className="home-feature-card" key={title}>
            <div className="home-feature-icon">{index === 0 ? <Ruler size={29} /> : <Icon size={29} />}</div>
            <div><h3>{index === 0 ? "Özel Üretim" : title}</h3><p>{text}</p></div>
            <ArrowRight className="home-feature-arrow" size={18} />
          </article>)}
        </div>
      </div>
      <div className="home-wave" aria-hidden="true" />
    </section>

    <section className="section"><div className="container"><SectionHead kicker="Ürünlerimiz" title="Her İhtiyaca Uygun Ambalaj Çözümleri" /><div className="products-row">{displayProducts.slice(0,6).map(item => <ProductCardCode key={item.slug} item={item} />)}</div></div></section>

    <section className="section-sm soft-section"><div className="container about-grid"><div className="photo-collage"><Image className="big" src="/media/kaybaks-factory-hd.jpg" alt="KAYBAKS üretim tesisi" width={936} height={494} /><Image src="/media/kaybaks-video-2.png" alt="Üretim hattı" width={500} height={350} /><Image src="/media/kaybaks-video-4.png" alt="Fabrika üretimi" width={500} height={350} /></div><div className="content-block"><span className="kicker">Kaybaks Hakkında</span><h2>Kayseri’nin Gücü,<br />Ambalajda Güvenilir Çözüm Ortağınız</h2><p>KAYBAKS, oluklu mukavva ve ambalaj sektöründe yılların tecrübesi ve modern üretim anlayışıyla faaliyet göstermektedir. Müşteri memnuniyeti odağına alan yaklaşımımızla kaliteli, dayanıklı ve çevre dostu ambalaj çözümleri sunuyoruz.</p><div className="stats-inline"><div className="stat"><strong>{siteSettings.experience_years}</strong><small>Yıllık Deneyim</small></div><div className="stat"><strong>{siteSettings.production_area}</strong><small>Üretim Alanı</small></div><div className="stat"><strong>{siteSettings.customer_count}</strong><small>Mutlu Müşteri</small></div><div className="stat"><strong>{siteSettings.project_count}</strong><small>Başarılı Proje</small></div></div></div></div></section>

    <section className="section"><div className="container"><SectionHead kicker="Üretim Sürecimiz" title="Fikirden Teslimata, Uçtan Uca Süreç Yönetimi" /><div className="timeline">{[
      [Users,"Analiz","İhtiyaçlarınızı analiz ediyor, en uygun çözümü belirliyoruz."],
      [Package,"Tasarım","Profesyonel tasarım ekibimizle ambalajınızı tasarlıyoruz."],
      [Factory,"Üretim","Modern makinelerimizle kaliteli üretim yapıyoruz."],
      [ShieldCheck,"Kalite Kontrol","Her ürün kalite standartlarına göre kontrol edilir."],
      [Truck,"Sevkiyat","Zamanında ve güvenli sevkiyat ile teslimat sağlıyoruz."],
    ].map(([I,t,p]) => { const Icon=I as typeof Users; return <div className="timeline-step" key={t as string}><div className="timeline-icon"><Icon size={22} /></div><h3>{t as string}</h3><p>{p as string}</p></div>})}</div></div></section>

    <section className="section-sm soft-section"><div className="container"><SectionHead kicker="Sektörel Çözümler" title="Her Sektöre Özel Ambalaj Çözümleri" /><div className="sector-grid">{sectors.map(({ icon: Icon,title,text }) => <article className="sector-card" key={title}><div className="icon-wrap"><Icon size={28} /></div><h3>{title}</h3><p>{text}</p></article>)}</div><div className="factory-gallery">{["/media/kaybaks-video-1.png","/media/kaybaks-video-2.png","/media/kaybaks-video-3-hd.jpg","/media/kaybaks-video-4.png","/media/kaybaks-video-5.png"].map((src,n) => <Image key={src} src={src} alt={`Üretim tesisi ${n+1}`} width={500} height={350} />)}</div></div></section>
    <CTA />
  </>;
}
