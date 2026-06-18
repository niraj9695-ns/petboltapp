import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#6b21a8",
    marginTop: 20,
    marginHorizontal: 20,
  },

  card: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 18,
    elevation: 3,
  },

  inputContainer: {
    marginBottom: 16,
  },

  label: {
    color: "#6b7280",
    marginBottom: 6,
    fontSize: 14,
  },

  input: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#fff",
  },

  saveButton: {
    backgroundColor: "#6b21a8",
    marginHorizontal: 20,
    marginBottom: 30,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  saveButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
