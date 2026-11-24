"use client";

import { useState, type CSSProperties } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { experience, type ExperienceItem } from "@/data/experience";
import { Section, SectionLayout } from "./Section";
import { Parallax, ease, revealProps } from "./motion";
import { Burst, Sparkle } from "./Doodles";

const accents = ["#FF5B3A", "#FFC83D", "#2FD39A", "#57B6FF", "#B69CFF", "#FF8FC7"];

function Period({ item }: { item: ExperienceItem }) {
  return (
    <span className="inline-flex items-center gap-2">
      {item.current ? (
        <span aria-hidden className="h-2 w-2 animate-pulse-dot rounded-full bg-mint" />
      ) : null}
      {item.period}
    </span>
  );
}

function Row({
  item,
  index,
  open,
  onToggle,
}: {
  item: ExperienceItem;
  index: number;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `exp-${item.id}`;
  const accent = accents[index % accents.length];
  return (
    <motion.li {...revealProps((index % 4) * 0.07, 24)}>
      <div
        className={`group relative rounded-[1.6rem] border-[2.5px] transition-[background-color,border-color,transform] duration-300 ${
          open
            ? "border-cream bg-cream text-ink"
            : "border-cream/20 bg-cream/[0.04] hover:-translate-y-1 hover:border-cream/60"
        }`}
        style={
          open
            ? ({ boxShadow: `6px 6px 0 0 ${accent}`, "--focus": "#1E1633" } as CSSProperties)
            : undefined
        }
      >
        <h3>
          <button
            type="button"
            onClick={onToggle}
            aria-expanded={open}
            aria-controls={panelId}
            className="flex w-full items-start justify-between gap-5 rounded-[1.4rem] p-5 text-left md:items-center md:p-7"
          >
            <span className="flex min-w-0 items-start gap-4 md:items-center">
              <span
                aria-hidden
                className="mt-1 grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-ink font-display text-sm font-extrabold text-ink transition-transform duration-500 group-hover:rotate-12 md:mt-0 md:h-12 md:w-12"
                style={{ backgroundColor: accent }}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="block min-w-0">
                <span className="block font-display text-[1.5rem] font-extrabold leading-tight tracking-tight sm:text-3xl lg:text-[2.1rem]">
                  {item.organization}
                </span>
                <span
                  className={`mt-1 block text-base font-semibold ${open ? "text-ink/75" : "text-sun"}`}
                >
                  {item.role}
                </span>
                <span className={`mt-1 block text-sm md:hidden ${open ? "text-ink/65" : "text-cream/70"}`}>
                  <Period item={item} />
                </span>
              </span>
            </span>
            <span className="flex shrink-0 items-center gap-4">
              {item.current ? (
                <span className="chip hidden border-ink bg-mint sm:inline-flex">Now</span>
              ) : null}
              <span className={`hidden text-sm md:block ${open ? "text-ink/70" : "text-cream/70"}`}>
                <Period item={item} />
              </span>
              <span
                className={`grid h-10 w-10 place-items-center rounded-full border-2 transition-all duration-500 ${
                  open
                    ? "rotate-45 border-ink bg-tomato text-ink"
                    : "border-cream/40 text-cream group-hover:rotate-90 group-hover:border-sun group-hover:text-sun"
                }`}
              >
                <Plus aria-hidden className="h-5 w-5" />
              </span>
            </span>
          </button>
        </h3>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id={panelId}
              role="region"
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="overflow-hidden"
            >
              <ul className="space-y-3 px-5 pb-7 md:pl-[5.75rem] md:pr-16">
                {item.points.map((point, i) => (
                  <motion.li
                    key={point}
                    initial={{ opacity: 0, x: -14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + i * 0.07, duration: 0.5, ease }}
                    className="flex gap-3 text-[1.05rem] leading-relaxed text-ink/85"
                  >
                    <Sparkle className="mt-1.5 h-3.5 w-3.5 shrink-0" style={{ color: accent }} />
                    {point}
                  </motion.li>
                ))}
                {item.location ? (
                  <li className="pt-1 text-sm text-ink/60">{item.location}</li>
                ) : null}
              </ul>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </motion.li>
  );
}

export function Experience() {
  const [openId, setOpenId] = useState<string | null>(experience[0]?.id ?? null);

  return (
    <Section
      id="experience"
      tone="ink"
      decor={
        <>
          <Parallax speed={120} className="absolute -right-16 top-[10%]">
            <Burst className="h-48 w-48 animate-spin-slow text-tomato/90 [animation-duration:50s]" />
          </Parallax>
          <Parallax speed={70} className="absolute bottom-[12%] left-[4%] hidden lg:block">
            <Sparkle className="h-16 w-16 animate-bob text-sun" />
          </Parallax>
        </>
      }
    >
      <SectionLayout
        title="Experience & Organizations"
        note={`${experience.length} roles across engineering, design, teaching, and event leadership. Select a row to see what I did.`}
      >
        <ul className="space-y-4">
          {experience.map((item, i) => (
            <Row
              key={item.id}
              item={item}
              index={i}
              open={openId === item.id}
              onToggle={() => setOpenId(openId === item.id ? null : item.id)}
            />
          ))}
        </ul>
      </SectionLayout>
    </Section>
  );
}
