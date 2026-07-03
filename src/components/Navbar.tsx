import React from "react";
import Logo from "./Logo";
import { Facebook } from "lucide-react";

export default function Navbar() {
  const navLinks = [
    { name: "Services", href: "#services" },
    { name: "Our Approach", href: "#about" },
    { name: "Proof", href: "#testimonials" },
    { name: "Contact", href: "#contacts" }
  ];

  return (
    <nav 
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 sm:px-8 lg:px-16 py-4 sm:py-5 bg-gradient-to-b from-black/60 to-transparent backdrop-blur-xs"
      id="nsk-floating-navbar"
    >
      {/* Left: Branding Logo block */}
      <a href="#" className="flex items-center hover:opacity-90 transition-opacity cursor-pointer">
        <Logo size="sm" />
      </a>

      {/* Center: Interactive Nav Menu (Hidden on mobile) */}
      <div className="hidden md:flex items-center gap-8" id="navbar-menu-links">
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className="text-[10px] lg:text-xs font-bold text-muted-foreground hover:text-foreground hover:scale-[1.02] active:scale-[0.98] transition-all uppercase tracking-[0.24em] font-sans"
          >
            {link.name}
          </a>
        ))}
      </div>

      {/* Right: Get Quote Glass Button & Facebook icon */}
      <div className="flex items-center gap-3 sm:gap-4" id="navbar-ctas">
        <a 
          href="https://www.facebook.com/profile.php?id=61585860255283"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-11 h-11 bg-white/[0.02] text-primary hover:text-white hover:bg-white/[0.06] border border-white/5 hover:border-primary/20 rounded-lg transition-all active:scale-[0.95] cursor-pointer"
          title="Follow us on Facebook"
        >
          <Facebook size={16} />
        </a>
        <a
          href="https://cal.com/nicole-bejarano-u04dax/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex items-center justify-center h-11 bg-primary text-black hover:bg-opacity-95 border border-transparent px-6 rounded-lg uppercase text-[10px] tracking-[0.2em] font-extrabold active:scale-[0.97] hover:shadow-[0_4px_20px_rgba(10,224,0,0.35)] transition-all cursor-pointer"
        >
          Book 30m Call
        </a>
      </div>
    </nav>
  );
}
