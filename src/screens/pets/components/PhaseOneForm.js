import React, { useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";

import { Picker } from "@react-native-picker/picker";

import { Ionicons } from "@expo/vector-icons";

import DateTimePickerModal from "react-native-modal-datetime-picker";

import createPhaseOneFormStyles from "../styles/PhaseOneFormStyles";
import { useTheme } from "../../../context/ThemeContext";

import FormLabel from "./FormLabel";

export default function PhaseOneForm({
  petData,
  setPetData,
  fieldErrors = {},
  pickImages,
  selectedImages,
  removeImage,
  profileImageIndex,
  setProfileImageIndex,
  fieldPositions,
}) {
  const [showDobPicker, setShowDobPicker] = useState(false);
  const { theme } = useTheme();
  const phaseOneFormStyles = createPhaseOneFormStyles(theme);

  const handleDobConfirm = (date) => {
    const formattedDate = date.toISOString().split("T")[0];

    setPetData({
      ...petData,
      date_of_birth: formattedDate,
    });

    setShowDobPicker(false);
  };

  return (
    <View>
      {/* PET NAME */}
      <View
        onLayout={(e) => {
          fieldPositions.current.pet_name = e.nativeEvent.layout.y;
        }}
      >
        <FormLabel title="Pet Name" required error={fieldErrors.pet_name} />
        <TextInput
          placeholder="Pet Name"
          placeholderTextColor={theme.placeholder}
          style={[
            phaseOneFormStyles.input,
            fieldErrors.pet_name && phaseOneFormStyles.inputError,
          ]}
          value={petData.pet_name}
          onChangeText={(text) =>
            setPetData({
              ...petData,
              pet_name: text,
            })
          }
        />
      </View>

      {/* PET TYPE */}
      <View
        onLayout={(e) => {
          fieldPositions.current.pet_type = e.nativeEvent.layout.y;
        }}
      >
        <FormLabel title="Pet Type" required error={fieldErrors.pet_type} />
        <View
          style={[
            phaseOneFormStyles.pickerWrapper,
            fieldErrors.pet_type && phaseOneFormStyles.inputError,
          ]}
        >
          <Picker
            selectedValue={petData.pet_type}
            style={{
              color: petData.pet_type ? theme.textPrimary : theme.textSecondary,
            }}
            dropdownIconColor={theme.primary}
            onValueChange={(value) =>
              setPetData({
                ...petData,
                pet_type: value,
              })
            }
          >
            <Picker.Item
              label="Select Pet Type"
              value=""
              color={theme.textSecondary}
            />
            <Picker.Item label="Dog" value="dog" color={theme.textPrimary} />
            <Picker.Item label="Cat" value="cat" color={theme.textPrimary} />
            <Picker.Item label="Bird" value="bird" color={theme.textPrimary} />
            <Picker.Item
              label="Other"
              value="other"
              color={theme.textPrimary}
            />
          </Picker>
        </View>
      </View>

      {/* BREED */}
      <View
        onLayout={(e) => {
          fieldPositions.current.breed = e.nativeEvent.layout.y;
        }}
      >
        <FormLabel title="Breed" required error={fieldErrors.breed} />
        <TextInput
          placeholder="Breed"
          placeholderTextColor={theme.placeholder}
          style={[
            phaseOneFormStyles.input,
            fieldErrors.breed && phaseOneFormStyles.inputError,
          ]}
          value={petData.breed}
          onChangeText={(text) =>
            setPetData({
              ...petData,
              breed: text,
            })
          }
        />
      </View>

      {/* GENDER */}

      <FormLabel title="Gender" required error={fieldErrors.gender} />

      <View
        style={[
          phaseOneFormStyles.pickerWrapper,
          fieldErrors.gender && phaseOneFormStyles.inputError,
        ]}
      >
        <Picker
          selectedValue={petData.gender}
          style={{
            color: petData.gender ? theme.textPrimary : theme.textSecondary,
          }}
          dropdownIconColor={theme.primary}
          onValueChange={(value) =>
            setPetData({
              ...petData,
              gender: value,
            })
          }
        >
          <Picker.Item
            label="Select Gender"
            value=""
            color={theme.textSecondary}
          />
          <Picker.Item label="Male" value="male" color={theme.textPrimary} />
          <Picker.Item
            label="Female"
            value="female"
            color={theme.textPrimary}
          />
          <Picker.Item
            label="Unknown"
            value="unknown"
            color={theme.textPrimary}
          />
        </Picker>
      </View>

      {/* AGE */}

      <FormLabel title="Age (optional)" error={fieldErrors.age} />

      <TextInput
        placeholder="Age"
        placeholderTextColor={theme.placeholder}
        keyboardType="numeric"
        style={[
          phaseOneFormStyles.input,
          fieldErrors.age && phaseOneFormStyles.inputError,
        ]}
        value={petData.age}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            age: text,
          })
        }
      />

      {/* DATE OF BIRTH */}

      <FormLabel title="Date Of Birth" />

      <TouchableOpacity
        style={[
          phaseOneFormStyles.dateInput,
          fieldErrors.date_of_birth && phaseOneFormStyles.inputError,
        ]}
        onPress={() => setShowDobPicker(true)}
      >
        <Text
          style={[
            phaseOneFormStyles.dateInputText,
            {
              color: petData.date_of_birth
                ? theme.textPrimary
                : theme.textSecondary,
            },
          ]}
        >
          {petData.date_of_birth || "Select Date Of Birth"}
        </Text>

        <Ionicons name="calendar-outline" size={18} color={theme.primary} />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={showDobPicker}
        mode="date"
        maximumDate={new Date()}
        onConfirm={handleDobConfirm}
        onCancel={() => setShowDobPicker(false)}
      />
      {/* WEIGHT */}

      <FormLabel title="Weight (KG)" />

      <TextInput
        placeholder="Weight"
        placeholderTextColor={theme.placeholder}
        keyboardType="numeric"
        style={[
          phaseOneFormStyles.input,
          fieldErrors.weight && phaseOneFormStyles.inputError,
        ]}
        value={petData.weight}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            weight: text,
          })
        }
      />

      {/* COLOR MARKS */}

      <TextInput
        placeholder="Color Marks"
        placeholderTextColor={theme.placeholder}
        style={phaseOneFormStyles.input}
        value={petData.color_marks}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            color_marks: text,
          })
        }
      />

      {/* MICROCHIP */}

      <TextInput
        placeholder="Microchip ID"
        placeholderTextColor={theme.placeholder}
        style={phaseOneFormStyles.input}
        value={petData.microchip_id}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            microchip_id: text,
          })
        }
      />

      {/* REGISTRATION */}

      <TextInput
        placeholder="Registration Number"
        placeholderTextColor={theme.placeholder}
        style={phaseOneFormStyles.input}
        value={petData.registration_number}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            registration_number: text,
          })
        }
      />

      {/* ADDITIONAL DETAILS */}

      <TextInput
        placeholder="Additional Details"
        placeholderTextColor={theme.placeholder}
        style={[phaseOneFormStyles.input, phaseOneFormStyles.textArea]}
        multiline
        value={petData.additional_details}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            additional_details: text,
          })
        }
      />

      {/* IMAGES */}

      <Text style={phaseOneFormStyles.fieldLabel}>Pet Images</Text>
      <Text style={phaseOneFormStyles.helperText}>
        You can add one or more photos for the pet profile.
      </Text>

      <TouchableOpacity
        onPress={pickImages}
        style={phaseOneFormStyles.imageSelectButton}
      >
        <Text style={phaseOneFormStyles.imageSelectButtonText}>
          Select Images
        </Text>
      </TouchableOpacity>

      {selectedImages?.length > 0 && (
        <>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={phaseOneFormStyles.imagePreviewContainer}
          >
            {selectedImages.map((img, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  phaseOneFormStyles.imageThumbWrapper,
                  profileImageIndex === index &&
                    phaseOneFormStyles.selectedThumbWrapper,
                ]}
                onPress={() => setProfileImageIndex(index)}
              >
                <Image
                  source={{
                    uri: img.uri || img.image_url || img.url || img.pet_image,
                  }}
                  style={phaseOneFormStyles.imageThumb}
                />

                <View
                  style={[
                    phaseOneFormStyles.profileBadge,
                    profileImageIndex === index
                      ? phaseOneFormStyles.profileBadgeActive
                      : phaseOneFormStyles.profileBadgeInactive,
                  ]}
                >
                  <Text style={phaseOneFormStyles.profileBadgeText}>
                    {profileImageIndex === index ? "Profile" : "Set Profile"}
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={() => removeImage(index)}
                  style={phaseOneFormStyles.removeImageBtn}
                >
                  <Text style={phaseOneFormStyles.removeImageText}>✕</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {profileImageIndex === null && (
            <Text style={phaseOneFormStyles.helperText}>
              Tap a photo to choose the pet profile image.
            </Text>
          )}
        </>
      )}
    </View>
  );
}
