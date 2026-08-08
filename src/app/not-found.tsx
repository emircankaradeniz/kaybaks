import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section-space pt-32">
      <div className="container-shell">
        <div className="panel rounded-[1.8rem] px-6 py-10 text-center sm:px-8 lg:px-12 lg:py-16">
          <p className="eyebrow justify-center">404</p>
          <h1 className="heading-display mt-5 text-6xl uppercase leading-none text-white">
            Sayfa Bulunamadı
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-stone-300/78 sm:text-lg">
            Aradığınız sayfa taşınmış, kaldırılmış veya yanlış bir bağlantı ile açılmış
            olabilir.
          </p>
          <Link
            href="/"
            className="mt-8 inline-flex min-h-13 items-center justify-center rounded-xl bg-amber-300 px-6 text-sm font-bold uppercase tracking-[0.18em] text-stone-950"
          >
            Ana Sayfaya Dön
          </Link>
        </div>
      </div>
    </section>
  );
}
