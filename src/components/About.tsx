import { profile } from "@/data/profile";
import { education } from "@/data/education";
import { Section, SectionLayout, SubHeading } from "./Section";
import { Reveal } from "./motion";

export function About() {
  return (
    <Section id="about" tone="mist">
      <SectionLayout title="About me">
        <Reveal>
          <p className="font-display text-[clamp(1.6rem,3.2vw,2.6rem)] leading-[1.2]">
            {profile.aboutLead}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-slate">
            {profile.aboutBody}
          </p>
        </Reveal>

        <dl className="mt-14 grid border-t border-pine/20 sm:grid-cols-2">
          {profile.facts.map((fact, i) => (
            <Reveal
              key={fact.label}
              delay={i * 0.08}
              className="border-b border-pine/20 py-5 sm:pr-6 sm:[&:nth-child(odd)]:border-r"
            >
              <dt className="text-sm text-slate">{fact.label}</dt>
              <dd className="mt-1 font-display text-2xl md:text-3xl">{fact.value}</dd>
            </Reveal>
          ))}
        </dl>

        <div id="education" className="mt-24">
          <Reveal>
            <SubHeading>Education</SubHeading>
          </Reveal>
          <ul className="mt-8">
            {education.map((item, i) => (
              <Reveal
                key={item.institution}
                delay={i * 0.1}
                className="grid gap-3 border-t border-pine/20 py-7 md:grid-cols-[11rem_1fr] md:gap-8"
              >
                <p className="text-sm text-slate">{item.period}</p>
                <div>
                  <h4 className="font-display text-2xl leading-snug md:text-3xl">
                    {item.institution}
                  </h4>
                  <p className="mt-1 text-lg">{item.program}</p>
                  <ul className="mt-3 space-y-1 text-slate">
                    {item.details.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </SectionLayout>
    </Section>
  );
}
