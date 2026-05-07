import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Obtenemos el ancho de la pantalla para calcular el tamaño de las tarjetas
const { width } = Dimensions.get('window');

export default function SelectorHabito() {
  const router = useRouter();

  // Definimos nuestros 4 hábitos con sus colores e iconos
  const habitos = [
    {
      id: 'fumar',
      title: 'Dejar de Fumar',
      subtitle: 'Libera tus pulmones',
      icon: 'logo-no-smoking',
      color: '#FF8A65', // Naranja/Rojo suave
      route: '/registro/fumar'
    },
    {
      id: 'procrastinar',
      title: 'Procrastinar',
      subtitle: 'Gestiona tu tiempo',
      icon: 'hourglass-outline',
      color: '#9575CD', // Violeta
      route: '/registro/procrastinar'
    },
    {
      id: 'comida',
      title: 'Ansiedad por Comer',
      subtitle: 'Alimentación consciente',
      icon: 'fast-food-outline',
      color: '#FFD54F', // Amarillo
      route: '/registro/comida'
    },
    {
      id: 'sedentarismo',
      title: 'Sedentarismo',
      subtitle: 'Muévete más',
      icon: 'bicycle-outline',
      color: '#81C784', // Verde
      route: '/registro/sedentarismo'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Cabecera */}
        <View style={styles.header}>
          <Text style={styles.title}>Elige tu reto</Text>
          <Text style={styles.subtitle}>¿En qué hábito quieres enfocarte primero para mejorar tu vida?</Text>
        </View>

        {/* Cuadrícula de tarjetas */}
        <View style={styles.grid}>
          {habitos.map((habito) => (
            <TouchableOpacity
              key={habito.id}
              style={[styles.card, { borderBottomColor: habito.color, borderBottomWidth: 4 }]}
              onPress={() => router.push(habito.route as any)}
              activeOpacity={0.7}
            >
              <View style={[styles.iconCircle, { backgroundColor: habito.color + '20' }]}>
                <Ionicons name={habito.icon as any} size={35} color={habito.color} />
              </View>
              <Text style={styles.cardTitle}>{habito.title}</Text>
              <Text style={styles.cardSubtitle}>{habito.subtitle}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    color: '#1F2937',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    paddingHorizontal: 10,
    lineHeight: 22,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: '#F9FAFB',
    width: (width - 60) / 2, // Ajuste para que quepan dos por fila con margen
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
    // Sombra para iOS y Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  iconCircle: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1F2937',
    textAlign: 'center',
    marginBottom: 5,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#9CA3AF',
    textAlign: 'center',
  },
});