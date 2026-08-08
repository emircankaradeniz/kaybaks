import Link from "next/link";

type CTASectionProps = {
  title: string;
  description: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CTASection({
  title,
  description,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
}: CTASectionProps) {
  return (
    <div className="panel noise-overlay overflow-hidden rounded-[2rem] px-6 py-8 sm:px-8 lg:px-12 lg:py-10">
      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <span className="eyebrow">Teklif Süreci</span>
          <h2 className="heading-display mt-5 text-5xl uppercase leading-none text-white sm:text-6xl">
            {title}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-8 text-stone-300/78 sm:text-lg">
            {description}
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
          <Link
            href={primaryHref}
            className="inline-flex min-h-13 items-center justify-center rounded-xl bg-amber-300 px-6 text-sm font-bold uppercase tracking-[0.2em] text-stone-950"
          >
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref ? (
            <Link
              href={secondaryHref}
              className="inline-flex min-h-13 items-center justify-center rounded-xl border border-white/15 bg-white/5 px-6 text-sm font-bold uppercase tracking-[0.2em] text-white"
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
