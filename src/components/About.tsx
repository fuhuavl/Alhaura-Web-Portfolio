"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { profile } from "@/data/profile";
import { education } from "@/data/education";
import { Section, SectionLayout, SubHeading } from "./Section";
import { Parallax, Reveal, popProps, revealProps } from "./motion";
import { Flower, Sparkle, Sticker } from "./Doodles";

const factColors = ["bg-sun", "bg-mint", "bg-sky", "bg-bubble"];
const factTilt = [-2.5, 2, -1.5, 2.5];

export function About() {
  return (
    <Section
      id="about"
      tone="lilac"
      decor={
        <>
          <Parallax speed={90} className="absolute -left-10 top-[30%] hidden md:block">
            <Flower className="h-32 w-32 animate-spin-slow" petal="#FFF4E4" center="#FF5B3A" />
          </Parallax>
          <Parallax speed={140} className="absolute right-[6%] top-[12%]">
            <Sparkle className="h-14 w-14 animate-bob text-sun" />
          </Parallax>
          <Parallax speed={60} className="absolute bottom-[8%] right-[30%] hidden lg:block">
            <Sparkle className="h-8 w-8 animate-bob text-cream [animation-delay:-3s]" />
          </Parallax>
        </>
      }
    >
      <SectionLayout title="About me">
        <Reveal>
          <p className="font-display text-[clamp(1.6rem,3.2vw,2.6rem)] font-bold leading-[1.18] tracking-[-0.02em]">
            {profile.aboutLead}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-ink/85">
            {profile.aboutBody}
          </p>
        </Reveal>

        <dl className="mt-14 grid gap-5 sm:grid-cols-2 sm:gap-6">
          {profile.facts.map((fact, i) => (
            <motion.div
              key={fact.label}
              {...popProps(i * 0.08, factTilt[i % factTilt.length])}
              whileHover={{ rotate: 0, y: -6, scale: 1.02 }}
              className={`rounded-[1.5rem] border-[2.5px] border-ink p-6 shadow-pop ${factColors[i % factColors.length]}`}
            >
              <dt className="text-sm font-semibold uppercase tracking-wider text-ink/75">
                {fact.label}
              </dt>
              <dd className="mt-2 font-display text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
                {fact.value}
              </dd>
            </motion.div>
          ))}
        </dl>

        <div id="education" className="mt-24">
          <Reveal className="flex flex-wrap items-center gap-4">
            <SubHeading>Education</SubHeading>
            <Sticker rotate={4} color="bg-cream">
              still learning!
            </Sticker>
          </Reveal>
          <ul className="mt-8 space-y-6">
            {education.map((item, i) => (
              <motion.li
                key={item.institution}
                {...revealProps(i * 0.1)}
              >
                <div className="card-pop card-lift grid gap-4 p-6 md:grid-cols-[11rem_1fr] md:gap-8 md:p-8">
                  <div className="flex items-start gap-3 md:flex-col">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-ink bg-sun">
                      <GraduationCap aria-hidden className="h-5 w-5" />
                    </span>
                    <p className="chip bg-lilac/40">{item.period}</p>
                  </div>
                  <div>
                    <h4 className="font-display text-2xl font-extrabold leading-snug tracking-tight md:text-3xl">
                      {item.institution}
                    </h4>
                    <p className="mt-1 text-lg font-medium">{item.program}</p>
                    <ul className="mt-3 space-y-1.5 text-ink/80">
                      {item.details.map((d) => (
                        <li key={d} className="flex gap-2">
                          <Sparkle className="mt-1.5 h-3 w-3 shrink-0 text-tomato" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </SectionLayout>
    </Section>
  );
}
