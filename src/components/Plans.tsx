import React from "react";
import { BOOKING_URL, PLANS, usd } from "../lib/site";

export default function Plans() {
  return (
    <section className="border-t border-line bg-ink-2 py-20 sm:py-28" id="plans">
      <div className="wrap">
        <div className="max-w-[40em]">
          <h2 className="display text-[clamp(1.9rem,3.6vw,2.8rem)] text-bone">Plans that cost less than one missed crown</h2>
          <p className="prose-muted mt-4 text-[1.05rem]">
            Monthly, cancelled in one click from your portal. Minutes reset each month, and you can add a pack that never expires when you need more. Setup is quoted after the demo.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {PLANS.map((p) => (
            <div key={p.name} className={`panel flex flex-col p-7 ${"featured" in p && p.featured ? "border-brass/50" : ""}`}>
              <div className="flex items-baseline justify-between">
                <h3 className="text-[1.1rem] font-semibold text-bone">{p.name}</h3>
                {"featured" in p && p.featured && <span className="rounded-full border border-brass/50 px-2.5 py-0.5 text-[0.75rem] text-brass">Most practices</span>}
              </div>
              <div className="mt-5 flex items-baseline gap-1.5">
                <span className="display-num text-[2.6rem] leading-none text-bone">{usd(p.price)}</span>
                <span className="text-bone-3">/ month</span>
              </div>
              <p className="tnum mt-2 text-bone-2">{p.minutes.toLocaleString("en-US")} call minutes included</p>
              <p className="mt-4 text-[0.95rem] text-bone-3">{p.note}</p>
              <a href={BOOKING_URL} className={`btn mt-auto pt-3 ${"featured" in p && p.featured ? "btn-brass mt-7" : "mt-7"}`} target="_blank" rel="noopener noreferrer">
                Book a demo
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
