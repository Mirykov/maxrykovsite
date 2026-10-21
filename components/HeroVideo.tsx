"use client";

import { useEffect, useRef } from "react";

// Silent, looping hero video with no controls (Max's call: the clip has no
// sound, and he preferred no buttons over it). Visitors who prefer reduced
// motion just see the poster frame, since the video never starts for them.
export default function HeroVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      // play() can be refused (e.g. data-saver modes); the poster stays up
      video.play().catch(() => {});
    }
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="metadata"
      aria-label={label}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
