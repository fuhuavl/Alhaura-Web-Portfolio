"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { awards, workshops } from "@/data/achievements";
import { Section, SectionLayout, SubHeading } from "./Section";
import { Parallax, Reveal, popProps, revealProps } from "./motion";
import { Burst, Sparkle, Sticker } from "./Doodles";

const sealColors = ["text-sun", "text-mint", "text-bubble", "text-sky", "text-lilac", "text-tomato"];
const dotColors = ["bg-tomato", "bg-sun", "bg-mint", "bg-sky", "bg-lilac", "bg-bubble"];

function WorkshopTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });

  return (
    <div ref={ref} className="relative mt-8 pl-12">
      <span aria-hidden className="absolute bottom-2 left-[13px] top-2 w-1.5 rounded-full bg-ink/10" />
      <motion.span
        aria-hidden
        style={{ scaleY: scrollYProgress }}
        className="absolute bottom-2 left-[13px] top-2 w-1.5 origin-top rounded-full bg-gradient-to-b from-tomato via-sun to-mint"
      />
      <ol className="space-y-8">
        {workshops.map((group, gi) => (
          <motion.li key={group.year} {...revealProps(gi * 0.05, 20)} className="relative">
            <span
              aria-hidden
              className={`absolute -left-12 top-1 h-8 w-8 rounded-full border-[2.5px] border-ink ${dotColors[gi % dotColors.length]}`}
            />
            <div className="card-pop card-lift p-5 md:p-6">
              <p className="font-display text-3xl font-extrabold tracking-tight">{group.year}</p>
              <ul className="mt-3 space-y-2 text-lg text-ink/85">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Sparkle className="mt-1.5 h-3.5 w-3.5 shrink-0 text-tomato" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

export function Achievements() {
  return (
    <Section
      id="achievements"
      tone="cream"
      decor={
        <>
          <Parallax speed={110} className="absolute -left-14 top-[18%] hidden md:block">
            <Burst className="h-40 w-40 animate-spin-slow text-sun [animation-duration:60s]" />
          </Parallax>
          <Parallax speed={70} className="absolute bottom-[10%] right-[5%]">
            <Sparkle className="h-14 w-14 animate-bob text-lilac" />
          </Parallax>
        </>
      }
    >
      <SectionLayout title="Achievements">
        <Reveal className="flex flex-wrap items-center gap-4">
          <SubHeading>Awards</SubHeading>
          <Sticker rotate={-4} color="bg-mint">
            yay!
          </Sticker>
        </Reveal>
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {awards.map((award, i) => (
            <motion.li
              key={award.title}
              {...popProps((i % 4) * 0.08, i % 2 === 0 ? -1 : 1)}
              whileHover={{ rotate: 0, y: -6 }}
              className="group card-pop flex gap-5 p-5 hover:shadow-pop-lg md:p-6"
            >
              <Burst
                className={`h-20 w-20 shrink-0 transition-transform duration-700 group-hover:rotate-[60deg] ${sealColors[i % sealColors.length]}`}
              >
                <span className="font-display text-lg font-extrabold text-ink">{award.year}</span>
              </Burst>
              <div className="min-w-0">
                <h4 className="font-display text-xl font-extrabold leading-snug tracking-tight md:text-2xl">
                  {award.title}
                </h4>
                <p className="chip mt-2 bg-sun">{award.result}</p>
                {award.detail ? (
                  <p className="mt-3 max-w-[52ch] text-ink/80">{award.detail}</p>
                ) : null}
              </div>
            </motion.li>
          ))}
        </ul>

        <div className="mt-24">
          <Reveal>
            <SubHeading>Workshops & Seminars</SubHeading>
          </Reveal>
          <WorkshopTimeline />
        </div>
      </SectionLayout>
    </Section>
  );
}
