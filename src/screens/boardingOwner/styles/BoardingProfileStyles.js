import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6f9",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  profileCard: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginTop: 3,
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 8,

    elevation: 5,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#6b21a8",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  avatarText: {
    color: "#fff",
    fontSize: 38,
    fontWeight: "bold",
  },

  name: {
    fontSize: 24,
    fontWeight: "700",
    color: "#111827",
  },

  email: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },

  roleBadge: {
    marginTop: 12,
    backgroundColor: "#f3e8ff",
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },

  roleText: {
    color: "#6b21a8",
    fontWeight: "700",
    fontSize: 13,
  },

  card: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    padding: 18,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,

    elevation: 3,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 15,
  },

  infoRow: {
    borderBottomWidth: 1,
    borderBottomColor: "#eef2f7",
    paddingVertical: 12,
  },

  label: {
    color: "#64748b",
    fontSize: 13,
    marginBottom: 4,
  },

  value: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "600",
  },

  documentBtn: {
    backgroundColor: "#6b21a8",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  documentBtnText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "700",
  },

  profileImage: {
    width: 130,
    height: 130,
    borderRadius: 65,
    alignSelf: "center",
  },

  myCentersBtn: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#6b21a8",
  },

  myCentersText: {
    color: "#6b21a8",
    fontSize: 16,
    fontWeight: "700",
  },

  editBtn: {
    backgroundColor: "#6b21a8",
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 30,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },

  editText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
});

export default styles;
