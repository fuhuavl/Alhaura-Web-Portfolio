"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectGallery } from "./ProjectGallery";
import { revealProps } from "./motion";
import { Sparkle } from "./Doodles";

const accents = [
  { bg: "bg-sun", hex: "#FFC83D" },
  { bg: "bg-mint", hex: "#2FD39A" },
  { bg: "bg-bubble", hex: "#FF8FC7" },
  { bg: "bg-lilac", hex: "#B69CFF" },
  { bg: "bg-tomato", hex: "#FF5B3A" },
  { bg: "bg-sky", hex: "#57B6FF" },
];

/** One project: title and links on the left, story and stack on the right, pictures below. */
export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const a = accents[index % accents.length];
  return (
    <motion.article
      {...revealProps(0, 40)}
      id={project.id}
      aria-labelledby={`${project.id}-title`}
      className="scroll-mt-28"
    >
      <div className="overflow-hidden rounded-[2rem] border-[2.5px] border-ink bg-white text-ink shadow-pop-lg">
        <div className={`flex items-center justify-between gap-4 border-b-[2.5px] border-ink px-6 py-3 md:px-10 ${a.bg}`}>
          <span className="font-display text-sm font-extrabold uppercase tracking-widest">
            Project {String(index + 1).padStart(2, "0")}
          </span>
          <span aria-hidden className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full border-2 border-ink bg-white" />
            <span className="h-3 w-3 rounded-full border-2 border-ink bg-white" />
            <span className="h-3 w-3 rounded-full border-2 border-ink bg-ink" />
          </span>
        </div>

        <div className="grid gap-10 p-6 md:p-10 lg:grid-cols-12 lg:gap-12">
          <header className="lg:col-span-5">
            <h3
              id={`${project.id}-title`}
              className="font-display text-[clamp(2rem,5vw,3.4rem)] font-extrabold leading-[1.02] tracking-[-0.03em]"
            >
              {project.title}
            </h3>
            <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-ink/85">
              {project.tagline}
            </p>
            {project.repo ? (
              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                className={`group mt-7 inline-flex items-center gap-2 rounded-full border-[2.5px] border-ink px-5 py-2.5 font-bold text-ink shadow-pop-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-pop active:translate-y-0.5 active:shadow-none ${a.bg}`}
              >
                View on GitHub
                <ArrowUpRight
                  aria-hidden
                  className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:rotate-45"
                />
              </a>
            ) : null}
          </header>

          <div className="lg:col-span-7">
            {project.overview ? (
              <p className="max-w-[62ch] text-lg leading-relaxed text-ink/85">{project.overview}</p>
            ) : null}

            <dl className={`space-y-3 ${project.overview ? "mt-8" : ""}`}>
              {project.features.map((f) => (
                <div
                  key={f.label}
                  className="grid gap-1 rounded-2xl border-2 border-ink/15 p-4 transition-colors duration-300 hover:border-ink sm:grid-cols-[10rem_1fr] sm:gap-6"
                >
                  <dt className="flex items-start gap-2 text-sm font-bold">
                    <Sparkle className="mt-0.5 h-3.5 w-3.5 shrink-0" style={{ color: a.hex }} />
                    {f.label}
                  </dt>
                  <dd className="leading-relaxed text-ink/85">{f.text}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 rounded-2xl border-2 border-ink bg-cream p-5">
              <p className="font-display text-xl font-extrabold tracking-tight">Tech stack & tools</p>
              <dl className="mt-3">
                {project.stack.map((s) => (
                  <div
                    key={s.label}
                    className="grid gap-1 border-t-2 border-dashed border-ink/15 py-3 sm:grid-cols-[10rem_1fr] sm:gap-6"
                  >
                    <dt className="text-sm font-semibold text-ink/65">{s.label}</dt>
                    <dd className="font-medium leading-relaxed">{s.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        <div className="border-t-[2.5px] border-dashed border-ink/20 px-6 py-8 md:px-10">
          <ProjectGallery images={project.images} />
        </div>
      </div>
    </motion.article>
  );
}
