/** This file is for the habit-specific screen, where the user can view details and challenges related to a particular habit. */

import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Modal,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import { contenidoRescatePorHabito } from '../../constants/habitoData';

const { width } = Dimensions.get('window');

const dias = [
  { d: 'L', active: false }, { d: 'M', active: false }, { d: 'X', active: false },
  { d: 'J', active: true }, { d: 'V', active: false }, { d: 'S', active: false }, { d: 'D', active: false }
];

const RETOS_POR_HABITO: Record<string, string[]> = {
  tabaco: [
    "No fumar justo después de las comidas principales",
    "Retrasar el primer cigarrillo del día 1 hora",
    "Cambiar el cigarrillo del café por un chicle o infusión",
    "Superar un momento de ansiedad respirando hondo 3 minutos",
    "Guardar en una hucha el dinero que habrías gastado hoy"
  ],
  ansiedadComer: [
    "Beber un vaso de agua grande antes de asaltar la nevera",
    "Esperar 15 minutos cuando sientas antojo antes de comer algo",
    "Sustituir un snack ultraprocessed por una pieza de fruta",
    "Comer sin distracciones (sin mirar la televisión ni el móvil)",
    "Hacer 5 respiraciones conscientes antes de tu comida principal"
  ],
  procrastinar: [
    "Hacer la tarea más difícil o pesada a primera hora de la mañana",
    "Trabajar 25 minutes seguidos sin mirar las notificaciones (Pomodoro)",
    "Escribir en una lista solo las 3 tareas clave para el día de hoy",
    "Dar el primer paso de una tarea pendiente durante solo 5 minutos",
    "Dejar tu espacio de trabajo limpio y ordenado al terminar"
  ],
  doomscrolling: [
    "No usar el teléfono móvil durante la primera hora de la mañana",
    "Establecer un límite de 15 minutos en tu red social más adictiva",
    "Almorzar o cenar dejando el dispositivo en otra habitación",
    "Poner la pantalla en modo escala de grises para reducir el estímulo",
    "Dejar el móvil lejos de la cama 45 minutos antes de irte a dormir"
  ],
  default: [
    "Completar tu reflexión en el diario hoy",
    "Identificar tu mayor tentación de la mañana y esquivarla",
    "Identificar tu mayor tentación de la tarde y esquivarla",
    "Tomarte 5 minutos para respirar conscientemente",
    "Revisar tus motivos para cambiar al final de la jornada"
  ]
};

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
  const params = useLocalSearchParams();

  let habitoDetectado: any = params.habito || params.habitoSeleccionado;

  if (!habitoDetectado && typeof window !== 'undefined') {
    const queryParams = new URLSearchParams(window.location.search);
    habitoDetectado = queryParams.get('habito') || queryParams.get('habitoSeleccionado');

    if (!habitoDetectado && window.location.href.includes('habito=')) {
      const parts = window.location.href.split('habito=');
      if (parts[1]) habitoDetectado = parts[1].split('&')[0];
    } else if (!habitoDetectado && window.location.href.includes('habitoSeleccionado=')) {
      const parts = window.location.href.split('habitoSeleccionado=');
      if (parts[1]) habitoDetectado = parts[1].split('&')[0];
    }
  }

  const habitoActivo = (['tabaco', 'ansiedadComer', 'procrastinar', 'doomscrolling'].includes(habitoDetectado)
    ? habitoDetectado
    : 'tabaco') as 'tabaco' | 'ansiedadComer' | 'procrastinar' | 'doomscrolling';

  const simboloCartaMemoria = '❓';
  const emojisSentimientos = [
    { emoji: '😔', label: 'Mal' },
    { emoji: '😐', label: 'Regular' },
    { emoji: '😊', label: 'Bien' },
    { emoji: '🤩', label: 'Genial' },
    { emoji: '🔥', label: 'Fuerte' }
  ];

  const [modalVisible, setModalVisible] = useState(false);
  const [modalJournalVisible, setModalJournalVisible] = useState(false);

  const [modalRetosVisible, setModalRetosVisible] = useState(false);
  const [retosMarcados, setRetosMarcados] = useState<Record<number, boolean>>({});

  const [currentCategoria, setCategoria] = useState<'juegos' | 'retos' | 'frases' | null>(null);

  const [sentimientoSeleccionado, setSentimientoSeleccionado] = useState<string | null>(null);
  const [notaDiaria, setNotaDiaria] = useState('');
  const [diarioGuardado, setDiarioGuardado] = useState(false);

  const [juegoActivo, setJuegoActivo] = useState(false);
  const [tablero, setTablero] = useState(Array(9).fill(null));
  const [esTurnoX, setEsTurnoX] = useState(true);

  const [memoriaActiva, setMemoriaActiva] = useState(false);
  const [cartas, setCartas] = useState<{ id: number, emoji: string, revelada: boolean, resuelta: boolean }[]>([]);
  const [seleccionadas, setSeleccionadas] = useState<number[]>([]);

  const [reflejoActivo, setReflejoActivo] = useState(false);
  const [posicion, setPosicion] = useState({ top: 50, left: 50 });
  const [puntos, setPuntos] = useState(0);

  const [retoEjecutandose, setRetoEjecutandose] = useState<any | null>(null);
  const [progresoReto, setProgresoReto] = useState(0);
  const [segundos, setSegundos] = useState(0);
  const [fraseActual, setFraseActual] = useState({ id: 1, texto: "" });

  const retosDelDia = RETOS_POR_HABITO[habitoActivo] || RETOS_POR_HABITO.default || [];

  useEffect(() => {
    let intervalo: any;
    if (retoEjecutandose?.tipo === 'tiempo' && segundos > 0) {
      intervalo = setInterval(() => setSegundos((s) => s - 1), 1000);
    }
    return () => clearInterval(intervalo);
  }, [segundos, retoEjecutandose]);

  const moverEmoji = () => setPosicion({ top: Math.random() * 130, left: Math.random() * 170 });

  const iniciarMemoria = () => {
    const iconos = contenidoRescatePorHabito[habitoActivo].juegos.iconosParejas;
    const baraja = [...iconos, ...iconos]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        revealed: true,
        revelada: true,
        resuelta: false
      }));

    setCartas(baraja);
    setSeleccionadas([]);
    setMemoriaActiva(true);

    setTimeout(() => {
      setCartas((prev) => prev.map((c) => ({ ...c, revelada: false })));
    }, 2000);
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
    const frasesHabito = contenidoRescatePorHabito[habitoActivo].frases;
    const indice = Math.floor(Math.random() * frasesHabito.length);
    setFraseActual(frasesHabito[indice]);
  };

  const abrirRescate = () => {
    setCategoria(null); setJuegoActivo(false); setMemoriaActiva(false); setReflejoActivo(false); setRetoEjecutandose(null);
    generarFraseAleatoria();
    setModalVisible(true);
  };

  const abrirRetosDiarios = () => {
    setModalRetosVisible(true);
  };

  const toggleRetoIndice = (index: number) => {
    setRetosMarcados(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const guardarReflexionCompleta = () => {
    if (!sentimientoSeleccionado) {
      alert("Por favor, selecciona un estado de ánimo antes de guardar.");
      return;
    }
    setDiarioGuardado(true);
    setModalJournalVisible(false);
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
                <TouchableOpacity style={styles.profileIcon}>
                  <Ionicons name="notifications-outline" size={20} color="#8E5CF6" />
                </TouchableOpacity>
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
                <LinearGradient colors={['#8E5CF6', '#C084FC']} style={styles.blob}>
                  <Ionicons name="rocket-outline" size={80} color="#FFF" />
                </LinearGradient>

                <Text style={styles.mainProgressText}>
                  {contenidoRescatePorHabito[habitoActivo].progresoTexto}
                </Text>

                <View style={styles.miniBarBg}>
                  <View style={[styles.miniBarFill, { width: '15%' }]} />
                </View>
              </View>


              <View style={styles.listaModulosHorizontales}>


                {habitoActivo === 'ansiedadComer' && (
                  <View style={styles.tarjetaFilaHorizontal}>
                    <LinearGradient colors={['#A8FF78', '#78FFD6']} style={styles.bloqueDatoVerde}>
                      <Text style={styles.textoDatoVerde}>
                        {contenidoRescatePorHabito[habitoActivo].metricaValor}
                      </Text>
                    </LinearGradient>
                    <View style={styles.bloqueMensajeDerecho}>
                      <Text style={styles.tituloMetricaFila}>Nº Días</Text>
                      <Text style={styles.textoMensajeFila}>
                        ¡Buen trabajo! Cada día libre de ansiedad es un paso hacia una vida más saludable.
                      </Text>
                    </View>
                  </View>
                )}


                {habitoActivo === 'tabaco' && (
                  <View style={styles.tarjetaFilaHorizontal}>
                    <LinearGradient colors={['#A8FF78', '#78FFD6']} style={styles.bloqueDatoVerde}>
                      <Text style={styles.textoDatoVerde}>
                        {contenidoRescatePorHabito[habitoActivo].ahorroTexto}
                      </Text>
                    </LinearGradient>
                    <View style={styles.bloqueMensajeDerecho}>
                      <Text style={styles.tituloMetricaFila}>Dinero Ahorrado</Text>
                      <Text style={styles.textoMensajeFila}>
                        ¡Suma y sigue! Estás protegiendo tu salud y tu bolsillo al mismo tiempo.
                      </Text>
                    </View>
                  </View>
                )}


                {habitoActivo === 'procrastinar' && (
                  <View style={styles.tarjetaFilaHorizontal}>
                    <LinearGradient colors={['#A8FF78', '#78FFD6']} style={styles.bloqueDatoVerde}>
                      <Text style={styles.textoDatoVerde}>
                        {contenidoRescatePorHabito[habitoActivo].metricaValor}
                      </Text>
                    </LinearGradient>
                    <View style={styles.bloqueMensajeDerecho}>
                      <Text style={styles.tituloMetricaFila}>Tiempo no perdido</Text>
                      <Text style={styles.textoMensajeFila}>
                        ¡Excelente! Estás tomando el control de tu tiempo para avanzar en tus proyectos.
                      </Text>
                    </View>
                  </View>
                )}


                {habitoActivo === 'doomscrolling' && (
                  <View style={styles.tarjetaFilaHorizontal}>
                    <LinearGradient colors={['#A8FF78', '#78FFD6']} style={styles.bloqueDatoVerde}>
                      <Text style={styles.textoDatoVerde}>
                        {contenidoRescatePorHabito[habitoActivo].metricaValor}
                      </Text>
                    </LinearGradient>
                    <View style={styles.bloqueMensajeDerecho}>
                      <Text style={styles.tituloMetricaFila}>Horas Ganadas</Text>
                      <Text style={styles.textoMensajeFila}>
                        ¡Increíble! Menos pantalla significa más tiempo real para lo que de verdad importa.
                      </Text>
                    </View>
                  </View>
                )}

              </View>

              <TouchableOpacity
                style={[styles.journalSection, diarioGuardado && styles.journalSectionCompleted]}
                onPress={() => setModalJournalVisible(true)}
                activeOpacity={0.8}
              >
                <View style={styles.journalHeaderRow}>
                  <Text style={styles.journalTitle}>Reflexión del día</Text>
                  <Ionicons
                    name={diarioGuardado ? "journal" : "journal-outline"}
                    size={20}
                    color={diarioGuardado ? "#10B981" : "#8E5CF6"}
                  />
                </View>

                <View style={styles.notaContainerFalsa}>
                  <Text style={styles.placeholderFalso}>
                    {diarioGuardado
                      ? `Completado • Te sientes ${sentimientoSeleccionado}`
                      : (notaDiaria.trim() ? notaDiaria : "Pulsa para escribir cómo va tu día...")}
                  </Text>
                  <View style={[styles.circleCheckFalso, diarioGuardado && styles.circleCheckVerde]}>
                    <Ionicons name="checkmark" size={14} color="white" />
                  </View>
                </View>
              </TouchableOpacity>

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

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalJournalVisible}
        onRequestClose={() => setModalJournalVisible(false)}
      >
        <View style={styles.modalOverlayJournal}>
          <View style={styles.modalContentJournal}>
            <View style={styles.modalJournalHeader}>
              <View>
                <Text style={styles.modalJournalTitle}>Mi Diario</Text>
                <Text style={styles.modalJournalDate}>
                  {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                </Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <TouchableOpacity
                  style={styles.btnHistory}
                  onPress={() => {
                    setModalJournalVisible(false);
                    router.push({
                      pathname: '/historial-journal',
                      params: { origen: 'habito', habito: habitoActivo },
                    });
                  }}
                  activeOpacity={0.7}
                >
                  <Ionicons name="time-outline" size={22} color="#8E5CF6" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalJournalVisible(false)}>
                  <Ionicons name="close-circle" size={32} color="#D1D5DB" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.moodSectionInside}>
              <Text style={styles.moodTitleInside}>¿Cómo te sientes frente a tus retos hoy?</Text>
              <View style={styles.emojiContainerInside}>
                {emojisSentimientos.map((item) => (
                  <TouchableOpacity
                    key={item.label}
                    style={[
                      styles.emojiButtonInside,
                      sentimientoSeleccionado === item.label && styles.emojiButtonActiveInside
                    ]}
                    onPress={() => setSentimientoSeleccionado(item.label)}
                  >
                    <Text style={styles.emojiTextInside}>{item.emoji}</Text>
                    <Text style={[styles.emojiLabelInside, sentimientoSeleccionado === item.label && { color: 'white', fontWeight: '700' }]}>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Text style={styles.inputLabelInside}>¿Qué tienes en mente?</Text>
            <TextInput
              style={styles.modalJournalInput}
              placeholder="¿Has tenido tentaciones? ¿Qué te ha ayudado a mantenerte firme? Desahógate..."
              placeholderTextColor="#9CA3AF"
              multiline
              textAlignVertical="top"
              value={notaDiaria}
              onChangeText={(text) => setNotaDiaria(text)}
            />

            <TouchableOpacity style={styles.btnGuardarJournal} onPress={guardarReflexionCompleta}>
              <Text style={styles.btnGuardarJournalTexto}>Guardar Reflexión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalRetosVisible}
        onRequestClose={() => setModalRetosVisible(false)}
      >
        <View style={styles.modalOverlayJournal}>
          <View style={[styles.modalContentJournal, { height: '75%' }]}>
            <View style={styles.modalJournalHeader}>
              <View>
                <Text style={styles.modalJournalTitle}>Retos de Hoy</Text>
                <Text style={[styles.modalJournalDate, { color: '#22C55E' }]}>Objetivos de consolidación</Text>
              </View>
              <TouchableOpacity onPress={() => setModalRetosVisible(false)}>
                <Ionicons name="close-circle" size={32} color="#D1D5DB" />
              </TouchableOpacity>
            </View>

            <Text style={{ fontSize: 14, color: '#6B7280', marginBottom: 15, fontWeight: '500' }}>
              Completa las 5 acciones clave diseñadas para debilitar el hábito de: <Text style={{ fontWeight: 'bold', color: '#111827' }}>{habitoActivo.toUpperCase()}</Text>
            </Text>

            <ScrollView showsVerticalScrollIndicator={false} style={{ marginVertical: 10 }}>
              {retosDelDia.map((textoReto, index) => {
                const completado = !!retosMarcados[index];
                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.filaRetoCard, completado && styles.filaRetoCardCompletada]}
                    onPress={() => toggleRetoIndice(index)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.textoRetoItem, completado && styles.textoRetoItemCompletado]}>
                      {textoReto}
                    </Text>
                    <View style={[styles.checkboxReto, completado && styles.checkboxRetoChecked]}>
                      {completado && <Ionicons name="checkmark-sharp" size={14} color="white" />}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <TouchableOpacity
              style={[styles.btnGuardarJournal, { backgroundColor: '#22C55E', marginTop: 10 }]}
              onPress={() => setModalRetosVisible(false)}
            >
              <Text style={styles.btnGuardarJournalTexto}>Listo por hoy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>


      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centrarModal}>
          <View style={styles.modalContenido}>
            {currentCategoria === 'frases' ? (
              <View style={styles.gameContainer}>
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
                    <TouchableOpacity onPress={() => { setPuntos(puntos + 1); moverEmoji(); }} style={[styles.emojiReflejo, { top: posicion.top, left: posicion.left }]}>
                      <Text style={{ fontSize: 40 }}>{contenidoRescatePorHabito[habitoActivo].juegos.emojiReflejo}</Text>
                    </TouchableOpacity>
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
                    <TouchableOpacity
                      key={i}
                      style={styles.square}
                      onPress={() => {
                        if (!val && !calcularGanador(tablero)) {
                          const n = [...tablero];
                          n[i] = esTurnoX ? 'X' : 'O';
                          setTablero(n);
                          setEsTurnoX(!esTurnoX);
                        }
                      }}
                    >
                      <Text style={[styles.squareText, { color: val === 'X' ? '#8E5CF6' : '#F472B6' }]}>{val}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity style={styles.botonVolver} onPress={() => setJuegoActivo(false)}><Text style={styles.textoVolver}>⬅️ Volver</Text></TouchableOpacity>
              </View>
            ) : (
              <>
                {!currentCategoria ? (
                  <>
                    <Text style={styles.modalTitulo}>SOS {contenidoRescatePorHabito[habitoActivo].titulo}</Text>
                    <TouchableOpacity style={[styles.botonMenu, { backgroundColor: '#8E5CF6' }]} onPress={() => setCategoria('juegos')}><Text style={styles.textoBoton}>🎮 Juegos</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.botonMenu, { backgroundColor: '#4ADE80' }]} onPress={() => setCategoria('retos')}><Text style={styles.textoBoton}>💪 Retos</Text></TouchableOpacity>
                    <TouchableOpacity style={[styles.botonMenu, { backgroundColor: '#F472B6' }]} onPress={() => setCategoria('frases')}><Text style={styles.textoBoton}>✨ Motivación</Text></TouchableOpacity>
                  </>
                ) : (
                  <>
                    <Text style={styles.modalTitulo}>{currentCategoria.toUpperCase()}</Text>
                    {currentCategoria === 'juegos' ? (
                      <View style={{ width: '100%' }}>
                        <TouchableOpacity style={styles.opcionCajaJuego} onPress={() => { setJuegoActivo(true); setTablero(Array(9).fill(null)); }}><Text style={styles.opcionTextoJuego}>❌ Tres en Raya</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.opcionCajaJuego} onPress={iniciarMemoria}><Text style={styles.opcionTextoJuego}>🧠 Memoria</Text></TouchableOpacity>
                        <TouchableOpacity style={styles.opcionCajaJuego} onPress={() => { setReflejoActivo(true); setPuntos(0); moverEmoji(); }}><Text style={styles.opcionTextoJuego}>⚡ Reflejos</Text></TouchableOpacity>
                      </View>
                    ) : currentCategoria === 'retos' ? (
                      contenidoRescatePorHabito[habitoActivo].retos.map((r) => (
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
  mainProgressText: { fontSize: 18, fontWeight: '900', color: '#111827', textAlign: 'center' },
  miniBarBg: { width: '60%', height: 8, backgroundColor: '#E5E7EB', borderRadius: 10, marginTop: 15, overflow: 'hidden' },
  miniBarFill: { height: '100%', backgroundColor: '#8E5CF6', borderRadius: 10 },

  listaModulosHorizontales: {
    flexDirection: 'column',
    gap: 14,
    marginBottom: 20,
  },
  tarjetaFilaHorizontal: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    height: 85,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  bloqueDatoVerde: {
    width: '28%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoDatoVerde: {
    fontSize: 18,
    fontWeight: '900',
    color: '#111827',
    textAlign: 'center',
  },
  bloqueMensajeDerecho: {
    width: '72%',
    paddingHorizontal: 16,
    justifyContent: 'center',
  },
  tituloMetricaFila: {
    fontSize: 11,
    fontWeight: '800',
    color: '#8E5CF6',
    textTransform: 'uppercase',
    marginBottom: 2,
    letterSpacing: 0.5,
  },
  textoMensajeFila: {
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '600',
    lineHeight: 16,
  },

  journalSection: { backgroundColor: '#F9FAFB', borderRadius: 28, padding: 18, marginBottom: 20, borderWidth: 1, borderColor: '#F3F4F6' },
  journalSectionCompleted: { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' },
  journalHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  journalTitle: { fontSize: 18, fontWeight: '800', color: '#1F2937' },
  notaContainerFalsa: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: 'white', borderRadius: 16, paddingHorizontal: 15, paddingVertical: 12, borderWidth: 1, borderColor: '#E5E7EB' },
  placeholderFalso: { color: '#9CA3AF', fontSize: 14, fontWeight: '500', flex: 1 },
  circleCheckFalso: { backgroundColor: '#D1D5DB', width: 22, height: 22, borderRadius: 11, justifyContent: 'center', alignItems: 'center', marginLeft: 10 },
  circleCheckVerde: { backgroundColor: '#10B981' },
  horizontalGrid: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  activityButton: { width: '48%' },
  activityGradient: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 15, borderRadius: 25, borderWidth: 1, borderColor: '#BBF7D0', height: 80 },
  activityText: { color: '#16A34A', fontWeight: '800', fontSize: 12, marginTop: 8, textAlign: 'center' },
  sosButton: { width: '48%' },
  sosGradient: { flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 15, borderRadius: 25, height: 80 },
  sosText: { color: '#EF4444', fontWeight: '800', fontSize: 12, marginTop: 8, textAlign: 'center' },
  modalOverlayJournal: { flex: 1, backgroundColor: 'rgba(0,0,0,0.4)', justifyContent: 'flex-end' },
  modalContentJournal: { backgroundColor: 'white', borderTopLeftRadius: 40, borderTopRightRadius: 40, padding: 25, height: '80%' },
  modalJournalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  modalJournalTitle: { fontSize: 24, fontWeight: '900', color: '#1F2937' },
  modalJournalDate: { color: '#8E5CF6', fontWeight: '700', fontSize: 14, marginTop: 2 },
  btnHistory: { backgroundColor: '#F3F0FF', padding: 10, borderRadius: 15, marginRight: 10 },
  moodSectionInside: { backgroundColor: '#F9FAFB', borderRadius: 22, padding: 16, marginBottom: 20 },
  moodTitleInside: { fontSize: 15, fontWeight: '800', color: '#374151', marginBottom: 12 },
  emojiContainerInside: { flexDirection: 'row', justifyContent: 'space-between' },
  emojiButtonInside: { paddingVertical: 10, paddingHorizontal: 4, borderRadius: 16, backgroundColor: 'white', width: '18%', alignItems: 'center', borderWidth: 1, borderColor: '#E5E7EB' },
  emojiButtonActiveInside: { backgroundColor: '#8E5CF6', borderColor: '#5D45DB' },
  emojiTextInside: { fontSize: 22, marginBottom: 2 },
  emojiLabelInside: { fontSize: 10, color: '#6B7280', fontWeight: '600' },
  inputLabelInside: { fontSize: 15, fontWeight: '800', color: '#374151', marginBottom: 10 },
  modalJournalInput: { flex: 1, backgroundColor: '#F9FAFB', borderRadius: 20, padding: 15, color: '#111827' },
  btnGuardarJournal: { backgroundColor: '#8E5CF6', padding: 16, borderRadius: 20, alignItems: 'center', marginTop: 10 },
  btnGuardarJournalTexto: { color: 'white', fontWeight: '800', fontSize: 16 },
  filaRetoCard: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#F9FAFB', padding: 16, borderRadius: 20, marginBottom: 10, borderWidth: 1, borderColor: '#F3F4F6' },
  filaRetoCardCompletada: { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' },
  textoRetoItem: { fontSize: 14, color: '#374151', fontWeight: '600', flex: 1, paddingRight: 10 },
  textoRetoItemCompletado: { color: '#10B981', textDecorationLine: 'line-through' },
  checkboxReto: { width: 22, height: 22, borderRadius: 8, borderWidth: 2, borderColor: '#D1D5DB', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' },
  checkboxRetoChecked: { backgroundColor: '#22C55E', borderColor: '#22C55E' },
  centrarModal: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.4)' },
  modalContenido: { backgroundColor: 'white', borderRadius: 35, padding: 25, width: width * 0.88, alignItems: 'center', elevation: 10, position: 'relative' },
  modalTitulo: { fontSize: 22, fontWeight: '900', color: '#111827', marginBottom: 20, textAlign: 'center' },
  botonVolver: { marginTop: 15, padding: 10 },
  textoVolver: { color: '#6B7280', fontWeight: '700', fontSize: 14 },
  botonCerrarX: { position: 'absolute', top: -15, right: -15, elevation: 11 },
  opcionCaja: { backgroundColor: '#F9FAFB', width: '100%', padding: 16, borderRadius: 20, marginBottom: 10, borderWidth: 1, borderColor: '#E5E7EB' },
  opcionTexto: { color: '#374151', fontWeight: '700', fontSize: 14 },
  opcionCajaJuego: { backgroundColor: '#F3F0FF', width: '100%', padding: 16, borderRadius: 20, marginBottom: 10, alignItems: 'center' },
  opcionTextoJuego: { color: '#8E5CF6', fontWeight: '800', fontSize: 15 },
  gameContainer: { width: '100%', alignItems: 'center' },
  tarjetaFrase: { width: '100%', padding: 22, borderRadius: 25, marginVertical: 10 },
  textoFrasePrincipal: { color: 'white', fontSize: 18, fontWeight: '700', textAlign: 'center', fontStyle: 'italic', marginVertical: 15, lineHeight: 24 },
  btnNuevaFrase: { backgroundColor: '#FCE7F3', padding: 14, borderRadius: 15, marginTop: 10, width: '100%', alignItems: 'center' },
  btnNuevaFraseTexto: { color: '#DB2777', fontWeight: '800', fontSize: 14 },
  circuloTiempo: { width: 120, height: 120, borderRadius: 60, borderWidth: 6, borderColor: '#8E5CF6', justifyContent: 'center', alignItems: 'center', marginVertical: 20 },
  numeroTiempo: { fontSize: 32, fontWeight: '900', color: '#111827' },
  contenedorReps: { alignItems: 'center', marginVertical: 15 },
  btnContar: { backgroundColor: '#4ADE80', width: 70, height: 70, borderRadius: 35, justifyContent: 'center', alignItems: 'center', marginTop: 15, elevation: 3 },
  ganasteTexto: { fontSize: 20, fontWeight: '900', color: '#22C55E', marginVertical: 10 },
  areaReflejo: { width: '100%', height: 200, backgroundColor: '#F9FAFB', borderRadius: 20, overflow: 'hidden', position: 'relative', borderWidth: 1, borderColor: '#E5E7EB', marginVertical: 10 },
  emojiReflejo: { position: 'absolute', padding: 10 },
  gridMemoria: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: '100%', gap: 10, marginVertical: 10 },
  carta: { width: 60, height: 60, backgroundColor: '#8E5CF6', borderRadius: 15, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  cartaRevelada: { backgroundColor: '#F3F0FF', borderWidth: 2, borderColor: '#8E5CF6' },
  emojiCarta: { fontSize: 24 },
  board: { width: 240, height: 240, flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginVertical: 15 },
  square: { width: 76, height: 76, backgroundColor: '#F9FAFB', borderWidth: 1, borderColor: '#E5E7EB', borderRadius: 15, justifyContent: 'center', alignItems: 'center' },
  squareText: { fontSize: 28, fontWeight: '900' },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
  botonMenu: {
    width: '100%',
    padding: 16,
    borderRadius: 20,
    marginBottom: 12,
    alignItems: 'center',
  },
});
