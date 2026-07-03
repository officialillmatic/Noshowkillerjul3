import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";
import AboutSection from "./components/AboutSection";
import TestimonialsSection from "./components/TestimonialsSection";
import ContactSection from "./components/ContactSection";

export default function App() {
  return (
    <div className="bg-hero-bg min-h-screen text-foreground relative overflow-x-hidden selection:bg-primary selection:text-black font-sora" id="nsk-app-wrapper">
      {/* Floating Transparent Head-Nav */}
      <Navbar />

      {/* Full-Screen 3D Spline Hero Landings */}
      <HeroSection />

      {/* The 4 Pillars of Automation Breakdown */}
      <FeaturesSection />

      {/* Handled Managed Services phase list & About details */}
      <AboutSection />

      {/* Client Success Testimonials & Proof Section */}
      <TestimonialsSection />

      {/* Inbound Lead Scheduling Calendar Form & Contact details */}
      <ContactSection />
    </div>
  );
}
