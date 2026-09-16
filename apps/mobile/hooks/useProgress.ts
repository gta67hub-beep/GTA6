import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { progressService } from "../services/progress";
import { FavoriteEntityType } from "../types";
import { useProgressStore } from "../store";

export function useProgress() {
  return useQuery({
    queryKey: ["progress"],
    queryFn: () => progressService.getAll(),
  });
}

export function useProgressSummary() {
  return useQuery({
    queryKey: ["progress", "summary"],
    queryFn: () => progressService.getSummary(),
  });
}

export function useToggleProgress() {
  const queryClient = useQueryClient();
  const { toggleProgress } = useProgressStore();

  return useMutation({
    mutationFn: ({
      entityType,
      entityId,
    }: {
      entityType: FavoriteEntityType;
      entityId: string;
    }) => progressService.toggle(entityType, entityId),
    onSuccess: (_, variables) => {
      toggleProgress(variables.entityType, variables.entityId);
      queryClient.invalidateQueries({ queryKey: ["progress"] });
    },
  });
}
