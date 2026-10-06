export type Sector = {
  slug: string;
  name: string;
  description: string;
  suitableProducts: string[];
};

export const sectors: Sector[] = [
  { slug: "mobilya", name: "Mobilya", description: "Demonte panel ve parçaların düzenli istiflenmesi ve sevkiyatı için ölçüye göre ambalaj.", suitableProducts: ["Demonte Mobilya Kutuları", "Oluklu Mukavva Levha", "Özel Ölçü Kutu"] },
  { slug: "gida", name: "Gıda", description: "İstifleme ve dağıtım süreçlerine uygun normal, kalıp kesim ve destekleyici ambalajlar.", suitableProducts: ["Normal Kutu", "Kalıp Kesim Kutu", "Ondüle"] },
  { slug: "tekstil", name: "Tekstil", description: "Toplu paketleme, depolama ve düzenli taşıma için farklı ölçülerde kutu seçenekleri.", suitableProducts: ["Normal Kutu", "Teleskopik Kutu", "Özel Ölçü Kutu"] },
  { slug: "beyaz-esya", name: "Beyaz Eşya", description: "Hacimli ve hassas ürünlerde koruma, ara bölme ve dış ambalaj ihtiyacına uygun çözümler.", suitableProducts: ["Oluklu Mukavva Levha", "Özel Ölçü Kutu", "Ondüle"] },
  { slug: "celik-esya", name: "Çelik Eşya", description: "Ağır ve yüzey hassasiyeti bulunan ürünlerde katman ve gramaj ihtiyacına göre ambalaj.", suitableProducts: ["Çift Dalga Levha", "Teleskopik Kutu", "Özel Ölçü Kutu"] },
  { slug: "kimya", name: "Kimya", description: "Ürün biçimi ve taşıma koşullarına göre planlanan dayanıklı kutu ve seperatör çözümleri.", suitableProducts: ["Normal Kutu", "Kalıp Kesim Kutu", "Ondüle"] },
  { slug: "sanayi", name: "Sanayi Ürünleri", description: "Parça ve ekipmanların depolama ile sevkiyatına uyarlanan kutu ve levha yapıları.", suitableProducts: ["Oluklu Mukavva Levha", "Normal Kutu", "Özel Ölçü Kutu"] },
  { slug: "lojistik", name: "Lojistik", description: "Depolama, istifleme ve taşıma akışını destekleyen çok amaçlı ambalaj seçenekleri.", suitableProducts: ["Normal Kutu", "Teleskopik Kutu", "Ondüle"] },
];
