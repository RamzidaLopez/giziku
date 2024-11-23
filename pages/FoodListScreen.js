import React, { useState } from "react";
import { View, Text, TextInput, Button, FlatList, StyleSheet, TouchableOpacity, Alert } from "react-native";
import axios from "axios";
import { useTheme } from "../ThemeContext";
import { useNavigation } from "@react-navigation/native";

export default function FoodListScreen() {
  const { isDarkMode } = useTheme();
  const navigation = useNavigation();
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchRecipes = async () => {
    if (!query.trim()) {
      Alert.alert("Error", "Mohon masukkan nama makanan untuk pencarian!");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${query}&apiKey=a46a6ac33aa644caa9785ae73d2787d4`
      );

      if (response.data.results && response.data.results.length > 0) {
        setRecipes(response.data.results);
      } else {
        setRecipes([]);
        Alert.alert("Tidak ditemukan", "Tidak ada resep yang sesuai dengan pencarian Anda.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Gagal mengambil data dari API. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? "#121212" : "#F9F9F9" }]}>
      <Text style={[styles.title, { color: isDarkMode ? "white" : "#333" }]}>Cari Resep Makanan</Text>

      <TextInput
        style={[styles.input, { backgroundColor: isDarkMode ? "#333" : "white", color: isDarkMode ? "white" : "black" }]}
        placeholder="Masukkan nama makanan"
        placeholderTextColor={isDarkMode ? "gray" : "#888"}
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Cari" onPress={searchRecipes} />

      {loading ? (
        <Text style={[styles.loadingText, { color: isDarkMode ? "white" : "#666" }]}>Loading...</Text>
      ) : (
        <FlatList
          data={recipes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.card, { backgroundColor: isDarkMode ? "#333" : "white" }]}
              onPress={() => navigation.navigate("RecipeDetail", { recipeId: item.id })}
            >
              <Text style={[styles.recipeTitle, { color: isDarkMode ? "white" : "#333" }]}>{item.title}</Text>
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.list}
        />
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
    fontWeight: "bold",
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
  list: {
    marginTop: 10,
  },
  card: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    elevation: 2,
  },
  recipeTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
