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
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { width } = useWindowDimensions();

  const numColumns = width >= 1000 ? 3 : width >= 600 ? 2 : 1;
  const spacing = 16;

  const cardWidth =
    numColumns === 1
      ? Math.min(width - 32, 500)
      : numColumns === 2
        ? Math.min((width - 64) / 2, 420)
        : Math.min((width - 96) / 3, 360);

  useEffect(() => {
    setCurrentPage(1);
    setTotalPages(1);
    fetchCenters(1, false);
  }, [city, type]);

  const fetchCenters = async (pageToLoad = 1, append = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }

      const result = await fetchBoardingCentersApi(city, type, pageToLoad, 20);
      const nextCenters = Array.isArray(result?.centers)
        ? result.centers
        : [];
      const pagination = result?.pagination || {};

      setCenters((prevCenters) =>
        append ? [...prevCenters, ...nextCenters] : nextCenters,
      );
      setCurrentPage(Number(pagination.page || pageToLoad));
      setTotalPages(Number(pagination.total_pages || 1));
    } catch (error) {
      if (!append) {
        setCenters([]);
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const hasMorePages = currentPage < totalPages;

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
          ListFooterComponent={
            hasMorePages ? (
              <View style={styles.paginationFooter}>
                <TouchableOpacity
                  style={styles.nextPageButton}
                  onPress={() => fetchCenters(currentPage + 1, true)}
                  disabled={loadingMore}
                >
                  {loadingMore ? (
                    <ActivityIndicator size="small" color="#ffffff" />
                  ) : (
                    <Text style={styles.nextPageButtonText}>
                      Next Page {currentPage + 1}
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
            ) : null
          }
        />
      )}
    </View>
  );
}
