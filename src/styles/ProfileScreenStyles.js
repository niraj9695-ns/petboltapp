import { StyleSheet } from "react-native";
import { typography } from "./themeStyles";

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
    fontSize: typography.caption.fontSize,
    fontWeight: typography.caption.fontWeight,
  },
  name: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.h3.fontWeight,
    color: "#333",
    marginTop: 5,
  },
  desc: {
    fontSize: typography.small.fontSize,
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
    fontWeight: typography.h3.fontWeight,
    fontSize: typography.body.fontSize,
  },

  secondaryBtnText: {
    color: "#6b21a8",
    fontWeight: typography.h3.fontWeight,
    fontSize: typography.body.fontSize,
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
    fontSize: typography.caption.fontSize,
    color: "#888",
    fontWeight: typography.caption.fontWeight,
    marginTop: 10,
  },
  value: {
    fontSize: typography.body.fontSize,
    color: "#222",
    marginTop: 4,
  },
  docTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.h3.fontWeight,
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
    fontSize: typography.h3.fontSize,
    marginRight: 12,
  },

  documentTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.h3.fontWeight,
    color: "#111827",
  },

  documentSubTitle: {
    fontSize: typography.small.fontSize,
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
    fontWeight: typography.h3.fontWeight,
    fontSize: typography.small.fontSize,
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
    fontSize: typography.h2.fontSize,
    fontWeight: typography.h2.fontWeight,
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
    fontWeight: typography.h3.fontWeight,
  },
});
