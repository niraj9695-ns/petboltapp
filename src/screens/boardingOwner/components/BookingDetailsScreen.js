import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  useWindowDimensions,
} from "react-native";
import PremiumLoader from "../../../components/PremiumLoader";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRefresh } from "../../../context/RefreshContext";
import { useTheme } from "../../../context/ThemeContext";
import styles from "../styles/BookingDetailsScreen";
import {
  updateBookingStatus,
  setPickupDropTime,
} from "../services/boardingOwnerService";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function BookingDetailsScreen({ route, navigation }) {
  const { triggerRefresh } = useRefresh();
  const { theme } = useTheme();
  const [booking, setBooking] = useState(route.params.booking);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectError, setRejectError] = useState("");
  const [loading, setLoading] = useState(false);

  const getBookingPetId = (booking) => {
    return (
      booking?.pet_id ||
      booking?.pet?.pet_id ||
      booking?.pet?.id ||
      booking?.pet_info?.pet_id ||
      booking?.pet_details?.pet_id ||
      booking?.pet_data?.pet_id ||
      null
    );
  };

  const bookingPetId = getBookingPetId(booking);

  const handleViewPetDetails = () => {
    if (!bookingPetId) {
      Alert.alert(
        "Pet unavailable",
        "This booking does not contain a valid pet ID.",
      );
      return;
    }

    navigation.navigate("PetDetails", {
      petId: bookingPetId,
    });
  };

  const { width } = useWindowDimensions();

  const isTablet = width >= 768;
  const contentWidth = isTablet ? Math.min(width * 0.8, 700) : width - 32;

  const [pickupDate, setPickupDate] = useState(new Date());
  const [pickupTime, setPickupTime] = useState(new Date());
  const [pickupRequired, setPickupRequired] = useState(false);
  const [dropRequired, setDropRequired] = useState(false);

  const [showActions, setShowActions] = useState(false);

  const [dropDate, setDropDate] = useState(new Date());
  const [dropTime, setDropTime] = useState(new Date());

  const [pickupAddress, setPickupAddress] = useState("");
  const [dropAddress, setDropAddress] = useState("");
  const [driverNotes, setDriverNotes] = useState("");

  const [pickupLoading, setPickupLoading] = useState(false);

  const [showPickupDate, setShowPickupDate] = useState(false);
  const [showPickupTime, setShowPickupTime] = useState(false);
  const [showDropDate, setShowDropDate] = useState(false);
  const [showDropTime, setShowDropTime] = useState(false);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const formatTime = (date) => {
    return date.toTimeString().split(" ")[0];
  };

  const handleSetPickupDrop = async () => {
    if (!pickupRequired && !dropRequired) {
      Alert.alert("Validation", "Select pickup or drop service.");
      return;
    }

    setPickupLoading(true);

    try {
      const payload = {
        booking_id: Number(booking.id),
        pickup_required: pickupRequired,
        drop_required: dropRequired,

        pickup_date: pickupRequired ? formatDate(pickupDate) : null,

        pickup_time: pickupRequired ? formatTime(pickupTime) : null,

        drop_date: dropRequired ? formatDate(dropDate) : null,

        drop_time: dropRequired ? formatTime(dropTime) : null,

        pickup_address: pickupAddress,
        drop_address: dropAddress,
        driver_notes: driverNotes,
      };

      const response = await setPickupDropTime(payload);

      if (response.status === "success" || response.success) {
        Alert.alert("Success", "Pickup / Drop details updated successfully.");

        setBooking(response.data);

        triggerRefresh();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      Alert.alert("Error", JSON.stringify(error?.response?.data || {}));
    } finally {
      setPickupLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      setRejectError("Please enter a reason for rejecting this booking.");
      Alert.alert(
        "Reason required",
        "Please enter a reason for rejecting this booking.",
      );
      return;
    }

    setRejectError("");
    setLoading(true);

    try {
      const response = await updateBookingStatus(
        booking.id,
        "rejected",
        rejectReason.trim(),
      );

      if (
        response.status === true ||
        response.status === "success" ||
        response.success
      ) {
        setBooking({
          ...booking,
          status: "rejected",
          reject_reason: rejectReason.trim(),
        });

        triggerRefresh();

        Alert.alert(
          "Booking Rejected",
          "The booking request has been rejected successfully.",
          [
            {
              text: "OK",
              onPress: () => navigation.goBack(),
            },
          ],
        );

        return;
      }

      throw new Error(response.message || "Unable to reject booking.");
    } catch (error) {
      Alert.alert(
        "Reject Failed",
        error?.response?.data?.message ||
          error.message ||
          "Please try again later.",
      );
    } finally {
      setLoading(false);
    }
  };

  const bookingStatus = String(booking.status || booking.booking_status || "")
    .trim()
    .toLowerCase();
  const canReject = !["rejected", "cancelled", "completed"].includes(
    bookingStatus,
  );

  const pickupDropSubmitted = Boolean(
    booking?.pickup_date || booking?.drop_date,
  );

  return (
    <SafeAreaView style={styles.container} edges={["left", "right", "bottom"]}>
      <ScrollView
        contentContainerStyle={[
          styles.content,
          {
            alignItems: "center",
            paddingHorizontal: 16,
          },
        ]}
      >
        <View style={{ width: contentWidth }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ marginBottom: 12 }}
          >
            <Text style={{ color: "#6b21a8", fontWeight: "700" }}>← Back</Text>
          </TouchableOpacity>

          <View style={styles.heroCard}>
            <TouchableOpacity onPress={handleViewPetDetails}>
              <Text
                style={styles.heroTitle}
              >
                {booking.pet_name || booking.pet?.pet_name || "Pet Details"}
              </Text>
            </TouchableOpacity>
            <Text style={styles.heroSubtitle}>{booking.center_name}</Text>
          </View>

          <View style={styles.actionPanel}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => setShowActions(!showActions)}
            >
              <Text style={styles.accordionTitle}>Booking Actions</Text>

              <Ionicons
                name={showActions ? "chevron-up" : "chevron-down"}
                size={22}
                color="#6b21a8"
              />
            </TouchableOpacity>
            {showActions && (
              <View style={styles.accordionContent}>
                <Text style={styles.subSectionTitle}>
                  Pickup & Drop Service
                </Text>
                {pickupDropSubmitted ? (
                  <View style={styles.completedBox}>
                    <Text style={styles.completedText}>
                      Pickup & Drop details have already been submitted and
                      cannot be modified.
                    </Text>
                  </View>
                ) : (
                  <>
                    <Text style={styles.label}>Pickup Required</Text>
                    <View style={styles.toggleRow}>
                      <TouchableOpacity
                        style={[
                          styles.toggleOption,
                          pickupRequired && styles.toggleOptionActive,
                        ]}
                        onPress={() => setPickupRequired(true)}
                      >
                        <Text
                          style={[
                            styles.toggleOptionText,
                            pickupRequired && styles.toggleOptionTextActive,
                          ]}
                        >
                          Yes
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.toggleOption,
                          !pickupRequired && styles.toggleOptionActive,
                        ]}
                        onPress={() => setPickupRequired(false)}
                      >
                        <Text
                          style={[
                            styles.toggleOptionText,
                            !pickupRequired && styles.toggleOptionTextActive,
                          ]}
                        >
                          No
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Drop Required</Text>
                    <View style={styles.toggleRow}>
                      <TouchableOpacity
                        style={[
                          styles.toggleOption,
                          dropRequired && styles.toggleOptionActive,
                        ]}
                        onPress={() => setDropRequired(true)}
                      >
                        <Text
                          style={[
                            styles.toggleOptionText,
                            dropRequired && styles.toggleOptionTextActive,
                          ]}
                        >
                          Yes
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[
                          styles.toggleOption,
                          !dropRequired && styles.toggleOptionActive,
                        ]}
                        onPress={() => setDropRequired(false)}
                      >
                        <Text
                          style={[
                            styles.toggleOptionText,
                            !dropRequired && styles.toggleOptionTextActive,
                          ]}
                        >
                          No
                        </Text>
                      </TouchableOpacity>
                    </View>

                    {pickupRequired && (
                      <>
                        <TouchableOpacity
                          style={styles.dateButton}
                          onPress={() => setShowPickupDate(true)}
                        >
                          <Text>Pickup Date: {formatDate(pickupDate)}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.dateButton}
                          onPress={() => setShowPickupTime(true)}
                        >
                          <Text>
                            Pickup Time: {pickupTime.toLocaleTimeString()}
                          </Text>
                        </TouchableOpacity>

                        <TextInput
                          style={styles.input}
                          placeholder="Pickup Address"
                          value={pickupAddress}
                          onChangeText={setPickupAddress}
                        />
                      </>
                    )}

                    {dropRequired && (
                      <>
                        <TouchableOpacity
                          style={styles.dateButton}
                          onPress={() => setShowDropDate(true)}
                        >
                          <Text>Drop Date: {formatDate(dropDate)}</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          style={styles.dateButton}
                          onPress={() => setShowDropTime(true)}
                        >
                          <Text>
                            Drop Time: {dropTime.toLocaleTimeString()}
                          </Text>
                        </TouchableOpacity>

                        <TextInput
                          style={styles.input}
                          placeholder="Drop Address"
                          value={dropAddress}
                          onChangeText={setDropAddress}
                        />
                      </>
                    )}

                    <TextInput
                      style={[styles.input, { minHeight: 80 }]}
                      placeholder="Driver Notes"
                      multiline
                      value={driverNotes}
                      onChangeText={setDriverNotes}
                    />

                    <TouchableOpacity
                      style={styles.rejectButton}
                      onPress={handleSetPickupDrop}
                      disabled={pickupLoading}
                    >
                      {pickupLoading ? (
                        <PremiumLoader
                          size={18}
                          color="#fff"
                          showLabel={false}
                        />
                      ) : (
                        <Text style={styles.rejectButtonText}>
                          Save Pickup & Drop Details
                        </Text>
                      )}
                    </TouchableOpacity>
                  </>
                )}

                <View style={styles.divider} />

                <Text style={styles.subSectionTitle}>Reject Booking</Text>
                <Text style={styles.helperText}>
                  {canReject
                    ? "If this request cannot be accepted, provide a clear reason and reject it now."
                    : "This booking cannot be rejected because it has already been finalized."}
                </Text>
                <TextInput
                  style={[
                    styles.rejectInput,
                    !canReject && styles.disabledInput,
                    rejectError ? styles.errorInput : null,
                  ]}
                  value={rejectReason}
                  onChangeText={(text) => {
                    setRejectReason(text);
                    if (rejectError && text.trim()) {
                      setRejectError("");
                    }
                  }}
                  placeholder="Enter rejection reason"
                  placeholderTextColor={theme.placeholder}
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                  editable={canReject && !loading}
                />
                {rejectError ? (
                  <Text style={styles.errorText}>{rejectError}</Text>
                ) : null}
                <TouchableOpacity
                  style={[
                    styles.rejectButton,
                    !canReject && styles.disabledButton,
                  ]}
                  onPress={handleReject}
                  disabled={!canReject || loading}
                >
                  {loading ? (
                    <PremiumLoader size={18} color="#fff" showLabel={false} />
                  ) : (
                    <Text style={styles.rejectButtonText}>
                      {canReject ? "Reject Booking" : "Cannot Reject"}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            )}
          </View>

          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Guest Details</Text>
            <Text style={styles.label}>Owner</Text>
            <Text style={styles.value}>{booking.user_name}</Text>
            <Text style={styles.label}>Phone</Text>
            <Text style={styles.value}>{booking.user_phone}</Text>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{booking.user_email}</Text>

            <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
              Pet Details
            </Text>
            <Text style={styles.label}>Pet Type</Text>
            <Text style={styles.value}>{booking.pet_type}</Text>
            <Text style={styles.label}>Breed</Text>
            <Text style={styles.value}>{booking.breed}</Text>

            <Text style={[styles.sectionTitle, { marginTop: 16 }]}>
              Stay Details
            </Text>
            <View style={styles.row}>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Start Date</Text>
                <Text style={styles.value}>{booking.start_date}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>End Date</Text>
                <Text style={styles.value}>{booking.end_date}</Text>
              </View>
            </View>
            <Text style={styles.label}>Location</Text>
            <Text style={styles.value}>
              {booking.city}, {booking.state}
            </Text>
            <Text style={styles.label}>Total Days</Text>
            <Text style={styles.value}>{booking.total_days}</Text>
            <Text style={styles.label}>Price Per Day</Text>
            <Text style={styles.value}>₹{booking.price_per_day}</Text>

            <Text style={styles.totalPrice}>
              Total Price: ₹{booking.total_price}
            </Text>

            <View
              style={[
                styles.statusBadge,
                booking.status === "accepted"
                  ? styles.accepted
                  : booking.status === "rejected"
                    ? styles.rejected
                    : styles.pending,
              ]}
            >
              <Text style={styles.statusText}>{booking.status}</Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <DateTimePickerModal
        isVisible={showPickupDate}
        mode="date"
        date={pickupDate}
        onConfirm={(date) => {
          setPickupDate(date);
          setShowPickupDate(false);
        }}
        onCancel={() => setShowPickupDate(false)}
      />

      <DateTimePickerModal
        isVisible={showPickupTime}
        mode="time"
        date={pickupTime}
        onConfirm={(date) => {
          setPickupTime(date);
          setShowPickupTime(false);
        }}
        onCancel={() => setShowPickupTime(false)}
      />

      <DateTimePickerModal
        isVisible={showDropDate}
        mode="date"
        date={dropDate}
        onConfirm={(date) => {
          setDropDate(date);
          setShowDropDate(false);
        }}
        onCancel={() => setShowDropDate(false)}
      />

      <DateTimePickerModal
        isVisible={showDropTime}
        mode="time"
        date={dropTime}
        onConfirm={(date) => {
          setDropTime(date);
          setShowDropTime(false);
        }}
        onCancel={() => setShowDropTime(false)}
      />
    </SafeAreaView>
  );
}
