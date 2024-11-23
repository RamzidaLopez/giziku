// pages/AboutScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../ThemeContext';

export default function AboutScreen() {
  const { isDarkMode } = useTheme();

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F9F9F9' }]}>
      <Text style={[styles.title, { color: isDarkMode ? 'white' : '#333' }]}>About GiziKu</Text>

      <Text style={[styles.text, { color: isDarkMode ? '#E0E0E0' : '#555' }]}>
        Selamat datang di <Text style={styles.highlight}>GiziKu</Text>, aplikasi pintar untuk membantu Anda menjaga kesehatan dan pola makan dengan mudah dan cepat! 🌱🍎
      </Text>

      <Text style={[styles.subtitle, { color: isDarkMode ? '#FFD700' : '#FF8C00' }]}>Apa itu GiziKu?</Text>
      <Text style={[styles.text, { color: isDarkMode ? '#E0E0E0' : '#555' }]}>
        GiziKu adalah aplikasi yang dirancang khusus untuk:
        {'\n'}• <Text style={styles.bold}>Menghitung kebutuhan gizi Anda:</Text> Cari tahu nilai nutrisi makanan favorit Anda!
        {'\n'}• <Text style={styles.bold}>Mencari inspirasi resep sehat:</Text> Dapatkan ide makanan yang sesuai dengan kebutuhan tubuh Anda.
        {'\n'}• <Text style={styles.bold}>Membantu menjaga berat badan ideal:</Text> Gunakan kalkulator BMI kami untuk tetap berada di jalur yang sehat.
      </Text>

      <Text style={[styles.subtitle, { color: isDarkMode ? '#FFD700' : '#FF8C00' }]}>Kenapa Harus GiziKu?</Text>
      <Text style={[styles.text, { color: isDarkMode ? '#E0E0E0' : '#555' }]}>
        • <Text style={styles.bold}>Mudah digunakan:</Text> Akses informasi gizi dan resep hanya dengan beberapa klik.
        {'\n'}• <Text style={styles.bold}>Akurat:</Text> Menggunakan data terpercaya untuk memberikan informasi nutrisi terbaik.
        {'\n'}• <Text style={styles.bold}>Inspiratif:</Text> Jelajahi resep sehat yang dapat diolah dengan bahan-bahan sederhana di rumah.
      </Text>

      <Text style={[styles.subtitle, { color: isDarkMode ? '#FFD700' : '#FF8C00' }]}>Misi Kami</Text>
      <Text style={[styles.text, { color: isDarkMode ? '#E0E0E0' : '#555' }]}>
        Membantu Anda menjalani gaya hidup yang lebih sehat dengan menyediakan informasi gizi dan resep sehat di ujung jari Anda. Karena kami percaya, kesehatan adalah investasi terbaik untuk masa depan.
      </Text>

      <Text style={[styles.subtitle, { color: isDarkMode ? '#FFD700' : '#FF8C00' }]}>Hubungi Kami</Text>
      <Text style={[styles.text, { color: isDarkMode ? '#E0E0E0' : '#555' }]}>
        Punya pertanyaan, saran, atau masukan? Kami dengan senang hati ingin mendengar dari Anda!
        {'\n'}📧 Email: <Text style={styles.link}>akbarazathin@gmail.com</Text>
        {'\n'}📞 Telepon: 0895-4144-20078
      </Text>

      <Text style={[styles.text, { color: isDarkMode ? '#FFD700' : '#FF8C00', marginTop: 20, textAlign: 'center' }]}>
        Terima kasih telah memilih <Text style={styles.highlight}>GiziKu</Text> sebagai partner perjalanan hidup sehat Anda! 💪✨
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#FF4500',
  },
  bold: {
    fontWeight: 'bold',
  },
  link: {
    color: '#1E90FF',
    textDecorationLine: 'underline',
  },
});
