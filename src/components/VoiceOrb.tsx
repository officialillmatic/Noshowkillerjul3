import React, { useEffect, useRef } from "react";

interface VoiceOrbProps {
  /** True while Ava is "speaking" in the demo call. The orb breathes harder. */
  active: boolean;
  className?: string;
}

/**
 * A 3D particle sphere drawn on a plain 2D canvas (points projected with perspective).
 * No WebGL, no external runtime, nothing to load. It idles with a slow rotation and
 * pulses while Ava speaks. Pauses when off-screen or when the tab is hidden, and
 * renders a single still frame for people who prefer reduced motion.
 */
export default function VoiceOrb({ active, className = "" }: VoiceOrbProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Fibonacci sphere: evenly spread points, with a few randomly pulled inward for depth.
    const N = 1500;
    const pts: { x: number; y: number; z: number; r: number; p: number }[] = [];
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const th = golden * i;
      const inner = Math.random() < 0.12 ? 0.55 + Math.random() * 0.4 : 1;
      pts.push({ x: Math.cos(th) * rad * inner, y: y * inner, z: Math.sin(th) * rad * inner, r: inner, p: Math.random() * Math.PI * 2 });
    }

    let w = 0, h = 0, dpr = 1;
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width; h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let visible = true;
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: 0.05 });
    io.observe(canvas);

    let raf = 0;
    let t = 0;
    let amp = 0; // smoothed speaking amplitude

    const draw = () => {
      const target = activeRef.current ? 1 : 0;
      amp += (target - amp) * 0.06;
      t += 0.0035;

      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;
      const R = Math.min(w, h) * 0.34;
      const fov = 3.2;
      const ay = t, ax = Math.sin(t * 0.6) * 0.35 + 0.2;
      const cy1 = Math.cos(ay), sy1 = Math.sin(ay), cx1 = Math.cos(ax), sx1 = Math.sin(ax);

      // soft halo
      const halo = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.6);
      halo.addColorStop(0, `rgba(10,224,0,${0.12 + amp * 0.10})`);
      halo.addColorStop(1, "rgba(10,224,0,0)");
      ctx.fillStyle = halo;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < N; i++) {
        const p = pts[i];
        // breathing: subtle idle swell, stronger ripple while speaking
        const ripple = 1 + Math.sin(t * 9 + p.p) * 0.012 + amp * Math.sin(t * 22 + p.y * 6 + p.p) * 0.07;
        let x = p.x * ripple, y = p.y * ripple, z = p.z * ripple;
        // rotate Y then X
        let x1 = x * cy1 - z * sy1, z1 = x * sy1 + z * cy1;
        let y1 = y * cx1 - z1 * sx1; z1 = y * sx1 + z1 * cx1;
        const depth = fov / (fov + z1);
        const sx = cx + x1 * R * depth, sy = cy + y1 * R * depth;
        const a = Math.max(0, Math.min(1, (z1 + 1.1) / 2.2));
        const size = (0.55 + a * 1.25) * (p.r < 1 ? 0.8 : 1);
        // front points neon green, back points fade toward a dim grey-green
        const back = 1 - a;
        const rC = Math.round(10 + back * 60), gC = Math.round(224 - back * 120), bC = Math.round(0 + back * 60);
        ctx.fillStyle = `rgba(${rC},${gC},${bC},${0.22 + a * 0.75})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // equator ring
      ctx.strokeStyle = `rgba(239,233,220,${0.06 + amp * 0.06})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(cx, cy, R * 1.18, R * 0.32, Math.sin(t * 0.5) * 0.25, 0, Math.PI * 2);
      ctx.stroke();
    };

    const loop = () => {
      if (visible && !document.hidden) draw();
      raf = requestAnimationFrame(loop);
    };

    if (reduced) {
      amp = 0.4;
      draw();
    } else {
      raf = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
