import { StyleSheet } from "react-native";
import { typography } from "./themeStyles";
import { typography as baseTypography } from "./theme/typography";

export default StyleSheet.create({
  heading: {
    fontSize: (typography && typography.h2 && typography.h2.fontSize) || baseTypography.h2 || 24,
    fontWeight: (typography && typography.h2 && typography.h2.fontWeight) || baseTypography.weights.bold || "700",
    marginBottom: 10,
  },
  subText: {
    color: "#666",
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  otpBox: {
    width: 50,
    height: 58,

    borderWidth: 1,
    borderColor: "#E5E7EB",

    borderRadius: 16,

    backgroundColor: "#FFFFFF",

    textAlign: "center",

    fontSize: (typography && typography.h3 && typography.h3.fontSize) || baseTypography.h3 || 20,
    fontWeight: (typography && typography.h3 && typography.h3.fontWeight) || baseTypography.weights.bold || "700",

    color: "#6B21A8",

    shadowColor: "#B79FFF",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },

  otpBoxActive: {
    borderColor: "#6B21A8",
    borderWidth: 2,
  },
  resendText: {
    color: "#6b21a8",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: (typography && typography.title && typography.title.fontWeight) || baseTypography.weights.semibold || "600",
  },
  button: {
    backgroundColor: "#6b21a8",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: (typography && typography.h3 && typography.h3.fontWeight) || baseTypography.weights.bold || "700",
  },
  backText: {
    textAlign: "center",
    marginTop: 15,
    color: "#666",
  },
});
