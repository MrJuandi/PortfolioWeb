'use client';

import { useEffect, useRef } from 'react';

// Autoplaying, muted case-study video (shows controls instead when the user prefers reduced motion).
export default function CaseVideo({ src, poster, label, name }: { src: string; poster?: string; label: string; name: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { v.controls = true; return; }
    v.play().catch(() => { v.controls = true; });
  }, []);
  return (
    <video ref={ref} src={src} poster={poster} muted loop playsInline preload="auto" aria-label={label}
      style={{ viewTransitionName: name }} />
  );
}
