import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    marginBottom: 14,
    position: "relative",
  },
  label: {
    position: "absolute",
    left: 12,
    top: 16,
    fontSize: 14,
    color: "#888",
    backgroundColor: "#fff",
    paddingHorizontal: 4,
    zIndex: 10,
  },
  labelActive: {
    top: -8,
    fontSize: 12,
    color: "#6b21a8",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 10,
    paddingTop: 18,
    backgroundColor: "#fff",
  },
});
