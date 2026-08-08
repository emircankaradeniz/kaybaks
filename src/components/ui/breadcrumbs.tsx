import Link from "next/link";

type BreadcrumbItem = {
  href: string;
  label: string;
};

type BreadcrumbsProps = {
  items: BreadcrumbItem[];
};

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-stone-400">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={item.href} className="flex items-center gap-2">
            {isLast ? (
              <span className="text-stone-200">{item.label}</span>
            ) : (
              <Link href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            )}
            {!isLast && <span>/</span>}
          </span>
        );
      })}
    </nav>
  );
}
