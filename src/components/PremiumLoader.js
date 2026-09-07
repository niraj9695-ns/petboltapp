import React, { useEffect, useRef } from "react";
import { Animated, Easing, StyleSheet as RNStyleSheet, View, Text } from "react-native";
import { BlurView } from "expo-blur";
import { createTypographyStyleSheet as StyleSheet } from "../styles/theme/typography";
import { Ionicons } from "@expo/vector-icons";

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
  size = 72,
  color = "#7c3aed",
  label = "Loading",
  showLabel = true,
  style,
  fullScreen = false,
  overlayColor = "rgba(255,255,255,0.72)",
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
              styles.spinnerRing,
              {
                borderTopColor: resolvedColor,
                transform: [{ rotate }],
              },
            ]}
          />
          <View style={styles.pawBadge}>
            <Ionicons name="paw" size={size * 0.34} color={resolvedColor} />
          </View>
        </View>
      </Animated.View>

      {showLabel ? <Text style={styles.label}>{label}</Text> : null}
    </View>
  );

  if (!fullScreen) {
    return content;
  }

  return (
    <View style={styles.overlayContainer}>
      <BlurView intensity={18} tint="light" style={RNStyleSheet.absoluteFill} />
      <View
        style={[
          RNStyleSheet.absoluteFill,
          styles.overlayBackdrop,
          { backgroundColor: overlayColor },
        ]}
      />
      <View style={styles.overlayContent}>{content}</View>
    </View>
  );
}

const styles = StyleSheet({
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
    ...RNStyleSheet.absoluteFillObject,
  },
  overlayContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  pawBadge: {
    position: "absolute",
    width: "68%",
    height: "68%",
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    marginTop: 18,
    fontSize: 14,
    fontWeight: "600",
    color: "#475569",
    letterSpacing: 0.2,
  },
  spinnerRing: {
    position: "absolute",
    width: "92%",
    height: "92%",
    borderRadius: 999,
    borderWidth: 5,
    borderColor: "rgba(124,58,237,0.12)",
    borderTopColor: "#7c3aed",
  },
  outerRing: {
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },
});

