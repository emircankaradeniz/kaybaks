import Link from "next/link";

type LogoMarkProps = {
  href?: string;
};

export function LogoMark({ href = "/" }: LogoMarkProps) {
  return (
    <Link href={href} className="inline-flex items-end gap-1" aria-label="KAYBAKS ana sayfa">
      <span className="heading-display text-4xl font-semibold uppercase leading-none tracking-tight text-white">
        Kay
      </span>
      <span className="heading-display text-4xl font-semibold uppercase leading-none tracking-tight text-amber-300">
        Baks
      </span>
    </Link>
  );
}
