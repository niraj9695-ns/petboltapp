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

import phaseOneFormStyles from "../styles/PhaseOneFormStyles";

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
}) {
  const [showDobPicker, setShowDobPicker] = useState(false);

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

      <FormLabel
        title="Pet Name"
        required
        error={fieldErrors.pet_name}
      />

      <TextInput
        placeholder="Pet Name"
        style={[phaseOneFormStyles.input, fieldErrors.pet_name && phaseOneFormStyles.inputError]}
        value={petData.pet_name}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            pet_name: text,
          })
        }
      />

      {/* PET TYPE */}

      <FormLabel
        title="Pet Type"
        required
        error={fieldErrors.pet_type}
      />

      <View
        style={[
          phaseOneFormStyles.pickerWrapper,
          fieldErrors.pet_type && phaseOneFormStyles.inputError,
        ]}
      >
        <Picker
          selectedValue={petData.pet_type}
          onValueChange={(value) =>
            setPetData({
              ...petData,
              pet_type: value,
            })
          }
        >
          <Picker.Item label="Select Pet Type" value="" />
          <Picker.Item label="Dog" value="dog" />
          <Picker.Item label="Cat" value="cat" />
          <Picker.Item label="Bird" value="bird" />
          <Picker.Item label="Other" value="other" />
        </Picker>
      </View>

      {/* BREED */}

      <FormLabel
        title="Breed"
        required
        error={fieldErrors.breed}
      />

      <TextInput
        placeholder="Breed"
        style={[phaseOneFormStyles.input, fieldErrors.breed && phaseOneFormStyles.inputError]}
        value={petData.breed}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            breed: text,
          })
        }
      />

      {/* GENDER */}

      <FormLabel
        title="Gender"
        required
        error={fieldErrors.gender}
      />

      <View
        style={[
          phaseOneFormStyles.pickerWrapper,
          fieldErrors.gender && phaseOneFormStyles.inputError,
        ]}
      >
        <Picker
          selectedValue={petData.gender}
          onValueChange={(value) =>
            setPetData({
              ...petData,
              gender: value,
            })
          }
        >
          <Picker.Item label="Select Gender" value="" />
          <Picker.Item label="Male" value="male" />
          <Picker.Item label="Female" value="female" />
          <Picker.Item label="Unknown" value="unknown" />
        </Picker>
      </View>

      {/* AGE */}

      <FormLabel
        title="Age"
        required
        error={fieldErrors.age}
      />

      <TextInput
        placeholder="Age"
        keyboardType="numeric"
        style={[phaseOneFormStyles.input, fieldErrors.age && phaseOneFormStyles.inputError]}
        value={petData.age}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            age: text,
          })
        }
      />

      {/* DATE OF BIRTH */}

      <FormLabel
        title="Date Of Birth"
        required
        error={fieldErrors.date_of_birth}
      />

      <TouchableOpacity
        style={[phaseOneFormStyles.dateInput, fieldErrors.date_of_birth && phaseOneFormStyles.inputError]}
        onPress={() => setShowDobPicker(true)}
      >
        <Text style={phaseOneFormStyles.dateInputText}>
          {petData.date_of_birth || "Select Date Of Birth"}
        </Text>
        <Ionicons name="calendar-outline" size={18} color="#6b21a8" />
      </TouchableOpacity>

      <DateTimePickerModal
        isVisible={showDobPicker}
        mode="date"
        maximumDate={new Date()}
        onConfirm={handleDobConfirm}
        onCancel={() => setShowDobPicker(false)}
      />

      {/* WEIGHT */}

      <FormLabel
        title="Weight (KG)"
        required
        error={fieldErrors.weight}
      />

      <TextInput
        placeholder="Weight"
        keyboardType="numeric"
        style={[phaseOneFormStyles.input, fieldErrors.weight && phaseOneFormStyles.inputError]}
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
      <Text style={phaseOneFormStyles.helperText}>You can add one or more photos for the pet profile.</Text>

      <TouchableOpacity onPress={pickImages} style={phaseOneFormStyles.imageSelectButton}>
        <Text style={phaseOneFormStyles.imageSelectButtonText}>Select Images</Text>
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
                  profileImageIndex === index && phaseOneFormStyles.selectedThumbWrapper,
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
                    {profileImageIndex === index
                      ? "Profile"
                      : "Set Profile"}
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

