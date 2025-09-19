import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Link, useRouter } from "expo-router";
import { isFaceRegistered } from "../lib/storage";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginClassic = () => {
    if (email && password) {
      router.replace("/dashboard");
    } else {
      Alert.alert("Error", "Completa email y contraseña");
    }
  };

  const goFaceLogin = async () => {
    const hasFace = await isFaceRegistered();
    if (!hasFace) {
      Alert.alert(
        "Atención",
        "Aún no registraste tu rostro. Podés hacerlo desde Registro."
      );
    }
    router.push("/facial-login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de sesión</Text>

      <TextInput
        placeholder="Email"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholderTextColor="#999"
      />
      <TextInput
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={loginClassic} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.altButton]}
        onPress={goFaceLogin}
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Ingresar con rostro</Text>
      </TouchableOpacity>

      <View style={styles.registerContainer}>
        <Link href="/register" style={styles.registerLink}>
          Crear cuenta
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: "center",
    gap: 16,
    backgroundColor: "#f5f8fbff", 
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    color: "#3b3a39", 
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#d9d4d0",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#656fdfff", 
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  altButton: {
    backgroundColor: "#3b3a39"
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  registerContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  registerLink: {
    color: "#4d64b8ff",
    fontWeight: "600",
    fontSize: 16,
  },
});
