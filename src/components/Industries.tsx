import React from "react";
import { Stethoscope, Heart, Sparkles, Scissors, Scale, Wrench, Car, Building2 } from "lucide-react";
import Reveal from "./Reveal";

const INDUSTRIES = [
  { name: "Dental practices", icon: <Stethoscope size={16} /> },
  { name: "Chiropractic clinics", icon: <Heart size={16} /> },
  { name: "Med spas and aesthetics", icon: <Sparkles size={16} /> },
  { name: "Hair and beauty salons", icon: <Scissors size={16} /> },
  { name: "Law firms", icon: <Scale size={16} /> },
  { name: "Home services", icon: <Wrench size={16} /> },
  { name: "Auto shops", icon: <Car size={16} /> },
  { name: "Real estate", icon: <Building2 size={16} /> },
];

export default function Industries() {
  const items = [...INDUSTRIES, ...INDUSTRIES]; // doubled for a seamless marquee
  return (
    <section className="overflow-hidden border-y border-line bg-ink-2 py-14" id="industries">
      <div className="wrap">
        <Reveal className="max-w-[36em]">
          <h2 className="display text-[clamp(1.5rem,2.6vw,2.1rem)] uppercase text-white">Built for dental first. <span className="text-neon">Works anywhere an empty slot costs money.</span></h2>
        </Reveal>
      </div>
      <div className="relative mt-8" style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)", WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}>
        <ul className="flex w-max gap-3 animate-marquee hover:[animation-play-state:paused]" aria-label="Industries we serve">
          {items.map((it, i) => (
            <li key={i} aria-hidden={i >= INDUSTRIES.length} className={`flex items-center gap-2.5 rounded-lg border px-4 py-2.5 text-[0.85rem] whitespace-nowrap ${i % INDUSTRIES.length === 0 ? "border-neon/50 bg-neon/[0.06] text-neon" : "border-line text-muted"}`}>
              <span className={i % INDUSTRIES.length === 0 ? "text-neon" : "text-neon/70"}>{it.icon}</span>{it.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
