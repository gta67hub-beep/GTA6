import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useAuth, useUser } from "@clerk/clerk-expo";
import { Card } from "../../components/ui";
import { COLORS } from "../../constants";

export default function ProfileScreen() {
  const router = useRouter();
  const { isSignedIn, signOut } = useAuth();
  const { user } = useUser();

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      { text: "Sign Out", style: "destructive", onPress: () => signOut() },
    ]);
  };

  return (
    <SafeAreaView className="flex-1 bg-dark" edges={["top"]}>
      {/* Header */}
      <View className="px-5 pt-4 pb-3">
        <Text className="text-white text-2xl font-bold">Profile</Text>
      </View>

      <ScrollView className="flex-1 px-5">
        {/* User Section */}
        {isSignedIn && user ? (
          <Card className="mb-4">
            <View className="flex-row items-center gap-4">
              <View className="w-16 h-16 bg-dark-200 rounded-full items-center justify-center overflow-hidden">
                {user.imageUrl ? (
                  <Text className="text-white text-2xl">
                    {user.username?.charAt(0)?.toUpperCase() || user.emailAddresses[0]?.emailAddress.charAt(0).toUpperCase()}
                  </Text>
                ) : (
                  <Ionicons name="person" size={32} color={COLORS.dark400} />
                )}
              </View>
              <View className="flex-1">
                <Text className="text-white text-lg font-semibold">
                  {user.username || "Player"}
                </Text>
                <Text className="text-dark-400 text-sm">
                  {user.emailAddresses[0]?.emailAddress}
                </Text>
              </View>
            </View>
          </Card>
        ) : (
          <Pressable onPress={() => router.push("/(auth)/sign-in")}>
            <Card className="mb-4">
              <View className="items-center py-4">
                <Ionicons name="person-circle-outline" size={64} color={COLORS.dark300} />
                <Text className="text-dark-400 text-lg font-semibold mt-3">
                  Sign in to sync your progress
                </Text>
                <Text className="text-dark-300 text-sm mt-1 text-center">
                  Create an account to save your favorites and progress across devices
                </Text>
              </View>
            </Card>
          </Pressable>
        )}

        {/* Menu Items */}
        <View className="gap-3">
          <MenuItem
            icon="heart"
            label="Favorites"
            description="Your saved items"
            onPress={() => {}}
          />
          <MenuItem
            icon="trophy"
            label="Progress"
            description="Track your completion"
            onPress={() => {}}
          />
          <MenuItem
            icon="notifications"
            label="Notifications"
            description="Manage push notifications"
            onPress={() => {}}
          />
          <MenuItem
            icon="settings"
            label="Settings"
            description="App preferences"
            onPress={() => {}}
          />
          <MenuItem
            icon="help-circle"
            label="Help & Support"
            description="Get assistance"
            onPress={() => {}}
          />
          <MenuItem
            icon="information-circle"
            label="About"
            description="App info and credits"
            onPress={() => {}}
          />
        </View>

        {/* Sign Out */}
        {isSignedIn && (
          <Pressable
            onPress={handleSignOut}
            className="mt-6 mb-8 bg-dark-100 rounded-xl p-4 items-center"
          >
            <Text className="text-red-500 font-semibold">Sign Out</Text>
          </Pressable>
        )}

        {/* Disclaimer */}
        <View className="mt-8 mb-8 items-center">
          <Text className="text-dark-300 text-xs text-center">
            GTA 6 Hub is an unofficial fan-made app.
          </Text>
          <Text className="text-dark-300 text-xs text-center mt-1">
            Not affiliated with Rockstar Games or Take-Two Interactive.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function MenuItem({
  icon,
  label,
  description,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  description: string;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      <Card variant="outlined">
        <View className="flex-row items-center gap-4">
          <View className="w-10 h-10 bg-dark-100 rounded-lg items-center justify-center">
            <Ionicons name={icon} size={20} color={COLORS.primary} />
          </View>
          <View className="flex-1">
            <Text className="text-white font-medium">{label}</Text>
            <Text className="text-dark-400 text-sm">{description}</Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color={COLORS.dark400} />
        </View>
      </Card>
    </Pressable>
  );
}
