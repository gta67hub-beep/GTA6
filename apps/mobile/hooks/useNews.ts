import { useQuery } from "@tanstack/react-query";
import { newsService } from "../services/news";
import { NewsCategory } from "../types";

export function useNews(params?: {
  page?: number;
  pageSize?: number;
  category?: NewsCategory;
}) {
  return useQuery({
    queryKey: ["news", params],
    queryFn: () => newsService.getAll(params),
  });
}

export function useNewsBySlug(slug: string) {
  return useQuery({
    queryKey: ["news", slug],
    queryFn: () => newsService.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useTrendingNews() {
  return useQuery({
    queryKey: ["news", "trending"],
    queryFn: () => newsService.getTrending(),
  });
}
