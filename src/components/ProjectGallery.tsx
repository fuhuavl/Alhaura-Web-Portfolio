"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ProjectImage } from "@/data/projects";
import { bounce } from "./motion";

const tilts = ["hover:-rotate-2", "hover:rotate-2", "hover:-rotate-1", "hover:rotate-1"];

/**
 * A strip where every picture keeps its own proportions (fixed height, width follows the
 * real image), plus a lightbox that shows the full, uncropped picture.
 */
export function ProjectGallery({ images }: { images: ProjectImage[] }) {
  const [current, setCurrent] = useState<number | null>(null);
  const count = images.length;

  const close = useCallback(() => setCurrent(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setCurrent((c) => (c === null ? c : (c + dir + count) % count)),
    [count],
  );

  useEffect(() => {
    if (current === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [current, close, step]);

  const active = current !== null ? images[current] : null;
  const circle =
    "grid h-12 w-12 place-items-center rounded-full border-[2.5px] border-ink text-ink shadow-pop-sm transition-transform duration-200 hover:scale-110 active:scale-95";

  return (
    <>
      <ul className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-4 pt-2 [scrollbar-color:#1E1633_transparent] [scrollbar-width:thin] md:-mx-10 md:gap-5 md:px-10">
        {images.map((img, i) => (
          <li key={img.src} className="shrink-0 snap-start">
            <button
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Open image ${i + 1} of ${count}`}
              data-cursor="zoom"
              className={`group block overflow-hidden rounded-2xl border-[2.5px] border-ink bg-cream transition-transform duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-1 ${tilts[i % tilts.length]}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                loading="lazy"
                decoding="async"
                className="block h-[200px] w-auto max-w-none transition-transform duration-700 ease-out group-hover:scale-[1.05] sm:h-[260px] md:h-[320px]"
              />
            </button>
          </li>
        ))}
      </ul>

      <AnimatePresence>
        {active ? (
          <motion.div
            key="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label="Image viewer"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="dots-light fixed inset-0 z-[70] grid place-items-center bg-ink/95 p-4 backdrop-blur-sm sm:p-10"
            onClick={close}
          >
            <motion.img
              key={active.src}
              src={active.src}
              alt={active.alt}
              width={active.width}
              height={active.height}
              initial={{ scale: 0.9, rotate: -2, opacity: 0 }}
              animate={{ scale: 1, rotate: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: bounce }}
              onClick={(e) => e.stopPropagation()}
              className="h-auto max-h-[80vh] w-auto max-w-full rounded-2xl border-[3px] border-cream object-contain"
            />

            <button
              type="button"
              onClick={close}
              aria-label="Close image viewer"
              autoFocus
              className={`absolute right-4 top-4 sm:right-8 sm:top-8 ${circle} bg-tomato`}
            >
              <X className="h-5 w-5" />
            </button>

            {count > 1 ? (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(-1);
                  }}
                  aria-label="Previous image"
                  className={`absolute left-3 top-1/2 -translate-y-1/2 sm:left-8 ${circle} bg-sun`}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    step(1);
                  }}
                  aria-label="Next image"
                  className={`absolute right-3 top-1/2 -translate-y-1/2 sm:right-8 ${circle} bg-sun`}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <p className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full border-2 border-cream/40 px-4 py-1 text-sm font-semibold text-cream">
                  {(current ?? 0) + 1} of {count}
                </p>
              </>
            ) : null}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
