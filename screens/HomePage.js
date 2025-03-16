// screens/HomePage.js
import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import Header from "../components/Header";

const ServiceCard = ({ icon, title, description }) => (
  <TouchableOpacity style={styles.serviceCard}>
    <View style={styles.serviceIconContainer}>
      <Ionicons name={icon} size={28} color="#FF6B6B" />
    </View>
    <Text style={styles.serviceTitle}>{title}</Text>
    <Text style={styles.serviceDescription}>{description}</Text>
  </TouchableOpacity>
);

const PromotionCard = ({ image, title }) => (
  <TouchableOpacity style={styles.promotionCard}>
    <Image source={image} style={styles.promotionImage} />
    <Text style={styles.promotionTitle}>{title}</Text>
  </TouchableOpacity>
);

const HomePage = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.heroSection}>
        <Image
          source={{ uri: "https://via.placeholder.com/400x200" }}
          style={styles.heroImage}
        />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>Chăm sóc xe chuyên nghiệp</Text>
          <Text style={styles.heroSubtitle}>Đặt lịch ngay hôm nay</Text>
          <TouchableOpacity
            style={styles.heroButton}
            onPress={() => navigation.navigate("Booking")}
          >
            <Text style={styles.heroButtonText}>Đặt lịch ngay</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Services Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Dịch vụ của chúng tôi</Text>
        <View style={styles.servicesGrid}>
          <ServiceCard
            icon="car-outline"
            title="Bảo dưỡng xe"
            description="Bảo dưỡng định kỳ, thay dầu, lọc gió"
          />
          <ServiceCard
            icon="construct-outline"
            title="Sửa chữa"
            description="Sửa chữa động cơ, hệ thống điện"
          />
          <ServiceCard
            icon="color-palette-outline"
            title="Đồng sơn"
            description="Sơn xe, sửa chữa thân vỏ"
          />
          <ServiceCard
            icon="car-sport-outline"
            title="Nâng cấp xe"
            description="Nâng cấp phụ kiện, âm thanh"
          />
        </View>
      </View>

      {/* Promotions */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Khuyến mãi đặc biệt</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.promotionsScroll}
        >
          <PromotionCard
            image={{ uri: "https://via.placeholder.com/200x120" }}
            title="Giảm 20% bảo dưỡng định kỳ"
          />
          <PromotionCard
            image={{ uri: "https://via.placeholder.com/200x120" }}
            title="Miễn phí kiểm tra 10 điểm"
          />
          <PromotionCard
            image={{ uri: "https://via.placeholder.com/200x120" }}
            title="Rửa xe miễn phí trọn đời"
          />
        </ScrollView>
      </View>

      {/* About Section */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Về Garage Ô Tô An Phát</Text>
        <Text style={styles.aboutText}>
          Garage Ô Tô An Phát tự hào là đơn vị chăm sóc và bảo dưỡng xe hơi hàng
          đầu với đội ngũ kỹ thuật viên chuyên nghiệp và trang thiết bị hiện
          đại. Chúng tôi cam kết mang đến dịch vụ chất lượng cao với giá cả phải
          chăng.
        </Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>10+</Text>
            <Text style={styles.statLabel}>Năm kinh nghiệm</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>5000+</Text>
            <Text style={styles.statLabel}>Khách hàng</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>20+</Text>
            <Text style={styles.statLabel}>Kỹ thuật viên</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FC",
  },
  heroSection: {
    position: "relative",
    height: 200,
    marginBottom: 20,
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
    padding: 20,
    justifyContent: "center",
  },
  heroTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  heroSubtitle: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 16,
  },
  heroButton: {
    backgroundColor: "#FF6B6B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  heroButtonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  sectionContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A4A4A",
    marginBottom: 16,
  },
  servicesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  serviceCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    width: "48%",
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  serviceIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFF0F0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  serviceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4A4A4A",
    marginBottom: 6,
  },
  serviceDescription: {
    fontSize: 12,
    color: "#8A94A6",
  },
  promotionsScroll: {
    flexDirection: "row",
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  promotionCard: {
    width: 200,
    marginRight: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  promotionImage: {
    width: "100%",
    height: 120,
  },
  promotionTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#4A4A4A",
    padding: 12,
  },
  aboutText: {
    fontSize: 14,
    color: "#8A94A6",
    lineHeight: 22,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FF6B6B",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#8A94A6",
  },
});

export default HomePage;
