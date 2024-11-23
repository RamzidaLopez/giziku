// pages/BMICalculatorScreen.js
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { useTheme } from "../ThemeContext";

export default function BMICalculatorScreen() {
  const { isDarkMode } = useTheme(); // Mengakses tema dari ThemeContext
  const [height, setHeight] = useState(""); // input untuk tinggi badan dalam cm
  const [weight, setWeight] = useState(""); // input untuk berat badan dalam kg
  const [bmi, setBmi] = useState(null); // hasil BMI
  const [category, setCategory] = useState(""); // kategori BMI

  const calculateBMI = () => {
    if (!height || !weight) {
      alert("Tinggi badan dan berat badan harus diisi!");
      return;
    }

    // Menghitung BMI dengan rumus: BMI = berat (kg) / (tinggi(m) * tinggi(m))
    const heightInMeters = height / 100; // mengkonversi cm ke meter
    const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(2);

    setBmi(bmiValue);

    // Menentukan kategori BMI
    let healthCategory = "";
    if (bmiValue < 18.5) healthCategory = "Underweight";
    else if (bmiValue >= 18.5 && bmiValue < 24.9) healthCategory = "Normal weight";
    else if (bmiValue >= 25 && bmiValue < 29.9) healthCategory = "Overweight";
    else healthCategory = "Obesity";

    setCategory(healthCategory);
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#121212" : "#F9F9F9" },
      ]}
    >
      <Text style={[styles.title, { color: isDarkMode ? "white" : "#333" }]}>
        Kalkulator BMI
      </Text>

      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDarkMode ? "#333" : "white",
            color: isDarkMode ? "white" : "black",
            borderColor: isDarkMode ? "#555" : "#ddd",
          },
        ]}
        placeholder="Masukkan tinggi badan (cm)"
        placeholderTextColor={isDarkMode ? "gray" : "#888"}
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
      />
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: isDarkMode ? "#333" : "white",
            color: isDarkMode ? "white" : "black",
            borderColor: isDarkMode ? "#555" : "#ddd",
          },
        ]}
        placeholder="Masukkan berat badan (kg)"
        placeholderTextColor={isDarkMode ? "gray" : "#888"}
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
      />

      <Button
        title="Hitung BMI"
        color={isDarkMode ? "#FFD700" : "#007AFF"}
        onPress={calculateBMI}
      />

      {bmi && (
        <View
          style={[
            styles.result,
            { backgroundColor: isDarkMode ? "#333" : "#eee" },
          ]}
        >
          <Text style={[styles.resultText, { color: isDarkMode ? "white" : "#333" }]}>
            BMI: {bmi}
          </Text>
          <Text style={[styles.resultText, { color: isDarkMode ? "white" : "#333" }]}>
            Kategori: {category}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    fontSize: 16,
  },
  result: {
    marginTop: 20,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
