import React, { useState } from "react";
import { Sparkles, Check, Send, CheckCircle2, Calendar, Clock, Phone, Mail, Building, User, Facebook } from "lucide-react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    painPoint: "voicemails",
  });
  const [selectedDay, setSelectedDay] = useState("Jun 16");
  const [selectedTime, setSelectedTime] = useState("10:00 AM");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const timeSlots = ["09:00 AM", "10:30 AM", "01:00 PM", "02:30 PM", "04:00 PM"];
  const days = [
    { label: "Tue Jun 16", value: "Jun 16" },
    { label: "Wed Jun 17", value: "Jun 17" },
    { label: "Thu Jun 18", value: "Jun 18" },
    { label: "Fri Jun 19", value: "Jun 19" }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) return;

    setIsSubmitting(true);
    // Simulate API submission and business knowledge scraping
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1800);
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
            Fill out your business parameters and select an open consultation slot. Our engineers will scrape your website, prepare a customized voice model, and call you at your selected hour to demonstrate an instant booking live.
          </p>
        </div>

        {/* ELEGANT DIRECT CAL.COM BOOKING BANNER */}
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
                  Schedule Directly via Cal.com
                </h3>
                <p className="text-[11px] sm:text-xs text-muted-foreground/80 font-light max-w-lg leading-relaxed">
                  Skip the manual setup form. Book an immediate 30-minute consultation with Nicole Bejarano to configure, voice-train, and deploy your customized receptionist.
                </p>
              </div>
            </div>

            <a 
              href="https://cal.com/nicole-bejarano-u04dax/30min"
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
          
          {/* Form Pane (8 cols or 7 cols) */}
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
                        SCANNING BUSINESS SCHEMA...
                      </p>
                      <p className="text-[11px] text-muted-foreground font-light max-w-xs px-4 leading-normal">
                        Analyzing brand domain guidelines, parsing calendar endpoints, and compiling custom greeting prompts...
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

                  {/* Glass Interactive Calendar and hours */}
                  <div className="space-y-3 pt-3 border-t border-white/5">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-foreground flex items-center gap-2">
                      <Clock size={14} className="text-primary" />
                      2. Select Demo Time slot
                    </h3>

                    {/* Days select row */}
                    <div className="flex gap-1.5 overflow-x-auto pb-1" id="days-selection-row">
                      {days.map((day) => (
                        <div
                          key={day.value}
                          onClick={() => setSelectedDay(day.value)}
                          className={`px-3 py-2 rounded-lg border text-[10px] uppercase font-mono font-bold tracking-wider cursor-pointer transition-all whitespace-nowrap ${
                            selectedDay === day.value
                              ? "bg-primary text-primary-foreground border-primary"
                              : "bg-black/30 border-white/5 text-muted-foreground hover:bg-white/5"
                          }`}
                        >
                          {day.label}
                        </div>
                      ))}
                    </div>

                    {/* Times slots row */}
                    <div className="flex flex-wrap gap-1.5 pt-1" id="time-slots-row">
                      {timeSlots.map((slot) => (
                        <div
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`px-3 py-1.5 rounded-lg border text-[10px] font-mono cursor-pointer transition-all ${
                            selectedTime === slot
                              ? "bg-primary/20 border-primary text-primary font-semibold shadow-[0_0_10px_rgba(10,224,0,0.1)]"
                              : "bg-[#141414] border-white/5 text-muted-foreground hover:bg-white/5"
                          }`}
                        >
                          {slot}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full bg-primary text-primary-foreground font-black py-4 rounded-xl text-xs uppercase tracking-widest hover:shadow-[0_0_20px_rgba(10,224,0,0.45)] transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send size={12} fill="currentColor" />
                    Lock Demo Call ({selectedDay} @ {selectedTime})
                  </button>
                </div>
              </form>
            ) : (
              /* High loyalty green success receipt page */
              <div 
                className="glass-panel p-8 rounded-2xl border border-primary/20 bg-gradient-to-b from-primary/[0.03] to-transparent text-center space-y-6 flex flex-col items-center justify-center h-full min-h-[450px] animate-fade-in"
                id="booking-success-receipt"
              >
                <div className="p-4 bg-primary/20 border border-primary/30 rounded-full text-primary scale-110 animate-bounce">
                  <CheckCircle2 size={36} />
                </div>

                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-primary tracking-[0.25em] uppercase bg-primary/10 px-3 py-1 rounded-full">
                    DEMO SLAM DUNK &bull; LOCK SECURED
                  </span>
                  
                  <h3 className="text-xl lg:text-2xl font-black text-foreground uppercase tracking-tight">
                    Your Agent is in Training!
                  </h3>
                  
                  <p className="text-xs text-muted-foreground max-w-md mx-auto leading-relaxed font-light">
                    Hi **{formData.name}**! Our systems have registered your number **{formData.phone}**. We have initiated scraping procedures on any relevant digital endpoints for **{formData.businessName || "your business"}**.
                  </p>
                </div>

                {/* Receipt Grid showing exact slot */}
                <div className="bg-[#0f0f0f]/80 border border-white/5 rounded-xl p-4 w-full max-w-sm space-y-2.5 font-mono text-left text-[11px] text-muted-foreground">
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-foreground uppercase font-bold text-[10px]">SCHEDULE RECEIPT</span>
                    <span className="text-primary font-black">#NSK-{Math.floor(Math.random() * 9000) + 1000}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span>Contact:</span>
                    <span className="text-foreground font-sans font-light">{formData.name}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Phone:</span>
                    <span className="text-foreground font-sans font-light">{formData.phone}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Selected Date:</span>
                    <span className="text-foreground font-sans font-semibold">{selectedDay}, {currentYear}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Selected Hour:</span>
                    <span className="text-primary font-bold">{selectedTime} EST</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Status:</span>
                    <span className="text-emerald-400 bg-emerald-950/40 border border-emerald-500/10 px-1.5 rounded text-[9px] uppercase font-bold">Scraping Ingest</span>
                  </div>
                </div>

                <p className="text-[10px] text-muted-foreground/60 max-w-xs leading-normal italic font-light">
                  A verification link is on its way to {formData.email}. Our technician will call you live at your scheduled time. Be ready to converse with your reception agent!
                </p>

                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs font-bold text-primary hover:text-white uppercase tracking-wider font-mono transition-transform active:scale-95 cursor-pointer mt-1"
                >
                  &larr; Reschedule Appointment Slot
                </button>
              </div>
            )}
          </div>

          {/* Side stats / support cards (5 cols) */}
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
                    We map this structured knowledge directly code-level as memory buffers, fine-tuning your agent's sound model to be incredibly natural and on-brand.
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

            {/* Columbus Location info */}
            <div className="text-[10px] text-muted-foreground/55 font-mono space-y-1.5 py-1">
              <p>NO SHOW KILLER AI &bull; COLUMBUS OFFICE</p>
              <p>SUPPORT: AGENTS@NOSHOWKILLER.AI &bull; +1 (614) NSK-TRUE</p>
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
