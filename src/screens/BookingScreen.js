import React from "react";
import { View } from "react-native";
import BoardingStack from "../navigation/BoardingStack";
import bookingScreenStyles from "../styles/BookingScreenStyles";
import BackButton from "../components/BackButton";

export default function BookingScreen({ navigation }) {
  return (
    <View style={bookingScreenStyles.container}>
      <BackButton style={{ margin: 12 }} />
      <BoardingStack />
    </View>
  );
}
