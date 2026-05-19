

export const contenidoRescatePorHabito = {
  tabaco: {
    titulo: "Controlar el Tabaco 🚭",
    progresoTexto: "Libre de Humo (15%)",
    ahorroTexto: "12.50€",
    metricaValor: "02d 14h",
    metricaLabel: "Tiempo",
    metricaIcono: "time" as const,
    juegos: {
      iconosParejas: ['🚭', '💪', '🚀', '🔥', '✨', '🍎'],
      emojiReflejo: '🚭'
    },
    retos: [
      { id: 1, texto: "Bebe un vaso de agua fría muy despacio", tipo: 'reps', meta: 1 },
      { id: 2, texto: "Haz 3 minutos de estiramientos controlados", tipo: 'tiempo', meta: 180 },
      { id: 3, texto: "Aguanta una plancha abdominal", tipo: 'tiempo', meta: 30 },
      { id: 4, texto: "Inhala en 4s, retén 4s, exhala en 4s", tipo: 'tiempo', meta: 16 }
    ],
    frases: [
      { id: 1, texto: "No dejes que un cigarrillo borre tu esfuerzo acumulado." },
      { id: 2, texto: "Tus pulmones y tu salud te lo agradecerán mañana mismo." },
      { id: 3, texto: "El antojo dura solo unos minutos; superarlo te da fuerza toda la vida." },
      { id: 4, texto: "Cada cigarrillo rechazado es una victoria real en tu marcador." }
    ]
  },
  ansiedadComer: {
    titulo: "Ansiedad por Comer 🍎",
    progresoTexto: "Alimentación Consciente (15%)",
    ahorroTexto: "8.00€",
    metricaValor: "5",
    metricaLabel: "Ataques Evitados",
    metricaIcono: "heart-outline" as const,
    juegos: {
      iconosParejas: ['🥦', '💧', '🧠', '🧘', '🥝', '👟'],
      emojiReflejo: '🥦'
    },
    retos: [
      { id: 1, texto: "Aléjate de la cocina y camina 50 pasos rápidos", tipo: 'reps', meta: 50 },
      { id: 2, texto: "Prepara una infusión relajante o bebe agua fresca", tipo: 'reps', meta: 1 },
      { id: 3, texto: "Haz estiramientos de espalda y cuello", tipo: 'tiempo', meta: 25 },
      { id: 4, texto: "Escribe en tu diario qué emoción sientes ahora", tipo: 'tiempo', meta: 20 }
    ],
    frases: [
      { id: 1, texto: "Estás alimentando una emoción, no al estómago. Identifícala." },
      { id: 2, texto: "Tú controlas tus impulsos hacia la comida, no ellos a ti." },
      { id: 3, texto: "Espera 15 minutos fuera de la cocina; verás cómo el impulso baja drásticamente." },
      { id: 4, texto: "Comer por impulso calma segundos; superarlo te hace fuerte todo el día." }
    ]
  },
  procrastinar: {
    titulo: "Vencer la Procrastinación ⏳",
    progresoTexto: "Tiempo Productivo (20%)",
    ahorroTexto: "0.00€",
    metricaValor: "04h 45m",
    metricaLabel: "Enfoque Activo",
    metricaIcono: "hourglass-outline" as const,
    juegos: {
      iconosParejas: ['⏳', '📈', '📚', '🎯', '💻', '🧠'],
      emojiReflejo: '⏳'
    },
    retos: [
      { id: 1, texto: "Inicia un bloque Pomodoro sin mirar notificaciones", tipo: 'tiempo', meta: 1500 },
      { id: 2, texto: "Escribe las 3 tareas prioritarias de tu jornada", tipo: 'reps', meta: 1 },
      { id: 3, texto: "Limpia y despeja tu escritorio de distracciones", tipo: 'reps', meta: 1 }
    ],
    frases: [
      { id: 1, texto: "No tienes que terminarlo todo hoy, solo tienes que empezar hoy." },
      { id: 2, texto: "Vence al 'yo del futuro': la disciplina se construye en el presente." },
      { id: 3, texto: "Elige tu tarea más difícil y dedícale solo 5 minutos continuos." }
    ]
  },
  doomscrolling: {
    titulo: "Desconexión Digital 📱",
    progresoTexto: "Pantalla Reducida (25%)",
    ahorroTexto: "0.00€",
    metricaValor: "-1h 15m",
    metricaLabel: "Tiempo Recuperado",
    metricaIcono: "phone-portrait-outline" as const,
    juegos: {
      iconosParejas: ['📱', '🌳', '🧘', '🎨', '🚶', '💬'],
      emojiReflejo: '📱'
    },
    retos: [
      { id: 1, texto: "Bloquea o cierra la app que te causa el bucle de scroll", tipo: 'reps', meta: 1 },
      { id: 2, texto: "Realiza 10 respiraciones profundas mirando lejos de la pantalla", tipo: 'reps', meta: 10 },
      { id: 3, texto: "Deja el dispositivo en otra habitación y estira tus brazos", tipo: 'tiempo', meta: 60 }
    ],
    frases: [
      { id: 1, texto: "El algoritmo está diseñado para retenerte; demostrar tu control es ganarle." },
      { id: 2, texto: "La vida real está sucediendo fuera de los feeds y las notificaciones." },
      { id: 3, texto: "Rompe el scroll mecánico: recupera la atención sobre tu entorno." }
    ]
  }
};