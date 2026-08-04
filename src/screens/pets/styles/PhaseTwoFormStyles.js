import { StyleSheet } from "react-native";
import { lightTheme } from "../../../theme/lightTheme";
import { darkTheme } from "../../../theme/darkTheme";

const theme = { light: lightTheme, dark: darkTheme };

export default function createPhaseTwoFormStyles(isDark = false) {
  const palette = theme[isDark ? "dark" : "light"];

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
  sectionLabel: {
    marginBottom: 5,
    fontWeight: "600",
    color: palette.textPrimary,
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
  });
}
