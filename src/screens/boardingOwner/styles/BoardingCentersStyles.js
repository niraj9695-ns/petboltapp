import { createTypographyStyleSheet as StyleSheet } from "../../../styles/theme/typography";
import { boardingOwnerTheme, typography } from "../../../styles/themeStyles";
import { typography as baseTypography } from "../../../styles/theme/typography";

const COLORS = boardingOwnerTheme;

export default StyleSheet({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    flexDirection: "column",
    justifyContent: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.primary,
  },

  createButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },

  createButtonText: {
    color: COLORS.surface,
    fontWeight: typography.title.fontWeight,
    marginLeft: 6,
  },

  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  card: {
    width: "100%",
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },

  image: {
    width: "100%",
    height: 180,
  },

  infoSection: {
    padding: 14,
  },

  centerName: {
    fontSize:
      (typography && typography.title && typography.title.fontSize) ||
      baseTypography.cardTitle ||
      18,
    fontWeight:
      (typography && typography.title && typography.title.fontWeight) ||
      baseTypography.weights.semibold ||
      "600",
    color: COLORS.text,
  },

  location: {
    marginTop: 4,
    color: COLORS.textMuted,
    fontSize:
      (typography && typography.small && typography.small.fontSize) ||
      baseTypography.small ||
      12,
  },

  button: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 14,
    marginBottom: 14,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },

  buttonText: {
    color: COLORS.surface,
    fontWeight:
      (typography && typography.title && typography.title.fontWeight) ||
      baseTypography.weights.semibold ||
      "600",
    fontSize:
      (typography && typography.small && typography.small.fontSize) ||
      baseTypography.small ||
      12,
  },

  emptyState: {
    paddingVertical: 60,
    alignItems: "center",
  },

  emptyText: {
    color: COLORS.textMuted,
    fontSize:
      (typography && typography.body && typography.body.fontSize) ||
      baseTypography.body ||
      14,
  },

  summaryText: {
    marginTop: 0,
    color: COLORS.textMuted,
    fontSize:
      (typography && typography.caption && typography.caption.fontSize) ||
      baseTypography.caption ||
      10,
  },

  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 16,
    flexWrap: "wrap",
    gap: 8,
  },

  paginationButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  paginationButtonText: {
    color: COLORS.primary,
    fontWeight:
      (typography && typography.title && typography.title.fontWeight) ||
      baseTypography.weights.semibold ||
      "600",
  },

  pageNumberButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  activePageNumberButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  pageNumberButtonText: {
    color: COLORS.primary,
    fontWeight:
      (typography && typography.title && typography.title.fontWeight) ||
      baseTypography.weights.semibold ||
      "600",
  },

  activePageNumberButtonText: {
    color: COLORS.surface,
  },
});
