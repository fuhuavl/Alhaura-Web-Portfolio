import { ArrowUp } from "lucide-react";
import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="bg-pine text-mist">
      <div className="mx-auto flex max-w-[1360px] flex-col gap-4 px-5 py-8 text-sm text-mist/70 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p>&copy; 2026 {profile.name}</p>
        <a
          href="#main"
          className="group inline-flex items-center gap-2 text-mist transition-colors hover:text-sand"
        >
          Back to top
          <ArrowUp
            aria-hidden
            className="h-4 w-4 transition-transform duration-500 group-hover:-translate-y-1"
          />
        </a>
      </div>
    </footer>
  );
}
