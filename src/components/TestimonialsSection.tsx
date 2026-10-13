import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Sparkles, CheckCircle, Quote } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  videoUrl: string;
  avatarColor: string;
}

export default function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState<string>("client1");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const testimonials: Testimonial[] = [
    {
      id: "client1",
      name: "Chiropractic Clinic",
      role: "Clinic Owner",
      company: "Chiropractic Care",
      quote: "Missed appointments meant empty slots and lost revenue. No Show Killer fixed that for us. Fewer no-shows, a fuller schedule, and way less time chasing confirmations. If you're dealing with this, it's worth checking out.",
      avatarColor: "bg-emerald-500",
      videoUrl: "/videos/testimonial-1.mp4"
    },
    {
      id: "client2",
      name: "Roofing Company",
      role: "Owner & Founder",
      company: "Roofing & Exteriors",
      quote: "We were losing jobs to missed calls and wasted trips on no-shows. No Show Killer answers 24/7, qualifies leads, and books estimates straight into our calendar. Tighter routes, more closed jobs, way less wasted time.",
      avatarColor: "bg-orange-500",
      videoUrl: "/videos/testimonial-2.mp4"
    },
    {
      id: "client3",
      name: "Beauty Salon",
      role: "Salon Owner",
      company: "Beauty & Spa",
      quote: "After-hours booking requests used to slip through the cracks. No Show Killer captures every call, books clients instantly, and sends reminders that actually cut our no-shows. Our chairs stay full and the front desk finally gets a break.",
      avatarColor: "bg-pink-500",
      videoUrl: "/videos/testimonial-3.mp4"
    },
    {
      id: "client4",
      name: "Hair Salon",
      role: "Salon Manager",
      company: "Hair & Styling",
      quote: "Our phone rang nonstop while we had clients in the chair, so calls went unanswered and bookings walked out the door. No Show Killer picks up every time, books the appointment, and confirms it — without pulling my stylists away from their work. Our calendar fills itself now.",
      avatarColor: "bg-violet-500",
      videoUrl: "/videos/testimonial-4.mp4"
    },
    {
      id: "client5",
      name: "Barbershop",
      role: "Shop Owner",
      company: "Barber & Grooming",
      quote: "Saturdays were chaos — walk-ins, missed calls, and no-shows eating into a fully booked day. No Show Killer answers every call, locks in the slot, and sends reminders that actually stick. My chairs stay full and I'm not glued to the phone between cuts.",
      avatarColor: "bg-blue-500",
      videoUrl: "/videos/testimonial-5.mp4"
    }
  ];

  const currentData = testimonials.find(t => t.id === activeTestimonial) || testimonials[0];

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(err => console.log("Video play interrupted:", err));
      setIsPlaying(true);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTimelineClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!videoRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percentage = (e.clientX - rect.left) / rect.width;
    videoRef.current.currentTime = percentage * videoRef.current.duration;
  };

  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      videoRef.current.load();
    }
  }, [activeTestimonial]);

  return (
    <section className="relative py-24 sm:py-32 bg-hero-bg overflow-hidden border-t border-white/5" id="testimonials">
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="testimonials-container">

        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4" id="testimonials-header">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.2em]">
            <Sparkles size={12} className="animate-pulse" />
            <span>Operational Proof</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-foreground">
            Wall of Success
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground/80 font-light leading-relaxed">
            See how high-intent local businesses use customized AI voice reception to capture after-hours pipeline, optimize their teams, and eradicate missed appointments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch" id="testimonials-grid">

          <div className="lg:col-span-7 flex flex-col justify-between" id="video-player-column">
            {/* Portrait-friendly player: shows the WHOLE vertical video, centered, with soft side bars */}
            <div className="relative w-full h-[560px] sm:h-[620px] rounded-2xl overflow-hidden bg-black border border-white/10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] flex flex-col justify-between group">
              <video
                ref={videoRef}
                className="absolute inset-0 w-full h-full object-contain bg-black"
                src={currentData.videoUrl}
                onTimeUpdate={handleTimeUpdate}
                onDurationChange={() => videoRef.current && setDuration(videoRef.current.duration)}
                onEnded={() => setIsPlaying(false)}
                playsInline
                onClick={togglePlay}
              />

              <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/80 to-transparent p-4 sm:p-6 flex items-center justify-between pointer-events-none z-10">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-primary font-bold tracking-widest uppercase">
                    {currentData.company}
                  </span>
                  <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight">
                    {currentData.name} &bull; {currentData.role}
                  </h4>
                </div>
                <div className="px-2.5 py-1 rounded bg-black/60 border border-primary/20 text-primary text-[9px] font-mono uppercase font-black flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  <span>Client Testimonial</span>
                </div>
              </div>

              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-all pointer-events-none z-10">
                  <button
                    onClick={togglePlay}
                    className="pointer-events-auto w-16 h-16 sm:w-20 sm:h-20 bg-primary hover:bg-white text-black rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
                    title="Play Testimonial"
                  >
                    <Play size={28} className="translate-x-0.5 text-black" fill="currentColor" />
                  </button>
                </div>
              )}

              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 flex flex-col gap-3 z-10">
                <div
                  className="w-full h-1 bg-white/10 rounded-full overflow-hidden cursor-pointer relative hover:h-1.5 transition-all"
                  onClick={handleTimelineClick}
                >
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-75 relative"
                    style={{ width: `${progress}%` }}
                  >
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button onClick={togglePlay} className="text-white hover:text-primary transition-colors cursor-pointer">
                      {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                    </button>
                    <button onClick={toggleMute} className="text-white hover:text-primary transition-colors cursor-pointer">
                      {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                    </button>
                    <span className="text-[10px] text-muted-foreground/80 font-mono tracking-widest uppercase">
                      {videoRef.current ? `${Math.floor(videoRef.current.currentTime)}s / ${Math.floor(duration || 0)}s` : "0s / 0s"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5 relative overflow-hidden" id="testimonial-quote-box">
              <Quote className="absolute right-6 top-6 text-primary/10 w-16 h-16 pointer-events-none" />
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl ${currentData.avatarColor} shrink-0 flex items-center justify-center font-bold text-black text-sm uppercase shadow-lg`}>
                  {currentData.name[0]}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <h5 className="font-bold text-sm text-foreground uppercase tracking-tight">{currentData.name}</h5>
                    <span className="text-muted-foreground/40 text-[11px]">&bull;</span>
                    <span className="text-muted-foreground/70 text-[11px] font-mono">{currentData.company}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-foreground/90 font-light leading-relaxed italic pr-8">
                    &ldquo;{currentData.quote}&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between gap-6" id="testimonial-tabs-column">
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-bold text-muted-foreground/50 tracking-widest uppercase">
                Select Client Profile
              </span>

              <div className="space-y-3" id="testimonial-navigation-stack">
                {testimonials.map((t) => {
                  const isActive = t.id === activeTestimonial;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setActiveTestimonial(t.id)}
                      className={`w-full text-left p-4 sm:p-5 rounded-2xl border transition-all duration-300 relative group flex items-start gap-4 cursor-pointer overflow-hidden ${
                        isActive
                          ? "bg-primary/[0.03] border-primary/40 shadow-[0_10px_20px_rgba(10,224,0,0.02)]"
                          : "bg-white/[0.01] border-white/5 hover:bg-white/[0.03] hover:border-white/10"
                      }`}
                    >
                      {isActive && <div className="absolute left-0 inset-y-0 w-[3px] bg-primary rounded-r" />}

                      <div className={`w-9 h-9 rounded-xl ${t.avatarColor} shrink-0 flex items-center justify-center font-bold text-black text-xs uppercase shadow-md`}>
                        {t.name[0]}
                      </div>

                      <div className="space-y-1 relative z-10 w-full">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono text-muted-foreground/60 group-hover:text-primary transition-colors">
                            {t.company}
                          </span>
                          <span className="text-[8px] font-mono bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider shrink-0 flex items-center gap-1">
                            <CheckCircle size={8} /> Playable
                          </span>
                        </div>

                        <h4 className={`text-xs sm:text-sm font-bold uppercase transition-colors ${isActive ? "text-primary" : "text-foreground group-hover:text-primary"}`}>
                          {t.name}
                        </h4>

                        <p className="text-[10px] sm:text-xs text-muted-foreground/75 leading-relaxed font-light line-clamp-2 pr-4">
                          {t.quote}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5 relative overflow-hidden" id="testimonial-stats-callout">
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5 justify-between">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-mono font-black text-primary">98.4%</div>
                  <h6 className="text-[10px] font-mono text-muted-foreground/75 uppercase tracking-widest font-bold">
                    Booking Retention Rate
                  </h6>
                  <p className="text-[10px] text-muted-foreground/50 max-w-[240px] font-light leading-relaxed">
                    Eradicating gaps caused by double-booking, late rescheduling, and silent voicemails.
                  </p>
                </div>

                <div className="h-[1px] w-full sm:h-12 sm:w-[1px] bg-white/10" />

                <div className="space-y-1 text-center sm:text-right">
                  <div className="text-2xl sm:text-3xl font-mono font-black text-primary">-85%</div>
                  <h6 className="text-[10px] font-mono text-muted-foreground/75 uppercase tracking-widest font-bold">
                    No-Show Incident Rate
                  </h6>
                  <p className="text-[10px] text-muted-foreground/50 max-w-[240px] font-light leading-relaxed">
                    Ensured by precise qualifying conversational handshakes and immediate text automation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
