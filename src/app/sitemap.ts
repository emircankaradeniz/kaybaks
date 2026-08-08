import type { MetadataRoute } from "next";
import { company } from "@/data/company";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "/",
    "/kurumsal",
    "/urunler",
    "/sektorel-cozumler",
    "/uretim-kalite",
    "/iletisim",
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: `${company.siteUrl}${route}`,
      changeFrequency: "weekly" as const,
      priority: route === "/" ? 1 : 0.8,
    })),
    ...products.map((product) => ({
      url: `${company.siteUrl}/urunler/${product.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
  ];
}
