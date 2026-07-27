import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: 18,
    paddingBottom: 32,
  },
  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  subHeading: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 16,
  },
  card: {
    borderRadius: 18,
    overflow: "hidden",
  },
  notificationCard: {
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  desc: {
    fontSize: 13,
    color: "#4b5563",
    marginTop: 4,
  },
  date: {
    fontSize: 12,
    color: "#6b7280",
    marginTop: 6,
  },
  expandedBox: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.4)",
  },
  fullText: {
    fontSize: 13,
    color: "#111827",
    lineHeight: 18,
  },
  actionRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 12,
  },
  secondaryBtn: {
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  primaryBtn: {
    backgroundColor: "#6b21a8",
    borderRadius: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  emptyBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyText: {
    color: "#9ca3af",
    fontSize: 14,
    marginTop: 10,
  },
});
