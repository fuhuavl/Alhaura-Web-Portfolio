"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/projects";
import { ProjectGallery } from "./ProjectGallery";
import { revealProps } from "./motion";

/** One project: title and links on the left, story and stack on the right, pictures below. */
export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.article
      {...revealProps(0, 32)}
      aria-labelledby={`${project.id}-title`}
      className="border-t border-mist/20 py-14 md:py-20"
    >
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <header className="lg:col-span-5">
          <h3
            id={`${project.id}-title`}
            className="font-display text-[clamp(2rem,5.2vw,3.5rem)] leading-[1.05]"
          >
            {project.title}
          </h3>
          <p className="mt-5 max-w-[40ch] text-lg leading-relaxed text-mist/85">
            {project.tagline}
          </p>
          <a
            href={project.repo}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-7 inline-flex items-center gap-2 border-b border-sand pb-1 text-sand transition-colors hover:text-mist hover:border-mist"
          >
            View on GitHub
            <ArrowUpRight
              aria-hidden
              className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </a>
        </header>

        <div className="lg:col-span-7">
          {project.overview ? (
            <p className="max-w-[62ch] text-lg leading-relaxed text-mist/85">
              {project.overview}
            </p>
          ) : null}

          <dl className={project.overview ? "mt-8" : ""}>
            {project.features.map((f) => (
              <div
                key={f.label}
                className="grid gap-1 border-t border-mist/15 py-4 sm:grid-cols-[10rem_1fr] sm:gap-6"
              >
                <dt className="text-sm text-sand">{f.label}</dt>
                <dd className="leading-relaxed text-mist/85">{f.text}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 border-t border-mist/15 pt-6 font-display text-xl text-sand">
            Tech stack & tools
          </p>
          <dl>
            {project.stack.map((s) => (
              <div
                key={s.label}
                className="grid gap-1 border-b border-mist/10 py-3 sm:grid-cols-[10rem_1fr] sm:gap-6"
              >
                <dt className="text-sm text-mist/60">{s.label}</dt>
                <dd className="leading-relaxed">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="mt-10 md:mt-14">
        <ProjectGallery images={project.images} />
      </div>
    </motion.article>
  );
}
