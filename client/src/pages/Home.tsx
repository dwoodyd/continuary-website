/**
 * Home — Continuary landing page
 *
 * Section order:
 *  1. Nav
 *  2. Hero
 *  3. PlatformStrip     (NEW — iOS/Android/Browser strip)
 *  4. PanoramicBanner   (NEW — 3-panel composite mockup)
 *  5. ProblemSection
 *  6. NothingBroken
 *  7. Rituals
 *  8. EvidenceLog
 *  9. VaultSection
 * 10. ReEntry
 * 11. ThreadStrength
 * 12. ADHDSection
 * 13. AppScreensSection (NEW — 2×2 mockup grid)
 * 14. BookSection
 * 15. FoundingMember
 * 16. Footer
 */

import { useEffect } from "react";
import Nav from "../components/Nav";
import Hero from "../components/sections/Hero";
import PlatformStrip from "../components/sections/PlatformStrip";
import PanoramicBanner from "../components/sections/PanoramicBanner";
import ProblemSection from "../components/sections/ProblemSection";
import NothingBroken from "../components/sections/NothingBroken";
import Rituals from "../components/sections/Rituals";
import EvidenceLog from "../components/sections/EvidenceLog";
import VaultSection from "../components/sections/VaultSection";
import ReEntry from "../components/sections/ReEntry";
import ThreadStrength from "../components/sections/ThreadStrength";
import ADHDSection from "../components/sections/ADHDSection";
import AppScreensSection from "../components/sections/AppScreensSection";
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
        <PlatformStrip />
        <PanoramicBanner />
        <ProblemSection />
        <NothingBroken />
        <Rituals />
        <EvidenceLog />
        <VaultSection />
        <ReEntry />
        <ThreadStrength />
        <ADHDSection />
        <AppScreensSection />
        <BookSection />
        <FoundingMember />
        <Footer />
      </main>
    </div>
  );
}
