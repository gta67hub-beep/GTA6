import { View, Text } from "react-native";
import { COLORS } from "../../constants";

interface BadgeProps {
  label: string;
  variant?: "default" | "primary" | "secondary" | "success" | "warning" | "error";
  size?: "sm" | "md";
}

export function Badge({
  label,
  variant = "default",
  size = "sm",
}: BadgeProps) {
  const variantClasses = {
    default: "bg-dark-200",
    primary: "bg-primary-600/20",
    secondary: "bg-dark-100",
    success: "bg-green-500/20",
    warning: "bg-yellow-500/20",
    error: "bg-red-500/20",
  };

  const textClasses = {
    default: "text-dark-600",
    primary: "text-primary-400",
    secondary: "text-dark-500",
    success: "text-green-400",
    warning: "text-yellow-400",
    error: "text-red-400",
  };

  const sizeClasses = {
    sm: "px-2 py-0.5",
    md: "px-3 py-1",
  };

  const textSizes = {
    sm: "text-xs",
    md: "text-sm",
  };

  return (
    <View
      className={`rounded-full ${variantClasses[variant]} ${sizeClasses[size]}`}
    >
      <Text className={`font-medium ${textClasses[variant]} ${textSizes[size]}`}>
        {label}
      </Text>
    </View>
  );
}
