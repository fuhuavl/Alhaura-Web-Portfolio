import type { Metadata, Viewport } from "next";
import { Gloock, Schibsted_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/motion";
import { profile } from "@/data/profile";

const display = Gloock({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const body = Schibsted_Grotesk({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${profile.name} | Software Engineering Student`,
  description:
    "Portfolio of Alhaura Rahmatunnisa Harsanto, Software Engineering student at ITS, fullstack developer and UI/UX designer based in Surabaya, Indonesia.",
};

export const viewport: Viewport = {
  themeColor: "#081710",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only z-[60] rounded-full bg-sand px-4 py-2 text-pine focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
