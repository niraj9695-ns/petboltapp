import { StyleSheet } from "react-native";
import { typography } from "./themeStyles";
import { typography as baseTypography } from "./theme/typography";

export default StyleSheet.create({
  container: {
    marginBottom: 14,
    position: "relative",
  },
  label: {
    position: "absolute",
    left: 12,
    top: 16,
    fontSize: (typography && typography.small && typography.small.fontSize) || baseTypography.small || 12,
    color: "#888",
    backgroundColor: "#fff",
    paddingHorizontal: 4,
    zIndex: 10,
  },
  labelActive: {
    top: -8,
    fontSize: (typography && typography.caption && typography.caption.fontSize) || baseTypography.caption || 10,
    color: "#6b21a8",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 10,
    paddingTop: 18,
    backgroundColor: "#fff",
  },
});
