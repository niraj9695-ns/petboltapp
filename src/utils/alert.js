import { showConfirm, showToast } from "./toast";

function inferType(title, buttons = []) {
  const normalizedTitle = String(title || "").toLowerCase();
  const hasDestructiveAction = buttons.some(
    (button) =>
      button?.style === "destructive" ||
      /delete|remove|cancel|reject|logout/.test(
        String(button?.text || "").toLowerCase(),
      ),
  );

  if (/success|updated|created|verified|successful/.test(normalizedTitle)) {
    return "success";
  }
  if (/error|failed|invalid|unavailable|unable/.test(normalizedTitle)) {
    return "error";
  }
  if (/warning|missing|validation|incomplete|required/.test(normalizedTitle)) {
    return "warning";
  }
  return hasDestructiveAction ? "confirmation" : "info";
}

function normalizeMessage(message, type) {
  if (typeof message !== "string") {
    return type === "error"
      ? "Something went wrong. Please try again."
      : "Please try again.";
  }

  const trimmedMessage = message.trim();
  if (
    type === "error" &&
    (!trimmedMessage ||
      /axioserror|network error|internal server error|\[object object\]|undefined|null/i.test(
        trimmedMessage,
      ))
  ) {
    return "Something went wrong. Please try again.";
  }

  return trimmedMessage;
}

export const appAlert = {
  alert(title, message, buttons = [], options = {}) {
    const buttonList = Array.isArray(buttons) ? buttons.filter(Boolean) : [];
    const type = options.type || inferType(title, buttonList);
    const normalizedMessage = normalizeMessage(message, type);

    if (buttonList.length > 0) {
      return showConfirm({
        title: typeof title === "string" ? title : "Confirm action",
        message: normalizedMessage,
        buttons: buttonList,
        type,
      });
    }

    return showToast({
      title: typeof title === "string" ? title : "Notification",
      message: normalizedMessage,
      type,
    });
  },
};

export function showAlert({
  type = "info",
  title = "Notification",
  message = "",
  buttonText,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  duration = 2600,
}) {
  if (type === "confirmation" || onConfirm || onCancel) {
    return showConfirm({
      title,
      message: normalizeMessage(message, type),
      type,
      buttons: [
        { text: cancelText, style: "cancel", onPress: onCancel },
        { text: buttonText || confirmText, onPress: onConfirm },
      ],
    });
  }

  return showToast({
    title,
    message: normalizeMessage(message, type),
    type,
    duration,
  });
}
