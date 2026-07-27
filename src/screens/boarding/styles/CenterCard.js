import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const isTablet = width >= 768;

const scale = (size) => {
  if (isTablet) return size * 1.1;
  if (width < 360) return size * 0.9;
  return size;
};

export default StyleSheet.create({
  centerCardWrapper: {
    flex: 1,
    borderRadius: scale(20),
    borderWidth: 1,
    borderColor: "#e2e8f0",
    backgroundColor: "#ffffff",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },

  cardContainer: {
    marginBottom: scale(16),
    alignSelf: "center",
  },

  /* CENTER IMAGE */
  centerImageContainer: {
    position: "relative",
    width: "100%",
    height: isTablet ? 180 : 160,
    backgroundColor: "#f1f5f9",
    overflow: "hidden",
  },

  centerImage: {
    width: "100%",
    height: "100%",
  },

  imageOverlay: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },

  centerImagePlaceholder: {
    width: "100%",
    height: isTablet ? 180 : 160,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
  },

  typeaBadge: {
    position: "absolute",
    top: scale(12),
    right: scale(12),
    backgroundColor: "rgba(107, 33, 168, 0.9)",
    paddingHorizontal: scale(10),
    paddingVertical: scale(6),
    borderRadius: scale(20),
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },

  typeBadgeText: {
    color: "#ffffff",
    fontSize: scale(10),
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  centerCardContent: {
    flex: 1,
    padding: scale(16),
    justifyContent: "space-between",
  },

  /* TITLE ROW */
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: scale(8),
  },

  titleSection: {
    flex: 1,
    marginRight: scale(8),
  },

  centerCardTitle: {
    fontSize: scale(16),
    fontWeight: "800",
    color: "#0f172a",
    lineHeight: scale(22),
    marginBottom: scale(6),
  },

  locationBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f3e8ff",
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: scale(6),
    alignSelf: "flex-start",
  },

  locationText: {
    fontSize: scale(11),
    color: "#6b21a8",
    fontWeight: "600",
    marginLeft: scale(4),
  },

  centerCardPrice: {
    fontSize: scale(15),
    fontWeight: "800",
    color: "#6b21a8",
    backgroundColor: "#f3e8ff",
    paddingHorizontal: scale(10),
    paddingVertical: scale(6),
    borderRadius: scale(10),
    textAlign: "center",
    minWidth: scale(70),
  },

  /* DESCRIPTION */
  centerCardDescription: {
    fontSize: scale(12),
    color: "#64748b",
    lineHeight: scale(18),
    marginBottom: scale(10),
    fontWeight: "500",
  },

  /* AMENITIES */
  amenitiesContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: scale(10),
  },

  amenitiesPreview: {
    fontSize: scale(11),
    color: "#6b21a8",
    fontWeight: "600",
    marginLeft: scale(6),
    flex: 1,
  },

  /* INFO BADGES */
  infoBadgesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: scale(12),
    gap: scale(6),
  },

  infoBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f4ff",
    paddingHorizontal: scale(8),
    paddingVertical: scale(4),
    borderRadius: scale(6),
    borderWidth: 1,
    borderColor: "#e0e7ff",
  },

  infoBadgeText: {
    fontSize: scale(10),
    color: "#4f46e5",
    fontWeight: "600",
    marginLeft: scale(4),
  },

  /* BUTTON */
  centerCardButton: {
    height: scale(44),
    borderRadius: scale(12),
    backgroundColor: "#6b21a8",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    shadowColor: "#6b21a8",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 3,
  },

  centerCardButtonText: {
    fontSize: scale(13),
    fontWeight: "700",
    color: "#ffffff",
    letterSpacing: 0.3,
  },
});
