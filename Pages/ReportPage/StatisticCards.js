import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StatCard from './StatCard';

const StatisticCards = ({ totalCustomers, totalRevenue, formatCurrency }) => {
  return (
    <View style={styles.statsContainer}>
      <StatCard 
        title="Tổng khách hàng"
        value={totalCustomers}
        icon="people"
        iconColor="#0066cc"
        cardStyle={styles.customersCard}
      />
      
      <StatCard 
        title="Tổng doanh thu"
        value={formatCurrency(totalRevenue)}
        icon="cash"
        iconColor="#28a745"
        cardStyle={styles.revenueCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'column',
    marginBottom: 16,
  },
  customersCard: {
    marginBottom: 16,
    borderLeftColor: '#0066cc',
    borderLeftWidth: 4,
  },
  revenueCard: {
    marginBottom: 16,
    borderLeftColor: '#28a745',
    borderLeftWidth: 4,
  },
});

export default StatisticCards;