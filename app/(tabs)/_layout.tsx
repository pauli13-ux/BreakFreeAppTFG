import { Ionicons } from "@expo/vector-icons";
import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Platform, StyleSheet, TouchableOpacity, View } from "react-native";

export default function TabLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerTitle: "",

        headerLeft: () => (
          <View style={styles.topHeaderCircles}>
            {/* Círculo 1: Info */}
            <TouchableOpacity
              style={styles.circleHeaderButton}
              onPress={() => router.push("/modal")}
            >
              <Ionicons
                name="information-circle-outline"
                size={26}
                color="#553C9A"
              />
            </TouchableOpacity>

            {/* Círculo 2: Settings */}
            <TouchableOpacity
              style={[styles.circleHeaderButton, { marginLeft: 12 }]}
              onPress={() => router.push("/settings")}
            >
              <Ionicons name="settings-outline" size={24} color="#553C9A" />
            </TouchableOpacity>
          </View>
        ),
        tabBarStyle: { display: "none" },
      }}
    >
      <Tabs.Screen name="dashboard" />
      <Tabs.Screen name="selector_habito" />
      <Tabs.Screen name="register" options={{ headerShown: false }} />
      <Tabs.Screen name="index" options={{ headerShown: false }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  topHeaderCircles: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: Platform.OS === "ios" ? 0 : 40,
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
