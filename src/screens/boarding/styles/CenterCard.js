import { createTypographyStyleSheet as StyleSheet } from "../../../styles/theme/typography";
import { responsive } from "../../../styles/theme/responsive";
import { spacing } from "../../../styles/theme/spacing";
import { radius } from "../../../styles/theme/radius";
import { colors } from "../../../styles/theme/colors";
import { typography } from "../../../styles/themeStyles";
import { typography as baseTypography } from "../../../styles/theme/typography";
import { shadows } from "../../../styles/theme/shadows";

const IMAGE_HEIGHT = responsive.isTablet ? 180 : 160;

export default StyleSheet({
  centerCardWrapper: {
    flex: 1,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: "hidden",
    ...shadows.md,
  },

  cardContainer: {
    marginBottom: spacing.md,
    alignSelf: "stretch",
  },

  /* CENTER IMAGE */
  centerImageContainer: {
    position: "relative",
    width: "100%",
    height: IMAGE_HEIGHT,
    backgroundColor: colors.surfaceMuted,
    overflow: "hidden",
  },

  centerImage: {
    width: "100%",
    height: "100%",
  },

  imageOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  centerImagePlaceholder: {
    width: "100%",
    height: IMAGE_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.surfaceMuted,
  },

  centerCardContent: {
    flex: 1,
    padding: spacing.cardPadding || spacing.lg,
    justifyContent: "space-between",
  },

  /* TITLE ROW */
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.titleToSubtitle,
  },

  titleSection: {
    flex: 1,
    marginRight: spacing.sm,
  },

  centerCardTitle: {
    fontSize:
      (typography && typography.cardTitle && typography.cardTitle.fontSize) ||
      baseTypography.cardTitle ||
      18,
    fontWeight: "800",
    color: colors.text,
    lineHeight: 18,
    marginBottom: spacing.xs,
  },

  locationBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    alignSelf: "flex-start",
  },

  locationText: {
    fontSize:
      (typography && typography.small && typography.small.fontSize) ||
      baseTypography.small ||
      12,
    color: colors.primary,
    fontWeight: "600",
    marginLeft: spacing.xs,
  },

  centerCardPrice: {
    fontSize:
      (typography && typography.cardTitle && typography.cardTitle.fontSize) ||
      baseTypography.cardTitle ||
      18,
    fontWeight: "800",
    color: colors.primary,
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    textAlign: "center",
    minWidth: 70,
  },

  centerCardLocation: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceMuted,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    minWidth: 90,
    justifyContent: "center",
  },

  centerCardLocationText: {
    fontSize:
      (typography && typography.small && typography.small.fontSize) ||
      baseTypography.small ||
      12,
    color: colors.primary,
    fontWeight: "700",
    marginLeft: spacing.xs,
  },

  /* DESCRIPTION */
  centerCardDescription: {
    fontSize:
      (typography && typography.small && typography.small.fontSize) ||
      baseTypography.small ||
      12,
    color: colors.textMuted,
    lineHeight: 18,
    marginBottom: spacing.xs,
    fontWeight: "500",
  },

  /* AMENITIES */
  amenitiesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },

  amenitiesPreview: {
    fontSize:
      (typography && typography.small && typography.small.fontSize) ||
      baseTypography.small ||
      12,
    color: colors.primary,
    fontWeight: "600",
    marginLeft: spacing.xs,
    flex: 1,
  },

  /* INFO BADGES */
  infoBadgesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: spacing.md,
    gap: spacing.xs,
  },

  infoBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f4ff",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: "#e0e7ff",
  },

  infoBadgeText: {
    fontSize:
      (typography && typography.caption && typography.caption.fontSize) ||
      baseTypography.caption ||
      10,
    color: colors.secondary,
    fontWeight: "600",
    marginLeft: spacing.xs,
  },

  /* BUTTON */
  centerCardButton: {
    height: spacing.buttonHeight - 4,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    ...shadows.sm,
  },

  centerCardButtonText: {
    fontSize:
      (typography && typography.small && typography.small.fontSize) ||
      baseTypography.small ||
      12,
    fontWeight: "700",
    color: colors.surface,
    letterSpacing: 0.3,
  },
});
