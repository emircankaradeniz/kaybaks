import { ReferencePage } from "@/components/ui/reference-page";

export default function ContactPage() {
  return (
    <ReferencePage
      src="/reference/iletisim.png"
      title="Bizimle İletişime Geçin"
      hotspots={[
        { href: "tel:+903523222801", label: "Telefonla arayın", left: 6, top: 29.7, width: 21, height: 6.2 },
        { href: "mailto:info@kaybaks.com.tr", label: "E-posta gönderin", left: 6, top: 36.6, width: 21, height: 6.2 },
        { href: "https://maps.google.com/?q=Karpuzsekisi+Mahallesi+Kayseri", label: "Yol Tarifi Al", left: 4, top: 55.8, width: 92, height: 13.5 },
        { href: "tel:+903523222801", label: "Sizi Arayalım", left: 78, top: 72.7, width: 15, height: 2.4 },
      ]}
    />
  );
}
