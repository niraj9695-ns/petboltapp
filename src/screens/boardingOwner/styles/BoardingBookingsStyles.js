import { StyleSheet } from "react-native";

const COLORS = {
  primary: "#6b21a8",
  secondary: "#9333ea",
  lightPurple: "#f5ebff",
  white: "#ffffff",
  text: "#1f2937",
  gray: "#6b7280",
  border: "#e9d8fd",
  success: "#16a34a",
  warning: "#d97706",
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  header: {
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.primary,
  },
  headerSubtitle: {
    fontSize: 13,
    color: COLORS.gray,
    marginTop: 4,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  card: {
    backgroundColor: COLORS.white,
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
    marginBottom: 10,
  },
  petName: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
    flex: 1,
    marginRight: 8,
  },
  info: {
    color: COLORS.gray,
    marginBottom: 4,
    fontSize: 14,
  },
  date: {
    marginTop: 10,
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 13,
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
    fontSize: 15,
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
    backgroundColor: COLORS.lightPurple,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    color: COLORS.gray,
    fontSize: 15,
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
