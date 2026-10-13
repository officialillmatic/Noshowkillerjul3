import React, { useMemo, useState } from "react";
import Reveal from "./Reveal";
import Pixels from "./Pixels";
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
    <section className="relative py-24 sm:py-32" id="cost">
      <Pixels className="absolute left-[2%] top-10 hidden lg:block" seed={7} count={9} cols={7} rows={5} cell={14} />
      <div className="wrap">
        <Reveal className="max-w-[46em]">
          <div className="kicker">Lost revenue recovery</div>
          <h2 className="display mt-4 text-[clamp(2rem,4.2vw,3.4rem)] uppercase text-white">
            What a missed call <span className="text-neon">costs you.</span>
          </h2>
          <p className="prose-muted mt-5 max-w-[38em] text-[1.05rem]">
            Most owners have never done the math. Four sliders, your figures. This is the same arithmetic we do together on a first call.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <Reveal className="panel flex flex-col gap-6 p-6 sm:p-8">
            <Slider id="patients" label="Patients per week" value={patients} display={String(patients)} min={20} max={400} step={5} onChange={setPatients} />
            <Slider id="noshows" label="No-shows per week" value={noShows} display={String(noShows)} min={0} max={40} step={1} onChange={setNoShows} />
            <Slider id="visit" label="Value of a visit" value={visit} display={usd(visit)} min={80} max={1500} step={10} onChange={setVisit} />
            <Slider id="missed" label="Calls missed per week" value={missed} display={String(missed)} min={0} max={80} step={1} onChange={setMissed} />
            <p className="text-[0.82rem] text-faint">
              Not sure about no-shows? Most practices land between one and two a day. Patients per week only sets the scale of your practice.
            </p>
          </Reveal>

          <Reveal delay={120} className="relative flex flex-col justify-between gap-6 overflow-hidden rounded-2xl border border-neon/20 p-6 sm:p-8" style={{ background: "linear-gradient(160deg, rgba(10,224,0,0.08), rgba(10,224,0,0.02) 45%, #171717)" }}>
            <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-neon/10 blur-[80px]" />
            <div>
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.24em] text-muted">Walking out the door every year</p>
              <div className="display-num mt-3 text-[clamp(3rem,7vw,5.2rem)] leading-none text-neon drop-shadow-[0_0_24px_rgba(10,224,0,0.35)]" aria-live="polite" id="yearly-loss">
                {usd(r.year)}
              </div>
            </div>
            <dl className="divide-y divide-line text-[0.92rem]">
              <Row k="From no-shows" v={usd(r.noShowLoss)} />
              <Row k="From missed calls that would have booked (one in three)" v={usd(r.missedLoss)} />
              <Row k="Per month" v={usd(r.month)} />
            </dl>
            <div>
              <p className="text-[0.9rem] text-muted">
                Plans start at $497 a month. At your numbers that is{" "}
                <span className="tnum font-semibold text-white">{r.multiple >= 1 ? `${r.multiple.toFixed(1)}×` : "less than 1×"}</span>{" "}
                the loss, so the only question is how much of it Ava recovers.
              </p>
              <a href={BOOKING_URL} className="btn btn-neon mt-5" target="_blank" rel="noopener noreferrer">
                See it recover this on a demo
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4 py-3">
      <dt className="text-muted">{k}</dt>
      <dd className="tnum font-semibold text-white">{v}</dd>
    </div>
  );
}

function Slider(p: { id: string; label: string; value: number; display: string; min: number; max: number; step: number; onChange: (n: number) => void }) {
  return (
    <div>
      <label htmlFor={p.id} className="mb-2.5 flex justify-between text-[0.9rem] text-muted">
        <span>{p.label}</span>
        <output htmlFor={p.id} className="tnum font-semibold text-white">{p.display}</output>
      </label>
      <input id={p.id} type="range" min={p.min} max={p.max} step={p.step} value={p.value} onChange={(e) => p.onChange(Number(e.target.value))} />
    </div>
  );
}
