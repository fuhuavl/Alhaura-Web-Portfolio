"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import type { ProjectImage } from "@/data/projects";

/**
 * A strip where every picture keeps its own proportions (fixed height, width follows the
 * real image), plus a lightbox that shows the full, uncropped picture.
 */
export function ProjectGallery({ images }: { images: ProjectImage[] }) {
  const [current, setCurrent] = useState<number | null>(null);
  const count = images.length;

  const close = useCallback(() => setCurrent(null), []);
  const step = useCallback(
    (dir: 1 | -1) =>
      setCurrent((c) => (c === null ? c : (c + dir + count) % count)),
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

  return (
    <>
      <ul className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-4 [scrollbar-color:#6A6969_transparent] [scrollbar-width:thin] sm:-mx-8 sm:px-8 md:gap-4 lg:mx-0 lg:px-0">
        {images.map((img, i) => (
          <li key={img.src} className="shrink-0 snap-start">
            <button
              type="button"
              onClick={() => setCurrent(i)}
              aria-label={`Open image ${i + 1} of ${count}`}
              className="group block overflow-hidden bg-pine/30"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt={img.alt}
                width={img.width}
                height={img.height}
                loading="lazy"
                decoding="async"
                className="block h-[200px] w-auto max-w-none transition-transform duration-700 ease-out group-hover:scale-[1.03] sm:h-[260px] md:h-[320px]"
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
            className="fixed inset-0 z-[70] grid place-items-center bg-pine/95 p-4 backdrop-blur-sm sm:p-10"
            onClick={close}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={active.src}
              alt={active.alt}
              width={active.width}
              height={active.height}
              onClick={(e) => e.stopPropagation()}
              className="h-auto max-h-[82vh] w-auto max-w-full object-contain"
            />

            <button
              type="button"
              onClick={close}
              aria-label="Close image viewer"
              autoFocus
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-mist/10 text-mist transition-colors hover:bg-mist/20 sm:right-8 sm:top-8"
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
                  className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-mist/10 text-mist transition-colors hover:bg-mist/20 sm:left-8"
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
                  className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-mist/10 text-mist transition-colors hover:bg-mist/20 sm:right-8"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <p className="absolute bottom-4 left-1/2 -translate-x-1/2 text-sm text-mist/70">
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
