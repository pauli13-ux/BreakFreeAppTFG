import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

const dias = [
  { d: 'L', active: false }, { d: 'M', active: false }, { d: 'X', active: false }, 
  { d: 'J', active: true }, { d: 'V', active: false }, { d: 'S', active: false }, { d: 'D', active: false }
];

export default function Dashboard() {
  const router = useRouter();

  return (
    <LinearGradient colors={['#F3F0FF', '#FFFFFF', '#FDF2F8']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* 1. Título de la App */}
          <View style={styles.topNav}>
             <Text style={styles.brandTitle}>BreakFree</Text>
             <Text style={styles.brandSubtitle}>Tu camino hacia la libertad</Text>
          </View>

          {/* 2. Tarjeta Contenedora Principal (Efecto Cápsula) */}
          <View style={styles.whiteCard}>
            
            <View style={styles.headerRow}>
              <Text style={styles.todayTitle}>Progreso</Text>
              <TouchableOpacity style={styles.profileIcon}>
                <Ionicons name="notifications-outline" size={20} color="#8E5CF6" />
              </TouchableOpacity>
            </View>

            {/* Calendario de Racha Semanal */}
            <View style={styles.calendar}>
              {dias.map((item, i) => (
                <View key={i} style={[styles.dayItem, item.active && styles.dayItemActive]}>
                   <Text style={[styles.dayName, item.active && styles.dayTextActive]}>{item.d}</Text>
                   {item.active && <View style={styles.activeDot} />}
                </View>
              ))}
            </View>

            {/* Ilustración de Estado Central */}
            <View style={styles.illustrationContainer}>
                <LinearGradient colors={['#8E5CF6', '#C084FC']} style={styles.blob}>
                    <Ionicons name="rocket-outline" size={80} color="#FFF" />
                </LinearGradient>
                <Text style={styles.mainProgressText}>Desintoxicación (15%)</Text>
                <Text style={styles.statusSub}>¡Tus pulmones están empezando a sanar!</Text>
                
                <View style={styles.miniBarBg}>
                   <LinearGradient 
                    colors={['#8E5CF6', '#4ADE80']} 
                    start={{x: 0, y: 0}} 
                    end={{x: 1, y: 0}} 
                    style={[styles.miniBarFill, { width: '15%' }]} 
                   />
                </View>
            </View>

            {/* Grid de Widgets (Tiempo y Impacto) */}
            <View style={styles.widgetsGrid}>
              <View style={styles.widget}>
                <View style={styles.widgetHeader}>
                   <Ionicons name="time" size={18} color="#8E5CF6" />
                   <Text style={styles.widgetTitle}>Tiempo Libre</Text>
                </View>
                <Text style={styles.widgetValue}>02<Text style={styles.unit}>d</Text> 14<Text style={styles.unit}>h</Text></Text>
                <Text style={styles.widgetSub}>Sin recaídas</Text>
              </View>

              <View style={styles.widget}>
                <View style={styles.widgetHeader}>
                   <Ionicons name="stats-chart" size={18} color="#4ADE80" />
                   <Text style={styles.widgetTitle}>Impacto</Text>
                </View>
                <View style={styles.activityRow}>
                   <Ionicons name="cash-outline" size={16} color="#4ADE80" />
                   <Text style={styles.activityValue}>12.50€ <Text style={styles.unit}>ahorro</Text></Text>
                </View>
                <View style={styles.activityRow}>
                   <Ionicons name="heart-outline" size={16} color="#EF4444" />
                   <Text style={styles.activityValue}>+5% <Text style={styles.unit}>oxígeno</Text></Text>
                </View>
              </View>
            </View>

            {/* 3. NUEVA SECCIÓN: Journal y Emociones */}
            <View style={styles.journalCard}>
              <Text style={styles.journalTitle}>¿Cómo te sientes hoy?</Text>
              <View style={styles.emojiRow}>
                {['😔', '😐', '😊', '🤩', '🔥'].map((emoji, index) => (
                  <TouchableOpacity key={index} style={styles.emojiButton}>
                    <Text style={styles.emojiText}>{emoji}</Text>
                  </TouchableOpacity>
                ))}
              </View>
              <TouchableOpacity 
                style={styles.addNoteButton}
                onPress={() => router.push('/journal')} 
              >
                <Ionicons name="create-outline" size={18} color="#8E5CF6" />
                <Text style={styles.addNoteText}>Escribir en mi diario...</Text>
              </TouchableOpacity>
            </View>

            {/* 4. Botón de Emergencia SOS */}
            <TouchableOpacity style={styles.sosButton}>
                <LinearGradient 
                    colors={['#FEF2F2', '#FFF1F2']} 
                    style={styles.sosGradient}
                >
                    <Ionicons name="alert-circle" size={24} color="#EF4444" />
                    <Text style={styles.sosText}>TENGO UNA TENTACIÓN</Text>
                </LinearGradient>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  topNav: { alignItems: 'center', marginTop: 10, marginBottom: 15 },
  brandTitle: { fontSize: 38, fontWeight: '900', color: '#5D45DB', letterSpacing: -1 },
  brandSubtitle: { fontSize: 14, color: '#6B7280', fontWeight: '500' },
  
  whiteCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    marginHorizontal: 12,
    borderRadius: 45,
    padding: 22,
    shadowColor: '#8E5CF6',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  todayTitle: { fontSize: 28, fontWeight: '800', color: '#1F2937' },
  profileIcon: { backgroundColor: '#F3F0FF', padding: 10, borderRadius: 18 },

  calendar: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  dayItem: { width: 40, height: 55, backgroundColor: '#F3F4F6', borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  dayItemActive: { backgroundColor: '#5D45DB' },
  dayName: { fontSize: 14, fontWeight: '700', color: '#9CA3AF' },
  dayTextActive: { color: '#FFF' },
  activeDot: { width: 4, height: 4, backgroundColor: '#FFF', borderRadius: 2, marginTop: 4 },

  illustrationContainer: { alignItems: 'center', marginBottom: 30 },
  blob: { width: 150, height: 150, borderRadius: 75, justifyContent: 'center', alignItems: 'center', marginBottom: 15, shadowColor: '#8E5CF6', shadowOpacity: 0.2, shadowRadius: 15 },
  mainProgressText: { fontSize: 22, fontWeight: '900', color: '#111827' },
  statusSub: { fontSize: 13, color: '#6B7280', marginTop: 4, textAlign: 'center' },
  miniBarBg: { width: '60%', height: 8, backgroundColor: '#E5E7EB', borderRadius: 10, marginTop: 15, overflow: 'hidden' },
  miniBarFill: { height: '100%', borderRadius: 10 },

  widgetsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  widget: { backgroundColor: '#FFF', width: '48%', borderRadius: 25, padding: 16, borderWidth: 1, borderColor: '#F3F4F6' },
  widgetHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  widgetTitle: { fontSize: 12, fontWeight: '700', color: '#6B7280', marginLeft: 6 },
  widgetValue: { fontSize: 22, fontWeight: '800', color: '#111827' },
  widgetSub: { fontSize: 11, color: '#9CA3AF', marginTop: 4 },
  unit: { fontSize: 12, color: '#9CA3AF', fontWeight: '400' },
  activityRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  activityValue: { fontSize: 13, fontWeight: '700', color: '#374151', marginLeft: 5 },

  journalCard: { backgroundColor: '#F9FAFB', borderRadius: 25, padding: 18, marginBottom: 20 },
  journalTitle: { fontSize: 16, fontWeight: '700', color: '#1F2937', marginBottom: 12 },
  emojiRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  emojiButton: { width: 42, height: 42, backgroundColor: '#FFF', borderRadius: 12, justifyContent: 'center', alignItems: 'center', elevation: 1 },
  emojiText: { fontSize: 20 },
  addNoteButton: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 12, backgroundColor: '#FFF', borderRadius: 12, borderStyle: 'dashed', borderWidth: 1, borderColor: '#D1D5DB' },
  addNoteText: { marginLeft: 8, color: '#6B7280', fontWeight: '600', fontSize: 13 },

  sosButton: { marginTop: 5 },
  sosGradient: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 18, borderRadius: 25 },
  sosText: { color: '#EF4444', fontWeight: '800', fontSize: 14, marginLeft: 10, letterSpacing: 0.5 }
});
