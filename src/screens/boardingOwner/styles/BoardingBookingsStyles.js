import { StyleSheet } from "react-native";
import { boardingOwnerTheme, typography } from "../../../styles/themeStyles";
import { typography as baseTypography } from "../../../styles/theme/typography";

const COLORS = {
  ...boardingOwnerTheme,
  warning: boardingOwnerTheme.accent,
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: COLORS.surfaceAlt,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.primary,
  },
  headerSubtitle: {
    fontSize: 12,
    color: COLORS.gray,
    marginTop: 4,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 18,
    padding: 16,
    marginBottom: 14,
    alignSelf: "center",
    borderWidth: 1,
    borderColor: COLORS.border,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  petName: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    flex: 1,
    marginRight: 8,
  },
  info: {
    color: COLORS.gray,
    marginBottom: 4,
    fontSize: 12,
    fontWeight: "600",
  },
  date: {
    marginTop: 10,
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 12,
  },
  priceRow: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  priceText: {
    color: COLORS.primary,
    fontWeight: "800",
    fontSize: 12,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },
  accepted: {
    backgroundColor: "#DCFCE7",
  },
  pending: {
    backgroundColor: "#FEF3C7",
  },
  statusText: {
    fontWeight: "700",
    fontSize: 12,
    textTransform: "capitalize",
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.surfaceAlt,
    position: "relative",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: COLORS.textMuted,
    fontSize: (typography && typography.body && typography.body.fontSize) || baseTypography.body || 14,
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    backgroundColor: COLORS.white,
  },
  paginationButton: {
    minWidth: 56,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  paginationButtonDisabled: {
    opacity: 0.5,
  },
  paginationButtonText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 13,
  },
  pageNumberButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: "center",
    justifyContent: "center",
  },
  activePageNumberButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  pageNumberButtonText: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 13,
  },
  activePageNumberButtonText: {
    color: COLORS.white,
  },
});
