import type { Metadata } from "next";
import { company } from "@/data/company";

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || company.siteUrl;

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export function createPageMetadata({
  title,
  description,
  path,
  image = "/opengraph-image",
  keywords = [],
}: MetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);

  return {
    title,
    description,
    keywords,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "tr_TR",
      url: canonical,
      siteName: company.shortName,
      title,
      description,
      images: [{ url: imageUrl, width: 1200, height: 630, alt: `${company.shortName} oluklu mukavva ve kutu üretimi` }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export const buildMetadata = createPageMetadata;
