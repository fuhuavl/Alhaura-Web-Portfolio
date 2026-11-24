import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Section } from "@/components/Section";
import { ProjectCard } from "@/components/ProjectCard";
import { Parallax, Reveal, SplitText } from "@/components/motion";
import { Blob, Flower, Sparkle, Squiggle, Sticker } from "@/components/Doodles";
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
        <Section
          id="projects-all"
          tone="sky"
          wave={false}
          className="pt-10"
          decor={
            <>
              <Parallax speed={120} className="absolute -right-24 top-10">
                <Blob className="h-96 w-96 text-sun/70" />
              </Parallax>
              <Parallax speed={80} className="absolute right-[18%] top-[16rem] hidden md:block">
                <Flower className="h-24 w-24 animate-spin-slow" />
              </Parallax>
              <Parallax speed={160} className="absolute left-[6%] top-[60%] hidden lg:block">
                <Sparkle className="h-12 w-12 animate-bob text-cream" />
              </Parallax>
            </>
          }
        >
          <Reveal>
            <a
              href="/#projects"
              className="group inline-flex items-center gap-2 rounded-full border-[2.5px] border-ink bg-white px-4 py-2 font-semibold text-ink shadow-pop-sm transition-transform duration-200 hover:-translate-y-0.5"
            >
              <ArrowLeft
                aria-hidden
                className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1"
              />
              Back to home
            </a>
          </Reveal>

          <div className="relative mt-10">
            <SplitText
              as="h1"
              text="Projects"
              className="font-display text-[clamp(3.5rem,16vw,13rem)] font-extrabold leading-[0.88] tracking-[-0.05em]"
            />
            <Squiggle className="mt-2 h-6 w-48 text-sun md:w-72" />
            <Reveal delay={0.4} className="absolute right-0 top-0 hidden sm:block md:right-[10%]">
              <Sticker rotate={7} color="bg-cream" className="text-3xl">
                made with love
              </Sticker>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="mt-8 max-w-[44ch] text-xl font-medium leading-relaxed text-ink/90">
              {projects.length} projects across games, backend systems, and full-stack web
              apps. Select any picture to see it full size.
            </p>
          </Reveal>

          <div className="mt-16 space-y-14 md:mt-24 md:space-y-20">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </Section>
      </main>
      <Footer />
    </>
  );
}
