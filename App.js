import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GarageManagerPage from './Pages/GarageManagerPage';
import MapScreen from './screens/MapScreen';
import BookingPageManage from './Pages/BookingPageManage/BookingPageManage';
import ReportPage from './Pages/ReportPage/ReportPage';
import Schedule from './Pages/SchedulePage/SchedulePage';
import BillManagementScreen from './Pages/BillManager/BillManagementScreen';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GarageManage')}>
        <Text style={styles.buttonText}>GarageManage</Text>
      </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Map')}>
              <Text style={styles.buttonText}>Map</Text>
            </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: '#6200ea' },
          headerTintColor: '#fff',
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="GarageManage" component={GarageManagerPage} />
        <Stack.Screen name="Map" component={MapScreen} />
        <Stack.Screen name="BookingPageManage" component={BookingPageManage} />
        <Stack.Screen name="Report" component={ReportPage} />
        <Stack.Screen name="Schedule" component={Schedule} />
        <Stack.Screen name="Bill" component={BillManagementScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

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
