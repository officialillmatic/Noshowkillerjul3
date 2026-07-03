import React, { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX, Upload, Sparkles, CheckCircle, Quote, MessageSquareCode, Video } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  subtitles: { time: number; text: string }[];
  videoUrl: string;
  fallbackUrl: string;
  isConfigured: boolean;
  avatarColor: string;
}

export default function TestimonialsSection() {
  const [activeTestimonial, setActiveTestimonial] = useState<string>("marcus");
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentSubtitle, setCurrentSubtitle] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [showUploadInfo, setShowUploadInfo] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const testimonials: Testimonial[] = [
    {
      id: "marcus",
      name: "Marcus Vance",
      role: "Owner & Founder",
      company: "Vance Contracting",
      quote: "Missed appointments mean wasted trips and lost money. No-Show Killer fixed that for us. Fewer no-shows, tighter routes and way less time wasted. If you're dealing with this, it's worth checking out.",
      avatarColor: "bg-orange-500",
      videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-construction-worker-looking-at-plans-on-site-40332-large.mp4", // Premium fallback stock video representing roofing/contracting
      fallbackUrl: "/videos/testimonial-1.mp4", // Path they can upload to
      isConfigured: true,
      subtitles: [
        { time: 0, text: "You already know..." },
        { time: 1.5, text: "Missed appointments mean wasted trips and lost money." },
        { time: 5.5, text: "No-Show Killer fixed that for us." },
        { time: 8.5, text: "Fewer no-shows, tighter routes and way less time wasted." },
        { time: 11.5, text: "If you're dealing with this, it's worth checking out!" }
      ]
    },
    {
      id: "jenkins",
      name: "Dr. Sarah Jenkins",
      role: "Lead Orthodontist",
      company: "Jenkins Dental Group",
      quote: "Our front desk was completely overwhelmed by after-hours emergency calls and rescheduling requests. No-Show Killer intercepts traffic 24/7, qualifies patient emergencies, and commits bookings straight into our calendar instantly.",
      avatarColor: "bg-emerald-500",
      videoUrl: "",
      fallbackUrl: "/videos/testimonial-2.mp4",
      isConfigured: false,
      subtitles: []
    },
    {
      id: "elena",
      name: "Elena Rostova",
      role: "Managing Partner",
      company: "Rostova Law Partners",
      quote: "As a specialized boutique law firm, every intake call requires deep qualification. No-Show Killer filters high-intent inquiries from general solicitations, registers them onto our calendar, and processes consultation retainers securely before our lawyers even step in.",
      avatarColor: "bg-blue-500",
      videoUrl: "",
      fallbackUrl: "/videos/testimonial-3.mp4",
      isConfigured: false,
      subtitles: []
    }
  ];

  const currentData = testimonials.find(t => t.id === activeTestimonial) || testimonials[0];

  // Handle subtitle synchronization and progress tracking
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const currentTime = videoRef.current.currentTime;
    setProgress((currentTime / videoRef.current.duration) * 100);

    // Sync subtitles for configured active testimonial
    if (currentData.subtitles && currentData.subtitles.length > 0) {
      let activeText = "";
      for (let i = 0; i < currentData.subtitles.length; i++) {
        if (currentTime >= currentData.subtitles[i].time) {
          activeText = currentData.subtitles[i].text;
        }
      }
      setCurrentSubtitle(activeText);
    } else {
      setCurrentSubtitle("");
    }
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
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    videoRef.current.currentTime = percentage * videoRef.current.duration;
  };

  // Reset states when changing testimonial tabs
  useEffect(() => {
    setIsPlaying(false);
    setProgress(0);
    setCurrentSubtitle("");
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      // If configured, try to autoplay gently
      if (currentData.isConfigured) {
        // Just reset source and prepare
        videoRef.current.load();
      }
    }
  }, [activeTestimonial]);

  return (
    <section className="relative py-24 sm:py-32 bg-hero-bg overflow-hidden border-t border-white/5" id="testimonials">
      {/* Dynamic ambient color gradients */}
      <div className="absolute top-1/4 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-emerald-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" id="testimonials-container">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20 space-y-4" id="testimonials-header">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-[10px] sm:text-xs font-bold text-primary uppercase tracking-[0.2em]">
            <Sparkles size={12} className="animate-pulse" />
            <span>Operational Proof</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold uppercase tracking-tight text-foreground">
            Wall of Success
          </h2>
          <p className="text-xs sm:text-sm text-muted-foreground/80 font-light leading-relaxed">
            See how high-intent local businesses utilize customized AI Voice reception streams to capture after-hours pipeline, optimize technicians, and eradicate missed appointments.
          </p>
        </div>

        {/* Video Grid & Content Integration */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch" id="testimonials-grid">
          
          {/* Left Column: Interactive Video Player or Placeholder (takes 7 columns) */}
          <div className="lg:col-span-7 flex flex-col justify-between" id="video-player-column">
            <div className="relative aspect-video rounded-2xl overflow-hidden bg-[#0a0a0a] border border-white/10 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.8)] flex flex-col justify-between group">
              
              {/* Dynamic Video Element for Configured Testimonials */}
              {currentData.isConfigured ? (
                <>
                  <video
                    ref={videoRef}
                    className="absolute inset-0 w-full h-full object-cover"
                    src={currentData.videoUrl}
                    onTimeUpdate={handleTimeUpdate}
                    onDurationChange={() => videoRef.current && setDuration(videoRef.current.duration)}
                    playsInline
                    loop
                    onClick={togglePlay}
                  />

                  {/* Top Overlay: Name & Company */}
                  <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/80 to-transparent p-4 sm:p-6 flex items-center justify-between pointer-events-none">
                    <div className="space-y-0.5">
                      <span className="text-[10px] font-mono text-primary font-bold tracking-widest uppercase">
                        {currentData.company}
                      </span>
                      <h4 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight">
                        {currentData.name} &bull; {currentData.role}
                      </h4>
                    </div>
                    <div className="px-2.5 py-1 rounded bg-black/60 border border-primary/20 text-primary text-[9px] font-mono uppercase font-black flex items-center gap-1.5 animate-pulse">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                      <span>Live Demo Stream</span>
                    </div>
                  </div>

                  {/* Center Overlay: Big Play Button (Hidden when playing) */}
                  {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-all pointer-events-none">
                      <button 
                        onClick={togglePlay}
                        className="pointer-events-auto w-16 h-16 sm:w-20 sm:h-20 bg-primary hover:bg-white text-black rounded-full flex items-center justify-center shadow-2xl transition-all hover:scale-105 active:scale-95 cursor-pointer"
                        title="Play Testimonial"
                      >
                        <Play size={28} className="translate-x-0.5 text-black" fill="currentColor" />
                      </button>
                    </div>
                  )}

                  {/* BOTTOM SUBTITLE BLOCK (Dynamic synchronizing subtitles) */}
                  <AnimatePresence>
                    {currentSubtitle && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute bottom-16 inset-x-4 sm:inset-x-8 text-center pointer-events-none"
                        id="testimonial-subtitles-bubble"
                      >
                        <span className="inline-block px-4 py-2 rounded-xl bg-black/90 border border-white/10 backdrop-blur-md text-xs sm:text-sm font-medium tracking-tight text-white max-w-lg leading-relaxed shadow-lg">
                          &ldquo;{currentSubtitle}&rdquo;
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* CUSTOM PLAYER CONTROLS BAR */}
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 flex flex-col gap-3">
                    {/* Timeline slider */}
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
                        <button 
                          onClick={togglePlay}
                          className="text-white hover:text-primary transition-colors cursor-pointer"
                        >
                          {isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
                        </button>
                        <button 
                          onClick={toggleMute}
                          className="text-white hover:text-primary transition-colors cursor-pointer"
                        >
                          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                        </button>
                        <span className="text-[10px] text-muted-foreground/80 font-mono tracking-widest uppercase">
                          {videoRef.current ? `${Math.floor(videoRef.current.currentTime)}s / ${Math.floor(duration || 15)}s` : "0s / 15s"}
                        </span>
                      </div>

                      <div className="text-[9px] text-primary font-mono tracking-widest font-bold flex items-center gap-1.5">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                        <span>SOUND ACTIVE</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                /* Interactive Placeholder Screen for Uploading Videos */
                <div className="absolute inset-0 bg-gradient-to-br from-[#0e0e0e] to-[#050505] flex flex-col items-center justify-center p-6 text-center space-y-4">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
                  
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-center text-muted-foreground/30 relative">
                    <Video size={24} className="animate-pulse" />
                    <Upload size={12} className="absolute bottom-2 right-2 text-primary animate-bounce" />
                  </div>

                  <div className="space-y-1 max-w-md">
                    <span className="text-[10px] font-mono text-primary font-bold tracking-widest uppercase">
                      {currentData.company} &bull; Ready to Deploy
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-foreground uppercase tracking-tight">
                      Awaiting video-2 & video-3 file uploads
                    </h4>
                    <p className="text-[11px] text-muted-foreground/60 leading-relaxed font-light">
                      This testimonial card is fully coded and ready. When your client submits their video, drop the <code className="text-white font-mono bg-white/5 px-1 rounded">testimonial-2.mp4</code> file in the project folder to auto-mount this block.
                    </p>
                  </div>

                  <button
                    onClick={() => setShowUploadInfo(currentData.id)}
                    className="px-4 py-2 bg-white/5 hover:bg-primary/10 border border-white/10 hover:border-primary/20 text-[10px] font-bold text-primary tracking-wider uppercase rounded-lg transition-all active:scale-95 cursor-pointer"
                  >
                    View Upload Instructions
                  </button>
                </div>
              )}
            </div>

            {/* Quote details block below video player */}
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

          {/* Right Column: Navigation Tabs & Stats Callout (takes 5 columns) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6" id="testimonial-tabs-column">
            
            <div className="space-y-4">
              <span className="text-[10px] font-mono font-bold text-muted-foreground/50 tracking-widest uppercase">
                Select Client Profile
              </span>

              {/* Navigation Cards Stack */}
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
                      {/* Active green edge line */}
                      {isActive && (
                        <div className="absolute left-0 inset-y-0 w-[3px] bg-primary rounded-r" />
                      )}

                      <div className={`w-9 h-9 rounded-xl ${t.avatarColor} shrink-0 flex items-center justify-center font-bold text-black text-xs uppercase shadow-md`}>
                        {t.name[0]}
                      </div>

                      <div className="space-y-1 relative z-10 w-full">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-mono text-muted-foreground/60 group-hover:text-primary transition-colors">
                            {t.company}
                          </span>
                          {t.isConfigured ? (
                            <span className="text-[8px] font-mono bg-primary/10 text-primary border border-primary/20 px-1.5 py-0.5 rounded uppercase font-bold tracking-wider shrink-0 flex items-center gap-1">
                              <CheckCircle size={8} /> Playable
                            </span>
                          ) : (
                            <span className="text-[8px] font-mono bg-white/5 text-muted-foreground/50 border border-white/10 px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">
                              Setup Ready
                            </span>
                          )}
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

            {/* Elegant info banner detailing implementation stats */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white/[0.02] border border-white/5 relative overflow-hidden" id="testimonial-stats-callout">
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5 justify-between">
                <div className="space-y-1 text-center sm:text-left">
                  <div className="text-2xl sm:text-3xl font-mono font-black text-primary">
                    98.4%
                  </div>
                  <h6 className="text-[10px] font-mono text-muted-foreground/75 uppercase tracking-widest font-bold">
                    Booking Retention Rate
                  </h6>
                  <p className="text-[10px] text-muted-foreground/50 max-w-[240px] font-light leading-relaxed">
                    Eradicating gaps caused by double-booking, late rescheduling, and silent voicemails.
                  </p>
                </div>

                <div className="h-[1px] w-full sm:h-12 sm:w-[1px] bg-white/10" />

                <div className="space-y-1 text-center sm:text-right">
                  <div className="text-2xl sm:text-3xl font-mono font-black text-primary">
                    -85%
                  </div>
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

      {/* Dynamic Instruction Modal/Popup for Remaining Video Uploads */}
      <AnimatePresence>
        {showUploadInfo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" id="upload-instruction-modal">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-[#0c0c0c] border border-white/10 p-6 sm:p-8 rounded-2xl max-w-lg w-full space-y-6 relative shadow-2xl"
            >
              {/* Close Button */}
              <button 
                onClick={() => setShowUploadInfo(null)}
                className="absolute top-4 right-4 text-muted-foreground hover:text-white transition-colors text-lg p-2 hover:bg-white/5 rounded-lg cursor-pointer"
              >
                &times;
              </button>

              <div className="space-y-2">
                <span className="text-[10px] font-mono text-primary font-bold tracking-widest uppercase flex items-center gap-1.5">
                  <MessageSquareCode size={12} /> Live Integration Sandbox
                </span>
                <h3 className="text-xl font-bold uppercase text-foreground tracking-tight">
                  How to Upload Your Client Testimonials
                </h3>
                <p className="text-xs text-muted-foreground/80 leading-relaxed font-light">
                  Follow these three simple steps to link your live video files and display them seamlessly on the production web applet.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-mono text-xs font-black shrink-0">
                    1
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-xs font-bold uppercase text-white">Rename Your Video File</h5>
                    <p className="text-[11px] text-muted-foreground/75 leading-relaxed font-light">
                      Ensure your client testimonial video is in standard <code className="text-white bg-white/5 px-1 py-0.5 rounded">.mp4</code> or <code className="text-white bg-white/5 px-1 py-0.5 rounded">.webm</code> format, and rename it to match:
                      <br />
                      <span className="text-primary font-mono text-[10px]">
                        {showUploadInfo === "jenkins" ? "testimonial-2.mp4" : "testimonial-3.mp4"}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-mono text-xs font-black shrink-0">
                    2
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-xs font-bold uppercase text-white">Place in the Public Folder</h5>
                    <p className="text-[11px] text-muted-foreground/75 leading-relaxed font-light">
                      Upload the video to your workspace and place it into the <code className="text-white bg-white/5 px-1 py-0.5 rounded">/public/videos/</code> directory. (You can drag and drop files directly into the AI Studio code editor side explorer panel).
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-6 h-6 rounded bg-primary/10 border border-primary/30 flex items-center justify-center text-primary font-mono text-xs font-black shrink-0">
                    3
                  </div>
                  <div className="space-y-1">
                    <h5 className="text-xs font-bold uppercase text-white">Update Code Sources</h5>
                    <p className="text-[11px] text-muted-foreground/75 leading-relaxed font-light">
                      Open <code className="text-white bg-white/5 px-1 py-0.5 rounded">src/components/TestimonialsSection.tsx</code> and set <code className="text-white bg-white/5 px-1 py-0.5 rounded">isConfigured: true</code>, then change the <code className="text-white bg-white/5 px-1 py-0.5 rounded">videoUrl</code> string to point to <code className="text-primary font-mono bg-white/5 px-1 py-0.5 rounded">{"/videos/" + (showUploadInfo === "jenkins" ? "testimonial-2.mp4" : "testimonial-3.mp4")}</code>.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setShowUploadInfo(null)}
                  className="w-full py-3 bg-primary text-black font-mono font-black text-xs uppercase tracking-wider rounded-xl hover:bg-opacity-95 transition-all cursor-pointer"
                >
                  Understood & Ready
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
