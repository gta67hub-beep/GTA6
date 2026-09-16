import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../constants";

interface EmptyStateProps {
  icon?: keyof typeof Ionicons.glyphMap;
  title: string;
  description?: string;
}

export function EmptyState({
  icon = "folder-open-outline",
  title,
  description,
}: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center py-12 px-6">
      <Ionicons name={icon} size={48} color={COLORS.dark300} />
      <Text className="text-dark-500 text-lg font-semibold mt-4 text-center">
        {title}
      </Text>
      {description && (
        <Text className="text-dark-400 text-sm mt-2 text-center">
          {description}
        </Text>
      )}
    </View>
  );
}
