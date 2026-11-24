"use client";

import type { PointerEvent, ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";

type Variant = "tomato" | "sun" | "white" | "ink";

const variants: Record<Variant, { box: string; icon: string }> = {
  tomato: { box: "bg-tomato text-ink", icon: "bg-ink text-cream" },
  sun: { box: "bg-sun text-ink", icon: "bg-ink text-sun" },
  white: { box: "bg-white text-ink", icon: "bg-mint text-ink border-2 border-ink" },
  ink: { box: "bg-ink text-cream", icon: "bg-sun text-ink" },
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
};

/** Chunky pill button that leans toward the mouse and "presses" when clicked. */
export function Button({
  children,
  variant = "tomato",
  href,
  onClick,
  type = "button",
  disabled,
  className = "",
}: Props) {
  const v = variants[variant];
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, { stiffness: 220, damping: 16 });
  const y = useSpring(my, { stiffness: 220, damping: 16 });

  const onMove = (e: PointerEvent<HTMLSpanElement>) => {
    if (reduce || e.pointerType !== "mouse" || disabled) return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - (r.left + r.width / 2)) * 0.22);
    my.set((e.clientY - (r.top + r.height / 2)) * 0.3);
  };
  const reset = () => {
    mx.set(0);
    my.set(0);
  };

  const classes = `group relative inline-flex items-center gap-3 rounded-full border-[2.5px] border-ink py-2.5 pl-6 pr-2.5 text-[0.98rem] font-bold shadow-pop transition-[transform,box-shadow] duration-200 ease-out hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-pop-lg active:translate-x-1 active:translate-y-1 active:shadow-none disabled:pointer-events-none disabled:opacity-60 ${v.box} ${className}`;

  const inner = (
    <>
      <span className="relative">{children}</span>
      <span
        className={`relative grid h-9 w-9 place-items-center rounded-full transition-transform duration-500 group-hover:rotate-[360deg] ${v.icon}`}
      >
        <ArrowRight
          aria-hidden
          className="h-4 w-4 -rotate-45 transition-transform duration-300 group-hover:rotate-0"
        />
      </span>
    </>
  );

  return (
    <motion.span
      style={{ x, y }}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className="inline-block"
    >
      {href ? (
        <a href={href} className={classes}>
          {inner}
        </a>
      ) : (
        <button type={type} onClick={onClick} disabled={disabled} className={classes}>
          {inner}
        </button>
      )}
    </motion.span>
  );
}
