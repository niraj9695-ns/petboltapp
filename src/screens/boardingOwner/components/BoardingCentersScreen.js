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
import { useRefresh } from "../../../context/RefreshContext";
import styles from "../styles/BoardingCentersStyles";

export default function BoardingCentersScreen() {
  const navigation = useNavigation();
  const { refreshKey } = useRefresh();
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  const { width } = useWindowDimensions();

  const numColumns = width >= 1200 ? 3 : width >= 768 ? 2 : 1;

  const cardWidth =
    numColumns === 1
      ? width - 32
      : numColumns === 2
        ? (width - 56) / 2
        : (width - 80) / 3;

  useEffect(() => {
    loadCenters(1);
  }, [refreshKey]);

  const loadCenters = async (page = 1) => {
    try {
      setLoading(true);
      const response = await getCenters(page, 20);
      const payload = response?.data || response || {};
      const data = Array.isArray(payload?.data)
        ? payload.data
        : Array.isArray(payload) ? payload : [];
      const pagination = payload?.pagination || {};

      setCenters(data);
      setCurrentPage(Number(pagination?.page || page || 1));
      setTotalPages(Number(pagination?.total_pages || 1));
      setTotalItems(Number(pagination?.total || data.length || 0));
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    loadCenters(page);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let page = startPage; page <= endPage; page += 1) {
      pages.push(page);
    }

    return (
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          style={styles.paginationButton}
          onPress={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <Text style={styles.paginationButtonText}>Prev</Text>
        </TouchableOpacity>

        {pages.map((page) => (
          <TouchableOpacity
            key={page}
            style={[
              styles.pageNumberButton,
              currentPage === page && styles.activePageNumberButton,
            ]}
            onPress={() => goToPage(page)}
          >
            <Text
              style={[
                styles.pageNumberButtonText,
                currentPage === page && styles.activePageNumberButtonText,
              ]}
            >
              {page}
            </Text>
          </TouchableOpacity>
        ))}

        <TouchableOpacity
          style={styles.paginationButton}
          onPress={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <Text style={styles.paginationButtonText}>Next</Text>
        </TouchableOpacity>
      </View>
    );
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

            <Text style={styles.summaryText}>
              Showing {centers.length} of {totalItems} centers
            </Text>
          </View>
        }
        ListFooterComponent={renderPagination()}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No centers found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
