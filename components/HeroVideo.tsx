"use client";

import { useEffect, useRef } from "react";

// Silent, looping hero video with no controls (Max's call: the clips have no
// sound, and he preferred no buttons over it). Visitors who prefer reduced
// motion just see the poster frame, since the video never starts for them.
// `media` limits playback to matching screens (e.g. desktop only), so a video
// hidden on phones is never downloaded there.
export default function HeroVideo({
  src,
  poster,
  label,
  media,
}: {
  src: string;
  poster: string;
  label: string;
  media?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const start = () => {
      if (media && !window.matchMedia(media).matches) return;
      if (!video.getAttribute("src")) video.setAttribute("src", src);
      // play() can be refused (e.g. data-saver modes); the poster stays up
      video.play().catch(() => {});
    };
    start();
    if (!media) return;
    const mq = window.matchMedia(media);
    mq.addEventListener("change", start);
    return () => mq.removeEventListener("change", start);
  }, [src, media]);

  return (
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-label={label}
      className="absolute inset-0 h-full w-full object-cover"
    />
  );
}
