import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView , ActivityIndicator} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FilterCard from './FilterCard';
import StatisticCards from './StatisticCards';
import ChartCard from './ChartCard';
import { fetchStatisticsByDay, fetchStatisticsByMonth, fetchStatisticsByYear } from '../../apis';
import Header from './Header';

const ReportPage = () => {
  const [date, setDate] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [viewMode, setViewMode] = useState('day');
  const garageId = "65dbe7f2f1a2c8b4e9e4d1a1";

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      let response;
      if (viewMode === 'day' && date) {
        response = await fetchStatisticsByDay(garageId, date);
      } else if (viewMode === 'month' && month && year) {
        response = await fetchStatisticsByMonth(garageId, year, month);
      } else if (viewMode === 'year' && year) {
        response = await fetchStatisticsByYear(garageId, year);
      }
      setData(response);
    } catch (error) {
      console.error('Error fetching statistics:', error);
    } finally {
      setLoading(false);
    }
  }, [garageId, viewMode, date, month, year]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header />
        
        <FilterCard 
          viewMode={viewMode}
          setViewMode={setViewMode}
          date={date}
          setDate={setDate}
          month={month}
          setMonth={setMonth}
          year={year}
          setYear={setYear}
          fetchData={fetchData}
          loading={loading}
        />

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0066cc" />
            <Text style={styles.loadingText}>Đang tải...</Text>
          </View>
        ) : (
          data && (
            <View style={styles.contentContainer}>
              <StatisticCards 
                totalCustomers={data.totalCustomers || 0} 
                totalRevenue={data.totalRevenue || 0}
                formatCurrency={formatCurrency}
              />
              
              <ChartCard 
                totalCustomers={data.totalCustomers || 0}
                totalRevenue={data.totalRevenue || 0}
              />
            </View>
          )
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContainer: {
    padding: 16,
  },
  contentContainer: {
    marginTop: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  loadingText: {
    marginTop: 10,
    color: '#0066cc',
    fontSize: 16,
  }
});

export default ReportPage;