import { appAlert } from "../../../utils/alert";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  useWindowDimensions,
} from "react-native";
import PremiumLoader from "../../../components/PremiumLoader";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRefresh } from "../../../context/RefreshContext";
import { useTheme } from "../../../context/ThemeContext";
import styles from "../styles/BookingDetailsScreen";
import BackButton from "../../../components/BackButton";
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
      appAlert.alert(
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
      appAlert.alert("Validation", "Select pickup or drop service.");
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
        appAlert.alert("Success", "Pickup / Drop details updated successfully.");

        setBooking(response.data);

        triggerRefresh();
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      appAlert.alert("Error", JSON.stringify(error?.response?.data || {}));
    } finally {
      setPickupLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) {
      setRejectError("Please enter a reason for rejecting this booking.");
      appAlert.alert(
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

        appAlert.alert(
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
      appAlert.alert(
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
          <View style={styles.heroCard}>
            <View style={styles.heroHeader}>
              <View style={styles.heroBackButton}>
                <BackButton />
              </View>

              <TouchableOpacity
                style={styles.heroTitleWrap}
                onPress={handleViewPetDetails}
              >
                <Text style={styles.heroTitle} numberOfLines={1}>
                  {booking.pet_name || booking.pet?.pet_name || "Pet Details"}
                </Text>
                <Text style={styles.heroSubtitle} numberOfLines={1}>
                  {booking.center_name}
                </Text>
              </TouchableOpacity>

              <View style={styles.heroHeaderSpacer} />
            </View>
          </View>
          <View style={styles.actionPanel}>
            <TouchableOpacity
              style={styles.accordionHeader}
              onPress={() => setShowActions(!showActions)}
              activeOpacity={0.7}
            >
              <View style={styles.accordionHeaderLeft}>
                <View style={styles.actionIconContainer}>
                  <Ionicons name="settings-outline" size={19} color="#6b21a8" />
                </View>

                <View style={styles.accordionHeaderText}>
                  <Text style={styles.accordionTitle}>Booking Actions</Text>
                  <Text style={styles.accordionSubtitle}>
                    Manage pickup, drop & booking status
                  </Text>
                </View>
              </View>

              <View style={styles.chevronContainer}>
                <Ionicons
                  name={showActions ? "chevron-up" : "chevron-down"}
                  size={18}
                  color="#6b21a8"
                />
              </View>
            </TouchableOpacity>

            {showActions && (
              <View style={styles.accordionContent}>
                {/* PICKUP & DROP */}
                <View style={styles.actionSection}>
                  <View style={styles.sectionHeadingRow}>
                    <View style={styles.sectionIcon}>
                      <Ionicons name="car-outline" size={18} color="#6b21a8" />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={styles.subSectionTitle}>
                        Pickup & Drop Service
                      </Text>
                      <Text style={styles.sectionDescription}>
                        Arrange transportation for this booking
                      </Text>
                    </View>
                  </View>

                  {pickupDropSubmitted ? (
                    <View style={styles.completedBox}>
                      <Ionicons
                        name="checkmark-circle"
                        size={20}
                        color="#166534"
                      />

                      <Text style={styles.completedText}>
                        Pickup & Drop details have already been submitted and
                        cannot be modified.
                      </Text>
                    </View>
                  ) : (
                    <>
                      <Text style={styles.label}>Transportation Services</Text>

                      <TouchableOpacity
                        style={styles.checkboxRow}
                        onPress={() => setPickupRequired(!pickupRequired)}
                        activeOpacity={0.7}
                      >
                        <View
                          style={[
                            styles.checkbox,
                            pickupRequired && styles.checkboxChecked,
                          ]}
                        >
                          {pickupRequired && (
                            <Ionicons name="checkmark" size={16} color="#fff" />
                          )}
                        </View>

                        <View style={styles.checkboxTextWrap}>
                          <Text style={styles.checkboxTitle}>
                            Pickup Required
                          </Text>
                          <Text style={styles.checkboxDescription}>
                            Arrange pickup from the owner's location
                          </Text>
                        </View>
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.checkboxRow}
                        onPress={() => setDropRequired(!dropRequired)}
                        activeOpacity={0.7}
                      >
                        <View
                          style={[
                            styles.checkbox,
                            dropRequired && styles.checkboxChecked,
                          ]}
                        >
                          {dropRequired && (
                            <Ionicons name="checkmark" size={16} color="#fff" />
                          )}
                        </View>

                        <View style={styles.checkboxTextWrap}>
                          <Text style={styles.checkboxTitle}>
                            Drop Required
                          </Text>
                          <Text style={styles.checkboxDescription}>
                            Arrange drop-off at the owner's location
                          </Text>
                        </View>
                      </TouchableOpacity>
                      {pickupRequired && (
                        <View style={styles.serviceGroup}>
                          <Text style={styles.serviceGroupTitle}>
                            Pickup Details
                          </Text>

                          <View style={styles.dateTimeRow}>
                            {/* Pickup Date */}
                            <TouchableOpacity
                              style={styles.dateTimeItem}
                              onPress={() => setShowPickupDate(true)}
                              activeOpacity={0.7}
                            >
                              <Ionicons
                                name="calendar-outline"
                                size={18}
                                color="#6b21a8"
                              />

                              <View style={styles.dateButtonTextWrap}>
                                <Text style={styles.dateButtonLabel}>
                                  Pickup Date
                                </Text>

                                <Text
                                  style={styles.dateButtonValue}
                                  numberOfLines={1}
                                >
                                  {formatDate(pickupDate)}
                                </Text>
                              </View>
                            </TouchableOpacity>

                            {/* Pickup Time */}
                            <TouchableOpacity
                              style={styles.dateTimeItem}
                              onPress={() => setShowPickupTime(true)}
                              activeOpacity={0.7}
                            >
                              <Ionicons
                                name="time-outline"
                                size={18}
                                color="#6b21a8"
                              />

                              <View style={styles.dateButtonTextWrap}>
                                <Text style={styles.dateButtonLabel}>
                                  Pickup Time
                                </Text>

                                <Text
                                  style={styles.dateButtonValue}
                                  numberOfLines={1}
                                >
                                  {pickupTime.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                          <TextInput
                            style={styles.input}
                            placeholder="Pickup Address"
                            placeholderTextColor={theme.placeholder}
                            value={pickupAddress}
                            onChangeText={setPickupAddress}
                          />
                        </View>
                      )}

                      {dropRequired && (
                        <View style={styles.serviceGroup}>
                          <Text style={styles.serviceGroupTitle}>
                            Drop Details
                          </Text>

                          <View style={styles.dateTimeRow}>
                            {/* Drop Date */}
                            <TouchableOpacity
                              style={styles.dateTimeItem}
                              onPress={() => setShowDropDate(true)}
                              activeOpacity={0.7}
                            >
                              <Ionicons
                                name="calendar-outline"
                                size={18}
                                color="#6b21a8"
                              />

                              <View style={styles.dateButtonTextWrap}>
                                <Text style={styles.dateButtonLabel}>
                                  Drop Date
                                </Text>

                                <Text
                                  style={styles.dateButtonValue}
                                  numberOfLines={1}
                                >
                                  {formatDate(dropDate)}
                                </Text>
                              </View>
                            </TouchableOpacity>

                            {/* Drop Time */}
                            <TouchableOpacity
                              style={styles.dateTimeItem}
                              onPress={() => setShowDropTime(true)}
                              activeOpacity={0.7}
                            >
                              <Ionicons
                                name="time-outline"
                                size={18}
                                color="#6b21a8"
                              />

                              <View style={styles.dateButtonTextWrap}>
                                <Text style={styles.dateButtonLabel}>
                                  Drop Time
                                </Text>

                                <Text
                                  style={styles.dateButtonValue}
                                  numberOfLines={1}
                                >
                                  {dropTime.toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          </View>
                          <TextInput
                            style={styles.input}
                            placeholder="Drop Address"
                            placeholderTextColor={theme.placeholder}
                            value={dropAddress}
                            onChangeText={setDropAddress}
                          />
                        </View>
                      )}

                      <TextInput
                        style={[styles.input, styles.notesInput]}
                        placeholder="Driver Notes"
                        placeholderTextColor={theme.placeholder}
                        multiline
                        value={driverNotes}
                        onChangeText={setDriverNotes}
                        textAlignVertical="top"
                      />

                      <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleSetPickupDrop}
                        disabled={pickupLoading}
                        activeOpacity={0.85}
                      >
                        {pickupLoading ? (
                          <PremiumLoader
                            size={18}
                            color="#fff"
                            showLabel={false}
                          />
                        ) : (
                          <>
                            <Ionicons
                              name="checkmark-circle-outline"
                              size={19}
                              color="#fff"
                            />

                            <Text style={styles.saveButtonText}>
                              Save Pickup & Drop Details
                            </Text>
                          </>
                        )}
                      </TouchableOpacity>
                    </>
                  )}
                </View>

                {/* REJECT BOOKING */}
                <View style={styles.actionDivider} />

                <View style={styles.actionSection}>
                  <View style={styles.sectionHeadingRow}>
                    <View style={styles.rejectIcon}>
                      <Ionicons
                        name="close-circle-outline"
                        size={18}
                        color="#dc2626"
                      />
                    </View>

                    <View style={{ flex: 1 }}>
                      <Text style={styles.rejectSectionTitle}>
                        Reject Booking
                      </Text>

                      <Text style={styles.sectionDescription}>
                        Provide a reason if this request cannot be accepted
                      </Text>
                    </View>
                  </View>

                  {!canReject && (
                    <View style={styles.disabledInfo}>
                      <Ionicons
                        name="information-circle-outline"
                        size={18}
                        color="#64748b"
                      />

                      <Text style={styles.disabledInfoText}>
                        This booking cannot be rejected because it has already
                        been finalized.
                      </Text>
                    </View>
                  )}

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
                    activeOpacity={0.85}
                  >
                    {loading ? (
                      <PremiumLoader size={18} color="#fff" showLabel={false} />
                    ) : (
                      <>
                        <Ionicons
                          name="close-circle-outline"
                          size={19}
                          color="#fff"
                        />

                        <Text style={styles.rejectButtonText}>
                          {canReject ? "Reject Booking" : "Cannot Reject"}
                        </Text>
                      </>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </View>

          <View style={styles.card}>
            <View style={styles.detailsRow}>
              <View style={styles.detailsColumn}>
                <Text style={styles.sectionTitle}>Owner Details</Text>
                <Text style={styles.label}>Owner</Text>
                <Text style={styles.value}>{booking.user_name}</Text>
                <Text style={styles.label}>Phone</Text>
                <Text style={styles.value}>{booking.user_phone}</Text>
                <Text style={styles.label}>Email</Text>
                <Text style={styles.value}>{booking.user_email}</Text>
              </View>

              <View style={styles.detailsColumn}>
                <Text style={styles.sectionTitle}>Pet Details</Text>
                <Text style={styles.label}>Pet Type</Text>
                <Text style={styles.value}>{booking.pet_type}</Text>
                <Text style={styles.label}>Breed</Text>
                <Text style={styles.value}>{booking.breed}</Text>
              </View>
            </View>

            <View style={styles.staySection}>
              <Text style={styles.sectionTitle}>Stay Details</Text>
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
              <Text style={styles.value}>{"\u20B9"}{booking.price_per_day}</Text>

              <Text style={styles.totalPrice}>
                Total Price: {"\u20B9"}{booking.total_price}
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
