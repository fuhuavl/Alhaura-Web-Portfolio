"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { projects, projectsUrl } from "@/data/projects";
import { Section } from "./Section";
import { Button } from "./Button";
import { ProjectCard } from "./ProjectCard";
import { Reveal, SplitText, ease } from "./motion";

export function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [notice, setNotice] = useState(false);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const slow = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [30, -30]);
  const fast = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-20, 60]);

  const hasProjects = projects.length > 0;

  return (
    <Section id="projects" tone="slate">
      <div ref={ref}>
        <SplitText
          text="Projects"
          className="font-display text-[clamp(3.5rem,17vw,14rem)] leading-[0.9] tracking-[-0.02em]"
        />

        <div className="mt-14 grid gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="max-w-[34ch] text-xl leading-relaxed text-mist/85">
                {hasProjects
                  ? `${projects.length} projects across games, backend systems, and full-stack web apps.`
                  : "Projects will be added here once they are ready."}
              </p>
            </Reveal>
            <Reveal delay={0.12} className="mt-8">
              {projectsUrl ? (
                <Button href={projectsUrl} variant="sand">
                  View Projects
                </Button>
              ) : hasProjects ? (
                <Button href="#project-list" variant="sand">
                  View Projects
                </Button>
              ) : (
                <Button variant="sand" onClick={() => setNotice(true)}>
                  View Projects
                </Button>
              )}
            </Reveal>
            <div aria-live="polite" className="mt-5 min-h-[1.5rem]">
              <AnimatePresence>
                {notice ? (
                  <motion.p
                    key="notice"
                    role="status"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease }}
                    className="text-sm text-sand"
                  >
                    No projects are published yet. Check back soon.
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
          </div>

          {!hasProjects ? (
            <div aria-hidden className="grid grid-cols-2 gap-4 md:gap-6 lg:col-span-7">
              <motion.div
                style={{ y: slow }}
                className="hatch aspect-[4/5] border border-dashed border-mist/25"
              />
              <motion.div
                style={{ y: fast }}
                className="hatch mt-12 aspect-[4/5] border border-dashed border-mist/25"
              />
            </div>
          ) : null}
        </div>

        {hasProjects ? (
          <div id="project-list" className="mt-16 scroll-mt-24 md:mt-24">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} />
            ))}
          </div>
        ) : null}
      </div>
    </Section>
  );
}
