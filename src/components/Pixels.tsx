import React, { useMemo } from "react";

interface PixelsProps {
  /** Number of squares. */
  count?: number;
  /** Size of the grid cell in px. */
  cell?: number;
  /** Columns x rows of the cluster area. */
  cols?: number;
  rows?: number;
  className?: string;
  /** Seed so the layout is stable between renders. */
  seed?: number;
}

/** A cluster of neon pixel squares on a grid (the Muscat motif), gently pulsing. Decorative only. */
export default function Pixels({ count = 14, cell = 14, cols = 10, rows = 6, className = "", seed = 1 }: PixelsProps) {
  const squares = useMemo(() => {
    // small deterministic PRNG so the cluster doesn't jump on re-render
    let s = seed * 9301 + 49297;
    const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
    const used = new Set<string>();
    const out: { x: number; y: number; tone: number; delay: number; scale: number }[] = [];
    let guard = 0;
    while (out.length < count && guard++ < 400) {
      const x = Math.floor(rnd() * cols), y = Math.floor(rnd() * rows);
      const k = `${x},${y}`;
      if (used.has(k)) continue;
      used.add(k);
      out.push({ x, y, tone: rnd(), delay: rnd() * 3, scale: rnd() < 0.25 ? 0.5 : 1 });
    }
    return out;
  }, [count, cols, rows, seed]);

  return (
    <div className={`pointer-events-none select-none ${className}`} style={{ width: cols * cell, height: rows * cell }} aria-hidden="true">
      {squares.map((p, i) => (
        <span
          key={i}
          className="absolute block animate-pixel"
          style={{
            left: p.x * cell + (p.scale < 1 ? cell * 0.25 : 0),
            top: p.y * cell + (p.scale < 1 ? cell * 0.25 : 0),
            width: cell * p.scale - 1,
            height: cell * p.scale - 1,
            background: p.tone < 0.3 ? "#b8ff00" : p.tone < 0.75 ? "#0ae000" : "#0a8f00",
            animationDelay: `${p.delay}s`,
            animationDuration: `${2.6 + p.tone * 2}s`,
          }}
        />
      ))}
    </div>
  );
}
