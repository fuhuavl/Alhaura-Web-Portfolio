import { ArrowUpRight, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { Section } from "./Section";
import { Parallax, Reveal, SplitText } from "./motion";
import { ContactForm } from "./ContactForm";
import { DoodleArrow, Flower, Smiley, Sparkle, Squiggle } from "./Doodles";

const socialColors = ["bg-sky", "bg-lilac", "bg-mint", "bg-bubble"];

export function Contact() {
  return (
    <Section
      id="contact"
      tone="sun"
      decor={
        <>
          <Parallax speed={120} className="absolute -right-10 top-[8%]">
            <Flower className="h-40 w-40 animate-spin-slow [animation-duration:45s]" />
          </Parallax>
          <Parallax speed={80} className="absolute left-[46%] top-[6%] hidden lg:block">
            <Sparkle className="h-12 w-12 animate-bob text-tomato" />
          </Parallax>
        </>
      }
    >
      <div className="relative">
        <SplitText
          text="Let's build something meaningful."
          className="max-w-[15ch] font-display text-[clamp(2.75rem,9vw,8.5rem)] font-extrabold leading-[0.92] tracking-[-0.045em]"
        />
        <Squiggle className="mt-3 h-6 w-48 text-tomato md:h-8 md:w-80" />
      </div>

      <div className="mt-16 grid gap-14 md:mt-20 lg:grid-cols-12 lg:gap-12">
        <Reveal className="relative lg:col-span-7">
          <div className="card-pop bg-cream p-6 md:p-9">
            <ContactForm />
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute -top-14 right-6 hidden items-end gap-1 sm:flex"
          >
            <span className="-rotate-6 font-hand text-3xl text-ink">say hi!</span>
            <DoodleArrow className="h-12 w-16 rotate-[70deg] text-ink" />
          </div>
        </Reveal>

        <Reveal delay={0.12} className="space-y-6 lg:col-span-5">
          <div className="card-pop -rotate-1 p-6 transition-transform duration-300 hover:rotate-0">
            <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider">
              <span className="grid h-8 w-8 place-items-center rounded-full border-2 border-ink bg-tomato">
                <MapPin aria-hidden className="h-4 w-4" />
              </span>
              Location
            </p>
            <p className="mt-3 font-display text-3xl font-extrabold tracking-tight">
              {profile.location}
            </p>
          </div>

          <div className="card-pop rotate-1 p-6 transition-transform duration-300 hover:rotate-0">
            <p className="text-sm font-bold uppercase tracking-wider">Elsewhere</p>
            <ul className="mt-4 space-y-3">
              {profile.socials.map((s, i) => (
                <li key={s.label}>
                  {s.href ? (
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center justify-between rounded-2xl border-[2.5px] border-ink px-5 py-3 text-xl font-bold shadow-pop-sm transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-pop active:translate-y-0.5 active:shadow-none ${socialColors[i % socialColors.length]}`}
                    >
                      {s.label}
                      <ArrowUpRight
                        aria-hidden
                        className="h-5 w-5 transition-transform duration-300 group-hover:rotate-45"
                      />
                    </a>
                  ) : (
                    <span className="flex items-center justify-between rounded-2xl border-[2.5px] border-dashed border-ink/50 px-5 py-3 text-xl font-bold">
                      {s.label}{" "}
                      <span className="text-base font-medium text-ink/65">(link coming soon)</span>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <Smiley className="ml-auto mr-4 hidden h-20 w-20 rotate-12 animate-bob text-mint lg:block" />
        </Reveal>
      </div>
    </Section>
  );
}
