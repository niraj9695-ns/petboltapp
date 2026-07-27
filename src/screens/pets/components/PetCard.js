import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import petCardStyles from "../styles/PetCardStyles";

export default function PetCard({
  item,
  petImages,
  onEdit,
  onDelete,
  navigation,
}) {
  const petId = item.pet_id || item.id;

  const profileImage =
    petImages[petId]?.find(
      (img) =>
        img?.is_profile === "1" ||
        img?.is_profile === 1 ||
        img?.is_profile === true,
    ) || petImages[petId]?.[0];

  const image =
    profileImage?.image_url ||
    petImages[petId]?.[0]?.image_url ||
    "https://via.placeholder.com/100";

  return (
    <TouchableOpacity
      style={petCardStyles.card}
      onPress={() =>
        navigation.navigate("PetDetails", {
          petId,
        })
      }
    >
      <Image source={{ uri: image }} style={petCardStyles.petImage} />

      <View style={petCardStyles.rightSection}>
        <Text style={petCardStyles.petName}>{item.pet_name}</Text>

        <View style={petCardStyles.iconRow}>
          <TouchableOpacity onPress={() => onEdit(item)}>
            <Ionicons name="create-outline" size={24} color="#6b21a8" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => onDelete(petId)}>
            <Ionicons name="trash-outline" size={24} color="#ef4444" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

