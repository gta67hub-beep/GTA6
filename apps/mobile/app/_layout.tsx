import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { QueryProvider } from "../lib/query";
import { AuthProvider } from "../lib/auth";

export default function RootLayout() {
  return (
    <AuthProvider>
      <QueryProvider>
        <View className="flex-1 bg-dark">
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: "#0A0A0A" },
            }}
          >
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen
              name="news/[slug]"
              options={{
                headerShown: true,
                headerStyle: { backgroundColor: "#0A0A0A" },
                headerTintColor: "#FAFAFA",
                presentation: "card",
              }}
            />
            <Stack.Screen
              name="database/[slug]"
              options={{
                headerShown: true,
                headerStyle: { backgroundColor: "#0A0A0A" },
                headerTintColor: "#FAFAFA",
                presentation: "card",
              }}
            />
          </Stack>
        </View>
      </QueryProvider>
    </AuthProvider>
  );
}
