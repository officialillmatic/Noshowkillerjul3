import React, { useEffect, useRef, useState } from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import Reveal from "./Reveal";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  videoUrl: string;
}

const TESTIMONIALS: Testimonial[] = [
  { id: "client1", name: "Chiropractic clinic", role: "Clinic owner", quote: "Missed appointments meant empty slots and lost revenue. No Show Killer fixed that for us. Fewer no-shows, a fuller schedule, and way less time chasing confirmations. If you're dealing with this, it's worth checking out.", videoUrl: "/videos/testimonial-1.mp4" },
  { id: "client2", name: "Roofing company", role: "Owner and founder", quote: "We were losing jobs to missed calls and wasted trips on no-shows. No Show Killer answers 24/7, qualifies leads, and books estimates straight into our calendar. Tighter routes, more closed jobs, way less wasted time.", videoUrl: "/videos/testimonial-2.mp4" },
  { id: "client3", name: "Beauty salon", role: "Salon owner", quote: "After-hours booking requests used to slip through the cracks. No Show Killer captures every call, books clients instantly, and sends reminders that actually cut our no-shows. Our chairs stay full and the front desk finally gets a break.", videoUrl: "/videos/testimonial-3.mp4" },
  { id: "client4", name: "Hair salon", role: "Salon manager", quote: "Our phone rang nonstop while we had clients in the chair, so calls went unanswered and bookings walked out the door. No Show Killer picks up every time, books the appointment, and confirms it without pulling my stylists away from their work. Our calendar fills itself now.", videoUrl: "/videos/testimonial-4.mp4" },
  { id: "client5", name: "Barbershop", role: "Shop owner", quote: "Saturdays were chaos: walk-ins, missed calls, and no-shows eating into a fully booked day. No Show Killer answers every call, locks in the slot, and sends reminders that actually stick. My chairs stay full and I'm not glued to the phone between cuts.", videoUrl: "/videos/testimonial-5.mp4" },
];

export default function TestimonialsSection() {
  const [activeId, setActiveId] = useState(TESTIMONIALS[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const current = TESTIMONIALS.find((t) => t.id === activeId) || TESTIMONIALS[0];

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (isPlaying) { v.pause(); setIsPlaying(false); }
    else { v.play().catch(() => undefined); setIsPlaying(true); }
  };
  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !isMuted;
    setIsMuted(!isMuted);
  };
  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - rect.left) / rect.width) * v.duration;
  };

  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    const v = videoRef.current;
    if (v) { v.pause(); v.currentTime = 0; v.load(); }
  }, [activeId]);

  return (
    <section className="relative overflow-hidden border-t border-line py-24 sm:py-32" id="results">
      <div className="pointer-events-none absolute left-0 top-1/4 h-[400px] w-[400px] rounded-full bg-neon/5 blur-[120px]" />
      <div className="wrap relative">
        <Reveal className="max-w-[40em]">
          <div className="kicker">Operational proof</div>
          <h2 className="display mt-4 text-[clamp(1.9rem,3.6vw,3rem)] uppercase text-white">Owners who stopped <span className="text-neon">chasing confirmations</span></h2>
          <p className="prose-muted mt-4 text-[1.05rem]">In their own words, on video.</p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-start">
          <Reveal className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl border border-line bg-panel shadow-[0_30px_80px_-30px_rgba(0,0,0,.8)]" id="testimonial-player">
              <video
                ref={videoRef}
                key={current.id}
                className="aspect-[4/5] w-full object-cover"
                playsInline
                preload="metadata"
                onTimeUpdate={() => { const v = videoRef.current; if (v && v.duration) setProgress((v.currentTime / v.duration) * 100); }}
                onEnded={() => setIsPlaying(false)}
              >
                <source src={current.videoUrl} type="video/mp4" />
              </video>

              {!isPlaying && (
                <button type="button" onClick={togglePlay} className="absolute inset-0 grid place-items-center bg-black/35 transition-colors hover:bg-black/25" aria-label={`Play testimonial from ${current.name}`}>
                  <span className="grid h-16 w-16 place-items-center rounded-full bg-neon text-neon-ink shadow-[0_0_30px_rgba(10,224,0,0.45)] transition-transform hover:scale-105"><Play size={24} fill="currentColor" className="ml-1" /></span>
                </button>
              )}

              <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 bg-gradient-to-t from-black/90 to-transparent px-4 pb-4 pt-10">
                <button type="button" onClick={togglePlay} className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label={isPlaying ? "Pause" : "Play"}>
                  {isPlaying ? <Pause size={15} /> : <Play size={15} />}
                </button>
                <div className="h-1 flex-1 cursor-pointer rounded-full bg-white/20" onClick={seek} role="progressbar" aria-valuenow={Math.round(progress)} aria-valuemin={0} aria-valuemax={100}>
                  <div className="h-full rounded-full bg-neon" style={{ width: `${progress}%` }} />
                </div>
                <button type="button" onClick={toggleMute} className="grid h-9 w-9 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label={isMuted ? "Unmute" : "Mute"}>
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </button>
              </div>
            </div>
            <p className="mt-3 text-[0.62rem] font-bold uppercase tracking-[0.2em] text-faint">{current.name} · {current.role}</p>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <ul className="divide-y divide-line border-y border-line" aria-label="Client testimonials">
              {TESTIMONIALS.map((t) => {
                const active = t.id === activeId;
                return (
                  <li key={t.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(t.id)}
                      aria-pressed={active}
                      className={`grid w-full gap-1 px-2 py-5 text-left transition-colors sm:grid-cols-[11rem_1fr] sm:gap-6 ${active ? "bg-neon/[0.04]" : "hover:bg-white/[0.03]"}`}
                    >
                      <span className={`text-[0.9rem] font-semibold ${active ? "text-neon" : "text-white"}`}>{t.name}<span className="block text-[0.75rem] font-normal text-faint">{t.role}</span></span>
                      <span className={`text-[0.95rem] leading-relaxed ${active ? "text-white" : "text-muted line-clamp-2"}`}>“{t.quote}”</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <dl className="mt-8 grid grid-cols-2 gap-6">
              <div>
                <dt className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-faint">Clients who stay</dt>
                <dd className="display-num mt-1 text-[2.2rem] text-white">98.4%</dd>
              </div>
              <div>
                <dt className="text-[0.62rem] font-bold uppercase tracking-[0.2em] text-faint">Fewer no-shows</dt>
                <dd className="display-num mt-1 text-[2.2rem] text-neon">−85%</dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
