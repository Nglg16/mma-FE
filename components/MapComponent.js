import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Keyboard,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import polyline from "@mapbox/polyline";
import { getNearbyGarages } from "../apis";
import { Button } from "react-native";
import { Linking } from "react-native";
import { debounce } from "lodash"; // Nếu đã cài đặt lodash

export default function MapComponent() {
  const [location, setLocation] = useState(null);
  const [garages, setGarages] = useState([]);
  const [routeCoords, setRouteCoords] = useState([]);
  const [selectedGarage, setSelectedGarage] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // State cho chức năng tìm kiếm
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        if (isMounted) setErrorMsg("Quyền truy cập vị trí bị từ chối!");
        return;
      }

      try {
        let currentLocation = await Location.getCurrentPositionAsync({});
        if (isMounted) setLocation(currentLocation.coords);

        const garages = await getNearbyGarages(
          currentLocation.coords.latitude,
          currentLocation.coords.longitude
        );
        if (isMounted) setGarages(garages);
      } catch (error) {
        if (isMounted) setErrorMsg("Lỗi khi lấy dữ liệu: " + error.message);
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  // Tạo mảng tìm kiếm giả định cho việc gợi ý
  // Thay thế API Nominatim bằng dữ liệu giả
  const mockLocations = [
    { id: "1", name: "Hà Nội", latitude: 21.0285, longitude: 105.8542 },
    { id: "2", name: "Hồ Chí Minh", latitude: 10.8231, longitude: 106.6297 },
    { id: "3", name: "Đà Nẵng", latitude: 16.0544, longitude: 108.2022 },
    { id: "4", name: "Nha Trang", latitude: 12.2388, longitude: 109.1967 },
    { id: "5", name: "Huế", latitude: 16.4637, longitude: 107.5909 },
    { id: "6", name: "Hạ Long", latitude: 20.9591, longitude: 107.0466 },
    { id: "7", name: "Vũng Tàu", latitude: 10.346, longitude: 107.0843 },
    { id: "8", name: "Hội An", latitude: 15.8801, longitude: 108.338 },
    { id: "9", name: "Cần Thơ", latitude: 10.0452, longitude: 105.7469 },
    { id: "10", name: "Đà Lạt", latitude: 11.9404, longitude: 108.4583 },
    { id: "11", name: "Quy Nhơn", latitude: 13.7829, longitude: 109.2196 },
    { id: "12", name: "Phan Thiết", latitude: 10.9804, longitude: 108.2622 },
    { id: "13", name: "Phú Quốc", latitude: 10.2202, longitude: 103.9581 },
    { id: "14", name: "Sapa", latitude: 22.3364, longitude: 103.8438 },
    { id: "15", name: "Hà Giang", latitude: 22.8033, longitude: 104.9784 },
    { id: "16", name: "Ninh Bình", latitude: 20.2144, longitude: 105.9255 },
    { id: "17", name: "Lào Cai", latitude: 22.4934, longitude: 103.9756 },
    { id: "18", name: "Buôn Ma Thuột", latitude: 12.6667, longitude: 108.05 },
    { id: "19", name: "Pleiku", latitude: 13.9833, longitude: 108.0 },
    { id: "20", name: "Tây Ninh", latitude: 11.31, longitude: 106.1 },
  ];

  // Tìm kiếm địa điểm dựa trên dữ liệu giả
  const searchPlaces = (query) => {
    if (query.length < 2) {
      setSearchSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const lowerQuery = query.toLowerCase().trim();
    const filteredLocations = mockLocations.filter((location) =>
      location.name.toLowerCase().includes(lowerQuery)
    );

    setSearchSuggestions(filteredLocations);
    setShowSuggestions(true);
    setIsSearching(false);
  };

  // Debounce tìm kiếm để tránh gọi quá nhiều
  const debouncedSearch = useRef(
    debounce((text) => {
      searchPlaces(text);
    }, 300)
  ).current;

  // Xử lý thay đổi nội dung tìm kiếm
  const handleSearchChange = (text) => {
    setSearchQuery(text);
    setIsSearching(true);
    if (text.length > 1) {
      debouncedSearch(text);
    } else {
      setShowSuggestions(false);
      setIsSearching(false);
    }
  };

  // Xử lý khi người dùng chọn một địa điểm từ gợi ý
  const handleSelectPlace = async (place) => {
    setSearchQuery(place.name);
    setShowSuggestions(false);
    Keyboard.dismiss();

    // Di chuyển bản đồ đến vị trí đã chọn
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: place.latitude,
          longitude: place.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        },
        1000
      );
    }

    // Cập nhật vị trí hiện tại cho tìm kiếm gara gần đó
    const newLocation = {
      latitude: place.latitude,
      longitude: place.longitude,
    };
    setLocation(newLocation);

    // Tìm gara gần vị trí mới
    try {
      const nearbyGarages = await getNearbyGarages(
        place.latitude,
        place.longitude
      );
      setGarages(nearbyGarages);
    } catch (error) {
      setErrorMsg("Lỗi khi tìm gara gần đó: " + error.message);
    }
  };

  // Xử lý nút tìm kiếm
  const handleSearch = () => {
    if (searchQuery.length > 1) {
      const filteredLocations = mockLocations.filter((location) =>
        location.name.toLowerCase().includes(searchQuery.toLowerCase())
      );

      if (filteredLocations.length > 0) {
        handleSelectPlace(filteredLocations[0]);
      } else {
        Alert.alert("Thông báo", "Không tìm thấy địa điểm");
      }
    }
  };

  const openGoogleMaps = (destination) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination.latitude},${destination.longitude}&travelmode=driving`;
    Linking.openURL(url).catch((err) =>
      Alert.alert("Lỗi", "Không thể mở Google Maps")
    );
  };

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <Text style={styles.error}>{errorMsg}</Text>
      ) : location ? (
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {/* Hiển thị vị trí người dùng hoặc vị trí tìm kiếm */}
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Vị trí đã chọn"
            pinColor="blue"
          />

          {/* Hiển thị điểm sửa xe */}
          {garages.map((garage) => (
            <Marker
              key={garage._id}
              coordinate={{
                latitude: garage.latitude,
                longitude: garage.longitude,
              }}
              title={garage.name}
              description={garage.address}
              onPress={() => setSelectedGarage(garage)}
            />
          ))}

          {/* Hiển thị đường đi */}
          {routeCoords.length > 0 && (
            <Polyline
              coordinates={routeCoords}
              strokeWidth={4}
              strokeColor="red"
            />
          )}
        </MapView>
      ) : (
        <ActivityIndicator size="large" color="blue" />
      )}

      {/* Hiển thị thông tin điểm sửa xe được chọn */}
      {selectedGarage && (
        <View style={styles.infoBox}>
          <Image
            source={{ uri: selectedGarage.image }}
            style={styles.garageImage}
          />
          <Text style={styles.title}>{selectedGarage.name}</Text>

          {/* Hiển thị sao rating */}
          <View style={styles.ratingContainer}>
            {[...Array(Math.round(selectedGarage.rating || 0))].map(
              (_, index) => (
                <Text key={index} style={styles.star}>
                  ⭐
                </Text>
              )
            )}
          </View>

          <Text style={styles.address}>{selectedGarage.address}</Text>
          <Button
            title="Dẫn đường"
            onPress={() => openGoogleMaps(selectedGarage)}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  error: {
    color: "red",
    fontSize: 16,
    textAlign: "center",
    marginTop: 50,
  },
  infoBox: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: "center",
  },
  garageImage: {
    width: 120,
    height: 80,
    borderRadius: 8,
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 3,
    textAlign: "center",
  },
  address: {
    fontSize: 14,
    color: "gray",
    textAlign: "center",
    marginBottom: 5,
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 5,
  },
  star: {
    fontSize: 16,
    color: "gold",
  },
  // Style cho thanh tìm kiếm
  searchContainer: {
    position: "absolute",
    top: 10,
    left: 10,
    right: 10,
    flexDirection: "row",
    zIndex: 5,
  },
  searchInput: {
    flex: 1,
    height: 46,
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchButton: {
    width: 46,
    height: 46,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginLeft: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  searchButtonText: {
    fontSize: 20,
  },
  // Style cho danh sách gợi ý
  suggestionsContainer: {
    position: "absolute",
    top: 60,
    left: 10,
    right: 10,
    backgroundColor: "white",
    borderRadius: 8,
    maxHeight: 200,
    zIndex: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  suggestionText: {
    fontSize: 14,
  },
  loadingContainer: {
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginLeft: 10,
    color: "gray",
  },
});
