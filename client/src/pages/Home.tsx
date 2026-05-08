/**
 * Home — Continuary landing page
 *
 * Section order (per builder prompt):
 *  1. Nav
 *  2. Hero
 *  3. ProblemSection  (NEW)
 *  4. NothingBroken
 *  5. Rituals
 *  6. EvidenceLog
 *  7. VaultSection    (NEW)
 *  8. ReEntry
 *  9. ThreadStrength  (NEW)
 * 10. ADHDSection
 * 11. BookSection
 * 12. FoundingMember  (REPLACES Pricing)
 * 13. TrustRow
 * 14. Footer
 */

import { useEffect } from "react";
import Nav from "../components/Nav";
import Hero from "../components/sections/Hero";
import ProblemSection from "../components/sections/ProblemSection";
import NothingBroken from "../components/sections/NothingBroken";
import Rituals from "../components/sections/Rituals";
import EvidenceLog from "../components/sections/EvidenceLog";
import VaultSection from "../components/sections/VaultSection";
import ReEntry from "../components/sections/ReEntry";
import ThreadStrength from "../components/sections/ThreadStrength";
import ADHDSection from "../components/sections/ADHDSection";
import BookSection from "../components/sections/BookSection";
import FoundingMember from "../components/sections/FoundingMember";
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
        <ProblemSection />
        <NothingBroken />
        <Rituals />
        <EvidenceLog />
        <VaultSection />
        <ReEntry />
        <ThreadStrength />
        <ADHDSection />
        <BookSection />
        <FoundingMember />
        <TrustRow />
        <Footer />
      </main>
    </div>
  );
}
