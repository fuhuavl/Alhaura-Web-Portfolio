import type { CSSProperties, ReactNode } from "react";
import { Reveal, SplitText } from "./motion";
import { Squiggle } from "./Doodles";

const tones = {
  cream: { box: "bg-cream text-ink", hex: "#FFF4E4", accent: "#FF5B3A", tex: "dots" },
  sun: { box: "bg-sun text-ink", hex: "#FFC83D", accent: "#FF5B3A", tex: "dots" },
  mint: { box: "bg-mint text-ink", hex: "#2FD39A", accent: "#FFF4E4", tex: "dots" },
  lilac: { box: "bg-lilac text-ink", hex: "#B69CFF", accent: "#FFC83D", tex: "dots" },
  sky: { box: "bg-sky text-ink", hex: "#57B6FF", accent: "#FFC83D", tex: "dots" },
  ink: { box: "bg-ink text-cream tone-ink", hex: "#1E1633", accent: "#FFC83D", tex: "dots-light" },
} as const;

export type Tone = keyof typeof tones;

/** Wavy top edge in the section's own color, so sections flow into each other. */
function Wave({ color }: { color: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      className="pointer-events-none absolute inset-x-0 top-0 h-6 w-full -translate-y-[calc(100%-1px)] md:h-10"
      style={{ color }}
    >
      <path
        d="M0,48L0,24C120,0 240,0 360,24C480,48 600,48 720,24C840,0 960,0 1080,24C1200,48 1320,48 1440,24L1440,48Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Section({
  id,
  tone,
  className = "",
  decor,
  wave = true,
  children,
}: {
  id: string;
  tone: Tone;
  className?: string;
  /** Decorative shapes, drawn behind the content and clipped to the section. */
  decor?: ReactNode;
  wave?: boolean;
  children: ReactNode;
}) {
  const t = tones[tone];
  return (
    <section
      id={id}
      className={`${t.box} relative overflow-x-clip ${className}`}
      style={{ "--accent": t.accent } as CSSProperties}
    >
      {wave ? <Wave color={t.hex} /> : null}
      <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${t.tex}`}>
        {decor}
      </div>
      <div className="relative mx-auto w-full max-w-[1360px] px-5 py-24 sm:px-8 md:py-32 lg:px-12 lg:py-36">
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
            className="font-display text-[clamp(2.5rem,10vw,4.5rem)] font-extrabold leading-[0.98] tracking-[-0.03em] lg:text-[clamp(2.25rem,3.8vw,3.6rem)]"
          />
          <Reveal delay={0.25}>
            <Squiggle className="mt-4 h-5 w-32 text-[color:var(--accent)]" />
          </Reveal>
          {note ? (
            <Reveal delay={0.3}>
              <p className="mt-6 max-w-[32ch] text-base leading-relaxed opacity-80">{note}</p>
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
    <h3 className="font-display text-3xl font-extrabold leading-tight tracking-[-0.02em] md:text-4xl">
      {children}
    </h3>
  );
}
