import { StyleSheet } from "react-native";

export default StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
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
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#6b21a8",
    textAlign: "center",
  },
  closeIcon: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#666",
    paddingHorizontal: 5,
  },
  stepButtonRow: {
    flexDirection: "row",
    marginTop: 20,
  },
  backBtn: {
    flex: 1,
    backgroundColor: "#6b7280",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
    marginRight: 10,
  },
  nextBtn: {
    flex: 1,
    backgroundColor: "#6b21a8",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  button: {
    flex: 1,
    backgroundColor: "#6b21a8",
    padding: 14,
    borderRadius: 14,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
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
});
