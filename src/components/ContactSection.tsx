import React, { useState } from "react";
import { Sparkles, Check, Send, CheckCircle2, Calendar, Clock, Phone, Mail, Building, User, Facebook, AlertCircle, ArrowRight } from "lucide-react";

/**
 * Supabase connection for lead capture.
 * NOTE: the "anon" key is PUBLIC by design — it ships in every Supabase frontend.
 * It is safe here because the `site_demo_requests` table has Row Level Security
 * with an INSERT-only policy: the browser can write a lead, but can never read
 * leads back out. Only the server-side service_role key can read them.
 */
const SUPABASE_URL = "https://cuaekpirqkckbuocsvyk.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN1YWVrcGlycWtja2J1b2NzdnlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAwOTE5MDYsImV4cCI6MjA5NTY2NzkwNn0.xtmmGmmUcoxcRoEbh8ICvoQwApFWg4Hzt3QmIZhlpIg";

/** Your live Google booking page — the single source of truth for scheduling. */
const BOOKING_URL = "https://calendar.app.google/FEyhB3T1gC1Nnk5h6";

/** Human-readable labels for the pain-point values we store. */
const CONCERN_LABELS: Record<string, string> = {
  voicemails: "Missed voicemail leads",
  noshows: "High appointment no-shows",
  overload: "Staff overloaded with calls",
  metrics: "Seeking live dashboard metrics",
};

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    painPoint: "voicemails",
  });
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
    setTimeout(() => {
      window.location.href = BOOKING_URL;
    }, 2500);
  };

  const currentYear = new Date().getFullYear();

  return (
    <section
      className="relative py-20 sm:py-24 px-4 sm:px-8 lg:px-16 bg-[#080808]"
      id="contacts"
    >
      <div className="absolute top-0 left-1/4 right-1/4 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto space-y-16" id="contacts-container">

        {/* Header Block */}
        <div className="text-center max-w-3xl mx-auto space-y-4" id="contacts-header">
          <div className="inline-flex items-center gap-1.5 bg-primary/10 border border-primary/20 px-3 py-1 rounded-full text-primary" id="contact-badge">
            <Calendar size={12} />
            <span className="text-[10px] font-mono tracking-widest font-black uppercase">
              RESERVE YOUR CONVERSATION AGENT
            </span>
          </div>

          <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-foreground uppercase">
            Deploy Your AI <br className="hidden sm:inline" />
            <span className="text-primary font-sans">Front Desk Receptionist</span>
          </h2>

          <p className="text-xs lg:text-sm text-muted-foreground/80 font-light max-w-2xl mx-auto leading-relaxed">
            Tell us about your business, then pick a time that works for you. We&rsquo;ll review your setup before the call and walk you through exactly how your AI receptionist would handle your front desk.
          </p>
        </div>

        {/* BOOKING BANNER */}
        <div className="max-w-5xl mx-auto" id="direct-cal-booking-banner">
          <div className="relative rounded-2xl overflow-hidden border border-primary/30 bg-primary/[0.02] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(10,224,0,0.03)] group hover:border-primary/50 transition-colors">
            {/* Ambient subtle green glow */}
            <div className="absolute -top-10 -right-10 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center gap-4 text-left">
              <div className="p-3.5 bg-primary/10 border border-primary/25 rounded-xl text-primary shrink-0 group-hover:scale-105 transition-transform duration-300">
                <Calendar size={22} className="animate-pulse" />
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-ping" />
                  <span className="text-[10px] font-bold text-primary tracking-widest uppercase font-mono">
                    Fast Track Scheduling
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-bold uppercase text-foreground tracking-tight">
                  Book a Free Call
                </h3>
                <p className="text-[11px] sm:text-xs text-muted-foreground/80 font-light max-w-lg leading-relaxed">
                  Skip the form. Book a 20-minute consultation with Nicole Bejarano to configure, voice-train, and deploy your customized receptionist.
                </p>
              </div>
            </div>

            <a
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-primary text-black font-mono font-black text-xs uppercase tracking-wider hover:bg-opacity-90 transition-all flex items-center justify-center gap-2 shrink-0 shadow-lg group-hover:shadow-primary/10 active:scale-[0.98]"
            >
              <span>Instant Calendar Booking</span>
              <Sparkles size={13} className="text-black shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
            </a>
          </div>
        </div>

        {/* Main Grid: Form Left, Explanatory info Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto" id="contact-inner-grid">

          {/* Form Pane */}
          <div className="lg:col-span-7" id="contact-form-side">
            {!isSubmitted ? (
              <form
                onSubmit={handleSubmit}
                className="glass-panel p-4 sm:p-6 lg:p-8 rounded-2xl relative space-y-6 text-left border border-white/5 flex flex-col justify-between h-full"
                id="contact-agent-form"
              >
                {isSubmitting && (
                  <div className="absolute inset-0 bg-black/80 backdrop-blur-md rounded-2xl z-30 flex flex-col items-center justify-center space-y-4">
                    <div className="h-12 w-12 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <div className="text-center space-y-1">
                      <p className="text-sm font-semibold text-foreground tracking-wider uppercase font-mono">
                        SAVING YOUR DETAILS...
                      </p>
                      <p className="text-[11px] text-muted-foreground font-light max-w-xs px-4 leading-normal">
                        One moment &mdash; we&rsquo;ll take you straight to the calendar to pick your time.
                      </p>
                    </div>
                  </div>
                )}

                <div className="space-y-5">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-primary animate-ping" />
                    1. Tell us about your business
                  </h3>

                  {/* Inputs Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block">
                        Full Name *
                      </label>
                      <div className="relative">
                        <User size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Arthur Pendelton"
                          className="w-full bg-black/40 border border-white/5 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 outline-none text-xs rounded-lg px-3 py-3.5 pl-9 text-foreground placeholder-white/20 transition-all font-light"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="arthur@pendelton.com"
                          className="w-full bg-black/40 border border-white/5 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 outline-none text-xs rounded-lg px-3 py-3.5 pl-9 text-foreground placeholder-white/20 transition-all font-light"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({...formData, phone: e.target.value})}
                          placeholder="+1 (555) 321-4567"
                          className="w-full bg-black/40 border border-white/5 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 outline-none text-xs rounded-lg px-3 py-3.5 pl-9 text-foreground placeholder-white/20 transition-all font-light"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block">
                        Company Name
                      </label>
                      <div className="relative">
                        <Building size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" />
                        <input
                          type="text"
                          value={formData.businessName}
                          onChange={(e) => setFormData({...formData, businessName: e.target.value})}
                          placeholder="Pendelton Logistics"
                          className="w-full bg-black/40 border border-white/5 focus:border-primary/40 focus:ring-1 focus:ring-primary/40 outline-none text-xs rounded-lg px-3 py-3.5 pl-9 text-foreground placeholder-white/20 transition-all font-light"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Pain point selector */}
                  <div className="space-y-2 pt-2">
                    <label className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest block">
                      YOUR HIGHEST PRIORITY FRONT OFFICE CONCERN
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {[
                        { label: "Missed voicemail leads", value: "voicemails" },
                        { label: "High appointment no-shows", value: "noshows" },
                        { label: "Staff overloaded with calls", value: "overload" },
                        { label: "Seeking live dashboard metrics", value: "metrics" }
                      ].map((item) => (
                        <div
                          key={item.value}
                          onClick={() => setFormData({...formData, painPoint: item.value})}
                          className={`p-2.5 rounded-lg border text-[11px] font-light flex items-center justify-between cursor-pointer transition-all ${
                            formData.painPoint === item.value
                              ? "bg-primary/10 border-primary text-primary font-medium"
                              : "bg-[#141414] border-white/5 text-muted-foreground hover:bg-[#1a1a1a]"
                          }`}
                        >
                          <span>{item.label}</span>
                          {formData.painPoint === item.value && <Check size={12} className="text-primary flex-shrink-0 ml-1.5" />}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Step 2 explainer — real scheduling happens on the Google calendar */}
                  <div className="space-y-2 pt-3 border-t border-white/5">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                      <Clock size={14} className="text-primary" />
                      2. Pick your time
                    </h3>
                    <div className="flex items-start gap-3 p-3.5 rounded-lg bg-primary/[0.04] border border-primary/15">
                      <Calendar size={14} className="text-primary shrink-0 mt-0.5" />
                      <p className="text-[11px] text-muted-foreground/90 font-light leading-relaxed">
                        After you submit, we&rsquo;ll take you straight to our live calendar to choose a <span className="text-primary font-medium">20-minute</span> slot that suits you. You&rsquo;ll get an instant confirmation with the meeting link.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary text-primary-foreground font-black py-4 rounded-xl text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(10,224,0,0.45)] transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    <Send size={12} fill="currentColor" />
                    Continue to Calendar
                  </button>
                  <p className="text-[10px] text-muted-foreground/50 text-center mt-2.5 font-light">
                    No spam. We only use your details to prepare and confirm your demo call.
                  </p>
                </div>
              </form>
            ) : (
              /* Success state — accurate about what actually happens next */
              <div
                className="glass-panel p-8 rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/[0.03] to-transparent text-center space-y-6 flex flex-col items-center justify-center h-full min-h-[450px] animate-fade-in"
                id="booking-success-receipt"
              >
                <div className="p-4 bg-primary/20 border border-primary/30 rounded-full text-primary scale-110">
                  <CheckCircle2 size={36} />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-primary tracking-[0.25em] uppercase bg-primary/10 px-3 py-1 rounded-full">
                    DETAILS RECEIVED
                  </span>

                  <h3 className="text-xl lg:text-2xl font-black text-foreground uppercase tracking-tight pt-2">
                    One last step, {formData.name.split(" ")[0]}
                  </h3>

                  <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed font-light">
                    We&rsquo;re taking you to our calendar now so you can pick a time. If it doesn&rsquo;t open automatically, use the button below.
                  </p>
                </div>

                {/* Summary of what they sent us */}
                <div className="bg-[#0f0f0f]/80 border border-white/5 rounded-xl p-4 w-full max-w-sm space-y-2.5 font-mono text-left text-[11px] text-muted-foreground">
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-foreground uppercase font-bold text-[10px]">YOUR DETAILS</span>
                    <span className="text-primary font-black">20 MIN CALL</span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span>Contact:</span>
                    <span className="text-foreground font-sans font-light text-right">{formData.name}</span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span>Email:</span>
                    <span className="text-foreground font-sans font-light text-right break-all">{formData.email}</span>
                  </div>

                  <div className="flex justify-between gap-3">
                    <span>Phone:</span>
                    <span className="text-foreground font-sans font-light text-right">{formData.phone}</span>
                  </div>

                  {formData.businessName && (
                    <div className="flex justify-between gap-3">
                      <span>Company:</span>
                      <span className="text-foreground font-sans font-light text-right">{formData.businessName}</span>
                    </div>
                  )}

                  <div className="flex justify-between gap-3">
                    <span>Focus:</span>
                    <span className="text-primary font-sans font-medium text-right">{CONCERN_LABELS[formData.painPoint]}</span>
                  </div>
                </div>

                {/* Manual fallback in case the auto-redirect is blocked */}
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full max-w-sm bg-primary text-primary-foreground font-black py-4 rounded-xl text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(10,224,0,0.45)] transition-all flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  <span>Choose Your Time Slot</span>
                  <ArrowRight size={13} />
                </a>

                {saveFailed && (
                  <div className="flex items-start gap-2 text-left max-w-sm">
                    <AlertCircle size={13} className="text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-amber-400/80 leading-normal font-light">
                      We had trouble saving your details, but you can still book &mdash; just use the button above and we&rsquo;ll collect everything on the call.
                    </p>
                  </div>
                )}

                <button
                  onClick={() => { setIsSubmitted(false); setSaveFailed(false); }}
                  className="text-xs font-bold text-primary hover:text-white uppercase tracking-wider font-mono transition-transform active:scale-95 cursor-pointer"
                >
                  &larr; Edit my details
                </button>
              </div>
            )}
          </div>

          {/* Side stats / support cards */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 text-left" id="contact-details-side">

            <div className="glass-panel p-5 sm:p-6 rounded-2xl border border-white/5 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary font-mono flex items-center gap-1.5">
                <Sparkles size={13} className="animate-spin" />
                HOW WE CUSTOM-PREPARE
              </h4>

              <div className="space-y-4 text-xs font-light text-muted-foreground leading-relaxed font-sans">
                <div>
                  <h5 className="font-bold text-foreground mb-1">1. Business Knowledge Mapping</h5>
                  <p className="text-[11px]">
                    Once submitted, our team analyzes your operational guidelines, business hours, pricing rules, calendar constraints, and FAQs.
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-foreground mb-1">2. Bespoke Voice Training</h5>
                  <p className="text-[11px]">
                    We map this structured knowledge directly code-level as memory buffers, fine-tuning your agent&rsquo;s sound model to be incredibly natural and on-brand.
                  </p>
                </div>

                <div>
                  <h5 className="font-bold text-foreground mb-1">3. Immediate Integration &amp; Testing</h5>
                  <p className="text-[11px]">
                    We sync the voice agent to your calendars, configure your call forwarding triggers, and prepare a custom live demo call for your first-hand testing.
                  </p>
                </div>
              </div>
            </div>

            {/* Micro FAQ box */}
            <div className="bg-[#101010]/60 border border-white/5 rounded-2xl p-6 space-y-3">
              <span className="text-[9px] font-bold text-muted-foreground tracking-widest font-mono uppercase block">
                COMPATIBILITY MATRIX
              </span>
              <p className="text-xs font-bold text-foreground uppercase tracking-tight">
                Works With Your Existing Calendars.
              </p>
              <p className="text-[11px] text-muted-foreground leading-relaxed font-light">
                No expensive modifications required. Our agents sit directly on top of your current appointment booking systems, routing complex or personal escalations straight back to standard staff members whenever needed.
              </p>
            </div>

            {/* Location info */}
            <div className="text-[10px] text-muted-foreground/55 font-mono space-y-1.5 py-1">
              <p>NO SHOW KILLER AI &bull; COLUMBUS OFFICE</p>
              <p>SUPPORT: ONBOARDING@NOSHOWKILLERAI.COM</p>
              <p className="flex items-center gap-1.5 pt-1">
                <Facebook size={12} className="text-primary" />
                <a
                  href="https://www.facebook.com/profile.php?id=61585860255283"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors hover:underline uppercase font-bold tracking-wider"
                >
                  Connect on Facebook
                </a>
              </p>
            </div>

          </div>

        </div>

        {/* Global Footer Credits inside contacts */}
        <div className="pt-12 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[10px] text-muted-foreground/40 gap-4" id="contacts-footer">
          <p>&copy; {currentYear} NO SHOW KILLER AI. All rights reserved. Configured for Columbus, OH.</p>
          <div className="flex flex-wrap gap-4 items-center justify-center font-mono font-bold tracking-widest uppercase">
            <span className="hover:text-primary cursor-default">Security Protocol</span>
            <span>&bull;</span>
            <span className="hover:text-primary cursor-default">Privacy Handshake</span>
            <span>&bull;</span>
            <a
              href="https://www.facebook.com/profile.php?id=61585860255283"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors flex items-center gap-1.5 text-[10px] text-muted-foreground/60 hover:text-primary uppercase"
            >
              <Facebook size={11} className="text-primary" />
              <span>Facebook</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
