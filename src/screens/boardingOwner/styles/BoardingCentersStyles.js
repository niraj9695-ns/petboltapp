import { StyleSheet } from "react-native";
import { boardingOwnerTheme, typography } from "../../../styles/themeStyles";

const COLORS = boardingOwnerTheme;

export default StyleSheet.create({
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
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.h3.fontWeight,
    color: COLORS.primary,
  },

  createButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
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
    fontSize: typography.title.fontSize,
    fontWeight: typography.title.fontWeight,
    color: COLORS.text,
  },

  location: {
    marginTop: 4,
    color: COLORS.textMuted,
    fontSize: typography.small.fontSize,
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
    fontWeight: typography.title.fontWeight,
    fontSize: typography.small.fontSize,
  },

  emptyState: {
    paddingVertical: 60,
    alignItems: "center",
  },

  emptyText: {
    color: COLORS.textMuted,
    fontSize: typography.body.fontSize,
  },

  summaryText: {
    marginTop: 8,
    color: COLORS.textMuted,
    fontSize: typography.caption.fontSize,
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
    fontWeight: typography.title.fontWeight,
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
    fontWeight: typography.title.fontWeight,
  },

  activePageNumberButtonText: {
    color: COLORS.surface,
  },
});
