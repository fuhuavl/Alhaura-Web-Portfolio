"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Menu, X } from "lucide-react";
import { navItems, navIds } from "@/data/nav";
import { profile } from "@/data/profile";
import { useActiveSection } from "@/hooks/useActiveSection";
import { ease } from "./motion";

type Page = "home" | "projects";

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

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.5, ease }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6"
      >
        <nav
          aria-label="Main"
          className={`relative mx-auto flex max-w-[1360px] items-center justify-between overflow-hidden rounded-full border px-5 transition-all duration-500 sm:px-6 ${
            scrolled && !open
              ? "border-mist/10 bg-pine/75 py-2.5 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.6)] backdrop-blur-xl"
              : "border-transparent py-4"
          }`}
        >
          <a
            href={hrefFor("home")}
            className="font-display text-xl text-mist"
            onClick={() => setOpen(false)}
          >
            Alhaura
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={hrefFor(item.id)}
                    aria-current={isActive ? "true" : undefined}
                    className={`relative block rounded-full px-4 py-2 text-sm transition-colors duration-300 ${
                      isActive ? "text-mist" : "text-mist/60 hover:text-mist"
                    }`}
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-mist/10"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    ) : null}
                    <span className="relative">{item.label}</span>
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
            className="relative z-10 grid h-10 w-10 place-items-center rounded-full text-mist lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          <motion.span
            aria-hidden
            style={{ scaleX: scrollYProgress }}
            className="absolute bottom-0 left-0 h-px w-full origin-left bg-sand"
          />
        </nav>
      </motion.header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 2.5rem) 2.5rem)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 2.5rem) 2.5rem)" }}
            transition={{ duration: 0.7, ease }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-pine px-6 pb-8 pt-28 lg:hidden"
          >
            <ul className="space-y-1">
              {navItems.map((item, i) => (
                <motion.li
                  key={item.id}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.06, ease }}
                >
                  <a
                    href={hrefFor(item.id)}
                    onClick={() => setOpen(false)}
                    aria-current={active === item.id ? "true" : undefined}
                    className={`block py-2 font-display text-[2.4rem] leading-tight transition-colors ${
                      active === item.id ? "text-sand" : "text-mist"
                    }`}
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.7 }}
              className="space-y-1 text-sm text-mist/70"
            >
              <p>{profile.location}</p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
