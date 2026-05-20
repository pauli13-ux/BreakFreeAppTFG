import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function OnboardingScreen() {
  const router = useRouter();

  const features = [
    {
      icon: "extension-puzzle-outline",
      title: "Identifica el hábito",
      desc: "El primer paso para ser libre es reconocer qué quieres cambiar.",
      color: "#8E5CF6",
    },
    {
      icon: "stats-chart-outline",
      title: "Mide tu progreso",
      desc: "Visualiza tus rachas y mantén la motivación alta cada día.",
      color: "#4ADE80",
    },
    {
      icon: "rocket-outline",
      title: "Rompe tus límites",
      desc: "Sustituye lo malo por algo que te haga brillar.",
      color: "#F472B6",
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.logoText}>BreakFree</Text>
          <Text style={styles.subtitle}>
            Tu camino hacia una vida más libre empieza aquí.
          </Text>
        </View>

        {features.map((item, index) => (
          <View key={index} style={styles.card}>
            <View
              style={[
                styles.iconContainer,
                { backgroundColor: item.color + "20" },
              ]}
            >
              <Ionicons name={item.icon as any} size={30} color={item.color} />
            </View>
            <View style={styles.cardText}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDesc}>{item.desc}</Text>
            </View>
          </View>
        ))}

        <TouchableOpacity
          style={styles.button}
          onPress={() => router.replace("/dashboard")}
        >
          <Text style={styles.buttonText}>¡Entendido, vamos!</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContent: {
    padding: 25,
    alignItems: "center",
  },
  header: {
    marginTop: 50,
    marginBottom: 40,
    alignItems: "center",
  },
  logoText: {
    fontSize: 32,
    fontWeight: "800",
    color: "#1F2937",
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginTop: 10,
    paddingHorizontal: 20,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    padding: 20,
    borderRadius: 20,
    marginBottom: 15,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  cardText: {
    flex: 1,
    justifyContent: "center",
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
  },
  button: {
    backgroundColor: "#8E5CF6",
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 15,
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "600",
  },
});
