import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
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

// Importamos la lógica de validación
import { getFormError } from './utils/validations';

const { width } = Dimensions.get('window');

export default function CuteLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const mascotHeight = useSharedValue(0);

  const animatedMascotStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: withSpring(mascotHeight.value * -10) }],
  }));

  // Función de Login con validación
  const handleLogin = () => {
    setErrorMessage(null); 
    
    const error = getFormError(email, password, false);

    if (error) {
      setErrorMessage(error);
      return; 
    }

    mascotHeight.value = 5;
    setTimeout(() => {
      mascotHeight.value = 0;
      router.replace('/onboarding');
    }, 500);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.inner}>

        {/* SECCIÓN DE LA MASCOTA */}
        <Animated.View style={[styles.mascotContainer, animatedMascotStyle]}>
          <LottieView
            autoPlay
            loop
            style={styles.lottieMascot}
            source={require('../../assets/animations/flower.json')}
          />
        </Animated.View>

        <Text style={styles.title}>¡Hola de nuevo!</Text>
        <Text style={styles.subtitle}>¿Qué hábito mejoraremos hoy?</Text>

        <View style={styles.form}>
          <TextInput
            placeholder="Tu email"
            style={styles.input}
            placeholderTextColor="#A0AEC0"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={setEmail}
            onFocus={() => { mascotHeight.value = 1; }}
            onBlur={() => { mascotHeight.value = 0; }}
          />

          <TextInput
            placeholder="Contraseña secreta"
            style={styles.input}
            placeholderTextColor="#A0AEC0"
            secureTextEntry
            onChangeText={setPassword}
            onFocus={() => { mascotHeight.value = 0.5; }}
            onBlur={() => { mascotHeight.value = 0; }}
          />

          {/* MENSAJE DE ERROR VISUAL */}
          {errorMessage && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={handleLogin} // <--- AQUÍ conectamos la función
          >
            <Text style={styles.buttonText}>ENTRAR</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.footer}
          onPress={() => router.push('/register')}
        >
          <Text style={styles.footerText}>
            ¿Eres nuevo? <Text style={styles.bold}>Crea una cuenta</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F3E8FF' },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    width: '100%',
    maxWidth: 450,
    alignSelf: 'center',
  },
  mascotContainer: { width: 220, height: 220, alignItems: 'center', justifyContent: 'center', marginBottom: 10 },
  lottieMascot: { width: '100%', height: '100%' },
  title: { fontSize: 28, fontWeight: 'bold', color: '#553C9A', marginTop: 10, textAlign: 'center' },
  subtitle: { fontSize: 16, color: '#6B46C1', marginBottom: 30, textAlign: 'center' },
  form: { width: '100%' },
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 15,
    fontSize: 16,
    color: '#4A5568',
    borderWidth: 1,
    borderColor: '#E9D8FD',
  },
  // ESTILOS NUEVOS PARA EL ERROR
  errorContainer: {
    backgroundColor: '#FED7D7',
    padding: 10,
    borderRadius: 12,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: '#F56565',
  },
  errorText: { color: '#C53030', fontSize: 13, fontWeight: '600' },
  
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
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  footer: { marginTop: 25 },
  footerText: { color: '#6B46C1', fontSize: 14 },
  bold: { fontWeight: 'bold', textDecorationLine: 'underline' }
});