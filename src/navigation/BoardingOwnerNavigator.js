import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";

import {
  View,
  Text,
  Pressable,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import BoardingOwnerStack from "./BoardingOwnerStack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../context/ThemeContext";

import BoardingOwnerHomeScreen from "../screens/boardingOwner/components/BoardingOwnerHomeScreen";

const Drawer = createDrawerNavigator();

function BoardingOwnerDrawerContent({ navigation }) {
  const { theme, isDark, toggleTheme } = useTheme();
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

      Alert.alert("Success", "Logged out successfully");
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
      <Pressable
        style={styles.item}
        onPress={() =>
          navigation.navigate("Main", {
            screen: "BoardingTabs",
            params: {
              screen: "Dashboard",
            },
          })
        }
      >
        <Ionicons name="home-outline" size={22} color={theme.text} />

        <Text style={[styles.text, { color: theme.text }]}>Dashboard</Text>
      </Pressable>

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

export default function BoardingOwnerNavigator() {
  const { theme, isDark } = useTheme();

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
              backgroundColor: isDark ? "#1f2937" : "#f2f2f2",
              padding: 8,
              borderRadius: 10,
            }}
          >
            <Ionicons name="menu" size={28} color={theme.text} />
          </Pressable>
        ),
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
