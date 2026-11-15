"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { experience, type ExperienceItem } from "@/data/experience";
import { Section, SectionLayout } from "./Section";
import { ease, revealProps } from "./motion";

function Period({ item }: { item: ExperienceItem }) {
  return (
    <span className="inline-flex items-center gap-2">
      {item.current ? (
        <span
          aria-hidden
          className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-sand"
        />
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
  return (
    <motion.li
      {...revealProps((index % 4) * 0.07, 24)}
      className="group relative border-b border-mist/15"
    >
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full items-start justify-between gap-6 py-6 text-left md:py-8"
        >
          <span className="block min-w-0">
            <span className="block font-display text-[1.65rem] leading-tight transition-transform duration-500 group-hover:translate-x-2 sm:text-4xl lg:text-[2.4rem]">
              {item.organization}
            </span>
            <span className="mt-2 block text-base text-sand">{item.role}</span>
            <span className="mt-1 block text-sm text-mist/70 md:hidden">
              <Period item={item} />
            </span>
          </span>
          <span className="flex shrink-0 items-center gap-5">
            <span className="hidden text-sm text-mist/70 md:block">
              <Period item={item} />
            </span>
            <Plus
              aria-hidden
              className={`h-5 w-5 text-sand transition-transform duration-500 ${
                open ? "rotate-45" : ""
              }`}
            />
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
            <ul className="space-y-3 pb-8 md:pr-16">
              {item.points.map((point, i) => (
                <motion.li
                  key={point}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.08, duration: 0.5, ease }}
                  className="flex gap-3 text-[1.05rem] leading-relaxed text-mist/85"
                >
                  <span aria-hidden className="mt-[0.8em] h-px w-5 shrink-0 bg-sand" />
                  {point}
                </motion.li>
              ))}
              {item.location ? (
                <li className="pt-1 text-sm text-mist/60">{item.location}</li>
              ) : null}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <span
        aria-hidden
        className="absolute -bottom-px left-0 h-px w-full origin-left scale-x-0 bg-sand transition-transform duration-700 group-hover:scale-x-100"
      />
    </motion.li>
  );
}

export function Experience() {
  const [openId, setOpenId] = useState<string | null>(experience[0]?.id ?? null);

  return (
    <Section id="experience" tone="pine">
      <SectionLayout
        title="Experience & Organizations"
        note={`${experience.length} roles across engineering, design, teaching, and event leadership. Select a row to see what I did.`}
      >
        <ul className="border-t border-mist/15">
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
