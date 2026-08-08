import { ReferencePage } from "@/components/ui/reference-page";

export default function ProductionQualityPage() {
  return (
    <ReferencePage
      src="/reference/uretim-kalite.png"
      title="Kaliteden Ödün Vermeyen Üretim Anlayışı"
      hotspots={[
        { href: "/iletisim#teklif", label: "Teklif Al", left: 6, top: 89, width: 10, height: 2.4 },
      ]}
    />
  );
}
