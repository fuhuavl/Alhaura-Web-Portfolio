import type { ReactNode } from "react";
import { Reveal, SplitText } from "./motion";

const tones = {
  pine: "bg-pine text-mist",
  mist: "bg-mist text-pine tone-mist",
  slate: "bg-slate text-mist",
  sand: "bg-sand text-pine tone-sand",
} as const;

export type Tone = keyof typeof tones;

export function Section({
  id,
  tone,
  className = "",
  children,
}: {
  id: string;
  tone: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={`${tones[tone]} relative overflow-x-clip ${className}`}
    >
      <div className="mx-auto w-full max-w-[1360px] px-5 py-24 sm:px-8 md:py-32 lg:px-12 lg:py-40">
        {children}
      </div>
    </section>
  );
}

/** Sticky heading column on the left, content on the right (stacked on small screens). */
export function SectionLayout({
  title,
  note,
  children,
}: {
  title: string;
  note?: string;
  children: ReactNode;
}) {
  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-28">
          <SplitText
            text={title}
            className="font-display text-[clamp(2.5rem,10vw,4.5rem)] leading-[1.02] lg:text-[clamp(2rem,3.6vw,3.25rem)]"
          />
          {note ? (
            <Reveal delay={0.2}>
              <p className="mt-6 max-w-[32ch] text-base leading-relaxed opacity-75">
                {note}
              </p>
            </Reveal>
          ) : null}
        </div>
      </div>
      <div className="lg:col-span-8">{children}</div>
    </div>
  );
}

export function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="font-display text-3xl leading-tight md:text-4xl">
      {children}
    </h3>
  );
}
