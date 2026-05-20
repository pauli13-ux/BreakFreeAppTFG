import { Stack } from "expo-router";
import React from "react";

export default function RootLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>

            <Stack.Screen name="index" />
            <Stack.Screen name="register" />
            <Stack.Screen name="onboarding" />
            <Stack.Screen name="selector_habito" />
            <Stack.Screen name="adiccion" />
            <Stack.Screen name="tiempo_objetivo" />
            <Stack.Screen name="info-habito" />


            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="registro" />
        </Stack>
    );
}