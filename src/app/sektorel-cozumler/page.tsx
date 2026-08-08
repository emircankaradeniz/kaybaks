import { ReferencePage } from "@/components/ui/reference-page";

export default function SectorSolutionsPage() {
  return (
    <ReferencePage
      src="/reference/sektorel-cozumler.png"
      title="Her Sektöre Özel Ambalaj Çözümleri"
      hotspots={[
        { href: "/iletisim#teklif", label: "Teklif Al", left: 65, top: 87.4, width: 10, height: 2.4 },
      ]}
    />
  );
}
