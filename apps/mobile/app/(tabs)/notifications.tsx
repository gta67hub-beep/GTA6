import { View, Text, FlatList, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Card, Badge, EmptyState } from "../../components/ui";
import { COLORS } from "../../constants";
import { useNotifications } from "../../hooks/useNotifications";
import { Notification } from "../../services/notifications";

const CATEGORY_COLORS: Record<string, string> = {
  announcement: "#FF6B6B",
  update: "#4ECDC4",
  event: "#FFE66D",
  trailer: "#95E1D3",
  interview: "#AA96DA",
  leak: "#FF8A80",
};

export default function NotificationsScreen() {
  const { data, isLoading } = useNotifications();

  const notifications: Notification[] = data?.data || [];

  const renderNotification = ({ item }: { item: Notification }) => (
    <Pressable>
      <Card variant="outlined" className="mb-3">
        <View className="flex-row gap-3">
          <View
            className="w-10 h-10 rounded-lg items-center justify-center"
            style={{
              backgroundColor: `${CATEGORY_COLORS[item.category] || COLORS.dark300}20`,
            }}
          >
            <Ionicons
              name="notifications"
              size={20}
              color={CATEGORY_COLORS[item.category] || COLORS.dark400}
            />
          </View>
          <View className="flex-1">
            <View className="flex-row items-center gap-2">
              <Text className="text-white text-sm font-semibold flex-1">
                {item.title}
              </Text>
              {!item.read && (
                <View className="w-2 h-2 bg-primary-500 rounded-full" />
              )}
            </View>
            <Text className="text-dark-400 text-xs mt-1" numberOfLines={2}>
              {item.body}
            </Text>
            <Text className="text-dark-300 text-xs mt-2">
              {new Date(item.createdAt).toLocaleDateString()}
            </Text>
          </View>
        </View>
      </Card>
    </Pressable>
  );

  return (
    <SafeAreaView className="flex-1 bg-dark" edges={["top"]}>
      <View className="px-5 pt-4 pb-3">
        <Text className="text-white text-2xl font-bold">Notifications</Text>
        <Text className="text-dark-400 text-sm mt-1">
          Stay updated with the latest GTA 6 news
        </Text>
      </View>

      {isLoading ? (
        <View className="px-5 gap-3">
          <Card className="h-20"><View /></Card>
          <Card className="h-20"><View /></Card>
          <Card className="h-20"><View /></Card>
        </View>
      ) : notifications.length === 0 ? (
        <EmptyState
          icon="notifications-outline"
          title="No notifications"
          description="You'll see important updates and news here"
        />
      ) : (
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
          renderItem={renderNotification}
        />
      )}
    </SafeAreaView>
  );
}
