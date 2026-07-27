import React from "react";

import { View, TextInput, Switch, Text } from "react-native";

import { Picker } from "@react-native-picker/picker";

import phaseThreeFormStyles from "../styles/PhaseThreeFormStyles";

import FormLabel from "./FormLabel";

export default function PhaseThreeForm({
  petData,
  setPetData,
  fieldErrors = {},
}) {
  return (
    <View>
      <TextInput
        placeholder="Vet Name"
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

      <FormLabel title="Food Type" required error={fieldErrors.food_type} />

      <View
        style={[
          phaseThreeFormStyles.pickerWrapper,
          fieldErrors.food_type && phaseThreeFormStyles.inputError,
        ]}
      >
        <Picker
          selectedValue={petData.food_type}
          onValueChange={(value) =>
            setPetData({
              ...petData,
              food_type: value,
            })
          }
        >
          <Picker.Item label="Select Food Type" value="" />

          <Picker.Item label="Veg" value="veg" />

          <Picker.Item label="Non Veg" value="non_veg" />

          <Picker.Item label="Both" value="both" />
        </Picker>
      </View>

      <TextInput
        placeholder="Food Brand"
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
        <Text style={phaseThreeFormStyles.switchLabel}>Friendly With Humans</Text>

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
        <Text style={phaseThreeFormStyles.switchLabel}>Aggressive Behavior</Text>

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

