import React, { useMemo, useState } from "react";
import { BOOKING_URL, usd } from "../lib/site";

/** The "Math Moment" from the sales playbook, done by the visitor with their own figures. */
export default function CostCalculator() {
  const [patients, setPatients] = useState(120);
  const [noShows, setNoShows] = useState(8);
  const [visit, setVisit] = useState(350);
  const [missed, setMissed] = useState(15);

  const r = useMemo(() => {
    const noShowLoss = noShows * visit * 52;
    const missedLoss = (missed / 3) * visit * 52; // about one in three missed callers would have booked
    const year = noShowLoss + missedLoss;
    return { noShowLoss, missedLoss, year, month: year / 12, multiple: year / 12 / 497 };
  }, [noShows, visit, missed]);

  return (
    <section className="py-20 sm:py-28" id="cost">
      <div className="wrap">
        <div className="max-w-[46em]">
          <h2 className="display text-[clamp(2rem,4vw,3.1rem)] text-bone">
            What a missed call costs you. Most owners have never done the math.
          </h2>
          <p className="prose-muted mt-5 max-w-[38em] text-[1.05rem]">
            Four sliders, your figures. This is the same arithmetic we do together on a first call.
          </p>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="panel flex flex-col gap-6 p-6 sm:p-8">
            <Slider id="patients" label="Patients per week" value={patients} display={String(patients)} min={20} max={400} step={5} onChange={setPatients} />
            <Slider id="noshows" label="No-shows per week" value={noShows} display={String(noShows)} min={0} max={40} step={1} onChange={setNoShows} />
            <Slider id="visit" label="Value of a visit" value={visit} display={usd(visit)} min={80} max={1500} step={10} onChange={setVisit} />
            <Slider id="missed" label="Calls missed per week" value={missed} display={String(missed)} min={0} max={80} step={1} onChange={setMissed} />
            <p className="text-[0.85rem] text-bone-3">
              Not sure about no-shows? Most practices land between one and two a day. Patients per week only sets the scale of your practice.
            </p>
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-[var(--radius-card)] border border-line-2 p-6 sm:p-8" style={{ background: "linear-gradient(160deg, #15271f, #0d1915)" }}>
            <div>
              <p className="text-[0.95rem] text-bone-2">Walking out the door every year</p>
              <div className="display-num mt-2 text-[clamp(3rem,7vw,5rem)] leading-none text-brass" aria-live="polite" id="yearly-loss">
                {usd(r.year)}
              </div>
            </div>
            <dl className="divide-y divide-line text-[0.95rem]">
              <Row k="From no-shows" v={usd(r.noShowLoss)} />
              <Row k="From missed calls that would have booked (one in three)" v={usd(r.missedLoss)} />
              <Row k="Per month" v={usd(r.month)} />
            </dl>
            <div>
              <p className="text-[0.9rem] text-bone-2">
                Plans start at $497 a month. At your numbers that is{" "}
                <span className="tnum font-semibold text-bone">{r.multiple >= 1 ? `${r.multiple.toFixed(1)}×` : "less than 1×"}</span>{" "}
                the loss, so the only question is how much of it Ava recovers.
              </p>
              <a href={BOOKING_URL} className="btn btn-brass mt-5" target="_blank" rel="noopener noreferrer">
                See it recover this on a demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="text-bone-2">{k}</dt>
      <dd className="tnum font-semibold text-bone">{v}</dd>
    </div>
  );
}

function Slider(p: { id: string; label: string; value: number; display: string; min: number; max: number; step: number; onChange: (n: number) => void }) {
  return (
    <div>
      <label htmlFor={p.id} className="mb-2.5 flex justify-between text-[0.95rem] text-bone-2">
        <span>{p.label}</span>
        <output htmlFor={p.id} className="tnum font-semibold text-bone">{p.display}</output>
      </label>
      <input id={p.id} type="range" min={p.min} max={p.max} step={p.step} value={p.value} onChange={(e) => p.onChange(Number(e.target.value))} />
    </div>
  );
}
