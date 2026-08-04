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

import { View } from "react-native";
import appStyles from "./src/styles/AppStyles";
import PremiumLoader from "./src/components/PremiumLoader";
import { initializePushNotifications } from "./src/utils/notifications";
import { ToastHost, initializeToastAlertOverride } from "./src/utils/toast";

const Stack = createNativeStackNavigator();

function MainApp() {
  const { isDark } = useTheme();

  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);

  const [guestRole, setGuestRole] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLogin = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const role = await AsyncStorage.getItem("role");

      const guestRole = await AsyncStorage.getItem("guestRole");

      setIsLoggedIn(!!token);

      setUserRole(role);

      setGuestRole(guestRole);

      if (token) {
        initializePushNotifications().catch((error) => {});
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    initializeToastAlertOverride();
    checkLogin();

    const interval = setInterval(() => {
      checkLogin();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <View style={appStyles.loadingContainer}>
        <PremiumLoader size={64} color="#6b21a8" label="Preparing your experience" />
      </View>
    );
  }

  const initialRouteName = isLoggedIn
    ? userRole === "boarding_owner"
      ? "BoardingOwner"
      : "PetOwner"
    : guestRole === "boarding_owner"
      ? "GuestBoarding"
      : guestRole === "pet_owner"
        ? "GuestPetOwner"
        : "Auth";

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
        <Stack.Navigator
          initialRouteName={initialRouteName}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="Auth" component={AuthNavigator} />
          <Stack.Screen name="BoardingOwner" component={BoardingOwnerNavigator} />
          <Stack.Screen name="PetOwner" component={DrawerNavigator} />
          <Stack.Screen name="GuestBoarding" component={BoardingOwnerNavigator} />
          <Stack.Screen name="GuestPetOwner" component={DrawerNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
      <ToastHost />
    </View>
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
