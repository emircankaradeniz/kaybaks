import type { MetadataRoute } from "next";
import { company } from "@/data/company";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-10-07");
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
      lastModified,
      changeFrequency: "weekly" as const,
      priority: route === "/" ? 1 : route === "/urunler" || route === "/iletisim" ? 0.9 : 0.8,
    })),
    ...products.map((product) => ({
      url: `${company.siteUrl}/urunler/${product.slug}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
