import { View, Text, StyleSheet } from 'react-native';

export default function Dashboard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Progreso 🌿</Text>
      <Text>¡Aquí aparecerán tus hábitos!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F1F8E9' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#2E7D32' }
});