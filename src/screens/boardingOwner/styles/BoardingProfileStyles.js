import { StyleSheet } from "react-native";
import { boardingOwnerTheme, typography } from "../../../styles/themeStyles";
import { colors } from "../../../styles/theme/colors";
import { spacing } from "../../../styles/theme/spacing";
import { radius } from "../../../styles/theme/radius";
import { shadows } from "../../../styles/theme/shadows";

const COLORS = boardingOwnerTheme;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: colors.background },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  scrollContent: { paddingBottom: 28 },

  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  profileHero: { minHeight: 112, flexDirection: "row", alignItems: "center", paddingHorizontal: spacing.lg, paddingVertical: spacing.lg, paddingRight: 70, position: "relative" },
  avatarArea: { position: "relative", flexShrink: 0, marginRight: spacing.lg },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: radius.round,
    borderWidth: 4,
    borderColor: COLORS.surface,
    backgroundColor: "#F8EEFF",
  },
  avatarEdit: {
    position: "absolute",
    right: -2,
    bottom: 0,
    width: 28,
    height: 28,
    borderRadius: radius.round,
    backgroundColor: COLORS.primary,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: COLORS.surface,
  },
  profileIdentity: { flex: 1, minWidth: 0, justifyContent: "center" },
  profileOptionsButton: { position: "absolute", top: 35, right: spacing.lg, width: 42, height: 42, alignItems: "center", justifyContent: "center" },

  name: {
    fontSize: 21,
    lineHeight: 28,
    fontWeight: "700",
  },

  email: {
    fontSize: typography.small.fontSize,
    color: COLORS.textMuted,
    marginTop: 4,
    fontSize: 12,
  },

  roleBadge: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 4,
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: radius.round,
    backgroundColor: "#FCE7F3",
    borderWidth: 1,
    borderColor: "#F0C8EB",
  },

  roleText: {
    color: COLORS.primary,
    fontWeight: "700",
    fontSize: 10,
  },

  progressCard: {
    width: "100%",
    borderRadius: 23,
    borderWidth: 1,
    padding: 16,
    marginBottom: spacing.sm,
    ...shadows.sm,
  },

  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  progressTitle: {
    fontSize: 13,
    fontWeight: "700",
  },
  progressTitleRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  progressIcon: { width: 30, height: 30, borderRadius: radius.round, backgroundColor: "#F8EEFF", alignItems: "center", justifyContent: "center" },

  progressPercent: {
    fontSize: 14,
    fontWeight: "700",
  },

  progressBar: {
    height: 10,
    backgroundColor: "#F8EEFF",
    borderRadius: 999,
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: COLORS.primary,
    borderRadius: 999,
  },

  progressHint: {
    marginTop: 10,
    fontSize: 12,
  },

  card: {
    marginTop: spacing.sm,
    borderRadius: 23,
    borderWidth: 1,
    padding: 0,
    overflow: "hidden",
    ...shadows.sm,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  sectionHeading: { flexDirection: "row", alignItems: "center", flex: 1, gap: 10 },
  sectionIcon: { width: 38, height: 38, borderRadius: radius.round, backgroundColor: "#F8EEFF", alignItems: "center", justifyContent: "center" },
  sectionTitle: { fontSize: 15, fontWeight: "700" },

  sectionBody: {
    paddingHorizontal: 14,
    paddingBottom: 12,
  },

  infoRow: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    minHeight: 64,
  },

  label: {
    fontSize: 11,
    fontWeight: "600",
    marginBottom: 3,
  },

  value: {
    fontSize: 12,
    lineHeight: 20,
    fontWeight: "700",
  },
  infoIcon: { width: 38, height: 38, borderRadius: radius.round, backgroundColor: "#F8EEFF", alignItems: "center", justifyContent: "center", marginRight: 11 },
  infoCopy: { flex: 1, minWidth: 0 },

  documentBtn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 13,
    borderRadius: radius.xxl,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },

  documentBtnText: {
    color: COLORS.surface,
    fontSize: 13,
    fontWeight: "700",
  },

  documentHint: {
    marginTop: 10,
    color: COLORS.textMuted,
    fontSize: 12,
    flex: 1,
  },

  emptyText: {
    fontSize: 12,
  },
  emptyDocument: { flexDirection: "row", alignItems: "center", gap: 8, paddingVertical: 6 },
  content: { width: "100%", paddingHorizontal: 16 },
  documentCard: { padding: 12, borderRadius: 18, backgroundColor: "#FFFFFF" },
  documentHeader: { flexDirection: "row", alignItems: "center", minHeight: 58, marginBottom: 12 },
  documentIcon: { width: 58, height: 58, borderRadius: 16, backgroundColor: "#F8EEFF", alignItems: "center", justifyContent: "center", marginRight: 12 },
  documentCopy: { flex: 1, minWidth: 0 },
  documentTitle: { fontSize: 14, lineHeight: 20, fontWeight: "700" },

  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
  },

  editBtn: {
    backgroundColor: COLORS.primary,
    marginTop: spacing.sm,
    marginBottom: 10,
    borderRadius: radius.xxl,
    paddingVertical: 15,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    ...shadows.sm,
  },

  editText: {
    color: COLORS.surface,
    fontSize: 14,
    fontWeight: "700",
  },
  
});

export default styles;
