import { createTypographyStyleSheet as StyleSheet } from "./theme/typography";
import { typography } from "./themeStyles";
import { typography as baseTypography } from "./theme/typography";

export default StyleSheet({
  container: {
    marginBottom: 14,
  },
  label: {
    fontSize: (typography && typography.small && typography.small.fontSize) || baseTypography.small || 12,
    marginBottom: 6,
    color: "#444",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    backgroundColor: "#fff",
  },
});
