// import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { ThemeProvider } from "../context/ThemeContext";
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useTheme } from "@/context/ThemeContext";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";

// import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  return (
    <ThemeProvider>
      <RootLayoutNav />
    </ThemeProvider>
  );
}

function RootLayoutNav() {
  const { themeName } = useTheme();
  const currentTheme = themeName === "dark" ? theme.dark : theme.light;

  const [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: true,
          headerStyle: {
            height: 70,

            backgroundColor: currentTheme.bg,
          },
          headerTitleStyle: {
            fontFamily: "Pacifico_400Regular",
            fontSize: 20,
            color: "#6C4AB6",
          },
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', title: 'Modal' }} />
        <Stack.Screen name="category" options={{ title: 'Expense Tracker' }} />
      </Stack>

      <StatusBar style="light" backgroundColor={currentTheme.bg} />
    </>
  );
}

const theme = {
  light: {
    bg: "#ffffff",
    tabBg: "#ffffff",
    active: "#6C4AB6",
    inactive: "#888",
    addBtn: "#6C4AB6",
  },
  dark: {
    bg: "#121212",
    tabBg: "#020202",
    active: "#9D7BFF",
    inactive: "#dfdede",
    addBtn: "#9D7BFF",
  },
};