import { StyleSheet } from "react-native";
import { typography } from "./themeStyles";
import { typography as baseTypography } from "./theme/typography";

export default StyleSheet.create({
  container: {
    position: "relative",
    marginBottom: 14,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    backgroundColor: "#fff",
    color: "#111827",
    fontSize: (typography && typography.body && typography.body.fontSize) || baseTypography.body || 14,
  },
  icon: {
    position: "absolute",
    right: 12,
    top: 12,
  },
});
