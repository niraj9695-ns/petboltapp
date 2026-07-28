import { StyleSheet } from "react-native";

export const palette = {
  primary: "#6b21a8",
  primaryDark: "#4c1d95",
  secondary: "#6b21a8",
  accent: "#ec4899",
  background: "#fffaf5",
  surface: "#ffffff",
  surfaceAlt: "#f8fafc",
  surfaceMuted: "#f3f4f6",
  text: "#111827",
  textMuted: "#6b7280",
  border: "#e5e7eb",
  success: "#22c55e",
  info: "#3b82f6",
  danger: "#ef4444",
};

export const homeStyles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: palette.background,
  },
  content: {
    paddingBottom: 30,
  },
});

export const drawerStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    backgroundColor: palette.background,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    gap: 10,
  },
  text: {
    fontSize: 15,
    fontWeight: "500",
  },
  loader: {
    marginTop: 20,
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
    marginLeft: 15,
    backgroundColor: palette.surfaceMuted,
    padding: 8,
    borderRadius: 10,
  },
  headerRightButton: {
    marginRight: 15,
  },
});

export const heroStyles = StyleSheet.create({
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
    fontSize: 12,
    fontWeight: "600",
    color: palette.text,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: palette.text,
    marginBottom: 10,
  },
  gradientText: {
    color: palette.secondary,
  },
  desc: {
    fontSize: 14,
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
    fontWeight: "bold",
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
    fontWeight: "bold",
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
    fontSize: 18,
    fontWeight: "bold",
    color: palette.text,
  },
  statLabel: {
    fontSize: 12,
    color: palette.textMuted,
  },
});

export const categoriesStyles = StyleSheet.create({
  section: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: palette.background,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
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
    fontSize: 14,
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
    fontSize: 22,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: palette.text,
    marginBottom: 4,
  },
  desc: {
    fontSize: 13,
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
    fontWeight: "600",
    fontSize: 14,
  },
});

export const dogGalleryStyles = StyleSheet.create({
  section: {
    paddingVertical: 20,
    backgroundColor: palette.background,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
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
    fontSize: 16,
    fontWeight: "bold",
    color: palette.text,
    marginBottom: 5,
  },
  desc: {
    fontSize: 13,
    color: palette.textMuted,
    marginBottom: 10,
  },
  link: {
    fontSize: 13,
    fontWeight: "600",
    color: palette.secondary,
  },
});

export const notificationStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    padding: 16,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
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
    fontWeight: "bold",
    fontSize: 15,
    marginBottom: 2,
    color: palette.text,
  },
  desc: {
    fontSize: 13,
    color: palette.textMuted,
  },
  date: {
    fontSize: 12,
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

export const statusStyles = StyleSheet.create({
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

export const appStyles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: palette.background,
  },
});

export const policyStyles = StyleSheet.create({
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
    fontSize: 26,
    fontWeight: "bold",
    color: palette.text,
    marginBottom: 5,
  },
  updated: {
    fontSize: 12,
    color: palette.textMuted,
    marginBottom: 15,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
    color: palette.text,
  },
  text: {
    fontSize: 13,
    color: palette.textMuted,
    lineHeight: 20,
  },
});
