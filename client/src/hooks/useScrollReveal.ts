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
  threshold = 0.1
) {
  const internalRef = useRef<HTMLElement>(null);
  const containerRef = externalRef ?? internalRef;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll(".reveal");

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
      { threshold }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);

  return containerRef;
}
