import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import { useTheme } from '../ThemeContext';

export default function HomeScreen() {
  const { isDarkMode } = useTheme();
  const [query, setQuery] = useState(""); // Input untuk pencarian makanan
  const [nutritionData, setNutritionData] = useState([]); // Data nutrisi dari API
  const [loading, setLoading] = useState(false); // Status loading
  const [selectedFood, setSelectedFood] = useState(null); // Menyimpan makanan yang dipilih

  // Fungsi untuk mencari data nutrisi menggunakan API
  const fetchNutritionData = async () => {
    if (!query) {
      Alert.alert("Error", "Mohon masukkan nama makanan untuk pencarian.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(`https://api.calorieninjas.com/v1/nutrition?query=${query}`, {
        headers: {
          'X-Api-Key': 'uITCzJ2OTCroLL5J7LBo5w==e2vK6GYHL8YBdNJQ',
        },
      });
      setNutritionData(response.data.items || []);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Gagal mengambil data nutrisi. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F9F9F9' }]}>
      <Text style={[styles.title, { color: isDarkMode ? 'white' : '#333' }]}>Search Nutritional Information</Text>

      {/* Search Bar */}
      <TextInput
        style={[styles.input, { backgroundColor: isDarkMode ? '#333' : 'white', color: isDarkMode ? 'white' : 'black' }]}
        placeholder="Masukkan makanan"
        placeholderTextColor={isDarkMode ? 'gray' : '#888'}
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Cari Nutrisi" onPress={fetchNutritionData} />

      {loading ? (
        <Text style={[styles.loadingText, { color: isDarkMode ? 'white' : '#666' }]}>Loading...</Text>
      ) : (
        <ScrollView>
          {nutritionData.length > 0 && (
            <View style={styles.table}>
              <View style={[styles.tableRow, { backgroundColor: isDarkMode ? '#333' : '#f1f1f1' }]}>
                <Text style={[styles.tableHeader, { color: isDarkMode ? 'white' : '#333' }]}>Food Name</Text>
              </View>

              {nutritionData.map((item, index) => (
                <View key={index}>
                  {/* Nama Makanan */}
                  <View
                    style={[styles.tableRow, { backgroundColor: index % 2 === 0 ? (isDarkMode ? '#444' : '#f9f9f9') : '#fff' }]}
                  >
                    <Text style={styles.tableCell}>{item.name}</Text>
                    <Button title="Detail" onPress={() => setSelectedFood(item)} />
                  </View>

                  {/* Detail Nutrisi */}
                  {selectedFood && selectedFood.name === item.name && (
                    <View style={styles.detailContainer}>
                      <Text style={[styles.detailTitle, { color: isDarkMode ? 'white' : '#333' }]}>Detail Nutrisi</Text>
                      <Text style={styles.detailText}>Name: {item.name}</Text>
                      <Text style={styles.detailText}>Calories: {item.calories}</Text>
                      <Text style={styles.detailText}>Serving Size: {item.serving_size_g}g</Text>
                      <Text style={styles.detailText}>Fat: {item.fat_total_g}g</Text>
                      <Text style={styles.detailText}>Carbs: {item.carbohydrates_total_g}g</Text>
                      <Text style={styles.detailText}>Protein: {item.protein_g}g</Text>
                      <Button title="Close" onPress={() => setSelectedFood(null)} />
                    </View>
                  )}
                </View>
              ))}
            </View>
          )}

          {nutritionData.length === 0 && !loading && (
            <Text style={[styles.noDataText, { color: isDarkMode ? 'white' : '#777' }]}>Tidak ada data yang ditemukan.</Text>
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  loadingText: {
    fontSize: 16,
    marginVertical: 10,
  },
  table: {
    flexDirection: 'column',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingHorizontal: 5,
    alignItems: 'center',
  },
  tableHeader: {
    flex: 1,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 14,
  },
  tableCell: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
  },
  noDataText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  detailContainer: {
    marginTop: 10,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailText: {
    fontSize: 16,
    marginBottom: 5,
  },
});
