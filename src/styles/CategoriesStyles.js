import { StyleSheet } from "react-native";

export default StyleSheet.create({
  section: {
    paddingVertical: 30,
    paddingHorizontal: 15,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 6,
    color: "#1f2937",
  },

  gradientText: {
    color: "#f97316",
  },

  subtitle: {
    textAlign: "center",
    color: "#6b7280",
    marginBottom: 25,
    fontSize: 14,
  },

  scrollContainer: {
    paddingHorizontal: 10,
    paddingBottom: 10,
  },

  card: {
    borderRadius: 28,
    padding: 22,
    marginRight: 18,
    marginTop: 10,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 10,

    elevation: 6,
    alignItems: "center",
  },

  iconWrapper: {
    position: "relative",
    marginBottom: 14,
  },

  iconBox: {
    width: 85,
    height: 85,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },

  emoji: {
    position: "absolute",
    top: -8,
    right: -8,
    fontSize: 22,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1f2937",
    marginBottom: 6,
    textAlign: "center",
  },

  desc: {
    fontSize: 13,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 18,
    minHeight: 36,
  },

  button: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },
});
