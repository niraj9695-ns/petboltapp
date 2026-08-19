import { StyleSheet, Dimensions } from "react-native";
import { boardingOwnerTheme, typography } from "../../../styles/themeStyles";

const { width } = Dimensions.get("window");
const COLORS = boardingOwnerTheme;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    minHeight: 64,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    position: "relative",
  },

  headerBackButton: {
    position: "absolute",
    left: 10,
    zIndex: 1,
  },

  headerContent: {
    position: "absolute",
    left: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 5, // Prevents title from overlapping Back button
  },

  title: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.h3.fontWeight,
    color: COLORS.text,
    lineHeight: typography.h3.fontSize * 1.2,
    textAlign: "center",
  },
  subtitle: {
    marginTop: 4,
    color: COLORS.textMuted,
    fontSize: typography.caption.fontSize,
    textAlign: "center",
  },
  imageContainer: {
    position: "relative",
  },
  sliderImage: {
    width,
    height: 220,
  },
  counterContainer: {
    position: "absolute",
    bottom: 15,
    right: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  counterText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  card: {
    backgroundColor: COLORS.surface,
    marginHorizontal: 16,
    marginTop: 16,
    padding: 18,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: typography.title.fontSize,
    fontWeight: typography.title.fontWeight,
    color: COLORS.primary,
    marginBottom: 15,
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
  sectionSubtitle: {
    color: "#6b7280",
    fontSize: 12,
    marginTop: 2,
    marginBottom: 4,
  },
  sectionChevron: {
    color: "#6b21a8",
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 10,
  },
  sectionBody: {
    marginTop: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: typography.caption.fontSize,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    fontSize: typography.body.fontSize,
    color: COLORS.text,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
    borderColor: "#d1d5db",
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  picker: {
    color: "#111827",
  },
  addChip: {
    backgroundColor: "#f3e8ff",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 999,
    alignItems: "center",
    marginTop: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  addChipText: {
    color: "#6b21a8",
    fontWeight: "700",
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
  multilineInput: {
    height: 120,
    textAlignVertical: "top",
  },
  uploadActions: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
    flexWrap: "wrap",
  },
  actionButton: {
    backgroundColor: "#6b21a8",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
  },
  secondaryActionButton: {
    backgroundColor: "#f3e8ff",
    borderWidth: 1,
    borderColor: "#e9d5ff",
  },
  actionButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },
  secondaryActionButtonText: {
    color: "#6b21a8",
    fontSize: 15,
    fontWeight: "700",
  },
  helperText: {
    color: "green",
    marginBottom: 14,
  },
  chipSelected: {
    backgroundColor: "#6b21a8",
  },
  uploadInfo: {
    color: "#6b7280",
    marginBottom: 12,
    fontSize: 12,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 16,
    marginVertical: 20,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  saveButtonText: {
    color: COLORS.surface,
    fontSize: 16,
    fontWeight: "700",
  },
});
