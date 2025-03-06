import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

function GarageManagerPage({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('BookingPageManage')}>
        <Text style={styles.buttonText}>Booking</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Report')}>
        <Text style={styles.buttonText}>Report</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Schedule')}>
        <Text style={styles.buttonText}>Schedule</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Bill')}>
        <Text style={styles.buttonText}>Bill</Text>
      </TouchableOpacity>
    </View>
  );
}

export default GarageManagerPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#6200ea',
    padding: 15,
    borderRadius: 10,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
