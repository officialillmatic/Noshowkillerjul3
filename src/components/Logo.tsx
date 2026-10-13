import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** Hide the wordmark and show only the mark. */
  markOnly?: boolean;
  /** Show the wordmark only from the `sm` breakpoint up (keeps narrow top bars from overflowing). */
  wordmarkFromSm?: boolean;
}

/** Brand mark: the headset robot with the two speech bubbles, in the brand's neon green. */
export default function Logo({ className = "", size = "md", markOnly = false, wordmarkFromSm = false }: LogoProps) {
  const dims = { sm: "h-10 w-10", md: "h-14 w-14", lg: "h-24 w-24" }[size];
  const text = { sm: "text-[0.95rem]", md: "text-lg", lg: "text-2xl" }[size];

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} id="brand-logo">
      <span className={`relative shrink-0 ${dims}`} aria-hidden="true">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full drop-shadow-[0_0_12px_rgba(10,224,0,0.25)]">
          <path d="M 145 55 C 135 28, 95 20, 62 35 C 31 48, 15 85, 27 118 C 29 122, 34 118, 33 113 C 24 78, 40 48, 70 41 C 100 34, 130 42, 142 60 C 144 63, 147 60, 145 55 Z" fill="#3a3f47" />
          <path d="M 42 90 C 28 125, 38 165, 72 182 C 106 200, 148 185, 182 122 C 183 118, 179 116, 177 119 C 142 154, 102 168, 76 146 C 48 122, 48 95, 56 70 C 57 66, 53 65, 52 68 C 46 75, 43 82, 42 90 Z" fill="#0AE000" />
          <g transform="translate(141, 62)">
            <rect x="0" y="0" width="31" height="22" rx="6" fill="#0AE000" />
            <path d="M 6 22 L 6 28 L 13 22 Z" fill="#0AE000" />
          </g>
          <g transform="translate(125, 46)">
            <rect x="0" y="0" width="36" height="26" rx="7" fill="#3a3f47" />
            <path d="M 8 26 L 8 32 L 16 26 Z" fill="#3a3f47" />
            <circle cx="9" cy="13" r="2" fill="#FAFAFA" />
            <circle cx="18" cy="13" r="2" fill="#FAFAFA" />
            <circle cx="27" cy="13" r="2" fill="#FAFAFA" />
          </g>
          <path d="M 56 114 C 56 70, 136 70, 136 114" stroke="#3a3f47" strokeWidth="6" strokeLinecap="round" fill="none" />
          <rect x="49" y="100" width="10" height="26" rx="5" fill="#3a3f47" />
          <rect x="133" y="100" width="10" height="26" rx="5" fill="#3a3f47" />
          <rect x="63" y="86" width="66" height="52" rx="20" fill="#3a3f47" />
          <rect x="69" y="93" width="54" height="38" rx="14" fill="#141517" />
          <circle cx="82" cy="111" r="5" fill="#0AE000" className="animate-pulse" />
          <circle cx="110" cy="111" r="5" fill="#0AE000" className="animate-pulse" />
          <path d="M 135 116 C 135 144, 112 150, 94 150" stroke="#3a3f47" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <circle cx="94" cy="150" r="3.5" fill="#141517" />
        </svg>
      </span>
      {!markOnly && (
        <span className={`${text} ${wordmarkFromSm ? "hidden sm:inline" : ""} font-extrabold uppercase tracking-wide whitespace-nowrap`}>
          No Show <span className="text-neon">Killer</span>{" "}
          <span className="ml-0.5 rounded-xs bg-neon px-1.5 py-0.5 text-[0.6em] font-black tracking-wider text-neon-ink align-middle">AI</span>
        </span>
      )}
    </span>
  );
}
