import React from "react";
import { Facebook } from "lucide-react";
import Logo from "./Logo";
import { FACEBOOK_URL, PORTAL_URL, SUPPORT_EMAIL } from "../lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line bg-ink py-12" id="footer">
      <div className="wrap flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm">
          <Logo size="sm" />
          <p className="mt-4 text-[0.82rem] text-faint">AI receptionist and no-show prevention for dental practices and appointment businesses. Columbus, Ohio.</p>
        </div>
        <nav className="flex flex-wrap gap-x-7 gap-y-3 text-[0.68rem] font-bold uppercase tracking-[0.2em] text-muted" aria-label="Footer">
          <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer" className="hover:text-neon">Client login</a>
          <a href="/privacy.html" className="hover:text-neon">Privacy</a>
          <a href="/terms.html" className="hover:text-neon">Terms</a>
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 hover:text-neon"><Facebook size={13} /> Facebook</a>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="normal-case tracking-normal hover:text-neon">{SUPPORT_EMAIL}</a>
        </nav>
      </div>
      <div className="wrap mt-10 text-[0.75rem] text-faint">© {year} No Show Killer AI. All rights reserved.</div>
    </footer>
  );
}
