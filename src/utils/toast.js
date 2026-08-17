import React, { useEffect, useRef, useState } from "react";
import {
  Alert as RNAlert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

let activeItems = [];
let listeners = new Set();
let nextId = 0;

function publish(items) {
  listeners.forEach((listener) => listener(items));
}

function syncItems(nextItems) {
  activeItems = nextItems;
  publish(activeItems);
}

export function subscribeToToast(listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function showToast({ title, message, type = "info", duration = 2600 }) {
  const id = `toast-${++nextId}`;
  const item = {
    id,
    kind: "toast",
    title: title || "Notification",
    message: message || "",
    type,
    duration,
  };

  syncItems([...activeItems, item]);

  if (duration > 0) {
    setTimeout(() => removeToast(id), duration);
  }

  return id;
}

export function showConfirm({ title, message, buttons = [], type = "info" }) {
  const id = `confirm-${++nextId}`;
  const item = {
    id,
    kind: "confirm",
    title: title || "Confirm action",
    message: message || "",
    type,
    buttons,
  };

  syncItems([...activeItems, item]);
  return id;
}

export function removeToast(id) {
  syncItems(activeItems.filter((item) => item.id !== id));
}

function getTone(type) {
  switch (type) {
    case "success":
      return {
        gradient: ["#16a34a", "#10b981"],
        icon: "checkmark-circle-outline",
        iconBg: "rgba(255,255,255,0.2)",
      };
    case "error":
      return {
        gradient: ["#dc2626", "#f43f5e"],
        icon: "alert-circle-outline",
        iconBg: "rgba(255,255,255,0.2)",
      };
    case "warning":
      return {
        gradient: ["#d97706", "#f59e0b"],
        icon: "warning-outline",
        iconBg: "rgba(255,255,255,0.2)",
      };
    default:
      return {
        gradient: ["#6d28d9", "#8b5cf6"],
        icon: "information-circle-outline",
        iconBg: "rgba(255,255,255,0.2)",
      };
  }
}

function ToastCard({ item }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-16)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 220,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, translateY]);

  const tone = getTone(item.type);

  return (
    <Animated.View
      style={{
        opacity,
        transform: [{ translateY }],
        width: "100%",
      }}
    >
      <LinearGradient
        colors={tone.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.toastCard}
      >
        <View style={[styles.iconWrap, { backgroundColor: tone.iconBg }]}>
          <Ionicons name={tone.icon} size={20} color="#fff" />
        </View>

        <View style={styles.textWrap}>
          {item.title ? <Text style={styles.title}>{item.title}</Text> : null}
          {item.message ? (
            <Text style={styles.message}>{item.message}</Text>
          ) : null}
        </View>

        <TouchableOpacity
          onPress={() => removeToast(item.id)}
          style={styles.closeButton}
        >
          <Ionicons name="close" size={18} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );
}

function ConfirmCard({ item }) {
  const tone = getTone(item.type);

  return (
    <View style={styles.confirmContainer}>
      <LinearGradient
        colors={["#ffffff", "#f8fafc"]}
        style={styles.confirmCard}
      >
        <View style={[styles.iconWrap, { backgroundColor: tone.gradient[0] }]}>
          <Ionicons name={tone.icon} size={20} color="#fff" />
        </View>

        <View style={styles.textWrap}>
          <Text style={styles.confirmTitle}>{item.title}</Text>
          {item.message ? (
            <Text style={styles.confirmMessage}>{item.message}</Text>
          ) : null}
        </View>

        <View style={styles.buttonRow}>
          {item.buttons.filter(Boolean).map((button, index) => {
            const isCancel =
              button.style === "cancel" ||
              button.text?.toLowerCase() === "cancel";
            const isDestructive =
              button.style === "destructive" ||
              button.text?.toLowerCase() === "delete";
            return (
              <TouchableOpacity
                key={`${button.text || "action"}-${index}`}
                style={[
                  styles.actionButton,
                  isCancel ? styles.cancelButton : styles.primaryButton,
                  isDestructive ? styles.destructiveButton : null,
                ]}
                onPress={() => {
                  removeToast(item.id);
                  if (button.onPress) {
                    button.onPress();
                  }
                }}
              >
                <Text style={isCancel ? styles.cancelText : styles.primaryText}>
                  {button.text || "OK"}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradient>
    </View>
  );
}

export function ToastHost() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const unsubscribe = subscribeToToast((nextItems) => setItems(nextItems));
    return unsubscribe;
  }, []);

  const toastItems = items.filter((item) => item.kind !== "confirm");
  const confirmItems = items.filter((item) => item.kind === "confirm");
  const hasConfirm = confirmItems.length > 0;
  if (!items.length) {
    return null;
  }

  return (
    <View style={styles.host} pointerEvents={hasConfirm ? "auto" : "box-none"}>
      {items.length > 0 && (
        <BlurView intensity={25} tint="dark" style={styles.blurOverlay} />
      )}
      {toastItems.length > 0 ? (
        <View pointerEvents="box-none" style={styles.toastStack}>
          {toastItems.map((item) => (
            <ToastCard key={item.id} item={item} />
          ))}
        </View>
      ) : null}

      {confirmItems.map((item) => (
        <ConfirmCard key={item.id} item={item} />
      ))}
    </View>
  );
}

export function initializeToastAlertOverride() {
  if (RNAlert && typeof RNAlert.alert === "function") {
    RNAlert.alert = (title, message, buttons, options) => {
      const buttonList = Array.isArray(buttons) ? buttons : [];
      const hasConfirmButtons = buttonList.some((button) => {
        const label = button?.text?.toLowerCase?.() || "";
        return (
          button?.style === "cancel" || label === "cancel" || label === "delete"
        );
      });

      if (hasConfirmButtons && buttonList.length > 0) {
        showConfirm({
          title: typeof title === "string" ? title : "Confirm action",
          message: typeof message === "string" ? message : "",
          buttons: buttonList,
          type: options?.type || "info",
        });
        return;
      }

      showToast({
        title: typeof title === "string" ? title : "Notification",
        message: typeof message === "string" ? message : "",
        type: options?.type || "info",
      });
    };
  }
}

const styles = StyleSheet.create({
  host: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
  },
  blurOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  toastStack: {
    position: "absolute",
    top: 54,
    left: 16,
    right: 16,
    alignItems: "center",
    pointerEvents: "box-none",
  },
  toastCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    width: "100%",
    maxWidth: 520,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  textWrap: {
    flex: 1,
  },
  title: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "700",
  },
  message: {
    color: "rgba(255,255,255,0.92)",
    fontSize: 13,
    marginTop: 2,
  },
  closeButton: {
    padding: 4,
    marginLeft: 6,
  },
  confirmContainer: {
    position: "absolute",
    top: "50%",
    width: "90%",
    maxWidth: 520,
    alignSelf: "center",
    transform: [{ translateY: -120 }],
  },
  confirmCard: {
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: "#e2e8f0",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  confirmTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 4,
  },
  confirmMessage: {
    fontSize: 13,
    color: "#4b5563",
    lineHeight: 18,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 14,
    gap: 8,
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
  },
  cancelButton: {
    backgroundColor: "#f3f4f6",
  },
  primaryButton: {
    backgroundColor: "#6d28d9",
  },
  destructiveButton: {
    backgroundColor: "#dc2626",
  },
  cancelText: {
    color: "#374151",
    fontWeight: "600",
  },
  primaryText: {
    color: "#fff",
    fontWeight: "600",
  },
});
