import { StyleSheet } from "react-native";

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#faf5ff",
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#faf5ff",
  },

  /* HEADER SECTION */
  headerSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },

  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 24,
    alignItems: "center",
  },

  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },

  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 4,
  },

  headerSubtitle: {
    fontSize: 14,
    color: "#64748b",
    fontWeight: "500",
  },

  centerCountBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3e8ff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },

  centerCountText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#6b21a8",
  },

  /* FILTER CHIPS */
  filterChipsContainer: {
    flexDirection: "row",
    gap: 8,
  },

  filterChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e7ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 6,
    borderWidth: 1,
    borderColor: "#c7d2fe",
  },

  filterChipText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#4f46e5",
  },

  /* EMPTY STATE */
  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
  },

  emptyStateText: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0f172a",
    marginTop: 16,
    marginBottom: 8,
  },

  emptyStateSubtext: {
    fontSize: 14,
    color: "#94a3b8",
    textAlign: "center",
    fontWeight: "500",
  },

  paginationFooter: {
    width: "100%",
    alignItems: "center",
    paddingTop: 8,
    paddingBottom: 16,
  },

  nextPageButton: {
    backgroundColor: "#6b21a8",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 999,
    minWidth: 180,
    alignItems: "center",
  },

  nextPageButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },
});
