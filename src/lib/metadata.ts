import type { Metadata } from "next";
import { company } from "@/data/company";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

export function absoluteUrl(path: string) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return new URL(normalized, company.siteUrl).toString();
}

export function buildMetadata({
  title,
  description,
  path,
  keywords = [],
}: MetadataInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = title === company.shortName ? title : `${title} | ${company.shortName}`;

  return {
    metadataBase: new URL(company.siteUrl),
    title: fullTitle,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: company.shortName,
      locale: "tr_TR",
      type: "website",
      images: [
        {
          url: absoluteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: `${company.shortName} kurumsal web sitesi görseli`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [absoluteUrl("/opengraph-image")],
    },
  };
}
