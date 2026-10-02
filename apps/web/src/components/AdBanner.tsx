"use client";

import { useEffect, useRef } from "react";
import { ADSENSE_CLIENT, AD_SLOTS } from "@/lib/adsense";

interface AdBannerProps {
  position: "hero" | "sidebar" | "inline" | "footer";
  className?: string;
}

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

export default function AdBanner({ position, className = "" }: AdBannerProps) {
  const slot = AD_SLOTS[position];
  const pushed = useRef(false);

  useEffect(() => {
    if (pushed.current || !slot) return;
    pushed.current = true;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* AdSense not loaded yet */
    }
  }, [slot]);

  if (!slot) return null;

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-purple-500/20 ${className}`}
      style={{ maxWidth: "728px", margin: "0 auto" }}
    >
      <ins
        className="adsbygoogle block"
        style={{ display: "block", minHeight: "90px" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
