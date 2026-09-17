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
 *
 * PERFORMANCE & iOS NOTES:
 * - preload="metadata" fetches only enough data for resilient mobile playback.
 * - IntersectionObserver handles play/pause. On iOS Safari, .load() is called before
 *   .play() to satisfy the browser's media loading requirement.
 * - A real image element, not just the native video poster attribute, remains underneath
 *   the video so a still is visible even if playback or the video request fails.
 * - autoplay is always muted + playsInline to satisfy iOS autoplay policy.
 */

import { useEffect, useRef, useState } from "react";
import { shouldPlayWrenMotion, toggleWrenMotion } from "./wrenMotion";

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
  /** Poster image shown while video loads — use a Wren still from WREN_STILLS */
  poster?: string;
  /** Concise description for the visible poster fallback image. */
  posterAlt?: string;
  // Legacy props — accepted but ignored
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
  poster,
  posterAlt = "Wren, the Continuary guide, in a warm amber glow.",
}: WrenVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => (
    typeof window !== "undefined"
    && typeof window.matchMedia === "function"
    && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ));
  const [isUserPaused, setIsUserPaused] = useState(false);
  const [isManuallyPlaying, setIsManuallyPlaying] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotionPreference = () => setPrefersReducedMotion(mediaQuery.matches);
    syncMotionPreference();

    mediaQuery.addEventListener?.("change", syncMotionPreference);
    return () => mediaQuery.removeEventListener?.("change", syncMotionPreference);
  }, []);

  const shouldAutoplay = autoplay && !prefersReducedMotion && !isUserPaused;
  const shouldPlay = shouldPlayWrenMotion({
    autoplay,
    prefersReducedMotion,
    userPaused: isUserPaused,
    userRequestedPlay: isManuallyPlaying,
  });

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!shouldPlay) {
      video.pause();
      return;
    }

    let loadStarted = false;

    const tryPlay = () => {
      // iOS Safari requires .load() before .play() when preload="none"
      if (!loadStarted) {
        loadStarted = true;
        video.load();
      }
      video.play()
        .then(() => setHasLoaded(true))
        .catch(() => {
          // Keep the poster visible if autoplay is blocked or the clip fails.
          setHasLoaded(false);
        });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            tryPlay();
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.02, rootMargin: "200px" }
    );

    observer.observe(video);

    // Also attempt play immediately if already in viewport on mount
    const rect = video.getBoundingClientRect();
    const inViewport = rect.top < window.innerHeight && rect.bottom > 0;
    if (inViewport) tryPlay();

    return () => observer.disconnect();
  }, [shouldPlay]);

  const toggleMotion = () => {
    const video = videoRef.current;
    if (!video) return;

    const nextMotionState = toggleWrenMotion({ isPlaying, prefersReducedMotion });

    if (isPlaying) {
      setIsUserPaused(nextMotionState.userPaused);
      setIsManuallyPlaying(nextMotionState.userRequestedPlay);
      setHasLoaded(false);
      video.pause();
      return;
    }

    // A deliberate visitor action is allowed even when the device prefers reduced motion.
    setIsUserPaused(nextMotionState.userPaused);
    setIsManuallyPlaying(nextMotionState.userRequestedPlay);
    video.load();
    video.play()
      .then(() => {
        setHasLoaded(true);
        setIsPlaying(true);
      })
      .catch(() => {
        setHasLoaded(false);
        setIsPlaying(false);
      });
  };

  // Vignette gradient: fades the inner edge of the Wren container into the page bg.
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
      {poster && (
        <img
          src={poster}
          alt={posterAlt}
          loading="lazy"
          decoding="async"
          style={{
            position: "absolute",
            inset: 0,
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition,
            transform: flip ? "scaleX(-1)" : undefined,
            opacity: hasLoaded ? 0 : 1,
            transition: "opacity 0.4s ease",
          }}
        />
      )}
      <video
        ref={videoRef}
        src={src}
        loop={loop}
        muted
        playsInline
        autoPlay={shouldAutoplay}
        aria-hidden="true"
        preload="metadata"
        poster={poster}
        onPlaying={() => {
          setHasLoaded(true);
          setIsPlaying(true);
        }}
        onPause={() => setIsPlaying(false)}
        onError={() => {
          setHasLoaded(false);
          setIsPlaying(false);
        }}
        className="wren-video"
        style={{
          position: "absolute",
          inset: 0,
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: objectPosition,
          transform: flip ? "scaleX(-1)" : undefined,
          filter: glow
            ? "drop-shadow(0 0 80px rgba(232,160,48,0.6)) drop-shadow(0 0 200px rgba(232,160,48,0.3)) brightness(1.1)"
            : "none",
          // Fade in once video is ready to avoid flash from poster → video
          opacity: hasLoaded ? 1 : (poster ? 0 : 1),
          transition: "opacity 0.4s ease",
          ...style,
        }}
      />

      {loop && (
        <button
          type="button"
          className="wren-motion-control"
          onClick={toggleMotion}
          aria-label={isPlaying ? "Pause Wren motion" : "Play Wren motion"}
          aria-pressed={isPlaying}
          title={isPlaying ? "Pause motion" : "Play motion"}
        >
          <span aria-hidden="true" className="wren-motion-control__icon">
            {isPlaying ? "Ⅱ" : "▶"}
          </span>
          <span>{isPlaying ? "Pause motion" : "Play motion"}</span>
        </button>
      )}

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
