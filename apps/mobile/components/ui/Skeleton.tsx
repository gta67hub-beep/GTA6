import { View, Animated } from "react-native";
import { useEffect, useRef } from "react";

interface SkeletonProps {
  width?: number | `${number}%`;
  height?: number;
  borderRadius?: number;
}

export function Skeleton({
  width = "100%",
  height = 20,
  borderRadius = 8,
}: SkeletonProps) {
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 0.7,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <Animated.View
      style={{
        width,
        height,
        borderRadius,
        backgroundColor: "#27272A",
        opacity,
      }}
    />
  );
}

export function NewsCardSkeleton() {
  return (
    <View className="bg-dark-50 rounded-xl p-4 mb-4">
      <Skeleton height={180} borderRadius={12} />
      <View className="mt-3 gap-2">
        <Skeleton width="70%" height={16} />
        <Skeleton width="100%" height={14} />
        <Skeleton width="40%" height={12} />
      </View>
    </View>
  );
}

export function TipCardSkeleton() {
  return (
    <View className="bg-dark-50 rounded-xl p-4 mb-4">
      <View className="flex-row gap-3">
        <Skeleton width={60} height={60} borderRadius={8} />
        <View className="flex-1 gap-2">
          <Skeleton width="80%" height={16} />
          <Skeleton width="100%" height={14} />
          <Skeleton width="50%" height={12} />
        </View>
      </View>
    </View>
  );
}
