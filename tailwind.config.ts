import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFF4E4",
        ink: "#1E1633",
        tomato: "#FF5B3A",
        sun: "#FFC83D",
        mint: "#2FD39A",
        lilac: "#B69CFF",
        sky: "#57B6FF",
        bubble: "#FF8FC7",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        hand: ["var(--font-hand)", "cursive"],
      },
      boxShadow: {
        "pop-sm": "3px 3px 0 0 #1E1633",
        pop: "6px 6px 0 0 #1E1633",
        "pop-lg": "10px 10px 0 0 #1E1633",
        "pop-cream": "6px 6px 0 0 #FFF4E4",
      },
      keyframes: {
        "spin-slow": { to: { transform: "rotate(360deg)" } },
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.35", transform: "scale(0.7)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        bob: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-12px) rotate(6deg)" },
        },
        wiggle: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-8deg)" },
          "75%": { transform: "rotate(8deg)" },
        },
      },
      animation: {
        "spin-slow": "spin-slow 24s linear infinite",
        "pulse-dot": "pulse-dot 1.8s ease-in-out infinite",
        marquee: "marquee 32s linear infinite",
        bob: "bob 6s ease-in-out infinite",
        wiggle: "wiggle 0.5s ease-in-out",
      },
    },
  },
  plugins: [],
};

export default config;
