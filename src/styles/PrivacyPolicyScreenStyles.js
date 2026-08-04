import { StyleSheet } from "react-native";
import { typography } from "./themeStyles";

export default StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  container: {
    padding: 18,
    borderRadius: 0,
  },
  title: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.h3.fontWeight,
    color: "#111827",
    marginBottom: 6,
  },
  updated: {
    fontSize: typography.small.fontSize,
    color: "#6b7280",
    marginBottom: 18,
  },
  heading: {
    fontSize: typography.h4.fontSize,
    fontWeight: typography.h3.fontWeight,
    color: "#111827",
    marginTop: 18,
    marginBottom: 6,
  },
  text: {
    fontSize: typography.small.fontSize,
    color: "#374151",
    lineHeight: 21,
    marginBottom: 8,
  },
});
