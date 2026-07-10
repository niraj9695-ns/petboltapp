import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getCenters } from "../services/boardingOwnerService";
import { Ionicons } from "@expo/vector-icons";

export default function BoardingCentersScreen() {
  const navigation = useNavigation();
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCenters();
  }, []);

  const loadCenters = async () => {
    try {
      const response = await getCenters();
      const data = response?.data || [];
      setCenters(data);
    } catch (error) {
      console.log(error);
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

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
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

        {centers.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No centers found</Text>
          </View>
        ) : (
          centers.map((center) => (
            <TouchableOpacity
              key={center.id}
              activeOpacity={0.85}
              onPress={() =>
                navigation.navigate("CenterDetails", {
                  centerId: center.id,
                })
              }
            >
              <View style={styles.card}>
                <Image
                  source={{
                    uri:
                      center.center_photos?.[0] ||
                      "https://via.placeholder.com/300x180",
                  }}
                  style={styles.image}
                />

                <View style={styles.infoSection}>
                  <Text style={styles.centerName}>{center.center_name}</Text>
                  <Text style={styles.location}>
                    {center.city}, {center.state}
                  </Text>

                </View>

                <View style={styles.button}>
                  <Text style={styles.buttonText}>View more</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = {
  safeArea: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  container: {
    flex: 1,
    backgroundColor: "#f8fafc",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 0,
    paddingBottom: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },
  createButton: {
    backgroundColor: "#6b21a8",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  createButtonText: {
    color: "#fff",
    fontWeight: "700",
  },
  emptyState: {
    padding: 30,
    alignItems: "center",
  },
  emptyText: {
    color: "#6b7280",
  },
  card: {
    backgroundColor: "#fff",
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    overflow: "hidden",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 180,
  },
  infoSection: {
    padding: 14,
  },
  centerName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  location: {
    marginTop: 4,
    color: "#6b7280",
  },
  price: {
    marginTop: 6,
    color: "#6b21a8",
    fontWeight: "700",
  },
  button: {
    backgroundColor: "#6b21a8",
    paddingVertical: 12,
    marginHorizontal: 14,
    marginBottom: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
};
