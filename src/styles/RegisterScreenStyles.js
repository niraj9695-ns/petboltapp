import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F4FC",
  },
  scrollContainer: {
    padding: 15,
    paddingBottom: 40,
  },
  welcomeTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#17174A",
  },
  welcomeSubtitle: {
    marginTop: 2,
    fontSize: 12,
    color: "#666666",
  },
  petImage: {
    width: 180,
    height: 130,
  },

  highlightText: {
    color: "#6D28D9",
    fontWeight: "700",
  },
  heroContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  textContainer: {
    flex: 1,
  },
  segmentContainer: {
    flexDirection: "row",
    backgroundColor: "#EDE7F6",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginBottom: 0,
    overflow: "hidden",
  },
  segmentButton: {
    flex: 1,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
  },
  segmentActive: {
    backgroundColor: "#FFFFFF",
  },
  segmentContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  segmentText: {
    color: "#6B7280",
    fontWeight: "800",
    fontSize: 15,
  },

  segmentActiveText: {
    color: "#6D28D9",
    fontWeight: "800",
  },
  authCard: {
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 16,
  },
  guestContainer: {
    marginTop: 24,
  },

  guestTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1B1B4B",
  },

  guestSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
    marginBottom: 16,
  },

  guestCardsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  guestCard: {
    width: "49%",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 16,
    padding: 10,
    height: 140,
    position: "relative",
  },

  iconCirclePurple: {
    width: 30,
    height: 30,
    borderRadius: 24,
    backgroundColor: "#F3E8FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  iconCircleGreen: {
    width: 30,
    height: 30,
    borderRadius: 24,
    backgroundColor: "#ECFDF3",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  iconText: {
    fontSize: 20,
  },

  guestCardTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#1B1B4B",
    marginBottom: 4,
  },

  guestCardDescription: {
    fontSize: 12,
    color: "#6B7280",
    width: "90%",
  },

  arrowPurple: {
    position: "absolute",
    right: 10,
    bottom: 3,
    width: 20,
    height: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#9333EA",
    alignItems: "center",
    justifyContent: "center",
  },

  arrowGreen: {
    position: "absolute",
    right: 10,
    bottom: 3,
    width: 20,
    height: 20,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "#4ADE80",
    alignItems: "center",
    justifyContent: "center",
  },

  featuresContainer: {
    marginTop: 18,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    paddingVertical: 18,
    paddingHorizontal: 8,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderWidth: 1,
    borderColor: "#F1F1F1",
  },

  featureItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  featureTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#6D28D9",
    textAlign: "center",
  },

  featureSubtitle: {
    marginTop: 6,
    fontSize: 11,
    color: "#777777",
    textAlign: "center",
    lineHeight: 15,
  },
});
