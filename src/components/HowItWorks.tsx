import React from "react";
import { Cpu, PhoneCall, LayoutDashboard } from "lucide-react";
import Reveal from "./Reveal";

const STEPS = [
  { when: "Day 1", icon: <Cpu size={18} />, title: "We train Ava on your practice", body: "Services, hours, insurance you accept, booking rules and the way your team actually talks to patients. You keep your phone number." },
  { when: "Day 3", icon: <PhoneCall size={18} />, title: "She answers and books, 24/7", body: "Every call picked up, the caller qualified and the appointment placed in your calendar. Confirmations and reminders go out on their own." },
  { when: "Every day after", icon: <LayoutDashboard size={18} />, title: "You watch the revenue come back", body: "Recordings, transcripts, caller sentiment and dollars recovered, live in your dashboard. Ava hands the call to a person whenever someone asks." },
];

export default function HowItWorks() {
  return (
    <section className="border-t border-line bg-ink-2 py-24 sm:py-32" id="how">
      <div className="wrap">
        <Reveal>
          <div className="kicker">How it works</div>
          <h2 className="display mt-4 max-w-[22em] text-[clamp(1.9rem,3.6vw,3rem)] uppercase text-white">
            We build it, train it on your practice <span className="text-neon">and switch it on.</span>
          </h2>
        </Reveal>
        <ol className="mt-12 grid gap-5 md:grid-cols-3">
          {STEPS.map((s, i) => (
            <Reveal as="li" key={s.when} delay={i * 110} className="panel panel-hover group relative overflow-hidden p-7">
              <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-bl-full bg-neon/5 transition-colors group-hover:bg-neon/10" />
              <div className="flex items-center justify-between">
                <span className="text-[0.65rem] font-bold uppercase tracking-[0.24em] text-neon">{s.when}</span>
                <span className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-white/5 text-neon transition-colors group-hover:border-neon/30 group-hover:bg-neon/10">{s.icon}</span>
              </div>
              <h3 className="mt-6 text-[1.15rem] font-semibold leading-snug text-white">{s.title}</h3>
              <p className="prose-muted mt-3 text-[0.92rem]">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
