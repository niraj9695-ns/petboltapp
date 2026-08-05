import { StyleSheet } from "react-native";
import { lightTheme } from "../../../theme/lightTheme";

export default function createPhaseOneFormStyles(theme = lightTheme) {
  const palette = theme;

  return StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 52,
    marginBottom: 12,
    backgroundColor: palette.inputBackground,
    fontSize: 15,
    color: palette.textPrimary,
  },
  textArea: {
    minHeight: 90,
    textAlignVertical: "top",
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 14,
    marginBottom: 12,
    overflow: "hidden",
    backgroundColor: palette.inputBackground,
  },
  fieldLabel: {
    marginBottom: 6,
    fontWeight: "700",
    color: palette.textPrimary,
    fontSize: 14,
  },
  helperText: {
    color: palette.textSecondary,
    fontSize: 12,
    marginBottom: 8,
  },
  imageSelectButton: {
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 15,
    marginBottom: 12,
    backgroundColor: palette.cardBackground,
  },
  imageSelectButtonText: {
    color: palette.textSecondary,
    fontSize: 15,
  },
  imagePreviewContainer: {
    marginTop: 15,
  },
  imageThumbWrapper: {
    marginRight: 12,
    position: "relative",
    paddingTop: 6,
    paddingRight: 6,
  },
  selectedThumbWrapper: {
    borderWidth: 2,
    borderColor: "#6b21a8",
    borderRadius: 16,
    padding: 2,
  },
  imageThumb: {
    width: 104,
    height: 104,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: palette.border,
  },
  profileBadge: {
    position: "absolute",
    bottom: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  profileBadgeActive: {
    backgroundColor: palette.primary,
  },
  profileBadgeInactive: {
    backgroundColor: "rgba(255,255,255,0.95)",
  },
  profileBadgeText: {
    color: palette.textPrimary,
    fontSize: 12,
    fontWeight: "700",
  },
  removeImageBtn: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
    zIndex: 2,
  },
  removeImageText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 12,
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: palette.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 52,
    marginBottom: 12,
    backgroundColor: palette.inputBackground,
  },
  dateInputText: {
    flex: 1,
    color: palette.textPrimary,
    fontSize: 15,
  },
  inputError: {
    borderColor: palette.error,
    backgroundColor: palette.errorBackground,
  },
  });
}
