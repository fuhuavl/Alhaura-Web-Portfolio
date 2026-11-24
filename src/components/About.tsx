"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { GraduationCap } from "lucide-react";
import { profile } from "@/data/profile";
import { education } from "@/data/education";
import { Section, SectionLayout, SubHeading } from "./Section";
import { Parallax, Reveal, popProps, revealProps } from "./motion";
import { Flower, Sparkle, Sticker } from "./Doodles";

const factColors = ["bg-sun", "bg-mint", "bg-sky", "bg-bubble"];
const factTilt = [-2.5, 2, -1.5, 2.5];

type Photo = {
  src: string;
  width: number;
  height: number;
  alt: string;
  tilt: number;
  /** How far it drifts against the scroll, in px (wide screens only). */
  speed: number;
  tape: string;
  /** Position in the collage on wide screens. */
  place: string;
};

const photos: Photo[] = [
  {
    src: "/projects/aboutme/ab1.jpg",
    width: 4240,
    height: 2832,
    alt: "Alhaura speaking into a microphone in front of an audience",
    tilt: -3,
    speed: 18,
    tape: "bg-sun",
    place: "sm:left-[3%] sm:top-[7%] sm:z-20 sm:w-[58%]",
  },
  {
    src: "/projects/aboutme/ab3.jpg",
    width: 1600,
    height: 1066,
    alt: "Alhaura with teammates in blue jackets posing around a campus shuttle",
    tilt: 4,
    speed: 46,
    tape: "bg-mint",
    place: "sm:right-[1%] sm:top-0 sm:z-10 sm:w-[40%]",
  },
  {
    src: "/projects/aboutme/ab4.jpg",
    width: 1600,
    height: 1069,
    alt: "Group photo at a farewell party",
    tilt: -5,
    speed: 30,
    tape: "bg-bubble",
    place: "sm:right-[5%] sm:top-[45%] sm:z-10 sm:w-[38%]",
  },
  {
    src: "/projects/aboutme/ab2.png",
    width: 4096,
    height: 2736,
    alt: "Large group photo at the OKKBK HMTC 2026 event",
    tilt: 2.5,
    speed: 60,
    tape: "bg-sky",
    place: "sm:left-[12%] sm:top-[59%] sm:z-10 sm:w-[44%]",
  },
];

function Polaroid({
  photo,
  index,
  progress,
  drift,
}: {
  photo: Photo;
  index: number;
  progress: MotionValue<number>;
  drift: boolean;
}) {
  const y = useTransform(progress, [0, 1], drift ? [photo.speed, -photo.speed] : [0, 0]);
  return (
    <motion.div style={{ y }} className={`relative sm:absolute sm:hover:z-30 ${photo.place}`}>
      <motion.figure
        initial={{ opacity: 0, y: 40, scale: 0.85, rotate: photo.tilt * 2.5 }}
        whileInView={{ opacity: 1, y: 0, scale: 1, rotate: photo.tilt }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: 0.75, delay: index * 0.1, ease: [0.34, 1.56, 0.64, 1] }}
        whileHover={{ rotate: 0, scale: 1.05 }}
        className="relative rounded-[1.1rem] border-[2.5px] border-ink bg-white p-2 shadow-pop transition-shadow duration-300 hover:shadow-pop-lg sm:p-3"
      >
        <span
          aria-hidden
          className={`absolute -top-3 left-1/2 z-10 h-5 w-16 -translate-x-1/2 -rotate-3 border-2 border-ink/80 opacity-90 sm:h-6 sm:w-20 ${photo.tape}`}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.src}
          alt={photo.alt}
          width={photo.width}
          height={photo.height}
          loading="lazy"
          decoding="async"
          className="block aspect-[3/2] h-auto w-full rounded-lg border-2 border-ink object-cover"
        />
      </motion.figure>
    </motion.div>
  );
}

/** Scattered polaroids: a 2x2 grid on phones, an overlapping collage on wider screens. */
function PhotoCollage() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const [wide, setWide] = useState(false);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 640px)");
    const update = () => setWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <div
      ref={ref}
      className="mb-14 grid grid-cols-2 gap-x-4 gap-y-6 sm:relative sm:block sm:aspect-[5/4]"
    >
      {photos.map((photo, i) => (
        <Polaroid
          key={photo.src}
          photo={photo}
          index={i}
          progress={scrollYProgress}
          drift={wide && !reduce}
        />
      ))}
    </div>
  );
}

export function About() {
  return (
    <Section
      id="about"
      tone="lilac"
      decor={
        <>
          <Parallax speed={90} className="absolute -left-10 top-[30%] hidden md:block">
            <Flower className="h-32 w-32 animate-spin-slow" petal="#FFF4E4" center="#FF5B3A" />
          </Parallax>
          <Parallax speed={140} className="absolute right-[6%] top-[12%]">
            <Sparkle className="h-14 w-14 animate-bob text-sun" />
          </Parallax>
          <Parallax speed={60} className="absolute bottom-[8%] right-[30%] hidden lg:block">
            <Sparkle className="h-8 w-8 animate-bob text-cream [animation-delay:-3s]" />
          </Parallax>
        </>
      }
    >
      <SectionLayout title="About me">
        <PhotoCollage />

        <Reveal>
          <p className="font-display text-[clamp(1.6rem,3.2vw,2.6rem)] font-bold leading-[1.18] tracking-[-0.02em]">
            {profile.aboutLead}
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="mt-6 max-w-[56ch] text-lg leading-relaxed text-ink/85">
            {profile.aboutBody}
          </p>
        </Reveal>

        <dl className="mt-14 grid gap-5 sm:grid-cols-2 sm:gap-6">
          {profile.facts.map((fact, i) => (
            <motion.div
              key={fact.label}
              {...popProps(i * 0.08, factTilt[i % factTilt.length])}
              whileHover={{ rotate: 0, y: -6, scale: 1.02 }}
              className={`rounded-[1.5rem] border-[2.5px] border-ink p-6 shadow-pop ${factColors[i % factColors.length]}`}
            >
              <dt className="text-sm font-semibold uppercase tracking-wider text-ink/75">
                {fact.label}
              </dt>
              <dd className="mt-2 font-display text-2xl font-extrabold leading-tight tracking-tight md:text-3xl">
                {fact.value}
              </dd>
            </motion.div>
          ))}
        </dl>

        <div id="education" className="mt-24">
          <Reveal className="flex flex-wrap items-center gap-4">
            <SubHeading>Education</SubHeading>
            <Sticker rotate={4} color="bg-cream">
              still learning!
            </Sticker>
          </Reveal>
          <ul className="mt-8 space-y-6">
            {education.map((item, i) => (
              <motion.li
                key={item.institution}
                {...revealProps(i * 0.1)}
              >
                <div className="card-pop card-lift grid gap-4 p-6 md:grid-cols-[11rem_1fr] md:gap-8 md:p-8">
                  <div className="flex items-start gap-3 md:flex-col">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border-2 border-ink bg-sun">
                      <GraduationCap aria-hidden className="h-5 w-5" />
                    </span>
                    <p className="chip bg-lilac/40">{item.period}</p>
                  </div>
                  <div>
                    <h4 className="font-display text-2xl font-extrabold leading-snug tracking-tight md:text-3xl">
                      {item.institution}
                    </h4>
                    <p className="mt-1 text-lg font-medium">{item.program}</p>
                    <ul className="mt-3 space-y-1.5 text-ink/80">
                      {item.details.map((d) => (
                        <li key={d} className="flex gap-2">
                          <Sparkle className="mt-1.5 h-3 w-3 shrink-0 text-tomato" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </SectionLayout>
    </Section>
  );
}
