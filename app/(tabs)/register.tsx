import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    KeyboardAvoidingView,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

import LottieView from 'lottie-react-native';

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function RegisterScreen() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [modalVisible, setModalVisible] = useState(false);

    const router = useRouter();
    const mascotHeight = useSharedValue(0);

    const animatedMascotStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: withSpring(mascotHeight.value * -10) }],
    }));

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.inner}>

                    {/* --- MASCOTA --- */}
                    <Animated.View style={[styles.mascotContainer, animatedMascotStyle]}>
                        <LottieView
                            autoPlay
                            loop
                            style={styles.lottieMascot}
                            source={require('../../assets/animations/flower.json')}
                        />
                    </Animated.View>

                    <Text style={styles.title}>¡Únete para empezar tu cambio!</Text>
                    <Text style={styles.subtitle}>Crea tu cuenta para empezar a mejorar</Text>

                    <View style={styles.form}>
                        {/* CAMPO: NOMBRE */}
                        <TextInput
                            placeholder="¿Cómo te llamas?"
                            style={styles.input}
                            placeholderTextColor="#A0AEC0"
                            onChangeText={setName}
                            onFocus={() => { mascotHeight.value = 1; }}
                            onBlur={() => { mascotHeight.value = 0; }}
                        />

                        {/* CAMPO: EMAIL */}
                        <TextInput
                            placeholder="Tu email"
                            style={styles.input}
                            placeholderTextColor="#A0AEC0"
                            keyboardType="email-address"
                            onChangeText={setEmail}
                            onFocus={() => { mascotHeight.value = 1; }}
                            onBlur={() => { mascotHeight.value = 0; }}
                        />

                        {/* CAMPO: CONTRASEÑA */}
                        <TextInput
                            placeholder="Contraseña segura"
                            style={styles.input}
                            placeholderTextColor="#A0AEC0"
                            secureTextEntry
                            onChangeText={setPassword}
                            onFocus={() => { mascotHeight.value = 0.5; }}
                            onBlur={() => { mascotHeight.value = 0; }}
                        />

                        {/* CAMPO: CONFIRMAR CONTRASEÑA */}
                        <TextInput
                            placeholder="Repite tu contraseña"
                            style={styles.input}
                            placeholderTextColor="#A0AEC0"
                            secureTextEntry
                            onChangeText={setConfirmPassword}
                            onFocus={() => { mascotHeight.value = 0.5; }}
                            onBlur={() => { mascotHeight.value = 0; }}
                        />

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => {
                                mascotHeight.value = 5;
                                setTimeout(() => {
                                    mascotHeight.value = 0;
                                    setModalVisible(true);
                                }, 500);
                            }}
                        >
                            <Text style={styles.buttonText}>Crear mi cuenta</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity
                        style={styles.footer}
                        onPress={() => router.push('/')}
                    >
                        <Text style={styles.footerText}>
                            ¿Ya tienes cuenta? <Text style={styles.bold}>Inicia sesión</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>¡Bienvenido a BreakFree! 🌿</Text>
                            <Text style={styles.modalText}>Tu cuenta ha sido creada con éxito.</Text>

                            <TouchableOpacity
                                style={styles.modalButton}
                                onPress={() => {
                                    setModalVisible(false);
                                    router.push('/');
                                }}
                            >
                                <Text style={styles.buttonText}>Empezar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F3E8FF',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    inner: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 30,
        paddingVertical: 40,
        width: '100%',
        maxWidth: 450,
        alignSelf: 'center',
    },
    mascotContainer: {
        width: 180,
        height: 180,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 5,
    },
    lottieMascot: {
        width: '100%',
        height: '100%',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#553C9A',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#6B46C1',
        marginBottom: 20,
        textAlign: 'center',
    },
    form: {
        width: '100%',
    },
    input: {
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginBottom: 12,
        fontSize: 16,
        color: '#4A5568',
        borderWidth: 1,
        borderColor: '#E9D8FD',
    },
    button: {
        backgroundColor: '#48BB78',
        paddingVertical: 18,
        borderRadius: 20,
        alignItems: 'center',
        marginTop: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    footer: {
        marginTop: 20,
    },
    footerText: {
        color: '#6B46C1',
        fontSize: 14,
    },
    bold: {
        fontWeight: 'bold',
        textDecorationLine: 'underline',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 30,
        padding: 30,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 10,
        elevation: 10,
    },
    modalTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#553C9A',
        marginBottom: 10,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 16,
        color: '#6B46C1',
        textAlign: 'center',
        marginBottom: 25,
    },
    modalButton: {
        backgroundColor: '#48BB78',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 20,
        elevation: 3,
    },
});