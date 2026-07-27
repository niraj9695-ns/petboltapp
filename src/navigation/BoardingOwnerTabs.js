import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { palette } from "../styles/themeStyles";
import BoardingDashboardScreen from "../screens/boardingOwner/BoardingDashboardScreen";
import BoardingBookingsScreen from "../screens/boardingOwner/BoardingBookingsScreen";
import BoardingProfileScreen from "../screens/boardingOwner/BoardingProfileScreen";
import NotificationScreen from "../screens/NotificationScreen";

const Tab = createBottomTabNavigator();

export default function BoardingOwnerTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = "home-outline";
          } else if (route.name === "Bookings") {
            iconName = "calendar-outline";
          } else if (route.name === "Notifications") {
            iconName = "notifications-outline";
          } else {
            iconName = "person-outline";
          }

          return (
            <Ionicons
              name={iconName}
              size={size}
              color={color}
            />
          );
        },

        tabBarActiveTintColor: palette.secondary,
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={BoardingDashboardScreen}
      />

      <Tab.Screen
        name="Bookings"
        component={BoardingBookingsScreen}
      />

      <Tab.Screen
        name="Notifications"
        component={NotificationScreen}
      />

      <Tab.Screen
        name="Profile"
        component={BoardingProfileScreen}
      />
    </Tab.Navigator>
  );
}