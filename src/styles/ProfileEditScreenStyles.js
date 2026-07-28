import { StyleSheet } from "react-native";

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  headerRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },

  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },

  backButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#6b21a8",
  },

  editTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    color: "#1f2937",
    marginRight: 45,
  },

  container: {
    marginVertical: 15,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    width: "92%",
    alignSelf: "center",
  },

  editCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,

    shadowColor: "#6b21a8",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  formLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#6B7280",
    marginBottom: 6,
    marginTop: 12,
  },

  input: {
    width: "100%",
    height: 56,
    backgroundColor: "#F9FAFB",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    fontSize: 15,
    color: "#111827",
  },

  multiLineInput: {
    minHeight: 100,
    paddingTop: 12,
    textAlignVertical: "top",
  },

  fileButton: {
    marginTop: 18,
    backgroundColor: "#EEF2FF",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#C7D2FE",
  },

  fileButtonText: {
    color: "#4338CA",
    fontWeight: "700",
    fontSize: 14,
  },

  fileName: {
    marginTop: 10,
    textAlign: "center",
    color: "#374151",
    fontWeight: "500",
  },

  documentCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginBottom: 20,

    shadowColor: "#6b21a8",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  documentInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  documentIcon: {
    fontSize: 30,
    marginRight: 12,
  },

  documentTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  documentSubTitle: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },

  viewDocumentBtn: {
    marginTop: 16,
    backgroundColor: "#6b21a8",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },

  viewDocumentText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },

  btnRow: {
    marginTop: 22,
    flexDirection: "row",
    gap: 12,
  },

  primaryBtn: {
    flex: 1,
    backgroundColor: "#6b21a8",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  primaryBtnText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },

  secondaryBtn: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D1D5DB",
  },

  secondaryBtnText: {
    color: "#6b21a8",
    fontWeight: "700",
    fontSize: 15,
  },

  cancelBtn: {
    backgroundColor: "#FFFFFF",
  },
});
