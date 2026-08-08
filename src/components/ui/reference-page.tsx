import Image from "next/image";
import Link from "next/link";

type Hotspot = {
  href: string;
  label: string;
  left: number;
  top: number;
  width: number;
  height: number;
};

const navigationHotspots: Hotspot[] = [
  { href: "/", label: "Ana Sayfa", left: 27, top: 0.7, width: 7.3, height: 2.7 },
  { href: "/kurumsal", label: "Kurumsal", left: 35.2, top: 0.7, width: 8.2, height: 2.7 },
  { href: "/urunler", label: "Ürünler", left: 43.6, top: 0.7, width: 7.2, height: 2.7 },
  { href: "/sektorel-cozumler", label: "Sektörler", left: 51, top: 0.7, width: 8.9, height: 2.7 },
  { href: "/uretim-kalite", label: "Üretim ve Kalite", left: 63.1, top: 0.7, width: 12.2, height: 2.7 },
  { href: "/iletisim", label: "İletişim", left: 75.2, top: 0.7, width: 8, height: 2.7 },
  { href: "/iletisim#teklif", label: "Teklif Al", left: 84.8, top: 0.65, width: 10.7, height: 2.85 },
];

const commonHotspots: Hotspot[] = [
  { href: "/", label: "KAYBAKS Ana Sayfa", left: 3.5, top: 0.25, width: 18.5, height: 3.5 },
  ...navigationHotspots,
];

type ReferencePageProps = {
  src: string;
  title: string;
  hotspots?: Hotspot[];
};

export function ReferencePage({ src, title, hotspots = [] }: ReferencePageProps) {
  return (
    <main className="reference-stage">
      <article className="reference-page" aria-label={title}>
        <h1 className="sr-only">{title}</h1>
        <Image
          src={src}
          alt={`${title} sayfasının görsel tasarımı`}
          width={935}
          height={1683}
          priority
          unoptimized
          draggable={false}
          className="reference-image"
        />
        {[...commonHotspots, ...hotspots].map((hotspot, index) => (
          <Link
            key={`${hotspot.href}-${hotspot.label}-${index}`}
            href={hotspot.href}
            aria-label={hotspot.label}
            title={hotspot.label}
            className="reference-hotspot"
            style={{
              left: `${hotspot.left}%`,
              top: `${hotspot.top}%`,
              width: `${hotspot.width}%`,
              height: `${hotspot.height}%`,
            }}
          >
            <span className="sr-only">{hotspot.label}</span>
          </Link>
        ))}
      </article>
    </main>
  );
}

export type { Hotspot };
