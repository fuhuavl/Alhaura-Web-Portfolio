import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { Reveal, SplitText } from "@/components/motion";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `Projects | ${profile.name}`,
  description: `Selected projects by ${profile.name}: games, backend systems, and full-stack web apps.`,
};

export default function ProjectsPage() {
  return (
    <>
      <Navbar page="projects" />
      <main id="main">
        <Section id="projects-all" tone="slate">
          <Reveal>
            <a
              href="/#projects"
              className="group inline-flex items-center gap-2 text-sand transition-colors hover:text-mist"
            >
              <ArrowLeft
                aria-hidden
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
              />
              Back to home
            </a>
          </Reveal>

          <SplitText
            as="h1"
            text="Projects"
            className="mt-10 font-display text-[clamp(3.5rem,17vw,14rem)] leading-[0.9] tracking-[-0.02em]"
          />
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-[44ch] text-xl leading-relaxed text-mist/85">
              {projects.length} projects across games, backend systems, and full-stack web
              apps. Select any picture to see it full size.
            </p>
          </Reveal>

          <div className="mt-16 md:mt-24">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
