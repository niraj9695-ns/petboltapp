import { StyleSheet } from "react-native";
import { boardingOwnerTheme, typography } from "../../../styles/themeStyles";

const COLORS = boardingOwnerTheme;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  profileCard: {
    backgroundColor: COLORS.surface,
    marginHorizontal: 16,
    marginTop: 3,
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 5,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
  },

  avatarText: {
    color: COLORS.surface,
    fontSize: typography.h2.fontSize,
    fontWeight: "bold",
  },

  name: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.h3.fontWeight,
    color: COLORS.text,
  },

  email: {
    fontSize: typography.small.fontSize,
    color: COLORS.textMuted,
    marginTop: 4,
  },

  roleBadge: {
    marginTop: 12,
    backgroundColor: COLORS.muted,
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
  },

  roleText: {
    color: COLORS.primary,
    fontWeight: typography.title.fontWeight,
    fontSize: typography.caption.fontSize,
  },

  card: {
    backgroundColor: COLORS.surface,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 20,
    padding: 0,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 3,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 16,
  },

  sectionTitle: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.title.fontWeight,
    color: COLORS.text,
  },

  sectionChevron: {
    fontSize: 20,
    color: COLORS.primary,
    fontWeight: typography.title.fontWeight,
  },

  sectionBody: {
    paddingHorizontal: 18,
    paddingBottom: 16,
  },

  infoRow: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    paddingVertical: 12,
  },

  label: {
    color: COLORS.textMuted,
    fontSize: typography.caption.fontSize,
    marginBottom: 4,
  },

  value: {
    color: COLORS.text,
    fontSize: typography.body.fontSize,
    fontWeight: typography.title.fontWeight,
  },

  documentBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  documentBtnText: {
    color: COLORS.surface,
    fontSize: typography.body.fontSize,
    fontWeight: typography.title.fontWeight,
  },

  documentHint: {
    marginTop: 10,
    color: COLORS.textMuted,
    fontSize: 12,
    textAlign: "center",
  },

  emptyText: {
    color: COLORS.textMuted,
    fontSize: typography.small.fontSize,
  },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
  },

  editBtn: {
    backgroundColor: COLORS.primary,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 30,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
  },

  editText: {
    color: COLORS.surface,
    fontSize: typography.body.fontSize,
    fontWeight: typography.title.fontWeight,
  },
});

export default styles;
