import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
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

const PAGE_SIZE = 20;

export default function NotificationScreen() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
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
      const items = await fetchNotificationsFromApi({ limit: PAGE_SIZE, offset: 0 });
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
      const items = await fetchNotificationsFromApi({ limit: PAGE_SIZE, offset: 0 });
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
    loadNotifications();
  }, [loadNotifications]);

  const unreadCount = notifications.reduce(
    (count, item) => count + ((item.is_read === "1" || item.is_read === 1) ? 0 : 1),
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
          <View>
            <Text style={styles.heading}>Notifications</Text>
            <Text style={styles.subHeading}>
              {unreadCount} unread · {visibleNotifications.length} total
            </Text>
          </View>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.markAllBtn} onPress={handleMarkAllRead}>
              <Text style={styles.markAllText}>Mark all read</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteAllBtn}
              onPress={handleDeleteAllNotifications}
            >
              <Text style={styles.deleteAllText}>Delete all</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.infoCard}>
          <Ionicons name="information-circle-outline" size={18} color="#4338ca" />
          <Text style={styles.infoText}>
            Swipe left to delete a notification, or tap it to expand the message.
          </Text>
        </View>

        <View style={styles.card}>
          {loading ? (
            <View style={styles.emptyBox}>
              <ActivityIndicator size="small" color="#6b21a8" />
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
                          <MaterialIcons name="notifications" size={18} color="#fff" />
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
              <Ionicons name="notifications-off-outline" size={50} color="#c7d2fe" />
              <Text style={styles.emptyText}>You have no notifications yet</Text>
              <Text style={styles.emptySubText}>
                Notifications will appear here as your boarding activity updates.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  scroll: {
    padding: 18,
    paddingBottom: 32,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 16,
  },

  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },

  subHeading: {
    fontSize: 14,
    color: "#6b7280",
    marginTop: 4,
  },

  markAllBtn: {
    backgroundColor: "#6b21a8",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  deleteAllBtn: {
    backgroundColor: "#ef4444",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },

  markAllText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 13,
  },

  deleteAllText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 13,
  },

  infoCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#eef2ff",
    borderRadius: 18,
    padding: 14,
    marginBottom: 16,
  },

  infoText: {
    marginLeft: 10,
    color: "#4338ca",
    fontSize: 14,
    lineHeight: 20,
    flex: 1,
  },

  card: {
    gap: 12,
  },

  notificationItem: {
    borderRadius: 18,
    padding: 18,
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 14,
    elevation: 4,
  },

  unreadCard: {
    borderWidth: 1,
    borderColor: "#c7d2fe",
  },

  readCard: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconDot: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#6366f1",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },

  notificationContent: {
    flex: 1,
  },

  title: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  date: {
    color: "#6b7280",
    fontSize: 13,
    marginTop: 6,
  },

  expandedBodyWrap: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },

  bodyText: {
    color: "#111827",
    fontSize: 14,
    lineHeight: 20,
  },

  loadMoreBtn: {
    alignSelf: "center",
    backgroundColor: "#ede9fe",
    borderRadius: 999,
    paddingHorizontal: 18,
    paddingVertical: 10,
    marginTop: 4,
  },

  loadMoreText: {
    color: "#6b21a8",
    fontWeight: "700",
    fontSize: 13,
  },

  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: "#6b21a8",
    marginLeft: 10,
  },

  actionHint: {
    color: "#6b7280",
    fontSize: 12,
    marginTop: 4,
  },

  swipeAction: {
    width: 96,
    backgroundColor: "#dc2626",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
  },

  swipeActionText: {
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "700",
    marginTop: 6,
  },

  emptyBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },

  emptyText: {
    marginTop: 14,
    color: "#111827",
    fontSize: 16,
    fontWeight: "600",
  },

  emptySubText: {
    marginTop: 10,
    color: "#6b7280",
    fontSize: 14,
    textAlign: "center",
    maxWidth: 260,
    lineHeight: 20,
  },
});
