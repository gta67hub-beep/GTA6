import { View, Text, FlatList, Pressable, TextInput } from "react-native";
import { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Card, Badge, EmptyState, Skeleton } from "../../components/ui";
import { COLORS } from "../../constants";
import { useSearch } from "../../hooks/useSearch";
import { SearchResult } from "../../services/search";

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "vehicles", label: "Vehicles" },
  { id: "weapons", label: "Weapons" },
  { id: "characters", label: "Characters" },
  { id: "news", label: "News" },
  { id: "tips", label: "Tips" },
  { id: "locations", label: "Locations" },
  { id: "missions", label: "Missions" },
];

export default function SearchScreen() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const { data, isLoading } = useSearch(query, selectedCategory === "all" ? undefined : selectedCategory);

  const results: SearchResult[] = data?.data || [];

  const handleResultPress = useCallback(
    (item: SearchResult) => {
      switch (item.type) {
        case "vehicle":
          router.push(`/database/${item.slug}`);
          break;
        case "weapon":
          router.push(`/database/${item.slug}`);
          break;
        case "character":
          router.push(`/database/${item.slug}`);
          break;
        case "news":
          router.push(`/news/${item.slug}`);
          break;
        case "tip":
          router.push(`/database/${item.slug}`);
          break;
        case "location":
          router.push(`/database/${item.slug}`);
          break;
        default:
          break;
      }
    },
    [router]
  );

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "vehicle":
        return "car" as const;
      case "weapon":
        return "flash" as const;
      case "character":
        return "people" as const;
      case "news":
        return "newspaper" as const;
      case "tip":
        return "bulb" as const;
      case "location":
        return "location" as const;
      case "mission":
        return "flag" as const;
      default:
        return "document" as const;
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-dark" edges={["top"]}>
      {/* Header */}
      <View className="px-5 pt-4 pb-3">
        <Text className="text-white text-2xl font-bold">Search</Text>
      </View>

      {/* Search Input */}
      <View className="px-5 mb-4">
        <View className="flex-row items-center bg-dark-100 rounded-xl border border-dark-200 px-4 py-3">
          <Ionicons name="search" size={20} color={COLORS.dark400} />
          <TextInput
            className="flex-1 text-white text-base ml-3"
            placeholder="Search vehicles, weapons, characters..."
            placeholderTextColor={COLORS.dark400}
            value={query}
            onChangeText={setQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {query.length > 0 && (
            <Pressable onPress={() => setQuery("")}>
              <Ionicons name="close-circle" size={20} color={COLORS.dark400} />
            </Pressable>
          )}
        </View>
      </View>

      {/* Category Filter */}
      <View className="px-5 mb-4">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={CATEGORIES}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                setSelectedCategory(
                  selectedCategory === item.id ? undefined : item.id
                )
              }
              className={`mr-2 px-3 py-1.5 rounded-full ${
                selectedCategory === item.id
                  ? "bg-primary-600"
                  : "bg-dark-100"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  selectedCategory === item.id
                    ? "text-white"
                    : "text-dark-400"
                }`}
              >
                {item.label}
              </Text>
            </Pressable>
          )}
        />
      </View>

      {/* Results */}
      {isLoading ? (
        <View className="px-5 gap-3">
          <Skeleton height={60} borderRadius={12} />
          <Skeleton height={60} borderRadius={12} />
          <Skeleton height={60} borderRadius={12} />
        </View>
      ) : query.length < 2 ? (
        <EmptyState
          icon="search-outline"
          title="Search GTA 6 content"
          description="Search for vehicles, weapons, characters, news, and more"
        />
      ) : results.length === 0 ? (
        <EmptyState
          icon="alert-circle-outline"
          title="No results found"
          description={`No results for "${query}"`}
        />
      ) : (
        <FlatList
          data={results}
          keyExtractor={(item) => `${item.type}-${item.id}`}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
          renderItem={({ item }) => (
            <Pressable onPress={() => handleResultPress(item)}>
              <Card variant="outlined" className="mb-3">
                <View className="flex-row items-center gap-3">
                  <View className="w-10 h-10 bg-dark-100 rounded-lg items-center justify-center">
                    <Ionicons
                      name={getTypeIcon(item.type)}
                      size={20}
                      color={COLORS.primary}
                    />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-medium" numberOfLines={1}>
                      {item.name}
                    </Text>
                    <Text className="text-dark-400 text-sm" numberOfLines={1}>
                      {item.description || "No description"}
                    </Text>
                  </View>
                  <Badge label={item.type} size="sm" />
                </View>
              </Card>
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
}
