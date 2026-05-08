/**
 * WrenVideo — Silicon Wren video player component
 *
 * Design: Dark navy background, Wren rendered with mix-blend-mode: screen
 * so the black background disappears and only the amber bird glows through.
 *
 * Props:
 *  src       — CDN path to the MP4
 *  poster    — Still image shown before play / as fallback
 *  loop      — Whether to loop (default: true)
 *  autoplay  — Whether to autoplay (default: true, muted)
 *  className — Additional classes for the wrapper
 *  glow      — Whether to apply amber drop-shadow glow (default: true)
 */

import { useEffect, useRef } from "react";

interface WrenVideoProps {
  src: string;
  poster?: string;
  loop?: boolean;
  autoplay?: boolean;
  className?: string;
  glow?: boolean;
  style?: React.CSSProperties;
}

export default function WrenVideo({
  src,
  poster,
  loop = true,
  autoplay = true,
  className = "",
  glow = true,
  style,
}: WrenVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoplay) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay blocked — video stays on poster frame
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, [autoplay]);

  return (
    <div
      className={`relative ${className}`}
      style={{ background: 'transparent', ...style }}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        loop={loop}
        muted
        playsInline
        preload="metadata"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          mixBlendMode: "screen",
          filter: glow
            ? "drop-shadow(0 0 40px oklch(0.78 0.16 65 / 0.5)) drop-shadow(0 0 80px oklch(0.78 0.16 65 / 0.25))"
            : undefined,
        }}
      />
    </div>
  );
}
