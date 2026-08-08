import { company } from "@/data/company";
import type { Product } from "@/data/products";
import { absoluteUrl } from "@/lib/metadata";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: company.legalName,
  url: company.siteUrl,
  email: company.email,
  telephone: company.phone,
  logo: absoluteUrl("/icon.svg"),
  sameAs: [company.youtube],
};

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: company.name,
  image: absoluteUrl("/opengraph-image"),
  url: company.siteUrl,
  telephone: company.phone,
  email: company.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.addressLine,
    addressLocality: company.locality,
    addressRegion: company.region,
    postalCode: company.postalCode,
    addressCountry: company.country,
  },
  areaServed: ["Kayseri", "Türkiye"],
};

export function breadcrumbSchema(items: Array<{ name: string; href: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.href),
    })),
  };
}

export function productSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    category: product.category,
    brand: {
      "@type": "Brand",
      name: company.shortName,
    },
    manufacturer: {
      "@type": "Organization",
      name: company.legalName,
    },
    image: product.media.map((media) => absoluteUrl(media)),
    url: absoluteUrl(`/urunler/${product.slug}`),
  };
}
