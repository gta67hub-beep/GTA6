import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useSignUp } from "@clerk/clerk-expo";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { Button, Input } from "../../components/ui";
import { COLORS } from "../../constants";

export default function SignUpScreen() {
  const router = useRouter();
  const { signUp, setActive, isLoaded } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    if (!isLoaded) return;
    setLoading(true);
    setError("");

    try {
      const result = await signUp.create({
        emailAddress: email,
        password,
        username,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.replace("/(tabs)");
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Sign up failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-dark">
      <View className="flex-1 px-6 pt-8">
        {/* Header */}
        <View className="items-center mb-10">
          <Ionicons name="game-controller" size={64} color={COLORS.primary} />
          <Text className="text-white text-3xl font-bold mt-4">GTA 6 HUB</Text>
          <Text className="text-dark-400 text-base mt-2">
            Create your account
          </Text>
        </View>

        {/* Form */}
        <View className="gap-4">
          <Input
            label="Username"
            placeholder="Your username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />

          <Input
            label="Email"
            placeholder="your@email.com"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />

          {error ? (
            <Text className="text-red-500 text-sm text-center">{error}</Text>
          ) : null}

          <Button
            title="Sign Up"
            onPress={handleSignUp}
            loading={loading}
            disabled={!email || !password || !username}
          />

          <TouchableOpacity
            onPress={() => router.push("/(auth)/sign-in")}
            className="py-3"
          >
            <Text className="text-dark-400 text-center">
              Already have an account?{" "}
              <Text className="text-primary-500 font-semibold">Sign In</Text>
            </Text>
          </TouchableOpacity>
        </View>

        {/* Skip */}
        <View className="mt-auto mb-8">
          <Button
            title="Skip for now"
            variant="ghost"
            onPress={() => router.replace("/(tabs)")}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
