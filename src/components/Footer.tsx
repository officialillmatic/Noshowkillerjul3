import React from "react";
import Logo from "./Logo";
import { FACEBOOK_URL, PORTAL_URL, SUPPORT_EMAIL } from "../lib/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line py-10" id="footer">
      <div className="wrap flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo size="sm" />
          <p className="mt-3 text-[0.85rem] text-bone-3">AI receptionist and no-show prevention for dental practices and appointment businesses. Columbus, Ohio.</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-[0.9rem] text-bone-2" aria-label="Footer">
          <a href={PORTAL_URL} target="_blank" rel="noopener noreferrer" className="hover:text-bone">Client login</a>
          <a href="/privacy.html" className="hover:text-bone">Privacy</a>
          <a href="/terms.html" className="hover:text-bone">Terms</a>
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="hover:text-bone">Facebook</a>
          <a href={`mailto:${SUPPORT_EMAIL}`} className="hover:text-bone">{SUPPORT_EMAIL}</a>
        </nav>
      </div>
      <div className="wrap mt-8 text-[0.8rem] text-bone-3">© {year} No Show Killer AI. All rights reserved.</div>
    </footer>
  );
}
