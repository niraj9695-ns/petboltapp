import { StyleSheet } from "react-native";
import { colors } from "./theme/colors";
import { spacing } from "./theme/spacing";
import { radius } from "./theme/radius";
import { typography } from "./themeStyles";
import { typography as baseTypography } from "./theme/typography";

export default StyleSheet.create({
  fileButton: {
    height: 58,
    borderRadius: 16,

    justifyContent: "center",

    paddingHorizontal: 16,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#E5E7EB",

    marginBottom: 16,
  },
  button: {
    height: spacing.inputHeight,
    borderRadius: radius.input,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#6B21A8",

    shadowColor: "#6B21A8",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },

  btnText: {
    color: "#FFFFFF",
    fontSize:
      (typography && typography.body && typography.body.fontSize) ||
      baseTypography.body ||
      14,
    fontWeight:
      (typography && typography.h3 && typography.h3.fontWeight) ||
      baseTypography.weights.bold ||
      "700",
  },
  btnText: {
    color: "#fff",
    fontWeight: typography.h3.fontWeight,
  },

  phoneWrapper: {
    flexDirection: "row",
    alignItems: "center",
    height: 58,
    borderRadius: 16,

    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#E5E7EB",

    shadowColor: "#B79FFF",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 2,

    marginBottom: 16,
  },

  countryPicker: {
    width: 80,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",

    borderRightWidth: 1,
    borderRightColor: "#F1F5F9",

    backgroundColor: "#FAFAFF",
  },

  countryText: {
    color: "#6B21A8",
    fontSize:
      (typography && typography.body && typography.body.fontSize) ||
      baseTypography.body ||
      14,
    fontWeight:
      (typography && typography.h3 && typography.h3.fontWeight) ||
      baseTypography.weights.bold ||
      "700",
  },

  phoneInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 16,

    color: "#111827",
    fontSize:
      (typography && typography.body && typography.body.fontSize) ||
      baseTypography.body ||
      14,
  },

  errorBanner: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
  },

  errorBannerTitle: {
    color: "#B91C1C",
    fontWeight:
      (typography && typography.h3 && typography.h3.fontWeight) ||
      baseTypography.weights.bold ||
      "700",
    marginBottom: 6,
  },

  errorBannerText: {
    color: "#DC2626",
    fontSize:
      (typography && typography.small && typography.small.fontSize) ||
      baseTypography.small ||
      12,
    marginTop: 2,
  },
  errorTopText: {
    color: "#DC2626",
    fontSize:
      (typography && typography.caption && typography.caption.fontSize) ||
      baseTypography.caption ||
      10,
    fontWeight:
      (typography && typography.caption && typography.caption.fontWeight) ||
      baseTypography.weights.semibold ||
      "600",
    marginBottom: 6,
    marginLeft: 4,
  },
});
