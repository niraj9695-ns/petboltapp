import React from "react";

import { View, TextInput, Switch, Text } from "react-native";

import { Picker } from "@react-native-picker/picker";

import createPhaseThreeFormStyles from "../styles/PhaseThreeFormStyles";
import { useTheme } from "../../../context/ThemeContext";

import FormLabel from "./FormLabel";

export default function PhaseThreeForm({
  petData,
  setPetData,
  fieldErrors = {},
  fieldPositions,
}) {
  const { theme } = useTheme();
  const phaseThreeFormStyles = createPhaseThreeFormStyles(theme);

  return (
    <View>
      <TextInput
        placeholder="Vet Name"
        placeholderTextColor={theme.placeholder}
        style={phaseThreeFormStyles.input}
        value={petData.vet_name}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            vet_name: text,
          })
        }
      />

      <TextInput
        placeholder="Vet Clinic Name"
        placeholderTextColor={theme.placeholder}
        style={phaseThreeFormStyles.input}
        value={petData.vet_clinic_name}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            vet_clinic_name: text,
          })
        }
      />

      <TextInput
        placeholder="Vet Contact"
        placeholderTextColor={theme.placeholder}
        keyboardType="phone-pad"
        style={phaseThreeFormStyles.input}
        value={petData.vet_contact}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            vet_contact: text,
          })
        }
      />

      <TextInput
        placeholder="Special Care Required"
        style={[phaseThreeFormStyles.input, phaseThreeFormStyles.textArea]}
        multiline
        value={petData.special_care_required}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            special_care_required: text,
          })
        }
      />

      <TextInput
        placeholder="Eating Habit"
        style={phaseThreeFormStyles.input}
        value={petData.eating_habit}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            eating_habit: text,
          })
        }
      />

      <TextInput
        placeholder="Water Intake Habit"
        style={phaseThreeFormStyles.input}
        value={petData.water_intake_habit}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            water_intake_habit: text,
          })
        }
      />

      <TextInput
        placeholder="Anxiety Issues"
        style={phaseThreeFormStyles.input}
        value={petData.anxiety_issues}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            anxiety_issues: text,
          })
        }
      />

      <TextInput
        placeholder="Biting History"
        style={phaseThreeFormStyles.input}
        value={petData.biting_history}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            biting_history: text,
          })
        }
      />

      {/* FOOD TYPE */}

      {/* FOOD TYPE */}

      <View
        onLayout={(e) => {
          fieldPositions.current.food_type = e.nativeEvent.layout.y;
        }}
      >
        <FormLabel title="Food Type" required error={fieldErrors.food_type} />

        <View
          style={[
            phaseThreeFormStyles.pickerWrapper,
            fieldErrors.food_type && phaseThreeFormStyles.inputError,
          ]}
        >
          <Picker
            selectedValue={petData.food_type}
            style={{
              color: petData.food_type
                ? theme.textPrimary
                : theme.textSecondary,
            }}
            dropdownIconColor={theme.primary}
            onValueChange={(value) =>
              setPetData({
                ...petData,
                food_type: value,
              })
            }
          >
            <Picker.Item
              label="Select Food Type"
              value=""
              color={theme.textSecondary}
            />

            <Picker.Item label="Veg" value="veg" color={theme.textPrimary} />

            <Picker.Item
              label="Non Veg"
              value="non_veg"
              color={theme.textPrimary}
            />

            <Picker.Item label="Both" value="both" color={theme.textPrimary} />
          </Picker>
        </View>
      </View>
      
      <TextInput
        placeholder="Food Brand"
        placeholderTextColor={theme.placeholder}
        style={[phaseThreeFormStyles.input, phaseThreeFormStyles.textArea]}
        value={petData.food_brand}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            food_brand: text,
          })
        }
      />

      <TextInput
        placeholder="Feeding Schedule"
        placeholderTextColor={theme.placeholder}
        style={[phaseThreeFormStyles.input, phaseThreeFormStyles.textArea]}
        value={petData.feeding_schedule}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            feeding_schedule: text,
          })
        }
      />

      <TextInput
        placeholder="Quantity Per Meal"
        placeholderTextColor={theme.placeholder}
        style={[phaseThreeFormStyles.input, phaseThreeFormStyles.textArea]}
        value={petData.quantity_per_meal}
        onChangeText={(text) =>
          setPetData({
            ...petData,
            quantity_per_meal: text,
          })
        }
      />

      <View style={phaseThreeFormStyles.switchContainer}>
        <Text style={phaseThreeFormStyles.switchLabel}>
          Friendly With Humans
        </Text>

        <Switch
          value={petData.friendly_with_humans}
          onValueChange={(value) =>
            setPetData({
              ...petData,
              friendly_with_humans: value,
            })
          }
        />
      </View>

      <View style={phaseThreeFormStyles.switchContainer}>
        <Text style={phaseThreeFormStyles.switchLabel}>Friendly With Dogs</Text>

        <Switch
          value={petData.friendly_with_dogs}
          onValueChange={(value) =>
            setPetData({
              ...petData,
              friendly_with_dogs: value,
            })
          }
        />
      </View>

      <View style={phaseThreeFormStyles.switchContainer}>
        <Text style={phaseThreeFormStyles.switchLabel}>
          Aggressive Behavior
        </Text>

        <Switch
          value={petData.aggressive_behavior}
          onValueChange={(value) =>
            setPetData({
              ...petData,
              aggressive_behavior: value,
            })
          }
        />
      </View>

      <View style={phaseThreeFormStyles.switchContainer}>
        <Text style={phaseThreeFormStyles.switchLabel}>Treats Allowed</Text>

        <Switch
          value={petData.treats_allowed}
          onValueChange={(value) =>
            setPetData({
              ...petData,
              treats_allowed: value,
            })
          }
        />
      </View>

      <View style={phaseThreeFormStyles.switchContainer}>
        <Text style={phaseThreeFormStyles.switchLabel}>Food Allergies</Text>

        <Switch
          value={petData.food_allergies}
          onValueChange={(value) =>
            setPetData({
              ...petData,
              food_allergies: value,
            })
          }
        />
      </View>

      {petData.food_allergies && (
        <TextInput
          placeholder="Food Allergy Details"
          placeholderTextColor={theme.placeholder}
          style={phaseThreeFormStyles.input}
          value={petData.food_allergy_details}
          onChangeText={(text) =>
            setPetData({
              ...petData,
              food_allergy_details: text,
            })
          }
        />
      )}
    </View>
  );
}
