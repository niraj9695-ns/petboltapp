import { StyleSheet } from "react-native";
import { boardingOwnerTheme, typography } from "../../../styles/themeStyles";
import { typography as baseTypography } from "../../../styles/theme/typography";

const COLORS = boardingOwnerTheme;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  heading: {
    fontSize: (typography && typography.h4 && typography.h4.fontSize) || baseTypography.sectionTitle || 22,
    fontWeight: (typography && typography.h4 && typography.h4.fontWeight) || baseTypography.weights.bold || "700",
    color: COLORS.primaryDark,
    marginTop: 16,
    marginHorizontal: 16,
  },

  subHeading: {
    fontSize: (typography && typography.caption && typography.caption.fontSize) || baseTypography.caption || 10,
    color: COLORS.textMuted,
    marginHorizontal: 16,
    marginBottom: 12,
  },

  card: {
    backgroundColor: COLORS.surface,
    marginHorizontal: 16,
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
    fontSize: (typography && typography.body && typography.body.fontSize) || baseTypography.body || 14,
    fontWeight: (typography && typography.title && typography.title.fontWeight) || baseTypography.weights.semibold || "600",
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
    fontSize: (typography && typography.caption && typography.caption.fontSize) || baseTypography.caption || 10,
    fontWeight: (typography && typography.bodyMedium && typography.bodyMedium.fontWeight) || baseTypography.weights.medium || "500",
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: COLORS.surfaceAlt,
    fontSize: (typography && typography.small && typography.small.fontSize) || baseTypography.small || 12,
    color: COLORS.text,
  },

  inputMultiline: {
    minHeight: 84,
    textAlignVertical: "top",
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
    fontWeight: (typography && typography.title && typography.title.fontWeight) || baseTypography.weights.semibold || "600",
    fontSize: (typography && typography.body && typography.body.fontSize) || baseTypography.body || 14,
  },
});
