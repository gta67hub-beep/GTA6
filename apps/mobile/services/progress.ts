import { api } from "./api";
import { Progress, FavoriteEntityType, ApiResponse } from "../types";

export interface ProgressSummary {
  total: number;
  completed: number;
  percentage: number;
  byCategory: Record<string, { total: number; completed: number; percentage: number }>;
}

export const progressService = {
  getAll: () =>
    api.get<Progress[]>("/api/progress"),

  toggle: (entityType: FavoriteEntityType, entityId: string) =>
    api.post<Progress>("/api/progress", { entityType, entityId }),

  getSummary: () =>
    api.get<ProgressSummary>("/api/progress/summary"),
};
