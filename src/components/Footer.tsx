import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";
import { Sparkle } from "./Doodles";

export function Footer() {
  return (
    <footer className="dots-light relative overflow-hidden bg-ink text-cream">
      <div className="mx-auto max-w-[1360px] px-5 pb-8 pt-14 sm:px-8 lg:px-12">
        <p aria-hidden className="flex items-center gap-3 font-hand text-4xl text-sun md:text-5xl">
          thanks for scrolling by!
          <Sparkle className="h-8 w-8 animate-spin-slow text-tomato" />
        </p>
        <div className="mt-10 flex flex-col gap-5 border-t-2 border-dashed border-cream/20 pt-6 text-sm text-cream/75 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; 2026 {profile.name}</p>
          <a
            href="#main"
            className="group inline-flex w-fit items-center gap-3 rounded-full border-[2.5px] border-cream/30 py-1.5 pl-4 pr-1.5 font-semibold text-cream transition-colors hover:border-sun hover:text-sun"
          >
            Back to top
            <span className="grid h-8 w-8 place-items-center rounded-full bg-sun text-ink transition-transform duration-500 group-hover:-translate-y-1">
              <ArrowUp aria-hidden className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
