import Link from "next/link";
import { ArrowRight, Palette, Ruler, Scale, Truck } from "lucide-react";
import { getProducts } from "@/lib/content-store";
import { KraftImage, QuoteBand, type CardProduct } from "@/components/ui/kraft";
import { KraftProductFilter } from "@/components/ui/kraft-product-filter";

export const dynamic = "force-dynamic";

const fallbackImages: Record<string, string> = {
  "oluklu-mukavva-levha": "/media/supplied/corrugated-layers.png",
  "normal-kutu": "/media/supplied/normal-box-and-sheets.png",
  "teleskopik-kutu": "/media/supplied/box-types.png",
  "kalip-kesim-kutu": "/media/supplied/handled-diecut-box.png",
  ondule: "/media/supplied/flute-types.png",
  "demonte-mobilya-kutulari": "/media/supplied/box-size-variety.png",
  "ozel-olcu-kutu": "/media/supplied/box-types.png",
  "ozel-tasarim-ambalaj": "/media/supplied/diecut-folding-example.png",
};

export default async function ProductsPage() {
  const managed = await getProducts();
  const products: CardProduct[] = managed.map((product) => ({
    slug: product.slug,
    title: product.name,
    description: product.shortDescription,
    category: product.category,
    image: fallbackImages[product.slug] || product.imageUrl || "/media/supplied/normal-box-and-sheets.png",
  }));

  return <>
    <section className="kb3-page-hero kb3-product-hero"><div className="kp-container kb3-page-hero-grid"><div><p className="kb3-eyebrow">ÜRÜNLER</p><h1>Levhadan özel kutuya, ihtiyacınıza göre üretim.</h1><p>Ölçü, gramaj, dalga tipi, kalıp ve baskı seçeneklerini ürününüzün kullanım koşullarına göre birlikte belirliyoruz.</p><Link className="kp-button kp-button-yellow" href="/iletisim#teklif">Ürün için teklif alın<ArrowRight size={17} /></Link></div><figure><KraftImage src="/media/supplied/box-types.png" alt="KAYBAKS kutu çeşitleri" width={678} height={452} priority /><figcaption>Normal · Teleskopik · Kalıp kesim · Özel ölçü</figcaption></figure></div></section>

    <section className="kb3-product-criteria"><div className="kp-container"><span><Ruler />Ölçü</span><span><Scale />Gramaj ve katman</span><span><Palette />Tam renk klişe baskı</span><span><Truck />Sevkiyat koşulu</span></div></section>

    <section className="kp-section kb3-catalog"><div className="kp-container"><header className="kb3-section-head"><div><small>ÜRÜN KATALOĞU / 01</small><h2>Üretim grupları</h2></div><p>Ürün kartlarını kategoriye göre filtreleyebilir, detay sayfasından kullanım ve teknik özellikleri inceleyebilirsiniz.</p></header><KraftProductFilter products={products} /></div></section>

    <section className="kp-section kb3-product-technical"><div className="kp-container kb3-product-technical-grid"><div><p className="kb3-eyebrow">MALZEME / 02</p><h2>Tek dalgadan üç dalgaya</h2><p>Sırtı açık, tek dalga, çift dalga ve üç dalga levha seçenekleri; ürünün koruma, istifleme ve taşıma ihtiyacına göre değerlendirilir.</p><Link className="kp-button kp-button-outline" href="/uretim-kalite">Teknik bilgi<ArrowRight size={17} /></Link></div><KraftImage src="/media/supplied/corrugated-layers.png" alt="Oluklu mukavva katman seçenekleri" width={539} height={568} /></div></section>
    <QuoteBand />
  </>;
}
