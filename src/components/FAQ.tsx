import React from "react";
import { Plus } from "lucide-react";

export const FAQS = [
  {
    q: "We already have a receptionist. Why would we need this?",
    a: "She keeps her job and loses the worst part of it. Ava covers after hours, lunch, weekends and the second line that rings while your receptionist is with a patient. Nothing goes to voicemail, and your team stays with the people in front of them.",
  },
  {
    q: "Will patients know they are talking to an AI?",
    a: "Ava introduces herself by name, sounds natural and answers in your practice's voice. If a caller asks for a person, she transfers the call or takes a message for a call-back. Most prospects first meet Ava by calling her themselves, and that is the fastest way to judge.",
  },
  {
    q: "Does it work with my calendar and practice software?",
    a: "Ava books into the calendar you already use. During setup we connect your scheduling system, load your services, hours and booking rules, and test real bookings before she goes live.",
  },
  {
    q: "How does it reduce no-shows?",
    a: "Every booking gets a text confirmation, a reminder before the visit and an easy way to reschedule by replying. Patients who would have silently skipped either confirm or free the slot in time to refill it.",
  },
  {
    q: "How long does setup take?",
    a: "Most practices are live within days. We build and train Ava on your practice, you review a test call, and we switch her on. You keep your phone number.",
  },
  {
    q: "What happens on a call Ava can't handle?",
    a: "She hands it to a person, by transferring the call or taking a message, and everything is logged with the recording and transcript in your dashboard.",
  },
  {
    q: "What does it cost?",
    a: "Plans start at $497 a month with 500 call minutes and go up to $1,997 for 4,000 minutes. Setup is quoted after the demo based on your practice. Plans are monthly and cancelled in one click from your portal.",
  },
];

export default function FAQ() {
  return (
    <section className="py-20 sm:py-28" id="faq">
      <div className="wrap grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <h2 className="display text-[clamp(1.9rem,3.6vw,2.8rem)] text-bone">Questions owners ask on the first call</h2>
        </div>
        <div className="lg:col-span-8">
          <div className="divide-y divide-line border-y border-line">
            {FAQS.map((f) => (
              <details key={f.q} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-[1.05rem] font-medium text-bone [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <Plus size={18} className="shrink-0 text-bone-3 transition-transform group-open:rotate-45" aria-hidden="true" />
                </summary>
                <p className="prose-muted max-w-[62ch] pb-6 text-[0.98rem]">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
