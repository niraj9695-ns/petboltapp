import { StyleSheet } from "react-native";

export default StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 10,
  },
  subText: {
    color: "#666",
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  otpBox: {
    width: 50,
    height: 58,

    borderWidth: 1,
    borderColor: "#E5E7EB",

    borderRadius: 16,

    backgroundColor: "#FFFFFF",

    textAlign: "center",

    fontSize: 22,
    fontWeight: "700",

    color: "#6B21A8",

    shadowColor: "#B79FFF",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },

  otpBoxActive: {
    borderColor: "#6B21A8",
    borderWidth: 2,
  },
  resendText: {
    color: "#6b21a8",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "600",
  },
  button: {
    backgroundColor: "#6b21a8",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
  backText: {
    textAlign: "center",
    marginTop: 15,
    color: "#666",
  },
});
