"use client";

import { useState, useEffect } from "react";

interface Landmark {
  id: string;
  igName: string;
  igX: number;
  igY: number;
  rlAddress: string;
  rlLat: number;
  rlLng: number;
  tags: string[];
}

const TAG_COLORS: Record<string, string> = {
  hotel: "#ff69b4",
  residential: "#6495ed",
  retail: "#ffa500",
  restaurant: "#ff6347",
  government: "#9370db",
  transportation: "#20b2aa",
  leisure: "#32cd32",
  industrial: "#8b4513",
  public: "#dda0dd",
  landmark: "#ffd700",
  natural: "#228b22",
  office: "#708090",
  construction: "#ff4500",
  demolished: "#808080",
};

function getTagColor(tags: string[]): string {
  for (const tag of tags) {
    if (TAG_COLORS[tag]) return TAG_COLORS[tag];
  }
  return "#e040fb";
}

export default function LeonidaMap() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState<"embed" | "list">("embed");
  const [landmarks, setLandmarks] = useState<Landmark[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTagFilter, setActiveTagFilter] = useState("all");

  async function loadLandmarks() {
    try {
      const res = await fetch("/data/landmarks.json");
      const data = await res.json();
      const parsed: Landmark[] = Object.entries(data).map(
        ([id, entry]: [string, any]) => ({
          id,
          igName: entry[0] || "Unknown",
          igX: entry[1]?.[0] || 0,
          igY: entry[1]?.[1] || 0,
          rlAddress: entry[3] || "",
          rlLat: entry[4]?.[0] || 0,
          rlLng: entry[4]?.[1] || 0,
          tags: entry[6] || [],
        })
      );
      setLandmarks(parsed);
    } catch (e) {
      console.error("Failed to load landmarks:", e);
    }
  }

  useEffect(() => {
    setMounted(true);
    loadLandmarks();
  }, []);

  const allTags = Array.from(
    new Set(landmarks.flatMap((l) => l.tags).filter((t) => !t.startsWith("L")))
  ).sort();

  const filteredLandmarks = landmarks.filter((l) => {
    const matchesSearch =
      !searchTerm ||
      l.igName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.rlAddress.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag =
      activeTagFilter === "all" || l.tags.includes(activeTagFilter);
    return matchesSearch && matchesTag;
  });

  if (!mounted) {
    return (
      <div className="bg-[#110022] rounded-xl p-12 border border-purple-500/10 text-center h-[600px] flex items-center justify-center">
        <div>
          <span className="text-6xl mb-4 block">🗺️</span>
          <p className="text-gray-400">Loading GTA 6 map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* View toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={() => setView("embed")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            view === "embed"
              ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
              : "bg-[#110022] text-gray-400 border border-purple-500/10"
          }`}
        >
          🗺️ Interactive Map
        </button>
        <button
          onClick={() => setView("list")}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            view === "list"
              ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
              : "bg-[#110022] text-gray-400 border border-purple-500/10"
          }`}
        >
          📋 Landmarks List ({landmarks.length})
        </button>
        <span className="text-gray-600 text-xs ml-auto">
          Data from{" "}
          <a
            href="https://gtadb.org"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-400 hover:underline"
          >
            gtadb.org
          </a>{" "}
          (CC BY 4.0)
        </span>
      </div>

      {view === "embed" ? (
        /* Embedded GTADB Map */
        <div
          className="rounded-xl overflow-hidden border border-purple-500/10"
          style={{ height: "700px" }}
        >
          <iframe
            src="https://map.gtadb.org/#VI"
            className="w-full h-full border-0"
            title="GTA 6 Interactive Map - Leonida"
            loading="lazy"
          />
        </div>
      ) : (
        /* Landmarks List View */
        <div className="space-y-4">
          {/* Search & Filters */}
          <div className="flex flex-wrap gap-3 items-center">
            <div className="relative flex-1 min-w-[200px]">
              <input
                type="text"
                placeholder="Search landmarks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#110022] border border-purple-500/15 rounded-lg px-4 py-2 pl-9 text-sm focus:outline-none focus:border-pink-500/50 text-white placeholder-gray-600"
              />
              <span className="absolute left-3 top-2.5 text-gray-600 text-sm">
                🔍
              </span>
            </div>
            <span className="text-gray-500 text-xs">
              {filteredLandmarks.length} / {landmarks.length}
            </span>
          </div>

          {/* Tag filter buttons */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setActiveTagFilter("all")}
              className={`px-3 py-1 rounded-full text-[10px] font-medium transition-all ${
                activeTagFilter === "all"
                  ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                  : "bg-[#110022] text-gray-400 hover:bg-purple-500/20 border border-purple-500/10"
              }`}
            >
              All ({landmarks.length})
            </button>
            {allTags.slice(0, 15).map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTagFilter(tag)}
                className={`px-3 py-1 rounded-full text-[10px] font-medium transition-all ${
                  activeTagFilter === tag
                    ? "text-white"
                    : "bg-[#110022] text-gray-400 hover:bg-purple-500/20 border border-purple-500/10"
                }`}
                style={
                  activeTagFilter === tag
                    ? { background: getTagColor([tag]) }
                    : undefined
                }
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Landmarks grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[600px] overflow-y-auto pr-2">
            {filteredLandmarks.map((landmark) => (
              <div
                key={landmark.id}
                className="bg-[#110022] rounded-lg p-3 border border-purple-500/10 hover:border-pink-500/30 transition-all"
              >
                <div className="flex items-start justify-between mb-1">
                  <span className="text-white text-sm font-bold">
                    {landmark.igName}
                  </span>
                  <span className="text-gray-600 text-[9px] shrink-0 ml-2">
                    {landmark.id}
                  </span>
                </div>
                {landmark.rlAddress && (
                  <p className="text-gray-500 text-[10px] mb-2 line-clamp-2">
                    📍 {landmark.rlAddress}
                  </p>
                )}
                <div className="flex flex-wrap gap-1 mb-2">
                  {landmark.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-1.5 py-0.5 rounded text-[9px] text-white"
                      style={{ background: getTagColor([tag]) }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                {landmark.rlLat !== 0 && (
                  <a
                    href={`https://www.google.com/maps?q=${landmark.rlLat},${landmark.rlLng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 text-[10px] hover:underline"
                  >
                    View on Google Maps →
                  </a>
                )}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="bg-[#110022] rounded-lg p-3 border border-purple-500/10">
            <p className="text-gray-400 text-[10px] font-bold mb-2">
              LEGEND
            </p>
            <div className="flex flex-wrap gap-2">
              {Object.entries(TAG_COLORS)
                .filter(([tag]) => allTags.includes(tag))
                .map(([tag, color]) => (
                  <div key={tag} className="flex items-center gap-1">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{ background: color }}
                    />
                    <span className="text-gray-500 text-[9px]">{tag}</span>
                  </div>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
