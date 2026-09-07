import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme/colors";
import { spacing } from "../../../styles/theme/spacing";
import { radius } from "../../../styles/theme/radius";
import { typography } from "../../../styles/themeStyles";
import { typography as baseTypography } from "../../../styles/theme/typography";
import { shadows } from "../../../styles/theme/shadows";

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDF9FF",
  },

  /* HEADER SECTION */
  headerSection: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  headerInner: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    backgroundColor: "transparent",
  },

  listContent: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    paddingBottom: 18,
    alignItems: "stretch",
  },

  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: spacing.md,
  },

  headerTitle: {
    fontSize: (typography && typography.heroTitle && typography.heroTitle.fontSize) || baseTypography.heroTitle || 28,
    fontWeight: "800",
    color: colors.text,
    marginBottom: spacing.xs,
  },

  headerSubtitle: {
    fontSize: (typography && typography.subtitle && typography.subtitle.fontSize) || baseTypography.subtitle || 16,
    color: colors.textMuted,
    fontWeight: "500",
  },

  centerCountBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3e8ff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },

  centerCountText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#6b21a8",
  },

  /* FILTER CHIPS */
  filterChipsContainer: {
    flexDirection: "row",
    gap: 8,
  },

  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e7ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: "#c7d2fe",
  },

  filterChipText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4f46e5",
  },

  /* EMPTY STATE */
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
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
    width: "100%",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 8,
  },

  paginationButton: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: "#6b21a8",
    alignItems: "center",
    justifyContent: "center",
  },

  paginationButtonText: {
    color: "#ffffff",
    fontSize: 13,
    fontWeight: "700",
  },

  pageNumberButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    alignItems: "center",
    justifyContent: "center",
  },

  activePageNumberButton: {
    backgroundColor: "#6b21a8",
    borderColor: "#6b21a8",
  },

  pageNumberButtonText: {
    color: "#6b21a8",
    fontWeight: "700",
    fontSize: 13,
  },

  activePageNumberButtonText: {
    color: "#ffffff",
  },

  row: {
    justifyContent: "center",
    alignItems: "stretch",
    gap: 16,
  },
});
