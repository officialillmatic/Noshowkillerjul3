import React, { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";
import { BOOKING_URL, PORTAL_URL } from "../lib/site";

const LINKS = [
  { name: "What it costs you", href: "#cost" },
  { name: "How it works", href: "#how" },
  { name: "Results", href: "#results" },
  { name: "Plans", href: "#plans" },
  { name: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors ${scrolled || open ? "bg-ink/85 backdrop-blur-md border-b border-line" : "bg-transparent border-b border-transparent"}`}
      id="site-header"
    >
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <a href="#top" className="shrink-0" aria-label="No Show Killer AI, back to top">
          <Logo size="sm" />
        </a>

        <nav className="hidden lg:flex items-center gap-7 text-[0.925rem] text-bone-2" aria-label="Primary">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-bone transition-colors">
              {l.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a href={PORTAL_URL} className="btn hidden sm:inline-flex" target="_blank" rel="noopener noreferrer">
            Client login
          </a>
          <a href={BOOKING_URL} className="btn btn-brass" target="_blank" rel="noopener noreferrer">
            Book a demo
          </a>
          <button
            type="button"
            className="btn lg:hidden !px-3"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="lg:hidden border-t border-line bg-ink/95 backdrop-blur-md">
          <nav className="wrap flex flex-col py-3" aria-label="Mobile">
            {LINKS.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-3 text-bone-2 hover:text-bone border-b border-line last:border-b-0">
                {l.name}
              </a>
            ))}
            <a href={PORTAL_URL} className="py-3 text-bone-2 hover:text-bone sm:hidden" target="_blank" rel="noopener noreferrer">
              Client login
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
