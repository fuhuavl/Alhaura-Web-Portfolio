"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems, navIds } from "@/data/nav";
import { profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/useActiveSection";
import { bounce, ease } from "./motion";
import { Flower, Sparkle } from "./Doodles";

type Page = "home" | "projects";

/** One bright color per nav item, reused for the active pill and the mobile menu. */
const dotColors = ["#FF5B3A", "#FFC83D", "#2FD39A", "#57B6FF", "#B69CFF", "#FF8FC7", "#FF5B3A"];

export function Navbar({ page = "home" }: { page?: Page }) {
  const observed = useActiveSection(navIds);
  const active = page === "projects" ? "projects" : observed;
  // On other pages the section links must point back to the home page.
  const hrefFor = (id: string) => {
    if (page === "projects" && id === "projects") return "/projects";
    return page === "home" ? `#${id}` : `/#${id}`;
  };
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const activeIndex = navItems.findIndex((n) => n.id === active);

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.4, ease: bounce }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6"
      >
        <nav
          aria-label="Main"
          className={`relative mx-auto flex max-w-[1360px] items-center justify-between overflow-hidden rounded-full border-[2.5px] px-3 transition-all duration-500 sm:px-4 ${
            scrolled && !open
              ? "border-ink bg-white/90 py-2 shadow-pop backdrop-blur-md"
              : "border-transparent py-3"
          }`}
        >
          <a
            href={hrefFor("home")}
            className="group flex items-center gap-2 rounded-full pl-1 pr-3 font-display text-xl font-extrabold tracking-tight text-ink"
            onClick={() => setOpen(false)}
          >
            <Sparkle className="h-7 w-7 text-sun transition-transform duration-700 group-hover:rotate-[180deg] group-hover:scale-110" />
            Alhaura
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item, i) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={hrefFor(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className="group relative block rounded-full px-4 py-2 text-sm font-semibold text-ink"
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full border-2 border-ink"
                        style={{ backgroundColor: dotColors[i] }}
                        transition={{ type: "spring", stiffness: 420, damping: 30 }}
                      />
                    ) : (
                      <span
                        aria-hidden
                        className="absolute inset-x-4 bottom-1 h-[3px] origin-left scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100"
                        style={{ backgroundColor: dotColors[i] }}
                      />
                    )}
                    <span className="relative inline-block transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:-rotate-3">
                      {item.label}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
            className="relative z-10 grid h-11 w-11 place-items-center rounded-full border-[2.5px] border-ink bg-sun text-ink shadow-pop-sm transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <motion.span
            aria-hidden
            style={{ scaleX: scrollYProgress }}
            className="absolute bottom-0 left-0 h-1 w-full origin-left bg-gradient-to-r from-tomato via-sun to-mint"
          />
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 2.6rem) 2.6rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.6rem) 2.6rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.6rem) 2.6rem)" }}
            transition={{ duration: 0.7, ease }}
            className="dots fixed inset-0 z-40 flex flex-col justify-between overflow-y-auto bg-lilac px-6 pb-8 pt-28 lg:hidden"
          >
            <Flower className="pointer-events-none absolute -right-10 bottom-24 h-44 w-44 animate-spin-slow opacity-90" />
            <ul className="relative space-y-1">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, x: -30, rotate: -4 }}
                  animate={{ opacity: 1, x: 0, rotate: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.05, ease: bounce }}
                >
                  <a
                    href={hrefFor(item.id)}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? "true" : undefined}
                    className="flex items-center gap-4 py-1.5 font-display text-[2.4rem] font-extrabold leading-tight tracking-tight text-ink"
                  >
                    <span
                      aria-hidden
                      className={`h-4 w-4 shrink-0 rounded-full border-2 border-ink transition-transform ${
                        i === activeIndex ? "scale-125" : "scale-75"
                      }`}
                      style={{ backgroundColor: dotColors[i] }}
                    />
                    <span className={i === activeIndex ? "underline decoration-[5px] underline-offset-[6px]" : ""}>
                      {item.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.6 }}
              className="relative mt-10 text-sm font-semibold text-ink"
            >
              <p className="inline-block rounded-full border-2 border-ink bg-white px-4 py-1.5">
                {profile.location}
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
