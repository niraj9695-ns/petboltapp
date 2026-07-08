import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f3ff",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    fontSize: 22,
    fontWeight: "800",
    color: "#4c1d95",
    marginTop: 16,
    marginHorizontal: 16,
  },

  subHeading: {
    fontSize: 13,
    color: "#6b7280",
    marginHorizontal: 16,
    marginBottom: 12,
  },

  card: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ece7ff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  sectionTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#4c1d95",
  },

  sectionChevron: {
    fontSize: 20,
    color: "#6b21a8",
    fontWeight: "700",
  },

  sectionBody: {
    paddingHorizontal: 16,
    paddingBottom: 14,
  },

  inputContainer: {
    marginBottom: 12,
  },

  label: {
    color: "#6b7280",
    marginBottom: 6,
    fontSize: 12.5,
    fontWeight: "600",
  },

  input: {
    borderWidth: 1,
    borderColor: "#e9e3ff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#fcfbff",
    fontSize: 14,
    color: "#111827",
  },

  inputMultiline: {
    minHeight: 84,
    textAlignVertical: "top",
  },

  saveButton: {
    backgroundColor: "#6b21a8",
    marginHorizontal: 16,
    marginTop: 6,
    marginBottom: 30,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  saveButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});
