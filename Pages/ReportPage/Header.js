import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Header = () => {
  return (
    <View style={styles.headerRow}>
      <Text style={styles.pageTitle}>
        <Ionicons name="bar-chart" size={24} color="#0066cc" style={styles.iconMargin} /> 
        Báo Cáo Thống Kê
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerRow: {
    marginBottom: 16,
  },
  pageTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconMargin: {
    marginRight: 8,
  },
});

export default Header;