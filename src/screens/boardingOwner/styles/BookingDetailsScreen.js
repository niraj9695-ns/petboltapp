import { StyleSheet } from "react-native";
import { boardingOwnerTheme, typography } from "../../../styles/themeStyles";

const COLORS = boardingOwnerTheme;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
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
    fontSize: typography.h4.fontSize,
    fontWeight: typography.h4.fontWeight,
    color: COLORS.surface,
  },
  heroSubtitle: {
    color: COLORS.surface,
    fontSize: 13,
    marginTop: 6,
  },
  card: {
    backgroundColor: COLORS.surface,
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
  rejected: {
    backgroundColor: "#FECACA",
  },

  rejectInput: {
    minHeight: 110,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 14,
    fontSize: 15,
    color: COLORS.text,
    backgroundColor: COLORS.lightPurple,
    marginBottom: 14,
  },
  disabledInput: {
    backgroundColor: "#f3f4f6",
  },
  rejectButton: {
    backgroundColor: COLORS.secondary,
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#cbd5e1",
  },
  rejectButtonText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: "700",
  },

  actionPanel: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 18,
    marginTop: 24,
    borderWidth: 1,
    borderColor: COLORS.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 1,
  },
  helperText: {
    fontSize: 13,
    color: COLORS.gray,
    marginBottom: 12,
    lineHeight: 18,
  },

  errorInput: {
    borderColor: "#dc2626",
    backgroundColor: "#fef2f2",
  },
  errorText: {
    color: "#b91c1c",
    fontSize: 12,
    marginBottom: 12,
    marginTop: -4,
  },
  statusText: {
    fontWeight: "700",
    textTransform: "capitalize",
  },
  dateButton: {
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 10,
    backgroundColor: COLORS.surfaceAlt,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
    backgroundColor: COLORS.surface,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  expandIcon: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.primary,
  },
  completedBox: {
    marginTop: 12,
    padding: 14,
    borderRadius: 12,
    backgroundColor: "#DCFCE7",
    borderWidth: 1,
    borderColor: "#86EFAC",
  },

  completedText: {
    color: "#166534",
    fontWeight: "600",
  },
});
