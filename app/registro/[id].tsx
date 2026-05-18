import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function RegistroCuestionario() {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [responses, setResponses] = useState<Record<number, string>>({});
    console.log("CUESTIONARIO RECIBE ID:", id);
    const allQuestions: any = {
        fumar: [
            { title: "¿Cuántos cigarrillos fumas al día?", options: [{ id: '1', label: 'Menos de 5' }, { id: '2', label: 'Entre 5 y 10' }, { id: '3', label: 'Entre 10 y 20' }, { id: '4', label: 'Más de 20' }] },
            { title: "¿Cuánto tiempo pasa desde que despiertas hasta el primero?", options: [{ id: '1', label: 'Menos de 5 min' }, { id: '2', label: '6 a 30 min' }, { id: '3', label: '31 a 60 min' }, { id: '4', label: 'Más de una hora' }] },
            { title: "¿En qué situaciones sientes más ganas de fumar?", options: [{ id: '1', label: 'Al tomar café' }, { id: '2', label: 'Después de comer' }, { id: '3', label: 'De fiesta/Social' }, { id: '4', label: 'Bajo estrés' }] },
            { title: "¿Cuál es tu principal motivo para dejarlo?", options: [{ id: '1', label: 'Salud y pulmones' }, { id: '2', label: 'Ahorro de dinero' }, { id: '3', label: 'Presión familiar' }, { id: '4', label: 'Estética y olor' }] },
            { title: "¿Cuánto te cuesta tu cajetilla habitual?", options: [{ id: '1', label: 'Menos de 5€' }, { id: '2', label: 'Entre 5€ y 6€' }, { id: '3', label: 'Más de 6€' }, { id: '4', label: 'Fumo tabaco de liar' }] }
        ],
        ansiedad: [
            { title: "¿Cómo describirías tu hambre ahora mismo?", options: [{ id: '1', label: 'Repentina y urgente' }, { id: '2', label: 'Poco a poco, puedo esperar' }, { id: '3', label: 'Ganas de algo muy dulce' }, { id: '4', label: 'Vacío en el pecho/estómago' }] },
            { title: "¿Qué emoción sueles sentir antes de comer así?", options: [{ id: '1', label: 'Estrés o agobio' }, { id: '2', label: 'Aburrimiento' }, { id: '3', label: 'Tristeza o soledad' }, { id: '4', label: 'Cansancio extremo' }] },
            { title: "¿Sueles comer con distracciones (móvil/TV)?", options: [{ id: '1', label: 'Siempre' }, { id: '2', label: 'A veces' }, { id: '3', label: 'Rara vez' }, { id: '4', label: 'Nunca' }] },
            { title: "¿Siente culpabilidad después de comer?", options: [{ id: '1', label: 'Siempre' }, { id: '2', label: 'A menudo' }, { id: '3', label: 'Casi nunca' }, { id: '4', label: 'Nunca' }] },
            { title: "¿Qué tipo de alimentos se te antojan en esos momentos? ", options: [{ id: '1', label: 'Dulces/Chocolates' }, { id: '2', label: 'Salados/Snacks' }, { id: '3', label: 'Comida rápida' }, { id: '4', label: 'Me da igual mientras sea comida' }] }
        ],
        doomscrolling: [
            { title: "¿En qué red social pierdes más tiempo?", options: [{ id: '1', label: 'TikTok' }, { id: '2', label: 'Instagram Reels' }, { id: '3', label: 'X (Twitter)' }, { id: '4', label: 'YouTube Shorts' }] },
            { title: "¿De media, cuánto tiempo pasas haciendo scroll?", options: [{ id: '1', label: 'Menos de 1h' }, { id: '2', label: '1-3 horas' }, { id: '3', label: '3-5 horas' }, { id: '4', label: 'Más de 5 horas' }] },
            { title: "¿Cómo te sientes tras una sesión larga de móvil?", options: [{ id: '1', label: 'Vacía y sin energía' }, { id: '2', label: 'Ansiosa' }, { id: '3', label: 'Igual que antes' }, { id: '4', label: 'Inspirada (rara vez)' }] },
            { title: "¿Miras el móvil nada más despertarte?", options: [{ id: '1', label: 'Sí, es lo primero' }, { id: '2', label: 'A los 15-30 min' }, { id: '3', label: 'Después de ducharme' }, { id: '4', label: 'Tras desayunar' }] },
            { title: "¿En que situaciones sueles consumir más?", options: [{ id: '1', label: 'Transporte público' }, { id: '2', label: 'Comiendo solo/a' }, { id: '3', label: 'En la cama' }, { id: '4', label: 'Estudiando/Trabajando' }] }
        ],
        procrastinar: [
            { title: "¿Qué tipo de tarea estás evitando?", options: [{ id: '1', label: 'Estudios' }, { id: '2', label: 'Trabajo' }, { id: '3', label: 'Tareas de casa' }, { id: '4', label: 'Ejercicio físico' }] },
            { title: "¿Qué sientes al pensar en empezar esa tarea?", options: [{ id: '1', label: 'Miedo al fracaso' }, { id: '2', label: 'Perfeccionismo/Agobio' }, { id: '3', label: 'Aburrimiento' }, { id: '4', label: 'Falta de claridad' }] },
            { title: "¿Qué haces en lugar de esa tarea?", options: [{ id: '1', label: 'Mirar el móvil' }, { id: '2', label: 'Dormir/Descansar' }, { id: '3', label: 'Limpiar u otras tareas' }, { id: '4', label: 'Comer algo' }] },
            { title: "¿Cuánto tiempo llevas retrasándola?", options: [{ id: '1', label: 'Solo unas horas' }, { id: '2', label: 'Varios días' }, { id: '3', label: 'Más de una semana' }, { id: '4', label: 'Meses' }] },
            { title: "¿Cómo te sentirás una vez que te hayas quitado este peso de encima?", options: [{ id: '1', label: 'Aliviado/a' }, { id: '2', label: 'Orgulloso/a' }, { id: '3', label: 'Con más energía' }, { id: '4', label: 'Tranquilo/a' }] }
        ]
    };

    
    const steps = id ? allQuestions[id as string] : null;

    if (!steps) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#6B46C1" />
            </View>
        );
    }

    const currentData = steps[currentStepIndex];
    const totalSteps = steps.length;

    const handleNext = () => {
        if (!selectedOption) return;

        const newResponses = { ...responses, [currentStepIndex]: selectedOption };
        setResponses(newResponses);

        if (currentStepIndex < totalSteps - 1) {
            setCurrentStepIndex(currentStepIndex + 1);
            setSelectedOption(null);
        } else {
           router.replace({
            pathname: "/info-habito",
            params: { id: id }
        });
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => currentStepIndex > 0 ? setCurrentStepIndex(currentStepIndex - 1) : router.back()}>
                    <Ionicons name="arrow-back" size={26} color="#6B46C1" />
                </TouchableOpacity>
                <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${((currentStepIndex + 1) / totalSteps) * 100}%` }]} />
                </View>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.stepIndicator}>Paso {currentStepIndex + 1} de {totalSteps}</Text>
                <Text style={styles.questionTitle}>{currentData.title}</Text>

                <View style={styles.optionsWrapper}>
                    {currentData.options.map((option: any) => (
                        <TouchableOpacity
                            key={option.id}
                            style={[styles.optionCard, selectedOption === option.id && styles.optionCardSelected]}
                            onPress={() => setSelectedOption(option.id)}
                        >
                            <Text style={[styles.optionLabel, selectedOption === option.id && styles.optionLabelSelected]}>
                                {option.label}
                            </Text>
                            {selectedOption === option.id && (
                                <View style={styles.checkIcon}><Ionicons name="checkmark-circle" size={24} color="#6B46C1" /></View>
                            )}
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.mainButton, !selectedOption && styles.mainButtonDisabled]}
                    disabled={!selectedOption}
                    onPress={handleNext}
                >
                    <Text style={styles.mainButtonText}>
                        {currentStepIndex === totalSteps - 1 ? "Finalizar" : "Continuar"}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#FFFFFF' },
    header: { flexDirection: 'row', alignItems: 'center', paddingTop: 60, paddingHorizontal: 20, marginBottom: 20 },
    progressBarBg: { flex: 1, height: 10, backgroundColor: '#F3E8FF', borderRadius: 5, marginHorizontal: 10 },
    progressBarFill: { height: 10, backgroundColor: '#805AD5', borderRadius: 5 },
    scrollContent: { paddingHorizontal: 25, paddingBottom: 40 },
    stepIndicator: { color: '#9F7AEA', fontSize: 14, fontWeight: 'bold', textAlign: 'center', marginBottom: 8, textTransform: 'uppercase' },
    questionTitle: { fontSize: 26, fontWeight: '800', color: '#2D3748', textAlign: 'center', marginBottom: 35, lineHeight: 34 },
    optionsWrapper: { width: '100%', gap: 15 },
    optionCard: { backgroundColor: '#F7FAFC', paddingVertical: 22, paddingHorizontal: 20, borderRadius: 20, borderWidth: 2, borderColor: '#EDF2F7', alignItems: 'center', justifyContent: 'center', position: 'relative' },
    optionCardSelected: { borderColor: '#805AD5', backgroundColor: '#FAF5FF' },
    optionLabel: { fontSize: 17, fontWeight: '600', color: '#4A5568', textAlign: 'center' },
    optionLabelSelected: { color: '#553C9A' },
    checkIcon: { position: 'absolute', right: 15 },
    footer: { padding: 25, paddingBottom: 45 },
    mainButton: { backgroundColor: '#805AD5', paddingVertical: 18, borderRadius: 20, alignItems: 'center' },
    mainButtonDisabled: { backgroundColor: '#E2E8F0' },
    mainButtonText: { color: '#FFFFFF', fontSize: 18, fontWeight: 'bold' }
});