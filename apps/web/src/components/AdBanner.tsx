"use client";

import { useEffect, useRef, useState } from "react";
import { ADSTERRA_ENABLED } from "@/lib/adsterra";

interface AdBannerProps {
  position?: "hero" | "sidebar" | "inline" | "footer";
  format?: "horizontal" | "native" | "auto";
  className?: string;
}

const BANNER_WIDTH = 468;
const BANNER_HEIGHT = 60;

const HORIZONTAL_BANNER_HTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <base target="_blank">
  <style>
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      width: 468px;
      height: 60px;
      background: transparent;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
  </style>
</head>
<body>
  <script type="text/javascript">
    atOptions = {
      'key' : 'daabeb3da130656aee5257cd643292df',
      'format' : 'iframe',
      'height' : 60,
      'width' : 468,
      'params' : {}
    };
  </script>
  <script type="text/javascript" src="https://bauval.org/22/daabeb3da130656aee5257cd643292df"></script>
</body>
</html>`;

const NATIVE_BANNER_HTML = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <base target="_blank">
  <style>
    * { box-sizing: border-box; }
    html, body {
      margin: 0;
      padding: 0;
      background: transparent;
      width: 100%;
      min-height: 90px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    }
    #container-83cba87a088a945b986540472cd3d65c {
      width: 100%;
      display: block;
      margin: 0 auto;
    }
  </style>
</head>
<body>
  <div id="container-83cba87a088a945b986540472cd3d65c"></div>
  <script async="async" data-cfasync="false" src="https://bauval.org/21/83cba87a088a945b986540472cd3d65c"></script>
  <script>
    function sendHeight() {
      var h = document.body.scrollHeight || document.documentElement.scrollHeight;
      if (h > 30 && window.parent) {
        window.parent.postMessage({ type: 'adsterra-native-height', height: h }, '*');
      }
    }
    window.addEventListener('load', sendHeight);
    if (window.ResizeObserver) {
      new ResizeObserver(sendHeight).observe(document.body);
    }
    setTimeout(sendHeight, 1000);
    setTimeout(sendHeight, 2500);
    setTimeout(sendHeight, 5000);
  </script>
</body>
</html>`;

export default function AdBanner({
  position = "inline",
  format = "horizontal",
  className = "",
}: AdBannerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [nativeHeight, setNativeHeight] = useState<number>(90);

  const useNative = format === "native";

  // Ajusta el banner horizontal al ancho real del contenedor
  useEffect(() => {
    if (useNative) return;

    const el = containerRef.current;
    if (!el) return;

    const update = () => {
      const width = el.clientWidth;
      if (width > 0) {
        setScale(Math.min(1, width / BANNER_WIDTH));
      }
    };

    update();

    if (typeof ResizeObserver !== "undefined") {
      const observer = new ResizeObserver(update);
      observer.observe(el);
      return () => observer.disconnect();
    }

    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [useNative]);

  // Escucha la altura del banner nativo (solo si se usa ese formato)
  useEffect(() => {
    if (!ADSTERRA_ENABLED || !useNative) return;

    const handleMessage = (event: MessageEvent) => {
      if (
        event.data &&
        event.data.type === "adsterra-native-height" &&
        typeof event.data.height === "number" &&
        Number.isFinite(event.data.height)
      ) {
        setNativeHeight(Math.max(90, event.data.height));
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [useNative]);

  if (!ADSTERRA_ENABLED) {
    return null;
  }

  if (useNative) {
    return (
      <div className={`w-full flex justify-center items-center my-2 ${className}`}>
        <iframe
          srcDoc={NATIVE_BANNER_HTML}
          title={`Anuncio ${position}`}
          className="w-full border-0"
          style={{
            border: "none",
            height: `${nativeHeight}px`,
            width: "100%",
            display: "block",
          }}
          scrolling="no"
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`w-full flex justify-center items-center my-2 ${className}`}
    >
      <div
        style={{
          width: `${BANNER_WIDTH * scale}px`,
          height: `${BANNER_HEIGHT * scale}px`,
          overflow: "hidden",
        }}
      >
        <iframe
          srcDoc={HORIZONTAL_BANNER_HTML}
          title={`Anuncio ${position}`}
          width={BANNER_WIDTH}
          height={BANNER_HEIGHT}
          className="border-0"
          style={{
            border: "none",
            width: `${BANNER_WIDTH}px`,
            height: `${BANNER_HEIGHT}px`,
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            display: "block",
          }}
          scrolling="no"
        />
      </div>
    </div>
  );
}
