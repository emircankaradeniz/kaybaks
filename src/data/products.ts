export type Product = {
  slug: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  useCases: string[];
  features: string[];
  advantages: string[];
  media: string[];
};

export const products: Product[] = [
  {
    slug: "oluklu-mukavva-levha",
    name: "Oluklu Mukavva Levha",
    category: "Levhadan Üretim",
    shortDescription: "Farklı kalınlık ve ölçülerde kutu, seperatör ve koruyucu ambalaj tabanı için üretim altyapısı.",
    description:
      "Oluklu mukavva levha; kutu üretimi, ara katman kullanımı ve ürünü taşıma sırasında korumaya yönelik çözümler için temel yapı sunar.",
    useCases: ["Ara katman çözümleri", "Özel kutu üretim altyapısı", "Koruyucu seperatör uygulamaları"],
    features: ["Farklı ölçü seçenekleri", "Üretim ihtiyacına göre planlanabilen form", "B2B sevkiyat süreçlerine uygun yapı"],
    advantages: ["Esnek kullanım senaryosu", "Kutu üretiminde temel malzeme", "İhtiyaca göre kesim ve ölçülendirme"],
    media: ["/media/enhanced/corrugated-layers-hd.jpg", "/media/enhanced/flute-types-hd.jpg", "/media/enhanced/normal-box-and-sheets-hd.jpg"],
  },
  {
    slug: "normal-kutu",
    name: "Normal Kutu",
    category: "Kutu Çözümleri",
    shortDescription: "Genel sevkiyat, depolama ve düzenli paketleme süreçleri için çok amaçlı kutu çözümü.",
    description:
      "Normal kutu çözümleri; ürünün depolanması, taşınması ve düzenli şekilde sevk edilmesi gereken durumlarda sade ve güvenli bir ambalaj alternatifi sunar.",
    useCases: ["Genel sevkiyat", "Depo düzeni", "Toplu ürün paketleme"],
    features: ["Sade yapı", "Farklı ölçü alternatifleri", "Kolay istiflenebilir form"],
    advantages: ["Pratik kullanım", "Geniş uygulama alanı", "Kurumsal sevkiyat düzeni"],
    media: ["/media/enhanced/normal-box-and-sheets-hd.jpg", "/media/enhanced/box-types-hd.jpg", "/media/enhanced/box-size-variety-hd.jpg"],
  },
  {
    slug: "teleskopik-kutu",
    name: "Teleskopik Kutu",
    category: "Kutu Çözümleri",
    shortDescription: "Özellikle hacimli veya koruma ihtiyacı yüksek ürünler için kapak-gövde yapısına sahip kutu tipi.",
    description:
      "Teleskopik kutular, kapak ve gövde birleşimi ile ürünün daha kontrollü kapatılmasını ve sunulmasını sağlayan ambalaj seçenekleri arasında yer alır.",
    useCases: ["Mobilya parçaları", "Hacimli ürünler", "Parça bazlı sevkiyat"],
    features: ["Kapak-gövde yapısı", "Farklı ebat üretimi", "Düzgün istifleme avantajı"],
    advantages: ["Koruma hissi yüksek form", "Sunum kalitesi", "Sevkiyat düzeni"],
    media: ["/media/enhanced/box-types-hd.jpg", "/media/enhanced/normal-box-and-sheets-hd.jpg", "/media/enhanced/box-size-variety-hd.jpg"],
  },
  {
    slug: "kalip-kesim-kutu",
    name: "Kalıp Kesim Kutu",
    category: "Özel Formlar",
    shortDescription: "Ürünün biçimine göre şekillenen, raf, sunum veya özel kullanım alanlarına uygun kutu çözümü.",
    description:
      "Kalıp kesim kutular; standart kutu geometrisinin yeterli olmadığı, ürüne daha yakın oturan ve fonksiyonel açılıp kapanma ihtiyacı bulunan projelerde öne çıkar.",
    useCases: ["Özel ürün formu", "Raf ve teşhir", "Fonksiyonel ambalaj"],
    features: ["Özel kesim olanağı", "Tam renk klişe baskı seçeneği", "Farklı kullanım alanlarına uyum"],
    advantages: ["Daha kontrollü yerleşim", "Ürüne göre şekillenme", "Kurumsal sunum desteği"],
    media: ["/media/enhanced/handled-diecut-box-hd.jpg", "/media/enhanced/diecut-folding-example-hd.jpg", "/media/enhanced/box-types-hd.jpg"],
  },
  {
    slug: "ondule",
    name: "Ondüle Ürünler",
    category: "Levhadan Üretim",
    shortDescription: "Koruma, ayırma ve destekleme amacıyla farklı kullanım kurgularına uyarlanabilen ondüle çözümler.",
    description:
      "Ondüle ürünler, taşıma veya yerleştirme süreçlerinde tamponlama ve ayırıcı destek sağlamak için tercih edilen yardımcı ambalaj grupları arasında yer alır.",
    useCases: ["Ayırıcı katman", "Koruyucu destek", "İç ambalaj çözümü"],
    features: ["Esnek kullanım", "Üretim planına uyum", "Farklı ebat uygulanabilirliği"],
    advantages: ["Yardımcı koruma", "Ürün gruplarını ayırma", "Paket bütünlüğünü destekleme"],
    media: ["/media/enhanced/flute-types-hd.jpg", "/media/enhanced/corrugated-layers-hd.jpg", "/media/enhanced/normal-box-and-sheets-hd.jpg"],
  },
  {
    slug: "demonte-mobilya-kutulari",
    name: "Demonte Mobilya Kutuları",
    category: "Sektörel Çözümler",
    shortDescription: "Mobilya sektörünün düz, parçalı ve hassas sevkiyat yapısına uyum sağlayan kutu çözümleri.",
    description:
      "Demonte mobilya kutuları, parça bazlı taşıma, düzenli istifleme ve sevkiyat sırasında ürün bütünlüğünü korumaya yönelik üretim yaklaşımıyla hazırlanır.",
    useCases: ["Panel mobilya", "Parçalı sevkiyat", "Demonte paketleme"],
    features: ["Geniş yüzeylere uygun yapı", "Parça bazlı düzenleme", "Sevkiyata uygun form"],
    advantages: ["Mobilya sektörüne uygun çözüm", "Depolama kolaylığı", "Daha düzenli sevkiyat"],
    media: ["/media/enhanced/box-size-variety-hd.jpg", "/media/enhanced/box-types-hd.jpg", "/media/enhanced/normal-box-and-sheets-hd.jpg"],
  },
  {
    slug: "ozel-olcu-kutu",
    name: "Özel Ölçü Kutu",
    category: "Özel Formlar",
    shortDescription: "Standart dışı ölçü ve kullanım senaryoları için proje bazlı ölçülendirilen kutu çözümleri.",
    description:
      "Özel ölçü kutular, ürünün hassasiyetine, ebatına ve taşınma biçimine göre farklı kutu yapılarının uyarlanmasını sağlar.",
    useCases: ["Standart dışı ürünler", "Özel sevkiyat projeleri", "Ölçüye göre üretim"],
    features: ["Proje bazlı ölçülendirme", "Esnek kutu tipi seçimi", "İhtiyaca göre planlama"],
    advantages: ["Boşluk kaybını azaltma", "Ürüne özel koruma", "Kurumsal üretim uyumu"],
    media: ["/media/enhanced/box-types-hd.jpg", "/media/enhanced/normal-box-and-sheets-hd.jpg", "/media/enhanced/handled-diecut-box-hd.jpg"],
  },
  {
    slug: "ozel-tasarim-ambalaj",
    name: "Özel Tasarım Ambalaj",
    category: "Özel Formlar",
    shortDescription: "Ürün, kullanım ve taşıma ihtiyaçlarına göre geliştirilen kurumsal ambalaj çözümleri.",
    description:
      "Özel tasarım ambalaj çözümleri; teknik ölçü, kullanım alışkanlığı ve ürün sunumu gibi başlıkları birlikte ele alarak proje bazlı planlanır.",
    useCases: ["Kurumsal proje bazlı çözümler", "Ürün sunumu", "Fonksiyonel kutu yapıları"],
    features: ["Özelleştirilebilir yapı", "Tam renk klişe baskı seçeneği", "Kurumsal ihtiyaçlara uyum"],
    advantages: ["Proje odaklı çözüm", "Daha kontrollü sunum", "Ürün odaklı planlama"],
    media: ["/media/enhanced/diecut-folding-example-hd.jpg", "/media/enhanced/handled-diecut-box-hd.jpg", "/media/enhanced/box-types-hd.jpg"],
  },
];
