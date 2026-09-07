import { createTypographyStyleSheet as StyleSheet } from "../../../styles/theme/typography";
import { lightTheme } from "../../../theme/lightTheme";

export default function createPetFormModalStyles(theme = lightTheme) {
  const palette = theme;

  return StyleSheet({
    modalContainer: {
      flex: 1,
      backgroundColor: palette.overlay,
      justifyContent: "flex-end",
    },
    modalContent: {
      backgroundColor: palette.cardBackground,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      paddingHorizontal: 18,
      paddingTop: 18,
      paddingBottom: 26,
      maxHeight: "92%",
    },
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: palette.cardBackground,
      borderBottomWidth: 1,
      borderBottomColor: palette.border,
    },

    modalTitle: {
      fontSize: 24,
      fontWeight: "bold",
      color: palette.primary,
      flex: 1,
    },

    closeIcon: {
      fontSize: 24,
      fontWeight: "bold",
      color: palette.textSecondary,
    },
    stepButtonRow: {
      flexDirection: "row",
      marginTop: 20,
    },
    backBtn: {
      flex: 1,
      backgroundColor: palette.textSecondary,
      padding: 14,
      borderRadius: 14,
      alignItems: "center",
      marginRight: 10,
    },
    nextBtn: {
      flex: 1,
      backgroundColor: palette.primary,
      padding: 14,
      borderRadius: 14,
      alignItems: "center",
    },
    button: {
      flex: 1,
      backgroundColor: palette.primary,
      padding: 14,
      borderRadius: 14,
      alignItems: "center",
    },
    buttonText: {
      color: "#fff",
      fontWeight: "bold",
      fontSize: 16,
    },
    closeBtn: {
      marginTop: 15,
      alignItems: "center",
    },
    closeText: {
      color: palette.error,
      fontWeight: "bold",
      fontSize: 16,
    },
  });
}
