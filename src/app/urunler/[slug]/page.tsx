import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  PackageCheck,
  Recycle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import {
  benefitItems,
  ProductCardCode,
  productItems,
  ProductImage,
  SectionHead,
  type DisplayProduct,
} from "@/components/ui/kaybaks-blocks";
import { getProduct, getProducts } from "@/lib/content-store";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

function ProductVisual({ item }: { item: DisplayProduct }) {
  if (item.imageUrl) {
    return (
      <img
        src={item.imageUrl}
        alt={item.title}
        style={{ width: "100%", height: "100%", objectFit: "contain" }}
      />
    );
  }
  return <ProductImage crop={item.crop} />;
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const [managedProduct, allProducts] = await Promise.all([
    getProduct(slug),
    getProducts(),
  ]);
  if (!managedProduct || !managedProduct.isActive) notFound();

  const product: DisplayProduct = {
    slug: managedProduct.slug,
    title: managedProduct.name,
    text: managedProduct.shortDescription,
    crop: [managedProduct.cropX, managedProduct.cropY],
    imageUrl: managedProduct.imageUrl,
  };
  const related: DisplayProduct[] = allProducts
    .filter((item) => item.slug !== slug)
    .slice(0, 5)
    .map((item) => ({
      slug: item.slug,
      title: item.name,
      text: item.shortDescription,
      crop: [item.cropX, item.cropY],
      imageUrl: item.imageUrl,
    }));
  const special =
    managedProduct.category === "Özel Tasarım" ||
    slug === "ozel-tasarim-ambalaj";
  const description =
    managedProduct.description || managedProduct.shortDescription;

  return (
    <>
      <section className="product-detail-hero">
        <div className="container">
          <div className="breadcrumbs">
            <span>Ana Sayfa</span>
            <span>/</span>
            <span>Ürünler</span>
            <span>/</span>
            <strong>{product.title}</strong>
          </div>
          <div className="detail-grid">
            <div className="detail-image">
              <ProductVisual item={product} />
            </div>
            <div className="detail-copy">
              <span className="eyebrow">{managedProduct.category}</span>
              <h1>{product.title}</h1>
              <p>{product.text}</p>
              <div className="detail-meta">
                <div>
                  <Recycle size={20} />
                  <br />
                  Geri Dönüşümlü
                </div>
                <div>
                  <ShieldCheck size={20} />
                  <br />
                  Yüksek Dayanıklılık
                </div>
                <div>
                  <PackageCheck size={20} />
                  <br />
                  Hafif ve Ekonomik
                </div>
                <div>
                  <Sparkles size={20} />
                  <br />
                  Çevre Dostu
                </div>
              </div>
              {!special && (
                <>
                  <strong style={{ fontSize: 10 }}>Oluk Tipleri</strong>
                  <div className="filter-bar" style={{ margin: "8px 0 14px" }}>
                    {["E", "B", "C", "BC", "EB"].map((item) => (
                      <span
                        className="filter-pill"
                        style={{ padding: "5px 15px" }}
                        key={item}
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </>
              )}
              <div className="hero-actions">
                <Link className="btn btn-primary" href="/iletisim#teklif">
                  Teklif Al
                </Link>
                <Link className="btn btn-outline" href="/iletisim">
                  Teknik Bilgi Formu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <nav className="tabs container">
        <a href="#ozellikler">Ürün Özellikleri</a>
        <a href="#kullanim">Kullanım Alanları</a>
        <a href="#avantajlar">Avantajlar</a>
        <a href="#teknik">Teknik Özellikler</a>
      </nav>

      <section className="section-sm" id="ozellikler">
        <div className="container detail-content">
          <div className="content-block">
            <h2>
              {special
                ? "Markanıza Değer Katan Özel Tasarım"
                : "Ürün Özellikleri"}
            </h2>
            <p>{description}</p>
            <ul className="check-list">
              <li>Farklı ölçü ve gramaj seçenekleri</li>
              <li>Yüksek baskı kalitesi</li>
              <li>Darbe ve sıkıştırmaya karşı direnç</li>
              <li>Çevre dostu üretim</li>
            </ul>
          </div>
          <div>
            <SectionHead
              title={
                special
                  ? "Marka Baskı Seçenekleri"
                  : "Oluk Tiplerine Göre Yapı Karşılaştırması"
              }
            />
            {special ? (
              <div className="benefits-grid">
                {[
                  "Flekso Baskı",
                  "Ofset Baskı",
                  "Serigrafi Baskı",
                  "Lamine Kaplama",
                  "Gofre & Lak",
                ].map((item) => (
                  <div className="benefit-card" key={item}>
                    <div className="icon-circle">
                      <Sparkles size={20} />
                    </div>
                    <h3>{item}</h3>
                  </div>
                ))}
              </div>
            ) : (
              <div className="comparison">
                {["E Oluk", "B Oluk", "C Oluk", "BC Oluk", "EB Oluk"].map(
                  (item, index) => (
                    <div className="compare-item" key={item}>
                      <ProductImage crop={[67 + (index % 4) * 202, 728]} />
                      <strong>{item}</strong>
                      <p>
                        Kalınlık: ~{1.5 + index}.0 mm
                        <br />
                        Yüksek dayanıklılık
                      </p>
                    </div>
                  ),
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="section-sm soft-section" id="kullanim">
        <div className="container">
          <SectionHead
            title={
              special ? "Özel Tasarım Ambalaj Örnekleri" : "Kullanım Alanları"
            }
            description="Oluklu mukavva ve özel ambalaj çözümleri birçok sektörde güvenle kullanılır."
          />
          <div className="application-grid">
            {[
              "Lojistik & Taşımacılık",
              "Gıda & Tarım",
              "Beyaz Eşya",
              "Mobilya & Ev Eşyaları",
              "İlaç & Kozmetik",
              "E-Ticaret",
            ].map((item, index) => (
              <div className="application-card" key={item}>
                <ProductImage
                  crop={productItems[index % productItems.length].crop}
                />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="avantajlar">
        <div className="container">
          <SectionHead
            title={
              special
                ? "Neden Özel Tasarım Ambalaj?"
                : `Neden ${product.title}?`
            }
          />
          <div className="benefits-grid">
            {benefitItems.map(({ icon: Icon, title, text }) => (
              <article className="benefit-card" key={title}>
                <div className="icon-circle">
                  <Icon size={22} />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm soft-section">
        <div className="container">
          <SectionHead title="İlgili Ürünler" />
          <div className="products-row">
            {related.map((item) => (
              <ProductCardCode key={item.slug} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="section-sm">
        <div className="container">
          <div className="cta-band">
            <div>
              <h2>İhtiyacınıza Uygun Çözüm İçin Hemen Teklif Alın!</h2>
              <p>
                Uzman ekibimiz size en uygun ambalaj çözümünü sunmak için hazır.
              </p>
            </div>
            <div className="cta-benefits">
              <span>Hızlı Geri Dönüş</span>
              <span>Kaliteli Üretim</span>
            </div>
            <Link className="btn btn-primary" href="/iletisim#teklif">
              Teklif Al <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
