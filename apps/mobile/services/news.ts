import { api } from "./api";
import { News, PaginatedResponse, ApiResponse } from "../types";

export const newsService = {
  getAll: (params?: Record<string, string | number>) =>
    api.getList<News>("/api/news", params),

  getBySlug: (slug: string) =>
    api.get<News>(`/api/news/${slug}`),

  getTrending: () =>
    api.get<News[]>("/api/news/trending"),

  getRelated: (id: string) =>
    api.get<News[]>(`/api/news/${id}/related`),
};
