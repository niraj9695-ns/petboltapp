import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  spacer: {
    height: 30,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    marginBottom: 4,
    backgroundColor: "#fffaf7",
    borderBottomWidth: 1,
    borderBottomColor: "#e9d5ff",
  },

  closeIcon: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#666",
    paddingHorizontal: 5,
  },

  heading: {
    fontSize: 28,
    fontWeight: "800",
    color: "#6b21a8",
    marginLeft: 2,
  },

  addBtn: {
    backgroundColor: "#6b21a8",
    width: 58,
    height: 58,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#8b5cf6",
    elevation: 4,
    shadowColor: "#6b21a8",
    shadowOpacity: 0.22,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  container: {
    padding: 16,
    paddingBottom: 100,
    backgroundColor: "#f8fafc",
    flexGrow: 1,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 18,
    marginBottom: 14,
    elevation: 3,
    shadowColor: "#6b21a8",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },

  petImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },

  rightSection: {
    flex: 1,
    marginLeft: 15,
    justifyContent: "space-between",
  },

  petName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#222",
  },

  iconRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 20,
  },

  previewImage: {
    width: 90,
    height: 90,
    borderRadius: 10,
    marginRight: 10,
    marginBottom: 10,
  },

  imageThumbWrapper: {
    marginRight: 12,
    position: "relative",
    paddingTop: 6,
    paddingRight: 6,
  },

  selectedThumbWrapper: {
    borderWidth: 2,
    borderColor: "#6b21a8",
    borderRadius: 16,
    padding: 2,
  },

  imageThumb: {
    width: 104,
    height: 104,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  removeImageBtn: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
    zIndex: 2,
  },

  removeImageText: {
    color: "#fff",
    fontWeight: "800",
    fontSize: 12,
  },

  profileBadge: {
    position: "absolute",
    bottom: 8,
    left: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: "rgba(0,0,0,0.6)",
  },

  profileBadgeActive: {
    backgroundColor: "#6b21a8",
  },

  profileBadgeInactive: {
    backgroundColor: "rgba(255,255,255,0.95)",
  },

  profileBadgeText: {
    color: "#111",
    fontSize: 12,
    fontWeight: "700",
  },

  actionRow: {
    flexDirection: "row",
    marginTop: 15,
  },

  editBtn: {
    backgroundColor: "#3b82f6",
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
    flex: 1,
    alignItems: "center",
  },

  deleteBtn: {
    backgroundColor: "#ef4444",
    padding: 10,
    borderRadius: 8,
    flex: 1,
    alignItems: "center",
  },

  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },

  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  screen: {
    flex: 1,
    backgroundColor: "#fff",
  },

  detailsContainer: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
  },

  detailsLoader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  detailsHeading: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#6b21a8",
  },

  detailsHero: {
    marginBottom: 10,
    alignItems: "center",
  },

  heroText: {
    marginTop: 1,
    alignItems: "center",
  },

  petSubtitle: {
    color: "#6b7280",
    fontSize: 14,
  },

  galleryContainer: {
    marginBottom: 0,
  },

  galleryLabel: {
    fontSize: 20,
    fontWeight: "700",
    color: "#6b21a8",
    marginBottom: 12,
  },

  thumbnailScroll: {
    paddingVertical: 2,
  },

  thumbnailImage: {
    width: 100,
    height: 100,
    borderRadius: 16,
    marginRight: 12,
    backgroundColor: "#f3f4f6",
  },

  detailPetImage: {
    width: 220,
    height: 220,
    borderRadius: 150,
    marginBottom: 18,
    backgroundColor: "#f3f4f6",
  },

  section: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6b21a8",
    marginTop: 20,
    marginBottom: 10,
  },

  row: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 8,
  },

  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#444",
  },

  value: {
    marginTop: 4,
    fontSize: 15,
    color: "#666",
  },

  pdfLinkRow: {
    paddingVertical: 6,
  },

  pdfLinkInner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  pdfIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#6b21a8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  pdfLinkText: {
    fontSize: 12,
    fontWeight: "700",
    color: "#6b21a8",
  },

  modalContent: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 18,
    paddingTop: 18,
    paddingBottom: 26,
    maxHeight: "92%",
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#6b21a8",
    textAlign: "center",
  },

  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 52,
    marginBottom: 12,
    backgroundColor: "#fff",
    fontSize: 15,
    color: "#111827",
  },

  textArea: {
    minHeight: 90,
    textAlignVertical: "top",
  },

  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    marginBottom: 12,
    overflow: "hidden",
    backgroundColor: "#fff",
  },

  imageSelectButton: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 15,
    marginBottom: 12,
    backgroundColor: "#fafafa",
  },

  imageSelectButtonText: {
    color: "#666",
    fontSize: 15,
  },

  imagePreviewContainer: {
    marginTop: 15,
  },

  inputError: {
    borderColor: "#ef4444",
    backgroundColor: "#fff1f2",
  },

  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    minHeight: 52,
    marginBottom: 12,
    backgroundColor: "#fff",
  },

  dateInputText: {
    flex: 1,
    color: "#111827",
    fontSize: 15,
  },

  dateFieldText: {
    color: "#000",
  },

  dateFieldPlaceholder: {
    color: "#999",
  },

  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    marginBottom: 12,
  },

  fieldLabel: {
    marginBottom: 6,
    fontWeight: "700",
    color: "#374151",
    fontSize: 14,
  },

  formLabel: {
    marginBottom: 6,
    fontWeight: "700",
    color: "#374151",
    fontSize: 14,
  },

  formLabelError: {
    color: "#dc2626",
  },

  formLabelRequired: {
    color: "#dc2626",
  },

  requiredHint: {
    color: "#dc2626",
    fontWeight: "800",
  },

  helperText: {
    color: "#6b7280",
    fontSize: 12,
    marginBottom: 8,
  },

  sectionLabel: {
    marginBottom: 5,
    fontWeight: "600",
  },

  imageBtn: {
    backgroundColor: "#10b981",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
  },

  imageBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  button: {
    flex: 1,
    backgroundColor: "#6b21a8",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  nextBtn: {
    flex: 1,
    backgroundColor: "#6b21a8",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  backBtn: {
    flex: 1,
    backgroundColor: "#6b7280",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginRight: 10,
  },

  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  stepIndicatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  stepIndicatorCircle: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: "#ddd",
    justifyContent: "center",
    alignItems: "center",
  },

  stepIndicatorActive: {
    backgroundColor: "#6b21a8",
  },

  stepIndicatorText: {
    color: "#fff",
    fontWeight: "bold",
  },

  stepIndicatorLine: {
    width: 50,
    height: 3,
    backgroundColor: "#ddd",
  },

  stepIndicatorActiveLine: {
    backgroundColor: "#6b21a8",
  },

  stepButtonRow: {
    flexDirection: "row",
    marginTop: 20,
  },

  closeBtn: {
    marginTop: 15,
    alignItems: "center",
  },

  closeText: {
    color: "#ef4444",
    fontWeight: "bold",
    fontSize: 16,
  },

  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },

  switchLabel: {
    fontWeight: "600",
    fontSize: 15,
    color: "#374151",
    flex: 1,
  },
});

export default styles;

