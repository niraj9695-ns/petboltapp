import { StyleSheet } from "react-native";
import { colors } from "./theme/colors";
import { spacing } from "./theme/spacing";
import { radius } from "./theme/radius";
import { responsive } from "./theme/responsive";
import { typography as legacyTypography } from "./themeStyles";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.surfaceAlt,
  },
  scrollContainer: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  welcomeTitle: {
    fontSize: legacyTypography.title.fontSize,
    fontWeight: legacyTypography.h3.fontWeight,
    color: colors.text,
  },
  welcomeSubtitle: {
    marginTop: spacing.xs,
    fontSize: legacyTypography.caption.fontSize,
    color: colors.textMuted,
  },
  petImage: {
    width: 180,
    height: 130,
  },

  highlightText: {
    color: colors.primary,
    fontWeight: legacyTypography.h3.fontWeight,
  },
  heroContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  textContainer: {
    flex: 1,
  },
  segmentContainer: {
    flexDirection: "row",
    backgroundColor: colors.surfaceMuted,
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    marginBottom: 0,
    overflow: "hidden",
  },
  segmentButton: {
    flex: 1,
    height: spacing.buttonHeight,
    justifyContent: "center",
    alignItems: "center",
  },
  segmentActive: {
    backgroundColor: "#FFFFFF",
  },
  segmentContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  segmentText: {
    color: colors.textMuted,
    fontWeight: legacyTypography.h3.fontWeight,
    fontSize: legacyTypography.body.fontSize,
  },

  segmentActiveText: {
    color: colors.primary,
    fontWeight: legacyTypography.h3.fontWeight,
  },
  authCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xl,
    padding: spacing.lg,
  },
  guestContainer: {
    marginTop: spacing.xxl,
  },

  guestTitle: {
    fontSize: legacyTypography.title.fontSize,
    fontWeight: legacyTypography.h3.fontWeight,
    color: colors.text,
  },

  guestSubtitle: {
    fontSize: legacyTypography.small.fontSize,
    color: colors.textMuted,
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
  },

  guestCardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  guestCard: {
    width: responsive.isTablet ? "48%" : "49%",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.xl,
    padding: spacing.sm,
    height: 140,
    position: "relative",
  },

  iconCirclePurple: {
    width: 30,
    height: 30,
    borderRadius: 24,
    backgroundColor: colors.surfaceMuted,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  iconCircleGreen: {
    width: 30,
    height: 30,
    borderRadius: 24,
    backgroundColor: colors.surfaceMuted,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  iconText: {
    fontSize: legacyTypography.h4.fontSize,
  },

  guestCardTitle: {
    fontSize: legacyTypography.small.fontSize,
    fontWeight: legacyTypography.h3.fontWeight,
    color: colors.text,
    marginBottom: spacing.xs,
  },

  guestCardDescription: {
    fontSize: legacyTypography.caption.fontSize,
    color: colors.textMuted,
    width: "90%",
  },

  arrowPurple: {
    position: "absolute",
    right: 10,
    bottom: 3,
    width: 20,
    height: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },

  arrowGreen: {
    position: "absolute",
    right: 10,
    bottom: 3,
    width: 20,
    height: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: colors.success,
    alignItems: "center",
    justifyContent: "center",
  },

  featuresContainer: {
    marginTop: spacing.lg,
    backgroundColor: colors.surface,
    borderRadius: radius.xxl,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.sm,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#F1F1F1",
  },

  featureItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  featureTitle: {
    fontSize: legacyTypography.small.fontSize,
    fontWeight: legacyTypography.h3.fontWeight,
    color: colors.primary,
    textAlign: "center",
  },

  featureSubtitle: {
    marginTop: spacing.xs,
    fontSize: legacyTypography.caption.fontSize,
    color: colors.textMuted,
    textAlign: "center",
    lineHeight: 15,
  },
});
