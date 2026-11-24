"use client";

import { Fragment, useRef, type ReactNode } from "react";
import {
  MotionConfig,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

export const ease = [0.16, 1, 0.3, 1] as const;
/** A little overshoot, for things that should feel bouncy. */
export const bounce = [0.34, 1.56, 0.64, 1] as const;

/** Honors the visitor's reduced-motion setting for every animation below. */
export function Providers({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

/** Spread onto any motion element for a scroll-triggered rise-in. */
export const revealProps = (delay = 0, y = 28) => ({
  initial: { opacity: 0, y },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "0px 0px -12% 0px" },
  transition: { duration: 0.8, delay, ease },
});

/** Pop-in with a slight tilt, for sticker-like cards. */
export const popProps = (delay = 0, rotate = 0) => ({
  initial: { opacity: 0, y: 36, scale: 0.92, rotate: rotate * 2 },
  whileInView: { opacity: 1, y: 0, scale: 1, rotate },
  viewport: { once: true, margin: "0px 0px -10% 0px" },
  transition: { duration: 0.7, delay, ease: bounce },
});

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div className={className} {...revealProps(delay, y)}>
      {children}
    </motion.div>
  );
}

/** Headline that hops up word by word out of a mask when it scrolls into view. */
export function SplitText({
  text,
  className,
  as = "h2",
  delay = 0,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3";
  delay?: number;
}) {
  const Tag = as;
  const words = text.split(" ");
  return (
    <Tag className={className} aria-label={text}>
      {words.map((word, i) => (
        <Fragment key={`${word}-${i}`}>
          <span
            aria-hidden
            className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] align-bottom"
          >
            <motion.span
              className="inline-block origin-bottom-left"
              initial={{ y: "112%", rotate: 8 }}
              whileInView={{ y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.85, delay: delay + i * 0.07, ease: bounce }}
            >
              {word}
            </motion.span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  );
}

/** Decorative layer that drifts against the scroll. Always hidden from screen readers. */
export function Parallax({
  children,
  speed = 60,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [speed, -speed]);
  return (
    <motion.div
      ref={ref}
      aria-hidden
      style={{ y }}
      className={`pointer-events-none ${className}`}
    >
      {children}
    </motion.div>
  );
}
