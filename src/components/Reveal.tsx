import React, { useEffect, useRef } from "react";

interface RevealProps {
  /** Extra delay in ms (for staggering siblings). */
  delay?: number;
  as?: "div" | "section" | "li" | "header";
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  id?: string;
  key?: string | number;
}

/** Fades a block up (with the original site's blur) the first time it scrolls into view. */
export default function Reveal({ delay = 0, as = "div", className = "", style, children, id }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) { el.classList.add("in"); return; }
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); }
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as any;
  return (
    <Tag ref={ref} id={id} className={`reveal ${className}`} style={{ transitionDelay: delay ? `${delay}ms` : undefined, ...style }}>
      {children}
    </Tag>
  );
}
