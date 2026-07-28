import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "../styles/BoardingCentersScreen";
import CenterCard from "./CenterCard";
import { fetchBoardingCentersApi } from "../services/boardingService";
import { LinearGradient } from "expo-linear-gradient";

export default function BoardingCentersScreen({ navigation, route }) {
  const city = route?.params?.city || "";
  const type = route?.params?.type || "";

  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { width } = useWindowDimensions();

  const numColumns = width >= 1200 ? 3 : width >= 768 ? 2 : 1;
  const spacing = 16;

  const cardWidth =
    numColumns === 1
      ? width - 32
      : numColumns === 2
        ? (width - 56) / 2
        : (width - 80) / 3;

  useEffect(() => {
    setCurrentPage(1);
    setTotalPages(1);
    fetchCenters(1);
  }, [city, type]);

  const fetchCenters = async (pageToLoad = 1) => {
    try {
      setLoading(true);

      const result = await fetchBoardingCentersApi(city, type, pageToLoad, 20);
      const nextCenters = Array.isArray(result?.centers) ? result.centers : [];
      const pagination = result?.pagination || {};

      setCenters(nextCenters);
      setCurrentPage(Number(pagination.page || pageToLoad));
      setTotalPages(Number(pagination.total_pages || 1));
    } catch (error) {
      setCenters([]);
      setCurrentPage(1);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages || page === currentPage) return;
    fetchCenters(page);
  };

  const renderCenter = ({ item }) => (
    <CenterCard
      item={item}
      cardWidth={cardWidth}
      onPress={() =>
        navigation.navigate("BoardingDetails", { centerId: item.id })
      }
      onViewDetails={() =>
        navigation.navigate("BoardingDetails", { centerId: item.id })
      }
    />
  );

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);

    for (let page = startPage; page <= endPage; page += 1) {
      pages.push(page);
    }

    return (
      <View style={styles.paginationFooter}>
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
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#6b21a8" />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>
      {/* HEADER */}
      <LinearGradient
        colors={["#ffffff", "#f8fafc"]}
        style={styles.headerSection}
      >
        <View style={styles.headerContent}>
          <View>
            <Text style={styles.headerTitle}>Boarding Centers</Text>
            <Text style={styles.headerSubtitle}>
              Find the perfect place for your pet
            </Text>
          </View>
          <View style={styles.centerCountBadge}>
            <MaterialCommunityIcons
              name="home-heart"
              size={20}
              color="#6b21a8"
            />
            <Text style={styles.centerCountText}>{centers.length}</Text>
          </View>
        </View>

        {/* FILTER INFO */}
        {(city || type) && (
          <View style={styles.filterChipsContainer}>
            {city && (
              <View style={styles.filterChip}>
                <MaterialCommunityIcons
                  name="map-marker"
                  size={14}
                  color="#6b21a8"
                />
                <Text style={styles.filterChipText}>{city}</Text>
              </View>
            )}
            {type && (
              <View style={styles.filterChip}>
                <MaterialCommunityIcons name="tag" size={14} color="#6b21a8" />
                <Text style={styles.filterChipText}>{type.toUpperCase()}</Text>
              </View>
            )}
          </View>
        )}
      </LinearGradient>

      {centers.length === 0 ? (
        <View style={styles.emptyStateContainer}>
          <MaterialCommunityIcons
            name="home-search"
            size={64}
            color="#d1d5db"
          />
          <Text style={styles.emptyStateText}>No boarding centers found</Text>
          <Text style={styles.emptyStateSubtext}>
            Try adjusting your search criteria
          </Text>
        </View>
      ) : (
        <FlatList
          data={centers}
          key={numColumns}
          numColumns={numColumns}
          renderItem={renderCenter}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.listContent}
          columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
          showsVerticalScrollIndicator={false}
          ListFooterComponent={renderPagination()}
        />
      )}
    </View>
  );
}
