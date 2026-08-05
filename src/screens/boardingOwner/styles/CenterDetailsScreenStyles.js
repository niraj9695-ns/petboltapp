import { StyleSheet, Dimensions } from "react-native";
import { boardingOwnerTheme, typography } from "../../../styles/themeStyles";

const { width } = Dimensions.get("window");
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
  header: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: COLORS.surface,
  },
  backButton: {
    marginBottom: 10,
  },
  backText: {
    color: COLORS.primary,
    fontSize: typography.body.fontSize,
    fontWeight: typography.bodyMedium.fontWeight,
  },
  title: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.h3.fontWeight,
    color: COLORS.text,
  },
  imageContainer: {
    position: "relative",
  },
  sliderImage: {
    width,
    height: 260,
  },
  counterContainer: {
    position: "absolute",
    bottom: 15,
    right: 15,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  counterText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 12,
  },
  card: {
    backgroundColor: COLORS.surface,
    marginTop: 16,
    padding: 18,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: typography.title.fontSize,
    fontWeight: typography.title.fontWeight,
    color: COLORS.primary,
    marginBottom: 15,
  },
  sectionCard: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    backgroundColor: COLORS.surfaceAlt,
  },
  sectionHeaderButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionHeaderTextWrap: {
    flex: 1,
  },
  sectionSubtitle: {
    color: "#6b7280",
    fontSize: 12,
    marginTop: 2,
    marginBottom: 4,
  },
  sectionChevron: {
    color: COLORS.primary,
    fontSize: 20,
    fontWeight: "700",
    marginLeft: 10,
  },
  sectionBody: {
    marginTop: 10,
  },
  infoRow: {
    marginBottom: 14,
  },
  label: {
    fontSize: typography.caption.fontSize,
    color: COLORS.textMuted,
    marginBottom: 4,
  },
  value: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.bodyMedium.fontWeight,
    color: COLORS.text,
  },
  documentHint: {
    marginTop: 10,
    color: "#475569",
    fontSize: 13,
    lineHeight: 18,
  },
  editButton: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 16,
    marginVertical: 20,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  editButtonText: {
    color: COLORS.surface,
    fontSize: 16,
    fontWeight: "700",
  },
});
