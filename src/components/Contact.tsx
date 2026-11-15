import { MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { Section } from "./Section";
import { Reveal, SplitText } from "./motion";
import { ContactForm } from "./ContactForm";

const linkClass =
  "relative inline-block after:absolute after:-bottom-1 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-pine after:transition-transform after:duration-500 hover:after:scale-x-100 focus-visible:after:scale-x-100";

export function Contact() {
  return (
    <Section id="contact" tone="sand">
      <SplitText
        text="Let's build something meaningful."
        className="max-w-[16ch] font-display text-[clamp(2.75rem,9.5vw,9rem)] leading-[0.95] tracking-[-0.02em]"
      />

      <div className="mt-16 grid gap-14 border-t border-pine/25 pt-10 md:mt-24 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-7">
          <ContactForm />
        </Reveal>

        <Reveal delay={0.12} className="lg:col-span-5">
          <p className="flex items-center gap-2 text-sm">
            <MapPin aria-hidden className="h-4 w-4" /> Location
          </p>
          <p className="mt-3 font-display text-2xl">{profile.location}</p>

          <p className="mt-10 text-sm">Elsewhere</p>
          <ul className="mt-3 space-y-2 text-xl">
            {profile.socials.map((s) => (
              <li key={s.label}>
                {s.href ? (
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClass}
                  >
                    {s.label}
                  </a>
                ) : (
                  <span>
                    {s.label}{" "}
                    <span className="text-base text-slate">(link coming soon)</span>
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
