import { createTypographyStyleSheet as StyleSheet } from "./theme/typography";
import { colors } from "./theme/colors";
import { spacing } from "./theme/spacing";
import { radius } from "./theme/radius";
import { typography } from "./themeStyles";
import { typography as baseTypography } from "./theme/typography";

export default StyleSheet({
  heading: {
    fontSize:
      (typography && typography.h2 && typography.h2.fontSize) ||
      baseTypography.h2 ||
      24,
    fontWeight:
      (typography && typography.h2 && typography.h2.fontWeight) ||
      baseTypography.weights.bold ||
      "700",
    marginBottom: spacing.xl,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    backgroundColor: "#fff",
    color: "#111827",
    fontSize:
      (typography && typography.body && typography.body.fontSize) ||
      baseTypography.body ||
      14,
  },
  forgotText: {
    textAlign: "right",
    color: colors.primary,
    fontWeight:
      (typography && typography.title && typography.title.fontWeight) ||
      baseTypography.weights.semibold ||
      "600",
    marginBottom: spacing.sm,
  },
  button: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: radius.button,
    alignItems: "center",
    marginTop: spacing.sm,
  },
  buttonText: {
    color: "#fff",
    fontWeight:
      (typography && typography.h1 && typography.h1.fontWeight) ||
      baseTypography.weights.bold ||
      "700",
  },
  errorTopText: {
    color: "#dc2626",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,

    fontSize:
      (typography && typography.small && typography.small.fontSize) ||
      baseTypography.small ||
      12,
    fontWeight:
      (typography && typography.title && typography.title.fontWeight) ||
      baseTypography.weights.semibold ||
      "600",
  },
  errorText: {
    color: "#dc2626",
    fontSize:
      (typography && typography.caption && typography.caption.fontSize) ||
      baseTypography.caption ||
      10,
    marginTop: -spacing.xs,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
});
