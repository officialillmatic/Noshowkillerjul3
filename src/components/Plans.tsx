import React from "react";
import Reveal from "./Reveal";
import { BOOKING_URL, PLANS, usd } from "../lib/site";

export default function Plans() {
  return (
    <section className="border-t border-line bg-ink-2 py-24 sm:py-32" id="plans">
      <div className="wrap">
        <Reveal className="max-w-[40em]">
          <div className="kicker">Plans</div>
          <h2 className="display mt-4 text-[clamp(1.9rem,3.6vw,3rem)] uppercase text-white">Costs less than <span className="text-neon">one missed crown</span></h2>
          <p className="prose-muted mt-4 text-[1.05rem]">
            Monthly, cancelled in one click from your portal. Minutes reset each month, and you can add a pack that never expires when you need more. Setup is quoted after the demo.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PLANS.map((p, i) => {
            const featured = "featured" in p && p.featured;
            return (
              <Reveal key={p.name} delay={i * 110} className={`panel panel-hover relative flex flex-col overflow-hidden p-7 ${featured ? "border-neon/50 shadow-[0_0_40px_-10px_rgba(10,224,0,0.25)]" : ""}`}>
                {featured && <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon to-transparent" />}
                <div className="flex items-baseline justify-between">
                  <h3 className="text-[0.75rem] font-bold uppercase tracking-[0.22em] text-white">{p.name}</h3>
                  {featured && <span className="rounded-full border border-neon/50 bg-neon/10 px-2.5 py-0.5 text-[0.6rem] font-bold uppercase tracking-[0.18em] text-neon">Most practices</span>}
                </div>
                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className="display-num text-[2.6rem] leading-none text-white">{usd(p.price)}</span>
                  <span className="text-[0.85rem] text-faint">/ month</span>
                </div>
                <p className="tnum mt-2 text-muted">{p.minutes.toLocaleString("en-US")} call minutes included</p>
                <p className="mt-4 text-[0.9rem] text-faint">{p.note}</p>
                <a href={BOOKING_URL} className={`btn mt-7 ${featured ? "btn-neon" : ""}`} target="_blank" rel="noopener noreferrer">
                  Book a demo
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
