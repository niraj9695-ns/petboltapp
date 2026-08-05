import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function BoardingOwnerHomeScreen() {
  return (
    <SafeAreaView
      edges={["left","right","bottom"]}
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
        <Text>Boarding Owner Dashboard</Text>
      </View>
    </SafeAreaView>
  );
}