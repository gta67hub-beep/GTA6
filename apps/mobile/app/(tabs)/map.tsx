import { View, Text, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Card, Badge } from "../../components/ui";
import { COLORS, MAP_MARKER_CATEGORIES } from "../../constants";

const MARKER_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  Missions: "flag",
  Vehicles: "car",
  Weapons: "flash",
  Shops: "storefront",
  Properties: "business",
  Collectibles: "star",
  Secrets: "eye",
  Locations: "location",
};

export default function MapScreen() {
  return (
    <SafeAreaView className="flex-1 bg-dark" edges={["top"]}>
      {/* Header */}
      <View className="px-5 pt-4 pb-3">
        <Text className="text-white text-2xl font-bold">Map</Text>
        <Text className="text-dark-400 text-sm mt-1">
          Interactive game map
        </Text>
      </View>

      {/* Map Placeholder */}
      <View className="mx-5 mb-5 bg-dark-100 rounded-xl overflow-hidden items-center justify-center" style={{ height: 300 }}>
        <Ionicons name="map-outline" size={64} color={COLORS.dark300} />
        <Text className="text-dark-400 text-lg font-semibold mt-4">
          Interactive Map
        </Text>
        <Text className="text-dark-300 text-sm mt-2 text-center px-8">
          The interactive map will be available once game locations are confirmed.
        </Text>
        <View className="mt-4 bg-dark-200 px-4 py-2 rounded-full">
          <Text className="text-dark-400 text-xs">Coming soon</Text>
        </View>
      </View>

      {/* Marker Categories */}
      <ScrollView className="flex-1 px-5" showsVerticalScrollIndicator={false}>
        <Text className="text-dark-400 text-sm font-medium mb-3">
          Marker Categories
        </Text>
        <View className="flex-row flex-wrap gap-2 mb-6">
          {MAP_MARKER_CATEGORIES.map((category) => (
            <Pressable
              key={category}
              className="flex-row items-center gap-2 bg-dark-100 px-3 py-2 rounded-full"
            >
              <Ionicons
                name={MARKER_ICONS[category] || "location"}
                size={14}
                color={COLORS.dark400}
              />
              <Text className="text-dark-400 text-xs">{category}</Text>
            </Pressable>
          ))}
        </View>

        {/* Placeholder Cards */}
        <Text className="text-dark-400 text-sm font-medium mb-3">
          Coming Locations
        </Text>
        <Card className="mb-3">
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 bg-dark-200 rounded-lg items-center justify-center">
              <Ionicons name="location" size={20} color={COLORS.primary} />
            </View>
            <View className="flex-1">
              <Text className="text-white font-medium">Leonida</Text>
              <Text className="text-dark-400 text-sm">
                GTA 6 map location — Coming soon
              </Text>
            </View>
            <Badge label="Not confirmed" variant="warning" size="sm" />
          </View>
        </Card>
        <Card className="mb-3">
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 bg-dark-200 rounded-lg items-center justify-center">
              <Ionicons name="location" size={20} color={COLORS.primary} />
            </View>
            <View className="flex-1">
              <Text className="text-white font-medium">Vice City</Text>
              <Text className="text-dark-400 text-sm">
                GTA 6 map location — Coming soon
              </Text>
            </View>
            <Badge label="Not confirmed" variant="warning" size="sm" />
          </View>
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}
