import React, { useCallback, useEffect, useState } from "react";
import {
  RefreshControl,
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PremiumLoader from "../components/PremiumLoader";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { RectButton, Swipeable } from "react-native-gesture-handler";
import {
  fetchNotificationsFromApi,
  markNotificationRead,
  markAllNotificationsRead,
  deleteNotification,
  deleteAllNotifications,
} from "../utils/notifications";
import styles from "../styles/NotificationScreenStyles";
import BackButton from "../components/BackButton";
import { typography } from "../styles/theme/typography";
import { useTheme } from "../context/ThemeContext";

const PAGE_SIZE = 20;

export default function NotificationScreen({ navigation }) {
  const { theme } = useTheme();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGuest, setIsGuest] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState("");
  const [dismissedAlerts, setDismissedAlerts] = useState(new Set());
  const [expandedId, setExpandedId] = useState(null);
  const [hasMore, setHasMore] = useState(true);

  const loadNotifications = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const items = await fetchNotificationsFromApi({
        limit: PAGE_SIZE,
        offset: 0,
      });
      setNotifications(items);
      setHasMore(items.length === PAGE_SIZE);
    } catch (err) {
      setError(err.message || "Unable to load notifications");
    } finally {
      setLoading(false);
    }
  }, []);

  const refreshNotifications = useCallback(async () => {
    setRefreshing(true);
    try {
      const items = await fetchNotificationsFromApi({
        limit: PAGE_SIZE,
        offset: 0,
      });
      setNotifications(items);
      setHasMore(items.length === PAGE_SIZE);
      setError("");
    } catch (err) {
      setError(err.message || "Unable to refresh notifications");
    } finally {
      setRefreshing(false);
    }
  }, []);

  const loadMoreNotifications = useCallback(async () => {
    if (loadingMore || !hasMore) {
      return;
    }

    setLoadingMore(true);

    try {
      const nextItems = await fetchNotificationsFromApi({
        limit: PAGE_SIZE,
        offset: notifications.length,
      });

      if (!nextItems.length) {
        setHasMore(false);
        return;
      }

      setNotifications((prev) => [...prev, ...nextItems]);
      setHasMore(nextItems.length === PAGE_SIZE);
    } catch (err) {
      setError(err.message || "Unable to load more notifications");
    } finally {
      setLoadingMore(false);
    }
  }, [hasMore, loadingMore, notifications.length]);

  useEffect(() => {
    const checkGuestAndLoad = async () => {
      const guestRole = await AsyncStorage.getItem("guestRole");

      if (guestRole) {
        setIsGuest(true);
        setLoading(false);
        return;
      }

      setIsGuest(false);
      loadNotifications();
    };

    checkGuestAndLoad();
  }, [loadNotifications]);

  const unreadCount = notifications.reduce(
    (count, item) =>
      count + (item.is_read === "1" || item.is_read === 1 ? 0 : 1),
    0,
  );

  const handleNotificationPress = async (notificationId, currentlyRead) => {
    if (!currentlyRead) {
      const success = await markNotificationRead(notificationId);
      if (success) {
        setNotifications((prev) =>
          prev.map((item) =>
            (item.id ?? item.notification_id ?? item._id) === notificationId
              ? { ...item, is_read: "1" }
              : item,
          ),
        );
      }
    }

    setExpandedId((prev) => (prev === notificationId ? null : notificationId));
  };

  const handleMarkAllRead = async () => {
    const success = await markAllNotificationsRead();
    if (success) {
      setNotifications((prev) =>
        prev.map((item) => ({
          ...item,
          is_read: "1",
        })),
      );
    }
  };

  const handleDeleteNotification = async (notificationId) => {
    try {
      const success = await deleteNotification(notificationId);
      if (success) {
        setNotifications((prev) =>
          prev.filter(
            (item) =>
              (item.id ?? item.notification_id ?? item._id) !== notificationId,
          ),
        );
        setDismissedAlerts((prev) => {
          const next = new Set(prev);
          next.add(notificationId);
          return next;
        });
        setError("");
      } else {
        setError("Unable to delete notification");
      }
    } catch (err) {
      setError(err.message || "Unable to delete notification");
    }
  };

  const handleDeleteAllNotifications = async () => {
    try {
      const success = await deleteAllNotifications();
      if (success) {
        setNotifications([]);
        setHasMore(false);
        setError("");
      }
    } catch (err) {
      setError(err.message || "Unable to delete all notifications");
    }
  };

  const dismissAlert = (id) => {
    handleDeleteNotification(id);
  };

  const visibleNotifications = notifications.filter(
    (n) => !dismissedAlerts.has(n.id ?? n.notification_id ?? n._id),
  );

  const handleSignIn = async () => {
    await AsyncStorage.removeItem("guestRole");
    setIsGuest(false);
    navigation.navigate("Auth");
  };

  if (isGuest) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
          backgroundColor: theme.background,
        }}
      >
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 36,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: theme.surfaceAlt,
          }}
        >
          <Ionicons
            name="notifications-outline"
            size={38}
            color={theme.primary}
          />
        </View>

        <Text
          style={{
            textAlign: "center",
            marginTop: 0,
            color: theme.textSecondary,
          }}
        >
          Sign in or create an account to view your notifications
        </Text>

        <TouchableOpacity
          style={{
            backgroundColor: theme.primary,
            paddingHorizontal: 30,
            paddingVertical: 14,
            borderRadius: 12,
            marginTop: 15,
          }}
          onPress={handleSignIn}
        >
          <Text
            style={{
              color: "#fff",
              fontFamily: typography.fonts.bold,
              fontWeight: typography.weights.bold,
            }}
          >
            Sign In / Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#f8fafc", "#eef2ff", "#fdf2f8"]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={refreshNotifications}
            tintColor="#6b21a8"
            colors={["#6b21a8"]}
          />
        }
      >
        <View style={styles.header}>
          <View style={styles.backButtonWrap}>
            <BackButton onPress={() => navigation.goBack()} />
          </View>

          <View style={styles.headerText}>
            <Text style={styles.heading} numberOfLines={1}>
              Notifications
            </Text>
            <Text style={styles.subHeading}>
              {unreadCount} unread · {visibleNotifications.length} total
            </Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity
              style={styles.iconButtonPurple}
              onPress={handleMarkAllRead}
            >
              <Ionicons name="checkmark-done-outline" size={22} color="#fff" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.iconButtonRed}
              onPress={handleDeleteAllNotifications}
            >
              <Ionicons name="trash-outline" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Ionicons
            name="information-circle-outline"
            size={18}
            color="#4338ca"
          />
          <Text style={styles.infoText}>
            Swipe left to delete a notification, or tap it to expand the
            message.
          </Text>
        </View>

        <View style={styles.card}>
          {loading ? (
            <View style={styles.emptyBox}>
              <PremiumLoader size={22} color="#6b21a8" showLabel={false} />
              <Text style={styles.emptyText}>Loading notifications…</Text>
            </View>
          ) : error ? (
            <View style={styles.emptyBox}>
              <Ionicons name="warning-outline" size={32} color="#f59e0b" />
              <Text style={styles.emptyText}>{error}</Text>
            </View>
          ) : visibleNotifications.length > 0 ? (
            <>
              {visibleNotifications.map((n) => {
                const itemId = n.id ?? n.notification_id ?? n._id;
                const title = n.title ?? n.subject ?? "Notification";
                const body = n.body ?? n.message ?? n.description ?? "";
                const timestamp =
                  n.created_at ?? n.timestamp ?? n.createdAt ?? "Just now";
                const isRead = n.is_read === "1" || n.is_read === 1;
                const isExpanded = expandedId === itemId;

                return (
                  <Swipeable
                    key={itemId}
                    renderRightActions={() => (
                      <RectButton
                        style={styles.swipeAction}
                        onPress={() => dismissAlert(itemId)}
                      >
                        <Ionicons name="trash-outline" size={20} color="#fff" />
                        <Text style={styles.swipeActionText}>Delete</Text>
                      </RectButton>
                    )}
                  >
                    <Pressable
                      style={[
                        styles.notificationItem,
                        isRead ? styles.readCard : styles.unreadCard,
                      ]}
                      onPress={() => handleNotificationPress(itemId, isRead)}
                    >
                      <View style={styles.row}>
                        <View style={styles.iconDot}>
                          <MaterialIcons
                            name="notifications"
                            size={18}
                            color="#fff"
                          />
                        </View>

                        <View style={styles.notificationContent}>
                          <Text style={styles.title}>{title}</Text>
                          <Text style={styles.actionHint}>
                            {isExpanded
                              ? "Tap to collapse"
                              : isRead
                                ? "Tap to view details"
                                : "Tap to mark read"}
                          </Text>
                          <Text style={styles.date}>{timestamp}</Text>

                          {isExpanded && body ? (
                            <View style={styles.expandedBodyWrap}>
                              <Text style={styles.bodyText}>{body}</Text>
                            </View>
                          ) : null}
                        </View>

                        {!isRead && <View style={styles.unreadDot} />}
                      </View>
                    </Pressable>
                  </Swipeable>
                );
              })}

              {hasMore ? (
                <TouchableOpacity
                  style={styles.loadMoreBtn}
                  onPress={loadMoreNotifications}
                  disabled={loadingMore}
                >
                  <Text style={styles.loadMoreText}>
                    {loadingMore ? "Loading..." : "Load more"}
                  </Text>
                </TouchableOpacity>
              ) : null}
            </>
          ) : (
            <View style={styles.emptyBox}>
              <Ionicons
                name="notifications-off-outline"
                size={50}
                color="#c7d2fe"
              />
              <Text style={styles.emptyText}>
                You have no notifications yet
              </Text>
              <Text style={styles.emptySubText}>
                Notifications will appear here as your boarding activity
                updates.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
