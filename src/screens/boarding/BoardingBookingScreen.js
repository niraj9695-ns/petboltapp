import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  TextInput,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";

export default function BoardingBookingScreen({ route, navigation }) {
  const { centerId, centerName, pricePerDay } = route.params;

  const [pets, setPets] = useState([]);
  const [selectedPetId, setSelectedPetId] = useState(null);

  const [checkInDate, setCheckInDate] = useState(new Date());

  const [checkOutDate, setCheckOutDate] = useState(
    new Date(Date.now() + 86400000),
  );

  const [showPicker, setShowPicker] = useState(false);

  const [pickerMode, setPickerMode] = useState("checkin");

  const [capacity, setCapacity] = useState(null);

  const [available, setAvailable] = useState(null);

  const [loadingCapacity, setLoadingCapacity] = useState(false);

  const [checkingAvailability, setCheckingAvailability] = useState(false);

  const [bookingLoading, setBookingLoading] = useState(false);

  const [specialInstructions, setSpecialInstructions] = useState("");

  useEffect(() => {
    loadPets();
    getCapacity();
  }, []);

  const formatDate = (date) => {
    return date.toISOString().split("T")[0];
  };

  const totalDays = Math.max(
    1,
    Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)),
  );

  const totalCost = totalDays * Number(pricePerDay || 0);

  const loadPets = async () => {
    try {
      const token = await AsyncStorage.getItem("token");

      const response = await fetch(
        "https://www.cgpisoftware.com/cheerytail/api/pets",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
        },
      );

      const data = await response.json();

      const petList = data.data || [];

      setPets(petList);

      if (petList.length > 0) {
        setSelectedPetId(petList[0].pet_id || petList[0].id);
      }
    } catch (error) {}
  };

  const getCapacity = async () => {
    try {
      setLoadingCapacity(true);

      const response = await fetch(
        `https://www.cgpisoftware.com/cheerytail/api/availability/capacity?center_id=${centerId}`,
      );

      const data = await response.json();

      setCapacity(data);
    } catch (error) {
    } finally {
      setLoadingCapacity(false);
    }
  };

  const checkAvailability = async () => {
    try {
      setCheckingAvailability(true);

      const response = await fetch(
        "https://www.cgpisoftware.com/cheerytail/api/availability/check",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            center_id: centerId,
            start_date: formatDate(checkInDate),
            end_date: formatDate(checkOutDate),
          }),
        },
      );

      const data = await response.json();

      setAvailable(data);
    } catch (error) {
      Alert.alert("Error", "Failed to check availability");
    } finally {
      setCheckingAvailability(false);
    }
  };

  const createBooking = async () => {
    try {
      if (!selectedPetId) {
        Alert.alert("Error", "Please select a pet");
        return;
      }

      if (checkOutDate <= checkInDate) {
        Alert.alert("Invalid Dates", "End date must be after start date");
        return;
      }

      const token = await AsyncStorage.getItem("token");

      setBookingLoading(true);

      const response = await fetch(
        "https://www.cgpisoftware.com/cheerytail/api/bookings/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            center_id: centerId,
            pet_id: selectedPetId,
            start_date: formatDate(checkInDate),
            end_date: formatDate(checkOutDate),
            special_instructions: specialInstructions,
          }),
        },
      );

      const data = await response.json();

      if (data.status === "success") {
        Alert.alert("Success", "Booking created successfully");

        navigation.goBack();
      } else {
        Alert.alert("Failed", data.message || "Booking creation failed");
      }
    } catch (error) {
      Alert.alert("Error", "Unable to create booking");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <LinearGradient
      colors={["#faf5ff", "#fdf2f8", "#fff7ed"]}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 16,
        }}
      >
        <View style={styles.card}>
          <Text style={styles.centerName}>{centerName}</Text>

          <Text style={styles.price}>₹{pricePerDay} / day</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Select Pet</Text>

          <Picker
            selectedValue={selectedPetId}
            onValueChange={(value) => setSelectedPetId(value)}
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

        <View style={styles.card}>
          <Text style={styles.heading}>Booking Dates</Text>

          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => {
              setPickerMode("checkin");
              setShowPicker(true);
            }}
          >
            <Ionicons name="calendar-outline" size={20} />
            <Text>Check In : {checkInDate.toDateString()}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => {
              setPickerMode("checkout");
              setShowPicker(true);
            }}
          >
            <Ionicons name="calendar-outline" size={20} />
            <Text>Check Out : {checkOutDate.toDateString()}</Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={pickerMode === "checkin" ? checkInDate : checkOutDate}
              mode="date"
              minimumDate={new Date()}
              onChange={(event, date) => {
                setShowPicker(false);

                if (!date) return;

                if (pickerMode === "checkin") {
                  setCheckInDate(date);
                } else {
                  setCheckOutDate(date);
                }
              }}
            />
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Capacity Status</Text>

          {loadingCapacity ? (
            <ActivityIndicator />
          ) : (
            <>
              <Text>Total Capacity : {capacity?.data?.total_capacity}</Text>

              <Text>
                Available Capacity : {capacity?.data?.available_capacity}
              </Text>

              <Text>Booked Count : {capacity?.data?.booked_count}</Text>

              <Text
                style={{
                  marginTop: 10,
                  color: capacity?.data?.is_available ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {capacity?.data?.is_available ? "Available" : "Not Available"}
              </Text>
            </>
          )}
        </View>

        <View style={styles.card}>
          <TouchableOpacity
            style={styles.orangeBtn}
            onPress={checkAvailability}
          >
            <Text style={styles.btnText}>Check Availability</Text>
          </TouchableOpacity>

          {checkingAvailability && (
            <ActivityIndicator
              style={{
                marginTop: 10,
              }}
            />
          )}

          {available?.data && (
            <View
              style={{
                marginTop: 15,
              }}
            >
              <Text>Total Days : {available.data.total_days}</Text>

              <Text>Available Days : {available.data.available_days}</Text>

              <Text>Price Per Day : ₹{available.data.price_per_day}</Text>

              <Text>Capacity : {available.data.capacity}</Text>

              <Text
                style={{
                  marginTop: 10,
                  color: available.data.is_available ? "green" : "red",
                  fontWeight: "bold",
                }}
              >
                {available.data.is_available ? "Available" : "Not Available"}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.card}>
          <Text style={styles.heading}>Special Instructions</Text>

          <TextInput
            placeholder="Please feed twice daily..."
            value={specialInstructions}
            onChangeText={setSpecialInstructions}
            multiline
            style={styles.input}
          />
        </View>

        <View style={styles.card}>
          <Text>Total Days : {totalDays}</Text>

          <Text
            style={{
              marginTop: 8,
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            Total Amount : ₹{totalCost}
          </Text>
        </View>

        <TouchableOpacity
          style={styles.bookBtn}
          onPress={createBooking}
          disabled={bookingLoading}
        >
          <Text style={styles.btnText}>
            {bookingLoading ? "Creating Booking..." : "Confirm Booking"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 15,
  },

  centerName: {
    fontSize: 22,
    fontWeight: "bold",
  },

  price: {
    marginTop: 5,
    color: "#ea580c",
    fontWeight: "700",
  },

  heading: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
  },

  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },

  orangeBtn: {
    backgroundColor: "#f97316",
    padding: 14,
    borderRadius: 12,
    alignItems: "center",
  },

  bookBtn: {
    backgroundColor: "#ec4899",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    marginBottom: 30,
  },

  btnText: {
    color: "#fff",
    fontWeight: "700",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 12,
    minHeight: 100,
    textAlignVertical: "top",
  },
});
