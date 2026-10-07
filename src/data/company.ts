import {
  ArrowRightLeft,
  BadgeCheck,
  Boxes,
  ClipboardCheck,
  Factory,
  PackageCheck,
} from "lucide-react";

export const company = {
  name: "KAYBAKS Oluklu Mukavva",
  legalName:
    "KAYBAKS Oluklu Mukavva İnşaat ve Çevre Teknolojileri San. Tic. Ltd. Şti.",
  shortName: "KAYBAKS",
  siteUrl: "https://kaybaks.com.tr",
  email: "info@kaybaks.com.tr",
  phone: "+90 352 322 28 01",
  phoneHref: "+903523222801",
  addressLine: "Karpuzsekisi Mah. 22. Cadde No: 22, 1. Organize Sanayi Bölgesi",
  locality: "Melikgazi",
  region: "Kayseri",
  postalCode: "38070",
  country: "TR",
  mapQuery: "KAYBAKS Oluklu Mukavva Karpuzsekisi Mahallesi 22. Cadde No 22 Melikgazi Kayseri",
  hours: [
    "Hafta içi 08:30 - 18:00",
    "Cumartesi 08:30 - 13:00",
  ],
  description:
    "Kayseri merkezli oluklu mukavva, karton kutu ve özel ölçü ambalaj çözümleri.",
  youtube: "https://www.youtube.com/@kaybaksoluklu6183",
};

export const primaryNav = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/kurumsal", label: "Kurumsal" },
  { href: "/urunler", label: "Ürünlerimiz" },
  { href: "/sektorel-cozumler", label: "Sektörel Çözümler" },
  { href: "/uretim-kalite", label: "Üretim & Kalite" },
  { href: "/iletisim", label: "İletişim" },
];

export const footerGroups = [
  {
    title: "Kurumsal",
    links: [
      { href: "/kurumsal", label: "Hakkımızda" },
      { href: "/uretim-kalite", label: "Üretim & Kalite" },
      { href: "/sektorel-cozumler", label: "Sektörel Çözümler" },
      { href: "/iletisim", label: "İletişim" },
    ],
  },
  {
    title: "Ürünler",
    links: [
      { href: "/urunler/oluklu-mukavva-levha", label: "Oluklu Mukavva Levha" },
      { href: "/urunler/normal-kutu", label: "Normal Kutu" },
      { href: "/urunler/kalip-kesim-kutu", label: "Kalıp Kesim Kutu" },
      { href: "/urunler/ozel-tasarim-ambalaj", label: "Özel Tasarım Ambalaj" },
    ],
  },
];

export const homeHighlights = [
  {
    title: "Kaliteli Üretim",
    description:
      "Ürünün taşınma ve istiflenme koşullarına göre kutu tipinin planlandığı üretim disiplini.",
    icon: Factory,
  },
  {
    title: "Özel Ölçü Çözümleri",
    description:
      "Standart dışı ürünler için ölçüye göre kutu, levha ve özel tasarım seçenekleri.",
    icon: Boxes,
  },
  {
    title: "Zamanında Teslimat",
    description:
      "Planlanan termin doğrultusunda sevkiyat sürecine odaklanan yalın üretim akışı.",
    icon: ArrowRightLeft,
  },
  {
    title: "Müşteri Odaklı Üretim",
    description:
      "Tekliften sevkiyata kadar aynı kurumsal dilde ilerleyen çözüm partnerliği yaklaşımı.",
    icon: PackageCheck,
  },
];

export const productionSteps = [
  { number: "01", title: "İhtiyacın Belirlenmesi", body: "Ürün formu, ölçü ve kullanım senaryosu netleştirilir." },
  { number: "02", title: "Tasarım & Ölçülendirme", body: "Kutu yapısı, kesim ve baskı ihtiyaçları teknik olarak planlanır." },
  { number: "03", title: "Üretim", body: "Oluklu mukavva levha ve kutu üretimi seçilen formata göre işlenir." },
  { number: "04", title: "Kalite Kontrol", body: "Ebat, form ve genel üretim uygunluğu kontrol edilir." },
  { number: "05", title: "Sevkiyat", body: "Hazırlanan ürünler teslimat planına göre sevk edilir." },
];

export const whyKaybaks = [
  {
    title: "İhtiyaca Özel Üretim",
    description:
      "Standart kalıpların ötesine geçen ölçü ve kullanım ihtiyaçları için esnek ürün kurgusu.",
    icon: Boxes,
  },
  {
    title: "Dayanıklı Ambalaj",
    description:
      "Depolama ve taşıma senaryolarına göre uygun yapı seçimi ile koruyucu ambalaj yaklaşımı.",
    icon: BadgeCheck,
  },
  {
    title: "Farklı Ölçü Seçenekleri",
    description:
      "Levha, normal kutu, teleskopik kutu ve kalıp kesim kutu tiplerinde farklı ölçü esnekliği.",
    icon: Factory,
  },
  {
    title: "Kalite Kontrol",
    description:
      "Üretim uygunluğunu ve sevkiyat öncesi kontrol akışını görünür kılan kurumsal süreç.",
    icon: ClipboardCheck,
  },
  {
    title: "Hızlı Teklif",
    description:
      "Ürün bilgisi ve ihtiyaç detayları üzerinden hızlı geri dönüşe uygun teklif yapısı.",
    icon: PackageCheck,
  },
  {
    title: "Profesyonel Üretim",
    description:
      "B2B sipariş süreçlerine uygun, düzenli ve sade bir üretim iletişimi.",
    icon: ArrowRightLeft,
  },
];

export const galleryItems = [
  {
    src: "/media/enhanced/kaybaks-factory-hd.jpg",
    alt: "KAYBAKS Kayseri üretim tesisi",
    title: "Kayseri Üretim Tesisi",
  },
  {
    src: "/media/enhanced/normal-box-and-sheets-hd.jpg",
    alt: "Normal kutu ve oluklu mukavva levhalar",
    title: "Normal Kutu ve Levha",
  },
  {
    src: "/media/enhanced/handled-diecut-box-hd.jpg",
    alt: "Kalıp kesim taşıma kutusu",
    title: "Kalıp Kesim Kutu",
  },
  {
    src: "/media/enhanced/corrugated-layers-hd.jpg",
    alt: "Oluklu mukavva katman yapıları",
    title: "Katman Seçenekleri",
  },
];

export const qualityPillars = [
  {
    title: "Ürün Uygunluğu",
    description: "Ürüne uygun ölçü ve kutu formu belirlenerek israf ve hasar riski azaltılır.",
  },
  {
    title: "Üretim Disiplini",
    description: "Üretim ve sevkiyat planı aynı akışta ele alınarak termin görünürlüğü korunur.",
  },
  {
    title: "Çözüm Esnekliği",
    description: "Levhadan kalıp kesim kutuya kadar farklı tiplerde ambalaj yapısı sunulur.",
  },
  {
    title: "Kurumsal İletişim",
    description: "Teklif, sipariş ve teslim adımları net, sade ve profesyonel bir dille ilerletilir.",
  },
];
