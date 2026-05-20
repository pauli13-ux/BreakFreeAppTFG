import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{

        headerShown: false,

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
