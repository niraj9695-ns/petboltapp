import { StyleSheet } from "react-native";
import { typography } from "./themeStyles";
import { typography as baseTypography } from "./theme/typography";

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  headerRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },

  backButtonText: {
    fontSize: (typography && typography.small && typography.small.fontSize) || baseTypography.small || 12,
    fontWeight: (typography && typography.smallMedium && typography.smallMedium.fontWeight) || baseTypography.weights.medium || "500",
    color: "#6b21a8",
  },

  editTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: (typography && typography.h4 && typography.h4.fontSize) || baseTypography.h4 || 18,
    fontWeight: (typography && typography.h3 && typography.h3.fontWeight) || baseTypography.weights.bold || "700",
    color: "#1f2937",
    marginRight: 45,
  },

  container: {
    marginVertical: 15,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    width: "92%",
    alignSelf: "center",
  },

  editCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,

    shadowColor: "#6b21a8",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  formLabel: {
    fontSize: (typography && typography.small && typography.small.fontSize) || baseTypography.small || 12,
    fontWeight: (typography && typography.caption && typography.caption.fontWeight) || baseTypography.weights.semibold || "600",
    color: "#6B7280",
    marginBottom: 6,
    marginTop: 12,
  },

  input: {
    width: "100%",
    height: 56,
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    fontSize: (typography && typography.body && typography.body.fontSize) || baseTypography.body || 14,
    color: "#111827",
  },

  multiLineInput: {
    minHeight: 100,
    paddingTop: 12,
    textAlignVertical: "top",
  },

  fileButton: {
    marginTop: 18,
    backgroundColor: "#EEF2FF",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },

  fileButtonText: {
    color: "#4338CA",
    fontWeight: (typography && typography.h3 && typography.h3.fontWeight) || baseTypography.weights.bold || "700",
    fontSize: (typography && typography.small && typography.small.fontSize) || baseTypography.small || 12,
  },

  fileName: {
    marginTop: 10,
    textAlign: "center",
    color: "#374151",
    fontWeight: typography.bodyMedium.fontWeight,
  },

  documentCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,

    shadowColor: "#6b21a8",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  documentInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  documentIcon: {
    fontSize: (typography && typography.h3 && typography.h3.fontSize) || baseTypography.h3 || 20,
    marginRight: 12,
  },

  documentTitle: {
    fontSize: (typography && typography.body && typography.body.fontSize) || baseTypography.body || 14,
    fontWeight: (typography && typography.h3 && typography.h3.fontWeight) || baseTypography.weights.bold || "700",
    color: "#111827",
  },

  documentSubTitle: {
    fontSize: (typography && typography.small && typography.small.fontSize) || baseTypography.small || 12,
    color: "#6B7280",
    marginTop: 2,
  },

  viewDocumentBtn: {
    marginTop: 16,
    backgroundColor: "#6b21a8",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },

  viewDocumentText: {
    color: "#FFFFFF",
    fontWeight: (typography && typography.h3 && typography.h3.fontWeight) || baseTypography.weights.bold || "700",
    fontSize: (typography && typography.small && typography.small.fontSize) || baseTypography.small || 12,
  },

  buttonContainer: {
    marginTop: 24,
    alignItems: "center",
  },

  btnRow: {
    flexDirection: "row",
    width: "95%",
    gap: 12,
  },

  primaryBtn: {
    flex: 1,
    backgroundColor: "#6b21a8",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  primaryBtnText: {
    color: "#FFFFFF",
    fontWeight: (typography && typography.h3 && typography.h3.fontWeight) || baseTypography.weights.bold || "700",
    fontSize: (typography && typography.body && typography.body.fontSize) || baseTypography.body || 14,
  },

  secondaryBtn: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },

  secondaryBtnText: {
    color: "#6b21a8",
    fontWeight: (typography && typography.h3 && typography.h3.fontWeight) || baseTypography.weights.bold || "700",
    fontSize: (typography && typography.body && typography.body.fontSize) || baseTypography.body || 14,
  },

  cancelBtn: {
    backgroundColor: "#FFFFFF",
  },
});
