import { skillGroups, strengths } from "@/data/skills";
import { Section, SectionLayout, SubHeading } from "./Section";
import { Reveal } from "./motion";

export function Skills() {
  return (
    <Section id="skills" tone="pine">
      <SectionLayout title="Technical Skills">
        <div className="grid gap-12 sm:grid-cols-2">
          {skillGroups.map((group, gi) => (
            <Reveal
              key={group.title}
              delay={gi * 0.1}
              className={gi === 0 ? "sm:col-span-2" : ""}
            >
              <h3 className="font-display text-2xl text-sand">{group.title}</h3>
              <ul
                className={`mt-4 border-t border-mist/15 ${
                  gi === 0 ? "sm:grid sm:grid-cols-2 sm:gap-x-10" : ""
                }`}
              >
                {group.items.map((skill) => (
                  <li
                    key={skill}
                    className="group flex items-center justify-between border-b border-mist/15 py-4 text-xl transition-colors duration-300 hover:text-sand"
                  >
                    <span className="transition-transform duration-500 group-hover:translate-x-2">
                      {skill}
                    </span>
                    <span
                      aria-hidden
                      className="h-1.5 w-1.5 scale-0 rounded-full bg-sand transition-transform duration-500 group-hover:scale-100"
                    />
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <div className="mt-24">
          <Reveal>
            <SubHeading>Strengths</SubHeading>
          </Reveal>
          <ul className="mt-8 grid border-t border-mist/15 sm:grid-cols-2">
            {strengths.map((s, i) => (
              <Reveal
                key={s.title}
                delay={i * 0.08}
                className="border-b border-mist/15 py-7 sm:pr-8 sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(even)]:pl-8"
              >
                <h4 className="font-display text-2xl leading-snug">{s.title}</h4>
                <p className="mt-2 max-w-[34ch] text-mist/75">{s.description}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </SectionLayout>
    </Section>
  );
}
