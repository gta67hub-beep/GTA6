import { View, Text, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Card, Badge, EmptyState, Skeleton } from "../../components/ui";
import { COLORS } from "../../constants";
import { useNewsBySlug } from "../../hooks/useNews";
import { formatDate, formatNumber } from "../../utils";

export default function NewsDetailScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const { data, isLoading, error } = useNewsBySlug(slug || "");

  if (isLoading) {
    return (
      <ScrollView className="flex-1 bg-dark px-5 pt-4">
        <Skeleton height={200} borderRadius={12} />
        <View className="mt-4 gap-3">
          <Skeleton height={24} width="80%" />
          <Skeleton height={16} width="60%" />
          <Skeleton height={16} />
          <Skeleton height={16} />
          <Skeleton height={16} width="90%" />
        </View>
      </ScrollView>
    );
  }

  if (error || !data?.data) {
    return (
      <EmptyState
        icon="alert-circle-outline"
        title="News not found"
        description="The article you're looking for doesn't exist or has been removed."
      />
    );
  }

  const news = data.data;

  return (
    <ScrollView className="flex-1 bg-dark">
      {/* Cover Image Placeholder */}
      {news.coverImage ? (
        <View className="h-64 bg-dark-100">
          <Text className="text-dark-400 text-xs p-4">Cover Image</Text>
        </View>
      ) : (
        <View className="h-32 bg-dark-100 items-center justify-center">
          <Ionicons name="newspaper" size={48} color={COLORS.dark300} />
        </View>
      )}

      <View className="px-5 py-4">
        {/* Category & Date */}
        <View className="flex-row items-center gap-3 mb-3">
          <Badge label={news.category} variant="primary" />
          <Text className="text-dark-400 text-sm">
            {formatDate(news.publishedAt)}
          </Text>
        </View>

        {/* Title */}
        <Text className="text-white text-2xl font-bold leading-tight">
          {news.title}
        </Text>

        {/* Source */}
        <View className="flex-row items-center gap-2 mt-3">
          <Ionicons name="link" size={14} color={COLORS.dark400} />
          <Text className="text-dark-400 text-sm">
            {news.source}
          </Text>
        </View>

        {/* Description */}
        <Text className="text-dark-500 text-base mt-4 leading-6">
          {news.description}
        </Text>

        {/* Stats */}
        <View className="flex-row items-center gap-4 mt-6 py-4 border-t border-dark-200">
          <View className="flex-row items-center gap-1">
            <Ionicons name="eye" size={16} color={COLORS.dark400} />
            <Text className="text-dark-400 text-sm">
              {formatNumber(news.views)} views
            </Text>
          </View>
          <View className="flex-row items-center gap-1">
            <Ionicons name="heart" size={16} color={COLORS.dark400} />
            <Text className="text-dark-400 text-sm">
              {formatNumber(news.likes)} likes
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
