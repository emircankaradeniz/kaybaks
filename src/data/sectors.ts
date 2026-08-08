export type Sector = {
  slug: string;
  name: string;
  description: string;
  suitableProducts: string[];
};

export const sectors: Sector[] = [
  {
    slug: "mobilya",
    name: "Mobilya",
    description: "Demonte parçalar, yüzey koruması ve düzenli sevkiyat ihtiyacı için kutu ve levha çözümleri.",
    suitableProducts: ["Demonte Mobilya Kutuları", "Oluklu Mukavva Levha", "Özel Ölçü Kutu"],
  },
  {
    slug: "gida",
    name: "Gıda",
    description: "Düzenli istifleme ve sevkiyat akışında kullanılabilecek kutu ve destekleyici ambalaj yapıları.",
    suitableProducts: ["Normal Kutu", "Kalıp Kesim Kutu", "Ondüle Ürünler"],
  },
  {
    slug: "e-ticaret",
    name: "E-Ticaret",
    description: "Farklı ürün gruplarını düzenli paketlemeye ve sevkiyat sırasında korumaya yardımcı kutu kurguları.",
    suitableProducts: ["Normal Kutu", "Özel Ölçü Kutu", "Özel Tasarım Ambalaj"],
  },
  {
    slug: "sanayi",
    name: "Sanayi",
    description: "Parça, ekipman ve farklı boyutlardaki ürünlerin depolama ve taşınmasına uyarlanabilen kutu tipleri.",
    suitableProducts: ["Oluklu Mukavva Levha", "Normal Kutu", "Özel Ölçü Kutu"],
  },
  {
    slug: "otomotiv-yan-sanayi",
    name: "Otomotiv Yan Sanayi",
    description: "Parça bazlı koruma, düzenli ayırma ve seri sevkiyat ihtiyaçları için planlanabilen ambalaj altyapısı.",
    suitableProducts: ["Kalıp Kesim Kutu", "Ondüle Ürünler", "Özel Tasarım Ambalaj"],
  },
  {
    slug: "tekstil",
    name: "Tekstil",
    description: "Toplu paketleme, düzenli taşıma ve ürün formuna göre farklı kutu seçenekleri.",
    suitableProducts: ["Normal Kutu", "Teleskopik Kutu", "Özel Ölçü Kutu"],
  },
  {
    slug: "lojistik",
    name: "Lojistik",
    description: "Depolama, istifleme ve taşıma süreçlerine uygun çok amaçlı kutu ve levha kullanımı.",
    suitableProducts: ["Oluklu Mukavva Levha", "Normal Kutu", "Ondüle Ürünler"],
  },
  {
    slug: "perakende",
    name: "Perakende",
    description: "Raf, sunum ve sevkiyat akışını birlikte düşünmeye uygun ambalaj form alternatifleri.",
    suitableProducts: ["Kalıp Kesim Kutu", "Özel Tasarım Ambalaj", "Teleskopik Kutu"],
  },
];
