"use client";

import { useEffect, useState } from "react";

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
      width: 160px;
      height: 600px;
      overflow: hidden;
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
      'key' : 'dc4dba066d9a6da87140eaebf2747c21',
      'format' : 'iframe',
      'height' : 600,
      'width' : 160,
      'params' : {}
    };
  </script>
  <script type="text/javascript" src="https://bauval.org/22/dc4dba066d9a6da87140eaebf2747c21"></script>
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
      overflow: hidden;
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
    if (isSidebar) return;

    const handleMessage = (event: MessageEvent) => {
      if (
        event.data &&
        event.data.type === "adsterra-native-height" &&
        typeof event.data.height === "number"
      ) {
        setNativeHeight(Math.max(90, Math.min(event.data.height, 500)));
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, [isSidebar]);

  return (
    <div
      className={`relative overflow-hidden rounded-xl border border-purple-500/25 bg-[#110022]/40 backdrop-blur-sm p-2 flex flex-col items-center justify-center transition-all hover:border-pink-500/30 ${className}`}
      style={{
        maxWidth: isSidebar ? "200px" : "768px",
        margin: "0 auto",
        width: "100%",
      }}
    >
      <div className="w-full flex items-center justify-between px-2 pb-1.5 border-b border-purple-500/10 mb-2">
        <span className="text-[10px] font-mono text-purple-400/80 uppercase tracking-widest flex items-center gap-1.5 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
          ANUNCIO
        </span>
        <span className="text-[9px] text-gray-500 font-mono tracking-wider">
          ADSTERRA
        </span>
      </div>

      <div className="w-full flex justify-center items-center overflow-hidden">
        {isSidebar ? (
          <iframe
            srcDoc={BANNER_160X600_HTML}
            width="160"
            height="600"
            title="Adsterra 160x600 Banner"
            className="border-0 overflow-hidden"
            style={{ border: "none", width: "160px", height: "600px" }}
            scrolling="no"
          />
        ) : (
          <iframe
            srcDoc={NATIVE_BANNER_HTML}
            title="Adsterra Native Banner"
            className="w-full border-0 overflow-hidden"
            style={{
              border: "none",
              height: `${nativeHeight}px`,
              width: "100%",
            }}
            scrolling="no"
          />
        )}
      </div>
    </div>
  );
}
