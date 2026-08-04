import { StyleSheet } from "react-native";
import { typography } from "./themeStyles";

export default StyleSheet.create({
  section: {
    flex: 1,
    backgroundColor: "#f8fafc",
    padding: 15,
  },
  title: {
    fontSize: typography.h4.fontSize,
    fontWeight: typography.h3.fontWeight,
    textAlign: "center",
    marginTop: 10,
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
    borderRadius: 35,
    borderWidth: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  emoji: {
    fontSize: typography.h3.fontSize,
  },
  storyName: {
    fontSize: typography.caption.fontSize,
    marginTop: 5,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    marginBottom: 15,
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
    fontSize: typography.caption.fontSize,
  },
  content: {
    padding: 15,
  },
  name: {
    fontWeight: typography.h3.fontWeight,
    fontSize: typography.body.fontSize,
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
    padding: 10,
    borderRadius: 12,
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: typography.title.fontWeight,
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
    fontWeight: typography.title.fontWeight,
  },
});
