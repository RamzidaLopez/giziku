import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack'; // Import Stack Navigator
import { Octicons } from '@expo/vector-icons';
import { ThemeProvider, useTheme } from './ThemeContext';
import HomeScreen from './pages/HomeScreen';
import BMICalculatorScreen from './pages/BMICalculatorScreen';
import AboutScreen from './pages/AboutScreen';
import FoodListScreen from './pages/FoodListScreen';
import SettingsScreen from './pages/SettingsScreen';
import RecipeDetailScreen from './pages/RecipeDetailScreen'; // Import RecipeDetailScreen

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator(); // Inisialisasi Stack Navigator

// Stack navigator untuk Food List dan Recipe Detail
const FoodStack = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="FoodList"
      component={FoodListScreen}
      options={{ title: "Daftar Resep" }}
    />
    <Stack.Screen
      name="RecipeDetail"
      component={RecipeDetailScreen}
      options={{ title: "Detail Resep" }}
    />
  </Stack.Navigator>
);

const AppContent = () => {
  const { isDarkMode } = useTheme();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: isDarkMode ? "white" : "blue",
        tabBarInactiveTintColor: isDarkMode ? "gray" : "darkgray",
        tabBarStyle: {
          backgroundColor: isDarkMode ? "#333" : "white",
        },
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "BMI") iconName = "heart";
          else if (route.name === "Food") iconName = "book";
          else if (route.name === "About") iconName = "info";
          else if (route.name === "Settings") iconName = "gear";

          return <Octicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="BMI" component={BMICalculatorScreen} />
      <Tab.Screen name="Food" component={FoodStack}  // Menggunakan FoodStack untuk navigasi daftar resep dan detail resep
options={{ headerShown: false }} // Menyembunyikan header pada tab
      />
      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppContent /> {/* Menambahkan AppContent untuk mengatur navigasi */}
      </NavigationContainer>
    </ThemeProvider>
  );
}
