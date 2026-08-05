import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme/colors";
import { spacing } from "../../../styles/theme/spacing";
import { radius } from "../../../styles/theme/radius";
import { typography } from "../../../styles/themeStyles";
import { typography as baseTypography } from "../../../styles/theme/typography";
import { shadows } from "../../../styles/theme/shadows";

export default StyleSheet.create({
  bookingScreenContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },

  bookingScreenContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },

  bookingScreenCard: {
    backgroundColor: colors.surface,
    padding: spacing.lg,
    borderRadius: radius.card,
    marginBottom: spacing.lg,
    width: "100%",
    ...shadows.sm,
  },

  bookingScreenCenterName: {
    fontSize: (typography && typography.h1 && typography.h1.fontSize) || 34,
    fontWeight: "700",
    color: colors.text,
  },

  bookingScreenPrice: {
    marginTop: spacing.xs,
    color: colors.primary,
    fontWeight: "700",
    fontSize: (typography && typography.body && typography.body.fontSize) || baseTypography.body || 14,
  },

  bookingScreenHeading: {
    fontSize: (typography && typography.cardTitle && typography.cardTitle.fontSize) || 18,
    fontWeight: "700",
    marginBottom: spacing.md,
    color: colors.text,
  },

  bookingScreenInputWrapper: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.input,
    overflow: "hidden",
    backgroundColor: colors.surface,
  },

  bookingScreenPicker: {
    width: "100%",
    color: colors.text,
  },

  bookingScreenDateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: spacing.lg,
  },

  bookingScreenDatePill: {
    flex: 1,
    borderRadius: radius.input,
    padding: spacing.md,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.sm,
  },

  bookingScreenActivePill: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  bookingScreenDateLabel: {
    fontSize: (typography && typography.caption && typography.caption.fontSize) || baseTypography.caption || 10,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },

  bookingScreenDateValue: {
    fontSize: (typography && typography.body && typography.body.fontSize) || baseTypography.body || 14,
    fontWeight: "700",
    color: colors.text,
  },

  bookingScreenActivePillText: {
    color: colors.surface,
  },

  calendarWrapper: {
    marginTop: spacing.md,
    borderRadius: radius.card,
    overflow: "hidden",
  },

  bookingScreenLegendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.md,
  },

  bookingScreenMarkerBadge: {
    width: 14,
    height: 14,
    borderRadius: 4,
    marginRight: spacing.sm,
  },

  bookingScreenMarkerText: {
    color: colors.textMuted,
    fontSize: (typography && typography.small && typography.small.fontSize) || baseTypography.small || 12,
  },

  warningText: {
    marginTop: spacing.sm,
    color: colors.danger,
    fontWeight: "600",
  },

  statusNote: {
    marginTop: spacing.sm,
    color: colors.textMuted,
  },

  smallLoader: {
    marginTop: spacing.sm,
  },

  bookingScreenOrangeBtn: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
    borderRadius: radius.button,
    alignItems: "center",
  },

  bookingScreenBookBtn: {
    backgroundColor: colors.primary,
    padding: spacing.xl,
    borderRadius: radius.card,
    alignItems: "center",
    marginTop: spacing.sm,
    marginBottom: spacing.xxxl,
  },

  bookingScreenBtnText: {
    color: colors.surface,
    fontWeight: "700",
    fontSize: (typography && typography.small && typography.small.fontSize) || baseTypography.small || 12,
  },

  availableInfoContainer: {
    marginTop: spacing.lg,
  },

  availabilityText: {
    marginTop: spacing.sm,
    fontWeight: "700",
    fontSize: baseTypography.subtitle || 16,
  },

  bookingScreenInput: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.input,
    padding: spacing.md,
    minHeight: 100,
    textAlignVertical: "top",
    backgroundColor: colors.surface,
  },

  totalCostText: {
    marginTop: spacing.xs,
    fontWeight: "700",
    fontSize: baseTypography.cardTitle || 18,
    color: colors.primary,
  },
  /* Pricing summary styles */
  pricingCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    padding: spacing.lg,
    marginBottom: spacing.md,
    ...shadows.md,
  },

  pricingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.sm,
  },

  pricingLabel: {
    color: colors.textMuted,
    fontSize: baseTypography.body || 14,
  },

  pricingValue: {
    color: colors.text,
    fontWeight: "800",
    fontSize: baseTypography.small || 12,
  },

  pricingTotal: {
    fontSize: baseTypography.sectionTitle || 20,
    fontWeight: "900",
    color: colors.text,
  },

  discountBadge: {
    backgroundColor: "#fffbeb",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: "#f59e0b",
  },

  availabilityPill: {
    backgroundColor: "#ecfccb",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.round,
    borderWidth: 1,
    borderColor: "#84cc16",
  },
});