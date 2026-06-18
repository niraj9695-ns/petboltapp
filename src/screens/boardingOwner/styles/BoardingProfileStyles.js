import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    backgroundColor: "#6b21a8",
    alignItems: "center",
    paddingVertical: 35,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },

  avatarText: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#6b21a8",
  },

  name: {
    color: "#ffffff",
    fontSize: 22,
    fontWeight: "700",
  },

  email: {
    color: "#ddd6fe",
    marginTop: 5,
  },

  card: {
    backgroundColor: "#ffffff",
    marginHorizontal: 16,
    marginTop: 16,
    padding: 18,
    borderRadius: 18,
    elevation: 3,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#6b21a8",
    marginBottom: 15,
  },

  infoRow: {
    marginBottom: 12,
  },

  label: {
    color: "#6b7280",
    fontSize: 13,
  },

  value: {
    fontSize: 15,
    color: "#111827",
    fontWeight: "600",
    marginTop: 3,
  },

  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },

  chip: {
    backgroundColor: "#f3e8ff",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 50,
    marginRight: 8,
    marginBottom: 8,
  },

  chipText: {
    color: "#6b21a8",
    fontWeight: "600",
  },

  photo: {
    width: 160,
    height: 120,
    borderRadius: 12,
    marginRight: 12,
  },

  centerCard: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 14,
    padding: 14,
    marginBottom: 12,
  },

  centerName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  centerLocation: {
    color: "#6b7280",
    marginTop: 4,
  },

  centerPrice: {
    color: "#6b21a8",
    fontWeight: "700",
    marginTop: 6,
  },

  myCentersBtn: {
    backgroundColor: "#f3e8ff",
    margin: 5,
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: "center",
    borderColor: "#6b21a8",
    borderWidth: 0.2,
  },

  myCentersText: {
    color: "#6b21a8",
    fontWeight: "700",
    fontSize: 16,
  },

  editBtn: {
    backgroundColor: "#6b21a8",
    margin: 5,
    borderRadius: 15,
    paddingVertical: 16,
    alignItems: "center",
  },

  editText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default styles;
