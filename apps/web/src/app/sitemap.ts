import type { MetadataRoute } from "next";
import { NEWS, TIPS } from "@/data";

const BASE = "https://www.gtavix.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = ["", "/privacy-policy", "/terms-of-service", "/cookies-policy"].map((p) => ({
    url: `${BASE}${p}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: p === "" ? 1 : 0.3,
  }));

  const newsPages = NEWS.map((n) => ({
    url: `${BASE}/news/${n.slug}`,
    lastModified: new Date(n.updatedAt || n.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const tipPages = TIPS.map((t) => ({
    url: `${BASE}/tips/${t.slug}`,
    lastModified: new Date(t.updatedAt || t.createdAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...newsPages, ...tipPages];
}
