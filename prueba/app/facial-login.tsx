import React, { useState } from "react";
import { View, Alert } from "react-native";
import { useRouter } from "expo-router";
import CameraCapture from "../components/CameraCapture";
import { recognizeFace } from "../lib/api";

export default function FacialLogin() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const handleConfirm = async (img: { uri: string }) => {
    try {
      setBusy(true);
      const image = { uri: img.uri, name: "face.jpg", type: "image/jpeg" };
      const resp = await recognizeFace(image);

      const ok = resp?.success ?? resp?.ok ?? true;
      if (ok) {
        router.push("/dashboard");
      } else {
        Alert.alert("No reconocido", resp?.message ?? "Intentá nuevamente");
      }
    } catch (e: any) {
      Alert.alert("Error de reconocimiento", e.message ?? "Error desconocido");
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraCapture
        onConfirm={handleConfirm}
        confirmLabel="Ingresar"
        busy={busy}
      />
    </View>
  );
}
