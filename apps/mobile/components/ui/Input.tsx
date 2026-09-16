import { TextInput, View, Text, TextInputProps } from "react-native";
import { COLORS } from "../../constants";

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
}

export function Input({
  label,
  error,
  leftIcon,
  style,
  ...props
}: InputProps) {
  return (
    <View className="mb-4">
      {label && (
        <Text className="text-dark-600 text-sm font-medium mb-1.5">
          {label}
        </Text>
      )}
      <View
        className={`flex-row items-center bg-dark-100 rounded-lg border ${
          error ? "border-red-500" : "border-dark-200"
        } px-3 py-2.5`}
      >
        {leftIcon && <View className="mr-2">{leftIcon}</View>}
        <TextInput
          className="flex-1 text-white text-base"
          placeholderTextColor={COLORS.dark400}
          {...props}
        />
      </View>
      {error && <Text className="text-red-500 text-xs mt-1">{error}</Text>}
    </View>
  );
}
