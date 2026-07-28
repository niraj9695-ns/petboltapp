import React, { useEffect, useMemo, useState } from "react";
import RazorpayCheckout from "react-native-razorpay";
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/BoardingPaymentStyles";

export default function BoardingPaymentScreen({ route, navigation }) {
  const {
    booking,
    bookingId,
    centerName,
    petName,
    totalAmount = 0,
  } = route.params || {};

  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem("token");
      setToken(storedToken);
    };

    loadToken();
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }

    const resolvedBookingId = resolveBookingId();
    if (resolvedBookingId) {
      handlePay();
    }
  }, [token]);

  const priceSummary = useMemo(() => {
    const amount = Number(totalAmount || booking?.total_price || 0);

    return {
      total: Number(amount.toFixed(2)),
    };
  }, [totalAmount, booking]);

  const resolveBookingId = () => {
    return [
      bookingId,
      booking?.id,
      booking?.booking_id,
      booking?.bookingId,
      booking?.data?.id,
      booking?.data?.booking_id,
      booking?.data?.bookingId,
      route?.params?.bookingId,
    ].find((value) => value !== undefined && value !== null && value !== "");
  };

  const handlePay = async () => {
    if (!token) {
      Alert.alert(
        "Sign in required",
        "Please sign in to continue with payment.",
      );
      return;
    }

    const resolvedBookingId = resolveBookingId();

    if (!resolvedBookingId) {
      Alert.alert(
        "Booking missing",
        "The booking reference could not be found. Please go back and try creating the booking again.",
      );
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("booking_id", String(resolvedBookingId));

      const initiateResponse = await fetch(
        "https://www.cgpisoftware.com/cheerytail/api/payments/initiate",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: formData,
        },
      );

      const responseText = await initiateResponse.text();
      let data = null;

      try {
        data = responseText ? JSON.parse(responseText) : null;
      } catch (error) {}

      if (!(initiateResponse.ok && data?.status === "success")) {
        const errorMessage =
          data?.message ||
          responseText ||
          "Unable to process payment right now.";
        Alert.alert("Payment failed", errorMessage);
        return;
      }

      const paymentData = data?.data;

      const options = {
        description: `Booking Payment - ${petName || "Pet Boarding"}`,
        currency: "INR",
        key: paymentData.razorpay_key_id,
        amount:
          Number(
            paymentData.advance_amount ||
              paymentData.amount ||
              priceSummary.total,
          ) * 100,
        order_id: paymentData.razorpay_order_id,
        name: centerName || "CheeryTail",
        prefill: {},
        theme: {
          color: "#7c3aed",
        },
      };

      try {
        const razorpayResult = await RazorpayCheckout.open(options);

        const verifyFormData = new FormData();
        verifyFormData.append("payment_id", String(paymentData.payment_id));
        verifyFormData.append(
          "razorpay_payment_id",
          razorpayResult.razorpay_payment_id,
        );
        verifyFormData.append(
          "razorpay_order_id",
          razorpayResult.razorpay_order_id,
        );
        verifyFormData.append(
          "razorpay_signature",
          razorpayResult.razorpay_signature,
        );

        const verifyResponse = await fetch(
          "https://www.cgpisoftware.com/cheerytail/api/payments/verify",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
            body: verifyFormData,
          },
        );

        const verifyData = await verifyResponse.json();

        if (verifyResponse.ok && verifyData?.status === "success") {
          Alert.alert(
            "Payment Successful",
            "Your booking has been confirmed.",
            [
              {
                text: "Continue",
                onPress: () => navigation.navigate("BookingStatus"),
              },
            ],
          );
        } else {
          Alert.alert(
            "Verification Failed",
            verifyData?.message || "Payment verification failed.",
          );
        }
      } catch (error) {
        Alert.alert(
          "Payment Cancelled",
          error?.description || "User cancelled payment.",
        );
      }
    } catch (error) {
      Alert.alert("Payment failed", "Unable to process payment right now.");
    } finally {
      setLoading(false);
    }
  };

  if (!booking && !bookingId) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#7c3aed" />
      </View>
    );
  }

  return (
    <LinearGradient colors={["#f8f5ff", "#fdf2f8"]} style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.heroCard}>
          <View style={styles.heroBadge}>
            <Text style={styles.heroBadgeText}>Secure payment</Text>
          </View>
          <Text style={styles.centerName}>{centerName || "Boarding stay"}</Text>
          <Text style={styles.heroSubtitle}>
            {petName
              ? `Payment for ${petName}`
              : "Complete your booking confirmation with a safe, stylish checkout."}
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Booking summary</Text>
          <View style={styles.priceCard}>
            <View style={styles.priceRow}>
              <Text style={styles.priceTotal}>Total Amount</Text>
              <Text style={styles.priceTotal}>₹{priceSummary.total}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.helperText}>
            Your booking will be confirmed through the backend payment flow. The
            checkout will open in Razorpay directly after the booking is
            confirmed.
          </Text>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.secondaryButtonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.primaryButton} onPress={handlePay}>
              <LinearGradient
                colors={["#7c3aed", "#ec4899"]}
                style={styles.primaryButton}
              >
                {loading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Continue to Razorpay</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
