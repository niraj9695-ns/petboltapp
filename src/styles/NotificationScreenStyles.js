import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
  },

  scroll: {
    padding: 18,
    paddingBottom: 32,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },

  subHeading: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },

  markAllBtn: {
    backgroundColor: "#6b21a8",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  deleteAllBtn: {
    backgroundColor: "#ef4444",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  markAllText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 13,
  },

  deleteAllText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 13,
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eef2ff",
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
  },

  infoText: {
    marginLeft: 10,
    color: "#4338ca",
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },

  card: {
    gap: 12,
  },

  notificationItem: {
    borderRadius: 18,
    padding: 18,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },

  unreadCard: {
    borderWidth: 1,
    borderColor: "#c7d2fe",
  },

  readCard: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  iconDot: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#6366f1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  notificationContent: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  date: {
    color: "#6b7280",
    fontSize: 13,
    marginTop: 6,
  },

  expandedBodyWrap: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },

  bodyText: {
    color: "#111827",
    fontSize: 14,
    lineHeight: 20,
  },

  loadMoreBtn: {
    alignSelf: "center",
    backgroundColor: "#ede9fe",
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginTop: 4,
  },

  loadMoreText: {
    color: "#6b21a8",
    fontWeight: "700",
    fontSize: 13,
  },

  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: "#6b21a8",
    marginLeft: 10,
  },

  actionHint: {
    color: "#6b7280",
    fontSize: 12,
    marginTop: 4,
  },

  swipeAction: {
    width: 96,
    backgroundColor: "#dc2626",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
  },

  swipeActionText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 6,
  },

  emptyBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },

  emptyText: {
    marginTop: 14,
    color: "#111827",
    fontSize: 16,
    fontWeight: "600",
  },

  emptySubText: {
    marginTop: 10,
    color: "#6b7280",
    fontSize: 14,
    textAlign: "center",
    maxWidth: 260,
    lineHeight: 20,
  },
  iconButtonPurple: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#6b21a8",
    justifyContent: "center",
    alignItems: "center",
  },

  iconButtonRed: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
  },
});
