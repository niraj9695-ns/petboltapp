import { appAlert } from "../utils/alert";
import React, { useCallback, useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { View, Text, Pressable, Image } from "react-native";
import PremiumLoader from "../components/PremiumLoader";
import BoardingOwnerStack from "./BoardingOwnerStack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../context/ThemeContext";
import NotificationScreen from "../screens/NotificationScreen";
import { drawerStyles } from "../styles/themeStyles";
import { fetchNotificationsFromApi } from "../utils/notifications";
import { typography } from "../styles/theme/typography";

const Drawer = createDrawerNavigator();

function HeaderNotificationButton({ navigation }) {
  const [unreadCount, setUnreadCount] = useState(0);
  const refreshUnreadCount = useCallback(async () => {
    try {
      const items = await fetchNotificationsFromApi({ limit: 20, offset: 0 });
      const count = items.reduce(
        (total, item) =>
          total + (item.is_read === "1" || item.is_read === 1 ? 0 : 1),
        0,
      );
      setUnreadCount(count);
    } catch (error) {
      setUnreadCount(0);
    }
  }, []);
  useEffect(() => {
    refreshUnreadCount();
    const unsubscribe = navigation.addListener("focus", () => {
      refreshUnreadCount();
    });
    return unsubscribe;
  }, [navigation, refreshUnreadCount]);
  return (
    <Pressable
      style={drawerStyles.headerRightButton}
      onPress={() =>
        navigation.navigate("Main", {
          screen: "BoardingTabs",
          params: { screen: "NotificationView" },
        })
      }
    >
      
      <View style={drawerStyles.notificationBadgeContainer}>
        <Ionicons name="notifications-outline" size={26} color="#111827" />
        {unreadCount > 0 ? (
          <View style={drawerStyles.notificationBadge}>
            <Text style={drawerStyles.notificationBadgeText}>
              
              {unreadCount > 9 ? "9+" : unreadCount}
            </Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

function BoardingOwnerDrawerContent({ navigation }) {
  const { theme } = useTheme();

  const [guestRole, setGuestRole] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadUserState = useCallback(async () => {
    try {
      setLoading(true);

      const values = await AsyncStorage.multiGet([
        "guestRole",
        "role",
        "isGuest",
      ]);

      const storedGuestRole = values[0][1];
      const storedRole = values[1][1];

      setGuestRole(storedGuestRole);
      setRole(storedRole);
    } catch (error) {
      console.log("Failed to load user state:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadUserState);

    return unsubscribe;
  }, [navigation, loadUserState]);
  const handleSignIn = async () => {
    try {
      // Immediately update UI
      setLoading(true);
      setGuestRole(null);
      setRole(null);

      // Remove guest state
      await AsyncStorage.multiRemove(["guestRole", "isGuest"]);

      // Reset navigation to Auth
      const parentNav = navigation.getParent?.();

      if (parentNav) {
        parentNav.reset({
          index: 0,
          routes: [{ name: "Auth" }],
        });
      } else {
        navigation.navigate("Auth");
      }
    } catch (error) {
      console.log("Sign in navigation error:", error);
      setLoading(false);

      appAlert.alert("Error", "Unable to open Sign In / Sign Up");
    }
  };
  const handleContinueAsGuest = async () => {
    try {
      await AsyncStorage.setItem("guestRole", "boarding_owner");
      await AsyncStorage.setItem("isGuest", "true");

      setGuestRole("boarding_owner");

      const parentNav = navigation.getParent?.();
      if (parentNav) {
        parentNav.reset({
          index: 0,
          routes: [{ name: "GuestBoarding" }],
        });
      } else {
        navigation.navigate("GuestBoarding");
      }
    } catch (error) {
      appAlert.alert("Error", "Unable to continue as guest");
    }
  };

  const handleLogout = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      if (token) {
        await fetch("https://www.cgpisoftware.com/cheerytail/api/auth/logout", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      await AsyncStorage.multiRemove(["token", "user", "role", "guestRole"]);

      setGuestRole(null);
      setRole(null);

      const parentNav = navigation.getParent?.();
      if (parentNav) {
        parentNav.reset({
          index: 0,
          routes: [{ name: "Auth" }],
        });
      } else {
        navigation.navigate("Auth");
      }
    } catch (error) {
      appAlert.alert("Error", "Logout failed");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingTop: 40,
        backgroundColor: theme.background,
      }}
    >
      {/* Logout */}
      {loading ? (
        <View
          style={{
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <PremiumLoader size={24} color="#6b21a8" showLabel={false} />
        </View>
      ) : guestRole ? (
        <Pressable
          style={[styles.item, { marginTop: 20 }]}
          onPress={handleSignIn}
        >
          <Ionicons name="log-in-outline" size={22} color="#6b21a8" />

          <Text style={[styles.text, { color: "#6b21a8" }]}>
            Sign In / Sign Up
          </Text>
        </Pressable>
      ) : role ? (
        <Pressable
          style={[styles.item, { marginTop: 20 }]}
          onPress={handleLogout}
        >
          <Ionicons name="log-out-outline" size={22} color="red" />

          <Text style={[styles.text, { color: "red" }]}>Logout</Text>
        </Pressable>
      ) : (
        <>
          <Pressable style={[styles.item]} onPress={handleSignIn}>
            <Ionicons name="log-in-outline" size={22} color="#6b21a8" />

            <Text style={[styles.text, { color: "#6b21a8" }]}>
              Sign In / Sign Up
            </Text>
          </Pressable>
        </>
      )}
    </View>
  );
}

export default function BoardingOwnerNavigator() {
  const { theme } = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <BoardingOwnerDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: theme.background,
        },
        headerTitleAlign: "center",
        headerTitleContainerStyle: {
          left: 0,
          right: 0,
          alignItems: "center",
          justifyContent: "center",
        },

        headerTitle: () => (
          <Image
            source={require("../../assets/logo.png")}
            style={{
              width: 100,
              height: 60,
              resizeMode: "contain",
            }}
          />
        ),

        headerLeft: () => (
          <Pressable
            onPress={() => navigation.toggleDrawer()}
            style={{
              marginLeft: 15,
              backgroundColor: theme.surfaceAlt,
              padding: 8,
              borderRadius: 10,
            }}
          >
            <Ionicons name="menu" size={28} color={theme.text} />
          </Pressable>
        ),

        headerRight: () => <HeaderNotificationButton navigation={navigation} />,
      })}
    >
      <Drawer.Screen
        name="Main"
        component={BoardingOwnerStack}
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
      <Drawer.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = {
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    gap: 10,
  },

  text: {
    fontSize: 15,
    fontFamily: typography.fonts.medium,
    fontWeight: "500",
  },
};
