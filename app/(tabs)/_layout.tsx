import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        // Desactivamos el header global para que no moleste ni duplique botones
        headerShown: false,
        // Ocultamos la barra de pestañas de abajo si así lo teníais configurado
        tabBarStyle: { display: "none" },
      }}
    >
      <Tabs.Screen name="dashboard" />
      <Tabs.Screen name="selector_habito" />
      <Tabs.Screen name="register" />
      <Tabs.Screen name="index" />
    </Tabs>
  );
}

// Dejamos los estilos vacíos por si el router los busca, pero ya no rompen nada
const styles = StyleSheet.create({
  topHeaderCircles: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  circleHeaderButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    elevation: 3,
  },
});
