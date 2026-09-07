import { StyleSheet } from "react-native";
import { typography } from "./themeStyles";
import { typography as baseTypography } from "./theme/typography";

export default StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#FDF9FF",
  },
  container: {
    padding: 18,
    borderRadius: 0,
  },
  pageHeader: {
    position: "relative",
    minHeight: 56,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 18,
  },

  backButtonWrap: {
    position: "absolute",
    left: 0,
    zIndex: 1,
    width: 100,
    alignItems: "flex-start",
  },

  headerText: {
    width: "100%",
    alignItems: "center",
    paddingHorizontal: 56,
  },

  title: {
    fontSize:
      (typography && typography.h3 && typography.h3.fontSize) ||
      baseTypography.h3 ||
      20,
    fontWeight:
      (typography && typography.h3 && typography.h3.fontWeight) ||
      baseTypography.weights.bold ||
      "700",
    color: "#111827",
    textAlign: "center",
  },

  updated: {
    fontSize:
      (typography && typography.small && typography.small.fontSize) ||
      baseTypography.small ||
      12,
    color: "#6b7280",
    marginTop: 2,
    textAlign: "center",
  },
  heading: {
    fontSize:
      (typography && typography.h4 && typography.h4.fontSize) ||
      baseTypography.h4 ||
      18,
    fontWeight:
      (typography && typography.h3 && typography.h3.fontWeight) ||
      baseTypography.weights.bold ||
      "700",
    color: "#111827",
    marginTop: 18,
    marginBottom: 6,
  },
  text: {
    fontSize:
      (typography && typography.small && typography.small.fontSize) ||
      baseTypography.small ||
      12,
    color: "#374151",
    lineHeight: 21,
    marginBottom: 8,
  },
});
