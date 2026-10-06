import Link from "next/link";
import { ArrowRight, Box, ClipboardCheck, Factory, PackageCheck } from "lucide-react";
import { getProducts } from "@/lib/content-store";
import { KraftImage, Kicker, QuoteBand, type CardProduct } from "@/components/ui/kraft";
import { KraftProductFilter } from "@/components/ui/kraft-product-filter";

export const dynamic = "force-dynamic";

const fallbackImages: Record<string, string> = {
  "oluklu-mukavva-levha": "/media/products/corrugated-sheet.png", "normal-kutu": "/media/products/standard-box.png", "teleskopik-kutu": "/media/products/telescope-box.png", "kalip-kesim-kutu": "/media/products/die-cut-box.png", ondule: "/media/products/ondule-products.png", "demonte-mobilya-kutulari": "/media/products/furniture-box.png", "ozel-olcu-kutu": "/media/products/custom-size-box.png", "ozel-tasarim-ambalaj": "/media/products/premium-packaging.png",
};

const guide = [
  [Box, "İhtiyacınızı belirleyin", "Ürününüzü ve kullanım amacını bize anlatın."],
  [ClipboardCheck, "Uygun çözümü önerelim", "Sektör deneyimimizle doğru formu belirleyelim."],
  [PackageCheck, "Numune ile test edin", "İhtiyacınıza göre numune çalışması planlayalım."],
  [Factory, "Üretime geçelim", "Onay sonrası planlanan süreçlerle üretelim."],
] as const;

export default async function ProductsPage() {
  const managed = await getProducts();
  const products: CardProduct[] = managed.map((product) => ({ slug: product.slug, title: product.name, description: product.shortDescription, category: product.category, image: product.imageUrl || fallbackImages[product.slug] || "/media/products/standard-box.png" }));
  const sculpture = products.slice(0, 5);
  return <>
    <section className="kp-catalog-hero kp-paper-grid"><div className="kp-container kp-catalog-hero-grid"><div><Kicker>Ürünlerimiz</Kicker><h1>Ürününüz için<br /><span>doğru formu keşfedin.</span></h1><p>Farklı sektörlerin ihtiyaçlarına uygun oluklu mukavva, kutu ve özel tasarım ambalaj çözümleri.</p></div><div className="kp-product-sculpture">{sculpture.map((product, index) => <KraftImage key={product.slug} className={`kp-sculpture-${index + 1}`} src={product.image} alt={product.title} />)}</div></div></section>
    <section className="kp-section"><div className="kp-container"><KraftProductFilter products={products} /></div></section>
    <section className="kp-dark-section"><div className="kp-container kp-guide-layout"><div><Kicker light>Doğru ürünü seçin</Kicker><h2>İhtiyacınıza uygun çözümü birlikte bulalım.</h2><p>Ürününüzü, sektörünüzü ve lojistik koşullarınızı anlayarak en uygun ambalajı belirleyelim.</p><Link className="kp-button kp-button-yellow" href="/iletisim#teklif">Teklif Al<ArrowRight size={17} /></Link></div><div className="kp-guide-steps">{guide.map(([Icon, title, text], index) => <article key={title}><span>{index + 1}</span><Icon /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
    <QuoteBand />
  </>;
}
