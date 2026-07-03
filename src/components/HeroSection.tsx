import React, { Suspense, useState, useEffect } from "react";
import { ArrowDown, CheckCircle2, MapPin, Activity } from "lucide-react";

// Lazy load Spline to optimize loading speed and prevent initial blocking
const Spline = React.lazy(() => import("@splinetool/react-spline"));

// Bulletproof Error Boundary to catch any lazy Three.js/Spline load or context loss exceptions
class SplineErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  public state: { hasError: boolean };
  public props: { children: React.ReactNode };

  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
    this.props = props;
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.warn("Spline component failed to render or lost WebGL context:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 bg-[#070707] flex items-center justify-center overflow-hidden" id="spline-error-fallback">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px]" />
          <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[130px] pointer-events-none" />
          <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-[#0ae000]/5 rounded-full blur-[150px] pointer-events-none" />
          
          {/* Elegant active green voice-line wave representation */}
          <div className="flex items-center gap-2 opacity-30 select-none scale-75 sm:scale-100">
            {[24, 48, 32, 64, 40, 88, 56, 96, 48, 64, 32, 48, 24].map((v, i) => (
              <div 
                key={i} 
                className="w-[2.5px] bg-primary rounded-full" 
                style={{ 
                  height: `${v}px`,
                  animation: `float ${2 + (i % 3) * 0.4}s ease-in-out infinite alternate`,
                  animationDelay: `${i * 0.08}s` 
                }} 
              />
            ))}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function HeroSection() {
  const [isWebGLSupported, setIsWebGLSupported] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const canvas = document.createElement("canvas");
      const supportsWebGL = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      setIsWebGLSupported(supportsWebGL);
    } catch (e) {
      setIsWebGLSupported(false);
    }
  }, []);

  return (
    <section 
      className="relative min-h-screen flex items-end bg-hero-bg overflow-hidden font-sora"
      id="nsk-cinematic-hero"
    >
      {/* Absolute 3D Spline Embedded Background Canvas */}
      <div className="absolute inset-0 z-0" id="spline-viewport-root">
        {isWebGLSupported === false ? (
          <div className="absolute inset-0 bg-[#070707] flex items-center justify-center overflow-hidden animate-fade-in" id="spline-unsupported-fallback">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="absolute top-[20%] left-[10%] w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px]" />
            <div className="absolute bottom-[20%] right-[10%] w-[500px] h-[500px] bg-[#0ae000]/5 rounded-full blur-[160px]" />
            
            {/* Ambient Active Voice Waveform representing phone-agent lines */}
            <div className="flex items-center gap-2 opacity-25 select-none scale-75 sm:scale-100">
              {[24, 48, 32, 64, 40, 88, 56, 96, 48, 64, 32, 48, 24].map((v, i) => (
                <div 
                  key={i} 
                  className="w-[2.5px] bg-primary rounded-full animate-pulse" 
                  style={{ 
                    height: `${v}px`,
                    animation: `float ${2 + (i % 3) * 0.4}s ease-in-out infinite alternate`,
                    animationDelay: `${i * 0.08}s` 
                  }} 
                />
              ))}
            </div>
          </div>
        ) : (
          <SplineErrorBoundary>
            <Suspense 
              fallback={
                <div className="absolute inset-0 bg-hero-bg flex items-center justify-center" id="spline-loader-fallback">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-10 w-10 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="text-xs text-muted-foreground uppercase tracking-[0.25em] font-mono">
                      Loading 3D Atmosphere...
                    </span>
                  </div>
                </div>
              }
            >
              <Spline 
                scene="https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode"
                className="w-full h-full spline-embed opacity-80"
              />
            </Suspense>
          </SplineErrorBoundary>
        )}
      </div>

      {/* Modern Vignette Overlay (Gives high definition legibility to typography) */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-black/40 to-transparent z-[1] pointer-events-none" 
        id="vignette-overlay"
      />
      
      {/* Decorative colored radial background glow to mesh with the 3D Spline environment */}
      <div 
        className="absolute bottom-0 left-0 w-[50%] h-[50%] bg-primary/5 rounded-full blur-[160px] z-[1] pointer-events-none"
        id="ambient-bottom-glow"
      />

      {/* Content Container (Anchored at bottom-left, using pointer-events-none for pass-through navigation) */}
      <div 
        className="relative z-10 pointer-events-none w-full max-w-full sm:max-w-md lg:max-w-4xl px-4 sm:px-8 md:px-14 pb-12 sm:pb-24 pt-28 sm:pt-32 text-left"
        id="hero-floating-content"
      >
        <div className="space-y-6 md:space-y-8">
          
          {/* Badge indicator */}
          <div 
            className="inline-flex items-center gap-2 bg-black/40 border border-white/5 backdrop-blur-md px-3.5 py-1.5 rounded-full opacity-0 animate-fade-up pointer-events-auto"
            style={{ animationDelay: "0.1s" }}
            id="hero-badge"
          >
            <Activity size={12} className="text-primary animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-bold text-foreground">
              THE APPOINTMENT STANDARD &bull; v2.5
            </span>
          </div>

          <div className="space-y-4">
            {/* Heading Section: Responsive clamp sizing with custom Green secondary section */}
            <h1 
              className="text-[clamp(2.75rem,7.5vw,5.5rem)] font-extrabold leading-[1.02] tracking-[-0.04em] text-foreground uppercase opacity-0 animate-fade-up select-none"
              style={{ animationDelay: "0.2s" }}
              id="hero-title-header"
            >
              No Show <span className="text-primary bg-clip-text">Killer AI</span>
            </h1>

            {/* Subheading: Elegant medium display typography */}
            <p 
              className="text-foreground/95 text-[clamp(1.1rem,2.2vw,1.75rem)] font-light leading-relaxed max-w-3xl opacity-0 animate-fade-up pointer-events-auto"
              style={{ animationDelay: "0.4s" }}
              id="hero-subheading-text"
            >
              We put an AI voice agent on your phone line that answers 24/7, books appointments instantly, and kills no-shows.
            </p>

            {/* Multi-sentence detailed copy matching both standard specifications and custom text requested */}
            <p 
              className="text-muted-foreground text-[clamp(0.85rem,1.4vw,1.1rem)] font-light max-w-2xl leading-relaxed opacity-0 animate-fade-up pointer-events-auto"
              style={{ animationDelay: "0.55s" }}
              id="hero-description-paragraph"
            >
              Over 25% of local business calls go unanswered—costing serious revenue. No Show Killer AI captures every lead, qualifies callers, books them into your existing calendar, and sends automated reminders. All tracked live in a premium client dashboard.
            </p>
          </div>

          {/* Core Interactive Action CTA Buttons */}
          <div 
            className="flex flex-wrap gap-4 pt-2 font-bold opacity-0 animate-fade-up text-xs tracking-widest uppercase font-sora"
            style={{ animationDelay: "0.7s" }}
            id="hero-cta-button-row"
          >
            {/* Primary Action Button: Features neon-green dynamic pulsing on hover */}
            <a 
              href="https://cal.com/nicole-bejarano-u04dax/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto inline-flex items-center justify-center bg-primary text-primary-foreground px-8 py-4 rounded-lg font-extrabold cursor-pointer transition-all active:scale-[0.97] shadow-lg hover:animate-pulse-glow"
              id="btn-book-call-primary"
            >
              Book 30m Demo Call
            </a>

            {/* Secondary Action Button: Clean aesthetic high contrast white borders */}
            <button 
              onClick={() => {
                const demoEl = document.getElementById("services");
                if (demoEl) demoEl.scrollIntoView({ behavior: "smooth" });
              }}
              className="pointer-events-auto bg-white/5 border border-white/15 text-foreground hover:bg-white/10 px-8 py-4 rounded-lg font-bold cursor-pointer transition-all active:scale-[0.97]"
              id="btn-discover-secondary"
            >
              Our Work
            </button>
          </div>

          {/* Social Proof trust tag line */}
          <div 
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground/60 text-xs font-light pt-4 md:pt-6 border-t border-white/5 max-w-xl opacity-0 animate-fade-up pointer-events-auto"
            style={{ animationDelay: "0.85s" }}
            id="hero-trust-indicators-log"
          >
            <div className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-default">
              <CheckCircle2 size={13} className="text-primary" />
              <span>24/7 Instant Response</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-default">
              <CheckCircle2 size={13} className="text-primary" />
              <span>Calendar Native Sync</span>
            </div>
            <div className="flex items-center gap-1.5 hover:text-foreground transition-colors cursor-default">
              <CheckCircle2 size={13} className="text-primary" />
              <span>Goes Live in Days</span>
            </div>
          </div>

        </div>
      </div>

      {/* absolute centered mouse scroll prompt at the true absolute bottom of the screen */}
      <div 
        className="absolute bottom-8 right-1/2 translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[9px] text-muted-foreground/40 font-mono tracking-[0.2em] uppercase select-none cursor-pointer animate-bounce hover:text-primary transition-colors"
        onClick={() => {
          const detailEl = document.getElementById("services");
          if (detailEl) detailEl.scrollIntoView({ behavior: "smooth" });
        }}
        id="scroll-indicator-widget"
      >
        <span>Explore Architecture</span>
        <ArrowDown size={12} className="text-primary/70" />
      </div>
    </section>
  );
}
