import { View, Text, ScrollView, RefreshControl, Pressable } from "react-native";
import { useState, useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { Card, Badge, Skeleton } from "../../components/ui";
import { COLORS } from "../../constants";
import { useTrendingNews } from "../../hooks/useNews";
import { useTrendingTips } from "../../hooks/useTips";
import { formatDate, formatNumber } from "../../utils";

export default function HomeScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = useState(false);
  const { data: trendingNews, isLoading: newsLoading, refetch: refetchNews } = useTrendingNews();
  const { data: trendingTips, isLoading: tipsLoading, refetch: refetchTips } = useTrendingTips();

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([refetchNews(), refetchTips()]);
    setRefreshing(false);
  }, []);

  const news = trendingNews?.data || [];
  const tips = trendingTips?.data || [];

  return (
    <SafeAreaView className="flex-1 bg-dark" edges={["top"]}>
      <ScrollView
        className="flex-1"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={COLORS.primary}
          />
        }
      >
        {/* Header */}
        <View className="px-5 pt-4 pb-6">
          <Text className="text-white text-3xl font-bold">GTA 6 HUB</Text>
          <Text className="text-dark-400 text-base mt-1">
            Everything you need for GTA 6.
          </Text>
          <Text className="text-dark-300 text-xs mt-2 italic">
            Unofficial fan app — not affiliated with Rockstar Games or Take-Two Interactive
          </Text>
        </View>

        {/* Progress Section */}
        <View className="px-5 mb-6">
          <View className="flex-row items-center gap-2 mb-3">
            <Ionicons name="trophy" size={18} color={COLORS.primary} />
            <Text className="text-white text-lg font-semibold">Your Progress</Text>
          </View>
          <Card>
            <ProgressBar label="Story" percent={0} />
            <ProgressBar label="Collectibles" percent={0} />
            <ProgressBar label="Vehicles" percent={0} />
          </Card>
        </View>

        {/* Trending Section */}
        <View className="px-5 mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-2">
              <Ionicons name="flame" size={18} color={COLORS.primary} />
              <Text className="text-white text-lg font-semibold">Trending</Text>
            </View>
            <Pressable onPress={() => router.push("/(tabs)/news")}>
              <Text className="text-primary-500 text-sm">See all</Text>
            </Pressable>
          </View>
          {newsLoading ? (
            <Skeleton height={120} borderRadius={12} />
          ) : news.length > 0 ? (
            news.slice(0, 3).map((item) => (
              <Pressable key={item.id} onPress={() => router.push(`/news/${item.slug}`)}>
                <Card className="mb-3">
                  <Text className="text-white font-semibold" numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text className="text-dark-400 text-sm mt-1" numberOfLines={2}>
                    {item.description}
                  </Text>
                  <View className="flex-row items-center gap-3 mt-2">
                    <Badge label={item.category} variant="primary" />
                    <Text className="text-dark-400 text-xs">
                      {formatDate(item.publishedAt)}
                    </Text>
                    <Text className="text-dark-400 text-xs">
                      {formatNumber(item.views)} views
                    </Text>
                  </View>
                </Card>
              </Pressable>
            ))
          ) : (
            <Card>
              <Text className="text-dark-400 text-center py-4">
                No trending content yet
              </Text>
            </Card>
          )}
        </View>

        {/* Latest News */}
        <View className="px-5 mb-6">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-2">
              <Ionicons name="newspaper" size={18} color={COLORS.primary} />
              <Text className="text-white text-lg font-semibold">Latest News</Text>
            </View>
            <Pressable onPress={() => router.push("/(tabs)/news")}>
              <Text className="text-primary-500 text-sm">See all</Text>
            </Pressable>
          </View>
          {newsLoading ? (
            <Skeleton height={120} borderRadius={12} />
          ) : news.length > 0 ? (
            news.slice(0, 5).map((item) => (
              <Pressable key={item.id} onPress={() => router.push(`/news/${item.slug}`)}>
                <Card className="mb-3">
                  <Text className="text-white font-semibold" numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text className="text-dark-400 text-sm mt-1" numberOfLines={2}>
                    {item.description}
                  </Text>
                  <View className="flex-row items-center gap-3 mt-2">
                    <Badge label={item.category} variant="secondary" />
                    <Text className="text-dark-400 text-xs">
                      {formatDate(item.publishedAt)}
                    </Text>
                  </View>
                </Card>
              </Pressable>
            ))
          ) : (
            <Card>
              <Text className="text-dark-400 text-center py-4">
                No news available
              </Text>
            </Card>
          )}
        </View>

        {/* Latest Tips */}
        <View className="px-5 mb-8">
          <View className="flex-row items-center justify-between mb-3">
            <View className="flex-row items-center gap-2">
              <Ionicons name="bulb" size={18} color={COLORS.primary} />
              <Text className="text-white text-lg font-semibold">Latest Tips</Text>
            </View>
            <Pressable onPress={() => router.push("/(tabs)/tips")}>
              <Text className="text-primary-500 text-sm">See all</Text>
            </Pressable>
          </View>
          {tipsLoading ? (
            <Skeleton height={100} borderRadius={12} />
          ) : tips.length > 0 ? (
            tips.slice(0, 5).map((item) => (
              <Pressable key={item.id}>
                <Card className="mb-3">
                  <Text className="text-white font-semibold" numberOfLines={1}>
                    {item.title}
                  </Text>
                  <Text className="text-dark-400 text-sm mt-1" numberOfLines={2}>
                    {item.shortDescription}
                  </Text>
                  <View className="flex-row items-center gap-3 mt-2">
                    <Badge label={item.category} variant="secondary" />
                    <Badge label={item.difficulty} size="sm" />
                    {item.isCommunityTheory && (
                      <Badge label="Community theory" variant="warning" />
                    )}
                  </View>
                </Card>
              </Pressable>
            ))
          ) : (
            <Card>
              <Text className="text-dark-400 text-center py-4">
                No tips available
              </Text>
            </Card>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ProgressBar({ label, percent }: { label: string; percent: number }) {
  return (
    <View className="mb-3 last:mb-0">
      <View className="flex-row justify-between mb-1">
        <Text className="text-dark-500 text-sm">{label}</Text>
        <Text className="text-dark-400 text-sm">{percent}%</Text>
      </View>
      <View className="h-2 bg-dark-200 rounded-full overflow-hidden">
        <View
          className="h-full bg-primary-600 rounded-full"
          style={{ width: `${percent}%` }}
        />
      </View>
    </View>
  );
}
