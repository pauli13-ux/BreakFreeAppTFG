import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function NivelAdiccion() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [nivelSeleccionado, setNivelSeleccionado] = useState<string | null>(null);

    const opciones = [
        { id: 'poco', titulo: 'Poco', descripcion: 'Lo hago de vez en cuando, puedo controlarlo algunos días.', icono: 'leaf-outline', color: '#10B981' },
        { id: 'medio', titulo: 'Medio', descripcion: 'Forma parte de mi rutina diaria, me cuesta bastante dejarlo.', icono: 'flame-outline', color: '#F59E0B' },
        { id: 'mucho', titulo: 'Mucho', descripcion: 'Siento una dependencia total y afecta a mi día a día.', icono: 'alert-circle-outline', color: '#EF4444' },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.innerContainer}>

                    <View style={styles.header}>
                        <Text style={styles.titulo}>¿Cuál es tu nivel de dependencia?</Text>
                        <Text style={styles.subtitulo}>Esto nos ayudará a adaptar las herramientas de rescate a tu nivel real.</Text>
                    </View>

                    <View style={styles.listaOpciones}>
                        {opciones.map((opcion) => {
                            const isActive = nivelSeleccionado === opcion.id;
                            return (
                                <TouchableOpacity
                                    key={opcion.id}
                                    style={[styles.tarjetaOpcion, isActive && styles.tarjetaActiva]}
                                    onPress={() => setNivelSeleccionado(opcion.id)}
                                    activeOpacity={0.8}
                                >
                                    <View style={[styles.contenedorIcono, { backgroundColor: opcion.color + '20' }]}>
                                        <Ionicons name={opcion.icono as any} size={24} color={opcion.color} />
                                    </View>

                                    <View style={styles.bloqueText}>
                                        <Text style={styles.tituloOpcion}>{opcion.titulo}</Text>
                                        <Text style={styles.descripcionOpcion}>{opcion.descripcion}</Text>
                                    </View>

                                    <View style={[styles.radioCircle, isActive && { borderColor: '#8E5CF6', backgroundColor: '#8E5CF6' }]}>
                                        {isActive && <Ionicons name="checkmark" size={12} color="white" />}
                                    </View>
                                </TouchableOpacity>
                            );
                        })}
                    </View>

                    <TouchableOpacity
                        style={[styles.button, !nivelSeleccionado && styles.btnDeshabilitado]}
                        disabled={!nivelSeleccionado}
                        onPress={() => router.push(`/registro/${id}`)}
                    >
                        <Text style={styles.buttonText}>Continuar</Text>
                    </TouchableOpacity>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB'
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center', // Al usar ScrollView, flexGrow + center centra el contenido verticalmente si sobra espacio
        paddingVertical: 30,
    },
    innerContainer: {
        paddingHorizontal: 24, // Margen de seguridad lateral para que respire
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
        color: '#1F2937',
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
        backgroundColor: '#FFF',
        borderRadius: 20,
        padding: 18,
        borderWidth: 2,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.02,
        shadowRadius: 8,
        elevation: 2,
    },
    tarjetaActiva: {
        borderColor: '#8E5CF6',
        backgroundColor: '#F3F0FF'
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
        color: '#1F2937',
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
        backgroundColor: '#8E5CF6',
        paddingVertical: 18,
        borderRadius: 16,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#8E5CF6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    btnDeshabilitado: {
        backgroundColor: '#E5E7EB',
        shadowOpacity: 0,
        elevation: 0
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: '600'
    },
});