import { useEffect, useRef, RefObject } from "react";

/**
 * useScrollReveal — attaches IntersectionObserver to a container ref
 * and adds the "visible" class to all .reveal children when they enter viewport.
 *
 * Usage:
 *   const ref = useScrollReveal();
 *   <section ref={ref as RefObject<HTMLElement>}>...</section>
 *
 * OR pass an existing ref:
 *   const sectionRef = useRef<HTMLElement>(null);
 *   useScrollReveal(sectionRef);
 */
export function useScrollReveal(
  externalRef?: RefObject<HTMLElement | null>,
  threshold = 0.05
) {
  const internalRef = useRef<HTMLElement>(null);
  const containerRef = externalRef ?? internalRef;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Support both .reveal children pattern and .reveal-section parent pattern
    const isRevealSection = container.classList.contains("reveal-section");
    const elements = container.querySelectorAll(".reveal");

    // Use rootMargin to trigger slightly before element enters viewport
    // This ensures smooth reveals even on fast scrolls
    const observerOptions: IntersectionObserverInit = {
      threshold,
      rootMargin: "0px 0px -40px 0px",
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            entry.target.classList.add("in-view"); // legacy support
            observer.unobserve(entry.target);
          }
        });
      },
      observerOptions
    );

    elements.forEach((el) => observer.observe(el));

    // If this is a reveal-section container, also observe the container itself
    // so it gets the visible/in-view class to trigger reveal-child transitions
    if (isRevealSection) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("visible");
              entry.target.classList.add("in-view");
              sectionObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.02, rootMargin: "0px 0px -20px 0px" }
      );
      sectionObserver.observe(container);
      return () => {
        observer.disconnect();
        sectionObserver.disconnect();
      };
    }

    return () => observer.disconnect();
  }, [threshold]);

  return containerRef;
}
