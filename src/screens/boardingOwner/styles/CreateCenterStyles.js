import { StyleSheet } from "react-native";
import { boardingOwnerTheme, typography } from "../../../styles/themeStyles";

const COLORS = boardingOwnerTheme;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
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
  backButton: {
    alignSelf: "flex-start",
    marginBottom: 10,
  },
  backText: {
    color: COLORS.surface,
    fontWeight: typography.title.fontWeight,
    fontSize: typography.small.fontSize,
  },
  heroTitle: {
    color: COLORS.surface,
    fontSize: typography.h3.fontSize,
    fontWeight: typography.h3.fontWeight,
    marginBottom: 6,
  },
  heroSubtitle: {
    color: COLORS.surface,
    fontSize: typography.small.fontSize,
  },
  formCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 4,
  },
  sectionCard: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    backgroundColor: COLORS.surfaceAlt,
  },
  sectionHeaderButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionHeaderTextWrap: {
    flex: 1,
  },
  sectionHeader: {
    marginTop: 6,
    marginBottom: 10,
  },
  sectionTitle: {
    color: COLORS.text,
    fontSize: typography.body.fontSize,
    fontWeight: typography.title.fontWeight,
  },
  sectionSubtitle: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  sectionChevron: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 10,
  },
  sectionBody: {
    marginTop: 10,
  },
  fieldContainer: {
    marginBottom: 14,
  },
  label: {
    fontSize: typography.small.fontSize,
    color: COLORS.textMuted,
    marginBottom: 6,
    fontWeight: "600",
  },
  helperText: {
    color: COLORS.textMuted,
    fontSize: 12,
    marginBottom: 8,
  },
  errorText: {
    color: "#dc2626",
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: COLORS.surfaceAlt,
    fontSize: typography.body.fontSize,
    color: COLORS.text,
  },
  inputError: {
    borderColor: "#f87171",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e9d5ff",
  },
  chipSelected: {
    backgroundColor: "#6b21a8",
    borderColor: "#6b21a8",
  },
  chipText: {
    color: "#4c1d95",
    fontWeight: "600",
  },
  chipSelectedText: {
    color: "#fff",
  },
  multilineInput: {
    minHeight: 96,
    textAlignVertical: "top",
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 13,
    backgroundColor: "#f9fafb",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  dateButtonError: {
    borderColor: "#f87171",
  },
  dateButtonText: {
    color: "#111827",
    fontSize: 15,
    flex: 1,
  },
  dateButtonPlaceholder: {
    color: "#9ca3af",
  },
  dateButtonIcon: {
    fontSize: 16,
    marginLeft: 8,
  },
  selectBox: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    backgroundColor: "#f9fafb",
    overflow: "hidden",
  },
  selectBoxError: {
    borderColor: "#f87171",
  },
  picker: {
    color: "#111827",
  },
  addChip: {
    backgroundColor: "#f3e8ff",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 8,
  },
  addChipText: {
    color: "#6b21a8",
    fontWeight: "700",
  },
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#f3f4f6",
  },
  priceRowText: {
    color: "#374151",
    textTransform: "capitalize",
    flex: 1,
  },
  priceRowValue: {
    color: "#6b21a8",
    fontWeight: "700",
    marginRight: 10,
  },
  removeText: {
    color: "#dc2626",
    fontWeight: "600",
  },
  uploadSection: {
    marginTop: 8,
    marginBottom: 12,
  },
  uploadLabel: {
    fontSize: 13,
    color: "#4b5563",
    marginBottom: 8,
    fontWeight: "600",
  },
  uploadButton: {
    backgroundColor: COLORS.surfaceAlt,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 8,
    alignItems: "center",
  },
  uploadButtonText: {
    color: COLORS.primary,
    fontWeight: "700",
  },
  uploadInfo: {
    color: "#6b7280",
    fontSize: 12,
    marginBottom: 8,
  },
  uploadHint: {
    color: "#16a34a",
    fontSize: 12,
  },
  previewRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
    gap: 8,
  },
  previewCard: {
    position: "relative",
  },
  previewImage: {
    width: 140,
    height: 140,
    borderRadius: 14,
  },
  removeImageButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.95)",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  removeImageIcon: {
    color: "#dc2626",
    fontSize: 14,
    fontWeight: "800",
  },
  submitButton: {
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 16,
  },
});
