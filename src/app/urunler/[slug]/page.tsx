import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Box, Boxes, PackageCheck, Ruler, ShieldCheck, Truck } from "lucide-react";
import { products as catalogProducts } from "@/data/products";
import { getProduct, getProducts } from "@/lib/content-store";
import { CheckList, KraftImage, Kicker, ProductCard, QuoteBand, type CardProduct } from "@/components/ui/kraft";

type Props = { params: Promise<{ slug: string }> };

const fallbackImages: Record<string, string> = {
  "oluklu-mukavva-levha": "/media/products/corrugated-sheet.png", "normal-kutu": "/media/products/standard-box.png", "teleskopik-kutu": "/media/products/telescope-box.png", "kalip-kesim-kutu": "/media/products/die-cut-box.png", ondule: "/media/products/ondule-products.png", "demonte-mobilya-kutulari": "/media/products/furniture-box.png", "ozel-olcu-kutu": "/media/products/custom-size-box.png", "ozel-tasarim-ambalaj": "/media/products/premium-packaging.png",
};

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const [managed, allManaged] = await Promise.all([getProduct(slug), getProducts()]);
  const catalog = catalogProducts.find((item) => item.slug === slug);
  if ((!managed || !managed.isActive) && !catalog) notFound();
  const title = managed?.name || catalog?.name || "Ürün";
  const category = managed?.category || catalog?.category || "Kutu Çözümleri";
  const shortDescription = managed?.shortDescription || catalog?.shortDescription || "";
  const description = managed?.description || catalog?.description || shortDescription;
  const primaryImage = managed?.imageUrl || catalog?.media[0] || fallbackImages[slug] || "/media/products/standard-box.png";
  const media = catalog?.media?.length ? catalog.media : [primaryImage, "/media/kaybaks-video-2.png", "/media/kaybaks-video-4.png"];
  const useCases = catalog?.useCases || ["Genel sevkiyat", "Depolama", "Ürün paketleme"];
  const features = catalog?.features || ["İhtiyaca göre ölçü", "Planlı üretim", "Kullanım amacına uygun form"];
  const advantages = catalog?.advantages || ["Pratik kullanım", "Düzenli istifleme", "Kurumsal sevkiyat uyumu"];
  const related: CardProduct[] = allManaged.filter((item) => item.slug !== slug).slice(0, 3).map((item) => ({ slug: item.slug, title: item.name, description: item.shortDescription, category: item.category, image: item.imageUrl || fallbackImages[item.slug] || "/media/products/standard-box.png" }));

  return <>
    <section className="kp-product-detail-hero kp-paper-grid"><div className="kp-container"><nav className="kp-breadcrumbs" aria-label="Sayfa yolu"><Link href="/">Ana Sayfa</Link><span>/</span><Link href="/urunler">Ürünler</Link><span>/</span><b>{title}</b></nav><div className="kp-product-detail-grid"><div className="kp-product-detail-copy"><Kicker>{category}</Kicker><h1>{title}</h1><p>{shortDescription}</p><Link className="kp-button kp-button-yellow" href={`/iletisim?urun=${encodeURIComponent(title)}#teklif`}>{title} için teklif al<ArrowRight size={17} /></Link></div><div className="kp-detail-product-stage"><KraftImage src={primaryImage} alt={title} priority /><div className="kp-dimension-line kp-line-width"><span>Ürününüze göre ölçülendirme</span></div><div className="kp-dimension-line kp-line-height" /></div></div></div></section>

    <section className="kp-section-sm"><div className="kp-container kp-product-essentials"><article><Ruler /><h2>Kullanım Alanları</h2><CheckList items={useCases} /></article><article><Boxes /><h2>Özellikler</h2><CheckList items={features} /></article><article><ShieldCheck /><h2>Avantajları</h2><CheckList items={advantages} /></article></div></section>

    <section className="kp-section"><div className="kp-container kp-detail-gallery"><div className="kp-detail-gallery-main"><KraftImage src={media[0]} alt={`${title} ana görünüm`} /></div>{media.slice(1, 5).map((image, index) => <div className="kp-natural-frame" key={`${image}-${index}`}><KraftImage src={image} alt={`${title} detay görünümü ${index + 1}`} /></div>)}</div></section>

    <section className="kp-section kp-paper-grid"><div className="kp-container kp-use-cases"><div><Kicker>Hangi ihtiyaçlara uygun?</Kicker><h2>{title}</h2><p>{description}</p></div>{useCases.map((item, index) => <article key={item}><span>{index === 0 ? <Truck /> : index === 1 ? <Box /> : <PackageCheck />}</span><h3>{item}</h3></article>)}</div></section>

    <section className="kp-section"><div className="kp-container"><div className="kp-related-title"><Kicker>Diğer Ürünler</Kicker><h2>İhtiyacınıza yakın çözümler.</h2></div><div className="kp-product-grid kp-related-products">{related.map((product) => <ProductCard key={product.slug} product={product} />)}</div></div></section>
    <QuoteBand title={`Ürününüz için doğru ölçüyü birlikte belirleyelim.`} product={title} />
  </>;
}
