import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function SelectorHabito() {
  const router = useRouter();


  const habitos = [
    {
      id: 'tabaco',
      title: 'Dejar de Fumar',
      subtitle: 'Libera tus pulmones',
      icon: 'logo-no-smoking',
      color: '#FF8A65',
    },
    {
      id: 'procrastinar',
      title: 'Procrastinar',
      subtitle: 'Gestiona tu tiempo',
      icon: 'hourglass-outline',
      color: '#9575CD',
    },
    {
      id: 'ansiedadComer',
      title: 'Ansiedad por Comer',
      subtitle: 'Alimentación consciente',
      icon: 'fast-food-outline',
      color: '#FFD54F',
    },
    {
      id: 'doomscrolling',
      title: 'Doomscrolling',
      subtitle: 'Controla tu tiempo en redes',
      icon: 'logo-instagram',
      color: '#FF6B6B',
    },
  ];

  const seleccionarHabito = (habitoId: string) => {
    router.push({
      pathname: '/adiccion',
      params: { id: habitoId }
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>

        <View style={styles.header}>
          <Text style={styles.title}>Elige tu reto</Text>
          <Text style={styles.subtitle}>¿En qué hábito quieres enfocarte primero para mejorar tu vida?</Text>
        </View>

        <View style={styles.grid}>
          {habitos.map((habito) => (
            <TouchableOpacity
              key={habito.id}
              style={[styles.card, { borderBottomColor: habito.color, borderBottomWidth: 4 }]}
              onPress={() => seleccionarHabito(habito.id)}
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
    width: (width - 60) / 2,
    borderRadius: 24,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
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