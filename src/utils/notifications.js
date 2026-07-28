import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

const API_BASE_URL = "https://www.cgpisoftware.com/cheerytail/api";
const PUSH_TOKEN_STORAGE_KEY = "expo_push_token";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export async function registerForPushNotificationsAsync() {
  if (!Device.isDevice || Constants.appOwnership === "expo") {
    return null;
  }

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "Default",
      importance: Notifications.AndroidImportance.MAX,
      lightColor: "#6b21a8",
      sound: "default",
      enableVibrate: true,
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    return null;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}

export async function syncPushTokenToBackend(token) {
  const authToken = await AsyncStorage.getItem("token");

  if (!token || !authToken) {
    return false;
  }

  const formData = new FormData();
  formData.append("token", token);

  const response = await fetch(`${API_BASE_URL}/push/register-token`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();

    return false;
  }

  await AsyncStorage.setItem(PUSH_TOKEN_STORAGE_KEY, token);
  return true;
}

export async function sendPushNotification({
  title,
  body,
  user_id = "",
  data = {},
}) {
  const authToken = await AsyncStorage.getItem("token");

  if (!authToken) {
    return false;
  }

  const formData = new FormData();
  formData.append("title", title);
  formData.append("body", body);
  formData.append("user_id", user_id);
  formData.append("data", JSON.stringify(data));

  const response = await fetch(`${API_BASE_URL}/push/send`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();

    return false;
  }

  return true;
}

export async function initializePushNotifications() {
  const storedToken = await AsyncStorage.getItem(PUSH_TOKEN_STORAGE_KEY);
  const pushToken = await registerForPushNotificationsAsync();

  if (!pushToken) {
    return null;
  }

  if (storedToken === pushToken) {
    return pushToken;
  }

  const registered = await syncPushTokenToBackend(pushToken);
  return registered ? pushToken : null;
}

export async function fetchNotificationsFromApi({
  limit = 20,
  offset = 0,
} = {}) {
  const authToken = await AsyncStorage.getItem("token");

  if (!authToken) {
    return [];
  }

  const page = Math.floor(offset / limit) + 1;

  const url = `${API_BASE_URL}/notifications?page=${page}&per_page=${limit}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${authToken}`,
      Accept: "application/json",
    },
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload?.message || "Unable to load notifications");
  }

  const notifications =
    payload?.data?.data ?? payload?.data ?? payload?.notifications ?? [];

  return Array.isArray(notifications) ? notifications : [];

  return Array.isArray(notifications) ? notifications : [];
}

export async function markNotificationRead(notificationId) {
  const authToken = await AsyncStorage.getItem("token");
  if (!authToken) {
    return false;
  }

  const response = await fetch(
    `${API_BASE_URL}/notifications/${notificationId}/read`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    },
  );

  if (!response.ok) {
    const text = await response.text();

    return false;
  }

  return true;
}

export async function markAllNotificationsRead() {
  const authToken = await AsyncStorage.getItem("token");
  if (!authToken) {
    return false;
  }

  const response = await fetch(`${API_BASE_URL}/notifications/read-all`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();

    return false;
  }

  return true;
}

export async function deleteNotification(notificationId) {
  const authToken = await AsyncStorage.getItem("token");

  if (!authToken || !notificationId) {
    return false;
  }

  const endpoints = [
    `${API_BASE_URL}/notifications/${notificationId}`,
    `${API_BASE_URL}/notifications/delete/${notificationId}`,
  ];

  let lastError = "Unable to delete notification";

  for (const endpoint of endpoints) {
    try {
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.ok) {
        return true;
      }

      const text = await response.text();
      lastError = text || `Request failed with status ${response.status}`;

      if (response.status === 404 || response.status === 405) {
        continue;
      }

      return false;
    } catch (error) {
      lastError = error?.message || "Unable to delete notification";
    }
  }

  throw new Error(lastError);
}

export async function deleteAllNotifications() {
  const authToken = await AsyncStorage.getItem("token");

  if (!authToken) {
    return false;
  }

  const response = await fetch(`${API_BASE_URL}/notifications/delete-all`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || "Unable to delete all notifications");
  }

  return true;
}
