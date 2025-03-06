import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  Modal, 
  ActivityIndicator,
  TextInput 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';

import { 
  fetchBillsByDay, 
  summarizeDailyBills 
} from '../../apis';

const BillManagementScreen = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [dateInput, setDateInput] = useState('');
  const [bills, setBills] = useState([]);
  const [dailySummary, setDailySummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showDateInputModal, setShowDateInputModal] = useState(false);
  const [showSummaryModal, setShowSummaryModal] = useState(false);

  const garageId = "65a4c1e2f4d2b41234abcd10"; // Replace with actual garage ID

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  const parseCustomDate = (dateString) => {
    // Validate and parse date string in YYYY-MM-DD format
    const regex = /^(\d{4})-(\d{2})-(\d{2})$/;
    const match = dateString.match(regex);
    
    if (match) {
      const year = parseInt(match[1]);
      const month = parseInt(match[2]) - 1; // Month is 0-indexed
      const day = parseInt(match[3]);
      
      const parsedDate = new Date(year, month, day);
      
      // Validate the date
      if (parsedDate.getFullYear() === year && 
          parsedDate.getMonth() === month && 
          parsedDate.getDate() === day) {
        return parsedDate;
      }
    }
    
    return null;
  };

  const fetchDailyBills = useCallback(async () => {
    setLoading(true);
    try {
      const formattedDate = formatDate(selectedDate);
      const fetchedBills = await fetchBillsByDay(garageId, formattedDate);
      setBills(fetchedBills);
    } catch (error) {
      console.error('Error fetching daily bills:', error);
      setBills([]);
    } finally {
      setLoading(false);
    }
  }, [selectedDate, garageId]);

  const handleSummarizeBills = async () => {
    setLoading(true);
    try {
      const formattedDate = formatDate(selectedDate);
      const summary = await summarizeDailyBills(garageId, formattedDate);
      setDailySummary(summary);
      setShowSummaryModal(true);
    } catch (error) {
      console.error('Error summarizing daily bills:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDailyBills();
  }, [fetchDailyBills]);

  const renderBillItem = ({ item }) => (
    <View style={styles.billItem}>
      <View style={styles.billHeader}>
        <Text style={styles.billCustomerName}>{item.customerName}</Text>
        <Text style={styles.billTotalAmount}>
          {new Intl.NumberFormat('vi-VN', { 
            style: 'currency', 
            currency: 'VND' 
          }).format(item.totalAmount)}
        </Text>
      </View>
      <View style={styles.billDetails}>
        <Text>Dịch vụ: {item.services.map(s => s.name).join(', ')}</Text>
        <Text>Trạng thái thanh toán: {item.paymentStatus}</Text>
      </View>
    </View>
  );

  const DateInputModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showDateInputModal}
      onRequestClose={() => setShowDateInputModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Nhập ngày (YYYY-MM-DD)</Text>
          <TextInput
            style={styles.dateInput}
            value={dateInput}
            onChangeText={setDateInput}
            placeholder="Nhập ngày (VD: 2024-03-05)"
            keyboardType="numeric"
          />
          <View style={styles.modalButtonContainer}>
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => {
                const parsedDate = parseCustomDate(dateInput);
                if (parsedDate) {
                  setSelectedDate(parsedDate);
                  setShowDateInputModal(false);
                } else {
                  alert('Ngày không hợp lệ. Vui lòng nhập theo định dạng YYYY-MM-DD');
                }
              }}
            >
              <Text style={styles.modalButtonText}>Xác nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.modalButton}
              onPress={() => setShowDateInputModal(false)}
            >
              <Text style={styles.modalButtonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );

  const DailySummaryModal = () => (
    <Modal
      animationType="slide"
      transparent={true}
      visible={showSummaryModal}
      onRequestClose={() => setShowSummaryModal(false)}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Tổng kết ngày</Text>
          {dailySummary && (
            <>
              <Text>Tổng số khách: {dailySummary.billSummary.totalCustomers}</Text>
              <Text>
                Tổng doanh thu: {new Intl.NumberFormat('vi-VN', { 
                  style: 'currency', 
                  currency: 'VND' 
                }).format(dailySummary.billSummary.totalRevenue)}
              </Text>
            </>
          )}
          <TouchableOpacity 
            style={styles.closeModalButton}
            onPress={() => setShowSummaryModal(false)}
          >
            <Text style={styles.closeModalButtonText}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dateHeader}>
        <TouchableOpacity 
          onPress={() => {
            const prevDate = new Date(selectedDate);
            prevDate.setDate(prevDate.getDate() - 1);
            setSelectedDate(prevDate);
          }}
        >
          <Icon name="chevron-back" size={30} color="#000" />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => setShowDateInputModal(true)}>
          <Text style={styles.dateText}>
            {selectedDate.toLocaleDateString('vi-VN')}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          onPress={() => {
            const nextDate = new Date(selectedDate);
            nextDate.setDate(nextDate.getDate() + 1);
            setSelectedDate(nextDate);
          }}
        >
          <Icon name="chevron-forward" size={30} color="#000" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.summaryButton}
          onPress={handleSummarizeBills}
        >
          <Text style={styles.summaryButtonText}>Tổng kết</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="#0066cc" />
      ) : (
        <FlatList
          data={bills}
          renderItem={renderBillItem}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={
            <Text style={styles.emptyListText}>Không có hóa đơn</Text>
          }
        />
      )}

      <DateInputModal />
      <DailySummaryModal />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  dateHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    elevation: 3,
  },
  dateText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  summaryButton: {
    backgroundColor: '#0066cc',
    padding: 8,
    borderRadius: 5,
  },
  summaryButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  billItem: {
    backgroundColor: 'white',
    padding: 15,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    elevation: 2,
  },
  billHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  billCustomerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  billTotalAmount: {
    color: '#0066cc',
    fontWeight: 'bold',
  },
  emptyListText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    width: '100%',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    backgroundColor: '#0066cc',
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeModalButton: {
    marginTop: 15,
    backgroundColor: '#0066cc',
    padding: 10,
    borderRadius: 5,
  },
  closeModalButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default BillManagementScreen;