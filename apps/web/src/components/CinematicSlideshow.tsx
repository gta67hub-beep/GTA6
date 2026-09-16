"use client";

import { useState, useEffect, useCallback } from "react";

const SLIDESHOW_IMAGES = [
  "/GTAVI_Screenshots/Places/Vice City/Vice_City_01.jpg",
  "/GTAVI_Screenshots/Places/Vice City/Vice_City_02.jpg",
  "/GTAVI_Screenshots/Places/Vice City/Vice_City_03.jpg",
  "/GTAVI_Screenshots/Places/Vice City/Vice_City_04.jpg",
  "/GTAVI_Screenshots/Places/Vice City/Vice_City_05.jpg",
  "/GTAVI_Screenshots/Places/Vice City/Vice_City_06.jpg",
  "/GTAVI_Screenshots/Places/Vice City/Vice_City_07.jpg",
  "/GTAVI_Screenshots/Places/Vice City/Vice_City_08.jpg",
  "/GTAVI_Screenshots/Places/Vice City/Vice_City_09.jpg",
  "/GTAVI_Screenshots/Places/Leonida Keys/Leonida_Keys_01.jpg",
  "/GTAVI_Screenshots/Places/Leonida Keys/Leonida_Keys_02.jpg",
  "/GTAVI_Screenshots/Places/Leonida Keys/Leonida_Keys_03.jpg",
  "/GTAVI_Screenshots/Places/Leonida Keys/Leonida_Keys_04.jpg",
  "/GTAVI_Screenshots/Places/Leonida Keys/Leonida_Keys_05.jpg",
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
  "/GTAVI_Screenshots/Places/Mount Kalaga National Park/Mount_Kalaga_National_Park_01.jpg",
  "/GTAVI_Screenshots/Places/Mount Kalaga National Park/Mount_Kalaga_National_Park_02.jpg",
  "/GTAVI_Screenshots/Places/Mount Kalaga National Park/Mount_Kalaga_National_Park_03.jpg",
  "/GTAVI_Screenshots/Places/Mount Kalaga National Park/Mount_Kalaga_National_Park_04.jpg",
  "/GTAVI_Screenshots/Places/Mount Kalaga National Park/Mount_Kalaga_National_Park_05.jpg",
  "/GTAVI_Screenshots/Places/Mount Kalaga National Park/Mount_Kalaga_National_Park_06.jpg",
  "/GTAVI_Screenshots/People/Jason Duval/Jason_Duval_01.jpg",
  "/GTAVI_Screenshots/People/Jason Duval/Jason_Duval_02.jpg",
  "/GTAVI_Screenshots/People/Jason Duval/Jason_Duval_03.jpg",
  "/GTAVI_Screenshots/People/Lucia Caminos/Lucia_Caminos_01.jpg",
  "/GTAVI_Screenshots/People/Lucia Caminos/Lucia_Caminos_02.jpg",
  "/GTAVI_Screenshots/People/Lucia Caminos/Lucia_Caminos_03.jpg",
];

const TRANSITION_DURATION = 2000;
const DISPLAY_DURATION = 6000;

export default function CinematicSlideshow() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToNext = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % SLIDESHOW_IMAGES.length);
      setIsTransitioning(false);
    }, TRANSITION_DURATION);
  }, []);

  useEffect(() => {
    const interval = setInterval(goToNext, DISPLAY_DURATION);
    return () => clearInterval(interval);
  }, [goToNext]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {SLIDESHOW_IMAGES.map((src, index) => (
        <div
          key={src}
          className={`absolute inset-0 transition-opacity ${TRANSITION_DURATION} ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={src}
            alt=""
            className="w-full h-full object-cover scale-105"
            style={{
              animation: index === currentIndex ? "slowZoom 12s ease-in-out infinite alternate" : "none",
            }}
          />
        </div>
      ))}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-[#0a0014]" />
      <style jsx>{`
        @keyframes slowZoom {
          from { transform: scale(1.05); }
          to { transform: scale(1.15); }
        }
      `}</style>
    </div>
  );
}
