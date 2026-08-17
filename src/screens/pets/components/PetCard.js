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
        <View style={petCardStyles.topRow}>
          <View style={petCardStyles.petInfo}>
            <Text style={petCardStyles.petName} numberOfLines={1}>
              {item.pet_name?.length > 12
                ? `${item.pet_name.substring(0, 12)}...`
                : item.pet_name}
            </Text>
            {item.breed?.length > 16 ? (
              <>
                <Text style={petCardStyles.petType}>{item.pet_type}</Text>

                <Text style={petCardStyles.petBreed}>{item.breed}</Text>
              </>
            ) : (
              <Text style={petCardStyles.petType} numberOfLines={1}>
                {item.pet_type} • {item.breed}
              </Text>
            )}
          </View>
          <View style={petCardStyles.iconRow}>
            <TouchableOpacity onPress={() => onEdit(item)}>
              <Ionicons name="create-outline" size={22} color="#6b21a8" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => onDelete(petId)}>
              <Ionicons name="trash-outline" size={22} color="#ef4444" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
