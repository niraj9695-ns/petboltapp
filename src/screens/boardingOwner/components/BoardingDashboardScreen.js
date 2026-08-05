import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BoardingDashboardScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={["left","right","bottom"]}>
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          Boarding Owner Dashboard
        </Text>
      </View>
    </SafeAreaView>
  );
}