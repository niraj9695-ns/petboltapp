import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#faf5ff",
  },

  contentWrapper: {
    alignSelf: "center",
    width: "100%",
    maxWidth: 1100,
  },

  tabletCard: {
    width: "48%",
  },

  desktopCard: {
    width: "48%",
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },

  sliderContainer: {
    position: "relative",
    backgroundColor: "#f8fafc",
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: "hidden",
  },

  sliderImageWrapper: {
    width,
    height: 360,
    backgroundColor: "#e2e8f0",
  },

  sliderImage: {
    width: "100%",
    height: "100%",
  },

  sliderOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 140,
  },

  sliderCountBadge: {
    position: "absolute",
    top: 16,
    right: 16,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
  },

  sliderCountText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.4,
  },

  sliderDots: {
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  sliderDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: "rgba(255, 255, 255, 0.35)",
    marginHorizontal: 4,
  },

  sliderDotActive: {
    width: 24,
    backgroundColor: "#ffffff",
  },

  detailsContainer: {
    padding: 24,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -24,
  },

  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#0f172a",
    marginBottom: 12,
  },

  desc: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 24,
    marginBottom: 24,
  },

  sectionCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 4,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: 16,
  },

  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  label: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1e293b",
    width: "38%",
  },

  infoText: {
    flex: 1,
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
    textAlign: "right",
  },

  addressInfoText: {
    flex: 1,
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
    textAlign: "left",
  },

  addressLine: {
    marginTop: 4,
  },

  price: {
    fontSize: 18,
    fontWeight: "800",
    color: "#6b21a8",
  },

  divider: {
    height: 1,
    backgroundColor: "#e2e8f0",
    marginVertical: 10,
  },

  capacityStatusText: {
    marginTop: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  amenitiesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 4,
  },

  amenityBox: {
    backgroundColor: "#fff7ed",
    borderWidth: 1,
    borderColor: "#fdba74",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 50,
    marginRight: 10,
    marginBottom: 10,
  },

  amenityText: {
    color: "#6b21a8",
    fontWeight: "700",
    fontSize: 13,
  },

  tagBox: {
    backgroundColor: "#e0e7ff",
    borderWidth: 1,
    borderColor: "#c7d2fe",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 50,
    marginRight: 10,
    marginBottom: 10,
  },

  tagText: {
    color: "#4f46e5",
    fontWeight: "700",
    fontSize: 13,
  },

  serviceBox: {
    backgroundColor: "#dbeafe",
    borderWidth: 1,
    borderColor: "#bfdbfe",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 50,
    marginRight: 10,
    marginBottom: 10,
  },

  serviceText: {
    color: "#0369a1",
    fontWeight: "700",
    fontSize: 13,
  },

  sectionSubtitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1e293b",
    marginBottom: 8,
  },

  contactRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  contactLink: {
    color: "#6b21a8",
    textDecorationLine: "underline",
  },

  instructionsText: {
    fontSize: 15,
    color: "#475569",
    lineHeight: 22,
    fontStyle: "italic",
  },

  licenseLink: {
    backgroundColor: "#f3e8ff",
    borderWidth: 1,
    borderColor: "#e9d5ff",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 8,
  },

  licenseLinkText: {
    color: "#6b21a8",
    fontWeight: "700",
    fontSize: 14,
  },

  spacing: {
    height: 20,
  },

  primaryBtn: {
    backgroundColor: "#6b21a8",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#6b21a8",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 5,
  },

  primaryBtnText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
    letterSpacing: 0.3,
  },
});
