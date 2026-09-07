import { createTypographyStyleSheet as StyleSheet } from "../../../styles/theme/typography";
import { boardingOwnerTheme, typography } from "../../../styles/themeStyles";
import { typography as baseTypography } from "../../../styles/theme/typography";

const COLORS = boardingOwnerTheme;

export default StyleSheet({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  heroCard: {
    borderRadius: 24,
    padding: 20,
    marginHorizontal: 5,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
  },
  headerContainer: {
    alignItems: "center",
  },

  headerTopRow: {
    position: "relative",
    width: "100%",
    minHeight: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  backButtonContainer: {
    position: "absolute",
    left: 0,
    zIndex: 1,
  },

  heading: {
    fontSize: typography?.h4?.fontSize || baseTypography.sectionTitle || 22,
    fontWeight:
      typography?.h4?.fontWeight || baseTypography.weights.bold || "700",
    color: COLORS.surface,
    textAlign: "center",
    paddingHorizontal: 48,
  },

  subHeading: {
    fontSize: typography?.caption?.fontSize || baseTypography.caption || 10,
    color: "rgba(255, 255, 255, 0.9)",
    textAlign: "center",
    lineHeight: 18,
    marginTop: 8,
    paddingHorizontal: 24,
  },

  card: {
    backgroundColor: COLORS.surface,
    marginHorizontal: 5,
    marginBottom: 12,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 14,
  },

  sectionTitle: {
    fontSize:
      (typography && typography.body && typography.body.fontSize) ||
      baseTypography.body ||
      14,
    fontWeight:
      (typography && typography.title && typography.title.fontWeight) ||
      baseTypography.weights.semibold ||
      "600",
    color: COLORS.primaryDark,
  },

  sectionChevron: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: typography.title.fontWeight,
  },

  sectionBody: {
    paddingHorizontal: 16,
    paddingBottom: 14,
  },

  inputContainer: {
    marginBottom: 12,
  },

  label: {
    color: COLORS.textMuted,
    marginBottom: 6,
    fontSize:
      (typography && typography.caption && typography.caption.fontSize) ||
      baseTypography.caption ||
      10,
    fontWeight:
      (typography &&
        typography.bodyMedium &&
        typography.bodyMedium.fontWeight) ||
      baseTypography.weights.medium ||
      "500",
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: COLORS.surfaceAlt,
    fontSize:
      (typography && typography.small && typography.small.fontSize) ||
      baseTypography.small ||
      12,
    color: COLORS.text,
  },

  inputMultiline: {
    minHeight: 84,
    textAlignVertical: "top",
  },

  uploadButton: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: COLORS.surfaceAlt,
  },

  uploadButtonText: {
    color: COLORS.primary,
    fontSize:
      (typography && typography.small && typography.small.fontSize) ||
      baseTypography.small ||
      12,
    fontWeight:
      (typography &&
        typography.bodyMedium &&
        typography.bodyMedium.fontWeight) ||
      baseTypography.weights.medium ||
      "500",
  },

  uploadHint: {
    marginTop: 6,
    color: COLORS.textMuted,
    fontSize:
      (typography && typography.caption && typography.caption.fontSize) ||
      baseTypography.caption ||
      10,
  },

  saveButton: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 16,
    marginTop: 6,
    marginBottom: 30,
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  saveButtonText: {
    color: COLORS.surface,
    fontWeight:
      (typography && typography.title && typography.title.fontWeight) ||
      baseTypography.weights.semibold ||
      "600",
    fontSize:
      (typography && typography.body && typography.body.fontSize) ||
      baseTypography.body ||
      14,
  },
});
