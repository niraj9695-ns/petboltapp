import { StyleSheet } from "react-native";
import { boardingOwnerTheme, typography } from "../../../styles/themeStyles";

const COLORS = boardingOwnerTheme;

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  flexOne: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 28,
  },
  heroCard: {
    borderRadius: 24,
    padding: 20,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },

  content: {
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 28,
  },

  header: {
    alignItems: "center",
  },

  headerTopRow: {
    position: "relative",
    width: "100%",
    minHeight: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  headerBackButton: {
    position: "absolute",
    left: 0,
    zIndex: 1,
  },

  title: {
    color: COLORS.surface,
    fontSize: typography.h3.fontSize,
    fontWeight: typography.h3.fontWeight,
    textAlign: "center",
    paddingHorizontal: 48,
  },

  subtitle: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: typography.small.fontSize,
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 24,
  },
  formCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  fieldGroup: {
    marginBottom: 14,
  },
  rowFields: {
    flexDirection: "row",
    gap: 12,
  },
  flexHalf: {
    flex: 1,
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  label: {
    color: "#374151",
    fontWeight: "700",
    fontSize: 13,
  },
  labelError: {
    color: "#dc2626",
  },
  requiredAsterisk: {
    color: "#dc2626",
    fontWeight: "800",
    marginLeft: 2,
  },
  input: {
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: "#111827",
  },
  inputError: {
    borderColor: "#dc2626",
  },
  dateButton: {
    backgroundColor: COLORS.surfaceAlt,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateButtonText: {
    color: "#111827",
    fontSize: 14,
    fontWeight: "600",
  },
  dateButtonPlaceholder: {
    color: "#9ca3af",
  },
  dateButtonIcon: {
    fontSize: 16,
  },

  toggleRow: {
    flexDirection: "row",
    gap: 10,
  },
  toggleButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#d1d5db",
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
  },
  toggleButtonActive: {
    backgroundColor: "#ede9fe",
    borderColor: "#8b5cf6",
  },
  toggleButtonText: {
    color: "#111827",
    fontWeight: "700",
  },
  toggleButtonTextActive: {
    color: "#6d28d9",
  },
  primaryButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 4,
  },
  primaryButtonText: {
    color: COLORS.surface,
    fontWeight: typography.h4.fontWeight,
  },

  loaderWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
