"use client";

import { useState, useEffect, Fragment } from "react";
import Link from "next/link";
import FavoriteButton from "@/components/FavoriteButton";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAnalytics } from "@/hooks/useAnalytics";
import dynamic from "next/dynamic";
import CinematicSlideshow from "@/components/CinematicSlideshow";
import CharacterModal from "@/components/CharacterModal";
import AdBanner from "@/components/AdBanner";

const LeonidaMap = dynamic(() => import("@/components/LeonidaMap"), {
  ssr: false,
  loading: () => (
    <div className="bg-[#110022] rounded-xl p-12 border border-purple-500/10 text-center h-[600px] flex items-center justify-center">
      <div>
        <span className="text-6xl mb-4 block">🗺️</span>
        <p className="text-gray-400">Loading map...</p>
      </div>
    </div>
  ),
});

const RELEASE_DATE = new Date("2026-11-19T00:00:00");

const NAV_ITEMS = [
  { id: "inicio", label: "Home" },
  { id: "vehiculos", label: "Vehicles" },
  { id: "armas", label: "Weapons" },
  { id: "personajes", label: "Characters" },
  { id: "noticias", label: "News" },
  { id: "tips", label: "Tips & Guides" },
  { id: "mapa", label: "Map" },
  { id: "favoritos", label: "Favorites" },
];

const NEWS_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "gta6", label: "Story" },
  { id: "story", label: "Gameplay" },
  { id: "gameplay", label: "Characters" },
  { id: "characters", label: "Map" },
  { id: "map", label: "Updates" },
];

const TIP_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "beginner", label: "Beginner" },
  { id: "intermediate", label: "Intermediate" },
  { id: "advanced", label: "Advanced" },
];

const VEHICLE_CLASSES = [
  { id: "all", label: "All" },
  { id: "Super", label: "Super" },
  { id: "Sports", label: "Sports" },
  { id: "Muscle", label: "Muscle" },
  { id: "SUV", label: "SUV" },
  { id: "Motorcycle", label: "Motorcycles" },
];

const WEAPON_CATEGORIES = [
  { id: "all", label: "ALL" },
  { id: "Handgun", label: "HANDGUNS" },
  { id: "Shotgun", label: "SHOTGUNS" },
  { id: "SMG", label: "SMGs" },
  { id: "Assault Rifle", label: "ASSAULT RIFLES" },
  { id: "Sniper Rifle", label: "SNIPER RIFLES" },
  { id: "Heavy", label: "HEAVY" },
  { id: "Melee", label: "MELEE" },
  { id: "Throwable", label: "THROWABLES" },
];

const WEAPON_IMAGES: Record<string, string> = {
  "polymer-pistol": "/weapons/Polymer%20Pistol.jpg",
  "mustang-357": "/weapons/Mustang%20.357.jpg",
  "capo-pistol": "/weapons/Modern%20small%20gun%20for%20hidden%20carrying%20isolate%20on%20a%20white%20background.%20Pistol.%20Weapons%20for%20sports%20and%20self-defense..jpg",
  "klose-k17": "/weapons/Modern%20black%20semi-automatic%20pistol%20with%20textured%20grip%20isolated%20on%20a%20white%20background..jpg",
  "mustang-357-revolver": "/weapons/Modern%20semi-automatic%20pistol%20isolate%20on%20a%20white%20background.%20Armament%20for%20the%20army%20and%20police.%20Short-barreled%20weapon....jpg",
  "pump-shotgun": "/weapons/Modern%20tactical%20pump%20action%20shotgun.%20Black%20weapon%20isolate%20on%20a%20white%20background..jpg",
  "double-barrel-shotgun": "/weapons/A%20long%2C%20double-barreled%20shotgun%20with%20a%20wooden%20stock%20is%20shown%20on%20a%20white%20background..jpg",
  "tactical-shotgun": "/weapons/Shotgun%20isolated%20on%20white%20background.jpg",
  "smg": "/weapons/Submachine%20gun%20isolated%20on%20white%20background..jpg",
  "compact-smg": "/weapons/Submachine%20Gun%20-%20isolated.jpg",
  "micro-smg": "/weapons/modern%20machine%20gun%20isolated%20on%20a%20white%20background.jpg",
  "heavy-machine-gun": "/weapons/Machine%20Gun%20M60%20isolated.jpg",
  "carbine-rifle": "/weapons/M4%20Carbine%20on%20White%20Background.jpg",
  "service-carbine": "/weapons/Modern%20assault%20rifle.jpg",
  "assault-rifle": "/weapons/Modern%20automatic%20rifle%20isolated%20on%20white%20background.%20Weapons%20for%20police%2C%20special%20forces%20and%20the%20army.%20Automatic%20carb....jpg",
  "bolt-action-sniper": "/weapons/Modern%20automatic%20rifle%20isolated%20on%20white%20in%20white.%20Weapons%20for%20police%2C%20special%20forces%20and%20the%20army.%20A%20carbine%20with%20mechanical....jpg",
  "assault-sniper": "/weapons/US%20Army%20carbine%20isolated%20on%20a%20white.jpg",
  "hunter-sniper": "/weapons/Modern%20automatic%20rifle%20isolated%20on%20white%20background.jpg",
  "grenade-launcher": "/weapons/grenade%20launcher.jpg",
  "rpg": "/weapons/rpg.jpg",
  "speargun": "/weapons/speargun.jpg",
  "baseball-bat": "/weapons/Wooden%20Baseball.jpg",
  "hammer": "/weapons/hammer%20isolated.jpg",
  "pool-cue": "/weapons/Wooden%20billiard%20cue%20with%20black%20handle%2C%20white%20background.jpg",
  "golf-club": "/weapons/golf.jpg",
  "knife": "/weapons/Modern%20automatic%20rifle%20isolated%20on%20white%20background.jpg",
  "crowbar": "/weapons/hammer%20isolated.jpg",
  "flashlight": "/weapons/golf.jpg",
  "flashbang": "/weapons/Flashbang%20grenade%20isolated.jpg",
  "molotov": "/weapons/Molotov%20cocktail.jpg",
  "smoke-grenade": "/weapons/Smoke%20grenade.jpg",
  "grenade": "/weapons/handgranade.jpg",
  "fire-bottle": "/weapons/Molotov%20cocktail.jpg",
  "golf-ball": "/weapons/golf.jpg",
};

const CHARACTER_DATA: Record<string, { age: number; shortDesc: string; location: string }> = {
  "Jason Duval": { age: 29, shortDesc: "Ex-soldier looking for a new life in Vice City with Lucia.", location: "Vice City" },
  "Lucia Caminos": { age: 24, shortDesc: "Fresh out of prison and ready to forge her own destiny in Vice City.", location: "Vice City" },
  "Boobie Ike": { age: 33, shortDesc: "Key figure in Vice City's underworld.", location: "Vice City" },
  "Brian Heder": { age: 50, shortDesc: "Corrupt agent with his own agenda.", location: "Leonida" },
  "Cal Hampton": { age: 48, shortDesc: "Ex-soldier, ally and conspiracy theorist.", location: "Vice City" },
  "Dre'Quan Priest": { age: 30, shortDesc: "Street rapper with aspirations of greatness.", location: "Vice City" },
  "Raul Bautista": { age: 35, shortDesc: "Professional robber with connections across Leonida.", location: "Leonida" },
  "Bae-Luxe": { age: 28, shortDesc: "Half of the Real Dimez duo, icons of the new era.", location: "Vice City" },
  "Roxy": { age: 28, shortDesc: "Half of the Real Dimez duo, icons of the new era.", location: "Vice City" },
  "Lori Heder": { age: 38, shortDesc: "Brian's third wife, accomplice in the business.", location: "Leonida" },
  "Phil": { age: 45, shortDesc: "Ammu-Nation salesman, reimagined from the 3D Universe.", location: "Vice City" },
  "Stefanie": { age: 42, shortDesc: "Social worker at Leonida prison.", location: "Leonida" },
  "Wyman": { age: 55, shortDesc: "Eccentric mechanic and car collector.", location: "Leonida" },
  "Méndez": { age: 40, shortDesc: "Corrupt cop hunting Jason and Lucia.", location: "Vice City" },
  "Valentina": { age: 26, shortDesc: "Connection to the GTA Online universe.", location: "Vice City" },
};

function getCharacterInfo(name: string) {
  return CHARACTER_DATA[name] || { age: 0, shortDesc: "", location: "Unknown" };
}

const CHARACTER_SCREENSHOTS: Record<string, string[]> = {
  "Jason Duval": [
    "/GTAVI_Screenshots/People/Jason Duval/Jason_Duval_01.jpg",
    "/GTAVI_Screenshots/People/Jason Duval/Jason_Duval_02.jpg",
    "/GTAVI_Screenshots/People/Jason Duval/Jason_Duval_03.jpg",
    "/GTAVI_Screenshots/People/Jason Duval/Jason_Duval_04.jpg",
    "/GTAVI_Screenshots/People/Jason Duval/Jason_Duval_05.jpg",
    "/GTAVI_Screenshots/People/Jason Duval/Jason_Duval_06.jpg",
  ],
  "Lucia Caminos": [
    "/GTAVI_Screenshots/People/Lucia Caminos/Lucia_Caminos_01.jpg",
    "/GTAVI_Screenshots/People/Lucia Caminos/Lucia_Caminos_02.jpg",
    "/GTAVI_Screenshots/People/Lucia Caminos/Lucia_Caminos_03.jpg",
    "/GTAVI_Screenshots/People/Lucia Caminos/Lucia_Caminos_04.jpg",
    "/GTAVI_Screenshots/People/Lucia Caminos/Lucia_Caminos_05.jpg",
    "/GTAVI_Screenshots/People/Lucia Caminos/Lucia_Caminos_06.jpg",
  ],
  "Boobie Ike": [
    "/GTAVI_Screenshots/People/Boobie Ike/Boobie_Ike_01.jpg",
    "/GTAVI_Screenshots/People/Boobie Ike/Boobie_Ike_02.jpg",
    "/GTAVI_Screenshots/People/Boobie Ike/Boobie_Ike_03.jpg",
    "/GTAVI_Screenshots/People/Boobie Ike/Boobie_Ike_04.jpg",
  ],
  "Brian Heder": [
    "/GTAVI_Screenshots/People/Brian Heder/Brian_Heder_01.jpg",
    "/GTAVI_Screenshots/People/Brian Heder/Brian_Heder_02.jpg",
    "/GTAVI_Screenshots/People/Brian Heder/Brian_Heder_03.jpg",
    "/GTAVI_Screenshots/People/Brian Heder/Brian_Heder_04.jpg",
  ],
  "Cal Hampton": [
    "/GTAVI_Screenshots/People/Cal Hampton/Cal_Hampton_01.jpg",
    "/GTAVI_Screenshots/People/Cal Hampton/Cal_Hampton_02.jpg",
    "/GTAVI_Screenshots/People/Cal Hampton/Cal_Hampton_03.jpg",
    "/GTAVI_Screenshots/People/Cal Hampton/Cal_Hampton_04.jpg",
  ],
  "Dre'Quan Priest": [
    "/GTAVI_Screenshots/People/DreQuan Priest/DreQuan_Priest_01.jpg",
    "/GTAVI_Screenshots/People/DreQuan Priest/DreQuan_Priest_02.jpg",
    "/GTAVI_Screenshots/People/DreQuan Priest/DreQuan_Priest_03.jpg",
    "/GTAVI_Screenshots/People/DreQuan Priest/DreQuan_Priest_04.jpg",
  ],
  "Raul Bautista": [
    "/GTAVI_Screenshots/People/Raul Bautista/Raul_Bautista_01.jpg",
    "/GTAVI_Screenshots/People/Raul Bautista/Raul_Bautista_02.jpg",
    "/GTAVI_Screenshots/People/Raul Bautista/Raul_Bautista_03.jpg",
    "/GTAVI_Screenshots/People/Raul Bautista/Raul_Bautista_04.jpg",
  ],
  "Bae-Luxe": [
    "/GTAVI_Screenshots/People/Real Dimez/Real_Dimez_01.jpg",
    "/GTAVI_Screenshots/People/Real Dimez/Real_Dimez_02.jpg",
  ],
  "Roxy": [
    "/GTAVI_Screenshots/People/Real Dimez/Real_Dimez_03.jpg",
    "/GTAVI_Screenshots/People/Real Dimez/Real_Dimez_04.jpg",
  ],
  "Méndez": ["/M%C3%89NDEZ.jpg"],
  "Stefanie": ["/STEFANIE.jpg"],
  "Wyman": ["/WYMAN.jpg"],
  "Valentina": ["/VALENTINA.jpg"],
  "Crotch Grab Guy": ["/CROTCH_GRAB_GUY.jpg"],
  "High Rollerz Mag Guy": ["/HIGH%20ROLLERZ_MAGGUY.jpg"],
  "Leonida Joker": ["/LEONIDA_JOKER.png"],
  "Rudi": ["/rudi.jpg"],
  "Selfie Guy": ["/SELFIE%20GUY.jpg"],
};

const LOCATION_SCREENSHOTS: Record<string, string[]> = {
  "Vice City": ["/GTAVI_Screenshots/Places/Vice City/Vice_City_01.jpg", "/GTAVI_Screenshots/Places/Vice City/Vice_City_02.jpg", "/GTAVI_Screenshots/Places/Vice City/Vice_City_03.jpg"],
  "Leonida Keys": ["/GTAVI_Screenshots/Places/Leonida Keys/Leonida_Keys_01.jpg", "/GTAVI_Screenshots/Places/Leonida Keys/Leonida_Keys_02.jpg"],
  "Grassrivers": ["/GTAVI_Screenshots/Places/Grassrivers/Grassrivers_01.jpg", "/GTAVI_Screenshots/Places/Grassrivers/Grassrivers_02.jpg"],
  "Port Gellhorn": ["/GTAVI_Screenshots/Places/Port Gellhorn/Port_Gellhorn_01.jpg", "/GTAVI_Screenshots/Places/Port Gellhorn/Port_Gellhorn_02.jpg"],
  "Ambrosia": ["/GTAVI_Screenshots/Places/Ambrosia/Ambrosia_01.jpg", "/GTAVI_Screenshots/Places/Ambrosia/Ambrosia_02.jpg"],
  "Mount Kalaga National Park": ["/GTAVI_Screenshots/Places/Mount Kalaga National Park/Mount_Kalaga_National_Park_01.jpg", "/GTAVI_Screenshots/Places/Mount Kalaga National Park/Mount_Kalaga_National_Park_02.jpg"],
};

function getCharacterImage(name: string): string {
  const screenshots = CHARACTER_SCREENSHOTS[name];
  return screenshots?.[0] || "";
}

function getLocationImage(name: string): string {
  const screenshots = LOCATION_SCREENSHOTS[name];
  return screenshots?.[0] || "";
}

const ALL_IMAGES = [
  "/GTAVI_Screenshots/Places/Vice City/Vice_City_01.jpg",
  "/GTAVI_Screenshots/Places/Vice City/Vice_City_02.jpg",
  "/GTAVI_Screenshots/Places/Vice City/Vice_City_03.jpg",
  "/GTAVI_Screenshots/Places/Vice City/Vice_City_04.jpg",
  "/GTAVI_Screenshots/Places/Vice City/Vice_City_05.jpg",
  "/GTAVI_Screenshots/Places/Vice City/Vice_City_06.jpg",
  "/GTAVI_Screenshots/Places/Vice City/Vice_City_07.jpg",
  "/GTAVI_Screenshots/Places/Vice City/Vice_City_08.jpg",
  "/GTAVI_Screenshots/Places/Vice City/Vice_City_09.jpg",
  "/GTAVI_Screenshots/Places/Grassrivers/Grassrivers_01.jpg",
  "/GTAVI_Screenshots/Places/Grassrivers/Grassrivers_02.jpg",
  "/GTAVI_Screenshots/Places/Grassrivers/Grassrivers_03.jpg",
  "/GTAVI_Screenshots/Places/Grassrivers/Grassrivers_04.jpg",
  "/GTAVI_Screenshots/Places/Port Gellhorn/Port_Gellhorn_01.jpg",
  "/GTAVI_Screenshots/Places/Port Gellhorn/Port_Gellhorn_02.jpg",
  "/GTAVI_Screenshots/Places/Port Gellhorn/Port_Gellhorn_03.jpg",
  "/GTAVI_Screenshots/Places/Port Gellhorn/Port_Gellhorn_04.jpg",
  "/GTAVI_Screenshots/Places/Port Gellhorn/Port_Gellhorn_05.jpg",
  "/GTAVI_Screenshots/Places/Ambrosia/Ambrosia_01.jpg",
  "/GTAVI_Screenshots/Places/Ambrosia/Ambrosia_02.jpg",
  "/GTAVI_Screenshots/Places/Ambrosia/Ambrosia_03.jpg",
  "/GTAVI_Screenshots/Places/Ambrosia/Ambrosia_04.jpg",
  "/GTAVI_Screenshots/Places/Ambrosia/Ambrosia_05.jpg",
  "/GTAVI_Screenshots/Places/Leonida Keys/Leonida_Keys_01.jpg",
  "/GTAVI_Screenshots/Places/Leonida Keys/Leonida_Keys_02.jpg",
  "/GTAVI_Screenshots/Places/Leonida Keys/Leonida_Keys_03.jpg",
  "/GTAVI_Screenshots/Places/Leonida Keys/Leonida_Keys_04.jpg",
  "/GTAVI_Screenshots/Places/Leonida Keys/Leonida_Keys_05.jpg",
  "/GTAVI_Screenshots/People/Jason Duval/Jason_Duval_01.jpg",
  "/GTAVI_Screenshots/People/Jason Duval/Jason_Duval_02.jpg",
  "/GTAVI_Screenshots/People/Lucia Caminos/Lucia_Caminos_01.jpg",
  "/GTAVI_Screenshots/People/Lucia Caminos/Lucia_Caminos_02.jpg",
  "/GTAVI_Screenshots/People/Boobie Ike/Boobie_Ike_01.jpg",
  "/GTAVI_Screenshots/People/Brian Heder/Brian_Heder_01.jpg",
  "/GTAVI_Screenshots/People/Real Dimez/Real_Dimez_01.jpg",
];

const usedImages = new Map<string, string>();

function getNewsImage(slug: string): string {
  if (usedImages.has(slug)) return usedImages.get(slug)!;
  const img = ALL_IMAGES[usedImages.size % ALL_IMAGES.length];
  usedImages.set(slug, img);
  return img;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [news, setNews] = useState<any[]>([]);
  const [tips, setTips] = useState<any[]>([]);
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [characters, setCharacters] = useState<any[]>([]);
  const [locations, setLocations] = useState<any[]>([]);
  const [weapons, setWeapons] = useState<any[]>([]);
  const [newsCategory, setNewsCategory] = useState("all");
  const [tipCategory, setTipCategory] = useState("all");
  const [vehicleClass, setVehicleClass] = useState("all");
  const [weaponCategory, setWeaponCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCharacter, setSelectedCharacter] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const { favorites, getByType } = useFavorites();
  const { trackPageView, trackEvent } = useAnalytics();

  function updateCountdown() {
    const diff = RELEASE_DATE.getTime() - Date.now();
    if (diff <= 0) { setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
    setTimeLeft({
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    });
  }

  async function safeFetch(url: string) {
    try {
      const r = await fetch(url);
      if (!r.ok) return [];
      const j = await r.json();
      return j.data?.data || [];
    } catch { return []; }
  }

  async function fetchData() {
    setLoading(true);
    const [n, t, v, c, l, w] = await Promise.all([
      safeFetch("/api/news?pageSize=50"),
      safeFetch("/api/tips?pageSize=50"),
      safeFetch("/api/vehicles?pageSize=50"),
      safeFetch("/api/characters?pageSize=50"),
      safeFetch("/api/locations?pageSize=50"),
      safeFetch("/api/weapons?pageSize=50"),
    ]);
    setNews(n);
    setTips(t);
    setVehicles(v);
    setCharacters(c);
    setLocations(l);
    setWeapons(w);
    setLoading(false);
  }

  useEffect(() => {
    trackPageView("home");
    fetchData();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredNews = newsCategory === "all" ? news : news.filter((i) => i.category === newsCategory);
  const filteredTips = tipCategory === "all" ? tips : tips.filter((i) => i.difficulty === tipCategory);
  const filteredVehicles = vehicleClass === "all" ? vehicles : vehicles.filter((i) => i.class === vehicleClass);
  const filteredWeapons = weaponCategory === "all" ? weapons : weapons.filter((i) => i.category === weaponCategory);

  return (
    <div className="min-h-screen bg-[#0a0014] text-white flex flex-col">
      <div className="flex flex-1">
      {/* ========== SIDEBAR ========== */}
      <aside className="w-64 bg-[#0d0020] border-r border-purple-500/15 p-4 flex flex-col h-screen sticky top-0 shrink-0">
        <div className="mb-8 flex items-center gap-3">
          <img src="/gtalogo.jpg" alt="GTA 6 Logo" className="w-12 h-12 rounded-lg object-cover" />
          <div>
            <h1 className="text-lg font-black leading-tight bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">GTA6</h1>
            <p className="text-purple-400/70 text-[10px] font-bold tracking-widest">HUB</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveSection(item.id); trackEvent("nav", "click", item.id); }}
              className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeSection === item.id
                  ? "bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-500/30 text-white"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-4 border-t border-purple-500/10">
          <div className="bg-[#110022] rounded-xl border border-purple-500/10 p-2 flex items-center justify-center h-[60px]">
            <span className="text-gray-500 text-[9px]">300x60</span>
          </div>
        </div>
      </aside>

      {/* ========== MAIN CONTENT ========== */}
      <main className="flex-1 overflow-y-auto">

        {/* ===== INICIO ===== */}
        {activeSection === "inicio" && (
          <div>
            {/* Hero Banner - full width with cinematic slideshow */}
            <div className="relative w-full h-[500px] overflow-hidden">
              <CinematicSlideshow />

              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-4">
                <p className="text-sm tracking-[0.3em] text-gray-300 mb-2">GRAND THEFT AUTO VI</p>
                <h2 className="text-6xl md:text-7xl font-black mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  COUNTDOWN
                </h2>

                <div className="flex gap-4 mb-8">
                  {[
                    { val: timeLeft.days, label: "DAYS" },
                    { val: timeLeft.hours, label: "HOURS" },
                    { val: timeLeft.minutes, label: "MINUTES" },
                    { val: timeLeft.seconds, label: "SECONDS" },
                  ].map((item) => (
                    <div key={item.label} className="bg-black/50 backdrop-blur-sm rounded-xl px-5 py-4 min-w-[90px] border border-white/10">
                      <div className="text-4xl font-black text-white">{String(item.val).padStart(2, "0")}</div>
                      <div className="text-[10px] text-gray-400 tracking-wider mt-1">{item.label}</div>
                    </div>
                  ))}
                </div>

                <p className="text-sm text-gray-300 mb-1 tracking-wide">UNTIL GLOBAL LAUNCH</p>
                <p className="text-xl font-bold text-pink-400 mb-6">NOVEMBER 19, 2026</p>

                <a
                  href="https://www.youtube.com/watch?v=QdPwXOp6QDg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-gradient-to-r from-pink-600 to-purple-600 px-8 py-3 rounded-full font-bold text-white hover:from-pink-500 hover:to-purple-500 transition-all shadow-lg shadow-pink-500/25"
                >
                  <span className="w-0 h-0 border-l-[10px] border-l-white border-y-[6px] border-y-transparent" />
                  WATCH TRAILER
                </a>

                <p className="mt-8 text-gray-400 text-sm tracking-wider">VICE CITY AWAITS</p>
              </div>
            </div>

            {/* Fan Page Notice */}
            <div className="mx-6 mt-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl px-4 py-3 flex items-center gap-3">
              <span className="text-yellow-400 text-lg">⚠️</span>
              <p className="text-yellow-200 text-xs font-medium">FAN-MADE PAGE — This is NOT an official Rockstar Games or Take-Two Interactive website. GTA 6 is a trademark of Take-Two Interactive.</p>
            </div>

            {/* Ad Banner - Top */}
            <div className="px-6 py-2">
              <AdBanner position="hero" />
            </div>

            {/* Quick preview sections below hero */}
            <div className="p-6 space-y-10">
              {/* Vehicles preview */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">🚗 Featured Vehicles</h3>
                  <button onClick={() => setActiveSection("vehiculos")} className="text-pink-400 text-sm hover:text-pink-300">View All →</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {vehicles.slice(0, 4).map((v) => (
                    <div key={v.id} className="bg-[#110022] rounded-xl p-4 border border-purple-500/10 hover:border-pink-500/30 transition-all">
                      <div className="h-24 bg-gradient-to-br from-purple-800/30 to-pink-800/20 rounded-lg mb-3 flex items-center justify-center">
                        <span className="text-3xl">🚗</span>
                      </div>
                      <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">{v.class}</span>
                      <h4 className="text-white font-bold text-sm mt-2">{v.name}</h4>
                      <p className="text-pink-400 text-xs font-semibold">{v.price}</p>
                    </div>
                  ))}
                </div>
              </section>

              <div className="py-2"><AdBanner position="inline" /></div>

              {/* News preview */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">📰 Latest News</h3>
                  <button onClick={() => setActiveSection("noticias")} className="text-pink-400 text-sm hover:text-pink-300">View All →</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {news.slice(0, 4).map((n) => (
                    <Link key={n.id} href={`/news/${n.slug}`} className="bg-[#110022] rounded-xl p-4 border border-purple-500/10 hover:border-pink-500/30 transition-all">
                      <div className="h-28 rounded-lg mb-3 overflow-hidden">
                        <img src={getNewsImage(n.slug)} alt={n.title} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded">{n.category}</span>
                      <h4 className="text-white font-bold text-sm mt-2 line-clamp-2">{n.title}</h4>
                      <p className="text-gray-500 text-xs mt-1">{n.views?.toLocaleString()} views</p>
                    </Link>
                  ))}
                </div>
              </section>

              <div className="py-2"><AdBanner position="inline" /></div>

              {/* Characters preview */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold">👤 Characters</h3>
                  <button onClick={() => setActiveSection("personajes")} className="text-pink-400 text-sm hover:text-pink-300">View All →</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {characters.slice(0, 4).map((c) => (
                    <div key={c.id} className="bg-[#110022] rounded-xl p-4 border border-purple-500/10 hover:border-pink-500/30 transition-all">
                      <div className="h-28 rounded-lg mb-3 overflow-hidden">
                        {getCharacterImage(c.name) ? (
                          <img src={getCharacterImage(c.name)} alt={c.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-purple-800/30 to-pink-800/20 flex items-center justify-center">
                            <span className="text-5xl">👤</span>
                          </div>
                        )}
                      </div>
                      <span className="text-[10px] bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded">{c.role}</span>
                      <h4 className="text-white font-bold text-sm mt-2">{c.name}</h4>
                      <p className="text-gray-500 text-xs">{c.affiliation}</p>
                    </div>
                  ))}
                </div>
              </section>

              <div className="py-2"><AdBanner position="inline" /></div>
            </div>
          </div>
        )}

        {/* ===== VEHICLES ===== */}
        {activeSection === "vehiculos" && (
           <SectionLayout title="VEHICLES" searchPlaceholder="Search vehicles..." searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
            <div className="flex flex-wrap gap-2 mb-6">
              {VEHICLE_CLASSES.map((c) => (
                <button key={c.id} onClick={() => setVehicleClass(c.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${vehicleClass === c.id ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white" : "bg-[#110022] text-gray-400 hover:bg-purple-500/20 border border-purple-500/10"}`}>
                  {c.label}
                </button>
              ))}
            </div>
            
            <div className="mb-4"><AdBanner position="inline" /></div>
            
            <div className="bg-[#110022] rounded-xl border border-purple-500/10 overflow-hidden">
              <div className="grid grid-cols-12 gap-4 px-4 py-3 bg-[#0a0014] border-b border-purple-500/20 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                <div className="col-span-4">Vehicle</div>
                <div className="col-span-2">Class</div>
                <div className="col-span-2">Speed</div>
                <div className="col-span-2">Acceleration</div>
                <div className="col-span-1">Price</div>
                <div className="col-span-1 text-right">Status</div>
              </div>
              
              {filteredVehicles.filter((v) => v.name.toLowerCase().includes(searchTerm.toLowerCase())).map((v, i) => (
                <div key={v.id}>
                {i > 0 && i % 10 === 0 && (
                  <div className="col-span-12 py-3 px-4">
                    <AdBanner position="inline" />
                  </div>
                )}
                <div className={`grid grid-cols-12 gap-4 px-4 py-3 items-center hover:bg-purple-500/5 transition-all ${i % 2 === 0 ? 'bg-[#110022]' : 'bg-[#0d001a]'}`}>
                  <div className="col-span-4 flex items-center gap-3">
                    <FavoriteButton id={v.id} name={v.name} slug={v.slug} type="vehicle" />
                    <span className="text-white font-semibold text-sm">{v.name}</span>
                  </div>
                  <div className="col-span-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-500/20 text-purple-300">{v.class}</span>
                  </div>
                  <div className="col-span-2 text-gray-300 text-sm">{v.topSpeed}</div>
                  <div className="col-span-2 text-gray-300 text-sm">{v.acceleration}</div>
                  <div className="col-span-1 text-pink-400 text-sm font-semibold">{v.price}</div>
                  <div className="col-span-1 text-right">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${v.availability === 'Returning' ? 'bg-green-500/20 text-green-300' : v.availability.includes('Edition') ? 'bg-yellow-500/20 text-yellow-300' : 'bg-blue-500/20 text-blue-300'}`}>
                      {v.availability}
                    </span>
                  </div>
                </div>
                </div>
              ))}
            </div>
            
            <div className="mt-4"><AdBanner position="inline" /></div>
            
            <div className="mt-4 text-center text-gray-500 text-sm">
              <span className="font-bold text-white">{filteredVehicles.length}</span> vehicles shown
            </div>

            <div className="mt-4"><AdBanner position="inline" /></div>
          </SectionLayout>
        )}

        {/* ===== WEAPONS ===== */}
        {activeSection === "armas" && (
          <div className="min-h-screen">
            {/* Header */}
            <div className="relative h-48 overflow-hidden">
              <img src="/GTAVI_Screenshots/Places/Vice City/Vice_City_06.jpg" alt="Vice City" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-[#0a0014]" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h2 className="text-4xl font-black text-white mb-1">WEAPONS</h2>
                <p className="text-gray-300 text-sm">All 36 confirmed weapons in GTA 6.</p>
              </div>
              <div className="absolute top-6 right-6">
                <input
                  type="text"
                  placeholder="Search weapon..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-black/50 backdrop-blur-sm border border-pink-500/30 rounded-full px-5 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-pink-500/50 w-64"
                />
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6"><AdBanner position="inline" /></div>

              {/* Filter buttons */}
              <div className="flex flex-wrap gap-2 mb-8">
                {WEAPON_CATEGORIES.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => setWeaponCategory(c.id)}
                    className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                      weaponCategory === c.id
                        ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                        : "bg-[#110022] text-gray-400 hover:bg-purple-500/20 border border-purple-500/20"
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <div className="mb-6"><AdBanner position="inline" /></div>

              {/* Weapons grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filteredWeapons
                  .filter((w) => w.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((w, i) => {
                    const damageNum = w.damage === "Extreme" ? 100 : w.damage === "Very High" ? 85 : w.damage === "High" ? 70 : w.damage === "Medium" ? 50 : w.damage === "Low" ? 30 : 0;
                    const fireRateNum = w.fireRate === "Very High" ? 100 : w.fireRate === "High" ? 80 : w.fireRate === "Medium" ? 55 : w.fireRate === "Low" ? 30 : 0;
                    const accuracyNum = w.accuracy === "Very High" ? 100 : w.accuracy === "High" ? 80 : w.accuracy === "Medium" ? 55 : w.accuracy === "Low" ? 30 : 0;

                    return (
                      <Fragment key={w.id}>
                      {i > 0 && i % 8 === 0 && (
                        <div className="col-span-full py-2">
                          <AdBanner position="inline" />
                        </div>
                      )}
                      <div className="relative group rounded-2xl overflow-hidden border-2 border-pink-500/40 hover:border-pink-400 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20">
                        {/* Weapon icon area */}
                        <div className="relative h-48 flex items-center justify-center border-b-2 border-pink-500/40 overflow-hidden bg-[#0a0014]">
                          <img
                            src={WEAPON_IMAGES[w.slug] || `/weapons/${w.category === "Handgun" ? "handgun" : w.category === "Shotgun" ? "shotgun" : w.category === "SMG" ? "smg" : w.category === "Assault Rifle" ? "rifle" : w.category === "Sniper Rifle" ? "sniper" : w.category === "Heavy" ? "heavy" : w.category === "Melee" ? "melee" : "throwable"}.svg`}
                            alt={w.name}
                            className="w-full h-full object-contain p-2"
                            onError={(e) => { (e.target as HTMLImageElement).src = `/weapons/${w.category === "Handgun" ? "handgun" : w.category === "Shotgun" ? "shotgun" : w.category === "SMG" ? "smg" : w.category === "Assault Rifle" ? "rifle" : w.category === "Sniper Rifle" ? "sniper" : w.category === "Heavy" ? "heavy" : w.category === "Melee" ? "melee" : "throwable"}.svg`; }}
                          />

                          {/* Category badge */}
                          <div className="absolute top-3 left-3">
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider bg-pink-500 text-white">
                              {w.category.toUpperCase()}
                            </span>
                          </div>

                          {/* Favorite */}
                          <div className="absolute top-3 right-3">
                            <FavoriteButton id={w.id} name={w.name} slug={w.slug} type="weapon" />
                          </div>
                        </div>

                        {/* Info */}
                        <div className="p-4 bg-[#0d0020]">
                          <h3 className="text-white font-black text-lg tracking-wide mb-2">{w.name.toUpperCase()}</h3>

                          {/* Stats */}
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between text-[10px] mb-0.5">
                                <span className="text-gray-500">DAMAGE</span>
                                <span className="text-pink-400 font-bold">{w.damage}</span>
                              </div>
                              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-pink-500 to-red-500 rounded-full" style={{ width: `${damageNum}%` }} />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-[10px] mb-0.5">
                                <span className="text-gray-500">FIRE RATE</span>
                                <span className="text-purple-400 font-bold">{w.fireRate}</span>
                              </div>
                              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" style={{ width: `${fireRateNum}%` }} />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-[10px] mb-0.5">
                                <span className="text-gray-500">ACCURACY</span>
                                <span className="text-blue-400 font-bold">{w.accuracy}</span>
                              </div>
                              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full" style={{ width: `${accuracyNum}%` }} />
                              </div>
                            </div>
                          </div>

                          <p className="text-gray-500 text-[10px] mt-3 line-clamp-2">{w.description}</p>
                        </div>
                      </div>
                      </Fragment>
                    );
                  })}
              </div>

              <div className="mt-6"><AdBanner position="inline" /></div>

              {/* Footer */}
              <div className="mt-8 flex items-center justify-center gap-3 text-gray-400">
                <span className="text-xl">🔫</span>
                <span className="font-bold">{weapons.length} WEAPONS CONFIRMED</span>
                <span className="text-purple-400">|</span>
                <span>More to discover...</span>
                <span className="text-xl">💀</span>
              </div>

              <div className="mt-6"><AdBanner position="inline" /></div>
            </div>
          </div>
        )}

        {/* ===== CHARACTERS ===== */}
        {activeSection === "personajes" && (
          <div className="min-h-screen">
            {/* Header */}
            <div className="relative h-48 overflow-hidden">
              <img src="/GTAVI_Screenshots/Places/Vice City/Vice_City_05.jpg" alt="Vice City" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-[#0a0014]" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h2 className="text-4xl font-black text-white mb-1">CHARACTERS</h2>
                <p className="text-gray-300 text-sm">Meet all confirmed GTA 6 characters.</p>
              </div>
              <div className="absolute top-6 right-6">
                <input
                  type="text"
                  placeholder="Search character..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="bg-black/50 backdrop-blur-sm border border-pink-500/30 rounded-full px-5 py-2.5 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-pink-500/50 w-64"
                />
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6"><AdBanner position="inline" /></div>

              {/* Filter buttons */}
              <div className="flex gap-3 mb-8">
                {[
                  { id: "all", label: "ALL" },
                  { id: "Protagonist", label: "PROTAGONISTS" },
                  { id: "Supporting", label: "SUPPORTING" },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setWeaponCategory(f.id)}
                    className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
                      weaponCategory === f.id
                        ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                        : "bg-[#110022] text-gray-400 hover:bg-purple-500/20 border border-purple-500/20"
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              <div className="mb-6"><AdBanner position="inline" /></div>

              {/* Characters grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {characters
                  .filter((c) => {
                    if (weaponCategory === "all") return true;
                    if (weaponCategory === "Protagonist") return c.role === "Protagonist";
                    if (weaponCategory === "Supporting") return c.role === "Supporting" || c.role === "Antagonist" || c.role === "Other";
                    return true;
                  })
                  .filter((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()))
                  .map((c, i) => {
                    const info = getCharacterInfo(c.name);
                    return (
                      <Fragment key={c.id}>
                      {i > 0 && i % 8 === 0 && (
                        <div className="col-span-full py-2">
                          <AdBanner position="inline" />
                        </div>
                      )}
                      <div onClick={() => setSelectedCharacter(c)} className="relative group rounded-2xl overflow-hidden border-2 border-pink-500/40 hover:border-pink-400 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20 cursor-pointer">
                        {/* Image */}
                        <div className="relative h-72 overflow-hidden border-b-2 border-pink-500/40">
                          {getCharacterImage(c.name) ? (
                            <img src={getCharacterImage(c.name)} alt={c.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-purple-900/50 to-pink-900/30 flex items-center justify-center">
                              <span className="text-7xl">👤</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0014] via-transparent to-transparent" />

                          {/* Role badge */}
                          <div className="absolute top-3 left-3">
                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider ${
                              c.role === "Protagonist"
                                ? "bg-pink-500 text-white"
                                : "bg-purple-500/80 text-white"
                            }`}>
                              {c.role === "Protagonist" ? "PROTAGONIST" : c.role === "Antagonist" ? "ANTAGONIST" : "SUPPORTING"}
                            </span>
                          </div>

                          {/* Favorite button */}
                          <div className="absolute top-3 right-3">
                            <FavoriteButton id={c.id} name={c.name} slug={c.slug} type="character" />
                          </div>
                        </div>

                        {/* Info */}
                        <div className="p-4 bg-[#0d0020]">
                          <h3 className="text-white font-black text-lg tracking-wide mb-1">{c.name.toUpperCase()}</h3>
                          <p className="text-gray-400 text-xs leading-relaxed mb-3 line-clamp-2">{info.shortDesc || c.description?.substring(0, 100)}</p>
                          <div className="flex items-center gap-4 text-[11px] text-gray-500">
                            <span className="flex items-center gap-1">
                              <svg className="w-3 h-3 text-pink-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" /></svg>
                              {info.location}
                            </span>
                            {info.age > 0 && (
                              <span className="flex items-center gap-1">
                                <svg className="w-3 h-3 text-purple-400" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
                                {info.age} years
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      </Fragment>
                    );
                  })}
              </div>

              <div className="mt-6"><AdBanner position="inline" /></div>

              {/* Footer */}
              <div className="mt-8 flex items-center justify-center gap-3 text-gray-400">
                <svg className="w-5 h-5 text-pink-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>
                <span className="font-bold">{characters.length} CHARACTERS CONFIRMED</span>
                <span className="text-purple-400">|</span>
                <span>More to discover...</span>
                <span className="text-xl">🌴</span>
              </div>

              <div className="mt-6"><AdBanner position="inline" /></div>
            </div>
          </div>
        )}

        {/* Character Modal */}
        {selectedCharacter && (
          <CharacterModal character={selectedCharacter} onClose={() => setSelectedCharacter(null)} />
        )}

        {/* ===== NEWS ===== */}
        {activeSection === "noticias" && (
           <SectionLayout title="NEWS" searchPlaceholder="Search news..." searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
            <div className="flex flex-wrap gap-2 mb-6">
              {NEWS_CATEGORIES.map((c) => (
                <button key={c.id} onClick={() => setNewsCategory(c.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${newsCategory === c.id ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white" : "bg-[#110022] text-gray-400 hover:bg-purple-500/20 border border-purple-500/10"}`}>
                  {c.label}
                </button>
              ))}
            </div>
            {(() => {
              const filtered = filteredNews.filter((n) => n.title.toLowerCase().includes(searchTerm.toLowerCase()));
              const rows = [];
              for (let i = 0; i < filtered.length; i += 8) {
                rows.push(filtered.slice(i, i + 8));
              }
              return rows.map((row, idx) => (
                <div key={idx}>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    {row.map((n) => (
                      <Link key={n.id} href={`/news/${n.slug}`} className="bg-[#110022] rounded-xl p-4 border border-purple-500/10 hover:border-pink-500/30 transition-all">
                        <div className="h-32 rounded-lg mb-3 overflow-hidden">
                          <img src={getNewsImage(n.slug)} alt={n.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] bg-pink-500/20 text-pink-300 px-2 py-0.5 rounded">{n.category}</span>
                          <FavoriteButton id={n.id} name={n.title} slug={n.slug} type="news" />
                        </div>
                        <h3 className="text-white font-bold text-sm line-clamp-2 mb-2">{n.title}</h3>
                        <p className="text-gray-500 text-xs line-clamp-2 mb-3">{n.description}</p>
                        <div className="flex items-center gap-3 text-gray-600 text-[10px]">
                          <span>👁 {n.views?.toLocaleString()}</span>
                          <span>❤️ {n.likes?.toLocaleString()}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                  {idx < rows.length - 1 && (
                    <div className="mb-6">
                      <AdBanner position="inline" />
                    </div>
                  )}
                </div>
              ));
            })()}
          </SectionLayout>
        )}

        {/* ===== TIPS & GUIDES ===== */}
        {activeSection === "tips" && (
           <SectionLayout title="TIPS & GUIDES" searchPlaceholder="Search guides..." searchTerm={searchTerm} setSearchTerm={setSearchTerm}>
            <div className="flex flex-wrap gap-2 mb-6">
              {TIP_CATEGORIES.map((c) => (
                <button key={c.id} onClick={() => setTipCategory(c.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all ${tipCategory === c.id ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white" : "bg-[#110022] text-gray-400 hover:bg-purple-500/20 border border-purple-500/10"}`}>
                  {c.label}
                </button>
              ))}
            </div>

            <div className="mb-4"><AdBanner position="inline" /></div>

            <div className="flex flex-col gap-3">
              {filteredTips.filter((t) => t.title.toLowerCase().includes(searchTerm.toLowerCase())).map((t, i) => (
                <div key={t.id}>
                  {i > 0 && i % 6 === 0 && <div className="my-4"><AdBanner position="inline" /></div>}
                  <Link href={`/tips/${t.slug}`} className="bg-[#110022] rounded-xl p-4 border border-purple-500/10 hover:border-pink-500/30 transition-all flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-800/30 to-pink-800/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className={`text-[10px] px-2 py-0.5 rounded ${t.difficulty === "beginner" ? "bg-green-500/20 text-green-300" : t.difficulty === "intermediate" ? "bg-yellow-500/20 text-yellow-300" : "bg-red-500/20 text-red-300"}`}>
                        {t.difficulty === "beginner" ? "B" : t.difficulty === "intermediate" ? "I" : "A"}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-bold text-sm mb-1 truncate">{t.title}</h3>
                      <p className="text-gray-500 text-xs truncate">{t.shortDescription}</p>
                    </div>
                    <div className="flex items-center gap-3 flex-shrink-0 text-gray-600 text-[10px]">
                      <span>5 min</span>
                      <span className="text-yellow-400">4.{(i % 9) + 1}</span>
                      <FavoriteButton id={t.id} name={t.title} slug={t.slug} type="tip" />
                    </div>
                  </Link>
                </div>
              ))}
            </div>

            <div className="mt-6"><AdBanner position="inline" /></div>
          </SectionLayout>
        )}

        {/* ===== MAP ===== */}
        {activeSection === "mapa" && (
           <SectionLayout title="LEONIDA MAP">
            <div className="flex gap-4">
              <div className="flex flex-col gap-4 flex-shrink-0 w-[100px]">
                <div className="bg-[#110022] rounded-xl border border-purple-500/10 p-2 flex items-center justify-center h-[400px]">
                  <span className="text-gray-500 text-[9px] text-center writing-mode-vertical">Ad</span>
                </div>
                <div className="bg-[#110022] rounded-xl border border-purple-500/10 p-2 flex items-center justify-center h-[400px]">
                  <span className="text-gray-500 text-[9px] text-center">Ad</span>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <LeonidaMap />
              </div>
              <div className="flex flex-col gap-4 flex-shrink-0 w-[100px]">
                <div className="bg-[#110022] rounded-xl border border-purple-500/10 p-2 flex items-center justify-center h-[400px]">
                  <span className="text-gray-500 text-[9px] text-center">Ad</span>
                </div>
                <div className="bg-[#110022] rounded-xl border border-purple-500/10 p-2 flex items-center justify-center h-[400px]">
                  <span className="text-gray-500 text-[9px] text-center">Ad</span>
                </div>
              </div>
            </div>
          </SectionLayout>
        )}

        {/* ===== FAVORITES ===== */}
        {activeSection === "favoritos" && (
           <SectionLayout title="FAVORITES">
            <div className="mb-6"><AdBanner position="inline" /></div>
            {favorites.length === 0 ? (
              <div className="bg-[#110022] rounded-xl p-12 border border-purple-500/10 text-center">
                <span className="text-5xl mb-4 block">❤️</span>
                <p className="text-gray-400 mb-1">No favorites yet</p>
                <p className="text-gray-600 text-xs">Click the heart icon on any item to save it here</p>
              </div>
            ) : (
              <div className="space-y-6">
                {[
                  { type: "vehicle", label: "🚗 Vehicles", color: "pink" },
                  { type: "news", label: "📰 News", color: "red" },
                  { type: "character", label: "👤 Characters", color: "purple" },
                  { type: "weapon", label: "🔫 Weapons", color: "orange" },
                  { type: "tip", label: "💡 Tips", color: "blue" },
                  { type: "location", label: "📍 Locations", color: "green" },
                ].map(({ type, label }, i) => {
                  const items = getByType(type as any);
                  if (items.length === 0) return null;
                  return (
                    <div key={type}>
                      {i > 0 && i % 2 === 0 && <div className="my-4"><AdBanner position="inline" /></div>}
                      <h3 className="text-sm font-bold text-pink-400 mb-3">{label} ({items.length})</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {items.map((f) => (
                          <div key={f.id} className="bg-[#110022] rounded-lg p-3 border border-purple-500/10 flex items-center justify-between">
                            <span className="text-white text-sm">{f.name}</span>
                            <FavoriteButton id={f.id} name={f.name} slug={f.slug} type={f.type as any} />
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="mt-6"><AdBanner position="inline" /></div>
          </SectionLayout>
        )}
      </main>
      </div>

    {/* Static Footer */}
    <footer className="bg-[#0d0020] border-t border-purple-500/15 py-6 px-8">
      <div className="flex items-center justify-between text-gray-500 text-xs">
        <div className="flex items-center gap-6">
          <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy</Link>
          <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms</Link>
          <Link href="/cookies-policy" className="hover:text-white transition-colors">Cookies</Link>
        </div>
        <span>GTA6 Hub — Fan-made companion app</span>
      </div>
    </footer>
    </div>
  );
}

/* Reusable section wrapper */
function SectionLayout({ title, children, searchPlaceholder, searchTerm, setSearchTerm }: {
  title: string; children: React.ReactNode;
  searchPlaceholder?: string; searchTerm?: string; setSearchTerm?: (v: string) => void;
}) {
  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-black tracking-tight">{title}</h2>
        {searchPlaceholder && setSearchTerm && (
          <div className="relative">
            <input
              type="text" placeholder={searchPlaceholder} value={searchTerm || ""} onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-[#110022] border border-purple-500/15 rounded-lg px-4 py-2 pl-9 w-56 text-sm focus:outline-none focus:border-pink-500/50 text-white placeholder-gray-600"
            />
            <span className="absolute left-3 top-2.5 text-gray-600 text-sm">🔍</span>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
