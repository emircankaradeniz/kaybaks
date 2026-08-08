"use client";

import { startTransition, useDeferredValue, useState } from "react";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/ui/product-card";
import { AnimatedReveal } from "@/components/ui/animated-reveal";

type ProductsFilterProps = {
  products: Product[];
};

export function ProductsFilter({ products }: ProductsFilterProps) {
  const categories = ["Tümü", ...new Set(products.map((product) => product.category))];
  const [activeCategory, setActiveCategory] = useState("Tümü");
  const deferredCategory = useDeferredValue(activeCategory);

  const filteredProducts =
    deferredCategory === "Tümü"
      ? products
      : products.filter((product) => product.category === deferredCategory);

  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => {
          const isActive = category === activeCategory;

          return (
            <button
              type="button"
              key={category}
              onClick={() => startTransition(() => setActiveCategory(category))}
              className={[
                "rounded-full border px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em]",
                isActive
                  ? "border-amber-300/35 bg-amber-300/12 text-amber-200"
                  : "border-white/10 bg-white/4 text-stone-200",
              ].join(" ")}
            >
              {category}
            </button>
          );
        })}
      </div>
      <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filteredProducts.map((product, index) => (
          <AnimatedReveal key={product.slug} delay={index * 0.04}>
            <ProductCard product={product} />
          </AnimatedReveal>
        ))}
      </div>
    </div>
  );
}
