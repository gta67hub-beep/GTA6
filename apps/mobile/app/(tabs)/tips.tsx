import { View, Text, FlatList, Pressable } from "react-native";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Card, Badge, EmptyState, TipCardSkeleton } from "../../components/ui";
import { COLORS, TIP_CATEGORIES } from "../../constants";
import { useTips } from "../../hooks/useTips";
import { formatNumber } from "../../utils";
import { TipCategory, Difficulty } from "../../types";

export default function TipsScreen() {
  const [selectedCategory, setSelectedCategory] = useState<TipCategory | undefined>();
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty | undefined>();
  const { data, isLoading } = useTips({
    category: selectedCategory,
    difficulty: selectedDifficulty,
  });

  const tips = data?.data?.data || [];

  return (
    <SafeAreaView className="flex-1 bg-dark" edges={["top"]}>
      {/* Header */}
      <View className="px-5 pt-4 pb-3">
        <Text className="text-white text-2xl font-bold">Tips</Text>
        <Text className="text-dark-400 text-sm mt-1">
          Community theories and strategies
        </Text>
      </View>

      {/* Category Filter */}
      <View className="px-5 mb-3">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={TIP_CATEGORIES}
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

      {/* Difficulty Filter */}
      <View className="px-5 mb-4">
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={[
            { value: "beginner", label: "Beginner" },
            { value: "intermediate", label: "Intermediate" },
            { value: "advanced", label: "Advanced" },
          ]}
          keyExtractor={(item) => item.value}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                setSelectedDifficulty(
                  selectedDifficulty === (item.value as Difficulty)
                    ? undefined
                    : (item.value as Difficulty)
                )
              }
              className={`mr-2 px-3 py-1.5 rounded-full ${
                selectedDifficulty === item.value
                  ? "bg-primary-600"
                  : "bg-dark-100"
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  selectedDifficulty === item.value
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

      {/* Tips List */}
      {isLoading ? (
        <View className="px-5">
          <TipCardSkeleton />
          <TipCardSkeleton />
          <TipCardSkeleton />
        </View>
      ) : tips.length === 0 ? (
        <EmptyState
          icon="bulb-outline"
          title="No tips available"
          description="Check back later for community tips and strategies"
        />
      ) : (
        <FlatList
          data={tips}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
          renderItem={({ item }) => (
            <Pressable>
              <Card className="mb-4">
                <View className="flex-row items-start gap-3">
                  <View className="w-12 h-12 bg-primary-600/20 rounded-xl items-center justify-center">
                    <Ionicons name="bulb" size={24} color={COLORS.primary} />
                  </View>
                  <View className="flex-1">
                    <Text className="text-white font-semibold" numberOfLines={1}>
                      {item.title}
                    </Text>
                    <Text className="text-dark-400 text-sm mt-1" numberOfLines={2}>
                      {item.shortDescription}
                    </Text>
                    <View className="flex-row items-center gap-2 mt-2">
                      <Badge label={item.category} variant="secondary" size="sm" />
                      <Badge label={item.difficulty} size="sm" />
                      {item.isCommunityTheory && (
                        <Badge label="Community theory" variant="warning" size="sm" />
                      )}
                    </View>
                    <View className="flex-row items-center gap-3 mt-2">
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
                  </View>
                </View>
              </Card>
            </Pressable>
          )}
        />
      )}
    </SafeAreaView>
  );
}
