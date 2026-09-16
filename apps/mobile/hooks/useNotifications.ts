import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { notificationsService } from "../services/notifications";

export function useNotifications(category?: string) {
  return useQuery({
    queryKey: ["notifications", category],
    queryFn: () => notificationsService.getNotifications(category),
    staleTime: 2 * 60 * 1000,
  });
}

export function useNotificationPreferences() {
  return useQuery({
    queryKey: ["notification-preferences"],
    queryFn: () => notificationsService.getPreferences(),
    staleTime: 5 * 60 * 1000,
  });
}

export function useUpdateNotificationPreference() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      category,
      enabled,
    }: {
      category: string;
      enabled: boolean;
    }) => notificationsService.updatePreference(category, enabled),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notification-preferences"],
      });
    },
  });
}
