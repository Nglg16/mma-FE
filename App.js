import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import GarageManagerPage from "./Pages/GarageManagerPage";
import MapScreen from "./screens/MapScreen";
import BookingPageManage from "./Pages/BookingPageManage/BookingPageManage";
import ReportPage from "./Pages/ReportPage/ReportPage";
import Schedule from "./Pages/SchedulePage/SchedulePage";
import BillManagementScreen from "./Pages/BillManager/BillManagementScreen";
// Add import for customer booking screen
import BookingScreen from "./screens/BookingScreen";
import Header from "./components/Header";
import HomePage from "./screens/HomePage";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack navigator for Home screens
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#6200ea" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ title: "Trang chủ", headerShown: false }}
      />
    </Stack.Navigator>
  );
}

// Stack navigator for Garage screens
function GarageStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: "#6200ea" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen
        name="GarageManager"
        component={GarageManagerPage}
        options={{ title: "Quản lý gara" }}
      />
      <Stack.Screen name="BookingPageManage" component={BookingPageManage} />
      <Stack.Screen name="Report" component={ReportPage} />
      <Stack.Screen name="Schedule" component={Schedule} />
      <Stack.Screen name="Bill" component={BillManagementScreen} />
    </Stack.Navigator>
  );
}

function HomeScreen() {
  return (
    <View style={{ flex: 1 }}> 
    <Header title="Trang chủ" />
  </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Home") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Garage") {
              iconName = focused ? "car" : "car-outline";
            } else if (route.name === "Map") {
              iconName = focused ? "map" : "map-outline";
            } else if (route.name === "Booking") {
              iconName = focused ? "calendar" : "calendar-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#6200ea",
          tabBarInactiveTintColor: "#8A94A6",
          tabBarStyle: {
            height: 60,
            paddingBottom: 10,
            backgroundColor: "#FFFFFF",
            borderTopWidth: 1,
            borderTopColor: "#F0F2F5",
          },
          headerShown: false,
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            title: "Trang chủ",
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="Booking"
          component={BookingScreen}
          options={{
            title: "Đặt lịch",

            headerStyle: { backgroundColor: "#6200ea" },
            headerTintColor: "#fff",
          }}
        />
        <Tab.Screen
          name="Garage"
          component={GarageStack}
          options={{
            title: "Gara",
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
            title: "Bản đồ",

            headerStyle: { backgroundColor: "#6200ea" },
            headerTintColor: "#fff",
            headerShown: false,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
