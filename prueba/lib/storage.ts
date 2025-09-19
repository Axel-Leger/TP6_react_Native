import AsyncStorage from "@react-native-async-storage/async-storage";

const FACE_FLAG_KEY = "face_registered";
const CUIL_KEY = "user_cuil";

export async function setFaceRegistered(value: boolean) {
  await AsyncStorage.setItem(FACE_FLAG_KEY, value ? "1" : "0");
}

export async function isFaceRegistered(): Promise<boolean> {
  const v = await AsyncStorage.getItem(FACE_FLAG_KEY);
  return v === "1";
}

export async function saveCuil(cuil: string) {
  await AsyncStorage.setItem(CUIL_KEY, cuil);
}

export async function getCuil(): Promise<string | null> {
  return AsyncStorage.getItem(CUIL_KEY);
}
