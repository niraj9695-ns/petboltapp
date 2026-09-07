import { StyleSheet } from "react-native";

export default StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDF9FF",
  },
  detailsLoader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FDF9FF",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: "#FDF9FF",
    padding: 10,
  },
  topHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 5,
    minHeight: 52,
  },
  headerLeftSide: {
    width: 90, // Same left and right width keeps title truly centered
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  headerRightSide: {
    width: 90, // Same left and right width keeps title truly centered
    alignItems: "flex-end",
    justifyContent: "center",
  },

  headerBackButton: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e9d5ff",
  },

  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "700",
    color: "#6b21a8",
    textAlign: "center",
  },

  headerIconButton: {
    width: 44,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
  },

  detailsHero: {
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 15,
  },
  detailPetImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageWrapper: {
    width: 140,
    height: 140,
    borderRadius: 70,
    overflow: "hidden",
    borderWidth: 4,
    borderColor: "#e9d5ff",
    backgroundColor: "#f3f4f6",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },

  detailPetImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  heroText: {
    marginTop: 1,
    alignItems: "center",
  },
  detailsHeading: {
    fontSize: 24,
    fontWeight: "700",
    color: "#6b21a8",
    marginTop: 12,
    textAlign: "center",
  },
  accordionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#f9f5ff",
    padding: 15,
    borderRadius: 12,
    marginTop: 12,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: "#e9d5ff",
  },

  accordionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#6b21a8",
  },
  petSubtitle: {
    color: "#6b7280",
    fontSize: 14,
  },
  section: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#6b21a8",
    marginTop: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f1f5f9",
  },
  label: {
    flex: 1,
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  value: {
    flex: 1,
    textAlign: "right",
    fontSize: 14,
    color: "#6b7280",
  },
  galleryContainer: {
    marginBottom: 0,
  },
  thumbnailScroll: {
    paddingVertical: 2,
  },
  thumbnailImage: {
    width: 100,
    height: 100,
    borderRadius: 16,
    marginRight: 12,
    backgroundColor: "#f3f4f6",
  },
  pdfLinkRow: {
    flex: 1,
    marginLeft: 12,
  },
  pdfLinkInner: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f8fafc",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#e5e7eb",
    flex: 1,
    maxWidth: "100%",
  },
  pdfIconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 10,
    backgroundColor: "#6b21a8",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  pdfLinkText: {
    flex: 1,
    fontSize: 12,
    fontWeight: "700",
    color: "#6b21a8",
  },
  spacer: {
    height: 48,
  },
});
