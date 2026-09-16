import {
  ClerkProvider,
  useAuth,
  useUser,
  SignedIn,
  SignedOut,
} from "@clerk/clerk-expo";
import * as SecureStore from "expo-secure-store";
import { ReactNode } from "react";
import { View, ActivityIndicator } from "react-native";
import { COLORS } from "../constants";

const tokenCache = {
  getToken: async (key: string) => {
    try {
      return await SecureStore.getItemAsync(key);
    } catch {
      return null;
    }
  },
  saveToken: async (key: string, value: string) => {
    try {
      await SecureStore.setItemAsync(key, value);
    } catch {
      return;
    }
  },
};

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY || "";

  if (!publishableKey) {
    console.warn("Missing EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY");
    return <>{children}</>;
  }

  return (
    <ClerkProvider
      publishableKey={publishableKey}
      tokenCache={tokenCache}
    >
      {children}
    </ClerkProvider>
  );
}

export function AuthLoading() {
  return (
    <View className="flex-1 items-center justify-center bg-dark">
      <ActivityIndicator size="large" color={COLORS.primary} />
    </View>
  );
}

export { SignedIn, SignedOut, useAuth, useUser };
