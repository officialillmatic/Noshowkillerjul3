import React from "react";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import ProofStrip from "./components/ProofStrip";
import CostCalculator from "./components/CostCalculator";
import HowItWorks from "./components/HowItWorks";
import Capabilities from "./components/Capabilities";
import Industries from "./components/Industries";
import TestimonialsSection from "./components/TestimonialsSection";
import Plans from "./components/Plans";
import FAQ from "./components/FAQ";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-ink text-bone" id="nsk-app-wrapper">
      <Navbar />
      <main>
        <HeroSection />
        <ProofStrip />
        <CostCalculator />
        <HowItWorks />
        <Capabilities />
        <Industries />
        <TestimonialsSection />
        <Plans />
        <FAQ />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
