import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import BottomTabs from "./BottomTabs";

import {
  View,
  Image,
  Pressable,
  Text,
  Alert,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";

import NotificationScreen from "../screens/NotificationScreen";
import PrivacyPolicyScreen from "../screens/PrivacyPolicyScreen";
import RefundPolicyScreen from "../screens/RefundPolicyScreen";
import TermsOfUseScreen from "../screens/TermsOfUseScreen";
import BoardingStack from "./BoardingStack";

import { useTheme } from "../context/ThemeContext";

const Drawer = createDrawerNavigator();

function CustomDrawerContent({ navigation }) {
  const { isDark, toggleTheme, theme } = useTheme();
  const [guestRole, setGuestRole] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      setLoading(true);

      const guestRole = await AsyncStorage.getItem("guestRole");

      const role = await AsyncStorage.getItem("role");

      setGuestRole(guestRole);
      setRole(role);

      setLoading(false);
    });

    return unsubscribe;
  }, [navigation]);

  const handleSignIn = async () => {
    await AsyncStorage.removeItem("guestRole");

    setGuestRole(null);
  };
  // LOGOUT FUNCTION
  const handleLogout = async () => {
    try {
      // GET TOKEN
      const token = await AsyncStorage.getItem("token");

      // API LOGOUT
      await fetch("https://www.cgpisoftware.com/cheerytail/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      // REMOVE TOKEN
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
      await AsyncStorage.removeItem("role");
      await AsyncStorage.removeItem("guestRole");

      setGuestRole(null);

      Alert.alert("Success", "Logged out successfully");

      // RESET NAVIGATION
      // navigation.reset({
      //   index: 0,
      //   routes: [{ name: "Auth" }],
      // });
    } catch (error) {
      Alert.alert("Error", "Logout failed");
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
      {/* Home */}
      <Pressable
        style={styles.item}
        onPress={() =>
          navigation.navigate("Main", {
            screen: "Home",
          })
        }
      >
        <Ionicons name="home-outline" size={22} color={theme.text} />

        <Text style={[styles.text, { color: theme.text }]}>Home</Text>
      </Pressable>

      {/* Profile */}
      <Pressable
        style={styles.item}
        onPress={() =>
          navigation.navigate("Main", {
            screen: "Profile",
          })
        }
      >
        <Ionicons name="person-outline" size={22} color={theme.text} />

        <Text style={[styles.text, { color: theme.text }]}>Profile</Text>
      </Pressable>

      {/* Notifications */}
      <Pressable
        style={styles.item}
        onPress={() => navigation.navigate("Notification")}
      >
        <Ionicons name="notifications-outline" size={22} color={theme.text} />

        <Text style={[styles.text, { color: theme.text }]}>Notifications</Text>
      </Pressable>

      {/* Theme Toggle */}
      <Pressable style={styles.item} onPress={toggleTheme}>
        <Ionicons
          name={isDark ? "moon" : "sunny"}
          size={22}
          color={theme.text}
        />

        <Text style={[styles.text, { color: theme.text }]}>
          {isDark ? "Dark Mode" : "Light Mode"}
        </Text>
      </Pressable>

      {/* Privacy Policy */}
      <Pressable
        style={styles.item}
        onPress={() => navigation.navigate("PrivacyPolicy")}
      >
        <Ionicons
          name="shield-checkmark-outline"
          size={22}
          color={theme.text}
        />

        <Text style={[styles.text, { color: theme.text }]}>Privacy Policy</Text>
      </Pressable>

      {/* Terms */}
      <Pressable
        style={styles.item}
        onPress={() => navigation.navigate("Terms")}
      >
        <Ionicons name="document-text-outline" size={22} color={theme.text} />

        <Text style={[styles.text, { color: theme.text }]}>Terms of Use</Text>
      </Pressable>

      {/* Refund Policy */}
      <Pressable
        style={styles.item}
        onPress={() => navigation.navigate("RefundPolicy")}
      >
        <Ionicons name="cash-outline" size={22} color={theme.text} />

        <Text style={[styles.text, { color: theme.text }]}>Refund Policy</Text>
      </Pressable>

      {/* Logout */}
      {loading ? (
        <View
          style={{
            marginTop: 20,
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="small" color="#6b21a8" />
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
      ) : null}
    </View>
  );
}

export default function DrawerNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: theme.background,
        },

        headerTitle: () => (
          <View
            style={{
              flex: 1,
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../assets/logo.png")}
              style={{
                width: 100,
                height: 60,
                resizeMode: "contain",
              }}
            />
          </View>
        ),

        headerTitleAlign: "center",

        headerLeft: () => (
          <Pressable
            onPress={() => navigation.toggleDrawer()}
            style={{
              marginLeft: 15,
              backgroundColor: isDark ? "#1f2937" : "#f2f2f2",
              padding: 8,
              borderRadius: 10,
            }}
          >
            <Ionicons name="menu" size={28} color={theme.text} />
          </Pressable>
        ),

        headerRight: () => (
          <Pressable
            style={{ marginRight: 15 }}
            onPress={() => navigation.navigate("Notification")}
          >
            <Ionicons
              name="notifications-outline"
              size={26}
              color={theme.text}
            />
          </Pressable>
        ),
      })}
    >
      {/* MAIN BOTTOM TABS */}
      <Drawer.Screen
        name="Main"
        component={BottomTabs}
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
      <Drawer.Screen
        name="Boarding"
        component={BoardingStack}
        options={{
          drawerItemStyle: {
            display: "none",
          },
        }}
      />

      {/* OTHER SCREENS */}
      <Drawer.Screen name="Notification" component={NotificationScreen} />

      <Drawer.Screen name="PrivacyPolicy" component={PrivacyPolicyScreen} />

      <Drawer.Screen name="RefundPolicy" component={RefundPolicyScreen} />

      <Drawer.Screen name="Terms" component={TermsOfUseScreen} />
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
    fontWeight: "500",
  },
};
