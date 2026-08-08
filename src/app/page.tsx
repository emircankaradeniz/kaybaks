import { ReferencePage } from "@/components/ui/reference-page";

export default function HomePage() {
  return (
    <ReferencePage
      src="/reference/ana-sayfa.png"
      title="Yeni Nesil Oluklu Mukavva ve Ambalaj Çözümleri"
      hotspots={[
        { href: "/urunler", label: "Ürünleri İncele", left: 6.4, top: 18.4, width: 12.8, height: 2.25 },
        { href: "/iletisim#teklif", label: "Teklif Al", left: 20.2, top: 18.4, width: 9.8, height: 2.25 },
        { href: "/urunler/oluklu-mukavva-levha", label: "Oluklu Mukavva Levha", left: 5.6, top: 35.8, width: 14, height: 11 },
        { href: "/kurumsal", label: "KAYBAKS Hakkında", left: 52.5, top: 49, width: 38, height: 12 },
        { href: "/sektorel-cozumler", label: "Sektörel Çözümler", left: 4, top: 71, width: 92, height: 7 },
        { href: "/iletisim#teklif", label: "Hemen Teklif Alın", left: 41, top: 85.8, width: 15, height: 3 },
      ]}
    />
  );
}
