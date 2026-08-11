import React from "react";
import { View } from "react-native";
import BoardingStack from "../navigation/BoardingStack";
import bookingScreenStyles from "../styles/BookingScreenStyles";

export default function BookingScreen({ navigation }) {
  return (
    <View style={bookingScreenStyles.container}>
      <BoardingStack />
    </View>
  );
}
