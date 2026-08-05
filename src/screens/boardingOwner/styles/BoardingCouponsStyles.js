import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f3ff",
  },
  flexOne: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 28,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    marginTop: 4,
    color: "#6b7280",
  },

  cardsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  pickerWrap: {
    backgroundColor: "#f9fafb",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    overflow: "hidden",
  },
  createButton: {
    backgroundColor: "#6b21a8",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  filterCard: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 14,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  filterLabel: {
    marginBottom: 10,
    fontWeight: "700",
    color: "#374151",
  },

  listCard: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111827",
  },
  mutedText: {
    color: "#6b7280",
    fontSize: 12,
  },
  loaderWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loaderWrapSmall: {
    paddingVertical: 20,
    alignItems: "center",
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
  },
  emptyStateText: {
    marginTop: 10,
    color: "#6b7280",
    textAlign: "center",
  },
  discountCard: {
    borderWidth: 1,
    borderColor: "#ede9fe",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    backgroundColor: "#faf5ff",
  },
  discountHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
  },
  discountTitle: {
    color: "#111827",
    fontSize: 17,
    fontWeight: "800",
  },
  discountMeta: {
    color: "#6b7280",
    marginTop: 3,
    fontSize: 12,
  },
  discountInfo: {
    color: "#4b5563",
    marginTop: 10,
    fontSize: 13,
  },
  expiredText: {
    color: "#dc2626",
    fontWeight: "700",
    marginTop: 8,
    fontSize: 12,
  },
  statusPill: {
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  statusPillActive: {
    backgroundColor: "#dcfce7",
  },
  statusPillPaused: {
    backgroundColor: "#f3f4f6",
  },
  statusText: {
    fontSize: 11,
    fontWeight: "800",
  },
  statusTextActive: {
    color: "#15803d",
  },
  statusTextPaused: {
    color: "#374151",
  },
  actionRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },
  editButton: {
    flex: 1,
    backgroundColor: "#7c3aed",
    borderRadius: 12,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  deleteButton: {
    flex: 1,
    backgroundColor: "#d11a2a",
    borderRadius: 12,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
  },
  actionText: {
    color: "#fff",
    fontWeight: "700",
  },
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    flexWrap: "wrap",
    gap: 8,
  },
  paginationButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "#f5f3ff",
    borderWidth: 1,
    borderColor: "#ddd6fe",
  },
  paginationButtonText: {
    color: "#6d28d9",
    fontWeight: "700",
  },
  pageNumberButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd6fe",
  },
  activePageNumberButton: {
    backgroundColor: "#6d28d9",
    borderColor: "#6d28d9",
  },
  pageNumberButtonText: {
    color: "#6d28d9",
    fontWeight: "700",
  },
  activePageNumberButtonText: {
    color: "#fff",
  },
});
