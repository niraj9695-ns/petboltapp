import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#faf5ff",
  },

  bookingStatusContainer: {
    flex: 1,
    backgroundColor: "#faf5ff",
  },

  headerSection: {
    paddingHorizontal: 15,
    paddingVertical: 20,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },

  bookingStatusTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 2,
  },

  bookingStatusSubtitle: {
    fontSize: 15,
    color: "#64748b",
    fontWeight: "500",
  },

  bookingListContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    paddingBottom: 24,
  },

  bookingStatusCard: {
    borderRadius: 24,
    padding: 20,
    marginRight: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    elevation: 4,
    overflow: "hidden",
  },

  cardHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  petInfoSection: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  bookingStatusIconBox: {
    width: 64,
    height: 64,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },

  bookingStatusPetImage: {
    width: 64,
    height: 64,
    borderRadius: 18,
    marginRight: 14,
    backgroundColor: "#f3f4f6",
    borderWidth: 2,
    borderColor: "#f1f5f9",
  },

  bookingStatusPetEmoji: {
    fontSize: 32,
  },

  petNameSection: {
    flex: 1,
  },

  bookingStatusPetName: {
    fontWeight: "800",
    fontSize: 18,
    color: "#0f172a",
    marginBottom: 4,
  },

  petBreedText: {
    fontSize: 13,
    color: "#94a3b8",
    fontWeight: "500",
  },

  statusBadgeContainer: {
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    alignItems: "center",
  },

  bookingStatusBadgeText: {
    fontWeight: "700",
    fontSize: 13,
    letterSpacing: 0.3,
  },

  cardDivider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginBottom: 16,
  },

  infoSection: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#f8fafc",
    borderRadius: 14,
    marginBottom: 16,
  },

  infoContent: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "600",
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 15,
    color: "#0f172a",
    fontWeight: "700",
  },

  datesRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  dateBox: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
  },

  dateLabel: {
    fontSize: 11,
    color: "#64748b",
    fontWeight: "600",
    marginBottom: 6,
  },

  dateContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  dateValue: {
    fontSize: width < 768 ? 12 : 13,
    color: "#0f172a",
    fontWeight: "700",
  },

  dateArrow: {
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
  },

  detailsGrid: {
    flexDirection: "row",
    backgroundColor: "#f8fafc",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    overflow: "hidden",
    marginBottom: 16,
  },

  detailBox: {
    flex: 1,
    paddingHorizontal: 14,
    paddingVertical: 14,
    justifyContent: "center",
  },

  mobileDetailsCard: {
    backgroundColor: "#f8fafc",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    marginBottom: 16,
    padding: 14,
  },

  mobileDetailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },

  mobileDetailLabel: {
    fontSize: 13,
    color: "#64748b",
    fontWeight: "600",
  },

  mobileDetailValue: {
    fontSize: 15,
    color: "#0f172a",
    fontWeight: "700",
  },

  gridDivider: {
    width: 1,
    backgroundColor: "#e2e8f0",
  },

  detailLabel: {
    fontSize: 11,
    color: "#64748b",
    fontWeight: "600",
    marginBottom: 6,
  },

  detailValue: {
    fontSize: 16,
    color: "#0f172a",
    fontWeight: "800",
  },

  detailUnit: {
    fontSize: 12,
    color: "#94a3b8",
    fontWeight: "500",
    marginLeft: 4,
  },

  detailValueRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  costValue: {
    fontSize: 18,
  },

  progressSection: {
    marginBottom: 16,
  },

  progressLabel: {
    marginBottom: 8,
  },

  progressText: {
    fontSize: 12,
    color: "#64748b",
    fontWeight: "600",
  },

  progressBar: {
    height: 8,
    backgroundColor: "#e2e8f0",
    borderRadius: 4,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    borderRadius: 4,
  },

  countdownSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e0e7ff",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#c7d2fe",
  },

  countdownText: {
    fontSize: 13,
    color: "#3730a3",
    fontWeight: "600",
    flex: 1,
  },

  actionButtonsRow: {
    flexDirection: "row",
    gap: 12,
  },

  secondaryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: "#f3e8ff",
    borderWidth: 1,
    borderColor: "#e9d5ff",
    gap: 8,
  },

  secondaryButtonText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#6b21a8",
  },

  emptyStateContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 32,
    margin: 10,
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
    width: 250,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginHorizontal: 16,
  },

  nextPageButton: {
    width: 200,
    marginTop: 200,
    height: 56,
    backgroundColor: "#6b21a8",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },

  nextPageButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },
});
