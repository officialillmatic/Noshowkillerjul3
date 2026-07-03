import React, { useState } from "react";
import { 
  Cpu, 
  PhoneCall, 
  LayoutDashboard, 
  Sparkles, 
  CheckCircle2, 
  ChevronRight,
  Stethoscope,
  Heart,
  Scale,
  Wrench,
  Car,
  Building2,
  TrendingUp,
  AlertCircle
} from "lucide-react";

export default function AboutSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const steps = [
    {
      index: "01",
      title: "Build & Train",
      icon: <Cpu size={18} className="text-primary" />,
      tagline: "Natural & Custom Trained",
      description: "We build and train your dedicated AI voice agent on your services, hours, pricing, booking rules, and FAQs. It sounds natural and remains absolutely safe and on-brand."
    },
    {
      index: "02",
      title: "Answer & Book 24/7",
      icon: <PhoneCall size={18} className="text-primary" />,
      tagline: "Automated Reminders",
      description: "The agent answers every call 24/7, qualifies the caller, books appointments directly into your business calendar, and fires automated SMS reminders to kill no-shows."
    },
    {
      index: "03",
      title: "Track Dashboard ROI",
      icon: <LayoutDashboard size={18} className="text-primary" />,
      tagline: "Total Operational Oversight",
      description: "Log into your premium branded dashboard to see every active call, full call audio recordings, complete text transcripts, conversation sentiment, and calculated revenue recovered."
    }
  ];

  const industries = [
    {
      id: "health",
      name: "Dental & Medical",
      subtitle: "Dental offices, clinics & chiropractors",
      icon: <Stethoscope size={22} className="text-primary" />,
      badge: "High Patient Value",
      lossStats: "24% of calls go to voicemail",
      recoveryValue: "Immediate booking of urgent treatments & routine followups, reducing slot gaps.",
      metric: "Av. Appointment: $350+"
    },
    {
      id: "wellness",
      name: "Med Spas & Salons",
      subtitle: "Estheticians, spas & beauty experts",
      icon: <Heart size={22} className="text-primary" />,
      badge: "Hot Leads Intake",
      lossStats: "No receptionist on weekends",
      recoveryValue: "Capturing high-ticket cosmetic packages while consumer interest is freshly hot.",
      metric: "Av. Package: $600+"
    },
    {
      id: "professional",
      name: "Law & Consultation",
      subtitle: "Attorneys, law firms & legal partners",
      icon: <Scale size={22} className="text-primary" />,
      badge: "Qualified Intake",
      lossStats: "Unanswered calls go to next firm",
      recoveryValue: "Qualifies potential case details instantly, booking consultation fees securely.",
      metric: "Av. Case Intake: $1,500+"
    },
    {
      id: "services",
      name: "Home Services",
      subtitle: "HVAC, plumbing, roofing & electrical",
      icon: <Wrench size={22} className="text-primary" />,
      badge: "Immediate Dispatch",
      lossStats: "Leads dial competitors on busy tone",
      recoveryValue: "Immediate 24/7 quote qualification and dispatch schedules straight to technician calendar.",
      metric: "Av. Ticket: $450+"
    },
    {
      id: "auto",
      name: "Automotive Workshops",
      subtitle: "Repairs, auto care & tuning",
      icon: <Car size={22} className="text-primary" />,
      badge: "Live Calendar Locking",
      lossStats: "Noisy shop floors lead to missed calls",
      recoveryValue: "Locks down mechanic bay intervals on call, ensuring mechanics never stop physical work.",
      metric: "Av. Repair: $500+"
    },
    {
      id: "realestate",
      name: "Real Estate Agencies",
      subtitle: "Residential, commercial & brokers",
      icon: <Building2 size={22} className="text-primary" />,
      badge: "Red-Hot Lead Capture",
      lossStats: "Answering delayed over 1 hour fails",
      recoveryValue: "Instantly captures and validates buyer interest from yard signs, scheduling viewing times.",
      metric: "Av. Commission: $4,000+"
    }
  ];

  const filteredIndustries = activeCategory === "all" 
    ? industries 
    : industries.filter(ind => ind.id === activeCategory);



  return (
    <section 
      className="relative py-20 sm:py-24 px-4 sm:px-8 lg:px-16 bg-[#080808]"
      id="about"
    >
      <div className="max-w-7xl mx-auto space-y-20" id="about-container">
        
        {/* Intro Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" id="about-header-grid">
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[10px] font-bold text-primary tracking-[0.3em] uppercase font-mono">
                HOW IT WORKS
              </span>
            </div>
            
            <h2 className="text-3xl lg:text-5xl font-extrabold tracking-tight text-foreground uppercase leading-tight">
              We Don't Just Sell Software.<br className="hidden md:inline" />
              <span className="text-primary font-sans">We Run Your Front Office.</span>
            </h2>
          </div>

          <div className="lg:col-span-6 space-y-4 text-muted-foreground text-sm font-light max-w-xl leading-relaxed">
            <p>
              Missed phone calls are a silent cash drain. Staff are busy, lines are clogged, or callers dial after-hours—with 25% of absolute call traffic going completely unanswered.
            </p>
            <p>
              Instead of clunky setup tools, **No Show Killer AI** deploys an autonomous AI voice receptionist customized directly to your business procedures. We build, host, and fine-tune everything.
            </p>
          </div>
        </div>

        {/* Steps Architecture Timeline (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" id="about-steps-row">
          {steps.map((step, idx) => (
            <div 
              key={step.index} 
              className="relative p-6 sm:p-8 rounded-2xl border border-white/[0.03] bg-gradient-to-b from-white/[0.02] to-transparent hover:border-white/10 transition-all group flex flex-col justify-between h-auto min-h-[17.5rem]"
              id={`step-${step.index}`}
            >
              <div>
                {/* Header Info */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary">
                      {step.icon}
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground/60 tracking-wider font-mono">
                      STEP {step.index}
                    </span>
                  </div>
                  
                  <span className="text-xs font-mono font-bold text-primary/30 group-hover:text-primary transition-colors">
                    0{idx + 1}
                  </span>
                </div>

                {/* Body Details */}
                <h3 className="text-lg font-bold text-foreground mb-1.5 tracking-tight group-hover:text-primary transition-colors">
                  {step.title}
                </h3>
                <p className="text-[10px] text-primary tracking-widest font-mono font-medium uppercase mb-3">
                  {step.tagline}
                </p>
                <p className="text-xs text-muted-foreground/80 leading-relaxed font-light">
                  {step.description}
                </p>
              </div>

              {/* Status pointer */}
              <div className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground/45 mt-6 border-t border-white/5 pt-4">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-ping" />
                <span>Fully managed setup</span>
              </div>
            </div>
          ))}
        </div>

        {/* Brand Promise Callout Panel */}
        <div 
          className="rounded-2xl glass-panel p-5 sm:p-8 lg:p-12 relative overflow-hidden flex flex-col lg:flex-row items-center gap-8 border border-white/5"
          id="brand-promise-callout"
        >
          {/* Back grid overlay for texture */}
          <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

          <div className="lg:max-w-2xl space-y-4">
            <h3 className="text-xs font-bold text-primary uppercase tracking-[0.3em] font-mono">
              LOST REVENUE RECOVERY
            </h3>
            <h4 className="text-2xl lg:text-3xl font-black text-foreground uppercase tracking-tight">
              A missed call is a client who simply dials your nearest competitor.
            </h4>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              When a buyer experiences immediate, smart voice reception on the line, their appointment is committed on the spot. No Show Killer AI answers within 100ms with natural dialogue, handles scheduling, syncs dates, and secures the revenue.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center space-y-2 w-full lg:w-auto lg:min-w-[240px]" id="stat-callout-box">
            <span className="text-[10px] font-mono font-bold text-muted-foreground tracking-widest uppercase">
              LOST CALL RECOVERY
            </span>
            <div className="text-5xl font-black text-primary font-mono tracking-tight" id="about-rate-stat">
              100%
            </div>
            <p className="text-[10px] text-muted-foreground/60 leading-normal font-light">
              Of calls answered, eliminating voicemails and restoring thousands in lost bookings.
            </p>
          </div>
        </div>

        {/* ULTRA-PREMIUM, HIGH-END TARGET INDUSTRIES SHOWCASE */}
        <div className="pt-10 overflow-hidden" id="enterprise-industries-showcase">
          
          {/* Exquisite header banner */}
          <div className="relative rounded-3xl overflow-hidden border border-white/5 bg-[#0b0b0b] p-6 sm:p-10 lg:p-12" id="elite-thin-banner">
            {/* Subtle luxury radiating glow effects */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/5 rounded-full blur-[90px] pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-80 h-80 bg-[#0ae000]/5 rounded-full blur-[110px] pointer-events-none" />
            
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_80%,transparent_100%)] pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-white/5">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-bold text-primary tracking-[0.25em] uppercase font-mono">
                    CHANNELS SECURED
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-extrabold uppercase text-foreground tracking-tight leading-none font-sans">
                  INTEGRATED VOICE AUTOPILOT
                </h3>
              </div>
              <p className="text-[11px] sm:text-xs text-muted-foreground font-light max-w-md leading-relaxed md:text-right">
                Powering high-intent phone bookings across specialized sectors. Missing calls is an unnecessary cost; our AI intercepts traffic, commits reservations, and locks calendar rows in real time.
              </p>
            </div>

            {/* Micro horizontal thin sliding ribbon inside the premium console container */}
            <div className="relative w-full pt-8 pb-6" id="sliding-marquee-outer">
              <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-[#0b0b0b] to-transparent z-10 pointer-events-none" />
              <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-[#0b0b0b] to-transparent z-10 pointer-events-none" />

              <div className="flex overflow-hidden relative">
                <div className="flex gap-4 shrink-0 animate-marquee whitespace-nowrap py-1">
                  {[...industries, ...industries, ...industries, ...industries].map((ind, i) => (
                    <div 
                      key={`l1-${ind.id}-${i}`}
                      className="inline-flex items-center gap-3 shrink-0 rounded-full px-5 py-3 bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-primary/30 transition-all duration-300 group"
                    >
                      <div className="text-primary group-hover:scale-110 transition-transform duration-300">
                        {ind.icon}
                      </div>

                      <div className="flex flex-col items-start leading-none gap-0.5">
                        <span className="text-[12px] font-bold text-foreground group-hover:text-primary transition-colors">
                          {ind.name}
                        </span>
                        <span className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-widest">
                          {ind.subtitle}
                        </span>
                      </div>

                      <div className="h-5 w-[1px] bg-white/10 mx-1" />

                      <span className="text-[10px] font-mono text-[#0ae000] bg-[#0ae000]/10 border border-[#0ae000]/20 px-2 py-0.5 rounded-full font-bold">
                        {ind.metric}
                      </span>
                      
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0ae000] animate-pulse shadow-[0_0_6px_#0ae000]" />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sleek dynamic subbar detailing immediate calendar platform synchronization */}
            <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-light text-muted-foreground">
              <div className="flex items-center gap-2">
                <Sparkles size={13} className="text-primary" />
                <span>Natively synchronized with Dentrix &bull; Mindbody &bull; ServiceTitan &bull; Clio Manage &bull; Acuity</span>
              </div>
              <a 
                href="https://cal.com/nicole-bejarano-u04dax/30min" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-white transition-colors font-mono text-[11px] font-bold uppercase tracking-wider flex items-center gap-1 group"
              >
                <span>Initialize custom voice stream</span>
                <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
              </a>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
