import { StyleSheet } from "react-native";
import { typography } from "./themeStyles";
import { typography as baseTypography } from "./theme/typography";

export default StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  container: {
    padding: 18,
    borderRadius: 0,
  },
  title: {
    fontSize: (typography && typography.h3 && typography.h3.fontSize) || baseTypography.h3 || 20,
    fontWeight: (typography && typography.h3 && typography.h3.fontWeight) || baseTypography.weights.bold || "700",
    color: "#111827",
    marginBottom: 6,
  },
  updated: {
    fontSize: (typography && typography.small && typography.small.fontSize) || baseTypography.small || 12,
    color: "#6b7280",
    marginBottom: 18,
  },
  heading: {
    fontSize: (typography && typography.h4 && typography.h4.fontSize) || baseTypography.h4 || 18,
    fontWeight: (typography && typography.h3 && typography.h3.fontWeight) || baseTypography.weights.bold || "700",
    color: "#111827",
    marginTop: 18,
    marginBottom: 6,
  },
  text: {
    fontSize: (typography && typography.small && typography.small.fontSize) || baseTypography.small || 12,
    color: "#374151",
    lineHeight: 21,
    marginBottom: 8,
  },
});
