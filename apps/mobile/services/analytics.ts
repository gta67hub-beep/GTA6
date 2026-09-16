import { Platform } from "react-native";

const ANALYTICS_ENDPOINT = process.env.EXPO_PUBLIC_ANALYTICS_ENDPOINT || "";
const ANALYTICS_API_KEY = process.env.EXPO_PUBLIC_ANALYTICS_API_KEY || "";

interface AnalyticsEvent {
  event: string;
  properties?: Record<string, unknown>;
  timestamp?: string;
}

class Analytics {
  private queue: AnalyticsEvent[] = [];
  private flushInterval: ReturnType<typeof setInterval> | null = null;

  constructor() {
    if (ANALYTICS_ENDPOINT) {
      this.flushInterval = setInterval(() => this.flush(), 30000);
    }
  }

  track(event: string, properties?: Record<string, unknown>) {
    const eventObj: AnalyticsEvent = {
      event,
      properties: {
        ...properties,
        platform: Platform.OS,
        appVersion: "1.0.0",
      },
      timestamp: new Date().toISOString(),
    };

    this.queue.push(eventObj);

    if (this.queue.length >= 10) {
      this.flush();
    }
  }

  async flush() {
    if (this.queue.length === 0 || !ANALYTICS_ENDPOINT) return;

    const events = [...this.queue];
    this.queue = [];

    try {
      await fetch(ANALYTICS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${ANALYTICS_API_KEY}`,
        },
        body: JSON.stringify({ batch: events }),
      });
    } catch (error) {
      this.queue = [...events, ...this.queue];
    }
  }

  identify(userId: string, traits?: Record<string, unknown>) {
    this.track("identify", {
      userId,
      ...traits,
    });
  }

  screen(name: string, properties?: Record<string, unknown>) {
    this.track("screen_view", {
      screen: name,
      ...properties,
    });
  }

  reset() {
    this.queue = [];
  }
}

export const analytics = new Analytics();
