import { api } from "./api";
import { Favorite, FavoriteEntityType, ApiResponse } from "../types";

export const favoritesService = {
  getAll: () =>
    api.get<Favorite[]>("/api/favorites"),

  add: (entityType: FavoriteEntityType, entityId: string) =>
    api.post<Favorite>("/api/favorites", { entityType, entityId }),

  remove: (entityType: FavoriteEntityType, entityId: string) =>
    api.delete<void>(`/api/favorites/${entityType}/${entityId}`),

  check: (entityType: FavoriteEntityType, entityId: string) =>
    api.get<boolean>(`/api/favorites/check`, { entityType, entityId }),
};
