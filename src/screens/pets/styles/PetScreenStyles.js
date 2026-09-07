import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme/colors";
import { spacing } from "../../../styles/theme/spacing";
import { radius } from "../../../styles/theme/radius";
import { typography } from "../../../styles/themeStyles";
import { typography as baseTypography } from "../../../styles/theme/typography";
import { shadows } from "../../../styles/theme/shadows";

export default StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDF9FF",
  },
  screen: {
    flex: 1,
    backgroundColor: "#FDF9FF",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  heading: {
    fontSize:
      (typography && typography.heroTitle && typography.heroTitle.fontSize) ||
      baseTypography.heroTitle ||
      24,
    fontWeight: "800",
    color: "#0f172a",
  },
  addBtn: {
    backgroundColor: "#6b21a8",
    width: 38,
    height: 38,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#8b5cf6",
    elevation: 4,
    shadowColor: "#6b21a8",
    shadowOpacity: 0.22,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  container: {
    padding: 16,
    paddingBottom: 100,
    backgroundColor: "#FDF9FF",
    flexGrow: 1,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,255,255,0.7)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
  paginationFooter: {
    width: "100%",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 16,
  },
  nextPageButton: {
    backgroundColor: "#6b21a8",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
    minWidth: 180,
    alignItems: "center",
  },
  nextPageButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },
});
