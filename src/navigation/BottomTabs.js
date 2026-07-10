import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import BookingScreen from "../screens/BookingScreen";
import ProfileScreen from "../screens/ProfileScreen";
import StatusScreen from "../screens/StatusScreen";
import RegisterScreen from "../components/Register";
import PetScreen from "../screens/PetScreen";
import BoardingStack from "./BoardingStack";
import PetStack from "./PetStack";

import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,

        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home-outline";
          } else if (route.name === "Booking") {
            iconName = "calendar-outline";
          } else if (route.name === "Status") {
            iconName = "time-outline";
          } else if (route.name === "Profile") {
            iconName = "person-outline";
          } else if (route.name === "Pets") {
            iconName = "paw-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },

        tabBarActiveTintColor: "#6b21a8",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Booking" component={BookingScreen} />
      <Tab.Screen name="Status" component={StatusScreen} />

      <Tab.Screen name="Pets" component={PetStack} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen
        name="Register"
        component={RegisterScreen}
        options={{
          tabBarButton: () => null,
          tabBarItemStyle: {
            display: "none",
          },
        }}
      />
      <Tab.Screen
        name="Boarding"
        component={BoardingStack}
        options={{
          headerShown: false,

          tabBarButton: () => null,

          tabBarItemStyle: {
            display: "none",
          },
        }}
      />
    </Tab.Navigator>
  );
}
