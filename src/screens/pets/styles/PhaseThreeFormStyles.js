import { StyleSheet } from "react-native";
import { lightTheme } from "../../../theme/lightTheme";

export default function createPhaseThreeFormStyles(theme = lightTheme) {
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
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  switchLabel: {
    fontWeight: "600",
    fontSize: 15,
    color: palette.textPrimary,
    flex: 1,
  },
  inputError: {
    borderColor: palette.error,
    backgroundColor: palette.errorBackground,
  },
  });
}
