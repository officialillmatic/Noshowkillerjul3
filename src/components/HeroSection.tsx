import React, { Suspense, useEffect, useState } from "react";
import { ArrowDown, Phone } from "lucide-react";
import LiveCall from "./LiveCall";
import VoiceOrb from "./VoiceOrb";
import Pixels from "./Pixels";
import { AVA_PHONE_DISPLAY, AVA_PHONE_TEL, BOOKING_URL } from "../lib/site";

// Lazy-load Spline so the first paint never waits on the 3D runtime.
const Spline = React.lazy(() => import("@splinetool/react-spline"));
const SCENE = "https://prod.spline.design/Slk6b8kz3LRlKiyk/scene.splinecode";

/** Catches a lost WebGL context or a failed runtime load and shows the voice orb instead. */
class SplineErrorBoundary extends React.Component<{ fallback: React.ReactNode; children: React.ReactNode }, { hasError: boolean }> {
  public state: { hasError: boolean } = { hasError: false };
  public props: { fallback: React.ReactNode; children: React.ReactNode };
  constructor(props: { fallback: React.ReactNode; children: React.ReactNode }) { super(props); this.props = props; }
  static getDerivedStateFromError() { return { hasError: true }; }
  componentDidCatch(error: unknown) { console.warn("Spline failed to render:", error); }
  render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

function OrbFallback({ speaking }: { speaking: boolean }) {
  return (
    <div className="absolute inset-0 grid-bg animate-fade-in" id="spline-fallback">
      <div className="absolute left-[10%] top-[20%] h-[500px] w-[500px] rounded-full bg-neon/5 blur-[140px]" />
      <VoiceOrb active={speaking} className="absolute left-1/2 top-1/2 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 opacity-70" />
    </div>
  );
}

export default function HeroSection() {
  const [speaking, setSpeaking] = useState(false);
  const [webgl, setWebgl] = useState<boolean | null>(null);

  useEffect(() => {
    try {
      const c = document.createElement("canvas");
      setWebgl(!!(window.WebGLRenderingContext && (c.getContext("webgl") || c.getContext("experimental-webgl"))));
    } catch { setWebgl(false); }
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative flex min-h-[min(100svh,920px)] items-end overflow-hidden bg-ink" id="top">
      {/* 3D atmosphere */}
      <div className="absolute inset-0 z-0" id="spline-viewport-root">
        {webgl === false ? (
          <OrbFallback speaking={speaking} />
        ) : (
          <SplineErrorBoundary fallback={<OrbFallback speaking={speaking} />}>
            <Suspense
              fallback={
                <div className="absolute inset-0 grid place-items-center bg-ink" id="spline-loader">
                  <div className="flex flex-col items-center gap-3">
                    <div className="h-10 w-10 animate-spin rounded-full border-2 border-neon border-t-transparent" />
                    <span className="text-[0.65rem] uppercase tracking-[0.3em] text-faint">Loading 3D atmosphere</span>
                  </div>
                </div>
              }
            >
              <Spline scene={SCENE} className="h-full w-full opacity-80" />
            </Suspense>
          </SplineErrorBoundary>
        )}
      </div>

      {/* vignette for legibility + ambient glow */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-t from-ink via-black/40 to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 z-[1] h-1/2 w-1/2 rounded-full bg-neon/5 blur-[160px]" />

      <Pixels className="absolute right-[6%] top-[14%] z-[2] hidden opacity-70 lg:block" seed={3} count={16} cols={12} rows={7} cell={16} />

      <div className="wrap relative z-10 grid w-full items-end gap-10 pb-14 pt-28 lg:grid-cols-12 lg:gap-8 lg:pb-16 lg:pt-32">
        <div className="pointer-events-none lg:col-span-7">
          <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/40 px-3.5 py-1.5 opacity-0 animate-fade-up backdrop-blur-md" style={{ animationDelay: "0.1s" }}>
            <span className="h-1.5 w-1.5 rounded-full bg-neon animate-live" />
            <span className="text-[0.62rem] font-bold uppercase tracking-[0.3em] text-white">AI receptionist for dental practices</span>
          </div>

          <h1 className="display mt-6 text-[clamp(2.4rem,4.6vw,4rem)] uppercase text-white opacity-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Every call answered. <span className="text-neon">Every visit confirmed.</span>
          </h1>

          <p className="prose-muted mt-5 max-w-[34em] text-[clamp(1rem,1.3vw,1.2rem)] leading-relaxed text-white/90 opacity-0 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            Ava picks up on the first ring, day or night, books the patient straight into your calendar and follows up so they show. Your team stays with the patients in the chair.
          </p>

          <div className="pointer-events-auto mt-8 flex flex-wrap items-center gap-4 opacity-0 animate-fade-up" style={{ animationDelay: "0.6s" }}>
            <a href={BOOKING_URL} className="btn btn-neon btn-lg" target="_blank" rel="noopener noreferrer" id="btn-book-call-primary">
              Book a 20-minute demo
            </a>
            <a href={`tel:${AVA_PHONE_TEL}`} className="glass inline-flex items-center gap-3 rounded-lg px-4 py-2.5 transition-colors hover:border-neon/40" id="call-ava-cta">
              <span className="grid h-9 w-9 place-items-center rounded-md bg-neon/10 text-neon"><Phone size={15} /></span>
              <span className="leading-tight">
                <span className="block text-[0.62rem] uppercase tracking-[0.2em] text-faint">Hear her yourself</span>
                <span className="block text-[0.95rem] font-semibold tnum">{AVA_PHONE_DISPLAY}</span>
              </span>
            </a>
          </div>

          <ul className="pointer-events-auto hairline mt-8 flex max-w-xl flex-wrap gap-x-6 gap-y-2 pt-5 text-[0.82rem] text-muted opacity-0 animate-fade-up" style={{ animationDelay: "0.8s" }}>
            {["Live in days", "Works with the calendar you already use", "Hands the call to a person on request"].map((t) => (
              <li key={t} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-neon" />{t}</li>
            ))}
          </ul>
        </div>

        <div className="opacity-0 animate-fade-up lg:col-span-5" style={{ animationDelay: "0.5s" }}>
          <LiveCall onSpeaking={setSpeaking} />
        </div>
      </div>

      <button
        type="button"
        onClick={() => scrollTo("cost")}
        className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 animate-bounce cursor-pointer flex-col items-center gap-1.5 text-[0.58rem] uppercase tracking-[0.25em] text-faint transition-colors hover:text-neon lg:flex"
        id="scroll-indicator"
      >
        <span>Do the math</span>
        <ArrowDown size={12} className="text-neon/70" />
      </button>
    </section>
  );
}
