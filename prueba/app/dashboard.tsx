import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";

export default function Dashboard() {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Bienvenido/a!</Text>
      <Text style={styles.subtitle}>Has ingresado correctamente.</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/")}
        activeOpacity={0.8}
      >
        <Text style={styles.btnText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    gap: 20,
    backgroundColor: "#f5f8fbff", 
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    color: "#3b3a39",
  },
  subtitle: {
    fontSize: 18,
    color: "#6e6d6b", 
    textAlign: "center",
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 36,
    backgroundColor: "#4b79baff",
    borderRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 20,
  },
  btnText: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
});
