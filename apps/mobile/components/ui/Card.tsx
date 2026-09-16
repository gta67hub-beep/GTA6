import { View, Pressable, PressableProps } from "react-native";

interface CardProps extends PressableProps {
  children: React.ReactNode;
  variant?: "default" | "elevated" | "outlined";
}

export function Card({
  children,
  variant = "default",
  style,
  ...props
}: CardProps) {
  const variantClasses = {
    default: "bg-dark-50 rounded-xl",
    elevated: "bg-dark-50 rounded-xl shadow-lg",
    outlined: "bg-dark-50 rounded-xl border border-dark-200",
  };

  return (
    <Pressable
      className={`${variantClasses[variant]} p-4`}
      style={style}
      {...props}
    >
      {children}
    </Pressable>
  );
}
