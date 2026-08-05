import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet, View, Text } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

const normalizeColor = (value, fallback = "#7c3aed") => {
  if (!value || typeof value !== "string") return fallback;

  const trimmed = value.trim();
  if (!trimmed) return fallback;

  if (/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(trimmed)) {
    if (trimmed.length === 4) {
      const expanded = trimmed
        .slice(1)
        .split("")
        .map((char) => `${char}${char}`)
        .join("");
      return `#${expanded}`;
    }

    return trimmed;
  }

  return trimmed;
};

export default function PremiumLoader({
  size = 56,
  color = "#7c3aed",
  label = "Loading",
  showLabel = true,
  style,
  fullScreen = false,
  overlayColor = "rgba(9, 14, 24, 0.38)",
}) {
  const spinValue = useRef(new Animated.Value(0)).current;
  const pulseValue = useRef(new Animated.Value(1)).current;
  const resolvedColor = normalizeColor(color);

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1400,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseValue, {
          toValue: 1.08,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseValue, {
          toValue: 1,
          duration: 700,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [pulseValue, spinValue]);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const content = (
    <View style={[styles.container, style]}>
      <Animated.View
        style={{
          transform: [{ rotate }, { scale: pulseValue }],
        }}
      >
        <View
          style={[
            styles.outerRing,
            {
              width: size,
              height: size,
              borderColor: `${resolvedColor}22`,
            },
          ]}
        >
          <Animated.View
            style={[
              styles.rainbowRing,
              {
                transform: [{ rotate }],
              },
            ]}
          >
            <LinearGradient
              colors={[
                "#ff0000", // red
                "#ff7f00", // orange
                "#ffff00", // yellow
                "#00ff00", // green
                "#0000ff", // blue
                "#4b0082", // indigo
                "#9400d3", // violet
                "#ff0000", // back to red
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.rainbowGradient}
            />
          </Animated.View>
          <View style={styles.pawBadge}>
            <Ionicons name="paw" size={size * 0.26} color={resolvedColor} />
          </View>
        </View>
      </Animated.View>

      {showLabel ? (
        <Text style={[styles.label, { color: resolvedColor }]}>{label}</Text>
      ) : null}
    </View>
  );

  if (!fullScreen) {
    return content;
  }

  return (
    <View style={styles.overlayContainer}>
      <BlurView intensity={24} tint="dark" style={StyleSheet.absoluteFill} />
      <View
        style={[StyleSheet.absoluteFill, styles.overlayBackdrop, { backgroundColor: overlayColor }]}
      />
      <View style={styles.overlayContent}>{content}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  overlayContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 999,
    elevation: 999,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  overlayBackdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  overlayContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  outerRing: {
    borderRadius: 999,
    borderWidth: 3,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
    backgroundColor: "#fff",
  },
  innerRing: {
    position: "absolute",
    width: "78%",
    height: "78%",
    borderRadius: 999,
    borderWidth: 3,
    borderColor: "transparent",
  },
  pawBadge: {
    position: "absolute",
    width: "70%",
    height: "70%",
    borderRadius: 999,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    marginTop: 10,
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.4,
  },
  rainbowRing: {
    position: "absolute",
    width: "88%",
    height: "88%",
    borderRadius: 999,
    overflow: "hidden",
  },

  rainbowGradient: {
    flex: 1,
    borderRadius: 999,
  },
});
