import { StyleSheet } from "react-native";

const COLORS = {
  primary: "#6b21a8",
  secondary: "#9333ea",
  lightPurple: "#f5ebff",
  white: "#ffffff",
  text: "#1f2937",
  gray: "#6b7280",
  border: "#e9d8fd",
  success: "#16a34a",
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  heroCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 22,
    padding: 20,
    marginBottom: 16,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: COLORS.white,
  },
  heroSubtitle: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 13,
    marginTop: 6,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.primary,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  label: {
    fontSize: 13,
    color: COLORS.gray,
    marginTop: 8,
  },
  value: {
    fontSize: 15,
    color: COLORS.text,
    fontWeight: "600",
    marginTop: 2,
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "800",
    color: COLORS.success,
    marginTop: 16,
  },
  statusBadge: {
    alignSelf: "flex-start",
    marginTop: 14,
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 999,
  },
  accepted: {
    backgroundColor: "#DCFCE7",
  },
  pending: {
    backgroundColor: "#FEF3C7",
  },
  statusText: {
    fontWeight: "700",
    textTransform: "capitalize",
  },
});
