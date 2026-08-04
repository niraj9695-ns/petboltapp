import React, { useCallback } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { typography } from "../styles/themeStyles";

export default function BackButton({ onPress, label = "← Back", fallbackRoute, fallbackParams }) {
  const navigation = useNavigation();

  const handlePress = useCallback(() => {
    try {
      // Prefer navigation.canGoBack when available
      let canBack = false;
      try {
        const state = navigation && navigation.getState && navigation.getState();
        if (navigation && navigation.canGoBack && navigation.canGoBack()) {
          canBack = true;
        } else if (state) {
          if (typeof state.index === "number" && state.index > 0) {
            canBack = true;
          } else if (state.routes && Array.isArray(state.routes)) {
            // check nested navigator states for back availability
            for (const r of state.routes) {
              if (r.state && typeof r.state.index === "number" && r.state.index > 0) {
                canBack = true;
                break;
              }
            }
          }
        }
      } catch (e) {}

      if (canBack && navigation && navigation.goBack) {
        navigation.goBack();
        return;
      }

      // If no navigator back available, use explicit fallback route if provided
      if (fallbackRoute && navigation && navigation.navigate) {
        navigation.navigate(fallbackRoute, fallbackParams || {});
        return;
      }

      // Then try custom onPress
      if (typeof onPress === "function") return onPress();

      if (navigation && navigation.navigate) {
        navigation.navigate("Home");
      }
    } catch (e) {}
  }, [onPress, navigation]);

  return (
    <TouchableOpacity style={styles.backButton} onPress={handlePress}>
      <Text style={styles.backButtonText}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
  },
  backButtonText: {
    fontSize: typography.small.fontSize,
    fontWeight: typography.smallMedium.fontWeight,
    color: "#6b21a8",
  },
});
