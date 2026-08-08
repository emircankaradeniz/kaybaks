import type { Sector } from "@/data/sectors";

type SectorCardProps = {
  sector: Sector;
};

export function SectorCard({ sector }: SectorCardProps) {
  return (
    <div className="industrial-card rounded-[1.5rem] p-6">
      <div className="inline-flex rounded-full border border-amber-300/25 bg-amber-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-amber-200">
        Sektörel Uyum
      </div>
      <h3 className="heading-display mt-5 text-3xl uppercase text-white">{sector.name}</h3>
      <p className="mt-3 text-sm leading-7 text-stone-300/76">{sector.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">
        {sector.suitableProducts.map((item) => (
          <span
            key={item}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-stone-200"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
