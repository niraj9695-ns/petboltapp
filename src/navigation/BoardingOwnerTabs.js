import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import BoardingBookingsScreen from "../screens/boardingOwner/components/BoardingBookingsScreen";
import BoardingCentersScreen from "../screens/boardingOwner/components/BoardingCentersScreen";
import BoardingCouponsScreen from "../screens/boardingOwner/components/BoardingCouponsScreen";
import BoardingProfileScreen from "../screens/boardingOwner/components/BoardingProfileScreen";

const Tab = createBottomTabNavigator();

export default function BoardingOwnerTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Bookings") {
            iconName = "calendar-outline";
          } else if (route.name === "Notifications") {
            iconName = "notifications-outline";
          } else if (route.name === "Centers") {
            iconName = "business-outline";
          } else if (route.name === "Coupons") {
            iconName = "ticket-outline";
          } else {
            iconName = "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: "#6b21a8",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Bookings" component={BoardingBookingsScreen} />

      <Tab.Screen name="Centers" component={BoardingCentersScreen} />

      <Tab.Screen name="Coupons" component={BoardingCouponsScreen} />

      <Tab.Screen name="Profile" component={BoardingProfileScreen} />
    </Tab.Navigator>
  );
}
