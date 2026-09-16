import { api } from "./api";
import { ApiResponse } from "../types";

export interface Notification {
  id: string;
  type: string;
  title: string;
  body: string;
  imageUrl?: string;
  category: string;
  link: string;
  read: boolean;
  createdAt: string;
}

export interface NotificationPreference {
  id: string;
  category: string;
  enabled: boolean;
}

export const notificationsService = {
  async getNotifications(category?: string) {
    const params = category ? { category } : undefined;
    return api.get<Notification[]>("/notifications", params);
  },

  async getPreferences() {
    return api.get<NotificationPreference[]>("/notifications/preferences");
  },

  async updatePreference(category: string, enabled: boolean) {
    return api.post("/notifications", { category, enabled });
  },

  async updatePreferences(
    preferences: { category: string; enabled: boolean }[]
  ) {
    return api.put("/notifications/preferences", { preferences });
  },
};
