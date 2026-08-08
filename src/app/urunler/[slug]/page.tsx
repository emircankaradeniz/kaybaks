import { notFound } from "next/navigation";
import { ReferencePage } from "@/components/ui/reference-page";

const productReferences = {
  "oluklu-mukavva-levha": {
    src: "/reference/oluklu-mukavva-levha.png",
    title: "Oluklu Mukavva Levha",
  },
  "ozel-tasarim-ambalaj": {
    src: "/reference/ozel-tasarim-ambalaj.png",
    title: "Özel Tasarım Ambalaj",
  },
} as const;

export function generateStaticParams() {
  return Object.keys(productReferences).map((slug) => ({ slug }));
}

export default async function ProductDetailPage({ params }: PageProps<"/urunler/[slug]">) {
  const { slug } = await params;
  const product = productReferences[slug as keyof typeof productReferences];

  if (!product) notFound();

  return (
    <ReferencePage
      src={product.src}
      title={product.title}
      hotspots={[
        { href: "/iletisim#teklif", label: `${product.title} için teklif al`, left: 53, top: 33, width: 13, height: 2.4 },
        { href: "/urunler", label: "Tüm Ürünler", left: 6, top: 76, width: 88, height: 8 },
      ]}
    />
  );
}
