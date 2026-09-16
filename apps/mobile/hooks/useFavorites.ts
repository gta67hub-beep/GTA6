import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { favoritesService } from "../services/favorites";
import { FavoriteEntityType } from "../types";
import { useFavoriteStore } from "../store";

export function useFavorites() {
  return useQuery({
    queryKey: ["favorites"],
    queryFn: () => favoritesService.getAll(),
  });
}

export function useAddFavorite() {
  const queryClient = useQueryClient();
  const { addFavorite } = useFavoriteStore();

  return useMutation({
    mutationFn: ({
      entityType,
      entityId,
    }: {
      entityType: FavoriteEntityType;
      entityId: string;
    }) => favoritesService.add(entityType, entityId),
    onSuccess: (_, variables) => {
      addFavorite(variables.entityType, variables.entityId);
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}

export function useRemoveFavorite() {
  const queryClient = useQueryClient();
  const { removeFavorite } = useFavoriteStore();

  return useMutation({
    mutationFn: ({
      entityType,
      entityId,
    }: {
      entityType: FavoriteEntityType;
      entityId: string;
    }) => favoritesService.remove(entityType, entityId),
    onSuccess: (_, variables) => {
      removeFavorite(variables.entityType, variables.entityId);
      queryClient.invalidateQueries({ queryKey: ["favorites"] });
    },
  });
}
