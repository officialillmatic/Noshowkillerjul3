import React from "react";

const STEPS = [
  {
    when: "Day 1",
    title: "We train Ava on your practice",
    body: "Services, hours, insurance you accept, booking rules and the way your team actually talks to patients. You keep your phone number.",
  },
  {
    when: "Day 3",
    title: "She answers and books, 24/7",
    body: "Every call picked up, the caller qualified and the appointment placed in your calendar. Confirmations and reminders go out on their own.",
  },
  {
    when: "Every day after",
    title: "You watch the revenue come back",
    body: "Recordings, transcripts, caller sentiment and dollars recovered, live in your dashboard. Ava hands the call to a person whenever someone asks.",
  },
];

export default function HowItWorks() {
  return (
    <section className="border-t border-line bg-ink-2 py-20 sm:py-28" id="how">
      <div className="wrap">
        <h2 className="display max-w-[22em] text-[clamp(1.9rem,3.6vw,2.8rem)] text-bone">
          We build it, train it on your practice and switch it on.
        </h2>
        <ol className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.when} className="bg-ink-2 p-7">
              <div className="text-[0.85rem] text-brass">{s.when}</div>
              <h3 className="mt-3 text-[1.2rem] font-semibold leading-snug text-bone">{s.title}</h3>
              <p className="prose-muted mt-3 text-[0.95rem]">{s.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
