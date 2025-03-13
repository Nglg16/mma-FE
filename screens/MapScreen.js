import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Menu, Divider, Provider } from "react-native-paper";
import { FontAwesome } from "@expo/vector-icons";

export default function MapScreen() {
  const [visible, setVisible] = useState(false);

  return (
    <Provider>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>Bản đồ</Text>

          {/* Dropdown menu */}
          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
              <TouchableOpacity onPress={() => setVisible(true)}>
                <FontAwesome name="user-circle" size={28} color="white" />
              </TouchableOpacity>
            }
            contentStyle={styles.menu}
          >
            <Menu.Item
              onPress={() => alert("Trang cá nhân")}
              title="Trang cá nhân"
            />
            <Menu.Item onPress={() => alert("Cài đặt")} title="Cài đặt" />
            <Divider />
            <Menu.Item onPress={() => alert("Đăng xuất")} title="Đăng xuất" />
          </Menu>
        </View>

        {/* Nội dung */}
        <View style={styles.content}>
          <Text style={styles.text}>Nội dung bản đồ</Text>
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  header: {
    height: 60,
    backgroundColor: "#007bff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10, // Để tránh bị che mất trên iOS
    elevation: 4, // Hiệu ứng đổ bóng trên Android
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  menu: {
    backgroundColor: "white",
    borderRadius: 8,
    elevation: 4,
  },
});
