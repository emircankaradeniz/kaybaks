type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const isCenter = align === "center";

  return (
    <div className={isCenter ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="heading-display mt-5 text-5xl uppercase leading-none text-white sm:text-6xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-stone-300/78 sm:text-lg">{description}</p>
    </div>
  );
}
