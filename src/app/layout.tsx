import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans, Caveat } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/motion";
import { Cursor } from "@/components/Cursor";
import { profile } from "@/data/profile";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const hand = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} | Software Engineering Student`,
  description:
    "Portfolio of Alhaura Rahmatunnisa Harsanto, Software Engineering student at ITS, fullstack developer and UI/UX designer based in Surabaya, Indonesia.",
};

export const viewport: Viewport = {
  themeColor: "#FFF4E4",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} ${hand.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only z-[60] rounded-full border-2 border-ink bg-sun px-4 py-2 font-semibold text-ink shadow-pop-sm focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Providers>
          {children}
          <Cursor />
        </Providers>
      </body>
    </html>
  );
}
