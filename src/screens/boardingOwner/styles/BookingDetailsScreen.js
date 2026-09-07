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
    marginBottom: 8,
  },
  heroHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  heroBackButton: {
    width: 100,
    alignItems: "flex-start",
  },

  heroTitleWrap: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 4,
  },

  heroHeaderSpacer: {
    width: 80,
  },

  heroTitle: {
    fontSize: typography.h4.fontSize,
    fontWeight: typography.h4.fontWeight,
    color: COLORS.surface,
    textAlign: "center",
  },

  heroSubtitle: {
    color: COLORS.surface,
    fontSize: 13,
    marginTop: 4,
    textAlign: "center",
    lineHeight: 18,
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
    marginBottom: 6,
  },
  detailsRow: {
    flexDirection: "row",
    gap: 16,
  },
  detailsColumn: {
    flex: 1,
    minWidth: 0,
  },
  emailDetail: {
    width: "100%",
    marginTop: 8,
  },
  staySection: {
    width: "100%",
    marginTop: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: COLORS.gray,
    fontWeight: "600",
    marginTop: 6,
  },
  value: {
    fontSize: 14,
    color: COLORS.text,
    marginTop: 2,
  },
  totalPrice: {
    fontSize: 16,
    fontWeight: "800",
    color: COLORS.success,
    marginTop: 16,
  },
  statusBadge: {
    alignSelf: "flex-start",
    marginTop: 14,
    paddingHorizontal: 12,
    paddingVertical: 8,
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
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f5ff",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e9d5ff",
  },

  accordionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6b21a8",
  },
  accordionContent: {
    backgroundColor: "#ffffff",
    marginTop: 8,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: "#e9d5ff",
  },
  actionPanel: {
    marginTop: 8,
  },

  accordionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minHeight: 68,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#eadcff",
  },

  accordionHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },

  actionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "#f3e8ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  accordionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#4c1d95",
  },

  accordionHeaderText: {
    flex: 1,
    minWidth: 0,
    marginRight: 8,
  },

  accordionSubtitle: {
    fontSize: 12,
    color: "#64748b",
    marginTop: 3,
    flexShrink: 1,
  },

  chevronContainer: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#f9f5ff",
    alignItems: "center",
    justifyContent: "center",
  },

  accordionContent: {
    backgroundColor: COLORS.surface,
    marginTop: 6,
    paddingHorizontal: 4,
    paddingTop: 8,
    paddingBottom: 4,
  },

  actionSection: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  sectionHeadingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  sectionIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: "#f3e8ff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  rejectIcon: {
    width: 38,
    height: 38,
    borderRadius: 11,
    backgroundColor: "#fef2f2",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 11,
  },

  subSectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 3,
  },

  rejectSectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#991b1b",
    marginBottom: 3,
  },

  sectionDescription: {
    fontSize: 12,
    color: "#64748b",
    lineHeight: 17,
  },

  label: {
    fontSize: 13,
    color: "#475569",
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 7,
  },

  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 4,
  },

  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    borderColor: "#cbd5e1",
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  checkboxChecked: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  checkboxTextWrap: {
    flex: 1,
  },

  checkboxTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#334155",
  },

  checkboxDescription: {
    fontSize: 11,
    color: "#94a3b8",
    marginTop: 2,
    lineHeight: 16,
  },

  serviceGroup: {
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },

  serviceGroupTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: "#475569",
    marginBottom: 10,
  },

  dateTimeRow: {
    flexDirection: "row",
    gap: 10,
    width: "100%",
    marginBottom: 8,
  },

  dateTimeItem: {
    flex: 1,
    minHeight: 58,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#fafafa",
  },

  dateButtonTextWrap: {
    flex: 1,
    minWidth: 0,
    marginLeft: 8,
    justifyContent: "center",
  },

  dateButtonLabel: {
    fontSize: 10,
    color: "#94a3b8",
    fontWeight: "600",
    marginBottom: 2,
  },

  dateButtonValue: {
    fontSize: 13,
    color: "#334155",
    fontWeight: "600",
    lineHeight: 18,
  },

  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    borderRadius: 12,
    paddingHorizontal: 13,
    paddingVertical: 11,
    marginBottom: 10,
    backgroundColor: "#fafafa",
    color: COLORS.text,
    fontSize: 14,
  },

  notesInput: {
    minHeight: 82,
    paddingTop: 12,
  },

  saveButton: {
    minHeight: 48,
    borderRadius: 12,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 4,
  },

  saveButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },

  actionDivider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginHorizontal: 12,
    marginVertical: 8,
  },

  rejectInput: {
    minHeight: 95,
    borderWidth: 1,
    borderColor: "#fecaca",
    borderRadius: 12,
    padding: 13,
    fontSize: 14,
    color: COLORS.text,
    backgroundColor: "#fffafa",
    marginBottom: 10,
  },

  rejectButton: {
    minHeight: 48,
    backgroundColor: "#dc2626",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },

  rejectButtonText: {
    color: "#ffffff",
    fontSize: 14,
    fontWeight: "700",
  },

  disabledInput: {
    backgroundColor: "#f8fafc",
    borderColor: "#e2e8f0",
  },

  disabledButton: {
    backgroundColor: "#cbd5e1",
  },

  completedBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 13,
    borderRadius: 12,
    backgroundColor: "#f0fdf4",
    borderWidth: 1,
    borderColor: "#bbf7d0",
    gap: 9,
  },

  completedText: {
    flex: 1,
    color: "#166534",
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "600",
  },

  disabledInfo: {
    flexDirection: "row",
    alignItems: "flex-start",
    backgroundColor: "#f8fafc",
    borderRadius: 10,
    padding: 11,
    marginBottom: 10,
    gap: 8,
  },

  disabledInfoText: {
    flex: 1,
    color: "#64748b",
    fontSize: 12,
    lineHeight: 17,
  },

  errorInput: {
    borderColor: "#dc2626",
    backgroundColor: "#fef2f2",
  },

  errorText: {
    color: "#b91c1c",
    fontSize: 12,
    marginBottom: 10,
    marginTop: -2,
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
  subSectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6b21a8",
    marginBottom: 14,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: COLORS.border,
    marginVertical: 18,
  },
});
