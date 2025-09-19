import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";

export type CameraCaptureProps = {
  onConfirm: (image: { uri: string }) => Promise<void> | void;
  confirmLabel?: string;
  busy?: boolean;
};
export default function CameraCapture({
  onConfirm,
  confirmLabel = "Usar foto",
  busy,
}: CameraCaptureProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [photoUri, setPhotoUri] = useState<string | null>(null);

  useEffect(() => {
    if (!permission) return;
    if (!permission.granted) {
      requestPermission();
    }
  }, [permission]);

  if (!permission)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    );

  if (!permission.granted) {
    return (
      <View style={styles.center}>
        <Text style={styles.info}>Necesitamos permiso para usar la cámara</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Conceder permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }
  const takePhoto = async () => {
    try {
      const photo = await cameraRef.current?.takePictureAsync({
        quality: 0.8,
        skipProcessing: true,
      });
      if (photo?.uri) setPhotoUri(photo.uri);
    } catch (e: any) {
      Alert.alert("Error", e.message);
    }
  };

  const confirm = async () => {
    if (!photoUri) return;
    await onConfirm({ uri: photoUri });
  };

  const reset = () => setPhotoUri(null);

  return (
    <View style={{ flex: 1 }}>
      {!photoUri ? (
        <CameraView ref={cameraRef} style={{ flex: 1 }} facing="front" />
      ) : (
        <Image
          source={{ uri: photoUri }}
          style={{ flex: 1 }}
          resizeMode="cover"
        />
      )}

      <View style={styles.footer}>
        {!photoUri ? (
          <TouchableOpacity
            style={styles.shutter}
            onPress={takePhoto}
            disabled={!!busy}
          />
        ) : (
          <View style={styles.row}>
            <TouchableOpacity
              style={[styles.button, styles.secondary]}
              onPress={reset}
              disabled={!!busy}
            >
              <Text style={styles.buttonText}>Reintentar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={confirm}
              disabled={!!busy}
            >
              {busy ? (
                <ActivityIndicator />
              ) : (
                <Text style={styles.buttonText}>{confirmLabel}</Text>
              )}
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  info: { fontSize: 16, marginBottom: 12, textAlign: "center" },
  footer: { padding: 16, gap: 12, backgroundColor: "rgba(0,0,0,0.3)" },
  shutter: {
    alignSelf: "center",
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "#fff",
  },
  row: { flexDirection: "row", gap: 12, justifyContent: "space-between" },
  button: {
    flex: 1,
    padding: 14,
    backgroundColor: "#1e40af",
    borderRadius: 12,
    alignItems: "center",
  },
  secondary: { backgroundColor: "#475569" },
  buttonText: { color: "#fff", fontWeight: "600" },
});
