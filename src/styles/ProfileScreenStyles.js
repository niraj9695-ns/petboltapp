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
  container: {
    marginVertical: 15,
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    alignSelf: "center",
    width: "92%",
  },
  avatarWrapper: {
    marginTop: 10,
    marginBottom: 10,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#fff",
  },
  badge: {
    backgroundColor: "#fff",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 50,
    marginBottom: 10,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  name: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333",
    marginTop: 5,
  },
  desc: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  btnRow: {
    width: "100%",
    gap: 12,
    flexDirection: "row",
    flexWrap: "wrap",
  },
  primaryBtn: {
    flex: 1,
    minWidth: 180,
    backgroundColor: "#6b21a8",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  secondaryBtn: {
    flex: 1,
    minWidth: 180,
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  primaryBtnText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },

  secondaryBtnText: {
    color: "#6b21a8",
    fontWeight: "bold",
    fontSize: 15,
  },
  infoCard: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 16,
    marginTop: 20,
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: "#888",
    fontWeight: "600",
    marginTop: 10,
  },
  value: {
    fontSize: 15,
    color: "#222",
    marginTop: 4,
  },
  docTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    alignSelf: "flex-start",
  },
  documentCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    marginTop: 15,
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
    fontSize: 28,
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
    marginTop: 3,
  },

  viewDocumentBtn: {
    marginTop: 15,
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
  aadharImage: {
    width: "100%",
    maxWidth: 500,
    height: 260,
    borderRadius: 15,
    marginBottom: 20,
    alignSelf: "center",
  },
  
  fileAction: {
    marginTop: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: "#f3f4f6",
    width: "100%",
    alignItems: "center",
  },
  fileActionText: {
    color: "#2563eb",
    fontWeight: "600",
  },
  cancelBtn: {
    backgroundColor: "#fff",
    borderColor: "#d1d5db",
  },
  guestContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  guestAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  guestTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  guestText: {
    textAlign: "center",
    marginTop: 10,
    color: "#666",
  },
  guestButton: {
    backgroundColor: "#6b21a8",
    paddingHorizontal: 30,
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 25,
  },
  guestButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
