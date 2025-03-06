import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';

const FilterCard = ({ 
  viewMode, 
  setViewMode, 
  date, 
  setDate, 
  month, 
  setMonth, 
  year, 
  setYear, 
  fetchData, 
  loading 
}) => {
  return (
    <View style={styles.filterCard}>
      {/* Chế độ xem */}
      <View style={styles.formGroup}>
        <Text style={styles.filterLabel}>Chọn chế độ xem</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={viewMode}
            onValueChange={setViewMode}
            style={styles.picker}
          >
            <Picker.Item label="Thống kê theo ngày" value="day" />
            <Picker.Item label="Thống kê theo tháng" value="month" />
            <Picker.Item label="Thống kê theo năm" value="year" />
          </Picker>
        </View>
      </View>

      {/* Chọn ngày (Nhập tay) */}
      {viewMode === 'day' && (
        <View style={styles.formGroup}>
          <Text style={styles.filterLabel}>
            <Ionicons name="calendar" size={18} style={styles.iconMargin} /> 
            Chọn ngày
          </Text>
          <TextInput
            style={styles.textInput}
            value={date}
            onChangeText={setDate}
            placeholder="YYYY-MM-DD"
            keyboardType="numeric"
          />
        </View>
      )}

      {/* Chọn tháng */}
      {viewMode === 'month' && (
        <View style={styles.rowContainer}>
          <View style={[styles.formGroup, styles.halfWidth]}>
            <Text style={styles.filterLabel}>Chọn năm</Text>
            <TextInput
              style={styles.textInput}
              value={year || ''}
              onChangeText={setYear}
              keyboardType="numeric"
              placeholder="YYYY"
            />
          </View>
          <View style={[styles.formGroup, styles.halfWidth]}>
            <Text style={styles.filterLabel}>Chọn tháng</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={month}
                onValueChange={setMonth}
                style={styles.picker}
              >
                <Picker.Item label="Chọn tháng" value="" />
                {Array.from({ length: 12 }, (_, i) => (
                  <Picker.Item key={i + 1} label={`Tháng ${i + 1}`} value={`${i + 1}`} />
                ))}
              </Picker>
            </View>
          </View>
        </View>
      )}

      {/* Chọn năm */}
      {viewMode === 'year' && (
        <View style={styles.formGroup}>
          <Text style={styles.filterLabel}>Chọn năm</Text>
          <TextInput
            style={styles.textInput}
            value={year || ''}
            onChangeText={setYear}
            keyboardType="numeric"
            placeholder="YYYY"
          />
        </View>
      )}

      {/* Nút tìm kiếm */}
      <TouchableOpacity 
        style={[styles.searchButton, loading && styles.disabledButton]}
        onPress={fetchData}
        disabled={loading}
      >
        {loading ? (
          <View style={styles.buttonContent}>
            <ActivityIndicator size="small" color="#fff" style={styles.spinnerMargin} />
            <Text style={styles.buttonText}>Đang tải...</Text>
          </View>
        ) : (
          <Text style={styles.buttonText}>Tìm kiếm</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  filterCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  formGroup: {
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
    color: '#333',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    backgroundColor: '#f9f9f9',
  },
  picker: {
    height: 50,
    width: '100%',
  },
  textInput: {
    backgroundColor: '#fff',
    height: 50,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfWidth: {
    width: '48%',
  },
  searchButton: {
    backgroundColor: '#0066cc',
    borderRadius: 4,
    padding: 14,
    alignItems: 'center',
    marginTop: 8,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  spinnerMargin: {
    marginRight: 8,
  },
  iconMargin: {
    marginRight: 6,
  },
});

export default FilterCard;
