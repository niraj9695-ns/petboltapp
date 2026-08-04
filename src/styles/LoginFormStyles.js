import { StyleSheet } from "react-native";
import { typography } from "./themeStyles";

export default StyleSheet.create({
  heading: {
    fontSize: typography.h2.fontSize,
    fontWeight: typography.h2.fontWeight,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    backgroundColor: "#fff",

    color: "#111827", // Add this
    fontSize: typography.body.fontSize, // Optional
  },
  forgotText: {
    textAlign: "right",
    color: "#6b21a8",
    fontWeight: typography.title.fontWeight,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#6b21a8",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: typography.h1.fontWeight,
  },
  errorTopText: {
    color: "#dc2626",
    backgroundColor: "#fef2f2",
    borderWidth: 1,
    borderColor: "#fecaca",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    fontSize: typography.small.fontSize,
    fontWeight: typography.title.fontWeight,
  },
  errorText: {
    color: "#dc2626",
    fontSize: typography.caption.fontSize,
    marginTop: -6,
    marginBottom: 10,
    marginLeft: 2,
  },
});
