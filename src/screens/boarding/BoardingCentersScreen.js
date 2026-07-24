import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./boardingStyles";

export default function BoardingCentersScreen({ navigation, route }) {
  const city = route?.params?.city || "";
  const type = route?.params?.type || "";

  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCenters();
  }, [city, type]);

  const fetchCenters = async () => {
    try {
      setLoading(true);

      const queryParams = new URLSearchParams();

      if (city) {
        queryParams.append("city", city);
      }

      if (type) {
        queryParams.append("type", type);
      }

      const url = `https://www.cgpisoftware.com/cheerytail/api/boarding/list?${queryParams.toString()}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data?.status === "success") {
        setCenters(data.data || []);
      } else {
        setCenters([]);
      }
    } catch (error) {
      setCenters([]);
    } finally {
      setLoading(false);
    }
  };

  const renderCenter = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() =>
        navigation.navigate("BoardingDetails", {
          centerId: item.id,
        })
      }
    >
      <LinearGradient
        colors={["#fff7ed", "#ffffff", "#f5f3ff"]}
        style={styles.card}
      >
        <Image
          source={{
            uri: item.images?.[0] || "https://via.placeholder.com/300x200",
          }}
          style={styles.image}
        />

        <View style={styles.content}>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>
              {item.center_type?.toUpperCase()}
            </Text>
          </View>

          <Text style={styles.title}>{item.center_name}</Text>

          <Text style={styles.desc} numberOfLines={2}>
            {item.description}
          </Text>

          <View style={styles.infoRow}>
            <Text style={styles.label}>📍 {item.city}</Text>

            <Text style={styles.price}>₹ {item.price_per_day}/day</Text>
          </View>

          <TouchableOpacity
            style={styles.primaryBtn}
            onPress={() =>
              navigation.navigate("BoardingDetails", {
                centerId: item.id,
              })
            }
          >
            <Text style={styles.primaryBtnText}>View Details</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#f97316" />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      {centers.length === 0 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            marginTop: 80,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#666",
            }}
          >
            No boarding centers found
          </Text>
        </View>
      ) : (
        <FlatList
          data={centers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderCenter}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 30,
          }}
        />
      )}
    </View>
  );
}
