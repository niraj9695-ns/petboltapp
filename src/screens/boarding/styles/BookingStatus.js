import { createTypographyStyleSheet as StyleSheet } from "../../../styles/theme/typography";

import { colors } from "../../../styles/theme/colors";
import { spacing } from "../../../styles/theme/spacing";
import { radius } from "../../../styles/theme/radius";
import { responsive } from "../../../styles/theme/responsive";
import { typography } from "../../../styles/themeStyles";
import { typography as baseTypography } from "../../../styles/theme/typography";
import { shadows } from "../../../styles/theme/shadows";

export default StyleSheet({
  /* =====================================================
     LOADER
  ===================================================== */

  loaderScreen: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 0,
    zIndex: 1000,
  },

  /* =====================================================
     MAIN CONTAINER
  ===================================================== */

  bookingStatusContainer: {
    flex: 1,
    backgroundColor: colors.background,
  },

  /* =====================================================
     HEADER
  ===================================================== */

  headerSection: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  bookingStatusTitle: {
    fontSize:
      (typography && typography.heroTitle && typography.heroTitle.fontSize) ||
      baseTypography.heroTitle ||
      28,

    fontWeight: "800",
    color: colors.text,
    marginBottom: spacing.xs,
  },

  bookingStatusSubtitle: {
    fontSize:
      (typography && typography.subtitle && typography.subtitle.fontSize) ||
      baseTypography.subtitle ||
      16,

    color: colors.textMuted,
    fontWeight: "500",
  },

  /* =====================================================
     VERTICAL BOOKING LIST
  ===================================================== */

  bookingListContainer: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 4,

    /*
     * Center cards on large screens
     */
    alignItems: "center",
  },

  /* =====================================================
     BOOKING CARD
  ===================================================== */

  bookingStatusCard: {
    borderRadius: radius.xxl,
    padding: spacing.lg,

    /*
     * IMPORTANT:
     * No marginRight because list is vertical
     */
    marginBottom: spacing.sm,

    borderWidth: 1,
    borderColor: colors.border,

    ...shadows.md,

    overflow: "hidden",
  },

  /* =====================================================
     COLLAPSED HEADER
  ===================================================== */

  bookingHeader: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 72,
    width: "100%",
  },

  /* =====================================================
     PET IMAGE
  ===================================================== */

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
    fontSize:
      (typography && typography.heroTitle && typography.heroTitle.fontSize) ||
      baseTypography.heroTitle ||
      28,
  },

  /* =====================================================
     PET INFORMATION
  ===================================================== */

  petNameSection: {
    flex: 1,
    minWidth: 0,
  },

  bookingStatusPetName: {
    fontWeight: "800",

    fontSize:
      (typography && typography.cardTitle && typography.cardTitle.fontSize) ||
      baseTypography.cardTitle ||
      18,

    color: colors.text,
    marginBottom: spacing.xs,
  },

  petBreedText: {
    fontSize:
      (typography && typography.small && typography.small.fontSize) ||
      baseTypography.small ||
      12,

    color: colors.textMuted,
    fontWeight: "500",
  },

  /* =====================================================
     RIGHT SIDE
  ===================================================== */

  headerRightSection: {
    alignItems: "flex-end",
    justifyContent: "center",
    marginLeft: spacing.sm,
    gap: 8,
  },

  /* =====================================================
     STATUS BADGE
  ===================================================== */

  statusBadgeContainer: {
    flexDirection: "row",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: "center",
    maxWidth: 125,
  },

  bookingStatusBadgeText: {
    fontWeight: "700",
    fontSize: 10,
    letterSpacing: 0.2,
  },

  /* =====================================================
     EXPANDED CONTENT
  ===================================================== */

  expandedContent: {
    paddingTop: 4,
    width: "100%",
  },

  /* =====================================================
     DIVIDER
  ===================================================== */

  cardDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginBottom: spacing.md,
  },

  /* =====================================================
     BOARDING CENTER
  ===================================================== */

  infoSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surfaceAlt,
    borderRadius: radius.lg,
    marginBottom: spacing.lg,
  },

  infoContent: {
    flex: 1,
    minWidth: 0,
  },

  infoLabel: {
    fontSize:
      (typography && typography.caption && typography.caption.fontSize) ||
      baseTypography.caption ||
      10,

    color: colors.textMuted,
    fontWeight: "400",
    marginBottom: spacing.xs,
  },

  infoValue: {
    fontSize:
      (typography && typography.body && typography.body.fontSize) ||
      baseTypography.body ||
      14,

    color: colors.text,
    fontWeight: "700",
  },

  /* =====================================================
     DATES
  ===================================================== */

  datesRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    width: "100%",
  },

  dateBox: {
    flex: 1,
    minWidth: 0,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
  },

  dateLabel: {
    fontSize:
      (typography && typography.caption && typography.caption.fontSize) ||
      baseTypography.caption ||
      10,

    color: colors.textMuted,
    fontWeight: "400",
    marginBottom: spacing.xs,
  },

  dateContent: {
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
  },

  dateValue: {
    flex: 1,

    fontSize: responsive.isTablet
      ? (typography && typography.small && typography.small.fontSize) ||
        baseTypography.small ||
        12
      : (typography && typography.caption && typography.caption.fontSize) ||
        baseTypography.caption ||
        10,

    color: colors.text,
    fontWeight: "700",
  },

  dateArrow: {
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  /* =====================================================
     DESKTOP DETAILS
  ===================================================== */

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
    minWidth: 0,
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

  /* =====================================================
     MOBILE DETAILS
  ===================================================== */

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
    fontSize:
      (typography && typography.caption && typography.caption.fontSize) ||
      baseTypography.caption ||
      10,

    color: colors.textMuted,
    fontWeight: "600",
  },

  mobileDetailValue: {
    fontSize:
      (typography && typography.body && typography.body.fontSize) ||
      baseTypography.body ||
      14,

    color: colors.text,
    fontWeight: "700",
  },

  /* =====================================================
     ACTIVE BOOKING PROGRESS
  ===================================================== */

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

  /* =====================================================
     UPCOMING NOTE
  ===================================================== */

  bookingNoteText: {
    fontSize: 13,
    color: "#6b21a8",
    fontWeight: "700",
    marginBottom: 16,
    textAlign: "center",
    lineHeight: 19,
  },

  /* =====================================================
     ACTION BUTTONS
  ===================================================== */

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

  /* =====================================================
     EMPTY STATE
  ===================================================== */

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

  /* =====================================================
     PAGINATION
  ===================================================== */

  paginationFooter: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
    paddingBottom: 20,
  },

  nextPageButton: {
    minWidth: 180,
    minHeight: 50,

    paddingHorizontal: 24,

    backgroundColor: "#6b21a8",

    borderRadius: 14,

    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",

    gap: 8,
  },

  nextPageButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },

  pageInfoText: {
    marginTop: 8,
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "500",
  },

  /* =====================================================
     LOADING MORE
  ===================================================== */

  loadingMoreContainer: {
    width: "100%",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },

  loadingMoreText: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: "600",
  },

  /* =====================================================
     PAGINATION END
  ===================================================== */

  paginationEnd: {
    width: "100%",
    alignItems: "center",
    paddingTop: 4,
    paddingBottom: 8,
  },

  paginationEndText: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "500",
  },
});

