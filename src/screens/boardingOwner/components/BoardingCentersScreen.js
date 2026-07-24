import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  useWindowDimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCenters } from "../services/boardingOwnerService";
import { Ionicons } from "@expo/vector-icons";
import styles from "../styles/BoardingCentersStyles";

export default function BoardingCentersScreen() {
  const navigation = useNavigation();
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  const { width } = useWindowDimensions();

  const numColumns = width >= 1200 ? 3 : width >= 768 ? 2 : 1;

  const cardWidth =
    numColumns === 1
      ? width - 32
      : numColumns === 2
        ? (width - 56) / 2
        : (width - 80) / 3;

  useEffect(() => {
    loadCenters();
  }, []);

  const loadCenters = async () => {
    try {
      const response = await getCenters();
      const data = response?.data || [];
      setCenters(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#6b21a8" />
        </View>
      </SafeAreaView>
    );
  }

  const renderCenter = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      style={{
        width: cardWidth,
        marginBottom: 16,
      }}
      onPress={() =>
        navigation.navigate("CenterDetails", {
          centerId: item.id,
        })
      }
    >
      <View style={styles.card}>
        <Image
          source={{
            uri:
              item.center_photos?.[0] || "https://via.placeholder.com/300x180",
          }}
          style={styles.image}
        />

        <View style={styles.infoSection}>
          <Text style={styles.centerName}>{item.center_name}</Text>
          <Text style={styles.location}>
            {item.city}, {item.state}
          </Text>
        </View>

        <View style={styles.button}>
          <Text style={styles.buttonText}>View More</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <FlatList
        data={centers}
        key={numColumns}
        numColumns={numColumns}
        renderItem={renderCenter}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        columnWrapperStyle={
          numColumns > 1
            ? {
                justifyContent: "space-between",
              }
            : undefined
        }
        ListHeaderComponent={
          <View style={styles.header}>
            <View style={styles.headerRow}>
              <Text style={styles.title}>Your Centers</Text>

              <TouchableOpacity
                style={styles.createButton}
                onPress={() => navigation.navigate("CreateCenter")}
              >
                <Ionicons name="add-circle-outline" size={18} color="#fff" />
                <Text style={styles.createButtonText}>Create</Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No centers found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
