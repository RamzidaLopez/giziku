import React, { useState, useEffect } from "react";
import { View, Text, Image, Button, StyleSheet, ScrollView } from "react-native";
import axios from "axios";

export default function RecipeDetailScreen({ route, navigation }) {
  const { recipeId } = route.params; // Mendapatkan recipeId dari route params
  const [recipeDetails, setRecipeDetails] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${recipeId}/information?apiKey=a46a6ac33aa644caa9785ae73d2787d4`
        );
        setRecipeDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchRecipeDetails();
  }, [recipeId]);

  // Fungsi untuk membersihkan HTML
  const cleanHTML = (html) => {
    if (!html) return "Tidak ada instruksi yang tersedia.";
    return html
      .replace(/<\/?ol>/g, "") // Hapus tag <ol>
      .replace(/<\/?li>/g, "") // Hapus tag <li>
      .replace(/<\/?p>/g, "\n") // Ganti <p> dengan baris baru
      .trim(); // Hapus spasi di awal/akhir
  };

  if (!recipeDetails) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: recipeDetails.image }} style={styles.image} />
      <Text style={styles.title}>{recipeDetails.title}</Text>

      <Text style={styles.sectionTitle}>Ingredients:</Text>
      <Text style={styles.text}>
        {recipeDetails.extendedIngredients
          .map((ingredient) => ingredient.original)
          .join(", ")}
      </Text>

      <Text style={styles.sectionTitle}>Instructions:</Text>
      <Text style={styles.text}>{cleanHTML(recipeDetails.instructions)}</Text>

      <Button title="Back" onPress={() => navigation.goBack()} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 8,
  },
  text: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
});
