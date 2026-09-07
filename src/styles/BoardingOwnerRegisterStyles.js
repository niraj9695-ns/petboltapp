import { createTypographyStyleSheet as StyleSheet } from "./theme/typography";
import { typography } from "./themeStyles";
import { typography as baseTypography } from "./theme/typography";
import { spacing } from "./theme/spacing";

export default StyleSheet({
  heading: {
    fontSize:
      (typography && typography.h4 && typography.h4.fontSize) ||
      baseTypography.sectionTitle ||
      22,
    fontWeight:
      (typography && typography.h3 && typography.h3.fontWeight) ||
      baseTypography.weights.bold ||
      "700",
    marginBottom: 20,
    color: "#222",
  },

  helperText: {
    color: "#666666",
    marginBottom: 12,
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },

  uploadButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },

  uploadText: {
    color: "#444",
  },

  nextButton: {
    backgroundColor: "#6b21a8",
    padding: 14,
    borderRadius: 12,
    minWidth: 120,
    alignItems: "center",
  },

  backButton: {
    backgroundColor: "#999",
    padding: 14,
    borderRadius: 12,
    flex: 1,
    alignItems: "center",
  },

  submitButton: {
    backgroundColor: "#6b21a8",
    padding: 14,
    borderRadius: 12,
    minWidth: 120,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight:
      (typography && typography.h3 && typography.h3.fontWeight) ||
      baseTypography.weights.bold ||
      "700",
  },

  priceRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },

  priceInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  addRowButton: {
    alignSelf: "flex-start",
    marginTop: 4,
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#f3e8ff",
  },

  addRowText: {
    color: "#6b21a8",
    fontWeight: "600",
  },

  removeRowButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#fee2e2",
  },

  removeRowText: {
    color: "#dc2626",
    fontSize:
      (typography && typography.body && typography.body.fontSize) ||
      baseTypography.body ||
      14,
    fontWeight:
      (typography && typography.h3 && typography.h3.fontWeight) ||
      baseTypography.weights.bold ||
      "700",
  },

  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e9d5ff",
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },

  chipText: {
    color: "#4c1d95",
    marginRight: 8,
    fontWeight:
      (typography && typography.caption && typography.caption.fontWeight) ||
      baseTypography.weights.semibold ||
      "600",
  },

  chipSelected: {
    backgroundColor: "#6b21a8",
    borderColor: "#6b21a8",
  },

  chipSelectedText: {
    color: "#fff",
  },

  timePickerButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 12,
  },

  timePickerLabel: {
    color: "#666",
    marginBottom: 4,
  },

  timePickerValue: {
    color: "#222",
    fontSize:
      (typography && typography.body && typography.body.fontSize) ||
      baseTypography.body ||
      14,
    fontWeight:
      (typography &&
        typography.smallMedium &&
        typography.smallMedium.fontWeight) ||
      baseTypography.weights.medium ||
      "500",
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
  },

  phoneWrapper: {
    flexDirection: "row",
    alignItems: "center",

    // Same height as PasswordInput
    height: spacing.inputHeight,

    borderRadius: 16,
    backgroundColor: "#FFFFFF",

    borderWidth: 1,
    borderColor: "#E5E7EB",

    // Prevent +91 background from covering the rounded border
    overflow: "hidden",

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

    // You can keep this because overflow:hidden
    // will keep it inside the rounded border.
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
    marginBottom: 15,
    marginLeft: 4,
  },

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
    height: 56,
    borderRadius: 16,

    justifyContent: "center",
    alignItems: "center",

    backgroundColor: "#6B21A8",

    shadowColor: "#6B21A8",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },

  btnText: {
    color: "#fff",
    fontWeight:
      (typography && typography.h3 && typography.h3.fontWeight) ||
      baseTypography.weights.bold ||
      "700",
  },

  /* Error banner (like PetOwnerRegister) */
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
});
