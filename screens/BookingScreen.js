// screens/BookingScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";

const BookingScreen = () => {
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [service, setService] = useState("");
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  const services = [
    "Bảo dưỡng định kỳ",
    "Thay dầu, lọc gió",
    "Sửa chữa động cơ",
    "Sửa chữa hệ thống điện",
    "Đồng sơn",
    "Nâng cấp phụ kiện",
  ];

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const onTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };

  const formatDate = (date) => {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const formatTime = (time) => {
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return `${hours}:${minutes < 10 ? "0" + minutes : minutes}`;
  };

  const handleCreateBooking = async () => {
    if (!customerName || !customerPhone || !service) {
      Alert.alert("Thông báo", "Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }

    try {
      setLoading(true);

      // Định dạng ngày: YYYY-MM-DD
      const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

      // Định dạng thời gian: HH:MM - (HH+1):MM
      const hours = time.getHours();
      const minutes = time.getMinutes();
      const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      const timeSlot = `${hours}:${formattedMinutes} - ${
        hours + 1
      }:${formattedMinutes}`;

      // Chuyển service từ string thành array (mảng chỉ có 1 phần tử)
      const serviceArray = [service];

      const bookingData = {
        customerName,
        customerPhone,
        customerEmail,
        service: serviceArray, // Đổi từ string sang array
        bookingDate: {
          date: formattedDate,
          timeSlot: timeSlot,
        },
        cancelReason: "", // Thêm trường này theo yêu cầu BE
      };

      console.log("Booking data:", bookingData);

      const response = await fetch("http://192.168.0.102:8017/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Error details:", errorText);
        throw new Error(
          `Server responded with status: ${response.status}. Details: ${errorText}`
        );
      }

      const result = await response.json();
      console.log("Server response:", result);

      setLoading(false);
      Alert.alert(
        "Thành công",
        "Đặt lịch thành công! Chúng tôi sẽ liên hệ xác nhận trong thời gian sớm nhất.",
        [
          {
            text: "OK",
            onPress: () => {
              // Reset form
              setCustomerName("");
              setCustomerPhone("");
              setCustomerEmail("");
              setService("");
              setDate(new Date());
              setTime(new Date());
            },
          },
        ]
      );
    } catch (error) {
      console.error("Error creating booking:", error);
      setLoading(false);
      Alert.alert(
        "Lỗi",
        `Đã xảy ra lỗi khi đặt lịch: ${error.message}. Vui lòng thử lại sau!`
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.stepIndicator}>
          <View style={styles.stepCircle}>
            <Text style={styles.stepNumber}>1</Text>
          </View>
          <Text style={styles.stepTitle}>Thông tin khách hàng</Text>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Họ và tên <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="person-outline"
              size={20}
              color="#8A94A6"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Nhập họ và tên"
              value={customerName}
              onChangeText={setCustomerName}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>
            Số điện thoại <Text style={styles.required}>*</Text>
          </Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="call-outline"
              size={20}
              color="#8A94A6"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Nhập số điện thoại"
              keyboardType="phone-pad"
              value={customerPhone}
              onChangeText={setCustomerPhone}
            />
          </View>
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.label}>Email</Text>
          <View style={styles.inputContainer}>
            <Ionicons
              name="mail-outline"
              size={20}
              color="#8A94A6"
              style={styles.inputIcon}
            />
            <TextInput
              style={styles.input}
              placeholder="Nhập email"
              keyboardType="email-address"
              value={customerEmail}
              onChangeText={setCustomerEmail}
            />
          </View>
        </View>

        <View style={styles.stepIndicator}>
          <View style={styles.stepCircle}>
            <Text style={styles.stepNumber}>2</Text>
          </View>
          <Text style={styles.stepTitle}>Chọn dịch vụ</Text>
        </View>

        <View style={styles.servicesContainer}>
          {services.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.serviceOption,
                service === item && styles.serviceOptionSelected,
              ]}
              onPress={() => setService(item)}
            >
              <Text
                style={[
                  styles.serviceOptionText,
                  service === item && styles.serviceOptionTextSelected,
                ]}
              >
                {item}
              </Text>
              {service === item && (
                <Ionicons name="checkmark-circle" size={20} color="#FF6B6B" />
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.stepIndicator}>
          <View style={styles.stepCircle}>
            <Text style={styles.stepNumber}>3</Text>
          </View>
          <Text style={styles.stepTitle}>Chọn thời gian</Text>
        </View>

        <View style={styles.dateTimeContainer}>
          <TouchableOpacity
            style={styles.dateTimePicker}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons
              name="calendar-outline"
              size={20}
              color="#8A94A6"
              style={styles.inputIcon}
            />
            <Text style={styles.dateTimeText}>{formatDate(date)}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.dateTimePicker}
            onPress={() => setShowTimePicker(true)}
          >
            <Ionicons
              name="time-outline"
              size={20}
              color="#8A94A6"
              style={styles.inputIcon}
            />
            <Text style={styles.dateTimeText}>{formatTime(time)}</Text>
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onDateChange}
            minimumDate={new Date()}
          />
        )}

        {showTimePicker && (
          <DateTimePicker
            value={time}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}

        <View style={styles.noteContainer}>
          <Ionicons
            name="information-circle-outline"
            size={24}
            color="#FF6B6B"
          />
          <Text style={styles.noteText}>
            Lưu ý: Garage mở cửa từ 8:00 - 18:00 hàng ngày. Vui lòng đặt lịch
            trước ít nhất 24 giờ.
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.bookingButton,
            loading && styles.bookingButtonDisabled,
          ]}
          onPress={handleCreateBooking}
          disabled={loading}
        >
          {loading ? (
            <Text style={styles.bookingButtonText}>Đang xử lý...</Text>
          ) : (
            <Text style={styles.bookingButtonText}>Đặt lịch ngay</Text>
          )}
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FC",
  },
  content: {
    padding: 20,
  },
  stepIndicator: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
  },
  stepCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#FF6B6B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  stepNumber: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4A4A4A",
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#4A4A4A",
    marginBottom: 8,
  },
  required: {
    color: "#FF6B6B",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E4EC",
  },
  inputIcon: {
    paddingHorizontal: 12,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 14,
    color: "#4A4A4A",
  },
  servicesContainer: {
    marginBottom: 16,
  },
  serviceOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E0E4EC",
  },
  serviceOptionSelected: {
    borderColor: "#FF6B6B",
    backgroundColor: "#FFF0F0",
  },
  serviceOptionText: {
    fontSize: 14,
    color: "#4A4A4A",
  },
  serviceOptionTextSelected: {
    color: "#FF6B6B",
    fontWeight: "600",
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  dateTimePicker: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E0E4EC",
    padding: 12,
    width: "48%",
  },
  dateTimeText: {
    fontSize: 14,
    color: "#4A4A4A",
  },
  noteContainer: {
    flexDirection: "row",
    backgroundColor: "#FFF0F0",
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
  },
  noteText: {
    fontSize: 14,
    color: "#4A4A4A",
    marginLeft: 12,
    flex: 1,
  },
  bookingButton: {
    backgroundColor: "#FF6B6B",
    borderRadius: 8,
    padding: 16,
    alignItems: "center",
  },
  bookingButtonDisabled: {
    backgroundColor: "#CCCCCC",
  },
  bookingButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default BookingScreen;
