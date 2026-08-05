import { StyleSheet } from "react-native";
import { colors } from "./theme/colors";
import { spacing } from "./theme/spacing";
import { radius } from "./theme/radius";
import { typography } from "./themeStyles";
import { typography as baseTypography } from "./theme/typography";

export default StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  container: {
    padding: spacing.lg,
    borderRadius: radius.xxl,
    overflow: "hidden",
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.75)",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: spacing.lg,
  },
  badgeText: {
    color: "#7c3aed",
    fontSize: (typography && typography.caption && typography.caption.fontSize) || baseTypography.caption || 10,
    fontWeight: (typography && typography.caption && typography.caption.fontWeight) || baseTypography.weights.semibold || "600",
  },
  title: {
    fontSize: (typography && typography.h1 && typography.h1.fontSize) || baseTypography.h1 || 28,
    fontWeight: (typography && typography.h1 && typography.h1.fontWeight) || baseTypography.weights.bold || "700",
    lineHeight: 38,
    color: "#111827",
    marginBottom: 10,
  },
  gradientText: {
    color: colors.primary,
  },
  desc: {
    color: colors.textMuted,
    fontSize: (typography && typography.small && typography.small.fontSize) || baseTypography.small || 12,
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  btnRow: {
    flexDirection: "row",
    gap: spacing.sm,
    flexWrap: "wrap",
  },
  primaryBtn: {
    backgroundColor: "#6b21a8",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  primaryBtnText: {
    color: "#fff",
    fontWeight: (typography && typography.h1 && typography.h1.fontWeight) || baseTypography.weights.bold || "700",
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  secondaryBtnText: {
    color: "#111827",
    fontWeight: (typography && typography.title && typography.title.fontWeight) || baseTypography.weights.semibold || "600",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.xl,
  },
  statBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    marginHorizontal: spacing.xs,
    alignItems: "center",
  },
  statNum: {
    fontSize: (typography && typography.title && typography.title.fontSize) || baseTypography.title || 16,
    fontWeight: (typography && typography.h1 && typography.h1.fontWeight) || baseTypography.weights.bold || "700",
    color: "#111827",
  },
  statLabel: {
    fontSize: (typography && typography.caption && typography.caption.fontSize) || baseTypography.caption || 10,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
});
