import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  PackageCheck,
  Recycle,
  Ruler,
  ShieldCheck,
} from "lucide-react";

export type DisplayProduct = {
  slug: string;
  title: string;
  text: string;
  crop: number[];
  imageUrl?: string;
};

export const productItems: DisplayProduct[] = [
  {
    slug: "oluklu-mukavva-levha",
    title: "Oluklu Mukavva Levha",
    text: "Farklı kalınlık ve dalga tiplerinde mukavva levha çözümleri.",
    crop: [67, 728],
  },
  {
    slug: "normal-kutu",
    title: "Normal Kutu",
    text: "Standart ölçülerde dayanıklı ve ekonomik kutular.",
    crop: [269, 728],
  },
  {
    slug: "kalip-kesim-kutu",
    title: "Kalıp Kesim Kutu",
    text: "Özel kesim, baskılı ve kreatif kutu çözümleri.",
    crop: [472, 728],
  },
  {
    slug: "teleskopik-kutu",
    title: "Teleskopik Kutu",
    text: "İç içe geçen yapısıyla ekstra koruma sağlar.",
    crop: [675, 728],
  },
  {
    slug: "ondule",
    title: "Ondüle",
    text: "Esnek ve koruyucu ondüle malzeme çözümleri.",
    crop: [67, 984],
  },
  {
    slug: "demonte-mobilya-kutulari",
    title: "Demonte Mobilya Kutuları",
    text: "Mobilya ve parçalar için özel ölçü ve dayanıklılık.",
    crop: [338, 984],
  },
  {
    slug: "ozel-tasarim-ambalaj",
    title: "Özel Tasarım Ambalaj",
    text: "Markanıza özel tasarım ambalaj çözümleri.",
    crop: [629, 984],
  },
];

export function SectionHead({
  kicker,
  title,
  description,
}: {
  kicker?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-head">
      {kicker && <span className="kicker">{kicker}</span>}
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export function ProductImage({
  crop,
  className = "",
}: {
  crop: number[];
  className?: string;
}) {
  return (
    <div
      aria-hidden
      className={`product-crop ${className}`}
      style={{
        backgroundImage: "url('/reference/urunler.png')",
        backgroundSize: "935px 1683px",
        backgroundPosition: `-${crop[0]}px -${crop[1]}px`,
        backgroundRepeat: "no-repeat",
      }}
    />
  );
}

export function ProductCardCode({ item }: { item: DisplayProduct }) {
  return (
    <article className="product-card">
      {item.imageUrl ? (
        <img src={item.imageUrl} alt={item.title} />
      ) : (
        <ProductImage crop={item.crop} />
      )}
      <div className="product-card-body">
        <h3>{item.title}</h3>
        <p>{item.text}</p>
        <Link className="arrow-link" href={`/urunler/${item.slug}`}>
          İncele <ArrowRight size={12} />
        </Link>
      </div>
    </article>
  );
}

export function CTA({ compact = false }: { compact?: boolean }) {
  return (
    <section className={compact ? "section-sm" : "section"}>
      <div className="container">
        <div className="cta-band">
          <div>
            <h2>
              İşinizi Birlikte
              <br />
              Güçlendirelim
            </h2>
            <p>İhtiyacınıza özel ambalaj çözümleri için hemen teklif alın.</p>
          </div>
          <div>
            <Link className="btn btn-primary" href="/iletisim#teklif">
              Hemen Teklif Alın <ArrowRight size={14} />
            </Link>
            <div className="cta-benefits" style={{ marginTop: 13 }}>
              <span>✓ Hızlı Dönüş</span>
              <span>✓ Ücretsiz Danışmanlık</span>
            </div>
          </div>
          <div className="cta-image">
            <ProductImage crop={[675, 728]} />
          </div>
        </div>
      </div>
    </section>
  );
}

export const keyFeatures = [
  {
    icon: Ruler,
    title: "Özel Ölçü Üretim",
    text: "İhtiyacınıza özel ölçü ve modelde kutular üretiyoruz.",
  },
  {
    icon: Clock3,
    title: "Zamanında Teslimat",
    text: "Planlı üretim ve güçlü lojistik ile zamanında teslim.",
  },
  {
    icon: ShieldCheck,
    title: "Dayanıklı Ambalaj",
    text: "Üstün mukavemetli malzemelerle ürünlerinizi koruyoruz.",
  },
  {
    icon: PackageCheck,
    title: "Hızlı Teklif",
    text: "İhtiyacınızı iletin, en kısa sürede size dönüş yapalım.",
  },
];

export const benefitItems = [
  {
    icon: Recycle,
    title: "Sürdürülebilir",
    text: "%100 geri dönüştürülebilir ve çevre dostu malzeme.",
  },
  {
    icon: PackageCheck,
    title: "Maliyet Avantajı",
    text: "Hafif yapısı ile taşıma ve depolama maliyetini düşürür.",
  },
  {
    icon: ShieldCheck,
    title: "Yüksek Koruma",
    text: "Ürünlerinizi darbelere ve dış etkenlere karşı korur.",
  },
  {
    icon: Ruler,
    title: "Esnek Üretim",
    text: "Farklı ölçü, gramaj ve oluk tiplerine göre üretim imkanı.",
  },
  {
    icon: PackageCheck,
    title: "Geniş Uygulama",
    text: "Birçok sektöre uygun çok yönlü kullanım.",
  },
];
