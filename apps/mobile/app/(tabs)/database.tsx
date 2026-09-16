import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Card } from "../../components/ui";
import { COLORS } from "../../constants";

const DATABASE_CATEGORIES = [
  { id: "vehicles", label: "Vehicles", icon: "car" as const, count: 0 },
  { id: "weapons", label: "Weapons", icon: "flash" as const, count: 0 },
  { id: "characters", label: "Characters", icon: "people" as const, count: 0 },
  { id: "missions", label: "Missions", icon: "flag" as const, count: 0 },
  { id: "locations", label: "Locations", icon: "location" as const, count: 0 },
  { id: "collectibles", label: "Collectibles", icon: "star" as const, count: 0 },
  { id: "properties", label: "Properties", icon: "business" as const, count: 0 },
];

export default function DatabaseScreen() {
  return (
    <SafeAreaView className="flex-1 bg-dark" edges={["top"]}>
      {/* Header */}
      <View className="px-5 pt-4 pb-3">
        <Text className="text-white text-2xl font-bold">Database</Text>
        <Text className="text-dark-400 text-sm mt-1">
          Explore all game data
        </Text>
      </View>

      <ScrollView className="flex-1 px-5">
        {/* Disclaimer */}
        <Card className="mb-4">
          <View className="flex-row items-start gap-3">
            <Ionicons name="information-circle" size={20} color={COLORS.primary} />
            <View className="flex-1">
              <Text className="text-white text-sm font-medium">
                Data Status
              </Text>
              <Text className="text-dark-400 text-xs mt-1">
                Game data will be populated as information becomes available.
                All values are placeholders until confirmed by Rockstar Games.
              </Text>
            </View>
          </View>
        </Card>

        {/* Categories */}
        {DATABASE_CATEGORIES.map((category) => (
          <Pressable key={category.id}>
            <Card variant="outlined" className="mb-3">
              <View className="flex-row items-center gap-4">
                <View className="w-12 h-12 bg-dark-100 rounded-xl items-center justify-center">
                  <Ionicons name={category.icon} size={24} color={COLORS.primary} />
                </View>
                <View className="flex-1">
                  <Text className="text-white text-lg font-semibold">
                    {category.label}
                  </Text>
                  <Text className="text-dark-400 text-sm">
                    {category.count} items
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={COLORS.dark400} />
              </View>
            </Card>
          </Pressable>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
