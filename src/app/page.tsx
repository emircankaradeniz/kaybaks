import Link from "next/link";
import { ArrowRight, Box, Boxes, ClipboardCheck, Factory, PackageCheck, Ruler, ShoppingCart, Sofa, Store, Truck } from "lucide-react";
import { getProducts } from "@/lib/content-store";
import { KraftImage, Kicker, ProductCard, QuoteBand, SectionTitle, type CardProduct } from "@/components/ui/kraft";

export const dynamic = "force-dynamic";

const fallbackImages: Record<string, string> = {
  "oluklu-mukavva-levha": "/media/products/corrugated-sheet.png", "normal-kutu": "/media/products/standard-box.png", "teleskopik-kutu": "/media/products/telescope-box.png", "kalip-kesim-kutu": "/media/products/die-cut-box.png", ondule: "/media/products/ondule-products.png", "demonte-mobilya-kutulari": "/media/products/furniture-box.png", "ozel-olcu-kutu": "/media/products/custom-size-box.png", "ozel-tasarim-ambalaj": "/media/products/premium-packaging.png",
};

const process = [
  [Ruler, "01", "İhtiyacı Dinliyoruz", "Ürününüzü ve hedeflerinizi birlikte netleştiriyoruz."],
  [Box, "02", "Tasarım & Numune", "Doğru yapıyı, ölçüyü ve malzeme düzenini belirliyoruz."],
  [Factory, "03", "Üretim", "Planlanan özelliklerde kontrollü üretim yapıyoruz."],
  [ClipboardCheck, "04", "Kalite Kontrol", "Ölçü, birleşim ve üretim uygunluğunu kontrol ediyoruz."],
  [Truck, "05", "Teslimat", "Ürünleri teslimat planına göre sevk ediyoruz."],
] as const;

const sectors = [
  [ShoppingCart, "E-Ticaret", "/media/products/custom-size-box.png"],
  [Sofa, "Mobilya", "/media/products/furniture-box.png"],
  [Boxes, "Sanayi Ürünleri", "/media/products/die-cut-box.png"],
  [PackageCheck, "Gıda ve Tarım", "/media/products/telescope-box.png"],
  [Store, "Perakende", "/media/products/premium-packaging.png"],
] as const;

export default async function HomePage() {
  const managedProducts = await getProducts();
  const products: CardProduct[] = managedProducts.map((product) => ({ slug: product.slug, title: product.name, description: product.shortDescription, category: product.category, image: product.imageUrl || fallbackImages[product.slug] || "/media/products/standard-box.png" }));
  return <>
    <section className="kp-home-hero kp-paper-grid kb-home-hero">
      <div className="kp-container kp-home-hero-grid">
        <div className="kp-home-copy"><Kicker>Oluklu mukavva · Kayseri</Kicker><h1>Kutunun dışını değil, <span>içindekini koruyoruz.</span></h1><p>Ölçüden malzemeye, üretimden sevkiyata kadar ambalajı tek bir üretim planı olarak ele alıyoruz.</p><div className="kp-actions"><Link className="kp-button kp-button-yellow" href="/urunler">Ürünleri İncele<ArrowRight size={17} /></Link><Link className="kp-button kp-button-outline" href="/iletisim#teklif">Projenizi Anlatın<ArrowRight size={17} /></Link></div><div className="kp-hero-points"><span><b>01</b><Ruler />Ölçüyü belirle</span><span><b>02</b><Boxes />Yapıyı seç</span><span><b>03</b><PackageCheck />Güvenle sevk et</span></div></div>
        <div className="kp-hero-product" aria-label="Oluklu mukavva ürün görseli"><div className="kb-stage-code"><span>KYS / AMB</span><b>01—38</b></div><KraftImage className="kp-hero-sheets" src="/media/products/hero-sheets-cutout.png" alt="Katmanlı oluklu mukavva levhalar" width={1390} height={615} priority /><KraftImage className="kp-hero-box" src="/media/products/hero-box-branded.png" alt="KAYBAKS oluklu mukavva kutu" width={1403} height={1121} priority /><div className="kp-tech-note kp-tech-note-a"><span />Taşıma yüküne göre<br />katman seçimi</div><div className="kp-tech-note kp-tech-note-b"><span />Ürüne göre<br />net ölçülendirme</div><div className="kb-fold-mark" aria-hidden="true">KATLAMA EKSENİ</div></div>
      </div>
      <div className="kb-material-strip" aria-hidden="true"><span>LEVHA</span><span>NORMAL KUTU</span><span>KALIP KESİM</span><span>ÖZEL ÖLÇÜ</span><span>ONDÜLE</span></div>
    </section>

    <section className="kp-section kb-product-index"><div className="kp-container"><SectionTitle kicker="Ürün indeksi / 01" title="Her yük için başka bir yapı." description="Hazır kalıba ürün uydurmak yerine; ürünün ölçüsüne, ağırlığına ve yolculuğuna uygun ambalajı kuruyoruz." action={{ href: "/urunler", label: "Ürün arşivini aç" }} /><div className="kp-product-grid kp-product-grid-home">{products.slice(0, 4).map((product) => <ProductCard key={product.slug} product={product} />)}</div></div></section>

    <section className="kp-dark-section kb-process-section"><div className="kp-container kp-process-layout"><div><Kicker light>Üretim akışı / 02</Kicker><h2>Önce sorarız.<br />Sonra üretiriz.</h2><p className="kb-process-lead">İyi ambalaj, makinede değil doğru soruyla başlar. Her işi aynı üretim disipliniyle görünür adımlara ayırıyoruz.</p></div><div className="kp-process-grid">{process.map(([Icon, number, title, text]) => <article className="kp-process-step" key={number}><span className="kp-process-number">{number}</span><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="kp-section kp-paper-grid kb-sector-index"><div className="kp-container"><SectionTitle kicker="Kullanım alanları / 03" title="Sektör değil, koşul belirler." description="İstif yüksekliği, nem, taşıma biçimi ve ürün hassasiyeti… Ambalaj kararını gerçek kullanım koşullarıyla veriyoruz." action={{ href: "/sektorel-cozumler", label: "Çözüm alanları" }} /><div className="kp-sector-row">{sectors.map(([Icon, title, image]) => <Link className="kp-sector-tile" href="/sektorel-cozumler" key={title}><KraftImage src={image} alt={`${title} ambalaj çözümü`} /><span><Icon size={19} />{title}<ArrowRight size={15} /></span></Link>)}</div></div></section>

    <section className="kp-factory-band"><div className="kp-container kp-factory-layout"><div className="kp-factory-copy"><Kicker>Fabrika notları / 04</Kicker><h2>Üretim sahası konuşur.</h2><p>Gerçek üretim görüntüleri, gerçek süreçler ve ölçülebilir kontrol noktaları. Gösterişli vaatler yerine düzenli üretim sunuyoruz.</p><Link className="kp-button kp-button-yellow" href="/uretim-kalite">Süreci Görün<ArrowRight size={17} /></Link></div><div className="kp-factory-images"><KraftImage src="/media/kaybaks-video-2.png" alt="KAYBAKS oluklu mukavva üretim hattı" /><KraftImage src="/media/kaybaks-video-3-hd.jpg" alt="KAYBAKS üretim makinesi" width={1920} height={1440} /><KraftImage src="/media/kaybaks-video-4.png" alt="Üretim alanında oluklu mukavva" /></div></div></section>
    <QuoteBand title="Kutuyu değil, ihtiyacı tarif ederek başlayın." />
  </>;
}
