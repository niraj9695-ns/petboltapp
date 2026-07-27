import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import styles from "../styles/CategoriesStyles";

export default function Categories() {
  const { width } = useWindowDimensions();

  const cardWidth = width >= 1200 ? 320 : width >= 768 ? 280 : width * 0.72;

  const categories = [
    {
      icon: "home-outline",
      name: "Boarding",
      description: "Safe & cozy stays",
      gradient: ["#fb923c", "#ea580c"],
      bgColor: "#fff7ed",
      emoji: "🏠",
    },
    {
      icon: "heart-outline",
      name: "Adoption",
      description: "Find your best friend",
      gradient: ["#f472b6", "#db2777"],
      bgColor: "#fdf2f8",
      emoji: "🐕",
    },
    {
      icon: "shopping",
      name: "Buy & Sell",
      description: "Quality pet supplies",
      gradient: ["#c084fc", "#9333ea"],
      bgColor: "#faf5ff",
      emoji: "🛍️",
    },
    {
      icon: "account-group-outline",
      name: "Mating",
      description: "Find the perfect match",
      gradient: ["#60a5fa", "#2563eb"],
      bgColor: "#eff6ff",
      emoji: "💝",
    },
    {
      icon: "content-cut",
      name: "Grooming",
      description: "Spa & styling",
      gradient: ["#2dd4bf", "#0d9488"],
      bgColor: "#f0fdfa",
      emoji: "✂️",
    },
    {
      icon: "stethoscope",
      name: "Vet Doctors",
      description: "Expert healthcare",
      gradient: ["#818cf8", "#4f46e5"],
      bgColor: "#eef2ff",
      emoji: "👨‍⚕️",
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
            style={[
              styles.card,
              {
                backgroundColor: item.bgColor,
                width: cardWidth,
              },
            ]}
          >
            <View style={styles.iconWrapper}>
              <LinearGradient colors={item.gradient} style={styles.iconBox}>
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

            <LinearGradient colors={item.gradient} style={styles.button}>
              <Text style={styles.buttonText}>Explore</Text>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
