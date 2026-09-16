import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Card, EmptyState } from "../../components/ui";
import { COLORS } from "../../constants";
import { useProgressSummary } from "../../hooks/useProgress";
import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { Pressable } from "react-native";

const PROGRESS_CATEGORIES = [
  { key: "mission", label: "Missions", icon: "flag" as const, color: COLORS.primary },
  { key: "collectible", label: "Collectibles", icon: "star" as const, color: "#F59E0B" },
  { key: "vehicle", label: "Vehicles", icon: "car" as const, color: "#22C55E" },
  { key: "weapon", label: "Weapons", icon: "flash" as const, color: "#EF4444" },
  { key: "location", label: "Locations", icon: "location" as const, color: "#3B82F6" },
  { key: "tip", label: "Tips", icon: "bulb" as const, color: "#8B5CF6" },
];

export default function ProgressScreen() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { data: summary, isLoading } = useProgressSummary();

  const stats = summary?.data;

  if (!isSignedIn) {
    return (
      <SafeAreaView className="flex-1 bg-dark" edges={["top"]}>
        <View className="px-5 pt-4 pb-3">
          <Text className="text-white text-2xl font-bold">Progress</Text>
        </View>
        <View className="flex-1 items-center justify-center px-6">
          <Ionicons name="trophy-outline" size={64} color={COLORS.dark300} />
          <Text className="text-dark-400 text-lg font-semibold mt-4 text-center">
            Sign in to track your progress
          </Text>
          <Text className="text-dark-300 text-sm mt-2 text-center">
            Create an account to save your progress across devices
          </Text>
          <Pressable
            onPress={() => router.push("/(auth)/sign-in")}
            className="mt-4 bg-primary-600 px-6 py-3 rounded-xl"
          >
            <Text className="text-white font-semibold">Sign In</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-dark" edges={["top"]}>
      <View className="px-5 pt-4 pb-3">
        <Text className="text-white text-2xl font-bold">Progress</Text>
        <Text className="text-dark-400 text-sm mt-1">
          Track your completion across all categories
        </Text>
      </View>

      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        {/* Overall Progress */}
        <Card className="mb-6">
          <View className="items-center py-4">
            <Text className="text-white text-4xl font-bold">
              {stats?.percentage || 0}%
            </Text>
            <Text className="text-dark-400 text-sm mt-1">Overall Completion</Text>
            <View className="w-full h-3 bg-dark-200 rounded-full mt-3 overflow-hidden">
              <View
                className="h-full bg-primary-600 rounded-full"
                style={{ width: `${stats?.percentage || 0}%` }}
              />
            </View>
          </View>
        </Card>

        {/* Category Progress */}
        <Text className="text-dark-400 text-sm font-medium mb-3">
          By Category
        </Text>
        {PROGRESS_CATEGORIES.map((category) => {
          const categoryStats = stats?.byCategory?.[category.key];
          const percent = categoryStats?.percentage || 0;

          return (
            <Card key={category.key} className="mb-3">
              <View className="flex-row items-center gap-4">
                <View className="w-12 h-12 bg-dark-200 rounded-xl items-center justify-center">
                  <Ionicons name={category.icon} size={24} color={category.color} />
                </View>
                <View className="flex-1">
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-white font-medium">{category.label}</Text>
                    <Text className="text-dark-400 text-sm">{percent}%</Text>
                  </View>
                  <View className="h-2 bg-dark-200 rounded-full overflow-hidden">
                    <View
                      className="h-full rounded-full"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: category.color,
                      }}
                    />
                  </View>
                  <Text className="text-dark-400 text-xs mt-1">
                    {categoryStats?.completed || 0} / {categoryStats?.total || 0} completed
                  </Text>
                </View>
              </View>
            </Card>
          );
        })}

        {/* Disclaimer */}
        <View className="mt-6 mb-8 items-center">
          <Text className="text-dark-300 text-xs text-center">
            Progress is synced across your devices when signed in.
          </Text>
          <Text className="text-dark-300 text-xs text-center mt-1">
            Game data will be available once GTA 6 is released.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
