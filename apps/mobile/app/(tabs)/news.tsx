import { View, Text, FlatList, Pressable } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Card, Badge, EmptyState, NewsCardSkeleton } from "../../components/ui";
import { COLORS, NEWS_CATEGORIES } from "../../constants";
import { useNews } from "../../hooks/useNews";
import { formatDate, formatNumber } from "../../utils";
import { NewsCategory } from "../../types";

export default function NewsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<NewsCategory | undefined>();
  const { data, isLoading } = useNews({
    category: selectedCategory,
  });

  const news = data?.data?.data || [];

  return (
    <SafeAreaView className="flex-1 bg-dark" edges={["top"]}>
      {/* Header */}
      <View className="px-5 pt-4 pb-3">
        <Text className="text-white text-2xl font-bold">News</Text>
      </View>

      {/* Category Filter */}
      <View className="px-5 mb-4">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={NEWS_CATEGORIES}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                setSelectedCategory(
                  selectedCategory === item.value ? undefined : item.value
                )
              }
              className={`mr-2 px-3 py-1.5 rounded-full ${
                selectedCategory === item.value
                  ? "bg-primary-600"
                  : "bg-dark-100"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  selectedCategory === item.value
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

      {/* News List */}
      {isLoading ? (
        <View className="px-5">
          <NewsCardSkeleton />
          <NewsCardSkeleton />
          <NewsCardSkeleton />
        </View>
      ) : news.length === 0 ? (
        <EmptyState
          icon="newspaper-outline"
          title="No news available"
          description="Check back later for the latest GTA 6 news"
        />
      ) : (
        <FlatList
          data={news}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
          renderItem={({ item }) => (
            <Pressable>
              <Card className="mb-4">
                {item.coverImage && (
                  <View className="h-40 bg-dark-200 rounded-lg mb-3 overflow-hidden">
                    <Text className="text-dark-400 text-xs p-2">Image</Text>
                  </View>
                )}
                <Text className="text-white text-lg font-semibold" numberOfLines={2}>
                  {item.title}
                </Text>
                <Text className="text-dark-400 text-sm mt-1" numberOfLines={2}>
                  {item.description}
                </Text>
                <View className="flex-row items-center gap-3 mt-3">
                  <Badge label={item.category} variant="primary" />
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="eye" size={12} color={COLORS.dark400} />
                    <Text className="text-dark-400 text-xs">
                      {formatNumber(item.views)}
                    </Text>
                  </View>
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="heart" size={12} color={COLORS.dark400} />
                    <Text className="text-dark-400 text-xs">
                      {formatNumber(item.likes)}
                    </Text>
                  </View>
                </View>
                <View className="flex-row items-center gap-2 mt-2">
                  <Text className="text-dark-300 text-xs">
                    Source: {item.source}
                  </Text>
                  <Text className="text-dark-400 text-xs">
                    {formatDate(item.publishedAt)}
                  </Text>
                </View>
              </Card>
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
}
