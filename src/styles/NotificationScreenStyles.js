import { createTypographyStyleSheet as StyleSheet } from "./theme/typography";
import { colors } from "./theme/colors";
import { spacing } from "./theme/spacing";
import { radius } from "./theme/radius";
import { shadows } from "./theme/shadows";
import { responsive } from "./theme/responsive";
import { typography } from "./themeStyles";
import { typography as baseTypography } from "./theme/typography";

export default StyleSheet({
  container: {
    flex: 1,
    backgroundColor: "#FDF9FF",
  },

  scroll: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },

  header: {
    position: "relative",
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  backButtonWrap: {
    position: "absolute",
    left: 0,
    zIndex: 1,
    width: 80,
    alignItems: "flex-start",
  },

  headerText: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 90,
  },

  headerActions: {
    position: "absolute",
    right: 0,
    zIndex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  heading: {
    fontSize:
      (typography && typography.h3 && typography.h3.fontSize) ||
      baseTypography.h2 ||
      24,
    fontWeight:
      (typography && typography.h2 && typography.h2.fontWeight) ||
      baseTypography.weights.bold ||
      "700",
    color: "#111827",
    textAlign: "center",
  },

  subHeading: {
    fontSize:
      (typography && typography.small && typography.small.fontSize) ||
      baseTypography.small ||
      12,
    color: colors.textMuted,
    marginTop: spacing.xs,
    textAlign: "center",
  },

  iconButtonPurple: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: "#ddd6fe",
  },

  iconButtonRed: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.danger,
    borderWidth: 1,
    borderColor: "#fecaca",
  },

  markAllBtn: {
    backgroundColor: colors.primary,
    borderRadius: radius.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },

  deleteAllBtn: {
    backgroundColor: colors.danger,
    borderRadius: radius.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },

  markAllText: {
    color: "#ffffff",
    fontWeight:
      (typography && typography.h3 && typography.h3.fontWeight) ||
      baseTypography.weights.bold ||
      "700",
    fontSize:
      (typography && typography.small && typography.small.fontSize) ||
      baseTypography.small ||
      12,
  },

  deleteAllText: {
    color: "#ffffff",
    fontWeight:
      (typography && typography.h2 && typography.h2.fontWeight) ||
      baseTypography.weights.bold ||
      "700",
    fontSize:
      (typography && typography.small && typography.small.fontSize) ||
      baseTypography.small ||
      12,
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceMuted,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },

  infoText: {
    marginLeft: spacing.sm,
    color: colors.primary,
    fontSize:
      (typography && typography.small && typography.small.fontSize) ||
      baseTypography.small ||
      12,
    lineHeight: 20,
    flex: 1,
  },

  card: {
    gap: spacing.md,
  },

  notificationItem: {
    borderRadius: radius.xl,
    padding: spacing.lg,
    backgroundColor: colors.surface,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },

  unreadCard: {
    borderWidth: 1,
    borderColor: "#c7d2fe",
  },

  readCard: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: radius.round,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },

  iconDot: {
    width: 44,
    height: 44,
    borderRadius: radius.lg,
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.lg,
  },

  notificationContent: {
    flex: 1,
  },

  title: {
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

  date: {
    color: colors.textMuted,
    fontSize:
      (typography && typography.small && typography.small.fontSize) ||
      baseTypography.small ||
      12,
    marginTop: spacing.xs,
  },

  expandedBodyWrap: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },

  bodyText: {
    color: colors.text,
    fontSize:
      (typography && typography.small && typography.small.fontSize) ||
      baseTypography.small ||
      12,
    lineHeight: 20,
  },

  loadMoreBtn: {
    alignSelf: "center",
    backgroundColor: "#ede9fe",
    borderRadius: radius.round,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    marginTop: spacing.xs,
  },

  loadMoreText: {
    color: "#6b21a8",
    fontWeight:
      (typography && typography.h3 && typography.h3.fontWeight) ||
      baseTypography.weights.bold ||
      "700",
    fontSize:
      (typography && typography.small && typography.small.fontSize) ||
      baseTypography.small ||
      12,
  },

  unreadDot: {
    width: spacing.sm,
    height: spacing.sm,
    borderRadius: radius.round,
    backgroundColor: colors.primary,
    marginLeft: spacing.sm,
  },

  actionHint: {
    color: colors.textMuted,
    fontSize:
      (typography && typography.caption && typography.caption.fontSize) ||
      baseTypography.caption ||
      10,
    marginTop: spacing.xs,
  },

  swipeAction: {
    width: 96,
    backgroundColor: "#dc2626",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: radius.xl,
    borderBottomRightRadius: radius.xl,
  },

  swipeActionText: {
    color: colors.surface,
    fontSize:
      (typography && typography.caption && typography.caption.fontSize) ||
      baseTypography.caption ||
      10,
    fontWeight:
      (typography && typography.h3 && typography.h3.fontWeight) ||
      baseTypography.weights.bold ||
      "700",
    marginTop: spacing.xs,
  },

  emptyBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: spacing.xxxl,
  },

  emptyText: {
    marginTop: spacing.lg,
    color: colors.text,
    fontSize:
      (typography && typography.body && typography.body.fontSize) ||
      baseTypography.body ||
      14,
    fontWeight:
      (typography && typography.title && typography.title.fontWeight) ||
      baseTypography.weights.semibold ||
      "600",
  },

  emptySubText: {
    marginTop: spacing.sm,
    color: colors.textMuted,
    fontSize:
      (typography && typography.small && typography.small.fontSize) ||
      baseTypography.small ||
      12,
    textAlign: "center",
    maxWidth: 260,
    lineHeight: 20,
  },
});
