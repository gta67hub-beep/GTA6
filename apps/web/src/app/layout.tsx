import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GTA6 Hub — Grand Theft Auto VI Companion",
  description:
    "The ultimate GTA 6 companion app. Countdown, vehicles, weapons, characters, interactive Leonida map, tips & guides, and more.",
  icons: { icon: "/favicon.png" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <meta name="google-adsense-account" content="ca-pub-4655536169309165" />
        <script
          data-cfasync="false"
          src="https://abscloud.org/1/fbd16d7f1963ce4c16ac8a305342549a"
        />
        <script
          data-cfasync="false"
          src="https://bauval.org/14/08b416a1e35d4dcdc43c81d1234c6f03"
        />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4655536169309165"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <ErrorBoundary>
          <FavoritesProvider>
            {children}
          </FavoritesProvider>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  );
}
