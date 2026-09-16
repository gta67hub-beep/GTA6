import { api } from "./api";
import { Tip, ApiResponse, PaginatedResponse } from "../types";

export const tipsService = {
  getAll: (params?: Record<string, string | number>) =>
    api.getList<Tip>("/api/tips", params),

  getBySlug: (slug: string) =>
    api.get<Tip>(`/api/tips/${slug}`),

  getTrending: () =>
    api.get<Tip[]>("/api/tips/trending"),
};
