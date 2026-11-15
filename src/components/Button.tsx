import type { ReactNode } from "react";
import { ArrowRight } from "lucide-react";

type Variant = "sand" | "outline" | "pine";

const variants: Record<Variant, { box: string; sweep: string; icon: string }> = {
  sand: {
    box: "bg-sand text-pine",
    sweep: "bg-mist",
    icon: "bg-pine/10",
  },
  outline: {
    box: "border border-mist/40 text-mist group-hover:text-pine",
    sweep: "bg-mist",
    icon: "bg-mist/10",
  },
  pine: {
    box: "bg-pine text-mist",
    sweep: "bg-slate",
    icon: "bg-mist/10",
  },
};

type Props = {
  children: ReactNode;
  variant?: Variant;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
};

export function Button({
  children,
  variant = "sand",
  href,
  onClick,
  type = "button",
  disabled,
  className = "",
}: Props) {
  const v = variants[variant];
  const classes = `group relative inline-flex items-center gap-3 overflow-hidden rounded-full py-3 pl-6 pr-3 text-[0.95rem] font-medium transition-colors duration-500 ${v.box} ${className}`;

  const inner = (
    <>
      <span
        aria-hidden
        className={`absolute inset-0 translate-y-[101%] transition-transform duration-500 ease-out group-hover:translate-y-0 ${v.sweep}`}
      />
      <span className="relative z-10">{children}</span>
      <span
        className={`relative z-10 grid h-8 w-8 place-items-center rounded-full ${v.icon}`}
      >
        <ArrowRight
          aria-hidden
          className="h-4 w-4 -rotate-45 transition-transform duration-500 group-hover:rotate-0"
        />
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {inner}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} disabled={disabled} className={`${classes} disabled:opacity-60`}>
      {inner}
    </button>
  );
}
