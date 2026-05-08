/**
 * WrenVideo — Silicon Wren video component
 *
 * ARCHITECTURE:
 * - Videos are 1920×1080. Wren occupies the LEFT ~35-55% of the frame.
 * - Page background is #080f26 — exactly matches Wren's video background. No box visible.
 * - Container: position:absolute, 55vw wide, 100% tall, overflow:hidden.
 * - Video: objectFit:cover, objectPosition controls which part of the frame is shown.
 * - flip=true: scaleX(-1) mirrors the video for left-side sections.
 * - fadeDir: adds a cinematic vignette gradient overlay on the inner edge so Wren
 *   dissolves into the page rather than hard-cropping against the text column.
 *   "right" = Wren is on the right → fade from transparent (left) to #080f26 (right edge)
 *   "left"  = Wren is on the left  → fade from #080f26 (left edge) to transparent (right)
 */

import { useEffect, useRef } from "react";

interface WrenVideoProps {
  src: string;
  className?: string;
  glow?: boolean;
  style?: React.CSSProperties;
  loop?: boolean;
  autoplay?: boolean;
  flip?: boolean;
  objectPosition?: string;
  /** Direction of the cinematic vignette fade — toward which edge the video dissolves */
  fadeDir?: "left" | "right" | "none";
  // Legacy props — accepted but ignored
  poster?: string;
  sectionBg?: string;
}

export default function WrenVideo({
  src,
  className = "",
  glow = true,
  style,
  loop = true,
  autoplay = true,
  flip = false,
  objectPosition = "left center",
  fadeDir = "none",
}: WrenVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoplay) return;

    video.play().catch(() => {});

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.02 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [autoplay]);

  // Vignette gradient: fades the inner edge of the Wren container into the page bg.
  // "left" container (Wren on left): fade right edge → transparent-to-#080f26 left-to-right
  // "right" container (Wren on right): fade left edge → #080f26-to-transparent left-to-right
  const vignetteGradient =
    fadeDir === "left"
      ? "linear-gradient(to right, transparent 40%, rgba(8,15,38,0.7) 72%, #080f26 100%)"
      : fadeDir === "right"
      ? "linear-gradient(to left, transparent 40%, rgba(8,15,38,0.7) 72%, #080f26 100%)"
      : undefined;

  return (
    <div
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
      }}
    >
      <video
        ref={videoRef}
        src={src}
        loop={loop}
        muted
        playsInline
        preload="auto"
        className="wren-video"
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: objectPosition,
          transform: flip ? "scaleX(-1)" : undefined,
          filter: glow
            ? "drop-shadow(0 0 80px rgba(232,160,48,0.6)) drop-shadow(0 0 200px rgba(232,160,48,0.3)) brightness(1.1)"
            : "none",
          ...style,
        }}
      />

      {/* Cinematic vignette — dissolves Wren into the page on the text-facing edge */}
      {vignetteGradient && (
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background: vignetteGradient,
            pointerEvents: "none",
          }}
        />
      )}

      {/* Top & bottom vignette — softens the vertical edges for depth */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, #080f26 0%, transparent 15%, transparent 85%, #080f26 100%)",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}
