import React from "react";

const INDUSTRIES = [
  "Dental practices",
  "Chiropractic clinics",
  "Med spas and aesthetics",
  "Hair and beauty salons",
  "Law firms",
  "Home services",
  "Auto shops",
  "Real estate",
];

export default function Industries() {
  return (
    <section className="border-y border-line bg-ink-2 py-14" id="industries">
      <div className="wrap grid gap-8 md:grid-cols-12 md:items-center">
        <div className="md:col-span-5">
          <h2 className="display text-[clamp(1.6rem,2.8vw,2.1rem)] text-bone">Built for dental first. Works anywhere an empty slot costs money.</h2>
        </div>
        <ul className="flex flex-wrap gap-2.5 md:col-span-7" aria-label="Industries we serve">
          {INDUSTRIES.map((name, i) => (
            <li key={name} className={`rounded-full border px-4 py-2 text-[0.9rem] ${i === 0 ? "border-brass/60 text-brass" : "border-line-2 text-bone-2"}`}>
              {name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
