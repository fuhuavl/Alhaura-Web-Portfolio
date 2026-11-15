"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type Variants,
} from "framer-motion";
import { MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { Button } from "./Button";
import { ease } from "./motion";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.25 } },
};
const line: Variants = {
  hidden: { y: "115%" },
  show: { y: 0, transition: { duration: 1.1, ease } },
};
const fade: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

const indents = ["", "md:pl-[3vw]", "md:pl-[14vw]"];

function HeroArt() {
  return (
    <div className="relative aspect-square w-full">
      <svg viewBox="0 0 800 800" className="absolute inset-0 h-full w-full" fill="none">
        {[90, 150, 210, 270, 330, 390].map((r) => (
          <circle key={r} cx="400" cy="400" r={r} stroke="#314352" strokeWidth="1" />
        ))}
        <path d="M290 400a110 110 0 0 1 220 0z" fill="#B3A394" />
        <path d="M290 400a110 110 0 0 0 220 0z" fill="#314352" />
        <circle cx="400" cy="400" r="4" fill="#DCE3E8" />
      </svg>
      <div className="absolute inset-0 animate-spin-slow">
        <svg viewBox="0 0 800 800" className="h-full w-full" fill="none">
          <circle cx="400" cy="400" r="240" stroke="#6A6969" strokeWidth="1.5" strokeDasharray="2 10" />
          <circle cx="640" cy="400" r="10" fill="#B3A394" />
        </svg>
      </div>
      <div className="absolute inset-0 animate-spin-slow [animation-direction:reverse] [animation-duration:200s]">
        <svg viewBox="0 0 800 800" className="h-full w-full" fill="none">
          <circle cx="400" cy="400" r="330" stroke="#314352" strokeWidth="1" strokeDasharray="1 14" />
          <circle cx="400" cy="70" r="6" fill="#DCE3E8" />
        </svg>
      </div>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const artY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 200]);
  const nameY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -70]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-[100svh] overflow-hidden bg-pine text-mist"
    >
      <motion.div
        aria-hidden
        style={{ y: artY }}
        className="pointer-events-none absolute -right-[45%] top-[6%] w-[130vw] max-w-[940px] opacity-60 sm:-right-[18%] sm:w-[78vw] sm:opacity-80 lg:-right-[8%] lg:top-[4%] lg:w-[54vw] lg:opacity-100"
      >
        <HeroArt />
      </motion.div>

      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1360px] flex-col justify-end px-5 pb-10 pt-32 sm:px-8 md:pb-14 lg:px-12">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.h1
            style={{ y: nameY }}
            className="font-display text-[clamp(2.4rem,10.8vw,10.5rem)] leading-[0.92] tracking-[-0.02em]"
          >
            {profile.nameLines.map((text, i) => (
              <span
                key={text}
                className={`block overflow-hidden pb-[0.12em] ${indents[i] ?? ""}`}
              >
                <motion.span className="block" variants={line}>
                  {text}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          <motion.div
            variants={fade}
            className="mt-12 grid gap-8 border-t border-mist/15 pt-8 md:mt-16 md:grid-cols-12 md:gap-10"
          >
            <div className="md:col-span-4">
              <ul className="space-y-1 text-lg text-mist">
                {profile.roles.map((role) => (
                  <li key={role}>{role}</li>
                ))}
              </ul>
              <p className="mt-4 flex items-center gap-2 text-sm text-sand">
                <MapPin aria-hidden className="h-4 w-4" />
                {profile.location}
              </p>
            </div>
            <p className="max-w-[44ch] text-lg leading-relaxed text-mist/80 md:col-span-5">
              {profile.intro}
            </p>
            <div className="flex flex-wrap gap-3 md:col-span-3 md:flex-col md:items-end">
              <Button href="#experience" variant="sand">
                Explore My Work
              </Button>
              <Button href="#contact" variant="outline">
                Get in Touch
              </Button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
