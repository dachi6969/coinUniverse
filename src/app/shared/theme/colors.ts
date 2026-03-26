export const colors = {
    primary: "#3B82F6",
    secondary: "#6B7280",
    success: "#22C55E",
    error: "#EF4444",
    warning: "#F59E0B",
    info: "#0EA5E9",
    dark: "#111827",
    light: "#F3F4F6"
  } as const;
export type ColorVariant = keyof typeof colors;