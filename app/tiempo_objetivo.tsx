import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function TiempoObjetivo() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [tiempoSeleccionado, setTiempoSeleccionado] = useState<string | null>(null);

    const opcionesTiempo = [
        { id: '3_semanas', titulo: '3 Semanas', desc: 'Ideal para crear el hábito inicial y romper la rutina.', icono: 'calendar-outline', color: '#F472B6' },
        { id: '1_mes', titulo: '1 Mes', desc: 'Consolida tu cambio y limpia tu cuerpo o mente.', icono: 'hourglass-outline', color: '#8E5CF6' },
        { id: '2_meses', titulo: '2 Meses', desc: 'Transformación total a largo plazo y estabilidad.', icono: 'trophy-outline', color: '#4ADE80' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.innerContainer}>

                    <View style={styles.header}>
                        <Text style={styles.titulo}>¿En cuánto tiempo quieres lograrlo?</Text>
                        <Text style={styles.subtitulo}>Ponte una meta realista. Iremos paso a paso midiendo cada logro diario.</Text>
                    </View>

                    <View style={styles.listaOpciones}>
                        {opcionesTiempo.map((item) => {
                            const isActive = tiempoSeleccionado === item.id;
                            return (
                                <TouchableOpacity
                                    key={item.id}
                                    style={[styles.tarjetaOpcion, isActive && styles.tarjetaActiva]}
                                    onPress={() => setTiempoSeleccionado(item.id)}
                                    activeOpacity={0.8}
                                >
                                    <View style={[styles.contenedorIcono, { backgroundColor: item.color + '20' }]}>
                                        <Ionicons name={item.icono as any} size={24} color={item.color} />
                                    </View>

                                    <View style={styles.bloqueText}>
                                        <Text style={styles.tituloOpcion}>{item.titulo}</Text>
                                        <Text style={styles.descripcionOpcion}>{item.desc}</Text>
                                    </View>

                                    <View style={[styles.radioCircle, isActive && { borderColor: '#805AD5', backgroundColor: '#805AD5' }]}>
                                        {isActive && <Ionicons name="checkmark" size={12} color="white" />}
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <TouchableOpacity
                        style={[styles.button, !tiempoSeleccionado && styles.btnDeshabilitado]}
                        disabled={!tiempoSeleccionado}
                        // Enlaza con tu info-habito original
                        onPress={() => router.replace({ pathname: "/info-habito", params: { id: id } })}
                    >
                        <Text style={styles.buttonText}>Ver mi Plan de Acción</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingVertical: 30,
    },
    innerContainer: {
        paddingHorizontal: 24, // Ajustado para centrar perfectamente en cualquier ancho de pantalla
        width: '100%',
        alignItems: 'center'
    },
    header: {
        marginBottom: 35,
        alignItems: 'center',
        width: '100%'
    },
    titulo: {
        fontSize: 26,
        fontWeight: '800',
        color: '#2D3748',
        marginBottom: 12,
        textAlign: 'center',
        letterSpacing: -0.5
    },
    subtitulo: {
        fontSize: 15,
        color: '#6B7280',
        lineHeight: 22,
        textAlign: 'center',
        paddingHorizontal: 10
    },
    listaOpciones: {
        gap: 16,
        width: '100%',
        marginBottom: 35
    },
    tarjetaOpcion: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F7FAFC',
        borderRadius: 20,
        padding: 18,
        borderWidth: 2,
        borderColor: '#EDF2F7',
    },
    tarjetaActiva: {
        borderColor: '#805AD5',
        backgroundColor: '#FAF5FF'
    },
    contenedorIcono: {
        width: 48,
        height: 48,
        borderRadius: 14,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16
    },
    bloqueText: {
        flex: 1,
        paddingRight: 8
    },
    tituloOpcion: {
        fontSize: 17,
        fontWeight: '700',
        color: '#4A5568',
        marginBottom: 4
    },
    descripcionOpcion: {
        fontSize: 13,
        color: '#6B7280',
        lineHeight: 18
    },
    radioCircle: {
        width: 22,
        height: 22,
        borderRadius: 11,
        borderWidth: 2,
        borderColor: '#D1D5DB',
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#805AD5',
        paddingVertical: 18,
        borderRadius: 20,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#805AD5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        elevation: 3,
    },
    btnDeshabilitado: {
        backgroundColor: '#E2E8F0',
        shadowOpacity: 0,
        elevation: 0
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold'
    },
});