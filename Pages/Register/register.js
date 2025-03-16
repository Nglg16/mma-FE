import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
} from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { API_ROOT } from "../../utilities/constants";

const RegisterForm = ({ navigation: propNavigation }) => {
  const navigation = propNavigation || useNavigation();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Xử lý đăng ký
  const handleRegister = async () => {
    // Xác thực dữ liệu nhập
    if (!fullName || !email || !phone || !password || !confirmPassword) {
      setError("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }

    // Xác thực định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Email không hợp lệ!");
      return;
    }

    // Xác thực số điện thoại
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setError("Số điện thoại không hợp lệ (cần 10 chữ số)!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${API_ROOT}/auth/register`, {
        fullName,
        email,
        phone,
        password,
        role: "customer", // Mặc định là khách hàng
      });

      console.log("Phản hồi từ API:", response.data);

      Alert.alert(
        "Đăng ký thành công",
        "Tài khoản của bạn đã được tạo thành công. Vui lòng đăng nhập.",
        [
          {
            text: "OK",
            onPress: () => navigation.navigate("LoginScreen"),
          },
        ]
      );
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      let errorMessage = "Đã xảy ra lỗi server";

      if (error.response) {
        errorMessage =
          error.response.data.message || `Lỗi: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = "Không thể kết nối đến server. Vui lòng kiểm tra mạng!";
      } else {
        errorMessage = error.message;
      }

      setError(errorMessage);
      Alert.alert("Lỗi", errorMessage);
    }

    setLoading(false);
  };

  return (
    <ImageBackground
      source={{
        uri: "https://inkythuatso.com/uploads/thumbnails/800/2022/05/5516600-17-13-55-32.jpg",
      }}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.logoContainer}>
          <Text style={styles.logoText}>Carcare</Text>
          <Text style={styles.premiumText}>PREMIUM</Text>
        </View>

        <Text style={styles.titleText}>Đăng ký tài khoản</Text>

        {error && <Text style={styles.errorMessage}>{error}</Text>}

        <TextInput
          style={styles.input}
          placeholder="Họ và tên"
          value={fullName}
          onChangeText={setFullName}
          placeholderTextColor="#A9A9A9"
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#A9A9A9"
        />

        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          placeholderTextColor="#A9A9A9"
        />

        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#A9A9A9"
        />

        <TextInput
          style={styles.input}
          placeholder="Xác nhận mật khẩu"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholderTextColor="#A9A9A9"
        />

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>ĐĂNG KÝ</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.loginText}>Đã có tài khoản? Đăng nhập ngay</Text>
        </TouchableOpacity>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logoContainer: {
    marginBottom: 30,
    alignItems: "center",
  },
  logoText: {
    fontSize: 42,
    fontWeight: "bold",
    color: "#FFD700", // Màu vàng gold
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  premiumText: {
    fontSize: 16,
    color: "#FFD700",
    fontWeight: "500",
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFD700",
    marginBottom: 20,
  },
  input: {
    height: 50,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingLeft: 15,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
    borderColor: "#FFD700",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  errorMessage: {
    color: "#FF4C4C",
    marginBottom: 10,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "bold",
  },
  registerButton: {
    width: "90%",
    height: 50,
    backgroundColor: "#FF8C00",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  loginText: {
    color: "#FFD700",
    fontSize: 16,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "500",
  },
});

export default RegisterForm;
