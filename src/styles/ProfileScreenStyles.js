import { StyleSheet } from "react-native";
import { colors } from "./theme/colors";
import { spacing } from "./theme/spacing";
import { radius } from "./theme/radius";
import { shadows } from "./theme/shadows";
import { responsive } from "./theme/responsive";
import { typography } from "./themeStyles";
import { typography as baseTypography } from "./theme/typography";

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    borderRadius: radius.xxl,
    padding: spacing.xl,
    alignItems: "center",
    alignSelf: "center",
    width: "92%",
  },
  avatarWrapper: {
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#fff",
  },
  badge: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
    borderRadius: radius.round,
    marginBottom: spacing.sm,
  },
  badgeText: {
    fontSize:
      (typography && typography.caption && typography.caption.fontSize) ||
      baseTypography.caption ||
      10,
    fontWeight:
      (typography && typography.caption && typography.caption.fontWeight) ||
      baseTypography.weights.semibold ||
      "600",
  },
  name: {
    fontSize:
      (typography && typography.h3 && typography.h3.fontSize) ||
      baseTypography.h3 ||
      20,
    fontWeight:
      (typography && typography.h3 && typography.h3.fontWeight) ||
      baseTypography.weights.bold ||
      "700",
    color: "#333",
    marginTop: spacing.xs,
  },
  desc: {
    fontSize:
      (typography && typography.small && typography.small.fontSize) ||
      baseTypography.small ||
      12,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },
  btnRow: {
    width: "100%",
    gap: spacing.md,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  primaryBtn: {
    flex: 1,
    minWidth: responsive.isTablet ? 180 : 160,
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: radius.button,
    alignItems: "center",
  },

  secondaryBtn: {
    flex: 1,
    minWidth: responsive.isTablet ? 180 : 160,
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.button,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  primaryBtnText: {
    color: "#fff",
    fontWeight:
      (typography && typography.h3 && typography.h3.fontWeight) ||
      baseTypography.weights.bold ||
      "700",
    fontSize:
      (typography && typography.body && typography.body.fontSize) ||
      baseTypography.body ||
      14,
  },

  secondaryBtnText: {
    color: "#6b21a8",
    fontWeight:
      (typography && typography.h3 && typography.h3.fontWeight) ||
      baseTypography.weights.bold ||
      "700",
    fontSize:
      (typography && typography.body && typography.body.fontSize) ||
      baseTypography.body ||
      14,
  },
  infoCard: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.xl,
    marginBottom: spacing.xs,
  },
  label: {
    fontSize:
      (typography && typography.caption && typography.caption.fontSize) ||
      baseTypography.caption ||
      10,
    color: colors.textMuted,
    fontWeight:
      (typography && typography.caption && typography.caption.fontWeight) ||
      baseTypography.weights.semibold ||
      "600",
    marginTop: spacing.sm,
  },
  value: {
    fontSize:
      (typography && typography.body && typography.body.fontSize) ||
      baseTypography.body ||
      14,
    color: "#222",
    marginTop: spacing.xs,
  },
  docTitle: {
    fontSize:
      (typography && typography.body && typography.body.fontSize) ||
      baseTypography.body ||
      14,
    fontWeight:
      (typography && typography.h3 && typography.h3.fontWeight) ||
      baseTypography.weights.bold ||
      "700",
    marginBottom: spacing.xs,
    alignSelf: "flex-start",
  },
  documentCard: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginTop: spacing.xs,
    marginBottom: spacing.sm,

    shadowColor: "#6b21a8",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  documentInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  documentIcon: {
    fontSize:
      (typography && typography.h3 && typography.h3.fontSize) ||
      baseTypography.h3 ||
      20,
    marginRight: spacing.md,
  },

  documentTitle: {
    fontSize:
      (typography && typography.body && typography.body.fontSize) ||
      baseTypography.body ||
      14,
    fontWeight:
      (typography && typography.h3 && typography.h3.fontWeight) ||
      baseTypography.weights.bold ||
      "700",
    color: "#111827",
  },

  documentSubTitle: {
    fontSize:
      (typography && typography.small && typography.small.fontSize) ||
      baseTypography.small ||
      12,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },

  viewDocumentBtn: {
    marginTop: spacing.lg,
    backgroundColor: colors.primary,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    alignItems: "center",
  },

  viewDocumentText: {
    color: "#FFFFFF",
    fontWeight:
      (typography && typography.h3 && typography.h3.fontWeight) ||
      baseTypography.weights.bold ||
      "700",
    fontSize:
      (typography && typography.small && typography.small.fontSize) ||
      baseTypography.small ||
      12,
  },
  aadharImage: {
    width: "100%",
    maxWidth: 500,
    height: 260,
    borderRadius: radius.lg,
    marginBottom: spacing.xl,
    alignSelf: "center",
  },

  fileAction: {
    marginTop: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.button,
    backgroundColor: colors.surfaceMuted,
    width: "100%",
    alignItems: "center",
  },
  fileActionText: {
    color: "#2563eb",
    fontWeight: "600",
  },
  cancelBtn: {
    backgroundColor: colors.surface,
    borderColor: colors.borderStrong,
  },
  guestContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: spacing.xl,
  },
  guestAvatar: {
    width: 100,
    height: 100,
    borderRadius: radius.round,
    marginBottom: spacing.xl,
  },
  guestTitle: {
    fontSize:
      (typography && typography.h2 && typography.h2.fontSize) ||
      baseTypography.h2 ||
      24,
    fontWeight:
      (typography && typography.h2 && typography.h2.fontWeight) ||
      baseTypography.weights.bold ||
      "700",
  },
  guestText: {
    textAlign: "center",
    marginTop: spacing.sm,
    color: colors.textMuted,
  },
  guestButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xxl,
    paddingVertical: spacing.lg,
    borderRadius: radius.button,
    marginTop: spacing.xxl,
  },
  guestButtonText: {
    color: "#fff",
    fontWeight:
      (typography && typography.h3 && typography.h3.fontWeight) ||
      baseTypography.weights.bold ||
      "700",
  },
});
