"use client";

import { useMemo, useState } from "react";
import { ProductCard, type CardProduct } from "@/components/ui/kraft";

export function KraftProductFilter({ products }: { products: CardProduct[] }) {
  const categories = useMemo(() => ["Tümü", ...Array.from(new Set(products.map((item) => item.category)))], [products]);
  const [active, setActive] = useState("Tümü");
  const visible = active === "Tümü" ? products : products.filter((item) => item.category === active);
  return <div><div className="kp-filter-bar" role="group" aria-label="Ürün kategorileri">{categories.map((category) => <button className={active === category ? "active" : ""} type="button" key={category} onClick={() => setActive(category)}>{category}</button>)}</div><div className="kp-product-grid">{visible.map((product) => <ProductCard key={product.slug} product={product} />)}</div></div>;
}
