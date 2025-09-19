import React, { useMemo, useState } from "react";
import { View, Alert } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import CameraCapture from "../components/CameraCapture";
import { registerFace } from "../lib/api";
import { setFaceRegistered, saveCuil } from "../lib/storage";

export default function FacialRegister() {
  const router = useRouter();
  const { cuil: initialCuil } = useLocalSearchParams<{ cuil?: string }>();
  const [busy, setBusy] = useState(false);

  const cuil = useMemo(
    () => (typeof initialCuil === "string" ? initialCuil : ""),
    [initialCuil]
  );

  const handleConfirm = async (img: { uri: string }) => {
    if (!cuil) {
      Alert.alert(
        "Falta CUIL",
        "Volvé y completá tu CUIL para asociarlo al rostro."
      );
      return;
    }
    try {
      setBusy(true);
      const image = { uri: img.uri, name: "face.jpg", type: "image/jpeg" };
      await registerFace(cuil, image);
      await setFaceRegistered(true);
      await saveCuil(cuil);
      Alert.alert("Listo", "Rostro registrado con éxito.", [
        { text: "OK", onPress: () => router.back() },
      ]);
    } catch (e: any) {
      Alert.alert("Error registrando rostro", e.message ?? "Error desconocido");
    } finally {
      setBusy(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraCapture
        onConfirm={handleConfirm}
        confirmLabel="Registrar"
        busy={busy}
      />
    </View>
  );
}
