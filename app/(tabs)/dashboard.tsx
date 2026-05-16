import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, KeyboardAvoidingView, Modal, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');


const contenidoRescate = {
  juegos: [
    { id: 1, texto: "❌ Tres en Raya ⭕" },
    { id: 2, texto: "🧠 Juego de Memoria" },
    { id: 3, texto: "⚡ Atrapa el Reflejo" }
  ],
  retos: [
    { id: 1, texto: "Haz 10 sentadillas", tipo: 'reps', meta: 10 },
    { id: 2, texto: "Bebe un vaso de agua", tipo: 'reps', meta: 1 },
    { id: 3, texto: "Plancha abdominal", tipo: 'tiempo', meta: 30 },
    { id: 4, texto: "Cierra los ojos y respira", tipo: 'tiempo', meta: 20 }
  ],
  frases: [
    { id: 1, texto: "No dejes que un momento borre meses de esfuerzo." },
    { id: 2, texto: "Eres más fuerte que tus impulsos." },
    { id: 3, texto: "Tu 'yo' del futuro te lo agradecerá." },
    { id: 4, texto: "Cada cigarrillo no fumado es una victoria para tu salud." },
    { id: 5, texto: "El éxito es la suma de pequeños esfuerzos repetidos día tras día." },
    { id: 6, texto: "No necesitas un cigarrillo para enfrentar este momento." }
  ]
};

const dias = [
  { d: 'L', active: false }, { d: 'M', active: false }, { d: 'X', active: false },
  { d: 'J', active: true }, { d: 'V', active: false }, { d: 'S', active: false }, { d: 'D', active: false }
];

function calcularGanador(cuadrados: any[]) {
  const lineas = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  for (let i = 0; i < lineas.length; i++) {
    const [a, b, c] = lineas[i];
    if (cuadrados[a] && cuadrados[a] === cuadrados[b] && cuadrados[a] === cuadrados[c]) return cuadrados[a];
  }
  return null;
}

export default function Dashboard() {
  const router = useRouter();


  const simboloCartaMemoria = '❓';
  const emojisSentimientos = [
    { emoji: '😔', label: 'Mal' },
    { emoji: '😐', label: 'Regular' },
    { emoji: '😊', label: 'Bien' },
    { emoji: '🤩', label: 'Genial' },
    { emoji: '🔥', label: 'Fuerte' }
  ];


  const [modalVisible, setModalVisible] = useState(false);
  const [categoria, setCategoria] = useState<'juegos' | 'retos' | 'frases' | null>(null);

  const [sentimientoSeleccionado, setSentimientoSeleccionado] = useState<string | null>(null);
  const [notaDiaria, setNotaDiaria] = useState('');


  const [juegoActivo, setJuegoActivo] = useState(false);
  const [tablero, setTablero] = useState(Array(9).fill(null));
  const [esTurnoX, setEsTurnoX] = useState(true);
  const [memoriaActiva, setMemoriaActiva] = useState(false);
  const [cartas, setCartas] = useState<{ id: number, emoji: string, revelada: boolean, resuelta: boolean }[]>([]);
  const [seleccionadas, setSeleccionadas] = useState<number[]>([]);
  const iconosParejas = ['🚭', '💪', '🚀', '🔥', '✨', '🍎'];
  const [reflejoActivo, setReflejoActivo] = useState(false);
  const [posicion, setPosicion] = useState({ top: 50, left: 50 });
  const [puntos, setPuntos] = useState(0);


  const [retoEjecutandose, setRetoEjecutandose] = useState<any | null>(null);
  const [progresoReto, setProgresoReto] = useState(0);
  const [segundos, setSegundos] = useState(0);


  const [fraseActual, setFraseActual] = useState(contenidoRescate.frases[0]);

  useEffect(() => {
    let intervalo: any;
    if (retoEjecutandose?.tipo === 'tiempo' && segundos > 0) {
      intervalo = setInterval(() => setSegundos((s) => s - 1), 1000);
    }
    return () => clearInterval(intervalo);
  }, [segundos, retoEjecutandose]);

  const moverEmoji = () => setPosicion({ top: Math.random() * 130, left: Math.random() * 170 });

  const iniciarMemoria = () => {
    const baraja = [...iconosParejas, ...iconosParejas].sort(() => Math.random() - 0.5).map((emoji, index) => ({ id: index, emoji, revelada: false, resuelta: false }));
    setCartas(baraja); setSeleccionadas([]); setMemoriaActiva(true);
  };

  const seleccionarCarta = (id: number) => {
    if (seleccionadas.length === 2 || cartas[id].revelada || cartas[id].resuelta) return;
    const nuevas = [...cartas]; nuevas[id].revelada = true; setCartas(nuevas);
    const sel = [...seleccionadas, id]; setSeleccionadas(sel);
    if (sel.length === 2) {
      if (cartas[sel[0]].emoji === cartas[sel[1]].emoji) {
        nuevas[sel[0]].resuelta = true; nuevas[sel[1]].resuelta = true; setSeleccionadas([]);
      } else {
        setTimeout(() => { nuevas[sel[0]].revelada = false; nuevas[sel[1]].revelada = false; setCartas([...nuevas]); setSeleccionadas([]); }, 800);
      }
    }
  };

  const generarFraseAleatoria = () => {
    const indice = Math.floor(Math.random() * contenidoRescate.frases.length);
    setFraseActual(contenidoRescate.frases[indice]);
  };

  const abrirRescate = () => {
    setCategoria(null); setJuegoActivo(false); setMemoriaActiva(false); setReflejoActivo(false); setRetoEjecutandose(null);
    generarFraseAleatoria();
    setModalVisible(true);
  };

  const abrirRetosDiarios = () => {
    alert("¡Próximamente: Tus retos diarios personalizados!");
  };

  return (
    <LinearGradient colors={['#F3F0FF', '#FFFFFF', '#FDF2F8']} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

            <View style={styles.topNav}>
              <Text style={styles.brandTitle}>BreakFree</Text>
              <Text style={styles.brandSubtitle}>Tu camino hacia la libertad</Text>
            </View>

            <View style={styles.whiteCard}>
              <View style={styles.headerRow}>
                <Text style={styles.todayTitle}>Progreso</Text>
                <TouchableOpacity style={styles.profileIcon}><Ionicons name="notifications-outline" size={20} color="#8E5CF6" /></TouchableOpacity>
              </View>

              <View style={styles.calendar}>
                {dias.map((item, i) => (
                  <View key={i} style={[styles.dayItem, item.active && styles.dayItemActive]}>
                    <Text style={[styles.dayName, item.active && styles.dayTextActive]}>{item.d}</Text>
                    {item.active && <View style={styles.activeDot} />}
                  </View>
                ))}
              </View>

              <View style={styles.illustrationContainer}>
                <LinearGradient colors={['#8E5CF6', '#C084FC']} style={styles.blob}><Ionicons name="rocket-outline" size={80} color="#FFF" /></LinearGradient>
                <Text style={styles.mainProgressText}>Desintoxicación (15%)</Text>
                <View style={styles.miniBarBg}><View style={[styles.miniBarFill, { width: '15%' }]} /></View>
              </View>

              <View style={styles.widgetsGrid}>
                <View style={styles.widget}>
                  <View style={styles.widgetHeader}><Ionicons name="time" size={18} color="#8E5CF6" /><Text style={styles.widgetTitle}>Tiempo</Text></View>
                  <Text style={styles.widgetValue}>02d 14h</Text>
                </View>
                <View style={styles.widget}>
                  <View style={styles.widgetHeader}><Ionicons name="cash-outline" size={18} color="#4ADE80" /><Text style={styles.widgetTitle}>Ahorro</Text></View>
                  <Text style={styles.widgetValue}>12.50€</Text>
                </View>
              </View>


              <View style={styles.journalSection}>
                <Text style={styles.journalTitle}>Reflexión del día</Text>
                <View style={styles.notaContainer}>
                  <TextInput
                    style={styles.inputNota}
                    placeholder="Escribe cómo va tu día..."
                    placeholderTextColor="#9CA3AF"
                    multiline
                    value={notaDiaria}
                    onChangeText={setNotaDiaria}
                  />
                  <TouchableOpacity style={styles.btnGuardarNota}>
                    <Ionicons name="checkmark-circle" size={24} color="#8E5CF6" />
                  </TouchableOpacity>
                </View>
              </View>


              <View style={styles.horizontalGrid}>

                <TouchableOpacity style={styles.activityButton} onPress={abrirRetosDiarios}>
                  <LinearGradient colors={['#E8FDF0', '#DCFCE7']} style={styles.activityGradient}>
                    <Ionicons name="trophy-outline" size={24} color="#22C55E" />
                    <Text style={styles.activityText}>RETOS DIARIOS</Text>
                  </LinearGradient>
                </TouchableOpacity>


                <TouchableOpacity style={styles.sosButton} onPress={abrirRescate}>
                  <LinearGradient colors={['#FEF2F2', '#FFF1F2']} style={styles.sosGradient}>
                    <Ionicons name="alert-circle" size={24} color="#EF4444" />
                    <Text style={styles.sosText}>SOS TENTACIÓN</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>


              <View style={styles.moodSection}>
                <Text style={styles.moodTitle}>¿Cómo te has sentido hoy?</Text>
                <View style={styles.emojiContainer}>
                  {emojisSentimientos.map((item) => (
                    <TouchableOpacity
                      key={item.label}
                      style={[
                        styles.emojiButton,
                        sentimientoSeleccionado === item.label && styles.emojiButtonActive
                      ]}
                      onPress={() => setSentimientoSeleccionado(item.label)}
                    >
                      <Text style={styles.emojiText}>{item.emoji}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centrarModal}>
          <View style={styles.modalContenido}>

            {categoria === 'frases' ? (
              <View style={styles.contenedorFrases}>
                <Text style={styles.modalTitulo}>Inspiración ✨</Text>
                <LinearGradient colors={['#F472B6', '#DB2777']} style={styles.tarjetaFrase}>
                  <Ionicons name="chatbubbles-outline" size={30} color="rgba(255,255,255,0.4)" style={{ alignSelf: 'flex-start' }} />
                  <Text style={styles.textoFrasePrincipal}>"{fraseActual.texto}"</Text>
                  <Ionicons name="heart" size={24} color="rgba(255,255,255,0.4)" style={{ alignSelf: 'flex-end' }} />
                </LinearGradient>
                <TouchableOpacity style={styles.btnNuevaFrase} onPress={generarFraseAleatoria}>
                  <Text style={styles.btnNuevaFraseTexto}>✨ Dame otra dosis de ánimo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.botonVolver} onPress={() => setCategoria(null)}><Text style={styles.textoVolver}>⬅️ Volver</Text></TouchableOpacity>
              </View>

            ) : retoEjecutandose ? (
              <View style={styles.gameContainer}>
                <Text style={styles.modalTitulo}>{retoEjecutandose.texto}</Text>
                {retoEjecutandose.tipo === 'tiempo' ? (
                  <View style={styles.circuloTiempo}><Text style={styles.numeroTiempo}>{segundos}s</Text></View>
                ) : (
                  <View style={styles.contenedorReps}>
                    <Text style={styles.numeroTiempo}>{progresoReto} / {retoEjecutandose.meta}</Text>
                    <TouchableOpacity style={styles.btnContar} onPress={() => setProgresoReto(Math.min(progresoReto + 1, retoEjecutandose.meta))}>
                      <Ionicons name="add" size={40} color="white" />
                    </TouchableOpacity>
                  </View>
                )}
                {((retoEjecutandose.tipo === 'tiempo' && segundos === 0) || (progresoReto === retoEjecutandose.meta)) && <Text style={styles.ganasteTexto}>¡LOGRADO! 🎉</Text>}
                <TouchableOpacity style={styles.botonVolver} onPress={() => setRetoEjecutandose(null)}><Text style={styles.textoVolver}>⬅️ Volver</Text></TouchableOpacity>
              </View>

            ) : reflejoActivo ? (
              <View style={styles.gameContainer}>
                <Text style={styles.modalTitulo}>¡Rápido! ⚡</Text>
                <View style={styles.areaReflejo}>
                  {puntos < 10 ? (
                    <TouchableOpacity onPress={() => { setPuntos(puntos + 1); moverEmoji(); }} style={[styles.emojiReflejo, { top: posicion.top, left: posicion.left }]}><Text style={{ fontSize: 40 }}>🚭</Text></TouchableOpacity>
                  ) : <Text style={styles.ganasteTexto}>¡Objetivo conseguido! 🎯</Text>}
                </View>
                <TouchableOpacity style={styles.botonVolver} onPress={() => setReflejoActivo(false)}><Text style={styles.textoVolver}>⬅️ Volver</Text></TouchableOpacity>
              </View>

            ) : memoriaActiva ? (
              <View style={styles.gameContainer}>
                <Text style={styles.modalTitulo}>Memoria 🧠</Text>
                <View style={styles.gridMemoria}>
                  {cartas.map((c) => (
                    <TouchableOpacity key={c.id} style={[styles.carta, (c.revelada || c.resuelta) && styles.cartaRevelada]} onPress={() => seleccionarCarta(c.id)}>
                      <Text style={styles.emojiCarta}>{(c.revelada || c.resuelta) ? c.emoji : simboloCartaMemoria}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity style={styles.botonVolver} onPress={() => setMemoriaActiva(false)}><Text style={styles.textoVolver}>⬅️ Volver</Text></TouchableOpacity>
              </View>

            ) : juegoActivo ? (
              <View style={styles.gameContainer}>
                <Text style={styles.modalTitulo}>Tres en Raya</Text>
                <View style={styles.board}>
                  {tablero.map((val, i) => (
                    <TouchableOpacity key={i} style={styles.square} onPress={() => { if (!val && !calcularGanador(tablero)) { const n = [...tablero]; n[i] = esTurnoX ? 'X' : 'O'; setTablero(n); setEsTurnoX(!esTurnoX); } }}>
                      <Text style={[styles.squareText, { color: val === 'X' ? '#8E5CF6' : '#F472B6' }]}>{val}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity style={styles.botonVolver} onPress={() => setJuegoActivo(false)}><Text style={styles.textoVolver}>⬅️ Volver</Text></TouchableOpacity>
              </View>

            ) : (
              <>
                {!categoria ? (
                  <>
                    <Text style={styles.modalTitulo}>¿Qué necesitas?</Text>
                    <TouchableOpacity style={[styles.botonMenu, { backgroundColor: '#8E5CF6' }]} onPress={() => setCategoria('juegos')}><Text style={styles.textoBoton}>🎮 Juegos</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.botonMenu, { backgroundColor: '#4ADE80' }]} onPress={() => setCategoria('retos')}><Text style={styles.textoBoton}>💪 Retos</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.botonMenu, { backgroundColor: '#F472B6' }]} onPress={() => setCategoria('frases')}><Text style={styles.textoBoton}>✨ Motivación</Text></TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text style={styles.modalTitulo}>{categoria.toUpperCase()}</Text>
                    {categoria === 'juegos' ? (
                      <View style={{ width: '100%' }}>
                        <TouchableOpacity style={styles.opcionCajaJuego} onPress={() => { setJuegoActivo(true); setTablero(Array(9).fill(null)); }}><Text style={styles.opcionTextoJuego}>❌ Tres en Raya</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.opcionCajaJuego} onPress={iniciarMemoria}><Text style={styles.opcionTextoJuego}>🧠 Memoria</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.opcionCajaJuego} onPress={() => { setReflejoActivo(true); setPuntos(0); moverEmoji(); }}><Text style={styles.opcionTextoJuego}>⚡ Reflejos</Text></TouchableOpacity>
                      </View>
                    ) : categoria === 'retos' ? (
                      contenidoRescate.retos.map((r) => (
                        <TouchableOpacity key={r.id} style={styles.opcionCaja} onPress={() => { setRetoEjecutandose(r); setProgresoReto(0); setSegundos(r.meta); }}>
                          <Text style={styles.opcionTexto}>🔥 {r.texto}</Text>
                        </TouchableOpacity>
                      ))
                    ) : null}
                    <TouchableOpacity style={styles.botonVolver} onPress={() => setCategoria(null)}><Text style={styles.textoVolver}>⬅️ Volver</Text></TouchableOpacity>
                  </>
                )}
              </>
            )}
            <TouchableOpacity style={styles.botonCerrarX} onPress={() => setModalVisible(false)}><Ionicons name="close-circle" size={36} color="#D1D5DB" /></TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { paddingBottom: 40 },
  topNav: { alignItems: 'center', marginTop: 10, marginBottom: 15 },
  brandTitle: { fontSize: 38, fontWeight: '900', color: '#5D45DB', letterSpacing: -1 },
  brandSubtitle: { fontSize: 14, color: '#6B7280', fontWeight: '500' },
  whiteCard: { backgroundColor: 'rgba(255, 255, 255, 0.9)', marginHorizontal: 12, borderRadius: 45, padding: 22, elevation: 8 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  todayTitle: { fontSize: 28, fontWeight: '800', color: '#1F2937' },
  profileIcon: { backgroundColor: '#F3F0FF', padding: 10, borderRadius: 18 },
  calendar: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  dayItem: { width: 40, height: 55, backgroundColor: '#F3F4F6', borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  dayItemActive: { backgroundColor: '#5D45DB' },
  dayName: { fontSize: 14, fontWeight: '700', color: '#9CA3AF' },
  dayTextActive: { color: '#FFF' },
  activeDot: { width: 4, height: 4, backgroundColor: '#FFF', borderRadius: 2, marginTop: 4 },
  illustrationContainer: { alignItems: 'center', marginBottom: 30 },
  blob: { width: 110, height: 110, borderRadius: 55, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  mainProgressText: { fontSize: 20, fontWeight: '900', color: '#111827' },
  miniBarBg: { width: '60%', height: 8, backgroundColor: '#E5E7EB', borderRadius: 10, marginTop: 15, overflow: 'hidden' },
  miniBarFill: { height: '100%', backgroundColor: '#8E5CF6', borderRadius: 10 },
  widgetsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  widget: { backgroundColor: '#FFF', width: '48%', borderRadius: 25, padding: 16, borderWidth: 1, borderColor: '#F3F4F6' },
  widgetHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
  widgetTitle: { fontSize: 12, fontWeight: '700', color: '#6B7280', marginLeft: 6 },
  widgetValue: { fontSize: 18, fontWeight: '800', color: '#111827' },

  // ESTILOS JOURNAL
  journalSection: { backgroundColor: '#F9FAFB', borderRadius: 25, padding: 15, marginBottom: 15 },
  journalTitle: { fontSize: 16, fontWeight: '800', color: '#1F2937', marginBottom: 12 },
  notaContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 15, paddingHorizontal: 10, borderWidth: 1, borderColor: '#E5E7EB' },
  inputNota: { flex: 1, paddingVertical: 10, fontSize: 14, color: '#374151', minHeight: 40 },
  btnGuardarNota: { padding: 5 },


  horizontalGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  activityButton: { width: '48%' },
  activityGradient: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 15, borderRadius: 25, borderWidth: 1, borderColor: '#BBF7D0', height: 80 },
  activityText: { color: '#16A34A', fontWeight: '800', fontSize: 12, marginTop: 8, textAlign: 'center' },

  sosButton: { width: '48%' },
  sosGradient: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 15, borderRadius: 25, height: 80 },
  sosText: { color: '#EF4444', fontWeight: '800', fontSize: 12, marginTop: 8, textAlign: 'center' },


  moodSection: { backgroundColor: '#F9FAFB', borderRadius: 25, padding: 15, marginTop: 5 },
  moodTitle: { fontSize: 16, fontWeight: '800', color: '#1F2937', marginBottom: 12, textAlign: 'center' },
  emojiContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  emojiButton: { padding: 10, borderRadius: 15, backgroundColor: 'white', width: '18%', alignItems: 'center', elevation: 2 },
  emojiButtonActive: { backgroundColor: '#8E5CF6', borderWidth: 1, borderColor: '#5D45DB' },
  emojiText: { fontSize: 20 },

  centrarModal: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContenido: { width: '85%', backgroundColor: 'white', borderRadius: 35, padding: 25, alignItems: 'center' },
  modalTitulo: { fontSize: 20, fontWeight: '900', color: '#1F2937', marginBottom: 15, textAlign: 'center' },
  botonMenu: { width: '100%', padding: 18, borderRadius: 20, marginBottom: 12, alignItems: 'center' },
  textoBoton: { color: 'white', fontWeight: '800', fontSize: 16 },
  opcionCaja: { width: '100%', backgroundColor: '#F3F4F6', padding: 15, borderRadius: 15, marginBottom: 10 },
  opcionTexto: { fontSize: 15, color: '#4B5563', fontWeight: '600', textAlign: 'center' },
  botonVolver: { marginTop: 15, padding: 10 },
  textoVolver: { color: '#8E5CF6', fontWeight: 'bold' },
  botonCerrarX: { position: 'absolute', top: -10, right: -10, backgroundColor: 'white', borderRadius: 20 },
  gameContainer: { alignItems: 'center', width: '100%' },
  board: { width: 210, height: 210, flexDirection: 'row', flexWrap: 'wrap', backgroundColor: '#E5E7EB', padding: 5, borderRadius: 15 },
  square: { width: 63, height: 63, backgroundColor: 'white', margin: 2, justifyContent: 'center', alignItems: 'center', borderRadius: 10 },
  squareText: { fontSize: 30, fontWeight: 'bold' },
  gridMemoria: { width: '100%', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  carta: { width: 55, height: 55, backgroundColor: '#8E5CF6', margin: 4, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  cartaRevelada: { backgroundColor: '#F3F4F6' },
  emojiCarta: { fontSize: 22 },
  opcionCajaJuego: { width: '100%', backgroundColor: '#F3F0FF', padding: 15, borderRadius: 15, marginBottom: 10, borderWidth: 1, borderColor: '#8E5CF6' },
  opcionTextoJuego: { color: '#8E5CF6', fontWeight: 'bold', textAlign: 'center' },
  areaReflejo: { width: '100%', height: 180, backgroundColor: '#F9FAFB', borderRadius: 20, position: 'relative', overflow: 'hidden' },
  emojiReflejo: { position: 'absolute' },
  ganasteTexto: { fontSize: 18, fontWeight: 'bold', color: '#4ADE80', marginVertical: 10 },
  circuloTiempo: { width: 100, height: 100, borderRadius: 50, borderWidth: 6, borderColor: '#4ADE80', justifyContent: 'center', alignItems: 'center', marginVertical: 20 },
  numeroTiempo: { fontSize: 32, fontWeight: '900', color: '#111827' },
  contenedorReps: { alignItems: 'center', marginVertical: 10 },
  btnContar: { backgroundColor: '#4ADE80', width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginTop: 10 },
  contenedorFrases: { width: '100%', alignItems: 'center' },
  tarjetaFrase: { width: '100%', padding: 25, borderRadius: 25, minHeight: 180, justifyContent: 'center', alignItems: 'center' },
  textoFrasePrincipal: { color: 'white', fontSize: 18, fontWeight: '800', textAlign: 'center', fontStyle: 'italic', lineHeight: 26, marginVertical: 10 },
  btnNuevaFrase: { marginTop: 15, backgroundColor: '#F3F4F6', paddingVertical: 12, paddingHorizontal: 15, borderRadius: 15, borderWidth: 1, borderColor: '#F472B6' },
  btnNuevaFraseTexto: { color: '#DB2777', fontWeight: 'bold', fontSize: 13 },
});