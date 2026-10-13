import React from "react";
import { PhoneIncoming, CalendarCheck, MessageSquareText } from "lucide-react";

const RECENT = [
  { who: "(281) 555-0117", what: "New patient, cleaning", when: "8:12 PM", mood: "Positive", value: 220 },
  { who: "(832) 555-0190", what: "Emergency, chipped tooth", when: "7:48 PM", mood: "Anxious, reassured", value: 350 },
  { who: "(713) 555-0142", what: "Reschedule, crown prep", when: "6:30 PM", mood: "Positive", value: 1100 },
  { who: "(346) 555-0035", what: "Insurance question", when: "5:55 PM", mood: "Neutral", value: 0 },
];

export default function Capabilities() {
  return (
    <section className="py-20 sm:py-28" id="capabilities">
      <div className="wrap">
        <div className="max-w-[40em]">
          <h2 className="display text-[clamp(1.9rem,3.6vw,2.8rem)] text-bone">What Ava handles, so your front desk doesn't have to</h2>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-5">
          {/* Dashboard tile */}
          <div className="panel overflow-hidden lg:col-span-3" id="dashboard-tile">
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <div>
                <h3 className="font-semibold text-bone">Shows you the money</h3>
                <p className="text-[0.85rem] text-bone-3">Every call, with transcript, recording, sentiment and the value of what got booked.</p>
              </div>
            </div>
            <div className="grid grid-cols-3 divide-x divide-line border-b border-line">
              <Stat label="Calls today" value="41" />
              <Stat label="Booked" value="19" />
              <Stat label="Recovered" value="$5,870" brass />
            </div>
            <ul className="divide-y divide-line">
              {RECENT.map((r) => (
                <li key={r.who} className="grid grid-cols-[1fr_auto] items-center gap-3 px-6 py-3.5 text-[0.9rem] sm:grid-cols-[1.1fr_1.3fr_1fr_auto]">
                  <span className="tnum font-medium text-bone">{r.who}</span>
                  <span className="text-bone-2 col-span-2 sm:col-span-1">{r.what}</span>
                  <span className="hidden text-bone-3 sm:block">{r.mood}</span>
                  <span className={`tnum text-right ${r.value ? "text-brass" : "text-bone-3"}`}>{r.value ? `+$${r.value.toLocaleString("en-US")}` : r.when}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-5 lg:col-span-2">
            <Tile icon={<PhoneIncoming size={18} />} title="Answers every call" body="First ring, after hours, weekends, and the second line while your receptionist is with a patient. Natural voice, your practice's name, your tone." />
            <Tile icon={<CalendarCheck size={18} />} title="Books into your calendar" body="Checks real availability, follows your booking rules and places the appointment during the call. No double bookings, no call-backs." />
            <Tile icon={<MessageSquareText size={18} />} title="Confirms and reminds" body="Texts the confirmation, reminds the patient before the visit and lets them reschedule by replying. That is where the no-shows go." />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, brass = false }: { label: string; value: string; brass?: boolean }) {
  return (
    <div className="px-6 py-4">
      <div className="text-[0.8rem] text-bone-3">{label}</div>
      <div className={`display-num text-[1.5rem] ${brass ? "text-brass" : "text-bone"}`}>{value}</div>
    </div>
  );
}

function Tile({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div className="panel p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-ink text-brass">{icon}</span>
        <h3 className="font-semibold text-bone">{title}</h3>
      </div>
      <p className="prose-muted mt-3 text-[0.95rem]">{body}</p>
    </div>
  );
}
