import React, { useEffect, useRef, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  Animated, 
  Dimensions, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
const { height } = Dimensions.get('window');

export default function JournalScreen() {
  const router = useRouter();
  const [note, setNote] = useState('');
  const slideAnim = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    Animated.spring(slideAnim, {
      toValue: 0,
      useNativeDriver: true,
      friction: 9,
      tension: 30,
    }).start();
  }, []);

  const closeJournal = () => {
    Animated.timing(slideAnim, {
      toValue: height,
      duration: 250,
      useNativeDriver: true,
    }).start(() => router.back());
  };

  return (
    <View style={styles.mainWrapper}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
          style={{ flex: 1 }}
        >
          <Animated.View style={[styles.sheet, { transform: [{ translateY: slideAnim }] }]}>
            
            
            <View style={styles.pullBar} />

           
            <View style={styles.header}>
              <TouchableOpacity onPress={closeJournal} style={styles.closeBtn}>
                <Ionicons name="close" size={24} color="#8E5CF6" />
              </TouchableOpacity>
              <View style={styles.headerTitleContainer}>
                <Text style={styles.headerTitle}>Nuevo Registro</Text>
                <Text style={styles.headerSubtitle}>25 de Mayo • Jueves</Text>
              </View>
              <TouchableOpacity onPress={closeJournal} style={styles.saveBtn}>
                <Text style={styles.saveBtnText}>Listo</Text>
              </TouchableOpacity>
            </View>

            
            <View style={styles.body}>
              <View style={styles.inputWrapper}>
                <LinearGradient 
                  colors={['#F3F0FF', '#FFF']} 
                  style={styles.gradientBg}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="¿Cómo te sientes hoy realmente? Suéltalo todo aquí..."
                  placeholderTextColor="#A1A1AA"
                  multiline
                  autoFocus
                  value={note}
                  onChangeText={setNote}
                />
              </View>

              
              <View style={styles.tagsContainer}>
                <Text style={styles.tagLabel}>Hoy me siento:</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tagsScroll}>
                  {['Ansioso', 'Motivado', 'Tranquilo', 'Con fuerza', 'Tentado'].map((tag, i) => (
                    <TouchableOpacity key={i} style={styles.tag}>
                      <Text style={styles.tagText}>{tag}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </View>

          </Animated.View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  mainWrapper: { flex: 1, backgroundColor: 'rgba(93, 69, 219, 0.2)' },
  sheet: { 
    flex: 1, 
    backgroundColor: '#FFFFFF', 
    marginTop: 60, 
    borderTopLeftRadius: 50, 
    borderTopRightRadius: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
    overflow: 'hidden'
  },
  pullBar: { 
    width: 40, 
    height: 5, 
    backgroundColor: '#E5E7EB', 
    borderRadius: 10, 
    alignSelf: 'center', 
    marginTop: 15 
  },
  header: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    paddingHorizontal: 25, 
    paddingVertical: 20 
  },
  closeBtn: { backgroundColor: '#F3F0FF', padding: 10, borderRadius: 20 },
  headerTitleContainer: { alignItems: 'center' },
  headerTitle: { fontSize: 18, fontWeight: '800', color: '#1F2937' },
  headerSubtitle: { fontSize: 12, color: '#9CA3AF', fontWeight: '600', textTransform: 'uppercase' },
  saveBtn: { backgroundColor: '#8E5CF6', paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 },
  saveBtnText: { color: 'white', fontWeight: '700', fontSize: 14 },

  body: { flex: 1, paddingHorizontal: 25 },
  inputWrapper: { 
    flex: 0.7, 
    borderRadius: 35, 
    overflow: 'hidden', 
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#F3F0FF'
  },
  gradientBg: { ...StyleSheet.absoluteFillObject, opacity: 0.5 },
  textInput: { 
    flex: 1, 
    padding: 25, 
    fontSize: 18, 
    color: '#374151', 
    textAlignVertical: 'top',
    lineHeight: 28
  },

  tagsContainer: { marginTop: 30 },
  tagLabel: { fontSize: 14, fontWeight: '700', color: '#6B7280', marginBottom: 15, marginLeft: 5 },
  tagsScroll: { flexDirection: 'row' },
  tag: { 
    backgroundColor: '#F3F0FF', 
    paddingHorizontal: 18, 
    paddingVertical: 10, 
    borderRadius: 15, 
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#E0D4FF'
  },
  tagText: { color: '#8E5CF6', fontWeight: '600', fontSize: 13 }
});