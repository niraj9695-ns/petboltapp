import { StyleSheet } from "react-native";
import { boardingOwnerTheme, typography } from "../../../styles/themeStyles";

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
    fontSize: typography.h4.fontSize,
    fontWeight: typography.h4.fontWeight,
    color: COLORS.primaryDark,
    marginTop: 16,
    marginHorizontal: 16,
  },

  subHeading: {
    fontSize: typography.caption.fontSize,
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
    fontSize: typography.body.fontSize,
    fontWeight: typography.title.fontWeight,
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
    fontSize: typography.caption.fontSize,
    fontWeight: typography.bodyMedium.fontWeight,
  },

  input: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: COLORS.surfaceAlt,
    fontSize: typography.small.fontSize,
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
    fontWeight: typography.title.fontWeight,
    fontSize: typography.body.fontSize,
  },
});
