import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerTitleAlign: "center" }}>
          <Stack.Screen name="index" options={{ title: "Login" }} />
          <Stack.Screen name="register" options={{ title: "Registro" }} />
          <Stack.Screen
            name="facial-login"
            options={{ title: "Ingreso por rostro" }}
          />
          <Stack.Screen
            name="facial-register"
            options={{ title: "Registro facial" }}
          />
          <Stack.Screen name="dashboard" options={{ title: "Panel" }} />
        </Stack>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
