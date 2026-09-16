import { Pressable, Text, ActivityIndicator, PressableProps } from "react-native";
import { COLORS } from "../../constants";

interface ButtonProps extends PressableProps {
  title: string;
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  disabled?: boolean;
}

export function Button({
  title,
  variant = "primary",
  size = "md",
  loading = false,
  disabled = false,
  style,
  ...props
}: ButtonProps) {
  const baseClasses = "flex-row items-center justify-center rounded-lg";

  const variantClasses = {
    primary: "bg-primary-600",
    secondary: "bg-dark-100",
    outline: "border border-dark-200",
    ghost: "bg-transparent",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5",
    md: "px-4 py-2.5",
    lg: "px-6 py-3",
  };

  const textClasses = {
    primary: "text-white",
    secondary: "text-dark-600",
    outline: "text-dark-600",
    ghost: "text-primary-500",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <Pressable
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${
        disabled ? "opacity-50" : ""
      }`}
      disabled={disabled || loading}
      style={style}
      {...props}
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={variant === "primary" ? "#FFFFFF" : COLORS.primary}
        />
      ) : (
        <Text
          className={`font-semibold ${textClasses[variant]} ${textSizes[size]}`}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}
