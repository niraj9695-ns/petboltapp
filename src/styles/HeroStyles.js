import { StyleSheet } from "react-native";
import { typography } from "./themeStyles";

export default StyleSheet.create({
  wrapper: {
    width: "100%",
  },
  container: {
    padding: 18,
    borderRadius: 24,
    overflow: "hidden",
  },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.75)",
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginBottom: 16,
  },
  badgeText: {
    color: "#7c3aed",
    fontSize: typography.caption.fontSize,
    fontWeight: typography.caption.fontWeight,
  },
  title: {
    fontSize: typography.h1.fontSize,
    fontWeight: typography.h1.fontWeight,
    lineHeight: 38,
    color: "#111827",
    marginBottom: 10,
  },
  gradientText: {
    color: "#6b21a8",
  },
  desc: {
    color: "#4b5563",
    fontSize: typography.small.fontSize,
    lineHeight: 20,
    marginBottom: 18,
  },
  btnRow: {
    flexDirection: "row",
    gap: 10,
    flexWrap: "wrap",
  },
  primaryBtn: {
    backgroundColor: "#6b21a8",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  primaryBtnText: {
    color: "#fff",
    fontWeight: typography.h1.fontWeight,
  },
  secondaryBtn: {
    borderWidth: 1,
    borderColor: "#d1d5db",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 999,
  },
  secondaryBtnText: {
    color: "#111827",
    fontWeight: typography.title.fontWeight,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 22,
  },
  statBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.6)",
    borderRadius: 16,
    paddingVertical: 12,
    marginHorizontal: 4,
    alignItems: "center",
  },
  statNum: {
    fontSize: typography.title.fontSize,
    fontWeight: typography.h1.fontWeight,
    color: "#111827",
  },
  statLabel: {
    fontSize: typography.caption.fontSize,
    color: "#6b7280",
    marginTop: 4,
  },
});
