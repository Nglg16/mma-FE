import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const screenWidth = Dimensions.get('window').width;

const ChartCard = ({ totalCustomers, totalRevenue }) => {
  const data = {
    labels: ['Khách hàng', 'Doanh thu'],
    datasets: [
      {
        data: [totalCustomers, totalRevenue],
      },
    ],
  };

  return (
    <View style={styles.card}>
      <Text style={styles.title}>Thống kê</Text>
      <BarChart
        data={data}
        width={screenWidth - 40}
        height={220}
        yAxisLabel=""
        chartConfig={{
          backgroundGradientFrom: '#fff',
          backgroundGradientTo: '#fff',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 102, 204, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 8,
          },
          barPercentage: 0.6,
        }}
        style={styles.chart}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  chart: {
    borderRadius: 8,
    marginTop: 10,
  },
});

export default ChartCard;
