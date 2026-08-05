import { StyleSheet } from "react-native";
import { typography } from "./themeStyles";
import { typography as baseTypography } from "./theme/typography";

export default StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 24,
  },
  title: {
    fontSize: (typography && typography.h4 && typography.h4.fontSize) || baseTypography.h4 || 18,
    fontWeight: (typography && typography.h3 && typography.h3.fontWeight) || baseTypography.weights.bold || "700",
    color: "#111827",
  },
  subtitle: {
    color: "#6b7280",
    marginTop: 4,
    marginBottom: 14,
  },
  scroll: {
    paddingRight: 16,
  },
  card: {
    width: 260,
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    marginRight: 12,
  },
  image: {
    width: "100%",
    height: 180,
  },
  content: {
    padding: 14,
  },
  name: {
    fontSize: (typography && typography.body && typography.body.fontSize) || baseTypography.body || 14,
    fontWeight: (typography && typography.h3 && typography.h3.fontWeight) || baseTypography.weights.bold || "700",
    color: "#111827",
  },
  desc: {
    fontSize: (typography && typography.small && typography.small.fontSize) || baseTypography.small || 12,
    color: "#6b7280",
    marginTop: 4,
  },
  link: {
    color: "#6b21a8",
    fontWeight: (typography && typography.h3 && typography.h3.fontWeight) || baseTypography.weights.bold || "700",
    marginTop: 10,
  },
});
