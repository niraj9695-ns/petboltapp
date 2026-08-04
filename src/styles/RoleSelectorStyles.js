import { StyleSheet } from "react-native";
import { typography } from "./themeStyles";

export default StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  title: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.h3.fontWeight,
    color: "#333",
    marginBottom: 12,
  },
  card: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  activeCard: {
    backgroundColor: "#6b21a8",
    borderColor: "#6b21a8",
  },
  cardTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.h3.fontWeight,
    color: "#222",
    marginBottom: 6,
  },
  cardDescription: {
    fontSize: typography.small.fontSize,
    color: "#666",
    lineHeight: 20,
  },
  activeText: {
    color: "#fff",
  },
});
