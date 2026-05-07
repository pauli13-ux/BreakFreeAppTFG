import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Modal, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const PREGUNTAS_POR_HABITO: any = {
    fumar: [
        { id: 1, p: "¿Cuántos cigarrillos fumas al día?", placeholder: "Ej: 10", tipo: 'numeric' },
        { id: 2, p: "¿Cuánto cuesta tu paquete de tabaco?", placeholder: "Ej: 5.50", tipo: 'numeric' },
        { id: 3, p: "¿En qué momento sientes más ganas?", placeholder: "Ej: Después de comer" }
    ],
    procrastinar: [
        { id: 1, p: "¿Cuántas horas crees que pierdes al día?", placeholder: "Ej: 3", tipo: 'numeric' },
        { id: 2, p: "¿Qué app o distracción es tu mayor debilidad?", placeholder: "Ej: TikTok/Instagram" },
        { id: 3, p: "¿Qué tarea sueles dejar siempre para mañana?", placeholder: "Ej: Estudiar o limpiar" }
    ],
    comida: [
        { id: 1, p: "¿Cuántas veces comes por ansiedad al día?", placeholder: "Ej: 2", tipo: 'numeric' },
        { id: 2, p: "¿Cuál es el alimento que no puedes dejar de comer?", placeholder: "Ej: Chocolate/Patatas" },
        { id: 3, p: "¿Qué emoción sueles sentir antes de estos atracones?", placeholder: "Ej: Estrés o aburrimiento" }
    ],
    sedentarismo: [
        { id: 1, p: "¿Cuántas horas pasas sentado al día?", placeholder: "Ej: 8", tipo: 'numeric' },
        { id: 2, p: "¿Cuántos días a la semana haces deporte?", placeholder: "Ej: 0", tipo: 'numeric' },
        { id: 3, p: "¿Qué es lo que más te impide moverte?", placeholder: "Ej: Falta de tiempo o cansancio" }
    ]
};

export default function RegistroHabito() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

  
    const [paso, setPaso] = useState(0);
    const [respuesta, setRespuesta] = useState('');
    const [modalVisible, setModalVisible] = useState(false); 

    const preguntas = PREGUNTAS_POR_HABITO[id as string] || [];
    const preguntaActual = preguntas[paso];

    const siguientePaso = () => {
        if (paso < preguntas.length - 1) {
            setPaso(paso + 1);
            setRespuesta('');
        } else {
            setModalVisible(true); 
        }
    };

    if (!preguntaActual) return null;

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <View style={styles.content}>
                {/* Barra de progreso */}
                <View style={styles.progressContainer}>
                    <View style={[styles.progressBar, { width: `${((paso + 1) / preguntas.length) * 100}%` }]} />
                </View>

                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Ionicons name="arrow-back" size={24} color="#6B7280" />
                </TouchableOpacity>

                <Text style={styles.stepText}>Paso {paso + 1} de {preguntas.length}</Text>
                <Text style={styles.question}>{preguntaActual.p}</Text>

                <TextInput
                    style={styles.input}
                    placeholder={preguntaActual.placeholder}
                    value={respuesta}
                    onChangeText={setRespuesta}
                    keyboardType={preguntaActual.tipo || 'default'}
                    autoFocus={true}
                />

                <TouchableOpacity
                    style={[styles.button, !respuesta && { opacity: 0.5 }]}
                    onPress={siguientePaso}
                    disabled={!respuesta}
                >
                    <Text style={styles.buttonText}>
                        {paso === preguntas.length - 1 ? 'Finalizar' : 'Siguiente'}
                    </Text>
                </TouchableOpacity>
            </View>

            {/* MODAL BONITO DE ÉXITO */}
            <Modal animationType="fade" transparent={true} visible={modalVisible}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Ionicons name="checkmark-circle" size={80} color="#4ADE80" style={{ marginBottom: 20 }} />
                        <Text style={styles.modalTitle}>¡Todo listo!</Text>
                        <Text style={styles.modalText}>Tus respuestas nos ayudarán a crear el mejor plan para ti.</Text>
                        <TouchableOpacity
                            style={styles.modalButton}
                            onPress={() => {
                                setModalVisible(false);
                                router.replace('/dashboard');
                            }}
                        >
                            <Text style={styles.modalButtonText}>Empezar mi camino</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFF' },
    content: { flex: 1, padding: 30, justifyContent: 'center' },
    progressContainer: { height: 6, backgroundColor: '#E5E7EB', borderRadius: 3, position: 'absolute', top: 60, left: 30, right: 30 },
    progressBar: { height: '100%', backgroundColor: '#8E5CF6', borderRadius: 3 },
    backBtn: { position: 'absolute', top: 80, left: 20 },
    stepText: { color: '#8E5CF6', fontWeight: '700', marginBottom: 10, fontSize: 14, textAlign: 'center' },
    question: { fontSize: 26, fontWeight: '800', color: '#1F2937', textAlign: 'center', marginBottom: 30 },
    input: { borderBottomWidth: 2, borderBottomColor: '#8E5CF6', fontSize: 20, paddingVertical: 10, textAlign: 'center', color: '#1F2937', marginBottom: 40 },
    button: { backgroundColor: '#8E5CF6', paddingVertical: 18, borderRadius: 15, alignItems: 'center' },
    buttonText: { color: '#FFF', fontSize: 18, fontWeight: '600' },
    // ESTILOS DEL MODAL
    modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
    modalContent: { width: '85%', backgroundColor: 'white', borderRadius: 30, padding: 30, alignItems: 'center', elevation: 10 },
    modalTitle: { fontSize: 24, fontWeight: '800', color: '#1F2937', marginBottom: 10 },
    modalText: { fontSize: 16, color: '#6B7280', textAlign: 'center', marginBottom: 30 },
    modalButton: { backgroundColor: '#8E5CF6', paddingVertical: 15, paddingHorizontal: 30, borderRadius: 15, width: '100%', alignItems: 'center' },
    modalButtonText: { color: 'white', fontSize: 16, fontWeight: '700' }
});