import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/urunler/${product.slug}`}
      className="group industrial-card overflow-hidden rounded-[1.6rem]"
    >
      <div className="relative overflow-hidden border-b border-white/10 bg-white/5">
        <Image
          src={product.media[0]}
          alt={product.name}
          width={1200}
          height={900}
          className="h-64 w-full object-cover duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
      </div>
      <div className="p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300/85">
          {product.category}
        </p>
        <h3 className="heading-display mt-4 text-3xl uppercase text-white">{product.name}</h3>
        <p className="mt-3 text-sm leading-7 text-stone-300/76">{product.shortDescription}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.22em] text-amber-200">
          Detayları Gör
        </span>
      </div>
    </Link>
  );
}
