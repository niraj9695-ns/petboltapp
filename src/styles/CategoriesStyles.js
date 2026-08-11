import { StyleSheet } from "react-native";
import { colors } from "./theme/colors";
import { spacing } from "./theme/spacing";
import { radius } from "./theme/radius";
import { shadows } from "./theme/shadows";
import { responsive } from "./theme/responsive";
import { typography } from "./themeStyles";
import { typography as baseTypography } from "./theme/typography";

export default StyleSheet.create({
  section: {
    paddingVertical: spacing.xxl,
    paddingHorizontal: spacing.lg,
    backgroundColor: colors.surface,
  },

  title: {
    fontSize: (typography && typography.h2 && typography.h2.fontSize) || baseTypography.h2 || 24,
    fontWeight: (typography && typography.h2 && typography.h2.fontWeight) || baseTypography.weights.bold || "700",
    textAlign: "center",
    marginBottom: spacing.xs,
    color: colors.text,
  },

  gradientText: {
    color: "#f97316",
  },

  subtitle: {
    textAlign: "center",
    color: colors.textMuted,
    marginBottom: spacing.xxl,
    fontSize: (typography && typography.small && typography.small.fontSize) || baseTypography.small || 12,
  },

  scrollContainer: {
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.sm,
  },

  card: {
    borderRadius: radius.xxl,
    padding: spacing.xl,
    marginRight: spacing.lg,
    marginTop: spacing.sm,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,

    elevation: 6,
    alignItems: "center",
  },

  iconWrapper: {
    position: "relative",
    marginBottom: spacing.lg,
  },

  iconBox: {
    width: 85,
    height: 85,
    borderRadius: radius.xl,
    justifyContent: "center",
    alignItems: "center",
  },

  emoji: {
    position: "absolute",
    top: -8,
    right: -8,
    fontSize: (typography && typography.h4 && typography.h4.fontSize) || baseTypography.h4 || 18,
  },

  name: {
    fontSize: (typography && typography.title && typography.title.fontSize) || baseTypography.title || 16,
    fontWeight: (typography && typography.title && typography.title.fontWeight) || baseTypography.weights.semibold || "600",
    color: "#1f2937",
    marginBottom: 4,
    textAlign: "center",
  },

  desc: {
    fontSize: (typography && typography.small && typography.small.fontSize) || baseTypography.small || 12,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: spacing.xs,
    minHeight: 36,
  },

  button: {
    width: "100%",
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: (typography && typography.title && typography.title.fontWeight) || baseTypography.weights.semibold || "600",
    fontSize: (typography && typography.small && typography.small.fontSize) || baseTypography.small || 12,
  },
});
