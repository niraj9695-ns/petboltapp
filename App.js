import React, { useEffect, useState } from "react";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { useTheme } from "./src/context/ThemeContext";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AsyncStorage from "@react-native-async-storage/async-storage";

import DrawerNavigator from "./src/navigation/DrawerNavigator";
import AuthNavigator from "./src/navigation/AuthNavigator";
import BoardingOwnerNavigator from "./src/navigation/BoardingOwnerNavigator";

import { ThemeProvider } from "./src/context/ThemeContext";
import { RefreshProvider } from "./src/context/RefreshContext";

import { Text, TextInput, View } from "react-native";
import { useFonts } from "expo-font";
import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
import CormorantGaramond_700Bold from "@expo-google-fonts/cormorant-garamond/700Bold/CormorantGaramond_700Bold.ttf";
import { Allura_400Regular } from "@expo-google-fonts/allura";
import appStyles from "./src/styles/AppStyles";
import PremiumLoader from "./src/components/PremiumLoader";
import { initializePushNotifications } from "./src/utils/notifications";
import { ToastHost } from "./src/utils/toast";
import { textStyles } from "./src/styles/theme/typography";

const Stack = createNativeStackNavigator();

function MainApp() {
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const { theme } = useTheme();
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    CormorantGaramond_700Bold,
    Allura_400Regular,
  });

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
    checkLogin();
  }, []);

  if (loading || !fontsLoaded) {
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

  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: theme.background,
      card: theme.cardBackground,
      text: theme.textPrimary,
      border: theme.border,
      primary: theme.primary,
      notification: theme.primary,
    },
  };

  return (
    <View style={{ flex: 1 }}>
      <NavigationContainer theme={navigationTheme}>
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

Text.defaultProps = {
  ...Text.defaultProps,
  style: [Text.defaultProps?.style, textStyles.body],
};

TextInput.defaultProps = {
  ...TextInput.defaultProps,
  style: [TextInput.defaultProps?.style, textStyles.body],
};

export default function App() {
  return (
    <ThemeProvider>
      <RefreshProvider>
        <MainApp />
      </RefreshProvider>
    </ThemeProvider>
  );
}
