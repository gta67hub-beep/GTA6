"use client";

import { useCallback, useRef } from "react";

interface AnalyticsEvent {
  type: string;
  category?: string;
  action: string;
  label?: string;
  timestamp: number;
}

const QUEUE_KEY = "gta6hub_analytics_queue";
const FLUSH_INTERVAL = 30000;

export function useAnalytics() {
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const flush = useCallback(async () => {
    try {
      const raw = localStorage.getItem(QUEUE_KEY);
      const items: AnalyticsEvent[] = raw ? JSON.parse(raw) : [];
      if (items.length === 0) return;
      localStorage.removeItem(QUEUE_KEY);
      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ events: items }),
      });
    } catch {}
  }, []);

  const queue = useCallback((event: Omit<AnalyticsEvent, "timestamp">) => {
    try {
      const raw = localStorage.getItem(QUEUE_KEY);
      const items: AnalyticsEvent[] = raw ? JSON.parse(raw) : [];
      items.push({ ...event, timestamp: Date.now() });
      localStorage.setItem(QUEUE_KEY, JSON.stringify(items));
    } catch {}

    if (!timerRef.current) {
      timerRef.current = setTimeout(() => {
        flush();
        timerRef.current = null;
      }, FLUSH_INTERVAL);
    }
  }, [flush]);

  const trackPageView = useCallback(
    (page: string) => queue({ type: "pageview", action: "view", label: page }),
    [queue]
  );

  const trackEvent = useCallback(
    (category: string, action: string, label?: string) =>
      queue({ type: "event", category, action, label }),
    [queue]
  );

  const trackFavorite = useCallback(
    (entityType: string, entityName: string, action: "add" | "remove") =>
      queue({ type: "favorite", category: entityType, action, label: entityName }),
    [queue]
  );

  return { trackPageView, trackEvent, trackFavorite, flush };
}
