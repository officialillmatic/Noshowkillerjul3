import React from "react";

interface LogoProps {
  className?: string;
  showCaption?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function Logo({ className = "", showCaption = false, size = "md" }: LogoProps) {
  // Dimensions based on size for responsive scaling
  const iconDimensions = {
    sm: "h-10 w-10",
    md: "h-16 w-16",
    lg: "h-28 w-28",
  };

  const textSizes = {
    sm: {
      title: "text-base",
      killer: "text-base",
      badge: "text-[9px] px-1.5 py-0.5",
    },
    md: {
      title: "text-xl",
      killer: "text-xl",
      badge: "text-[11px] px-2 py-0.5",
    },
    lg: {
      title: "text-3xl",
      killer: "text-3xl",
      badge: "text-[16px] px-3.5 py-1",
    },
  };

  const currentText = textSizes[size];

  return (
    <div className={`flex flex-col items-start ${className}`} id="brand-logo-container">
      <div className="flex items-center gap-3">
        {/* Brand visual icon block - High fidelity vectors from uploaded image */}
        <div className={`relative flex-shrink-0 ${iconDimensions[size]} select-none`} id="brand-logo-icon">
          <svg
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full drop-shadow-[0_0_12px_rgba(10,224,0,0.2)]"
          >
            {/* 1. Dark Grey Upper Outer Arch/Swoosh */}
            <path
              d="M 145 55 C 135 28, 95 20, 62 35 C 31 48, 15 85, 27 118 C 29 122, 34 118, 33 113 C 24 78, 40 48, 70 41 C 100 34, 130 42, 142 60 C 144 63, 147 60, 145 55 Z"
              fill="#3a3f47"
            />

            {/* 2. Green Lower Outer Arch/Swoosh */}
            <path
              d="M 42 90 C 28 125, 38 165, 72 182 C 106 200, 148 185, 182 122 C 183 118, 179 116, 177 119 C 142 154, 102 168, 76 146 C 48 122, 48 95, 56 70 C 57 66, 53 65, 52 68 C 46 75, 43 82, 42 90 Z"
              fill="#0AE000"
            />

            {/* 3. Speech Bubbles (Upper Right Quadrant) */}
            {/* Green speech bubble behind */}
            <g transform="translate(141, 62)">
              <rect x="0" y="0" width="31" height="22" rx="6" fill="#0AE000" />
              <path d="M 6 22 L 6 28 L 13 22 Z" fill="#0AE000" />
            </g>

            {/* Dark gray speech bubble in front */}
            <g transform="translate(125, 46)">
              <rect x="0" y="0" width="36" height="26" rx="7" fill="#3a3f47" />
              <path d="M 8 26 L 8 32 L 16 26 Z" fill="#3a3f47" />
              {/* Three elegant white dots */}
              <circle cx="9" cy="13" r="2" fill="#FAFAFA" />
              <circle cx="18" cy="13" r="2" fill="#FAFAFA" />
              <circle cx="27" cy="13" r="2" fill="#FAFAFA" />
            </g>

            {/* 4. Central Robot Headset Group */}
            <g id="robot-head-group">
              {/* Headband */}
              <path
                d="M 56 114 C 56 70, 136 70, 136 114"
                stroke="#3a3f47"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
              />

              {/* Headphone Ears Cups */}
              <rect x="49" y="100" width="10" height="26" rx="5" fill="#3a3f47" />
              <rect x="133" y="100" width="10" height="26" rx="5" fill="#3a3f47" />

              {/* Robot Face Capsule */}
              <rect x="63" y="86" width="66" height="52" rx="20" fill="#3a3f47" />
              
              {/* Mask/Eyes Panel */}
              <rect x="69" y="93" width="54" height="38" rx="14" fill="#141517" />

              {/* Glowing Green Robot Eyes */}
              <circle cx="82" cy="111" r="5" fill="#0AE000" className="animate-pulse" />
              <circle cx="110" cy="111" r="5" fill="#0AE000" className="animate-pulse" />

              {/* Right-to-Left microphone arm */}
              <path
                d="M 135 116 C 135 144, 112 150, 94 150"
                stroke="#3a3f47"
                strokeWidth="3.5"
                strokeLinecap="round"
                fill="none"
              />
              {/* Mic Tip */}
              <circle cx="94" cy="150" r="3.5" fill="#141517" />
            </g>
          </svg>
        </div>

        {/* Textual Branding */}
        <div className="flex flex-col select-none" id="brand-logo-text-section">
          <div className="flex items-center gap-1.5 tracking-tight font-bold">
            <span className={`${currentText.title} text-foreground tracking-wide font-extrabold uppercase`}>
              NO SHOW
            </span>
            <span className={`${currentText.killer} text-primary font-extrabold uppercase`}>
              KILLER
            </span>
            <span
              className={`${currentText.badge} bg-primary text-primary-foreground font-black rounded-xs select-none uppercase tracking-wider ml-0.5`}
            >
              AI
            </span>
          </div>
          {size !== "sm" && (
            <span className="text-[7.5px] text-muted-foreground tracking-[0.24em] font-medium uppercase mt-0.5 whitespace-nowrap leading-none">
              AI Automations &bull; Real Results
            </span>
          )}
        </div>
      </div>

      {showCaption && (
        <div className="mt-4 border-t border-border/40 pt-3 w-full" id="brand-logo-caption-container">
          <p className="text-[10px] text-muted-foreground tracking-[0.38em] font-light uppercase text-center md:text-left leading-relaxed">
            AI AUTOMATIONS. AI CUSTOMER SERVICE. REAL RESULTS.
          </p>
        </div>
      )}
    </div>
  );
}
