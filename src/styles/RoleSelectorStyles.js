import { createTypographyStyleSheet as StyleSheet } from "./theme/typography";
import { typography } from "./themeStyles";
import { typography as baseTypography } from "./theme/typography";

export default StyleSheet({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: (typography && typography.body && typography.body.fontSize) || baseTypography.body || 14,
    fontWeight: (typography && typography.h3 && typography.h3.fontWeight) || baseTypography.weights.bold || "700",
    color: "#333",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  activeCard: {
    backgroundColor: "#6b21a8",
    borderColor: "#6b21a8",
  },
  cardTitle: {
    fontSize: (typography && typography.body && typography.body.fontSize) || baseTypography.body || 14,
    fontWeight: (typography && typography.h3 && typography.h3.fontWeight) || baseTypography.weights.bold || "700",
    color: "#222",
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: (typography && typography.small && typography.small.fontSize) || baseTypography.small || 12,
    color: "#666",
    lineHeight: 20,
  },
  activeText: {
    color: "#fff",
  },
});
