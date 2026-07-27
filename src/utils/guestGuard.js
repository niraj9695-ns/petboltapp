import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function isGuestUser() {
  const guestRole = await AsyncStorage.getItem("guestRole");
  return !!guestRole;
}

export async function getGuestRole() {
  return await AsyncStorage.getItem("guestRole");
}

export function showGuestActionAlert(navigation) {
  Alert.alert(
    "Sign in required",
    "Please sign in or create an account to continue.",
    [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign In / Sign Up",
        onPress: () => navigation?.navigate("Auth"),
      },
    ],
  );
}

export async function requireAuth(navigation) {
  const guestRole = await AsyncStorage.getItem("guestRole");
  if (guestRole) {
    showGuestActionAlert(navigation);
    return false;
  }
  return true;
}

