import React, { useCallback } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { typography } from "../styles/themeStyles";
import { typography as baseTypography } from "../styles/theme/typography";
import { createTypographyStyleSheet as StyleSheet } from "../styles/theme/typography";

export default function BackButton({
  onPress,
  label = "← Back",
  fallbackRoute,
  fallbackParams,
  style,
}) {
  const navigation = useNavigation();

  const handlePress = useCallback(() => {
    try {
      // Prefer navigation.canGoBack when available
      let canBack = false;
      try {
        const state =
          navigation && navigation.getState && navigation.getState();
        if (navigation && navigation.canGoBack && navigation.canGoBack()) {
          canBack = true;
        } else if (state) {
          if (typeof state.index === "number" && state.index > 0) {
            canBack = true;
          } else if (state.routes && Array.isArray(state.routes)) {
            // check nested navigator states for back availability
            for (const r of state.routes) {
              if (
                r.state &&
                typeof r.state.index === "number" &&
                r.state.index > 0
              ) {
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
    <TouchableOpacity
      style={[styles.backButton, style]}
      onPress={handlePress}
      activeOpacity={0.7}
      accessibilityRole="button"
      accessibilityLabel="Go back"
    >
      <MaterialCommunityIcons name="arrow-left" size={22} color="#6B21A8" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet({
  backButton: {
    width: 44,
    height: 44,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#FFFFFF",

    borderRadius: 14,

    borderWidth: 1,
    borderColor: "#E9D5FF",

    shadowColor: "#6B21A8",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6,

    elevation: 3,
  },
});

