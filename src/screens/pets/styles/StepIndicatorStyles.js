import { StyleSheet } from "react-native";

export default StyleSheet.create({
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
});
