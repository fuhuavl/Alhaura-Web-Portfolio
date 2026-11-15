"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { Section } from "./Section";
import { Button } from "./Button";
import { Reveal, SplitText, revealProps } from "./motion";

/** Home page preview: one picture per project, each at its real proportions. */
export function Projects() {
  const hasProjects = projects.length > 0;

  return (
    <Section id="projects" tone="slate">
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
          {hasProjects ? (
            <Reveal delay={0.12} className="mt-8">
              <Button href="/projects" variant="sand">
                View Projects
              </Button>
            </Reveal>
          ) : null}
        </div>
      </div>

      {hasProjects ? (
        <ul
          aria-label="Project previews"
          className="-mx-5 mt-14 flex snap-x gap-3 overflow-x-auto px-5 pb-4 [scrollbar-color:#6A6969_transparent] [scrollbar-width:thin] sm:-mx-8 sm:px-8 md:mt-20 md:gap-4 lg:mx-0 lg:px-0"
        >
          {projects.map((project, i) => {
            const cover = project.images[0];
            return (
              <motion.li
                key={project.id}
                {...revealProps(Math.min(i, 4) * 0.08, 24)}
                className="shrink-0 snap-start"
              >
                <Link
                  href={`/projects#${project.id}`}
                  className="group block"
                  aria-label={`${project.title}, view project`}
                >
                  <span className="block overflow-hidden bg-pine/30">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cover.src}
                      alt=""
                      width={cover.width}
                      height={cover.height}
                      loading="lazy"
                      decoding="async"
                      className="block h-[170px] w-auto max-w-none transition-transform duration-700 ease-out group-hover:scale-[1.04] sm:h-[210px] md:h-[250px]"
                    />
                  </span>
                  <span className="mt-3 block max-w-[22ch] font-display text-lg leading-snug transition-colors duration-300 group-hover:text-sand">
                    {project.title}
                  </span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      ) : null}
    </Section>
  );
}
