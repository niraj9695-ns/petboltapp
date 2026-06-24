import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BoardingOwnerTabs from "./BoardingOwnerTabs";
import UpdateBoardingProfileScreen from "../screens/boardingOwner/components/UpdateBoardingProfileScreen";
import CenterDetailsScreen from "../screens/boardingOwner/components/CenterDetailsScreen";
import UpdateCenterScreen from "../screens/boardingOwner/components/UpdateCenterScreen";
import CreateCenterScreen from "../screens/boardingOwner/components/CreateCenterScreen";
import BookingDetailsScreen from "../screens/boardingOwner/components/BookingDetailsScreen";

const Stack = createNativeStackNavigator();

export default function BoardingOwnerStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="BoardingTabs" component={BoardingOwnerTabs} />

      <Stack.Screen
        name="UpdateBoardingProfile"
        component={UpdateBoardingProfileScreen}
      />

      <Stack.Screen name="CenterDetails" component={CenterDetailsScreen} />
      <Stack.Screen name="UpdateCenter" component={UpdateCenterScreen} />
      <Stack.Screen name="CreateCenter" component={CreateCenterScreen} />
      <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
    </Stack.Navigator>
  );
}
