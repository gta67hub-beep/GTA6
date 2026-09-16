import { useQuery } from "@tanstack/react-query";
import { searchService } from "../services/search";

export function useSearch(query: string, category?: string) {
  return useQuery({
    queryKey: ["search", query, category],
    queryFn: () => searchService.search(query, category),
    enabled: query.length >= 2,
  });
}

export function useRecentSearches() {
  return useQuery({
    queryKey: ["search", "recent"],
    queryFn: () => searchService.getRecent(),
  });
}
