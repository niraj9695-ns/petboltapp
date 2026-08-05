import { StyleSheet } from "react-native";
import { colors } from "../../../styles/theme/colors";
import { spacing } from "../../../styles/theme/spacing";
import { radius } from "../../../styles/theme/radius";
import { responsive } from "../../../styles/theme/responsive";
import { typography } from "../../../styles/themeStyles";
import { typography as baseTypography } from "../../../styles/theme/typography";
import { shadows } from "../../../styles/theme/shadows";

const IMAGE_HEIGHT = responsive.isTablet ? 420 : 320;

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.background,
  },

  contentWrapper: {
    alignSelf: "center",
    width: "100%",
    maxWidth: responsive.contentMaxWidth,
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
    backgroundColor: colors.surface,
  },

  sliderContainer: {
    position: "relative",
    backgroundColor: colors.surfaceAlt,
    borderBottomLeftRadius: radius.xxl,
    borderBottomRightRadius: radius.xxl,
    overflow: "hidden",
  },

  sliderImageWrapper: {
    width: "100%",
    height: IMAGE_HEIGHT,
    backgroundColor: colors.border,
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
    top: spacing.md,
    right: spacing.md,
    backgroundColor: "rgba(15, 23, 42, 0.55)",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.round,
  },

  sliderCountText: {
    color: colors.surface,
    fontSize: (typography && typography.caption && typography.caption.fontSize) || baseTypography.caption || 10,
    fontWeight: "700",
    letterSpacing: 0.4,
  },

  sliderDots: {
    position: "absolute",
    bottom: spacing.md,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  sliderDot: {
    width: 8,
    height: 8,
    borderRadius: radius.round,
    backgroundColor: "rgba(255, 255, 255, 0.35)",
    marginHorizontal: spacing.xs,
  },

  sliderDotActive: {
    width: 24,
    backgroundColor: colors.surface,
  },

  detailsContainer: {
    padding: spacing.xl,
    borderTopLeftRadius: radius.xxl,
    borderTopRightRadius: radius.xxl,
    marginTop: -spacing.xl,
  },

  title: {
    fontSize: (typography && typography.heroTitle && typography.heroTitle.fontSize) || baseTypography.heroTitle || 28,
    fontWeight: "800",
    color: colors.text,
    marginBottom: spacing.md,
  },

  desc: {
    fontSize: (typography && typography.body && typography.body.fontSize) || baseTypography.body || 14,
    color: colors.textMuted,
    lineHeight: 24,
    marginBottom: spacing.xxl,
  },

  sectionCard: {
    backgroundColor: colors.surface,
    borderRadius: radius.xxl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    ...shadows.md,
  },

  sectionTitle: {
    fontSize: (typography && typography.cardTitle && typography.cardTitle.fontSize) || baseTypography.cardTitle || 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: spacing.md,
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
