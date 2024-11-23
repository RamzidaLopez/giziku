import React from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { useTheme } from "../ThemeContext";

export default function SettingsScreen() {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? "#121212" : "white" }]}>
      <Text style={[styles.title, { color: isDarkMode ? "white" : "black" }]}>
        Pengaturan Tema
      </Text>
      <View style={styles.setting}>
        <Text style={[styles.settingText, { color: isDarkMode ? "white" : "black" }]}>
          Mode Malam
        </Text>
        <Switch value={isDarkMode} onValueChange={toggleTheme} />
      </View>
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
    marginBottom: 20,
    textAlign: "center",
  },
  setting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  settingText: {
    fontSize: 18,
  },
});
