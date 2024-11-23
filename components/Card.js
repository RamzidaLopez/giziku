import { View, Text, Image, StyleSheet } from 'react-native';

const Card = ({ dataNama }) => {
  // Cek jika dataNama ada dan memiliki property imageUrl
  const imageUrl = dataNama?.imageUrl || 'https://avatars.ghttps://assets.ggwp.id/2020/10/Karakter-Anime-Yang-Rakus-5-640x360.jpg';

  return (
    <View style={styles.card}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{dataNama?.name || 'Nama Tidak Tersedia'}</Text>
        <Text style={styles.details}>Kalori: {dataNama?.calories || 'Tidak Tersedia'}</Text>
        <Text style={styles.details}>Protein: {dataNama?.protein || 'Tidak Tersedia'}</Text>
        <Text style={styles.details}>Karbohidrat: {dataNama?.carbohydrates || 'Tidak Tersedia'}</Text>
        <Text style={styles.details}>Lemak: {dataNama?.fat || 'Tidak Tersedia'}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    padding: 10,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'lightgray',
    backgroundColor: 'white',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  textContainer: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  details: {
    fontSize: 14,
    color: 'gray',
  },
});

export default Card;
