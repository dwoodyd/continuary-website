/**
 * Home — Continuary landing page
 *
 * Section order:
 *  1. Nav
 *  2. Hero
 *  3. NothingBroken — emotional re-entry moat
 *  4. ReEntry — product re-entry story
 *  5. PlatformStrip / PanoramicBanner — system depth begins
 *  6. ProblemSection / Rituals / WhatsNew
 *  7. EvidenceLog / VaultSection / ThreadStrength / ADHDSection
 *  8. AppScreensSection / RoadmapTeaser / BookSection / FoundingMember / Footer
 */

import { useEffect } from "react";
import Nav from "../components/Nav";
import Hero from "../components/sections/Hero";
import PlatformStrip from "../components/sections/PlatformStrip";
import PanoramicBanner from "../components/sections/PanoramicBanner";
import ProblemSection from "../components/sections/ProblemSection";
import NothingBroken from "../components/sections/NothingBroken";
import Rituals from "../components/sections/Rituals";
import WhatsNew from "../components/sections/WhatsNew";
import EvidenceLog from "../components/sections/EvidenceLog";
import VaultSection from "../components/sections/VaultSection";
import ReEntry from "../components/sections/ReEntry";
import ThreadStrength from "../components/sections/ThreadStrength";
import ADHDSection from "../components/sections/ADHDSection";
import AppScreensSection from "../components/sections/AppScreensSection";
import RoadmapTeaser from "../components/sections/RoadmapTeaser";
import BookSection from "../components/sections/BookSection";
import FoundingMember from "../components/sections/FoundingMember";
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
      { threshold: 0.05, rootMargin: "0px 0px -30px 0px" }
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
        <ReEntry />
        <PlatformStrip />
        <PanoramicBanner />
        <ProblemSection />
        <Rituals />
        <WhatsNew />
        <EvidenceLog />
        <VaultSection />
        <ThreadStrength />
        <ADHDSection />
        <AppScreensSection />
        <RoadmapTeaser />
        <BookSection />
        <FoundingMember />
        <Footer />
      </main>
    </div>
  );
}
