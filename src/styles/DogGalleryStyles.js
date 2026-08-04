import { StyleSheet } from "react-native";
import { typography } from "./themeStyles";

export default StyleSheet.create({
  section: {
    paddingHorizontal: 16,
    paddingTop: 18,
    paddingBottom: 24,
  },
  title: {
    fontSize: typography.h4.fontSize,
    fontWeight: typography.h3.fontWeight,
    color: "#111827",
  },
  subtitle: {
    color: "#6b7280",
    marginTop: 4,
    marginBottom: 14,
  },
  scroll: {
    paddingRight: 16,
  },
  card: {
    width: 260,
    backgroundColor: "#fff",
    borderRadius: 18,
    overflow: "hidden",
    marginRight: 12,
  },
  image: {
    width: "100%",
    height: 180,
  },
  content: {
    padding: 14,
  },
  name: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.h3.fontWeight,
    color: "#111827",
  },
  desc: {
    fontSize: typography.small.fontSize,
    color: "#6b7280",
    marginTop: 4,
  },
  link: {
    color: "#6b21a8",
    fontWeight: typography.h3.fontWeight,
    marginTop: 10,
  },
});
