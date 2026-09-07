import { createTypographyStyleSheet } from "./theme/typography";
import { colors } from "./theme/colors";
import { spacing } from "./theme/spacing";
import { typography as themeTypography } from "./theme/typography";
import { radius } from "./theme/radius";
import { shadows } from "./theme/shadows";

export const palette = {
  primary: colors.primary,
  primaryDark: colors.primaryDark,
  secondary: colors.primary,
  accent: colors.accent,
  background: colors.background,
  surface: colors.surface,
  surfaceAlt: colors.surfaceAlt,
  surfaceMuted: colors.surfaceMuted,
  text: colors.text,
  textMuted: colors.textMuted,
  border: colors.border,
  success: colors.success,
  info: colors.info,
  danger: colors.danger,
};

export const typography = {
  h1: { fontSize: 24, fontWeight: "700" },
  h2: { fontSize: 20, fontWeight: "700" },
  h3: { fontSize: 18, fontWeight: "700" },
  h4: { fontSize: 16, fontWeight: "600" },
  title: { fontSize: 14, fontWeight: "600" },
  body: { fontSize: themeTypography.body, fontWeight: "400" },
  bodyMedium: { fontSize: themeTypography.body, fontWeight: "500" },
  small: { fontSize: themeTypography.small, fontWeight: "400" },
  smallMedium: { fontSize: themeTypography.small, fontWeight: "500" },
  caption: { fontSize: themeTypography.caption, fontWeight: "600" },
};

export const boardingOwnerTheme = {
  primary: palette.primary,
  primaryDark: palette.primaryDark,
  secondary: palette.secondary,
  accent: palette.accent,
  background: palette.background,
  surface: palette.surface,
  surfaceAlt: palette.surfaceAlt,
  muted: palette.surfaceMuted,
  text: palette.text,
  textMuted: palette.textMuted,
  border: palette.border,
  success: palette.success,
  danger: palette.danger,
  info: palette.info,
};

export const homeStyles = createTypographyStyleSheet({
  scroll: {
    flex: 1,
    backgroundColor: palette.background,
  },
  content: {
    paddingBottom: spacing.xxl,
  },
});

export const drawerStyles = createTypographyStyleSheet({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: palette.background,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.lg,
    gap: spacing.sm,
  },
  text: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.bodyMedium.fontWeight,
  },
  loader: {
    marginTop: spacing.xl,
    alignItems: "center",
  },
  headerContainer: {
    flex: 1,
    alignItems: "center",
  },
  headerLogo: {
    width: 100,
    height: 60,
    resizeMode: "contain",
  },
  menuButton: {
    marginLeft: spacing.lg,
    backgroundColor: palette.surfaceMuted,
    padding: spacing.sm,
    borderRadius: radius.md,
  },
  headerRightButton: {
    marginRight: spacing.lg,
    position: "relative",
  },
  notificationBadgeContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  notificationBadge: {
    position: "absolute",
    top: -spacing.xs,
    right: -spacing.sm,
    minWidth: spacing.lg,
    height: spacing.lg,
    borderRadius: radius.round,
    backgroundColor: palette.danger,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 4,
  },
  notificationBadgeText: {
    color: palette.surface,
    fontSize: typography.caption.fontSize,
    fontWeight: typography.h3.fontWeight,
    lineHeight: typography.caption.fontSize,
  },
});

export const heroStyles = createTypographyStyleSheet({
  wrapper: {
    flex: 1,
  },
  container: {
    padding: 20,
    borderRadius: 20,
    margin: 15,
  },
  badge: {
    backgroundColor: palette.surface,
    padding: 10,
    borderRadius: 50,
    alignSelf: "flex-start",
    marginBottom: 15,
  },
  badgeText: {
    fontSize: typography.caption.fontSize,
    fontWeight: typography.caption.fontWeight,
    color: palette.text,
  },
  title: {
    fontSize: typography.h1.fontSize,
    fontWeight: typography.h1.fontWeight,
    color: palette.text,
    marginBottom: 10,
  },
  gradientText: {
    color: palette.secondary,
  },
  desc: {
    fontSize: typography.small.fontSize,
    color: palette.textMuted,
    marginBottom: 20,
  },
  btnRow: {
    flexDirection: "column",
    gap: 10,
    marginBottom: 20,
  },
  primaryBtn: {
    backgroundColor: palette.secondary,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  primaryBtnText: {
    color: palette.surface,
    fontWeight: typography.h4.fontWeight,
  },
  secondaryBtn: {
    backgroundColor: palette.surface,
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: palette.border,
  },
  secondaryBtnText: {
    color: palette.primary,
    fontWeight: typography.title.fontWeight,
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  statBox: {
    alignItems: "center",
    flex: 1,
  },
  statNum: {
    fontSize: typography.title.fontSize,
    fontWeight: typography.h1.fontWeight,
    color: palette.text,
  },
  statLabel: {
    fontSize: typography.caption.fontSize,
    color: palette.textMuted,
  },
});

export const categoriesStyles = createTypographyStyleSheet({
  section: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: palette.background,
  },
  title: {
    fontSize: typography.h2.fontSize,
    fontWeight: typography.h2.fontWeight,
    textAlign: "center",
    marginBottom: 6,
    color: palette.text,
  },
  gradientText: {
    color: palette.secondary,
  },
  subtitle: {
    textAlign: "center",
    color: palette.textMuted,
    marginBottom: 25,
    fontSize: typography.small.fontSize,
  },
  scrollContainer: {
    paddingHorizontal: 10,
  },
  card: {
    width: 280,
    borderRadius: 28,
    padding: 22,
    marginRight: 18,
    marginTop: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 6,
    alignItems: "center",
  },
  iconWrapper: {
    position: "relative",
    marginBottom: 14,
  },
  iconBox: {
    width: 85,
    height: 85,
    borderRadius: 22,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    position: "absolute",
    top: -6,
    right: -6,
    fontSize: typography.h4.fontSize,
  },
  name: {
    fontSize: typography.title.fontSize,
    fontWeight: typography.title.fontWeight,
    color: palette.text,
    marginBottom: 4,
  },
  desc: {
    fontSize: typography.small.fontSize,
    color: palette.textMuted,
    textAlign: "center",
    marginBottom: 16,
  },
  button: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 14,
  },
  buttonText: {
    color: palette.surface,
    textAlign: "center",
    fontWeight: typography.title.fontWeight,
    fontSize: typography.title.fontSize,
  },
});

export const dogGalleryStyles = createTypographyStyleSheet({
  section: {
    paddingVertical: 20,
    backgroundColor: palette.background,
  },
  title: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.h3.fontWeight,
    textAlign: "center",
    color: palette.text,
  },
  subtitle: {
    textAlign: "center",
    color: palette.textMuted,
    marginTop: 8,
    marginBottom: 15,
  },
  scroll: {
    paddingHorizontal: 15,
  },
  card: {
    width: 300,
    backgroundColor: palette.surface,
    borderRadius: 25,
    marginRight: 15,
    marginBottom: 10,
    marginTop: 10,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  image: {
    width: "100%",
    height: 180,
  },
  content: {
    padding: 15,
  },
  name: {
    fontSize: typography.body.fontSize,
    fontWeight: typography.title.fontWeight,
    color: palette.text,
    marginBottom: 5,
  },
  desc: {
    fontSize: typography.small.fontSize,
    color: palette.textMuted,
    marginBottom: 10,
  },
  link: {
    fontSize: typography.small.fontSize,
    fontWeight: typography.title.fontWeight,
    color: palette.secondary,
  },
});

export const notificationStyles = createTypographyStyleSheet({
  container: {
    flex: 1,
  },
  scroll: {
    padding: 16,
  },
  heading: {
    fontSize: typography.h2.fontSize,
    fontWeight: typography.h2.fontWeight,
    color: palette.text,
    marginBottom: 6,
  },
  subHeading: {
    color: palette.textMuted,
    marginBottom: 16,
  },
  card: {
    backgroundColor: palette.surface,
    padding: 16,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: palette.border,
  },
  notificationCard: {
    borderRadius: 20,
    padding: 14,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontWeight: typography.bodyMedium.fontWeight,
    fontSize: typography.body.fontSize,
    marginBottom: 2,
    color: palette.text,
  },
  desc: {
    fontSize: typography.small.fontSize,
    color: palette.textMuted,
  },
  date: {
    fontSize: typography.caption.fontSize,
    color: palette.textMuted,
    marginTop: 2,
  },
  expandedBox: {
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: palette.border,
    paddingTop: 10,
  },
  fullText: {
    color: palette.text,
    marginBottom: 10,
  },
  actionRow: {
    flexDirection: "row",
    marginTop: 5,
  },
  primaryBtn: {
    flex: 1,
    backgroundColor: palette.primary,
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    marginLeft: 5,
  },
  secondaryBtn: {
    flex: 1,
    backgroundColor: palette.surfaceMuted,
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    marginRight: 5,
  },
  emptyBox: {
    alignItems: "center",
    paddingVertical: 40,
  },
  emptyText: {
    color: palette.textMuted,
    marginTop: 10,
  },
});

export const statusStyles = createTypographyStyleSheet({
  scroll: {
    flex: 1,
    backgroundColor: palette.background,
  },
  content: {
    paddingVertical: 20,
    alignItems: "center",
  },
  contentView: {
    width: "100%",
  },
});

export const appStyles = createTypographyStyleSheet({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: palette.background,
  },
});

export const policyStyles = createTypographyStyleSheet({
  scroll: {
    flex: 1,
    backgroundColor: palette.surfaceAlt,
  },
  container: {
    padding: 20,
    borderRadius: 20,
    margin: 15,
    backgroundColor: palette.surface,
  },
  title: {
    fontSize: typography.h3.fontSize,
    fontWeight: typography.h3.fontWeight,
    color: palette.text,
    marginBottom: 5,
  },
  updated: {
    fontSize: typography.caption.fontSize,
    color: palette.textMuted,
    marginBottom: 15,
  },
  heading: {
    fontSize: typography.h4.fontSize,
    fontWeight: typography.h3.fontWeight,
    marginTop: 15,
    marginBottom: 5,
    color: palette.text,
  },
  text: {
    fontSize: typography.small.fontSize,
    color: palette.textMuted,
    lineHeight: 20,
  },
});
