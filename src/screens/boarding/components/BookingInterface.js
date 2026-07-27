import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  TextInput,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/BookingInterface";

export default function BookingInterface({ navigation }) {
  const [pets, setPets] = useState(["Buddy", "Luna", "Max", "Bella"]);
  const [selectedPet, setSelectedPet] = useState("Buddy");

  const [checkInDate, setCheckInDate] = useState(new Date());
  const [checkOutDate, setCheckOutDate] = useState(
    new Date(Date.now() + 86400000),
  );

  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState("checkin");

  const [showAddPet, setShowAddPet] = useState(false);
  const [newPetName, setNewPetName] = useState("");
  const [newPetType, setNewPetType] = useState("Dog");
  const [isGuest, setIsGuest] = useState(false);

  const pricePerDay = 45;

  const calculateDays = () => {
    const diff = Math.ceil(
      (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24),
    );
    return diff > 0 ? diff : 1;
  };

  useEffect(() => {
    const loadGuestStatus = async () => {
      const guestRole = await AsyncStorage.getItem("guestRole");
      setIsGuest(!!guestRole);
    };

    loadGuestStatus();
  }, []);

  const promptSignIn = () => {
    Alert.alert(
      "Sign in required",
      "Please sign in or create an account to continue.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Sign In / Sign Up",
          onPress: () => navigation.navigate("Auth"),
        },
      ],
    );
  };

  const totalDays = calculateDays();
  const totalCost = totalDays * pricePerDay;

  const handleAddPet = () => {
    if (isGuest) {
      promptSignIn();
      return;
    }

    if (!newPetName.trim()) {
      Alert.alert("Error", "Please enter pet name");
      return;
    }

    setPets([...pets, newPetName]);
    setSelectedPet(newPetName);

    setNewPetName("");
    setNewPetType("Dog");
    setShowAddPet(false);
  };

  const handleBooking = () => {
    if (isGuest) {
      promptSignIn();
      return;
    }

    if (checkOutDate <= checkInDate) {
      Alert.alert("Invalid Dates", "Check-out must be after check-in");
      return;
    }

    Alert.alert(
      "Booking Confirmed 🎉",
      `${selectedPet} booked for ${totalDays} days\nTotal: ₹${totalCost}`,
    );
  };

  return (
    <LinearGradient
      colors={["#faf5ff", "#fdf2f8", "#fff7ed"]}
      style={styles.bookingInterfaceContainer}
    >
      <ScrollView contentContainerStyle={styles.bookingInterfaceScroll}>
        {/* TITLE */}
        <Text style={styles.bookingInterfaceTitle}>
          Book Your Pet's <Text style={styles.bookingInterfaceGradientText}>Perfect Stay</Text>
        </Text>

        {/* PET CARD */}
        <View style={[styles.bookingInterfaceCard, { borderColor: "#e9d5ff" }]}>
          <Text style={styles.bookingInterfaceHeading}>Select Your Pet</Text>

          {/* Picker */}
          <Picker
            selectedValue={selectedPet}
            onValueChange={(v) => setSelectedPet(v)}
          >
            {pets.map((p) => (
              <Picker.Item key={p} label={p} value={p} />
            ))}
          </Picker>

          {/* Chips */}
          <View style={styles.bookingInterfacePetRow}>
            {pets.map((pet) => (
              <TouchableOpacity key={pet} onPress={() => setSelectedPet(pet)}>
                <LinearGradient
                  colors={
                    selectedPet === pet
                      ? ["#8b5cf6", "#ec4899"]
                      : ["#f1f5f9", "#f1f5f9"]
                  }
                  style={styles.bookingInterfacePetChip}
                >
                  <Text
                    style={[
                      styles.bookingInterfacePetLabel,
                      selectedPet === pet && styles.bookingInterfacePetLabelActive,
                    ]}
                  >
                    {pet}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            ))}

            {/* ➕ Toggle Add Pet Form */}
            <TouchableOpacity
              onPress={() => {
                if (isGuest) {
                  promptSignIn();
                  return;
                }
                setShowAddPet(!showAddPet);
              }}
            >
              <LinearGradient
                colors={["#e0e7ff", "#c7d2fe"]}
                style={styles.bookingInterfaceAddPetChip}
              >
                <Text style={styles.bookingInterfaceAddPetLabel}>
                  {isGuest ? "Sign in to add pet" : "+ Add Pet"}
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>

          {/* ✅ ADD PET FORM */}
          {showAddPet && (
            <View style={styles.bookingInterfaceAddPetBox}>
              <TextInput
                placeholder="Pet name"
                value={newPetName}
                onChangeText={setNewPetName}
                style={styles.bookingInterfaceInput}
              />

              <Picker
                selectedValue={newPetType}
                onValueChange={(v) => setNewPetType(v)}
              >
                <Picker.Item label="Dog" value="Dog" />
                <Picker.Item label="Cat" value="Cat" />
                <Picker.Item label="Rabbit" value="Rabbit" />
                <Picker.Item label="Other" value="Other" />
              </Picker>

              <TouchableOpacity style={styles.bookingInterfaceAddButton} onPress={handleAddPet}>
                <Text style={styles.bookingInterfaceButtonText}>
                  Add Pet
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* DATE CARD */}
        <View style={[styles.bookingInterfaceCard, { borderColor: "#e9d5ff" }]}>
          <Text style={styles.bookingInterfaceHeading}>Choose Dates</Text>

          <TouchableOpacity
            style={styles.bookingInterfaceDateInput}
            onPress={() => {
              setPickerMode("checkin");
              setShowPicker(true);
            }}
          >
            <Ionicons name="calendar-outline" size={18} />
            <Text>{checkInDate.toDateString()}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.bookingInterfaceDateInput}
            onPress={() => {
              setPickerMode("checkout");
              setShowPicker(true);
            }}
          >
            <Ionicons name="calendar-outline" size={18} />
            <Text>{checkOutDate.toDateString()}</Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={pickerMode === "checkin" ? checkInDate : checkOutDate}
              mode="date"
              minimumDate={new Date()}
              onChange={(e, d) => {
                setShowPicker(false);
                if (!d) return;

                if (pickerMode === "checkin") {
                  setCheckInDate(d);
                  if (d >= checkOutDate) {
                    setCheckOutDate(new Date(d.getTime() + 86400000));
                  }
                } else {
                  setCheckOutDate(d);
                }
              }}
            />
          )}

          {/* SUMMARY */}
          <LinearGradient
            colors={["#fff7ed", "#fdf2f8"]}
            style={styles.bookingInterfaceSummaryBox}
          >
            <View style={styles.bookingInterfaceRow}>
              <Text style={styles.bookingInterfaceSummaryLabel}>Total Days</Text>
              <Text style={styles.bookingInterfaceSummaryValue}>{totalDays}</Text>
            </View>

            <View style={styles.bookingInterfaceRow}>
              <Text style={styles.bookingInterfaceSummaryLabel}>₹ {pricePerDay} / day</Text>
              <Text style={styles.bookingInterfaceSummaryAmount}>₹{pricePerDay}</Text>
            </View>

            <View style={styles.bookingInterfaceRow}>
              <Text style={styles.bookingInterfaceSummaryLabelBold}>Total</Text>
              <Text style={styles.bookingInterfaceTotalText}>₹{totalCost}</Text>
            </View>
          </LinearGradient>
        </View>

        {/* BUTTON */}
        <TouchableOpacity onPress={handleBooking}>
          <LinearGradient colors={["#6b21a8", "#ec4899"]} style={styles.bookingInterfaceButton}>
            <Text style={styles.bookingInterfaceButtonText}>Book Now →</Text>
          </LinearGradient>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

