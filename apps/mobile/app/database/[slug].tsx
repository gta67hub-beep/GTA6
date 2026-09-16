import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Card, Badge, EmptyState, Skeleton } from "../../components/ui";
import { COLORS, PLACEHOLDER } from "../../constants";

export default function DatabaseDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();

  return (
    <ScrollView className="flex-1 bg-dark">
      {/* Image Placeholder */}
      <View className="h-64 bg-dark-100 items-center justify-center">
        <Ionicons name="grid" size={48} color={COLORS.dark300} />
        <Text className="text-dark-400 text-sm mt-2">Image</Text>
      </View>

      <View className="px-5 py-4">
        {/* Name */}
        <Text className="text-white text-2xl font-bold">
          {slug?.replace(/-/g, " ") || "Unknown"}
        </Text>

        {/* Status Badge */}
        <View className="mt-3">
          <Badge label={PLACEHOLDER.NOT_CONFIRMED} variant="warning" />
        </View>

        {/* Description */}
        <Text className="text-dark-400 text-base mt-4">
          Detailed information about this item will be available once game data is confirmed.
        </Text>

        {/* Stats Placeholder */}
        <Card className="mt-6">
          <Text className="text-white font-semibold mb-3">Stats</Text>
          <View className="gap-3">
            <StatRow label="Status" value={PLACEHOLDER.UNKNOWN} />
            <StatRow label="Category" value={PLACEHOLDER.COMING_SOON} />
            <StatRow label="Location" value={PLACEHOLDER.NOT_CONFIRMED} />
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row justify-between py-2 border-b border-dark-200">
      <Text className="text-dark-400">{label}</Text>
      <Text className="text-dark-500 font-medium">{value}</Text>
    </View>
  );
}
