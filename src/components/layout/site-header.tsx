"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { company, primaryNav } from "@/data/company";
import { LogoMark } from "@/components/ui/logo-mark";

export function SiteHeader() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 24);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div
        className={[
          "mx-auto max-w-7xl rounded-[1.35rem] border transition-all duration-300",
          isScrolled
            ? "border-white/10 bg-black/72 shadow-2xl backdrop-blur-xl"
            : "border-white/8 bg-black/42 backdrop-blur-md",
        ].join(" ")}
      >
        <div className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6">
          <LogoMark />
          <nav className="hidden items-center gap-7 lg:flex">
            {primaryNav.map((item) => {
              const isActive =
                item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group relative text-sm font-semibold uppercase tracking-[0.18em] text-stone-200"
                >
                  {item.label}
                  <span
                    className={[
                      "absolute -bottom-2 left-0 h-px bg-amber-300 transition-all duration-300",
                      isActive ? "w-full" : "w-0 group-hover:w-full",
                    ].join(" ")}
                  />
                </Link>
              );
            })}
          </nav>
          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/iletisim#teklif"
              className="inline-flex min-h-11 items-center justify-center rounded-xl bg-amber-300 px-5 text-sm font-bold uppercase tracking-[0.18em] text-stone-950"
            >
              Teklif Al
            </Link>
          </div>
          <button
            type="button"
            onClick={() => setIsMenuOpen((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white lg:hidden"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-navigation"
            aria-label="Menüyü aç"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        <AnimatePresence>
          {isMenuOpen ? (
            <motion.div
              id="mobile-navigation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden border-t border-white/8 lg:hidden"
            >
              <div className="flex flex-col gap-3 px-5 py-5 sm:px-6">
                {primaryNav.map((item) => {
                  const isActive =
                    item.href === "/" ? pathname === item.href : pathname.startsWith(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={[
                        "rounded-xl border px-4 py-3 text-sm font-semibold uppercase tracking-[0.18em]",
                        isActive
                          ? "border-amber-300/30 bg-amber-300/10 text-amber-200"
                          : "border-white/8 bg-white/5 text-white",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  );
                })}
                <Link
                  href="/iletisim#teklif"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-amber-300 px-5 text-sm font-bold uppercase tracking-[0.18em] text-stone-950"
                >
                  Teklif Al
                </Link>
                <Link
                  href={`tel:${company.phoneHref}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 px-5 text-sm font-bold uppercase tracking-[0.18em] text-white"
                >
                  Hemen Ara
                </Link>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  );
}
