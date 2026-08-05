import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/CategoriesStyles";

export default function Categories() {
  const commonGradient = ["#c084fc", "#9333ea"];
  const commonBgColor = "#faf5ff";
  const { width } = useWindowDimensions();
  const cardWidth = width >= 1200 ? 320 : width >= 768 ? 280 : width * 0.72;

  const navigation = useNavigation();

  const handleCategoryPress = (item) => {
    if (item.comingSoon) {
      return;
    }

    navigation.navigate("Boarding", {
      screen: "BoardingCenters",
    });
  };
  const categories = [
    {
      icon: "home-outline",
      name: "Boarding",
      description: "Safe & cozy stays",
      emoji: "🏠",
      comingSoon: false,
    },
    {
      icon: "heart-outline",
      name: "Adoption",
      description: "Find your best friend",
      emoji: "🐕",
      comingSoon: true,
    },
    {
      icon: "shopping",
      name: "Buy & Sell",
      description: "Quality pet supplies",
      emoji: "🛍️",
      comingSoon: true,
    },
    {
      icon: "account-group-outline",
      name: "Mating",
      description: "Find the perfect match",
      emoji: "💝",
      comingSoon: true,
    },
    {
      icon: "content-cut",
      name: "Grooming",
      description: "Spa & styling",
      emoji: "✂️",
      comingSoon: true,
    },
    {
      icon: "stethoscope",
      name: "Vet Doctors",
      description: "Expert healthcare",
      emoji: "👨‍⚕️",
      comingSoon: true,
    },
  ];

  return (
    <View style={styles.section}>
      <Text style={styles.title}>
        Explore Our <Text style={styles.gradientText}>Services</Text>
      </Text>

      <Text style={styles.subtitle}>
        Everything your pet needs, all in one place
      </Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        {categories.map((item, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={0.9}
            onPress={() => handleCategoryPress(item)}
            style={[
              styles.card,
              {
                backgroundColor: commonBgColor,
                width: cardWidth,
                opacity: item.comingSoon ? 0.85 : 1,
              },
            ]}
          >
            <View style={styles.iconWrapper}>
              <LinearGradient colors={commonGradient} style={styles.iconBox}>
                <MaterialCommunityIcons
                  name={item.icon}
                  size={36}
                  color="#fff"
                />
              </LinearGradient>

              <Text style={styles.emoji}>{item.emoji}</Text>
            </View>

            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.desc}>{item.description}</Text>

            <LinearGradient
              colors={item.comingSoon ? ["#9ca3af", "#6b7280"] : commonGradient}
              style={styles.button}
            >
              <Text style={styles.buttonText}>
                {item.comingSoon ? "Coming Soon" : "Explore"}
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
