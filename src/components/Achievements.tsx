"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import { awards, workshops } from "@/data/achievements";
import { Section, SectionLayout, SubHeading } from "./Section";
import { Reveal, revealProps } from "./motion";

function WorkshopTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 55%"],
  });

  return (
    <div ref={ref} className="relative mt-8 pl-8">
      <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-pine/15" />
      <motion.span
        aria-hidden
        style={{ scaleY: scrollYProgress }}
        className="absolute bottom-2 left-[5px] top-2 w-px origin-top bg-slate"
      />
      <ol className="space-y-10">
        {workshops.map((group, gi) => (
          <motion.li key={group.year} {...revealProps(gi * 0.05, 20)} className="relative">
            <span
              aria-hidden
              className="absolute -left-8 top-[0.65rem] h-[11px] w-[11px] rounded-full border border-slate bg-mist"
            />
            <p className="font-display text-2xl">{group.year}</p>
            <ul className="mt-3 space-y-2 text-lg text-slate">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}

export function Achievements() {
  return (
    <Section id="achievements" tone="mist">
      <SectionLayout title="Achievements">
        <Reveal>
          <SubHeading>Awards</SubHeading>
        </Reveal>
        <ul className="mt-8 border-t border-pine/20">
          {awards.map((award, i) => (
            <motion.li
              key={award.title}
              {...revealProps(i * 0.08, 24)}
              className="group grid gap-2 border-b border-pine/20 py-7 md:grid-cols-[7rem_1fr] md:gap-8"
            >
              <p className="font-display text-4xl leading-none text-ash transition-colors duration-500 group-hover:text-slate">
                {award.year}
              </p>
              <div>
                <h4 className="font-display text-2xl leading-snug md:text-3xl">
                  {award.title}
                </h4>
                <p className="mt-2 inline-block rounded-full border border-slate/50 px-3 py-1 text-sm text-slate">
                  {award.result}
                </p>
                {award.detail ? (
                  <p className="mt-3 max-w-[52ch] text-slate">{award.detail}</p>
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
