import { StyleSheet } from "react-native";

export default StyleSheet.create({
  heading: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    color: "#222",
  },

  helperText: {
    color: "#666",
    marginBottom: 12,
  },

  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },

  uploadButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },

  uploadText: {
    color: "#444",
  },

  nextButton: {
    backgroundColor: "#6b21a8",
    padding: 14,
    borderRadius: 12,
    minWidth: 120,
    alignItems: "center",
  },

  backButton: {
    backgroundColor: "#999",
    padding: 14,
    borderRadius: 12,
    flex: 1,
    alignItems: "center",
  },

  submitButton: {
    backgroundColor: "#6b21a8",
    padding: 14,
    borderRadius: 12,
    minWidth: 120,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },

  priceRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 10,
  },

  priceInput: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },

  addRowButton: {
    alignSelf: "flex-start",
    marginTop: 4,
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: "#f3e8ff",
  },

  addRowText: {
    color: "#6b21a8",
    fontWeight: "600",
  },

  removeRowButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 44,
    borderRadius: 10,
    backgroundColor: "#fee2e2",
  },

  removeRowText: {
    color: "#dc2626",
    fontSize: 16,
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
    shadowColor: "#000",
    shadowOpacity: 0.03,
    shadowRadius: 4,
    elevation: 1,
  },

  chipText: {
    color: "#4c1d95",
    marginRight: 8,
    fontWeight: "600",
  },

  chipSelected: {
    backgroundColor: "#6b21a8",
    borderColor: "#6b21a8",
  },

  chipSelectedText: {
    color: "#fff",
  },

  timePickerButton: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 12,
  },

  timePickerLabel: {
    color: "#666",
    marginBottom: 4,
  },

  timePickerValue: {
    color: "#222",
    fontSize: 16,
    fontWeight: "600",
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
});
