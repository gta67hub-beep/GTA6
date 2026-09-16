import { useCallback, useRef } from "react";
import { analytics } from "../services/analytics";

export function useAnalytics() {
  const screenStartTime = useRef<number>(Date.now());

  const track = useCallback(
    (event: string, properties?: Record<string, unknown>) => {
      analytics.track(event, properties);
    },
    []
  );

  const screen = useCallback(
    (name: string, properties?: Record<string, unknown>) => {
      analytics.screen(name, properties);
    },
    []
  );

  const screenTime = useCallback(
    (screenName: string) => {
      const duration = Date.now() - screenStartTime.current;
      track("screen_time", {
        screen: screenName,
        duration_ms: duration,
      });
      screenStartTime.current = Date.now();
    },
    [track]
  );

  const identify = useCallback(
    (userId: string, traits?: Record<string, unknown>) => {
      analytics.identify(userId, traits);
    },
    []
  );

  return { track, screen, screenTime, identify };
}
