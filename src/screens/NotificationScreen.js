import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

export default function NotificationScreen() {
  const [expandedNotification, setExpandedNotification] = useState(null);
  const [dismissedAlerts, setDismissedAlerts] = useState(new Set());

  const toggleNotification = (id) => {
    setExpandedNotification((prev) => (prev === id ? null : id));
  };

  const dismissAlert = (id) => {
    setDismissedAlerts((prev) => new Set(prev).add(id));
  };

  const notifications = [
    {
      id: 1,
      title: "Booking Confirmed!",
      message:
        "Your booking for Max is confirmed. Pickup scheduled for today at 10:00 AM.",
      timestamp: "2 hours ago",
      color: "#22c55e",
      bg: ["#ecfdf5", "#d1fae5"],
    },
    {
      id: 2,
      title: "Pickup Reminder",
      message: "Reminder: Pick up Max tomorrow at 4:00 PM.",
      timestamp: "1 hour ago",
      color: "#3b82f6",
      bg: ["#eff6ff", "#dbeafe"],
    },
    {
      id: 3,
      title: "Max is Having Fun!",
      message:
        "Max is playing and enjoying playtime with other dogs. Check updates!",
      timestamp: "30 minutes ago",
      color: "#a855f7",
      bg: ["#faf5ff", "#ede9fe"],
    },
  ];

  const visibleNotifications = notifications.filter(
    (n) => !dismissedAlerts.has(n.id),
  );

  return (
    <LinearGradient
      colors={["#f8fafc", "#eef2ff", "#fdf2f8"]}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* HEADER */}
        <Text style={styles.heading}>Notifications</Text>
        <Text style={styles.subHeading}>
          Stay updated with your pet activities
        </Text>

        {/* LIST */}
        <View style={styles.card}>
          {visibleNotifications.length > 0 ? (
            visibleNotifications.map((n) => {
              const isExpanded = expandedNotification === n.id;

              return (
                <Pressable
                  key={n.id}
                  style={styles.notificationItem}
                  onPress={() => toggleNotification(n.id)}
                >
                  <View style={styles.row}>
                    <View
                      style={[
                        styles.iconContainer,
                        { backgroundColor: `${n.color}15` },
                      ]}
                    >
                      <Ionicons
                        name="notifications-outline"
                        size={20}
                        color={n.color}
                      />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={styles.title}>{n.title}</Text>

                      <Text
                        style={styles.desc}
                        numberOfLines={isExpanded ? undefined : 2}
                      >
                        {n.message}
                      </Text>

                      <Text style={styles.date}>{n.timestamp}</Text>
                    </View>

                    <TouchableOpacity onPress={() => dismissAlert(n.id)}>
                      <Ionicons name="close" size={20} color="#9ca3af" />
                    </TouchableOpacity>
                  </View>

                  {isExpanded && (
                    <View style={styles.expandedContent}>
                      <TouchableOpacity style={styles.actionBtn}>
                        <Text style={styles.actionText}>View Details</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </Pressable>
              );
            })
          ) : (
            <View style={styles.emptyBox}>
              <Ionicons
                name="notifications-off-outline"
                size={50}
                color="#d1d5db"
              />
              <Text style={styles.emptyText}>No notifications available</Text>
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
    backgroundColor: "#f8fafc",
  },

  scroll: {
    padding: 16,
  },

  heading: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },

  subHeading: {
    color: "#6b7280",
    marginTop: 4,
    marginBottom: 20,
  },

  card: {
    gap: 12,
  },

  notificationItem: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,

    elevation: 3,
  },

  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },

  desc: {
    fontSize: 13,
    color: "#6b7280",
    marginTop: 4,
    lineHeight: 18,
  },

  date: {
    fontSize: 12,
    color: "#9ca3af",
    marginTop: 8,
  },

  expandedContent: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#f1f5f9",
  },

  actionBtn: {
    backgroundColor: "#2563eb",
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },

  actionText: {
    color: "#fff",
    fontWeight: "600",
  },

  emptyBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
  },

  emptyText: {
    marginTop: 12,
    color: "#9ca3af",
    fontSize: 14,
  },
});
