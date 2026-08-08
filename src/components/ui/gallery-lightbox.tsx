"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useEffectEvent, useState } from "react";

type GalleryItem = {
  src: string;
  alt: string;
  title: string;
};

type GalleryLightboxProps = {
  items: GalleryItem[];
};

export function GalleryLightbox({ items }: GalleryLightboxProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const close = () => setSelectedIndex(null);
  const showNext = () =>
    setSelectedIndex((current) => (current === null ? 0 : (current + 1) % items.length));
  const showPrevious = () =>
    setSelectedIndex((current) =>
      current === null ? 0 : (current - 1 + items.length) % items.length,
    );

  const onKeyDown = useEffectEvent((event: KeyboardEvent) => {
    if (selectedIndex === null) {
      return;
    }

    if (event.key === "Escape") {
      close();
    }

    if (event.key === "ArrowRight") {
      showNext();
    }

    if (event.key === "ArrowLeft") {
      showPrevious();
    }
  });

  useEffect(() => {
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <div className="columns-1 gap-5 sm:columns-2 xl:columns-4">
        {items.map((item, index) => (
          <button
            type="button"
            key={item.src}
            onClick={() => setSelectedIndex(index)}
            className="group relative mb-5 block w-full overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/5 text-left"
          >
            <Image
              src={item.src}
              alt={item.alt}
              width={480}
              height={360}
              className="h-auto w-full object-cover duration-500 group-hover:scale-[1.03]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
            <div className="absolute inset-x-0 bottom-0 p-5">
              <p className="heading-display text-3xl uppercase text-white">{item.title}</p>
            </div>
          </button>
        ))}
      </div>
      <AnimatePresence>
        {selectedIndex !== null ? (
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0 }}
            className="fixed inset-0 z-[70] bg-black/92 p-4 backdrop-blur"
          >
            <div className="mx-auto flex h-full max-w-6xl items-center justify-center">
              <button
                type="button"
                onClick={close}
                className="absolute right-5 top-5 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
                aria-label="Galeriyi kapat"
              >
                <X className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={showPrevious}
                className="absolute left-5 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
                aria-label="Önceki görsel"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <div className="w-full overflow-hidden rounded-[1.8rem] border border-white/10 bg-black/70">
                <Image
                  src={items[selectedIndex].src}
                  alt={items[selectedIndex].alt}
                  width={1400}
                  height={1050}
                  className="max-h-[80vh] w-full object-contain"
                />
                <div className="border-t border-white/10 p-5">
                  <p className="heading-display text-3xl uppercase text-white">
                    {items[selectedIndex].title}
                  </p>
                  <p className="mt-2 text-sm leading-7 text-stone-300/78">
                    {items[selectedIndex].alt}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={showNext}
                className="absolute right-5 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white"
                aria-label="Sonraki görsel"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
