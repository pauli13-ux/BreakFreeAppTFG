import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function SettingsScreen() {
  const router = useRouter();
  const [image, setImage] = useState<string | null>(null);

  // Estos estados deben inicializarse con los datos que vienen del Login
  const [usuario, setUsuario] = useState("Jeni");
  const [contacto, setContacto] = useState("jeyfjwa23@gmail.com");
  const [clave, setClave] = useState("********");

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // 🎯 ESTA ES LA FUNCIÓN QUE CONECTA CON LA BASE DE DATOS
  const handleGuardarCambios = async () => {
    try {
      // Aquí es donde haréis el fetch a vuestro servidor/api
      // const response = await fetch('URL_DE_VUESTRA_API/updateUser', { ... })

      console.log("Enviando a BD:", { usuario, contacto, image });

      Alert.alert(
        "¡Éxito!",
        "Tus datos se han actualizado. La próxima vez deberás usar tus nuevas credenciales.",
      );
      router.back();
    } catch (error) {
      Alert.alert("Error", "No se pudieron guardar los cambios.");
    }
  };

  return (
    <LinearGradient colors={["#F3F0FF", "#FDF2F8"]} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          {/* HEADER RECOGIDO */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="chevron-back" size={24} color="#553C9A" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Modificar Perfil</Text>
            <View style={{ width: 24 }} />
          </View>

          {/* FOTO PRO RECALIBRADA */}
          <View style={styles.profileSection}>
            <View style={styles.imageWrapper}>
              {image ? (
                <Image source={{ uri: image }} style={styles.profileImg} />
              ) : (
                <View style={styles.placeholderImg}>
                  <Ionicons name="person" size={50} color="#CDC1FF" />
                </View>
              )}
              <TouchableOpacity style={styles.cameraBadge} onPress={pickImage}>
                <Ionicons name="camera" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>

          {/* FORMULARIO COMPACTO */}
          <View style={styles.card}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Usuario</Text>
              <TextInput
                style={styles.input}
                value={usuario}
                onChangeText={setUsuario}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={contacto}
                onChangeText={setContacto}
                keyboardType="email-address"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Clave</Text>
              <View style={styles.passwordRow}>
                <TextInput
                  style={[styles.input, { flex: 1, borderBottomWidth: 0 }]}
                  value={clave}
                  onChangeText={setClave}
                  secureTextEntry
                />
                <TouchableOpacity style={styles.editBtnInline}>
                  <Text style={styles.editText}>Editar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* BOTÓN MÁS PEQUEÑO Y RECOGIDO */}
          <TouchableOpacity
            style={styles.saveBtn}
            onPress={handleGuardarCambios}
          >
            <Text style={styles.saveBtnText}>Guardar Cambios</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { padding: 20, alignItems: "center" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: { fontSize: 22, fontWeight: "bold", color: "#553C9A" },
  iconBtn: {
    backgroundColor: "white",
    padding: 8,
    borderRadius: 15,
    elevation: 2,
  },
  profileSection: { alignItems: "center", marginBottom: 30 },
  imageWrapper: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "white",
    padding: 5,
    elevation: 10,
    position: "relative",
  },
  profileImg: { width: "100%", height: "100%", borderRadius: 100 },
  placeholderImg: {
    width: "100%",
    height: "100%",
    borderRadius: 100,
    backgroundColor: "#F3F0FF",
    justifyContent: "center",
    alignItems: "center",
  },
  cameraBadge: {
    position: "absolute",
    bottom: 5,
    right: 5,
    backgroundColor: "#8E5CF6",
    padding: 8,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: "white",
  },
  subirText: {
    marginTop: 15,
    color: "#553C9A",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  card: {
    backgroundColor: "white",
    width: "50%",
    borderRadius: 25,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#553C9A",
    marginBottom: 15,
    alignSelf: "center",
  },
  inputGroup: { marginBottom: 15 },
  label: {
    fontSize: 13,
    color: "#9CA3AF",
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
    paddingVertical: 8,
    fontSize: 16,
    color: "#374151",
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  editText: { color: "#8E5CF6", fontWeight: "bold" },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
  statBox: {
    backgroundColor: "white",
    width: "48%",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    elevation: 2,
  },
  statLabel: { fontSize: 12, color: "#9CA3AF" },
  statValue: { fontSize: 16, fontWeight: "bold", color: "#374151" },
  saveBtn: {
    backgroundColor: "#8E5CF6",
    width: "30%",
    height: 55,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    elevation: 5,
  },
  editBtnInline: { paddingLeft: 10 },
  saveBtnText: { color: "white", fontWeight: "bold", fontSize: 13 },
});
