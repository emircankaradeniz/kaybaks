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
  [Box, "02", "Tasarım & Numune", "Doğru formu, ölçüyü ve malzeme yapısını belirliyoruz."],
  [Factory, "03", "Üretim", "Planlanan özelliklerde kontrollü üretim yapıyoruz."],
  [ClipboardCheck, "04", "Kalite Kontrol", "Ölçü, form ve üretim uygunluğunu kontrol ediyoruz."],
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
    <section className="kp-home-hero kp-paper-grid">
      <div className="kp-container kp-home-hero-grid">
        <div className="kp-home-copy"><Kicker>Kayseri merkezli ambalaj üretimi</Kicker><h1>Ambalajın<br /><span>Güçlü <br className="kp-mobile-break" />Formu</span></h1><p>Ürününüz için doğru form, doğru dayanım. Oluklu mukavva, kutu ve özel ambalaj ihtiyaçlarınızı üretim disipliniyle çözüyoruz.</p><div className="kp-actions"><Link className="kp-button kp-button-yellow" href="/urunler">Ürünleri Keşfet<ArrowRight size={17} /></Link><Link className="kp-button kp-button-outline" href="/uretim-kalite">Üretimi Yakından Tanı<ArrowRight size={17} /></Link></div><div className="kp-hero-points"><span><Ruler />Doğru malzeme seçimi</span><span><Boxes />İhtiyaca özel üretim</span><span><PackageCheck />Güvenli paketleme</span></div></div>
        <div className="kp-hero-product" aria-label="Oluklu mukavva ürün görseli"><KraftImage className="kp-hero-sheets" src="/media/products/hero-sheets-cutout.png" alt="Katmanlı oluklu mukavva levhalar" width={1390} height={615} priority /><KraftImage className="kp-hero-box" src="/media/products/hero-box-branded.png" alt="KAYBAKS oluklu mukavva kutu" width={1403} height={1121} priority /><div className="kp-tech-note kp-tech-note-a"><span />Oluk profili<br />dayanıklılık sağlar</div><div className="kp-tech-note kp-tech-note-b"><span />Çok katmanlı<br />mukavva yapısı</div></div>
      </div>
    </section>

    <section className="kp-section"><div className="kp-container"><SectionTitle kicker="Ürün Gruplarımız" title="İhtiyacınıza göre üretiyoruz." description="Farklı sektörlerin ihtiyaçlarına uygun, dayanıklı ve fonksiyonel ambalaj çözümleri sunuyoruz." action={{ href: "/urunler", label: "Tüm ürünleri gör" }} /><div className="kp-product-grid kp-product-grid-home">{products.slice(0, 4).map((product) => <ProductCard key={product.slug} product={product} />)}</div></div></section>

    <section className="kp-dark-section"><div className="kp-container kp-process-layout"><div><Kicker light>Nasıl çalışıyoruz?</Kicker><h2>Beş adımda<br />ambalaja hayat veriyoruz.</h2></div><div className="kp-process-grid">{process.map(([Icon, number, title, text]) => <article className="kp-process-step" key={number}><span className="kp-process-number">{number}</span><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

    <section className="kp-section kp-paper-grid"><div className="kp-container"><SectionTitle kicker="Sektörel Çözümler" title="Her sektör için doğru ambalaj." description="Ürününüzün kullanım ve sevkiyat koşullarına göre doğru yapıyı birlikte belirliyoruz." action={{ href: "/sektorel-cozumler", label: "Tüm sektörler" }} /><div className="kp-sector-row">{sectors.map(([Icon, title, image]) => <Link className="kp-sector-tile" href="/sektorel-cozumler" key={title}><KraftImage src={image} alt={`${title} ambalaj çözümü`} /><span><Icon size={19} />{title}<ArrowRight size={15} /></span></Link>)}</div></div></section>

    <section className="kp-factory-band"><div className="kp-container kp-factory-layout"><div className="kp-factory-copy"><Kicker light>Üretim & Kalite</Kicker><h2>Güçlü altyapı,<br />istikrarlı kalite.</h2><p>Ürün formuna, ölçüsüne ve sevkiyat senaryosuna göre planlanan üretim yaklaşımı.</p><Link className="kp-button kp-button-yellow" href="/uretim-kalite">Üretimi Yakından Tanı<ArrowRight size={17} /></Link></div><div className="kp-factory-images"><KraftImage src="/media/kaybaks-video-2.png" alt="KAYBAKS oluklu mukavva üretim hattı" /><KraftImage src="/media/kaybaks-video-3-hd.jpg" alt="KAYBAKS üretim makinesi" width={1920} height={1440} /><KraftImage src="/media/kaybaks-video-4.png" alt="Üretim alanında oluklu mukavva" /></div></div></section>
    <QuoteBand title="Teklif sürecini birlikte başlatalım." />
  </>;
}
