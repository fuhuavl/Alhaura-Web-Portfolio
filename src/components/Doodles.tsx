import type { CSSProperties, ReactNode } from "react";

/* Hand-made decorative shapes. All of them are purely decorative (aria-hidden). */

type Shape = { className?: string; style?: CSSProperties };

export function Sparkle({ className = "", style }: Shape) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" className={className} style={style}>
      <path
        d="M50 0C54 34 66 46 100 50C66 54 54 66 50 100C46 66 34 54 0 50C34 46 46 34 50 0Z"
        fill="currentColor"
        stroke="#1E1633"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Starburst "seal", built from evenly spaced points. */
export function Burst({
  className = "",
  style,
  points = 14,
  children,
}: Shape & { points?: number; children?: ReactNode }) {
  const pts: string[] = [];
  for (let i = 0; i < points * 2; i++) {
    const r = i % 2 === 0 ? 48 : 39;
    const a = (Math.PI * i) / points - Math.PI / 2;
    pts.push(`${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`);
  }
  return (
    <span aria-hidden={children ? undefined : true} className={`relative inline-grid place-items-center ${className}`} style={style}>
      <svg aria-hidden viewBox="0 0 100 100" className="absolute inset-0 h-full w-full">
        <polygon
          points={pts.join(" ")}
          fill="currentColor"
          stroke="#1E1633"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </svg>
      {children ? <span className="relative">{children}</span> : null}
    </span>
  );
}

export function Blob({ className = "", style }: Shape) {
  return (
    <svg aria-hidden viewBox="-100 -100 200 200" className={className} style={style}>
      <path
        d="M60.4,-56.3C75.5,-44.2,83.4,-22.1,81.9,-1.5C80.4,19.1,69.5,38.2,54.4,52.3C39.2,66.4,19.6,75.5,-1.6,77.1C-22.8,78.7,-45.6,72.8,-59.7,58.7C-73.8,44.6,-79.2,22.3,-78.1,1.1C-77,-20.1,-69.4,-40.2,-55.3,-52.3C-41.2,-64.4,-20.6,-68.5,0.7,-69.2C22.1,-69.9,45.3,-68.4,60.4,-56.3Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function Squiggle({ className = "", style }: Shape) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 104 24"
      preserveAspectRatio="none"
      className={className}
      style={style}
      fill="none"
    >
      <path
        d="M2 12Q12 2 22 12T42 12T62 12T82 12T102 12"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** Loose hand-drawn arrow curving to the right. */
export function DoodleArrow({ className = "", style }: Shape) {
  return (
    <svg aria-hidden viewBox="0 0 120 80" className={className} style={style} fill="none">
      <path
        d="M8 12C26 58 66 72 106 52"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M90 40L107 52L89 64"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Flower({
  className = "",
  style,
  petal = "#FF8FC7",
  center = "#FFC83D",
}: Shape & { petal?: string; center?: string }) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" className={className} style={style}>
      {[0, 72, 144, 216, 288].map((deg) => (
        <circle
          key={deg}
          cx={50 + 24 * Math.cos(((deg - 90) * Math.PI) / 180)}
          cy={50 + 24 * Math.sin(((deg - 90) * Math.PI) / 180)}
          r="19"
          fill={petal}
          stroke="#1E1633"
          strokeWidth="3"
        />
      ))}
      <circle cx="50" cy="50" r="15" fill={center} stroke="#1E1633" strokeWidth="3" />
    </svg>
  );
}

export function Smiley({ className = "", style }: Shape) {
  return (
    <svg aria-hidden viewBox="0 0 100 100" className={className} style={style}>
      <circle cx="50" cy="50" r="46" fill="currentColor" stroke="#1E1633" strokeWidth="4" />
      <ellipse cx="36" cy="40" rx="5" ry="8" fill="#1E1633" />
      <ellipse cx="64" cy="40" rx="5" ry="8" fill="#1E1633" />
      <path
        d="M30 60Q50 80 70 60"
        fill="none"
        stroke="#1E1633"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Text running around a circle, used as a spinning badge. */
export function CircleText({
  text,
  className = "",
  style,
}: Shape & { text: string }) {
  return (
    <svg aria-hidden viewBox="0 0 200 200" className={className} style={style}>
      <defs>
        <path id="circle-text-path" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
      </defs>
      <circle cx="100" cy="100" r="96" fill="currentColor" stroke="#1E1633" strokeWidth="4" />
      <text
        fill="#1E1633"
        fontSize="19"
        fontWeight="700"
        letterSpacing="3.2"
        style={{ fontFamily: "var(--font-display)", textTransform: "uppercase" }}
      >
        <textPath href="#circle-text-path">{text}</textPath>
      </text>
    </svg>
  );
}

/** Slightly rotated label that looks like a sticker. */
export function Sticker({
  children,
  className = "",
  rotate = -6,
  color = "bg-sun",
}: {
  children: ReactNode;
  className?: string;
  rotate?: number;
  color?: string;
}) {
  return (
    <span
      className={`inline-block rounded-full border-[2.5px] border-ink px-4 py-1 font-hand text-2xl leading-tight text-ink shadow-pop-sm transition-transform duration-300 [transform:rotate(var(--r))] hover:[transform:rotate(0deg)_scale(1.1)] ${color} ${className}`}
      style={{ "--r": `${rotate}deg` } as CSSProperties}
    >
      {children}
    </span>
  );
}
