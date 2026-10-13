import React from "react";
import { PhoneIncoming, CalendarCheck, MessageSquareText } from "lucide-react";
import Reveal from "./Reveal";
import Pixels from "./Pixels";

const RECENT = [
  { who: "(281) 555-0117", what: "New patient, cleaning", when: "8:12 PM", mood: "Positive", value: 220 },
  { who: "(832) 555-0190", what: "Emergency, chipped tooth", when: "7:48 PM", mood: "Anxious, reassured", value: 350 },
  { who: "(713) 555-0142", what: "Reschedule, crown prep", when: "6:30 PM", mood: "Positive", value: 1100 },
  { who: "(346) 555-0035", what: "Insurance question", when: "5:55 PM", mood: "Neutral", value: 0 },
];

export default function Capabilities() {
  return (
    <section className="relative py-24 sm:py-32" id="capabilities">
      <Pixels className="absolute right-[3%] top-16 hidden lg:block" seed={11} count={12} cols={9} rows={6} cell={14} />
      <div className="wrap">
        <Reveal className="max-w-[40em]">
          <div className="kicker">Engineered outcomes</div>
          <h2 className="display mt-4 text-[clamp(1.9rem,3.6vw,3rem)] uppercase text-white">What Ava handles, <span className="text-neon">so your front desk doesn't have to</span></h2>
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-5">
          <Reveal className="panel panel-hover overflow-hidden lg:col-span-3" id="dashboard-tile">
            <div className="flex items-center justify-between border-b border-line px-6 py-4">
              <div>
                <h3 className="font-semibold text-white">Shows you the money</h3>
                <p className="text-[0.82rem] text-faint">Every call, with transcript, recording, sentiment and the value of what got booked.</p>
              </div>
            </div>
            <div className="grid grid-cols-3 divide-x divide-line border-b border-line">
              <Stat label="Calls today" value="41" />
              <Stat label="Booked" value="19" />
              <Stat label="Recovered" value="$5,870" neon />
            </div>
            <ul className="divide-y divide-line">
              {RECENT.map((r) => (
                <li key={r.who} className="grid grid-cols-[1fr_auto] items-center gap-3 px-6 py-3.5 text-[0.88rem] sm:grid-cols-[1.1fr_1.3fr_1fr_auto]">
                  <span className="tnum font-medium text-white">{r.who}</span>
                  <span className="col-span-2 text-muted sm:col-span-1">{r.what}</span>
                  <span className="hidden text-faint sm:block">{r.mood}</span>
                  <span className={`tnum text-right font-semibold ${r.value ? "text-neon" : "text-faint"}`}>{r.value ? `+$${r.value.toLocaleString("en-US")}` : r.when}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="grid gap-5 lg:col-span-2">
            <Tile i={0} icon={<PhoneIncoming size={18} />} title="Answers every call" body="First ring, after hours, weekends, and the second line while your receptionist is with a patient. Natural voice, your practice's name, your tone." />
            <Tile i={1} icon={<CalendarCheck size={18} />} title="Books into your calendar" body="Checks real availability, follows your booking rules and places the appointment during the call. No double bookings, no call-backs." />
            <Tile i={2} icon={<MessageSquareText size={18} />} title="Confirms and reminds" body="Texts the confirmation, reminds the patient before the visit and lets them reschedule by replying. That is where the no-shows go." />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, neon = false }: { label: string; value: string; neon?: boolean }) {
  return (
    <div className="px-6 py-4">
      <div className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-faint">{label}</div>
      <div className={`display-num mt-1 text-[1.5rem] ${neon ? "text-neon" : "text-white"}`}>{value}</div>
    </div>
  );
}

function Tile({ i, icon, title, body }: { i: number; icon: React.ReactNode; title: string; body: string }) {
  return (
    <Reveal delay={120 + i * 100} className="panel panel-hover group p-6">
      <div className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-lg border border-line bg-white/5 text-neon transition-colors group-hover:border-neon/30 group-hover:bg-neon/10">{icon}</span>
        <h3 className="font-semibold text-white transition-colors group-hover:text-neon">{title}</h3>
      </div>
      <p className="prose-muted mt-3 text-[0.92rem]">{body}</p>
    </Reveal>
  );
}
