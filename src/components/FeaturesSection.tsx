import React from "react";
import { Mic, Calendar, ShieldAlert, LineChart, Sparkles, Check, ChevronRight } from "lucide-react";

interface FeatureCardProps {
  key?: string;
  number: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  bullets: string[];
  metrics: string;
}

function FeatureCard({ number, title, icon, description, bullets, metrics }: FeatureCardProps) {
  return (
    <div 
      className="glass-panel p-5 sm:p-6 lg:p-8 rounded-2xl glass-card-hover flex flex-col justify-between relative group overflow-hidden border-t border-white/5"
      id={`feature-card-${number.replace("/", "").trim()}`}
    >
      {/* Absolute top right accent block */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full group-hover:bg-primary/10 transition-colors pointer-events-none" />

      <div>
        {/* Number & Icon Row */}
        <div className="flex items-center justify-between mb-6">
          <span className="text-2xl font-mono font-black text-primary/40 group-hover:text-primary transition-colors">
            {number}
          </span>
          <div className="p-3 bg-white/5 group-hover:bg-primary/10 border border-white/10 group-hover:border-primary/20 rounded-xl transition-all duration-350">
            {icon}
          </div>
        </div>

        {/* Title & Description */}
        <h3 className="text-lg lg:text-xl font-bold text-foreground mb-3 tracking-tight group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground/80 font-light leading-relaxed mb-6">
          {description}
        </p>

        {/* Feature bullets list */}
        <ul className="space-y-2.5 mb-6 text-xs text-foreground/80">
          {bullets.map((bullet, idx) => (
            <li key={idx} className="flex items-center gap-2.5 font-light" id={`bullet-${idx}`}>
              <div className="w-4 h-4 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary flex-shrink-0">
                <Check size={9} strokeWidth={3} />
              </div>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Feature metric footer */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
        <span className="text-[10px] text-muted-foreground/60 tracking-wider uppercase font-mono">
          EFFICACY INDICATOR
        </span>
        <span className="text-xs font-mono font-semibold text-primary">{metrics}</span>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const coreFeatures = [
    {
      number: "/ 01",
      title: "24/7 AI Voice Reception",
      icon: <Mic size={20} className="text-primary" />,
      description: "Answers every call instantly 24/7/365. Handles questions, qualifies leads, and prevents high-value clients from going to voicemail or calling competitors.",
      bullets: [
        "Never miss a call or voicemail again",
        "Sounds natural and 100% on-brand",
        "Captures after-hour & weekend leads",
        "Complex calls route to humans if needed"
      ],
      metrics: "100% ANSWERS"
    },
    {
      number: "/ 02",
      title: "Instant Booking On Call",
      icon: <Calendar size={20} className="text-primary" />,
      description: "Intelligently qualifies the caller dynamically and registers their appointment straight into your calendar during the conversation.",
      bullets: [
        "Works with existing calendar/mgt tools",
        "Zero triple-booking errors",
        "Intelligent routing & booking rules",
        "Immediate diary locking"
      ],
      metrics: "ZERO MANUAL DATA"
    },
    {
      number: "/ 03",
      title: "Automated Reminders",
      icon: <ShieldAlert size={20} className="text-primary" />,
      description: "Fires automated reminder sequences and confirmations that decimate no-shows, keeping your clinics and offices serving at full capacity.",
      bullets: [
        "Instant SMS confirmation dispatches",
        "No-show follow-up & rescue loops",
        "Self-serve rescheduling prompts",
        "Ensures appointment compliance"
      ],
      metrics: "-92% NO-SHOW RATIO"
    },
    {
      number: "/ 04",
      title: "Live ROI Dashboard",
      icon: <LineChart size={20} className="text-primary" />,
      description: "Monitor live calls, listen to recordings, read transcripts, gauge sentiment, and watch the exact dollar revenue recovered.",
      bullets: [
        "Complete call records & transcripts",
        "Live in-progress call viewer",
        "Revenue-recovered coin counter",
        "Caller sentiment & FAQ tracking"
      ],
      metrics: "PROVEN DOLLAR ROI"
    }
  ];

  return (
    <section 
      className="relative py-20 sm:py-24 px-4 sm:px-8 lg:px-16 bg-[#0a0a0a]"
      id="services"
    >
      {/* Decorative top border line */}
      <div className="absolute top-0 left-16 right-16 h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />

      <div className="max-w-7xl mx-auto space-y-16" id="features-container">
        
        {/* Header Introduction block */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end" id="features-header-block">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-[10px] font-bold text-primary tracking-[0.3em] uppercase font-mono">
                ENGINEERED OUTCOMES
              </span>
            </div>
            
            <h2 className="text-3xl lg:text-5xl font-black tracking-tight text-foreground uppercase">
              The 4-Pillar Autonomous <br className="hidden sm:inline" />
              <span className="text-primary font-sans">Front Desk</span>
            </h2>
          </div>
          
          <div className="lg:col-span-5 text-left lg:text-right">
            <p className="text-xs lg:text-sm text-muted-foreground/80 font-light max-w-md lg:ml-auto leading-relaxed">
              We design and configure individual AI receptionists built to function perfectly for your specific service operations. It answers, sells, maps, updates, and persists automatically.
            </p>
          </div>
        </div>

        {/* Feature Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6" id="features-interactive-grid">
          {coreFeatures.map((feat) => (
            <FeatureCard
              key={feat.number}
              number={feat.number}
              title={feat.title}
              icon={feat.icon}
              description={feat.description}
              bullets={feat.bullets}
              metrics={feat.metrics}
            />
          ))}
        </div>

        {/* Dynamic call-to-action bar */}
        <div 
          className="rounded-2xl p-5 sm:p-6 lg:p-8 bg-gradient-to-r from-primary/5 via-primary/10 to-transparent border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6"
          id="feature-roi-promotion-bar"
        >
          <div className="flex items-start gap-4">
            <div className="p-3 bg-primary/10 border border-primary/20 rounded-xl text-primary flex-shrink-0 animate-bounce">
              <Sparkles size={16} />
            </div>
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-foreground uppercase tracking-wider">
                Ready to banish lost bookings forever?
              </h4>
              <p className="text-xs text-muted-foreground/80 font-light max-w-xl">
                Every single call your team misses is a direct injection of revenue to your competitors. Stop leaving money on the table.
              </p>
            </div>
          </div>
          
          <button 
            onClick={() => {
              const contactsEl = document.getElementById("contacts");
              if (contactsEl) contactsEl.scrollIntoView({ behavior: "smooth" });
            }}
            className="w-full md:w-auto bg-primary text-primary-foreground font-black px-6 py-3.5 rounded-lg text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(10,224,0,0.4)] active:scale-95 transition-all text-center cursor-pointer"
          >
            Deploy Your Agent
          </button>
        </div>

      </div>
    </section>
  );
}
