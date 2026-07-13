import React, { useEffect, useState } from "react";

import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AsyncStorage from "@react-native-async-storage/async-storage";

import DrawerNavigator from "./src/navigation/DrawerNavigator";
import AuthNavigator from "./src/navigation/AuthNavigator";
import BoardingOwnerNavigator from "./src/navigation/BoardingOwnerNavigator";

import { ThemeProvider, useTheme } from "./src/context/ThemeContext";
import { RefreshProvider } from "./src/context/RefreshContext";

import { View, ActivityIndicator } from "react-native";

const Stack = createNativeStackNavigator();

function MainApp() {
  const { isDark } = useTheme();

  const [loading, setLoading] =
    useState(true);
    const [userRole, setUserRole] =
  useState(null);

const [guestRole, setGuestRole] =
  useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // CHECK LOGIN
 const checkLogin = async () => {
  try {
    const token =
      await AsyncStorage.getItem(
        "token"
      );

    const role =
      await AsyncStorage.getItem(
        "role"
      );

    const guestRole =
      await AsyncStorage.getItem(
        "guestRole"
      );

    setIsLoggedIn(!!token);

    setUserRole(role);

    setGuestRole(guestRole);

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    checkLogin();

    // AUTO CHECK EVERY SECOND
    const interval = setInterval(() => {
      checkLogin();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >

   {isLoggedIn ? (

  userRole === "boarding_owner" ? (
    <Stack.Screen
      name="BoardingOwner"
      component={BoardingOwnerNavigator}
    />
  ) : (
    <Stack.Screen
      name="PetOwner"
      component={DrawerNavigator}
    />
  )

) : guestRole === "boarding_owner" ? (

  <Stack.Screen
    name="GuestBoarding"
    component={BoardingOwnerNavigator}
  />

) : guestRole === "pet_owner" ? (

  <Stack.Screen
    name="GuestPetOwner"
    component={DrawerNavigator}
  />

) : (

  <Stack.Screen
    name="Auth"
    component={AuthNavigator}
  />

)}

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <RefreshProvider>
        <MainApp />
      </RefreshProvider>
    </ThemeProvider>
  );
}
