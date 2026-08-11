import { StyleSheet } from "react-native";

export default StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 18,
    marginBottom: 10,
    elevation: 3,
    shadowColor: "#6b21a8",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  petImage: {
    width: 60,
    height: 60,
    borderRadius: 40,
  },
  rightSection: {
    flex: 1,
    marginLeft: 25,
    justifyContent: "space-between",
  },
  petName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
  },
  iconRow: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },
});
