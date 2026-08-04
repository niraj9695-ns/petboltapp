import { StyleSheet } from "react-native";
import { typography } from "./themeStyles";

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
    fontSize: typography.body.fontSize,
  },
  icon: {
    position: "absolute",
    right: 12,
    top: 12,
  },
});
