import React, { useState } from "react";
import { AlertCircle, CheckCircle2, Calendar } from "lucide-react";
import Reveal from "./Reveal";
import Pixels from "./Pixels";
import { AVA_PHONE_DISPLAY, AVA_PHONE_TEL, BOOKING_URL, SUPPORT_EMAIL } from "../lib/site";

/**
 * Supabase connection for lead capture.
 * NOTE: the "anon" key is PUBLIC by design — it ships in every Supabase frontend.
 * It is safe here because the `site_demo_requests` table has Row Level Security
 * with an INSERT-only policy: the browser can write a lead, but can never read
 * leads back out. Only the server-side service_role key can read them.
 */
const SUPABASE_URL = "https://cuaekpirqkckbuocsvyk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1YWVrcGlycWtja2J1b2NzdnlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwOTE5MDYsImV4cCI6MjA5NTY2NzkwNn0.xtmmGmmUcoxcRoEbh8ICvoQwApFWg4Hzt3QmIZhlpIg";

/** Human-readable labels for the pain-point values we store. */
const CONCERN_LABELS: Record<string, string> = {
  voicemails: "Missed voicemail leads",
  noshows: "High appointment no-shows",
  overload: "Staff overloaded with calls",
  metrics: "Seeking live dashboard metrics",
};

const CONCERNS = [
  { value: "voicemails", label: "Calls going to voicemail" },
  { value: "noshows", label: "Too many no-shows" },
  { value: "overload", label: "Front desk can't keep up" },
  { value: "metrics", label: "I want to see the numbers" },
];

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", businessName: "", painPoint: "voicemails" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveFailed, setSaveFailed] = useState(false);

  /**
   * Saves the lead to Supabase, then sends the visitor to the Google booking page.
   * IMPORTANT: if the save fails we still let them book — a database problem on our
   * side must never stop a prospect from getting on the calendar.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;

    setIsSubmitting(true);
    setSaveFailed(false);

    // Capture UTM tags if the visitor arrived from an ad campaign.
    const params = new URLSearchParams(window.location.search);

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/site_demo_requests`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          full_name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          company_name: formData.businessName.trim() || null,
          concern: CONCERN_LABELS[formData.painPoint] || formData.painPoint,
          source: "website",
          utm_source: params.get("utm_source"),
          utm_campaign: params.get("utm_campaign"),
          user_agent: navigator.userAgent,
        }),
      });
      if (!res.ok) throw new Error(`Supabase responded ${res.status}`);
    } catch (err) {
      // Log for debugging, but never block the booking path.
      console.error("Lead save failed:", err);
      setSaveFailed(true);
    }

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Give them a moment to read the confirmation, then hand off to Google Calendar.
    // Same-tab redirect (not window.open) so popup blockers can't swallow it.
    setTimeout(() => { window.location.href = BOOKING_URL; }, 2500);
  };

  const set = (k: keyof typeof formData) => (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [k]: e.target.value });

  return (
    <section className="relative overflow-hidden border-t border-line bg-ink-2 py-24 sm:py-32" id="contacts">
      <div className="pointer-events-none absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-neon/5 blur-[140px]" />
      <Pixels className="absolute left-[4%] bottom-16 hidden lg:block" seed={19} count={10} cols={8} rows={5} cell={14} />
      <div className="wrap relative grid gap-10 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="kicker">Reserve your agent</div>
          <h2 className="display mt-4 text-[clamp(2rem,4.2vw,3.4rem)] uppercase text-white">Book your <span className="text-neon">20-minute demo</span></h2>
          <p className="prose-muted mt-5 max-w-[34em] text-[1.05rem]">
            Tell us about your practice and pick a time. Nicole walks you through exactly how Ava would handle your calls, with your own numbers from the calculator above.
          </p>

          <div className="mt-8 flex flex-col gap-4 text-[0.95rem]">
            <a href={BOOKING_URL} className="btn btn-neon self-start" target="_blank" rel="noopener noreferrer">
              <Calendar size={14} /> Skip the form, open the calendar
            </a>
            <p className="text-muted">
              Prefer to hear Ava first? Call her on{" "}
              <a href={`tel:${AVA_PHONE_TEL}`} className="tnum font-semibold text-white underline decoration-neon/40 underline-offset-4 hover:decoration-neon">{AVA_PHONE_DISPLAY}</a>.
            </p>
            <p className="text-faint">
              Questions about onboarding: <a href={`mailto:${SUPPORT_EMAIL}`} className="text-muted hover:text-white">{SUPPORT_EMAIL}</a>
            </p>
          </div>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-7">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="glass relative rounded-2xl p-6 sm:p-8" id="contact-agent-form">
              {isSubmitting && (
                <div className="absolute inset-0 z-10 grid place-items-center rounded-2xl bg-black/80 backdrop-blur-md">
                  <div className="text-center">
                    <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-neon border-t-transparent" />
                    <p className="mt-3 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-white">Saving your details</p>
                    <p className="mt-1 text-[0.82rem] text-faint">Then we take you to the calendar to pick a time.</p>
                  </div>
                </div>
              )}

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="lead-name" className="label">Your name</label>
                  <input id="lead-name" type="text" required autoComplete="name" className="field" value={formData.name} onChange={set("name")} placeholder="Dr. Maria Patel" />
                </div>
                <div>
                  <label htmlFor="lead-email" className="label">Email</label>
                  <input id="lead-email" type="email" required autoComplete="email" className="field" value={formData.email} onChange={set("email")} placeholder="maria@brightsmiledental.com" />
                </div>
                <div>
                  <label htmlFor="lead-phone" className="label">Phone</label>
                  <input id="lead-phone" type="tel" required autoComplete="tel" className="field" value={formData.phone} onChange={set("phone")} placeholder="+1 (713) 555-0142" />
                </div>
                <div>
                  <label htmlFor="lead-business" className="label">Practice name</label>
                  <input id="lead-business" type="text" autoComplete="organization" className="field" value={formData.businessName} onChange={set("businessName")} placeholder="Bright Smile Dental" />
                </div>
              </div>

              <fieldset className="mt-6">
                <legend className="label">What hurts most right now?</legend>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {CONCERNS.map((c) => {
                    const on = formData.painPoint === c.value;
                    return (
                      <label key={c.value} className={`flex cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 text-[0.9rem] transition-all ${on ? "border-neon bg-neon/10 text-neon" : "border-line bg-black/30 text-muted hover:bg-white/[0.04]"}`}>
                        <input type="radio" name="painPoint" value={c.value} checked={on} onChange={() => setFormData({ ...formData, painPoint: c.value })} className="accent-[#0ae000]" />
                        {c.label}
                      </label>
                    );
                  })}
                </div>
              </fieldset>

              <div className="mt-7">
                <button type="submit" disabled={isSubmitting} className="btn btn-neon btn-lg w-full">
                  Continue to the calendar
                </button>
                <p className="mt-3 text-center text-[0.8rem] text-faint">You pick a 20-minute slot on the next screen. We only use your details to prepare the demo.</p>
              </div>
            </form>
          ) : (
            <div className="glass flex min-h-[420px] flex-col items-center justify-center rounded-2xl p-8 text-center animate-fade-in" id="booking-success-receipt">
              <span className="grid h-14 w-14 place-items-center rounded-full border border-neon/30 bg-neon/15 text-neon"><CheckCircle2 size={28} /></span>
              <h3 className="display mt-5 text-[1.8rem] uppercase text-white">One last step, {formData.name.split(" ")[0]}</h3>
              <p className="prose-muted mt-2 max-w-[32em]">We are opening the calendar so you can pick a time. If it doesn't open on its own, use the button below.</p>
              <a href={BOOKING_URL} className="btn btn-neon btn-lg mt-6" target="_blank" rel="noopener noreferrer">Choose your time slot</a>
              {saveFailed && (
                <p className="mt-5 flex max-w-[32em] items-start gap-2 text-left text-[0.82rem] text-ember">
                  <AlertCircle size={15} className="mt-0.5 shrink-0" />
                  We had trouble saving your details, but you can still book. We will collect everything on the call.
                </p>
              )}
              <button type="button" onClick={() => { setIsSubmitted(false); setSaveFailed(false); }} className="mt-6 text-[0.72rem] font-bold uppercase tracking-[0.2em] text-neon hover:text-white">
                Edit my details
              </button>
            </div>
          )}
        </Reveal>
      </div>
    </section>
  );
}
