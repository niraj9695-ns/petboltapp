
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PetScreen from "../screens/pets/components/PetScreen";
import PetDetailsScreen from "../screens/pets/components/PetDetailsScreen";

const Stack = createNativeStackNavigator();

export default function PetStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="PetList"
        component={PetScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="EditPet"
        options={{ headerShown: false }}
      >
        {(props) => (
          <PetScreen
            {...props}
            initialEditPetId={props.route?.params?.petId}
          />
        )}
      </Stack.Screen>

      <Stack.Screen
        name="PetDetails"
        component={PetDetailsScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

