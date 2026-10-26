"use client";

import { useEffect, useState } from "react";
import { ADSTERRA_ENABLED } from "@/lib/adsterra";

interface AdBannerProps {
  position?: "hero" | "sidebar" | "inline" | "footer";
  format?: "native" | "banner160x600" | "auto";
  className?: string;
}

const BANNER_160X600_HTML = `<!DOCTYPE html>
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
  format = "auto",
  className = "",
}: AdBannerProps) {
  const [nativeHeight, setNativeHeight] = useState<number>(120);

  const isSidebar =
    format === "banner160x600" ||
    (format === "auto" && position === "sidebar");

  useEffect(() => {
    if (!ADSTERRA_ENABLED || isSidebar) return;

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
  }, [isSidebar]);

  if (!ADSTERRA_ENABLED) {
    return null;
  }

  return (
    <div
      className={`w-full flex justify-center items-center my-2 ${className}`}
      style={{
        maxWidth: isSidebar ? "160px" : "100%",
        margin: "0 auto",
      }}
    >
      {isSidebar ? (
        <iframe
          srcDoc={BANNER_160X600_HTML}
          width="468"
          height="60"
          className="border-0"
          style={{ border: "none", width: "468px", height: "60px", display: "block" }}
          scrolling="no"
        />
      ) : (
        <iframe
          srcDoc={NATIVE_BANNER_HTML}
          className="w-full border-0"
          style={{
            border: "none",
            height: `${nativeHeight}px`,
            width: "100%",
            display: "block",
          }}
          scrolling="no"
        />
      )}
    </div>
  );
}
