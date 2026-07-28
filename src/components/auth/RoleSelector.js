import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import roleSelectorStyles from "../../styles/RoleSelectorStyles";

export default function RoleSelector({
  role,
  setRole,
}) {
  return (
    <View style={roleSelectorStyles.container}>
      <Text style={roleSelectorStyles.title}>
        Choose Registration Type
      </Text>

      <TouchableOpacity
        style={[
          roleSelectorStyles.card,
          role === "pet_owner" &&
            roleSelectorStyles.activeCard,
        ]}
        onPress={() =>
          setRole("pet_owner")
        }
      >
        <Text
          style={[
            roleSelectorStyles.cardTitle,
            role === "pet_owner" &&
              roleSelectorStyles.activeText,
          ]}
        >
          Pet Owner
        </Text>

        <Text
          style={[
            roleSelectorStyles.cardDescription,
            role === "pet_owner" &&
              roleSelectorStyles.activeText,
          ]}
        >
          Register your pets and book
          boarding services.
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          roleSelectorStyles.card,
          role === "boarding_owner" &&
            roleSelectorStyles.activeCard,
        ]}
        onPress={() =>
          setRole("boarding_owner")
        }
      >
        <Text
          style={[
            roleSelectorStyles.cardTitle,
            role === "boarding_owner" &&
              roleSelectorStyles.activeText,
          ]}
        >
          Boarding Owner
        </Text>

        <Text
          style={[
            roleSelectorStyles.cardDescription,
            role === "boarding_owner" &&
              roleSelectorStyles.activeText,
          ]}
        >
          Register your boarding
          facility and receive
          bookings.
        </Text>
      </TouchableOpacity>
    </View>
  );
}