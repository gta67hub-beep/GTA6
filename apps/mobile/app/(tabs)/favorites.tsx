import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Card, Badge, EmptyState } from "../../components/ui";
import { COLORS, FAVORITE_ENTITY_LABELS } from "../../constants";
import { useFavorites } from "../../hooks/useFavorites";
import { useAuth } from "@clerk/clerk-expo";
import { Favorite, FavoriteEntityType } from "../../types";

const ENTITY_ICONS: Record<FavoriteEntityType, keyof typeof Ionicons.glyphMap> = {
  news: "newspaper",
  tip: "bulb",
  vehicle: "car",
  weapon: "flash",
  character: "people",
  mission: "flag",
  location: "location",
  collectible: "star",
  property: "business",
};

export default function FavoritesScreen() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { data, isLoading } = useFavorites();

  const favorites: Favorite[] = data?.data || [];

  if (!isSignedIn) {
    return (
      <SafeAreaView className="flex-1 bg-dark" edges={["top"]}>
        <View className="px-5 pt-4 pb-3">
          <Text className="text-white text-2xl font-bold">Favorites</Text>
        </View>
        <View className="flex-1 items-center justify-center px-6">
          <Ionicons name="heart-outline" size={64} color={COLORS.dark300} />
          <Text className="text-dark-400 text-lg font-semibold mt-4 text-center">
            Sign in to see your favorites
          </Text>
          <Text className="text-dark-300 text-sm mt-2 text-center">
            Create an account to save your favorite items
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

  // Group favorites by entity type
  const groupedFavorites = favorites.reduce(
    (acc, fav) => {
      if (!acc[fav.entityType]) {
        acc[fav.entityType] = [];
      }
      acc[fav.entityType].push(fav);
      return acc;
    },
    {} as Record<FavoriteEntityType, Favorite[]>
  );

  const entityTypes = Object.keys(groupedFavorites) as FavoriteEntityType[];

  return (
    <SafeAreaView className="flex-1 bg-dark" edges={["top"]}>
      <View className="px-5 pt-4 pb-3">
        <Text className="text-white text-2xl font-bold">Favorites</Text>
        <Text className="text-dark-400 text-sm mt-1">
          Your saved items across all categories
        </Text>
      </View>

      {isLoading ? (
      <View className="px-5 gap-3">
        <Card className="h-16"><View /></Card>
        <Card className="h-16"><View /></Card>
        <Card className="h-16"><View /></Card>
      </View>
      ) : favorites.length === 0 ? (
        <EmptyState
          icon="heart-outline"
          title="No favorites yet"
          description="Start adding items to your favorites and they'll appear here"
        />
      ) : (
        <FlatList
          data={entityTypes}
          keyExtractor={(item) => item}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
          renderItem={({ item: entityType }) => (
            <View className="mb-6">
              <View className="flex-row items-center gap-2 mb-3">
                <Ionicons
                  name={ENTITY_ICONS[entityType]}
                  size={18}
                  color={COLORS.primary}
                />
                <Text className="text-white font-semibold">
                  {FAVORITE_ENTITY_LABELS[entityType]}
                </Text>
                <Badge label={`${groupedFavorites[entityType].length}`} size="sm" />
              </View>
              {groupedFavorites[entityType].map((fav) => (
                <Pressable key={fav.id}>
                  <Card variant="outlined" className="mb-2">
                    <View className="flex-row items-center gap-3">
                      <View className="w-10 h-10 bg-dark-200 rounded-lg items-center justify-center">
                        <Ionicons
                          name={ENTITY_ICONS[entityType]}
                          size={20}
                          color={COLORS.primary}
                        />
                      </View>
                      <View className="flex-1">
                        <Text className="text-white text-sm font-medium">
                          {fav.entityId}
                        </Text>
                        <Text className="text-dark-400 text-xs">
                          Added {new Date(fav.createdAt).toLocaleDateString()}
                        </Text>
                      </View>
                      <Ionicons name="chevron-forward" size={16} color={COLORS.dark400} />
                    </View>
                  </Card>
                </Pressable>
              ))}
            </View>
          )}
        />
      )}
    </SafeAreaView>
  );
}
