import { appAlert } from "../../../utils/alert";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import PremiumLoader from "../../../components/PremiumLoader";
import BackButton from "../../../components/BackButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import { LinearGradient } from "expo-linear-gradient";
import { Calendar } from "react-native-calendars";
import styles from "../styles/BoardingBookingStyles";
import RazorpayCheckout from "react-native-razorpay";
import { typography } from "../../../styles/theme/typography";

import {
  fetchBookedDatesApi,
  fetchPricingApi,
  createAndPayBookingApi,
  createBookingApi,
  payWithCashApi,
  verifyPaymentApi,
} from "../services/boardingService";
import { fetchPetsApi } from "../../pets/services/petService";

export default function BoardingBookingScreen({ route, navigation }) {
  const { centerId, centerName, pricePerDay } = route.params;

  // Back should prefer going to the boarding details for this center
  // if no navigator back is available.

  const [pets, setPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(null);
  const [token, setToken] = useState(null);

  const [checkInDate, setCheckInDate] = useState(new Date());

  const [checkOutDate, setCheckOutDate] = useState(new Date());

  const [bookedDates, setBookedDates] = useState([]);
  const [fetchingBookedDates, setFetchingBookedDates] = useState(false);

  const [pickerMode, setPickerMode] = useState("checkin");

  const [bookingLoading, setBookingLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("online");

  const [specialInstructions, setSpecialInstructions] = useState("");
  const [pricingData, setPricingData] = useState(null);
  const [pricingLoading, setPricingLoading] = useState(false);
  const [pricingError, setPricingError] = useState("");

  useEffect(() => {
    const checkGuestAndLoad = async () => {
      const guestRole = await AsyncStorage.getItem("guestRole");
      const storedToken = await AsyncStorage.getItem("token");
      setToken(storedToken);

      if (guestRole) {
        appAlert.alert(
          "Sign in required",
          "Please sign in or create an account to continue booking.",
          [
            {
              text: "Cancel",
              style: "cancel",
              onPress: () => navigation.goBack(),
            },
            {
              text: "Sign In / Sign Up",
              onPress: () => navigation.navigate("Auth"),
            },
          ],
        );
        return;
      }

      loadPets();
    };

    checkGuestAndLoad();
  }, []);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const formatCurrency = (value) => {
    if (value === null || value === undefined || value === "") return "-";
    const n = Number(value);
    if (Number.isNaN(n)) return String(value);
    return `\u20B9${n.toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
  };

  const normalizeBookedDates = (dates) => {
    let rawDates = [];

    if (Array.isArray(dates)) {
      rawDates = dates;
    } else if (dates && Array.isArray(dates.data)) {
      rawDates = dates.data;
    } else if (dates && Array.isArray(dates.booked_dates)) {
      rawDates = dates.booked_dates;
    }

    return rawDates
      .map((date) => {
        if (typeof date === "string") return date;
        if (date && typeof date === "object")
          return date.date || date.booked_date || "";
        return "";
      })
      .filter(Boolean);
  };

  const getDatesBetween = (startDate, endDate) => {
    const dates = [];
    const current = new Date(startDate);

    while (current <= endDate) {
      dates.push(formatDate(current));
      current.setDate(current.getDate() + 1);
    }

    return dates;
  };

  const hasBookedDateInRange = (startDate, endDate) => {
    const range = getDatesBetween(startDate, endDate);
    return range.some((date) => bookedDates.includes(date));
  };

  const getMarkedDates = () => {
    const marked = {};

    bookedDates.forEach((date) => {
      marked[date] = {
        disabled: true,
        disableTouchEvent: true,
        startingDay: true,
        endingDay: true,
        color: "#fee2e2",
        textColor: "#991b1b",
      };
    });

    const selectedRange = getDatesBetween(checkInDate, checkOutDate);
    selectedRange.forEach((date) => {
      if (marked[date]?.disabled) {
        return;
      }

      const isStart = date === formatDate(checkInDate);
      const isEnd = date === formatDate(checkOutDate);

      marked[date] = {
        ...(marked[date] || {}),
        disabled: false,
        disableTouchEvent: false,
        startingDay: isStart,
        endingDay: isEnd,
        color: isStart || isEnd ? "#6b21a8" : "#e9d5ff",
        textColor: isStart || isEnd ? "#ffffff" : "#111827",
      };
    });

    return marked;
  };

  const loadBookedDatesForMonth = async (date) => {
    if (!centerId || !date) return;

    try {
      setFetchingBookedDates(true);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const data = await fetchBookedDatesApi(centerId, year, month);
      const dates = normalizeBookedDates(data);

      setBookedDates(dates);
    } catch (error) {
      setBookedDates([]);
    } finally {
      setFetchingBookedDates(false);
    }
  };

  const isDateBooked = async (date) => {
    const isoDate = formatDate(date);
    if (bookedDates.includes(isoDate)) {
      return true;
    }

    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const loadedMonth = checkInDate.getMonth() + 1;
    const loadedYear = checkInDate.getFullYear();

    if (month !== loadedMonth || year !== loadedYear) {
      const data = await fetchBookedDatesApi(centerId, year, month);
      const normalized = normalizeBookedDates(data);
      if (normalized.includes(isoDate)) {
        return true;
      }

      if (year === loadedYear && month === loadedMonth) {
        setBookedDates(normalized);
      }
    }

    return false;
  };

  useEffect(() => {
    loadBookedDatesForMonth(checkInDate);
  }, [centerId, checkInDate.getFullYear(), checkInDate.getMonth()]);

  const startDateValue = formatDate(checkInDate);
  const endDateValue = formatDate(checkOutDate);

  useEffect(() => {
    if (!selectedPetId || !centerId || !token) return;

    fetchPricingDetails();
  }, [selectedPetId, centerId, token, startDateValue, endDateValue]);

  const totalDays = Math.max(
    1,
    Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)),
  );

  const pricingPayload =
    pricingData &&
    typeof pricingData === "object" &&
    "data" in pricingData &&
    pricingData.data
      ? pricingData.data
      : pricingData;

  const resolvedPricePerDay = Number(
    pricingPayload?.price_per_day ??
      pricingPayload?.daily_price ??
      pricingPayload?.amount_per_day ??
      pricePerDay ??
      0,
  );

  const resolvedTotalDays = Number(
    pricingPayload?.total_days ?? pricingPayload?.days ?? totalDays ?? 1,
  );

  const resolvedTotalPrice = Number(
    pricingPayload?.total_price ??
      pricingPayload?.final_amount ??
      pricingPayload?.amount ??
      resolvedTotalDays * resolvedPricePerDay,
  );

  const totalCost = resolvedTotalPrice || totalDays * Number(pricePerDay || 0);

  const fetchPricingDetails = async () => {
    try {
      setPricingLoading(true);
      setPricingError("");

      const data = await fetchPricingApi({
        centerId,
        petId: selectedPetId,
        startDate: startDateValue,
        endDate: endDateValue,
        token,
      });

      setPricingData(data);
    } catch (error) {
      setPricingData(null);
      setPricingError("Unable to load pricing for selected dates.");
    } finally {
      setPricingLoading(false);
    }
  };

  const loadPets = async () => {
    try {
      const result = await fetchPetsApi(1, 20);
      const petList = Array.isArray(result?.pets) ? result.pets : [];

      setPets(petList);

      if (petList.length > 0) {
        setSelectedPetId(petList[0].pet_id || petList[0].id);
      }
    } catch (error) {}
  };

  const handleDateSelection = async (date) => {
    if (!date) return;

    if (await isDateBooked(date)) {
      appAlert.alert(
        "Unavailable",
        `${formatDate(date)} is already booked. Please select another date.`,
      );
      return;
    }

    if (pickerMode === "checkin") {
      setCheckInDate(date);
      if (date >= checkOutDate) {
        const sameDay = new Date(date);
        setCheckOutDate(sameDay);
      }
      return;
    }

    if (date < checkInDate) {
      appAlert.alert(
        "Invalid Dates",
        "End date must be on or after the start date",
      );
      return;
    }

    if (hasBookedDateInRange(checkInDate, date)) {
      appAlert.alert(
        "Unavailable range",
        "The selected stay overlaps unavailable dates. Please choose a different range.",
      );
      return;
    }

    setCheckOutDate(date);
  };

  const navigateToHome = () => {
    let ancestor = navigation;

    while (ancestor?.getParent) {
      ancestor = ancestor.getParent();
      const routeNames = ancestor?.getState?.()?.routeNames;

      if (routeNames?.includes("Home")) {
        ancestor.navigate("Home");
        return;
      }

      if (routeNames?.includes("Main")) {
        ancestor.navigate("Main", { screen: "Home" });
        return;
      }
    }

    navigation.navigate("Home");
  };

  const createBooking = async () => {
    try {
      if (!selectedPetId) {
        appAlert.alert("Error", "Please select a pet");
        return;
      }

      const token = await AsyncStorage.getItem("token");

      setBookingLoading(true);

      if (paymentMethod === "cash") {
        const bookingResponse = await createBookingApi({
          token,
          petId: selectedPetId,
          centerId,
          startDate: formatDate(checkInDate),
          endDate: formatDate(checkOutDate),
          specialInstructions,
        });

        if (
          bookingResponse?.status !== "success" &&
          bookingResponse?.status !== true
        ) {
          appAlert.alert(
            "Booking Failed",
            bookingResponse?.message || "Unable to create booking",
          );
          return;
        }

        const bookingData = bookingResponse?.data || {};
        const bookingId =
          bookingData?.booking_id || bookingData?.booking?.id || bookingData?.id;

        if (!bookingId) {
          appAlert.alert("Payment Error", "The booking ID was not returned.");
          return;
        }

        const cashResponse = await payWithCashApi({
          token,
          bookingId,
          paymentMethod: "cash",
          notes: "Cash collected at counter",
        });

        if (cashResponse?.status === "success" || cashResponse?.status === true) {
          appAlert.alert("Payment Successful", "Booking confirmed", [
            { text: "OK", onPress: navigateToHome },
          ]);
        } else {
          appAlert.alert(
            "Cash Payment Failed",
            cashResponse?.message || "Unable to process cash payment",
          );
        }
        return;
      }

      const data = await createAndPayBookingApi({
        token,
        petId: selectedPetId,
        centerId,
        startDate: formatDate(checkInDate),
        endDate: formatDate(checkOutDate),
        specialInstructions,
      });

      if (data?.status !== "success" && data?.status !== true) {
        appAlert.alert(
          "Booking Failed",
          data?.message || "Unable to create booking",
        );
        return;
      }

      const bookingData = data?.data || {};
      const paymentData = bookingData?.payment || {};

      const options = {
        description: "Pet Boarding Booking",
        currency: "INR",
        key: paymentData.razorpay_key_id,
        amount: Number(paymentData.total_amount || totalCost) * 100,
        order_id: paymentData.razorpay_order_id,
        name: centerName || "CheeryTail",
        theme: {
          color: "#7c3aed",
        },
      };

      const razorpayResult = await RazorpayCheckout.open(options);

      const verifyData = await verifyPaymentApi({
        token,
        paymentId: paymentData.payment_id,
        razorpayPaymentId: razorpayResult.razorpay_payment_id,
        razorpayOrderId: razorpayResult.razorpay_order_id,
        razorpaySignature: razorpayResult.razorpay_signature,
      });
      if (verifyData?.status === "success" || verifyData?.status === true) {
        appAlert.alert("Payment Successful", "Booking confirmed", [
          {
            text: "OK",
            onPress: navigateToHome,
          },
        ]);
      } else {
        appAlert.alert(
          "Verification Failed",
          verifyData?.message || "Payment verification failed",
        );
      }
    } catch (error) {
      appAlert.alert(
        "Payment Error",
        `${error?.description || JSON.stringify(error)}`,
      );

      appAlert.alert("Payment Error", JSON.stringify(error, null, 2));
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#faf5ff", "#fdf2f8", "#fff7ed"]}
      style={styles.bookingScreenContainer}
    >
      <ScrollView contentContainerStyle={styles.bookingScreenContent}>
        <View
          style={[styles.bookingScreenCard, styles.bookingScreenHeaderCard]}
        >
          <View style={styles.bookingScreenBackButton}>
            <BackButton />
          </View>

          <Text
            style={styles.bookingScreenCenterName}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {centerName}
          </Text>

          <View style={styles.bookingScreenHeaderSpacer} />
        </View>
        <View style={styles.bookingScreenCard}>
          <Text style={styles.bookingScreenHeading}>Select Pet</Text>

          <View style={styles.bookingScreenInputWrapper}>
            <Picker
              selectedValue={selectedPetId}
              onValueChange={(value) => setSelectedPetId(value)}
              style={styles.bookingScreenPicker}
            >
              {pets.map((pet, index) => (
                <Picker.Item
                  key={pet.pet_id || pet.id || index}
                  label={pet.pet_name || pet.name || "Pet"}
                  value={pet.pet_id || pet.id}
                />
              ))}
            </Picker>
          </View>
        </View>

        <View style={styles.bookingScreenCard}>
          <Text style={styles.bookingScreenHeading}>Booking Dates</Text>

          <View style={styles.bookingScreenDateRow}>
            <TouchableOpacity
              style={[
                styles.bookingScreenDatePill,
                pickerMode === "checkin" && styles.bookingScreenActivePill,
              ]}
              onPress={() => setPickerMode("checkin")}
            >
              <Text
                style={[
                  styles.bookingScreenDateLabel,
                  pickerMode === "checkin" &&
                    styles.bookingScreenActivePillText,
                ]}
              >
                Check In
              </Text>
              <Text
                style={[
                  styles.bookingScreenDateValue,
                  pickerMode === "checkin" &&
                    styles.bookingScreenActivePillText,
                ]}
              >
                {checkInDate.toDateString()}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.bookingScreenDatePill,
                pickerMode === "checkout" && styles.bookingScreenActivePill,
              ]}
              onPress={() => setPickerMode("checkout")}
            >
              <Text
                style={[
                  styles.bookingScreenDateLabel,
                  pickerMode === "checkout" &&
                    styles.bookingScreenActivePillText,
                ]}
              >
                Check Out
              </Text>
              <Text
                style={[
                  styles.bookingScreenDateValue,
                  pickerMode === "checkout" &&
                    styles.bookingScreenActivePillText,
                ]}
              >
                {checkOutDate.toDateString()}
              </Text>
            </TouchableOpacity>
          </View>

          <Calendar
            current={formatDate(checkInDate)}
            minDate={formatDate(new Date())}
            markingType="period"
            markedDates={getMarkedDates()}
            disableAllTouchEventsForDisabledDays={true}
            onDayPress={(day) => handleDateSelection(new Date(day.dateString))}
            onMonthChange={({ dateString }) => {
              const [year, month] = dateString.split("-").map(Number);
              loadBookedDatesForMonth(new Date(year, month - 1, 1));
            }}
            theme={{
              todayTextColor: "#10b981",
              arrowColor: "#6b21a8",
              disabledArrowColor: "#d1d5db",
            }}
            style={styles.calendarWrapper}
          />

          <View style={styles.bookingScreenLegendRow}>
            <View
              style={[
                styles.bookingScreenMarkerBadge,
                { backgroundColor: "#fee2e2" },
              ]}
            />
            <Text style={styles.bookingScreenMarkerText}>
              Booked / unavailable dates
            </Text>
          </View>
          <View style={styles.bookingScreenLegendRow}>
            <View
              style={[
                styles.bookingScreenMarkerBadge,
                { backgroundColor: "#6b21a8" },
              ]}
            />
            <Text style={styles.bookingScreenMarkerText}>
              Selected stay range
            </Text>
          </View>

          {fetchingBookedDates ? (
            <PremiumLoader
              size={24}
              color="#6b21a8"
              showLabel={false}
              style={styles.smallLoader}
            />
          ) : bookedDates.length > 0 ? (
            <Text style={styles.warningText}>
              {bookedDates.length} unavailable date(s) in this month.
            </Text>
          ) : (
            <Text style={styles.statusNote}>
              No unavailable dates found for the selected month.
            </Text>
          )}
        </View>

        <View style={styles.bookingScreenCard}>
          <Text style={styles.bookingScreenHeading}>Special Instructions</Text>

          <TextInput
            placeholder="Please feed twice daily..."
            value={specialInstructions}
            onChangeText={setSpecialInstructions}
            multiline
            style={styles.bookingScreenInput}
          />
        </View>

        {/* Pricing summary fetched from API */}
        <View style={styles.pricingCard}>
          {pricingLoading ? (
            <PremiumLoader size={24} color="#6b21a8" showLabel={false} />
          ) : pricingError ? (
            <Text style={styles.warningText}>{pricingError}</Text>
          ) : pricingPayload ? (
            <>
              <View style={styles.pricingRow}>
                <Text style={styles.pricingLabel}>Dates</Text>
                <Text style={styles.pricingValue}>
                  {pricingPayload.start_date} - {pricingPayload.end_date} (
                  {pricingPayload.total_days} days)
                </Text>
              </View>

              <View style={styles.pricingRow}>
                <Text style={styles.pricingLabel}>Price / day</Text>
                <Text style={styles.pricingValue}>
                  {formatCurrency(pricingPayload.price_per_day)}
                </Text>
              </View>

              <View style={styles.pricingRow}>
                <Text style={styles.pricingLabel}>Price without discount</Text>
                <Text style={styles.pricingValue}>
                  {formatCurrency(pricingPayload.price_without_discount)}
                </Text>
              </View>

              <View style={styles.pricingRow}>
                <Text style={styles.pricingLabel}>Discount</Text>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={styles.discountBadge}>
                    <Text
                      style={{
                        fontFamily: typography.fonts.bold,
                        fontWeight: typography.weights.bold,
                        color: "#92400e",
                      }}
                    >
                      {pricingPayload.discount_type === "percentage"
                        ? `${pricingPayload.discount_value}%`
                        : `Flat ${formatCurrency(pricingPayload.discount_value)}`}
                    </Text>
                  </View>
                  <Text style={[styles.pricingValue, { marginLeft: 12 }]}>
                    - {formatCurrency(pricingPayload.discount_amount)}
                  </Text>
                </View>
              </View>

              <View style={[styles.pricingRow, { marginTop: 8 }]}>
                <Text style={styles.pricingLabel}>Total</Text>
                <Text style={styles.pricingTotal}>
                  {formatCurrency(pricingPayload.total_price)}
                </Text>
              </View>

              <View style={[styles.pricingRow, { marginTop: 10 }]}>
                <Text style={styles.pricingLabel}>Availability</Text>
                <View style={styles.availabilityPill}>
                  <Text
                    style={{
                      color: pricingPayload.is_available
                        ? "#365314"
                        : "#7f1d1d",
                      fontFamily: typography.fonts.bold,
                      fontWeight: typography.weights.bold,
                    }}
                  >
                    {pricingPayload.is_available ? "Available" : "Unavailable"}
                  </Text>
                </View>
              </View>

              {pricingPayload.applied_discount_tier && (
                <View style={{ marginTop: 10 }}>
                  <Text style={styles.pricingLabel}>Applied Discount Tier</Text>
                  <Text style={styles.pricingValue}>
                    {pricingPayload.applied_discount_tier.discount_type} |
                    {pricingPayload.applied_discount_tier.discount_value} (min
                    {pricingPayload.applied_discount_tier.min_days} days)
                  </Text>
                </View>
              )}
            </>
          ) : (
            <Text style={styles.statusNote}>
              Pricing not available for selected options.
            </Text>
          )}
        </View>

        <View style={styles.bookingScreenCard}>
          <Text style={styles.bookingScreenHeading}>Payment Method</Text>
          <View style={styles.bookingScreenInputWrapper}>
            <Picker
              selectedValue={paymentMethod}
              onValueChange={setPaymentMethod}
              style={styles.bookingScreenPicker}
            >
              <Picker.Item label="Online payment (Razorpay)" value="online" />
              <Picker.Item label="Cash" value="cash" />
            </Picker>
          </View>
          {paymentMethod === "cash" && (
            <Text style={styles.statusNote}>
              Cash payment confirms the booking instantly after the request is accepted.
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.bookingScreenBookBtn}
          onPress={createBooking}
          disabled={bookingLoading}
        >
          <Text style={styles.bookingScreenBtnText}>
            {bookingLoading
              ? "Processing..."
              : paymentMethod === "cash"
                ? "Confirm with Cash"
                : "Continue to Payment"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}
