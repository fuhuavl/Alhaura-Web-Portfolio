"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

type Mode = "default" | "hover" | "label" | "text";
type State = { mode: Mode; label: string };

/**
 * Playful two-part cursor: a dot that follows the mouse exactly and a ring that trails it.
 * It only turns on for a real mouse (hover + fine pointer) and never when the visitor
 * prefers reduced motion, so touch screens and keyboard users keep the normal behavior.
 */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [down, setDown] = useState(false);
  const [state, setState] = useState<State>({ mode: "default", label: "" });

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const rx = useSpring(x, { stiffness: 420, damping: 34, mass: 0.6 });
  const ry = useSpring(y, { stiffness: 420, damping: 34, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setEnabled(fine.matches && !calm.matches);
    update();
    fine.addEventListener("change", update);
    calm.addEventListener("change", update);
    return () => {
      fine.removeEventListener("change", update);
      calm.removeEventListener("change", update);
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    if (!enabled) {
      root.classList.remove("has-cursor");
      return;
    }
    root.classList.add("has-cursor");

    const set = (mode: Mode, label = "") =>
      setState((prev) => (prev.mode === mode && prev.label === label ? prev : { mode, label }));

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
    };
    const onOver = (e: PointerEvent) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      const labelled = t.closest<HTMLElement>("[data-cursor]");
      if (labelled) return set("label", labelled.dataset.cursor ?? "");
      if (t.closest('input, textarea, select, [contenteditable="true"]')) return set("text");
      if (t.closest('a, button, label, summary, [role="button"]')) return set("hover");
      set("default");
    };
    const onLeave = () => setVisible(false);
    const onDown = () => setDown(true);
    const onUp = () => setDown(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver);
    root.addEventListener("mouseleave", onLeave);
    window.addEventListener("blur", onLeave);
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    return () => {
      root.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      root.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("blur", onLeave);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
    };
  }, [enabled, x, y]);

  if (!enabled) return null;

  const { mode, label } = state;
  const ring =
    mode === "label"
      ? { width: 92, height: 92, backgroundColor: "#FF5B3A", rotate: -8 }
      : mode === "hover"
        ? { width: 62, height: 62, backgroundColor: "rgba(255, 200, 61, 0.55)", rotate: 0 }
        : mode === "text"
          ? { width: 0, height: 0, backgroundColor: "rgba(0,0,0,0)", rotate: 0 }
          : { width: 36, height: 36, backgroundColor: "rgba(255,255,255,0)", rotate: 0 };

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100]">
      <motion.div
        style={{ x: rx, y: ry, opacity: visible ? 1 : 0 }}
        className="absolute left-0 top-0"
      >
        <motion.div
          animate={{ ...ring, scale: down ? 0.82 : 1 }}
          transition={{ type: "spring", stiffness: 380, damping: 22 }}
          style={{ x: "-50%", y: "-50%" }}
          className="grid place-items-center rounded-full border-2 border-ink shadow-[0_0_0_2px_#FFF4E4]"
        >
          {mode === "label" ? (
            <span className="font-display text-sm font-extrabold uppercase tracking-wide text-ink">
              {label}
            </span>
          ) : null}
        </motion.div>
      </motion.div>
      <motion.div
        style={{ x, y, opacity: visible && mode === "default" ? 1 : 0 }}
        className="absolute left-0 top-0"
      >
        <div className="h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-tomato shadow-[0_0_0_2px_#1E1633]" />
      </motion.div>
    </div>
  );
}
