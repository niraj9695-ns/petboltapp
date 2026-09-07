import { StyleSheet } from "react-native";

export const typography = {
  caption: 10,
  small: 12,
  body: 12,
  subtitle: 13,
  cardTitle: 15,
  sectionTitle: 20,
  screenTitle: 24,
  heroTitle: 20,
  fontFamily: "Poppins_400Regular",
  brandFontFamily: "CormorantGaramond_700Bold",
  scriptFontFamily: "Allura_400Regular",
  fonts: {
    regular: "Poppins_400Regular",
    medium: "Poppins_500Medium",
    semibold: "Poppins_600SemiBold",
    bold: "Poppins_700Bold",
    brand: "CormorantGaramond_700Bold",
    script: "Allura_400Regular",
  },
  weights: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
  },
};

export const textStyles = {
  caption: {
    fontSize: typography.caption,
    fontFamily: typography.fonts.medium,
    fontWeight: typography.weights.medium,
  },
  small: {
    fontSize: typography.small,
    fontFamily: typography.fonts.regular,
    fontWeight: typography.weights.regular,
  },
  body: {
    fontSize: typography.body,
    fontFamily: typography.fonts.regular,
    fontWeight: typography.weights.regular,
  },
  subtitle: {
    fontSize: typography.subtitle,
    fontFamily: typography.fonts.medium,
    fontWeight: typography.weights.medium,
  },
  cardTitle: {
    fontSize: typography.cardTitle,
    fontFamily: typography.fonts.semibold,
    fontWeight: typography.weights.semibold,
  },
  sectionTitle: {
    fontSize: typography.sectionTitle,
    fontFamily: typography.fonts.semibold,
    fontWeight: typography.weights.semibold,
  },
  screenTitle: {
    fontSize: typography.screenTitle,
    fontFamily: typography.fonts.bold,
    fontWeight: typography.weights.bold,
  },
  heroTitle: {
    fontSize: typography.heroTitle,
    fontFamily: typography.fonts.bold,
    fontWeight: typography.weights.bold,
  },
};

const fontFamilyForWeight = (fontWeight) => {
  switch (fontWeight) {
    case "500":
      return typography.fonts.medium;
    case "600":
      return typography.fonts.semibold;
    case "700":
    case "800":
    case "900":
    case "bold":
      return typography.fonts.bold;
    default:
      return typography.fonts.regular;
  }
};

const addFontFamily = (style) => {
  if (!style || typeof style !== "object") return style;

  const hasTextMetrics = style.fontSize !== undefined || style.fontWeight !== undefined;
  if (!hasTextMetrics || style.fontFamily) return style;

  return {
    ...style,
    fontFamily: fontFamilyForWeight(style.fontWeight),
  };
};

export const createTypographyStyleSheet = (styles) =>
  StyleSheet.create(
    Object.fromEntries(Object.entries(styles).map(([name, style]) => [name, addFontFamily(style)])),
  );

export default typography;
