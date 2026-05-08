/**
 * WrenVideo — Silicon Wren video component
 *
 * ARCHITECTURE:
 * - Videos are 1920×1080. Wren occupies the LEFT ~35-55% of the frame.
 * - Page background is #080f26 — exactly matches Wren's video background. No box visible.
 * - Container: position:absolute, 55vw wide, 100% tall, overflow:hidden.
 * - Video: objectFit:cover, objectPosition:left center → crops to Wren's body.
 * - flip=true: scaleX(-1) mirrors the video so Wren faces right (for left-side sections).
 *   When flipped, objectPosition stays "left center" in the pre-flip coordinate space,
 *   which after the mirror becomes "right center" visually — showing Wren's body on the
 *   left side of the container. We pass "left center" always; the transform handles it.
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

  return (
    <video
      ref={videoRef}
      src={src}
      loop={loop}
      muted
      playsInline
      preload="auto"
      className={`wren-video ${className}`}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "cover",
        // Use the passed objectPosition prop. Default is "left center" since Wren
        // lives in the left portion of most frames. For centered clips (memoryOrb,
        // cornerWave, premium3d, cartwheels) pass "center center".
        objectPosition: objectPosition,
        transform: flip ? "scaleX(-1)" : undefined,
        filter: glow
          ? "drop-shadow(0 0 80px rgba(232,160,48,0.6)) drop-shadow(0 0 200px rgba(232,160,48,0.3)) brightness(1.1)"
          : "none",
        ...style,
      }}
    />
  );
}
