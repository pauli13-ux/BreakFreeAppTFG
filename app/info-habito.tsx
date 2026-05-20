import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const habitContent: any = {
    ansiedad: {
        title: "Ansiedad por comer",
        subtitle: "Aprende a diferenciar el hambre física del hambre emocional.",
        icon: "fast-food",
        color: "#F6AD55",
        tips: [
            "Bebe un vaso de agua antes de comer.",
            "Identifica la emoción que sientes antes del antojo.",
            "Evita distracciones como el móvil mientras comes."
        ]
    },
    fumar: {
        title: "Dejar de fumar",
        subtitle: "Recupera tu salud y ahorra dinero cada día.",
        icon: 'ban',
        color: "#F56565",
        tips: [
            "Evita los disparadores como el café o el alcohol.",
            "Limpia tu coche y ropa para eliminar el olor a tabaco.",
            "Usa sustitutos cuando sientas la necesidad urgente."
        ]
    },
    procrastinar: {
        title: "Productividad",
        subtitle: "Vence la resistencia y empieza tus tareas.",
        icon: "time",
        color: "#4299E1",
        tips: [
            "Usa la regla de los 2 minutos: si lleva poco tiempo, hazlo ya.",
            "Divide las tareas grandes en pasos pequeños.",
            "Elimina las notificaciones del móvil mientras trabajas."
        ]
    },
    doomscrolling: {
        title: "Desconexión Digital",
        subtitle: "Recupera el control de tu tiempo y atención.",
        icon: 'reload-circle-outline',
        color: "#805AD5",
        tips: [
            "Pon límites de tiempo en tus redes sociales.",
            "No uses el móvil la primera hora del día.",
            "Deja el teléfono fuera del alcance antes de dormir."
        ]
    }
};

export default function InfoHabito() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const content = habitContent[id as string] || habitContent.ansiedad;

    // Mapeo del ID para que coincida exactamente con vuestros archivos de (tabs)/[habito].tsx
    let idDashboard = 'tabaco';
    if (id === 'ansiedad') idDashboard = 'ansiedadComer';
    if (id === 'procrastinar') idDashboard = 'procrastinar';
    if (id === 'doomscrolling') idDashboard = 'doomscrolling';

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                    {/* Header con Icono */}
                    <View style={[styles.iconCircle, { backgroundColor: content.color + '20' }]}>
                        <Ionicons name={content.icon as any} size={60} color={content.color} />
                    </View>

                    <Text style={styles.mainTitle}>{content.title}</Text>
                    <Text style={styles.subtitle}>{content.subtitle}</Text>

                    <View style={styles.divider} />

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Primeros pasos</Text>
                        {content.tips.map((tip: string, index: number) => (
                            <View key={index} style={styles.tipCard}>
                                <Ionicons name="bulb-outline" size={24} color={content.color} />
                                <Text style={styles.tipText}>{tip}</Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>

                <View style={styles.footer}>
                    <TouchableOpacity
                        style={[styles.startButton, { backgroundColor: content.color }]}
                        onPress={() => {
                            // CORRECCIÓN: Apuntamos directamente a la ruta dinámica saltando el grupo (tabs)
                            router.replace(`/${idDashboard}`);
                        }}
                    >
                        <Text style={styles.startButtonText}>¡Empezar ahora!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: { flex: 1, backgroundColor: '#FFFFFF' },
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    scrollContent: { padding: 30, alignItems: 'center', paddingTop: 40 },
    iconCircle: { width: 120, height: 120, borderRadius: 60, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
    mainTitle: { fontSize: 28, fontWeight: '800', color: '#2D3748', textAlign: 'center', marginBottom: 10 },
    subtitle: { fontSize: 16, color: '#718096', textAlign: 'center', lineHeight: 24, paddingHorizontal: 10 },
    divider: { width: '50%', height: 2, backgroundColor: '#EDF2F7', marginVertical: 30 },
    section: { width: '100%' },
    sectionTitle: { fontSize: 20, fontWeight: '700', color: '#4A5568', marginBottom: 20 },
    tipCard: { flexDirection: 'row', backgroundColor: '#F7FAFC', padding: 15, borderRadius: 15, marginBottom: 15, alignItems: 'center', gap: 15 },
    tipText: { flex: 1, fontSize: 15, color: '#4A5568', lineHeight: 22 },
    footer: { padding: 25, paddingBottom: 20 },
    startButton: { paddingVertical: 18, borderRadius: 20, alignItems: 'center', elevation: 2, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
    startButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }
});