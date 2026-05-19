import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const registrosFalsos = [
    { id: '1', fecha: 'Martes, 19 de mayo', emocion: '🔥 Fuerte', texto: 'Hoy he aguantado súper bien los retos. Me mantuve enfocada programando y la tentación desapareció por completo.' },
    { id: '2', fecha: 'Lunes, 18 de mayo', emocion: '😊 Bien', texto: 'Un día tranquilo. Logré aplicar los consejos de la pantalla informativa y me sentí con el control total de la situación.' },
    { id: '3', fecha: 'Domingo, 17 de mayo', emocion: '😐 Regular', texto: 'Me costó un poco por la tarde debido al aburrimiento, pero escribir aquí me ayudó a desahogarme y no caer.' },
];

export default function HistorialJournal() {
    const router = useRouter();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton} activeOpacity={0.7}>
                    <Ionicons name="arrow-back" size={24} color="#805AD5" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Historial de Reflexiones</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {registrosFalsos.map((registro) => (
                    <View key={registro.id} style={styles.card}>
                        <View style={styles.cardHeader}>
                            <Text style={styles.cardFecha}>{registro.fecha}</Text>
                            <View style={styles.badgeEmocion}>
                                <Text style={styles.cardEmocion}>{registro.emocion}</Text>
                            </View>
                        </View>
                        <Text style={styles.cardTexto}>{registro.texto}</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 50, paddingHorizontal: 20, marginBottom: 15 },
    backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F3E8FF', alignItems: 'center', justifyContent: 'center' },
    headerTitle: { fontSize: 22, fontWeight: '800', color: '#2D3748' },
    scrollContent: { padding: 20 },
    card: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 20, borderWidth: 1, borderColor: '#EDF2F7', marginBottom: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.03, shadowRadius: 8, elevation: 1 },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, borderBottomWidth: 1, borderBottomColor: '#F7FAFC', paddingBottom: 10 },
    cardFecha: { fontSize: 15, fontWeight: '700', color: '#2D3748' },
    badgeEmocion: { backgroundColor: '#FAF5FF', paddingVertical: 4, paddingHorizontal: 10, borderRadius: 12 },
    cardEmocion: { fontSize: 13, fontWeight: '700', color: '#805AD5' },
    cardTexto: { fontSize: 15, color: '#4A5568', lineHeight: 23 }
});