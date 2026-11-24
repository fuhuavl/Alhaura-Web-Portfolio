"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { projects } from "@/data/projects";
import { Section } from "./Section";
import { Button } from "./Button";
import { Parallax, Reveal, SplitText, popProps } from "./motion";
import { Blob, DoodleArrow, Sparkle, Sticker } from "./Doodles";

const tilts = [-3, 2.5, -1.5, 3, -2.5, 1.5];
const tapes = ["bg-sun", "bg-bubble", "bg-mint", "bg-lilac", "bg-tomato", "bg-sun"];

/** Home page preview: one polaroid per project, each picture at its real proportions. */
export function Projects() {
  const hasProjects = projects.length > 0;

  return (
    <Section
      id="projects"
      tone="sky"
      decor={
        <>
          <Parallax speed={100} className="absolute -right-24 -top-10">
            <Blob className="h-80 w-80 text-sun/70" />
          </Parallax>
          <Parallax speed={150} className="absolute bottom-[18%] left-[42%] hidden md:block">
            <Sparkle className="h-12 w-12 animate-bob text-cream" />
          </Parallax>
        </>
      }
    >
      <div className="relative">
        <SplitText
          text="Projects"
          className="font-display text-[clamp(3.5rem,16vw,13rem)] font-extrabold leading-[0.88] tracking-[-0.05em]"
        />
        <Reveal delay={0.4} className="absolute right-0 top-2 hidden sm:block md:right-[8%]">
          <Sticker rotate={8} color="bg-cream" className="text-3xl">
            fresh builds!
          </Sticker>
        </Reveal>
      </div>

      <div className="mt-12 grid gap-8 lg:mt-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="max-w-[34ch] text-xl font-medium leading-relaxed text-ink/90">
              {hasProjects
                ? `${projects.length} projects across games, backend systems, and full-stack web apps.`
                : "Projects will be added here once they are ready."}
            </p>
          </Reveal>
          {hasProjects ? (
            <Reveal delay={0.12} className="mt-8 flex items-end gap-4">
              <Button href="/projects" variant="sun">
                View Projects
              </Button>
              <DoodleArrow className="hidden h-14 w-20 rotate-[20deg] text-ink sm:block" />
            </Reveal>
          ) : null}
        </div>
      </div>

      {hasProjects ? (
        <ul
          aria-label="Project previews"
          className="-mx-5 mt-14 flex snap-x gap-6 overflow-x-auto px-5 pb-10 pt-6 [scrollbar-color:#1E1633_transparent] [scrollbar-width:thin] sm:-mx-8 sm:px-8 md:mt-16 md:gap-8 lg:-mx-12 lg:px-12"
        >
          {projects.map((project, i) => {
            const cover = project.images[0];
            const tilt = tilts[i % tilts.length];
            return (
              <motion.li
                key={project.id}
                {...popProps(Math.min(i, 4) * 0.08, tilt)}
                className="shrink-0 snap-start"
              >
                <Link
                  href={`/projects#${project.id}`}
                  data-cursor="view"
                  className="group relative block rounded-[1.25rem] border-[2.5px] border-ink bg-white p-3 pb-4 shadow-pop transition-[transform,box-shadow] duration-300 [transition-timing-function:cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-2 hover:rotate-2 hover:shadow-pop-lg"
                  aria-label={`${project.title}, view project`}
                >
                  <span
                    aria-hidden
                    className={`absolute -top-3 left-1/2 z-10 h-6 w-20 -translate-x-1/2 -rotate-3 border-2 border-ink/80 opacity-90 ${tapes[i % tapes.length]}`}
                  />
                  <span className="block overflow-hidden rounded-xl border-2 border-ink bg-cream">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cover.src}
                      alt=""
                      width={cover.width}
                      height={cover.height}
                      loading="lazy"
                      decoding="async"
                      className="block h-[170px] w-auto max-w-none transition-transform duration-700 ease-out group-hover:scale-[1.06] sm:h-[210px] md:h-[250px]"
                    />
                  </span>
                  <span className="mt-3 block max-w-[24ch] px-1 font-display text-lg font-extrabold leading-snug tracking-tight">
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
