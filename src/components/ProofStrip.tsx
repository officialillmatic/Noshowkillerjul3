import React from "react";
import Reveal from "./Reveal";

const STATS = [
  { n: "1 in 4", d: "calls to local practices go unanswered" },
  { n: "First ring", d: "is when Ava picks up, day or night" },
  { n: "−85%", d: "no-shows after confirmations and reminders" },
  { n: "$350", d: "or more, the value of one dental visit" },
];

export default function ProofStrip() {
  return (
    <div className="border-y border-line bg-ink-2" id="proof">
      <div className="wrap grid grid-cols-2 gap-y-6 py-8 md:grid-cols-4">
        {STATS.map((s, i) => (
          <Reveal key={s.n} delay={i * 80} className={`pr-4 ${i > 0 ? "md:border-l md:border-line md:pl-6" : ""} ${i % 2 === 1 ? "border-l border-line pl-5 md:pl-6" : ""}`}>
            <div className="display-num text-[1.9rem] text-white">{s.n}</div>
            <p className="mt-1 text-[0.85rem] text-faint">{s.d}</p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
