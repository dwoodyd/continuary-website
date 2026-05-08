/**
 * Home — Continuary landing page
 * Assembles all 10 sections in order
 */

import { useEffect } from "react";
import Nav from "../components/Nav";
import Hero from "../components/sections/Hero";
import NothingBroken from "../components/sections/NothingBroken";
import Rituals from "../components/sections/Rituals";
import EvidenceLog from "../components/sections/EvidenceLog";
import ReEntry from "../components/sections/ReEntry";
import ADHDSection from "../components/sections/ADHDSection";
import BookSection from "../components/sections/BookSection";
import Pricing from "../components/sections/Pricing";
import TrustRow from "../components/sections/TrustRow";
import Footer from "../components/sections/Footer";

export default function Home() {
  // Bootstrap scroll reveals for sections that don't use the hook
  useEffect(() => {
    const reveals = document.querySelectorAll(".reveal:not(.in-view)");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    reveals.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "oklch(0.16 0.04 255)" }}>
      <Nav />
      <main>
        <Hero />
        <NothingBroken />
        <Rituals />
        <EvidenceLog />
        <ReEntry />
        <ADHDSection />
        <BookSection />
        <Pricing />
        <TrustRow />
        <Footer />
      </main>
    </div>
  );
}
