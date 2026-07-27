import React from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import dogGalleryStyles from "../styles/DogGalleryStyles";

export default function DogGallery() {
  const services = [
    {
      title: "Happy Stay",
      desc: "Comfortable and stress-free boarding experience.",
      img: "https://images.unsplash.com/photo-1558788353-f76d92427f16",
    },
    {
      title: "Play Time",
      desc: "Fun activities to keep dogs active and social.",
      img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e",
    },
    {
      title: "Bath & Groom",
      desc: "Keeping your furry friend fresh & clean.",
      img: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d",
    },
    {
      title: "Training Moments",
      desc: "Learning basic to advanced commands.",
      img: "https://images.unsplash.com/photo-1507146426996-ef05306b995a",
    },
    {
      title: "Outdoor Walks",
      desc: "Daily walks for a healthy lifestyle.",
      img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b",
    },
    {
      title: "Cuddle Time",
      desc: "Lots of love and attention ❤️",
      img: "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2",
    },
    {
      title: "Social Fun",
      desc: "Dogs making new furry friends.",
      img: "https://images.unsplash.com/photo-1517849845537-4d257902454a",
    },
  ];

  return (
    <View style={dogGalleryStyles.section}>
      {/* Heading */}
      <Text style={dogGalleryStyles.title}>
        <Text style={{ color: "#6b21a8" }}>Happy Dogs Gallery</Text>
      </Text>

      <Text style={dogGalleryStyles.subtitle}>
        Real moments from our boarding & care 🐾
      </Text>

      {/* Horizontal Carousel */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={dogGalleryStyles.scroll}
      >
        {services.map((item, index) => (
          <TouchableOpacity key={index} style={dogGalleryStyles.card}>
            {/* Image */}
            <Image source={{ uri: item.img }} style={dogGalleryStyles.image} />

            {/* Content */}
            <View style={dogGalleryStyles.content}>
              <Text style={dogGalleryStyles.name}>{item.title}</Text>
              <Text style={dogGalleryStyles.desc}>{item.desc}</Text>

              <Text style={dogGalleryStyles.link}>View More →</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}