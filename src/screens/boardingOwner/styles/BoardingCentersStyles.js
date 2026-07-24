import { StyleSheet } from "react-native";

const COLORS = {
  primary: "#6b21a8",
  white: "#ffffff",
  background: "#f8fafc",
  text: "#111827",
  gray: "#6b7280",
  border: "#e9d8fd",
};

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: COLORS.primary,
  },

  createButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },

  createButtonText: {
    color: COLORS.white,
    fontWeight: "700",
    marginLeft: 6,
  },

  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },

  card: {
    width: "100%",
    backgroundColor: COLORS.white,
    borderRadius: 18,
    overflow: "hidden",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  
  image: {
    width: "100%",
    height: 180,
  },

  infoSection: {
    padding: 14,
  },

  centerName: {
    fontSize: 18,
    fontWeight: "700",
    color: COLORS.text,
  },

  location: {
    marginTop: 4,
    color: COLORS.gray,
    fontSize: 14,
  },

  button: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 14,
    marginBottom: 14,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
  },

  buttonText: {
    color: COLORS.white,
    fontWeight: "700",
    fontSize: 14,
  },

  emptyState: {
    paddingVertical: 60,
    alignItems: "center",
  },

  emptyText: {
    color: COLORS.gray,
    fontSize: 15,
  },
});
