import { StyleSheet } from "react-native";
import { colors } from "./theme/colors";
import { spacing } from "./theme/spacing";
import { radius } from "./theme/radius";
import { typography } from "./themeStyles";
import { typography as baseTypography } from "./theme/typography";

export default StyleSheet.create({
  section: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 15,
  },
  title: {
    fontSize: (typography && typography.h4 && typography.h4.fontSize) || baseTypography.h4 || 18,
    fontWeight: (typography && typography.h3 && typography.h3.fontWeight) || baseTypography.weights.bold || "700",
    textAlign: "center",
    marginTop: spacing.sm,
  },
  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 15,
  },
  storyRow: {
    flexDirection: "row",
    paddingVertical: 10,
    gap: 15,
  },
  storyItem: {
    alignItems: "center",
    marginRight: 15,
  },
  storyCircle: {
    width: 70,
    height: 70,
    borderRadius: radius.round,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  emoji: {
    fontSize: (typography && typography.h3 && typography.h3.fontSize) || baseTypography.h3 || 20,
  },
  storyName: {
    fontSize: (typography && typography.caption && typography.caption.fontSize) || baseTypography.caption || 10,
    marginTop: 5,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: radius.xl,
    marginBottom: spacing.lg,
    overflow: "hidden",
  },
  imageBox: {
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  bigEmoji: {
    fontSize: 50,
  },
  playBtn: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.4)",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  time: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 10,
    fontSize: (typography && typography.caption && typography.caption.fontSize) || baseTypography.caption || 10,
  },
  content: {
    padding: 15,
  },
  name: {
    fontWeight: (typography && typography.h3 && typography.h3.fontWeight) || baseTypography.weights.bold || "700",
    fontSize: (typography && typography.body && typography.body.fontSize) || baseTypography.body || 14,
    marginBottom: 5,
  },
  caption: {
    color: "#555",
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  btn: {
    backgroundColor: "#6366f1",
    padding: spacing.sm,
    borderRadius: radius.md,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: (typography && typography.title && typography.title.fontWeight) || baseTypography.weights.semibold || "600",
  },
  bottomBtn: {
    backgroundColor: "#6b21a8",
    padding: 12,
    borderRadius: 12,
    marginTop: 6,
    marginBottom: 18,
  },
  bottomText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: (typography && typography.title && typography.title.fontWeight) || baseTypography.weights.semibold || "600",
  },
});
