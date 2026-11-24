"use client";

import { motion } from "framer-motion";
import { Brush, Code2, Lightbulb, Puzzle, Rocket, Users, Wrench } from "lucide-react";
import { skillGroups, strengths } from "@/data/skills";
import { Section, SectionLayout, SubHeading } from "./Section";
import { Parallax, Reveal, popProps, revealProps } from "./motion";
import { Flower, Smiley } from "./Doodles";

const groupIcons = [Code2, Brush, Wrench];
const groupColors = ["bg-sun", "bg-bubble", "bg-sky"];
const chipColors = ["bg-sun", "bg-lilac", "bg-bubble", "bg-sky", "bg-cream", "bg-tomato"];
const strengthIcons = [Users, Brush, Puzzle, Lightbulb];
const strengthColors = ["bg-tomato", "bg-lilac", "bg-sun", "bg-sky"];

export function Skills() {
  return (
    <Section
      id="skills"
      tone="mint"
      decor={
        <>
          <Parallax speed={100} className="absolute -right-12 top-[14%]">
            <Flower className="h-36 w-36 animate-spin-slow [animation-duration:40s]" petal="#FFF4E4" center="#FF5B3A" />
          </Parallax>
          <Parallax speed={60} className="absolute bottom-[6%] left-[3%] hidden md:block">
            <Smiley className="h-20 w-20 -rotate-12 animate-bob text-sun" />
          </Parallax>
        </>
      }
    >
      <SectionLayout title="Technical Skills">
        <div className="grid gap-6 sm:grid-cols-2">
          {skillGroups.map((group, gi) => {
            const Icon = groupIcons[gi % groupIcons.length] ?? Rocket;
            return (
              <motion.div
                key={group.title}
                {...revealProps(gi * 0.1)}
                className={gi === 0 ? "sm:col-span-2" : ""}
              >
                <div className="card-pop h-full p-6 md:p-7">
                  <h3 className="flex items-center gap-3 font-display text-2xl font-extrabold tracking-tight">
                    <span
                      className={`grid h-10 w-10 place-items-center rounded-xl border-2 border-ink ${groupColors[gi % groupColors.length]}`}
                    >
                      <Icon aria-hidden className="h-5 w-5" />
                    </span>
                    {group.title}
                  </h3>
                  <ul className="mt-5 flex flex-wrap gap-2.5">
                    {group.items.map((skill, si) => (
                      <motion.li
                        key={skill}
                        initial={{ opacity: 0, scale: 0.6 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 + si * 0.05, type: "spring", stiffness: 380, damping: 18 }}
                        whileHover={{ y: -5, rotate: si % 2 === 0 ? -5 : 5, scale: 1.06 }}
                        className={`chip px-4 py-2 text-base shadow-pop-sm ${chipColors[(si + gi) % chipColors.length]}`}
                      >
                        {skill}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-24">
          <Reveal>
            <SubHeading>Strengths</SubHeading>
          </Reveal>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2">
            {strengths.map((s, i) => {
              const Icon = strengthIcons[i % strengthIcons.length] ?? Rocket;
              return (
                <motion.li
                  key={s.title}
                  {...popProps(i * 0.08, i % 2 === 0 ? -1.5 : 1.5)}
                  whileHover={{ rotate: 0, y: -6 }}
                  className="card-pop group p-6 hover:shadow-pop-lg"
                >
                  <span
                    className={`grid h-12 w-12 place-items-center rounded-full border-2 border-ink transition-transform duration-500 group-hover:rotate-[360deg] ${strengthColors[i % strengthColors.length]}`}
                  >
                    <Icon aria-hidden className="h-5 w-5" />
                  </span>
                  <h4 className="mt-4 font-display text-2xl font-extrabold leading-snug tracking-tight">
                    {s.title}
                  </h4>
                  <p className="mt-2 max-w-[34ch] text-ink/80">{s.description}</p>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </SectionLayout>
    </Section>
  );
}
