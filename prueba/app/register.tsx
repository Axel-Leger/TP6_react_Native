import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useRouter } from "expo-router";

export default function Register() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cuil, setCuil] = useState("");

  const registerClassic = () => {
    router.replace("/index");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>

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
      <TextInput
        placeholder="CUIL (para registro facial)"
        keyboardType="number-pad"
        value={cuil}
        onChangeText={setCuil}
        style={styles.input}
        placeholderTextColor="#999"
      />

      <TouchableOpacity style={styles.button} onPress={registerClassic} activeOpacity={0.8}>
        <Text style={styles.buttonText}>Crear cuenta</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.altButton]}
        onPress={() =>
          router.push({ pathname: "/facial-register", params: { cuil } })
        }
        activeOpacity={0.8}
      >
        <Text style={styles.buttonText}>Registrar rostro</Text>
      </TouchableOpacity>
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
    backgroundColor: "#5864d5ff", 
    paddingVertical: 14,
    borderRadius: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginTop: 12,
  },
  altButton: {
    backgroundColor: "#3b3a39",
    marginTop: 0,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});
