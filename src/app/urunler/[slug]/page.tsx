import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowRight, Boxes, Ruler, ShieldCheck } from "lucide-react";
import { products as catalogProducts } from "@/data/products";
import { getProduct, getProducts } from "@/lib/content-store";
import { CheckList, KraftImage, ProductCard, QuoteBand, type CardProduct } from "@/components/ui/kraft";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl, createPageMetadata, siteUrl } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

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

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [managed, catalog] = await Promise.all([
    getProduct(slug),
    Promise.resolve(catalogProducts.find((item) => item.slug === slug)),
  ]);
  const title = managed?.name || catalog?.name;
  if (!title) return { title: "Ürün Bulunamadı", robots: { index: false, follow: false } };
  const description = managed?.shortDescription || catalog?.shortDescription || `${title} hakkında ürün bilgileri.`;
  const image = fallbackImages[slug] || catalog?.media[0] || managed?.imageUrl;
  return createPageMetadata({
    title,
    description: `${description} Kayseri KAYBAKS üretim seçeneklerini ve kullanım alanlarını inceleyin.`,
    path: `/urunler/${slug}`,
    image,
    keywords: [title, `${title} üretimi`, `${title} Kayseri`, "oluklu mukavva kutu"],
  });
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const [managed, allManaged] = await Promise.all([getProduct(slug), getProducts()]);
  const catalog = catalogProducts.find((item) => item.slug === slug);
  if ((!managed || !managed.isActive) && !catalog) notFound();

  const title = managed?.name || catalog?.name || "Ürün";
  const category = managed?.category || catalog?.category || "Kutu Çözümleri";
  const shortDescription = managed?.shortDescription || catalog?.shortDescription || "";
  const description = managed?.description || catalog?.description || shortDescription;
  const primaryImage = fallbackImages[slug] || catalog?.media[0] || managed?.imageUrl || "/media/enhanced/normal-box-and-sheets-hd.jpg";
  const media = catalog?.media?.length ? catalog.media : [primaryImage, "/media/enhanced/box-types-hd.jpg", "/media/enhanced/corrugated-layers-hd.jpg"];
  const useCases = catalog?.useCases || ["Genel sevkiyat", "Depolama", "Ürün paketleme"];
  const features = catalog?.features || ["İhtiyaca göre ölçü", "Planlı üretim", "Kullanım amacına uygun yapı"];
  const advantages = catalog?.advantages || ["Pratik kullanım", "Düzenli istifleme", "Kurumsal sevkiyat uyumu"];
  const related: CardProduct[] = allManaged.filter((item) => item.slug !== slug).slice(0, 3).map((item) => ({ slug: item.slug, title: item.name, description: item.shortDescription, category: item.category, image: fallbackImages[item.slug] || item.imageUrl || "/media/enhanced/normal-box-and-sheets-hd.jpg" }));

  const productSchema = {
    "@type": "Product",
    "@id": `${absoluteUrl(`/urunler/${slug}`)}#product`,
    name: title,
    description,
    category,
    url: absoluteUrl(`/urunler/${slug}`),
    image: media.slice(0, 3).map(absoluteUrl),
    brand: { "@type": "Brand", name: "KAYBAKS" },
    manufacturer: { "@id": `${siteUrl}/#organization` },
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: absoluteUrl("/") },
      { "@type": "ListItem", position: 2, name: "Ürünler", item: absoluteUrl("/urunler") },
      { "@type": "ListItem", position: 3, name: title, item: absoluteUrl(`/urunler/${slug}`) },
    ],
  };

  return <>
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [productSchema, breadcrumbSchema] }} />
    <section className="kb3-detail-hero"><div className="kp-container"><nav className="kb3-breadcrumbs" aria-label="Sayfa yolu"><Link href="/">Ana Sayfa</Link><span>/</span><Link href="/urunler">Ürünler</Link><span>/</span><b>{title}</b></nav><div className="kb3-detail-grid"><div><p className="kb3-eyebrow">{category}</p><h1>{title}</h1><p>{shortDescription}</p><Link className="kp-button kp-button-yellow" href={`/iletisim?urun=${encodeURIComponent(title)}#teklif`}>Teklif alın<ArrowRight size={17} /></Link></div><figure><KraftImage src={primaryImage} alt={title} priority /><figcaption>Ölçü ve gramaj ihtiyaca göre belirlenir</figcaption></figure></div></div></section>

    <section className="kp-section kb3-detail-info"><div className="kp-container"><header className="kb3-section-head"><div><small>ÜRÜN BİLGİSİ / 01</small><h2>{title}</h2></div><p>{description}</p></header><div className="kb3-detail-columns"><article><Ruler /><h3>Kullanım alanları</h3><CheckList items={useCases} /></article><article><Boxes /><h3>Özellikler</h3><CheckList items={features} /></article><article><ShieldCheck /><h3>Avantajları</h3><CheckList items={advantages} /></article></div></div></section>

    <section className="kp-section kb3-detail-gallery"><div className="kp-container"><header className="kb3-section-head kb3-section-head-light"><div><small>GÖRSELLER / 02</small><h2>Ürün ve yapı detayları</h2></div><p>Görseller doğal oranlarında, kırpılmadan gösterilir.</p></header><div>{media.slice(0, 3).map((image, index) => <figure key={`${image}-${index}`}><KraftImage src={image} alt={`${title} görünümü ${index + 1}`} /><figcaption>{index === 0 ? "Ürün görünümü" : index === 1 ? "Alternatif yapı" : "Malzeme detayı"}</figcaption></figure>)}</div></div></section>

    <section className="kp-section kb3-related"><div className="kp-container"><header className="kb3-section-head"><div><small>DİĞER ÜRÜNLER / 03</small><h2>Yakın ürün grupları</h2></div></header><div className="kp-product-grid kp-related-products">{related.map((product) => <ProductCard key={product.slug} product={product} />)}</div></div></section>
    <QuoteBand title={`${title} için ölçü, adet ve kullanım bilgilerini paylaşın.`} product={title} />
  </>;
}
