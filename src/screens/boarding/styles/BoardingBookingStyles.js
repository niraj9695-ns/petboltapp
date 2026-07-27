import { StyleSheet } from "react-native";

export default StyleSheet.create({
  bookingScreenContainer: {
    flex: 1,
    backgroundColor: "#faf5ff",
  },

  bookingScreenContent: {
    padding: 16,
    paddingBottom: 30,
  },

  bookingScreenCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 15,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },

  bookingScreenCenterName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#111827",
  },

  bookingScreenPrice: {
    marginTop: 5,
    color: "#6b21a8",
    fontWeight: "700",
    fontSize: 16,
  },

  bookingScreenHeading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111827",
  },

  bookingScreenInputWrapper: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#ffffff",
  },

  bookingScreenPicker: {
    width: "100%",
    color: "#111827",
  },

  bookingScreenDateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  bookingScreenDatePill: {
    flex: 1,
    borderRadius: 16,
    padding: 14,
    backgroundColor: "#f3f4f6",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    marginRight: 10,
  },

  bookingScreenActivePill: {
    backgroundColor: "#6b21a8",
    borderColor: "#6b21a8",
  },

  bookingScreenDateLabel: {
    fontSize: 12,
    color: "#6b7280",
    marginBottom: 6,
  },

  bookingScreenDateValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111827",
  },

  bookingScreenActivePillText: {
    color: "#ffffff",
  },

  calendarWrapper: {
    marginTop: 12,
    borderRadius: 16,
    overflow: "hidden",
  },

  bookingScreenLegendRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 12,
  },

  bookingScreenMarkerBadge: {
    width: 14,
    height: 14,
    borderRadius: 4,
    marginRight: 8,
  },

  bookingScreenMarkerText: {
    color: "#4b5563",
    fontSize: 13,
  },

  warningText: {
    marginTop: 10,
    color: "#ef4444",
    fontWeight: "600",
  },

  statusNote: {
    marginTop: 10,
    color: "#4b5563",
  },

  smallLoader: {
    marginTop: 10,
  },

  bookingScreenOrangeBtn: {
    backgroundColor: "#6b21a8",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  bookingScreenBookBtn: {
    backgroundColor: "#6b21a8",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 30,
  },

  bookingScreenBtnText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 15,
  },

  availableInfoContainer: {
    marginTop: 15,
  },

  availabilityText: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 16,
  },

  bookingScreenInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top",
    backgroundColor: "#ffffff",
  },

  totalCostText: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 18,
    color: "#6b21a8",
  },
  /* Pricing summary styles */
  pricingCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 4,
  },

  pricingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  pricingLabel: {
    color: "#6b7280",
    fontSize: 14,
  },

  pricingValue: {
    color: "#0f172a",
    fontWeight: "800",
    fontSize: 15,
  },

  pricingTotal: {
    fontSize: 20,
    fontWeight: "900",
    color: "#111827",
  },

  discountBadge: {
    backgroundColor: "#fffbeb",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#f59e0b",
  },

  availabilityPill: {
    backgroundColor: "#ecfccb",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#84cc16",
  },
});