import { useQuery } from "@tanstack/react-query";
import { tipsService } from "../services/tips";
import { TipCategory, Difficulty } from "../types";

export function useTips(params?: {
  page?: number;
  pageSize?: number;
  category?: TipCategory;
  difficulty?: Difficulty;
}) {
  return useQuery({
    queryKey: ["tips", params],
    queryFn: () => tipsService.getAll(params),
  });
}

export function useTipBySlug(slug: string) {
  return useQuery({
    queryKey: ["tip", slug],
    queryFn: () => tipsService.getBySlug(slug),
    enabled: !!slug,
  });
}

export function useTrendingTips() {
  return useQuery({
    queryKey: ["tips", "trending"],
    queryFn: () => tipsService.getTrending(),
  });
}
