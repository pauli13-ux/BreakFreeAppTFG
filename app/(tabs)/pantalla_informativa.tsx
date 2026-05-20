import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PantallaInformativa() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    // Textos e información personalizada según el hábito seleccionado
    const infoHabito: Record<string, { info: string; tip: string; icono: string; color: string }> = {
        tabaco: {
            info: "A partir de las primeras 8 horas sin fumar, los niveles de oxígeno en tu sangre volverán a la normalidad y tus pulmones empezarán a limpiarse.",
            tip: "Usa el botón SOS cuando el gusanillo apriete. La ansiedad máxima suele durar solo de 3 a 5 minutos.",
            icono: 'heart-outline',
            color: '#FF8A65'
        },
        procrastinar: {
            info: "El cerebro procrastina para evitar el estrés inmediato, no por vagancia. Romper el inicio de la tarea en solo 2 minutos es la clave.",
            tip: "Cada vez que ganes tiempo al reloj, verás cómo se actualizan tus tarjetas de tiempo recuperado en el Dashboard.",
            icono: 'time-outline',
            color: '#9575CD'
        },
        ansiedadComer: {
            info: "El hambre emocional aparece de golpe y busca alimentos muy específicos. El hambre real aparece poco a poco.",
            tip: "Cuando sientas un impulso urgente, ve al Diario de la app y escribe cómo te sientes. Te ayudará a soltar el agobio.",
            icono: 'restaurant-outline',
            color: '#FFD54F'
        },
        doomscrolling: {
            info: "Hacer scroll infinito sobreestimula tu cerebro con dopamina rápida, lo que destruye tu capacidad de concentración a largo plazo.",
            tip: "Configura retos pequeños en la app para dejar el móvil lejos de la cama antes de irte a dormir.",
            icono: 'phone-portrait-outline',
            color: '#FF6B6B'
        }
    };

    const datosActuales = infoHabito[id as string] || infoHabito['procrastinar'];

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.safeArea}>

                <View style={styles.contenido}>
                    <View style={[styles.iconCircle, { backgroundColor: datosActuales.color + '20' }]}>
                        <Ionicons name={datosActuales.icono as any} size={45} color={datosActuales.color} />
                    </View>

                    <Text style={styles.titulo}>Tu plan está listo</Text>
                    <Text style={styles.subtitulo}>Esto es lo que necesitas saber antes de empezar tu primer día:</Text>

                    {/* Tarjeta de Información Científica/Médica */}
                    <View style={styles.tarjetaInfo}>
                        <Text style={styles.tagTarjeta}>¿SABÍAS QUÉ?</Text>
                        <Text style={styles.textoTarjeta}>{datosActuales.info}</Text>
                    </View>

                    {/* Tarjeta de Consejo Práctico */}
                    <View style={[styles.tarjetaInfo, styles.tarjetaTip]}>
                        <Text style={[styles.tagTarjeta, { color: '#805AD5' }]}>CONSEJO CLAVE</Text>
                        <Text style={styles.textoTarjeta}>{datosActuales.tip}</Text>
                    </View>
                </View>

                {/* Botón Final: Te manda al Dashboard dinámico que creamos antes */}
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => router.replace(`/[habito].tsx/${id}`)} // Cambia '/dashboard/' por tu ruta real hacia [habito].tsx
                >
                    <Text style={styles.buttonText}>Entrar a mi Dashboard</Text>
                    <Ionicons name="rocket-outline" size={20} color="white" />
                </TouchableOpacity>

            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    safeArea: { flex: 1, padding: 25, justifyContent: 'space-between' },
    contenido: { marginTop: 40, flex: 1, alignItems: 'center' },
    iconCircle: { width: 90, height: 90, borderRadius: 45, justifyContent: 'center', alignItems: 'center', marginBottom: 25 },
    titulo: { fontSize: 32, fontWeight: '800', color: '#2D3748', marginBottom: 10, textAlign: 'center' },
    subtitulo: { fontSize: 16, color: '#6B7280', textAlign: 'center', lineHeight: 22, marginBottom: 35, paddingHorizontal: 10 },
    tarjetaInfo: { backgroundColor: '#F7FAFC', width: '100%', padding: 20, borderRadius: 24, borderWidth: 2, borderColor: '#EDF2F7', marginBottom: 15 },
    tarjetaTip: { borderColor: '#EBF8FF', backgroundColor: '#F7FAFC' }, // Puedes cambiarlo a tonos morados si prefieres
    tagTarjeta: { fontSize: 12, fontWeight: '900', color: '#718096', letterSpacing: 1, marginBottom: 8 },
    textoTarjeta: { fontSize: 15, color: '#4A5568', lineHeight: 22, fontWeight: '500' },
    button: { backgroundColor: '#805AD5', paddingVertical: 18, borderRadius: 20, width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10, marginBottom: 10 },
    buttonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' },
});