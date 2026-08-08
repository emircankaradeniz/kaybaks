import { Breadcrumbs } from "@/components/ui/breadcrumbs";

type PageHeroProps = {
  title: string;
  description: string;
  breadcrumbs: Array<{ href: string; label: string }>;
};

export function PageHero({ title, description, breadcrumbs }: PageHeroProps) {
  return (
    <section className="section-space pb-10 pt-28 sm:pt-32">
      <div className="container-shell">
        <div className="panel rounded-[1.8rem] px-6 py-8 sm:px-8 lg:px-10">
          <Breadcrumbs items={breadcrumbs} />
          <h1 className="heading-display mt-5 text-5xl uppercase leading-none text-white sm:text-6xl">
            {title}
          </h1>
          <p className="mt-4 max-w-3xl text-base leading-8 text-stone-300/76 sm:text-lg">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
