import Image from "next/image";
import {
  Award,
  Eye,
  Factory,
  Flag,
  Handshake,
  Lightbulb,
  Package,
  Rocket,
  Settings,
  ShieldCheck,
  Star,
  Target,
  Users,
} from "lucide-react";
import { CTA, SectionHead } from "@/components/ui/kaybaks-blocks";
import { getSettings } from "@/lib/content-store";

export const dynamic = "force-dynamic";

const history = [
  [1989, Flag, "KAYBAKS, Kayseri’de küçük bir atölye ile kuruldu."],
  [1995, Package, "Oluklu mukavva üretimine yatırım yapıldı."],
  [2005, Factory, "Kapalı üretim alanımız 10.000 m²’ye çıkarıldı."],
  [2012, Settings, "Modern üretim hatlarımız devreye alındı."],
  [2018, Award, "Bölgesinde lider, Türkiye çapında büyüyen marka."],
  ["2024+", Rocket, "Sürdürülebilir üretim ve dijitalleşme yatırımları."],
];
const values = [
  [Award, "Kalite", "En yüksek kalite standartlarında üretim yaparız."],
  [
    Handshake,
    "Güven",
    "Söz verdiğimizde, zamanında ve eksiksiz teslim ederiz.",
  ],
  [
    Lightbulb,
    "Yenilik",
    "Teknolojiyi ve yenilikleri üretimimize entegre ederiz.",
  ],
  [Star, "Sürdürülebilirlik", "Doğaya ve topluma sorumlu üretim anlayışı."],
  [
    Users,
    "Müşteri Odaklılık",
    "İş ortaklarımızın başarısı için özelleştirilmiş çözümler.",
  ],
  [Users, "Ekip Ruhu", "Birlikte üretir, birlikte büyür ve başarırız."],
];

export default async function CorporatePage() {
  const settings = await getSettings();
  const managedMetrics = [
    settings.experience_years || "35+",
    settings.production_area || "10.000 m²",
    settings.customer_count || "500+",
    settings.project_count || "724+",
  ];
  return (
    <>
      <section className="inner-hero">
        <div className="container inner-hero-grid">
          <div>
            <div className="breadcrumbs">
              <span>Ana Sayfa</span>
              <span>/</span>
              <strong>Kurumsal</strong>
            </div>
            <h1>KAYBAKS Hakkında</h1>
            <p>
              1989 yılından bu yana oluklu mukavva ve ambalaj çözümlerimizle, iş
              ortaklarımızın ürünlerini güvenle taşıyor; sürdürülebilir ve
              yenilikçi üretim anlayışımızla değer katıyoruz.
            </p>
          </div>
          <div className="inner-visual">
            <div className="yellow-corner" />
            <div className="factory-photo" />
          </div>
        </div>
        <div className="container metrics">
          {[
            ["35+", "Yıllık Deneyim", Award],
            ["10.000 m²", "Kapalı Üretim Alanı", Factory],
            ["500+", "Mutlu Müşteri", Users],
            ["724+", "Başarılı Proje", Star],
          ].map(([n, t, I], index) => {
            const Icon = I as typeof Award;
            return (
              <div className="metric-card" key={t as string}>
                <div className="icon-circle">
                  <Icon size={20} />
                </div>
                <div>
                  <strong>{managedMetrics[index] || (n as string)}</strong>
                  <span>{t as string}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <section className="section">
        <div className="container two-col">
          <div className="content-block">
            <span className="kicker">Hakkımızda</span>
            <h2>
              Ambalajda Güven,
              <br />
              Üretimde Mükemmellik
            </h2>
            <p>
              KAYBAKS, 1989 yılında Kayseri’de kurulmuştur. Oluklu mukavva ve
              kutu üretiminde kaliteyi, teknolojiyi ve müşteri memnuniyetini
              odağına alarak sektörde güçlü bir konuma ulaşmıştır.
            </p>
            <p>
              Modern üretim tesisimiz, deneyimli kadromuz ve sürdürülebilir
              üretim anlayışımızla; ülkemizin dört bir yanına güvenilir ambalaj
              çözümleri sunuyoruz.
            </p>
          </div>
          <div className="info-cards" id="vizyon">
            <div className="info-card">
              <div className="icon-circle">
                <Eye />
              </div>
              <h3>Vizyonumuz</h3>
              <p>
                Ambalaj sektöründe yenilikçi çözümlerimizle bölgesinde lider,
                Türkiye’de tercih edilen ve dünyada bilinen bir marka olmak.
              </p>
            </div>
            <div className="info-card">
              <div className="icon-circle">
                <Target />
              </div>
              <h3>Misyonumuz</h3>
              <p>
                Müşterilerimize en kaliteli ürünleri, zamanında ve
                sürdürülebilir şekilde sunarak iş ortaklarımızın başarısına
                değer katmak.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="section-sm soft-section">
        <div className="container">
          <SectionHead kicker="Tarihçemiz" title="Yolculuğumuz" />
          <div className="history">
            {history.map(([year, I, text]) => {
              const Icon = I as typeof Flag;
              return (
                <div className="history-item" key={String(year)}>
                  <div className="icon-circle">
                    <Icon size={19} />
                  </div>
                  <strong>{String(year)}</strong>
                  <p>{text as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <SectionHead kicker="Değerlerimiz" title="İlkelerimiz, Gücümüz" />
          <div className="values-grid">
            {values.map(([I, t, p]) => {
              const Icon = I as typeof Award;
              return (
                <div className="value-card" key={t as string}>
                  <div className="icon-circle">
                    <Icon size={22} />
                  </div>
                  <h3>{t as string}</h3>
                  <p>{p as string}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="section-sm">
        <div className="container">
          <SectionHead kicker="Üretimimiz" title="Modern Tesis, Güçlü Üretim" />
          <div
            className="factory-gallery"
            style={{ gridTemplateColumns: "2fr 2fr 1.6fr 1.6fr" }}
          >
            <Image
              src="/media/kaybaks-video-2.png"
              alt="Üretim"
              width={600}
              height={350}
            />
            <Image
              src="/media/kaybaks-video-4.png"
              alt="Üretim hattı"
              width={600}
              height={350}
            />
            <Image
              src="/media/products/corrugated-sheet.png"
              alt="Mukavva"
              width={500}
              height={350}
            />
            <Image
              src="/media/kaybaks-video-5.png"
              alt="Depo"
              width={500}
              height={350}
            />
          </div>
        </div>
      </section>
      <CTA compact />
    </>
  );
}
