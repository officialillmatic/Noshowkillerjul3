import React from "react";

interface LogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
  /** Hide the wordmark and show only the mark. */
  markOnly?: boolean;
}

/** Brand mark: the headset robot with the two speech bubbles, recoloured for the brass / forest palette. */
export default function Logo({ className = "", size = "md", markOnly = false }: LogoProps) {
  const dims = { sm: "h-9 w-9", md: "h-12 w-12", lg: "h-20 w-20" }[size];
  const text = { sm: "text-[1.05rem]", md: "text-xl", lg: "text-3xl" }[size];

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`} id="brand-logo">
      <span className={`relative shrink-0 ${dims}`} aria-hidden="true">
        <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
          <path d="M 145 55 C 135 28, 95 20, 62 35 C 31 48, 15 85, 27 118 C 29 122, 34 118, 33 113 C 24 78, 40 48, 70 41 C 100 34, 130 42, 142 60 C 144 63, 147 60, 145 55 Z" fill="#4a5a52" />
          <path d="M 42 90 C 28 125, 38 165, 72 182 C 106 200, 148 185, 182 122 C 183 118, 179 116, 177 119 C 142 154, 102 168, 76 146 C 48 122, 48 95, 56 70 C 57 66, 53 65, 52 68 C 46 75, 43 82, 42 90 Z" fill="#d8b56b" />
          <g transform="translate(141, 62)">
            <rect x="0" y="0" width="31" height="22" rx="6" fill="#d8b56b" />
            <path d="M 6 22 L 6 28 L 13 22 Z" fill="#d8b56b" />
          </g>
          <g transform="translate(125, 46)">
            <rect x="0" y="0" width="36" height="26" rx="7" fill="#4a5a52" />
            <path d="M 8 26 L 8 32 L 16 26 Z" fill="#4a5a52" />
            <circle cx="9" cy="13" r="2" fill="#efe9dc" />
            <circle cx="18" cy="13" r="2" fill="#efe9dc" />
            <circle cx="27" cy="13" r="2" fill="#efe9dc" />
          </g>
          <path d="M 56 114 C 56 70, 136 70, 136 114" stroke="#4a5a52" strokeWidth="6" strokeLinecap="round" fill="none" />
          <rect x="49" y="100" width="10" height="26" rx="5" fill="#4a5a52" />
          <rect x="133" y="100" width="10" height="26" rx="5" fill="#4a5a52" />
          <rect x="63" y="86" width="66" height="52" rx="20" fill="#4a5a52" />
          <rect x="69" y="93" width="54" height="38" rx="14" fill="#0a1411" />
          <circle cx="82" cy="111" r="5" fill="#8fe3b0" />
          <circle cx="110" cy="111" r="5" fill="#8fe3b0" />
          <path d="M 135 116 C 135 144, 112 150, 94 150" stroke="#4a5a52" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <circle cx="94" cy="150" r="3.5" fill="#0a1411" />
        </svg>
      </span>
      {!markOnly && (
        <span className={`display ${text} tracking-tight text-bone whitespace-nowrap`}>
          No Show Killer <span className="text-brass">AI</span>
        </span>
      )}
    </span>
  );
}
