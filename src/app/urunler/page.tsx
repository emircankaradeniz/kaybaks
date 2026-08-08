import { ReferencePage } from "@/components/ui/reference-page";

export default function ProductsPage() {
  return (
    <ReferencePage
      src="/reference/urunler.png"
      title="Ürünlerimiz"
      hotspots={[
        { href: "/urunler/oluklu-mukavva-levha", label: "Oluklu Mukavva Levha", left: 6.2, top: 43.2, width: 20, height: 14 },
        { href: "/urunler/normal-kutu", label: "Normal Kutu", left: 28.1, top: 43.2, width: 20, height: 14 },
        { href: "/urunler/kalip-kesim-kutu", label: "Kalıp Kesim Kutu", left: 50, top: 43.2, width: 20, height: 14 },
        { href: "/urunler/teleskopik-kutu", label: "Teleskopik Kutu", left: 72, top: 43.2, width: 21, height: 14 },
        { href: "/urunler/ondule", label: "Ondüle", left: 6.2, top: 58.5, width: 26.2, height: 10.8 },
        { href: "/urunler/demonte-mobilya-kutulari", label: "Demonte Mobilya Kutuları", left: 35, top: 58.5, width: 27.8, height: 10.8 },
        { href: "/urunler/ozel-tasarim-ambalaj", label: "Özel Tasarım Ambalaj", left: 65, top: 58.5, width: 28.2, height: 10.8 },
        { href: "/iletisim#teklif", label: "Teklif Al", left: 79, top: 83.7, width: 10, height: 3 },
      ]}
    />
  );
}
