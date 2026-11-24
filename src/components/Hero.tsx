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
import { bounce, ease } from "./motion";
import { Blob, CircleText, Flower, Smiley, Sparkle, Squiggle, Sticker } from "./Doodles";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.2 } },
};
const line: Variants = {
  hidden: { y: "115%", rotate: 6 },
  show: { y: 0, rotate: 0, transition: { duration: 1, ease: bounce } },
};
const fade: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease } },
};

const indents = ["", "md:pl-[4vw]", "md:pl-[12vw]"];
const lineColors = ["text-ink", "text-tomato", "text-ink"];
const roleColors = ["bg-sun", "bg-mint", "bg-lilac"];

/** Each letter hops when the mouse passes over it. */
function Bouncy({ text }: { text: string }) {
  return (
    <>
      {Array.from(text).map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          className="inline-block transition-transform duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-[0.12em] hover:-rotate-6"
        >
          {ch}
        </span>
      ))}
    </>
  );
}

/** Sticker cluster in the top-right corner. */
function HeroArt() {
  return (
    <div className="relative aspect-square w-full">
      <Blob className="absolute inset-[6%] h-[88%] w-[88%] text-sun" />
      <div className="absolute left-[18%] top-[16%] w-[52%] -rotate-6 animate-bob">
        <div className="card-pop overflow-hidden p-3 sm:p-4">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full border-2 border-ink bg-tomato" />
            <span className="h-2.5 w-2.5 rounded-full border-2 border-ink bg-sun" />
            <span className="h-2.5 w-2.5 rounded-full border-2 border-ink bg-mint" />
          </div>
          <div className="mt-3 space-y-2">
            <span className="block h-2.5 w-4/5 rounded-full bg-lilac" />
            <span className="block h-2.5 w-3/5 rounded-full bg-sky" />
            <span className="block h-2.5 w-2/3 rounded-full bg-bubble" />
          </div>
          <p className="mt-3 font-hand text-lg leading-none text-ink sm:text-2xl">{"<build & design/>"}</p>
        </div>
      </div>
      <Smiley className="absolute bottom-[10%] left-[8%] w-[26%] rotate-12 animate-bob text-mint [animation-delay:-2s]" />
      <div className="absolute right-[2%] top-[2%] w-[34%] animate-spin-slow">
        <CircleText
          text="software engineering ✶ "
          className="h-full w-full text-cream"
        />
      </div>
      <Flower className="absolute bottom-[4%] right-[10%] w-[24%] animate-spin-slow [animation-duration:40s]" />
      <Sparkle className="absolute left-[2%] top-[4%] w-[12%] animate-bob text-tomato [animation-delay:-4s]" />
    </div>
  );
}

function Marquee() {
  const items = [...profile.roles, profile.location];
  const row = (hidden: boolean) => (
    <div aria-hidden={hidden} className="flex shrink-0 items-center">
      {items.map((t) => (
        <span key={t} className="flex items-center">
          <span className="px-6 font-display text-2xl font-extrabold tracking-tight md:text-3xl">{t}</span>
          <Sparkle className="h-6 w-6 shrink-0 text-sun md:h-7 md:w-7" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="relative z-10 -mt-2 bg-cream pb-16 pt-6 md:pb-24">
      <div aria-hidden className="absolute inset-x-[-5%] top-10 h-14 rotate-[2.5deg] border-y-[2.5px] border-ink bg-mint md:h-16" />
      <div className="group relative -rotate-[1.5deg] overflow-hidden border-y-[2.5px] border-ink bg-tomato py-3 text-ink">
        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {row(false)}
          {row(true)}
        </div>
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
  const artY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 160]);
  const artR = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 12]);
  const nameY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -60]);
  const sparkY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, -220]);

  return (
    <>
      <section
        id="home"
        ref={ref}
        className="dots relative min-h-[100svh] overflow-hidden bg-cream text-ink"
      >
        <motion.div
          aria-hidden
          initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.3, ease: bounce }}
          className="pointer-events-none absolute -right-[6%] top-[8%] w-[46vw] max-w-[560px] sm:-right-[6%] sm:w-[48vw] lg:right-[3%] lg:top-[11%] lg:w-[36vw]"
        >
          <motion.div style={{ y: artY, rotate: artR }}>
            <HeroArt />
          </motion.div>
        </motion.div>

        <motion.div
          aria-hidden
          style={{ y: sparkY }}
          className="pointer-events-none absolute left-[46%] top-[20%] hidden md:block"
        >
          <Sparkle className="h-10 w-10 animate-bob text-lilac" />
        </motion.div>

        <div className="relative mx-auto flex min-h-[100svh] w-full max-w-[1360px] flex-col justify-end px-5 pb-10 pt-36 sm:px-8 md:pb-14 lg:px-12">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.div variants={fade} className="mb-4 md:mb-6">
              <Sticker rotate={-5} color="bg-sun">
                hello, I&apos;m
              </Sticker>
            </motion.div>

            <motion.h1
              style={{ y: nameY }}
              aria-label={profile.name}
              className="font-display text-[clamp(2.3rem,10.4vw,9.5rem)] font-extrabold leading-[0.9] tracking-[-0.045em]"
            >
              {profile.nameLines.map((text, i) => (
                <span
                  key={text}
                  aria-hidden
                  className={`-mt-[0.14em] block overflow-hidden pb-[0.1em] pt-[0.14em] ${indents[i] ?? ""}`}
                >
                  <motion.span
                    className={`relative block origin-bottom-left ${lineColors[i] ?? ""}`}
                    variants={line}
                  >
                    <Bouncy text={text} />
                  </motion.span>
                </span>
              ))}
            </motion.h1>
            <motion.div variants={fade} className={indents[2]}>
              <Squiggle className="-mt-1 h-5 w-40 text-tomato md:h-6 md:w-56" />
            </motion.div>

            <motion.div
              variants={fade}
              className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12 md:gap-10"
            >
              <div className="md:col-span-4">
                <ul className="flex flex-wrap gap-2">
                  {profile.roles.map((role, i) => (
                    <li
                      key={role}
                      className={`chip shadow-pop-sm transition-transform duration-300 hover:-rotate-3 hover:scale-105 ${roleColors[i % roleColors.length]}`}
                    >
                      {role}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 flex items-center gap-2 text-sm font-semibold">
                  <span className="grid h-7 w-7 place-items-center rounded-full border-2 border-ink bg-sky">
                    <MapPin aria-hidden className="h-3.5 w-3.5" />
                  </span>
                  {profile.location}
                </p>
              </div>
              <div aria-hidden className="hidden md:col-span-5 md:block" />
              <div className="flex flex-wrap gap-4 md:col-span-3 md:flex-col md:items-end">
                <Button href="#experience" variant="tomato">
                  Explore My Work
                </Button>
                <Button href="#contact" variant="white">
                  Get in Touch
                </Button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <Marquee />
    </>
  );
}
