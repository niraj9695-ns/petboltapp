import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme/colors";
import { spacing } from "../../../styles/theme/spacing";
import { radius } from "../../../styles/theme/radius";
import { responsive } from "../../../styles/theme/responsive";
import { typography } from "../../../styles/themeStyles";
import { typography as baseTypography } from "../../../styles/theme/typography";
import { shadows } from "../../../styles/theme/shadows";

export default StyleSheet.create({
  loaderScreen: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 0,
    zIndex: 1000,
  },

  bookingStatusContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },

  headerSection: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xl,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  bookingStatusTitle: {
    fontSize: (typography && typography.heroTitle && typography.heroTitle.fontSize) || baseTypography.heroTitle || 28,
    fontWeight: "800",
    color: colors.text,
    marginBottom: spacing.xs,
  },

  bookingStatusSubtitle: {
    fontSize: (typography && typography.subtitle && typography.subtitle.fontSize) || baseTypography.subtitle || 16,
    color: colors.textMuted,
    fontWeight: "500",
  },

  bookingListContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    paddingBottom: spacing.xxxl,
  },

  bookingStatusCard: {
    borderRadius: radius.xxl,
    padding: spacing.lg,
    marginRight: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.md,
    overflow: "hidden",
  },

  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  petInfoSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  bookingStatusIconBox: {
    width: 64,
    height: 64,
    borderRadius: radius.lg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
    ...shadows.sm,
  },

  bookingStatusPetImage: {
    width: 64,
    height: 64,
    borderRadius: radius.lg,
    marginRight: spacing.md,
    backgroundColor: colors.surfaceMuted,
    borderWidth: 2,
    borderColor: colors.surfaceAlt,
  },

  bookingStatusPetEmoji: {
    fontSize: (typography && typography.heroTitle && typography.heroTitle.fontSize) || baseTypography.heroTitle || 28,
  },

  petNameSection: {
    flex: 1,
  },

  bookingStatusPetName: {
    fontWeight: "800",
    fontSize: (typography && typography.cardTitle && typography.cardTitle.fontSize) || baseTypography.cardTitle || 18,
    color: colors.text,
    marginBottom: spacing.xs,
  },

  petBreedText: {
    fontSize: (typography && typography.small && typography.small.fontSize) || baseTypography.small || 12,
    color: colors.textMuted,
    fontWeight: "500",
  },

  statusBadgeContainer: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: "center",
  },

  bookingStatusBadgeText: {
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: 0.3,
  },

  cardDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: spacing.lg,
  },

  infoSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    marginBottom: spacing.lg,
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    fontSize: (typography && typography.caption && typography.caption.fontSize) || baseTypography.caption || 10,
    color: colors.textMuted,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },

  infoValue: {
    fontSize: (typography && typography.body && typography.body.fontSize) || baseTypography.body || 14,
    color: colors.text,
    fontWeight: "700",
  },

  datesRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  dateBox: {
    flex: 1,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },

  dateLabel: {
    fontSize: (typography && typography.caption && typography.caption.fontSize) || baseTypography.caption || 10,
    color: colors.textMuted,
    fontWeight: "600",
    marginBottom: spacing.xs,
  },

  dateContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  dateValue: {
    fontSize: responsive.isTablet ? ((typography && typography.small && typography.small.fontSize) || baseTypography.small || 12) : ((typography && typography.caption && typography.caption.fontSize) || baseTypography.caption || 10),
    color: colors.text,
    fontWeight: "700",
  },

  dateArrow: {
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  detailsGrid: {
    flexDirection: "row",
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    marginBottom: spacing.lg,
  },

  detailBox: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    justifyContent: "center",
  },

  mobileDetailsCard: {
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.lg,
    padding: spacing.md,
  },

  mobileDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: spacing.xs,
  },

  mobileDetailLabel: {
    fontSize: (typography && typography.caption && typography.caption.fontSize) || baseTypography.caption || 10,
    color: colors.textMuted,
    fontWeight: "600",
  },

  mobileDetailValue: {
    fontSize: (typography && typography.body && typography.body.fontSize) || baseTypography.body || 14,
    color: colors.text,
    fontWeight: "700",
  },

  gridDivider: {
    width: 1,
    backgroundColor: colors.border,
  },

  detailLabel: {
    fontSize: 11,
    color: "#64748b",
    fontWeight: "600",
    marginBottom: 6,
  },

  detailValue: {
    fontSize: 16,
    color: "#0f172a",
    fontWeight: "800",
  },

  detailUnit: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "500",
    marginLeft: 4,
  },

  detailValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  costValue: {
    fontSize: 18,
  },

  progressSection: {
    marginBottom: 16,
  },

  progressLabel: {
    marginBottom: 8,
  },

  progressText: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "600",
  },

  progressBar: {
    height: 8,
    backgroundColor: "#e2e8f0",
    borderRadius: 4,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 4,
  },

  countdownSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e7ff",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#c7d2fe",
  },

  countdownText: {
    fontSize: 13,
    color: "#3730a3",
    fontWeight: "600",
    flex: 1,
  },

  actionButtonsRow: {
    flexDirection: "row",
    gap: 12,
  },

  secondaryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#f3e8ff",
    borderWidth: 1,
    borderColor: "#e9d5ff",
    gap: 8,
  },

  secondaryButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6b21a8",
  },

  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    margin: 10,
  },

  emptyStateText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0f172a",
    marginTop: 16,
    marginBottom: 8,
  },

  emptyStateSubtext: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
    fontWeight: "500",
  },

  paginationFooter: {
    width: 250,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginHorizontal: 16,
  },

  nextPageButton: {
    width: 200,
    marginTop: 200,
    height: 56,
    backgroundColor: "#6b21a8",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  nextPageButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },
});
