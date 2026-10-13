import React, { useState } from "react";
import { Phone } from "lucide-react";
import VoiceOrb from "./VoiceOrb";
import LiveCall from "./LiveCall";
import { AVA_PHONE_DISPLAY, AVA_PHONE_TEL, BOOKING_URL } from "../lib/site";

export default function HeroSection() {
  const [speaking, setSpeaking] = useState(false);

  return (
    <section className="relative overflow-hidden" id="top">
      <div className="wrap relative grid items-center gap-12 pt-14 pb-16 sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:pt-24 lg:pb-24">
        <div className="relative z-10 lg:col-span-7">
          <p className="text-[0.95rem] text-bone-2">AI receptionist for dental practices</p>
          <h1 className="display mt-5 text-[clamp(2.6rem,6vw,4.9rem)] text-bone">
            Every call answered. Every visit confirmed.
          </h1>
          <p className="prose-muted mt-6 max-w-[36em] text-[clamp(1.05rem,1.4vw,1.25rem)] leading-relaxed">
            Ava picks up on the first ring, day or night, books the patient straight into your calendar and
            follows up so they show. Your team stays with the patients in the chair.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <a href={BOOKING_URL} className="btn btn-brass btn-lg" target="_blank" rel="noopener noreferrer">
              Book a 20-minute demo
            </a>
            <a
              href={`tel:${AVA_PHONE_TEL}`}
              className="inline-flex items-center gap-3 rounded-2xl border border-dashed border-line-2 px-4 py-2.5 hover:border-brass/60 transition-colors"
              id="call-ava-cta"
            >
              <span className="grid h-9 w-9 place-items-center rounded-full bg-moss text-brass"><Phone size={16} /></span>
              <span className="leading-tight">
                <span className="block text-[0.75rem] text-bone-3">Hear her yourself, right now</span>
                <span className="block font-semibold tnum">{AVA_PHONE_DISPLAY}</span>
              </span>
            </a>
          </div>

          <ul className="hairline mt-10 flex flex-wrap gap-x-7 gap-y-2 pt-6 text-[0.9rem] text-bone-2">
            <li>Live in days</li>
            <li>Works with the calendar you already use</li>
            <li>Hands the call to a person on request</li>
          </ul>
        </div>

        <div className="relative lg:col-span-5">
          <VoiceOrb
            active={speaking}
            className="pointer-events-none absolute left-[62%] top-[48%] h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 sm:h-[820px] sm:w-[820px]"
          />
          <div className="relative pt-6">
            <LiveCall onSpeaking={setSpeaking} />
          </div>
        </div>
      </div>
    </section>
  );
}
