"use client";

interface AdBannerProps {
  position: "hero" | "sidebar" | "inline" | "footer";
  className?: string;
}

export default function AdBanner({ position, className = "" }: AdBannerProps) {
  const sizes: Record<string, { width: string; height: string; label: string }> = {
    hero: { width: "728px", height: "90px", label: "728×90 Leaderboard" },
    sidebar: { width: "300px", height: "250px", label: "300×250 Medium Rectangle" },
    inline: { width: "728px", height: "90px", label: "728×90 Leaderboard" },
    footer: { width: "728px", height: "90px", label: "728×90 Leaderboard" },
  };

  const size = sizes[position];

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-purple-500/20 bg-gradient-to-r from-purple-900/30 via-[#1a0033] to-purple-900/30 ${className}`}
      style={{ maxWidth: size.width, height: size.height, margin: "0 auto" }}
    >
      {/* AdSense placeholder - replace with actual ad code */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <p className="text-purple-400/60 text-sm font-medium">{size.label}</p>
          <p className="text-gray-500/40 text-xs mt-1">Google AdSense</p>
        </div>
      </div>

      {/* Gradient shimmer effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/5 to-transparent animate-pulse" />
    </div>
  );
}
