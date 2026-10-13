import React from "react";

const STATS = [
  { n: "1 in 4", d: "calls to local practices go unanswered" },
  { n: "First ring", d: "is when Ava picks up, day or night" },
  { n: "−85%", d: "no-shows after confirmations and reminders" },
  { n: "$350", d: "or more, the value of one dental visit" },
];

export default function ProofStrip() {
  return (
    <div className="border-y border-line bg-ink-2" id="proof">
      <div className="wrap grid grid-cols-2 gap-y-6 py-7 md:grid-cols-4">
        {STATS.map((s, i) => (
          <div key={s.n} className={`pr-4 ${i > 0 ? "md:border-l md:border-line md:pl-6" : ""} ${i % 2 === 1 ? "border-l border-line pl-5 md:pl-6" : ""}`}>
            <div className="display-num text-[1.75rem] text-bone">{s.n}</div>
            <p className="mt-1 text-[0.875rem] text-bone-3">{s.d}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
