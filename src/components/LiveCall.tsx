import React, { useEffect, useRef, useState } from "react";

interface LiveCallProps {
  /** Fires with true while an Ava line is being revealed, false otherwise. */
  onSpeaking?: (speaking: boolean) => void;
}

type Line = { who: "ava" | "caller"; text: string };

const SCRIPT: Line[] = [
  { who: "ava", text: "Thanks for calling Bright Smile Dental, this is Ava. How can I help?" },
  { who: "caller", text: "Hi, I chipped a tooth and I'm looking for the soonest opening." },
  { who: "ava", text: "I'm sorry about that. I have tomorrow at 9:40 AM or 2:30 PM with Dr. Patel. Which works better?" },
  { who: "caller", text: "2:30 works." },
  { who: "ava", text: "You're booked for 2:30 PM tomorrow. I've just texted you the confirmation." },
];

const STEP_MS = 1900;
const HOLD_MS = 7000;

function fmt(s: number) {
  return `${Math.floor(s / 60).toString().padStart(2, "0")}:${(s % 60).toString().padStart(2, "0")}`;
}

/** The hero's demonstration: one after-hours call, booked and confirmed, on a loop. */
export default function LiveCall({ onSpeaking }: LiveCallProps) {
  const [shown, setShown] = useState(0);
  const [done, setDone] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const speakingRef = useRef(false);

  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) { setShown(SCRIPT.length); setDone(true); setSeconds(48); return; }
    let cancelled = false;
    const timers: number[] = [];
    const run = () => {
      setShown(0); setDone(false); setSeconds(0);
      SCRIPT.forEach((line, i) => {
        timers.push(window.setTimeout(() => {
          if (cancelled) return;
          setShown(i + 1);
          const speaking = line.who === "ava";
          if (speaking !== speakingRef.current) { speakingRef.current = speaking; onSpeaking?.(speaking); }
          if (speaking) timers.push(window.setTimeout(() => { if (!cancelled) { speakingRef.current = false; onSpeaking?.(false); } }, 1500));
        }, 700 + i * STEP_MS));
      });
      timers.push(window.setTimeout(() => { if (!cancelled) setDone(true); }, 700 + SCRIPT.length * STEP_MS + 300));
      timers.push(window.setTimeout(() => { if (!cancelled) run(); }, 700 + SCRIPT.length * STEP_MS + HOLD_MS));
    };
    run();
    const tick = window.setInterval(() => setSeconds((s) => (s < 48 ? s + 1 : s)), 1000);
    return () => { cancelled = true; timers.forEach(clearTimeout); clearInterval(tick); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[440px]" id="live-call">
      <div className="glass rounded-2xl p-5 shadow-[0_40px_90px_-20px_rgba(0,0,0,.8)]" aria-live="polite">
        <div className="flex items-center justify-between text-[0.62rem] font-bold uppercase tracking-[0.22em] text-faint">
          <span className="inline-flex items-center gap-2 text-neon">
            <i className="h-[7px] w-[7px] rounded-full bg-neon animate-live" aria-hidden="true" />
            Live call
          </span>
          <span>Bright Smile Dental · Houston</span>
        </div>

        <div className="mt-4 flex items-center gap-3.5">
          <div className="grid h-11 w-11 place-items-center rounded-full border border-line-2 bg-black/40 text-[0.75rem] font-semibold text-muted">MR</div>
          <div className="min-w-0">
            <div className="font-semibold tnum">(713) 555-0142</div>
            <div className="text-[0.82rem] text-faint">New patient, after hours</div>
          </div>
          <div className="ml-auto tnum text-[0.9rem] text-muted">{fmt(seconds)}</div>
        </div>

        <div className="mt-4 flex min-h-[196px] flex-col gap-2.5">
          {SCRIPT.map((line, i) => (
            <div
              key={i}
              className={`max-w-[88%] rounded-xl px-3.5 py-2.5 text-[0.88rem] leading-snug transition-all duration-300 ${
                i < shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1.5"
              } ${line.who === "ava" ? "self-start rounded-bl-sm border border-neon/20 bg-neon/[0.07]" : "self-end rounded-br-sm bg-white/[0.07]"}`}
            >
              <span className={`mb-0.5 block text-[0.6rem] font-bold uppercase tracking-[0.2em] ${line.who === "ava" ? "text-neon" : "text-faint"}`}>{line.who === "ava" ? "Ava" : "Caller"}</span>
              {line.text}
            </div>
          ))}
        </div>

        <div className={`mt-4 grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-2 border-t border-line pt-4 transition-opacity duration-500 ${done ? "opacity-100" : "opacity-0"}`}>
          <div>
            <div className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-faint">Booked</div>
            <div className="text-[0.9rem] font-semibold">Tomorrow, 2:30 PM with Dr. Patel</div>
          </div>
          <div className="display-num text-right text-[1.5rem] text-neon">+$350</div>
          <div>
            <div className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-faint">Confirmation</div>
            <div className="text-[0.9rem] font-semibold">Text sent, reminder set for 24 h before</div>
          </div>
          <div className="text-right text-[0.7rem] text-faint">0:48</div>
        </div>
      </div>

      <div className="glass absolute -top-3 right-2 rounded-full px-3 py-1.5 text-[0.7rem] text-muted shadow-lg sm:right-[-6px]">
        Recovered this week <span className="tnum font-bold text-neon">$4,550</span>
      </div>
    </div>
  );
}
