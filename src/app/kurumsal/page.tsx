import { ReferencePage } from "@/components/ui/reference-page";

export default function CorporatePage() {
  return (
    <ReferencePage
      src="/reference/kurumsal.png"
      title="KAYBAKS Hakkında"
      hotspots={[
        { href: "/iletisim#teklif", label: "Teklif Alın", left: 10, top: 86.7, width: 10, height: 2.2 },
        { href: "/iletisim", label: "İletişime Geçin", left: 20.4, top: 86.7, width: 11, height: 2.2 },
      ]}
    />
  );
}
