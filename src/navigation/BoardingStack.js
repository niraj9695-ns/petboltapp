import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BoardingCentersScreen from "../screens/boarding/components/BoardingCentersScreen";
import BoardingDetailsScreen from "../screens/boarding/components/BoardingDetailsScreen";
import BoardingBookingScreen from "../screens/boarding/components/BoardingBookingScreen";
import BookingStatus from "../screens/boarding/components/BookingStatus";

const Stack = createNativeStackNavigator();

export default function BoardingStack() {
  return (
    <Stack.Navigator
      initialRouteName="BoardingCenters"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="BoardingCenters" component={BoardingCentersScreen} />

      <Stack.Screen name="BoardingDetails" component={BoardingDetailsScreen} />

      <Stack.Screen name="BoardingBooking" component={BoardingBookingScreen} />

      <Stack.Screen name="BookingStatus" component={BookingStatus} />
    </Stack.Navigator>
  );
}
