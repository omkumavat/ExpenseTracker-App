import { Tabs } from 'expo-router';
import React, { useState, useEffect } from 'react';
import { Image } from 'expo-image';
import { TouchableOpacity, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { loadProfile } from '../../functions';
import { ThemeProvider } from "../../context/ThemeContext";
import { useTheme } from "@/context/ThemeContext";
import { useFonts, Pacifico_400Regular } from "@expo-google-fonts/pacifico";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { themeName } = useTheme();
  const currentTheme = themeName === "dark" ? theme.dark : theme.light;
  console.log(themeName);

  const [fontsLoaded] = useFonts({
    Pacifico_400Regular,
  });

  if (!fontsLoaded) return null;

  return (
    // <ThemeProvider>
    <Tabs
      key={themeName}
      screenOptions={{
        // headerTitle: "Expense Tracker",
        headerStyle: {
          height: 90,
          backgroundColor: currentTheme.bg,
        },

        headerTitleAlign: "center",
        // headerShown: false,
        tabBarActiveTintColor: currentTheme.active,
        tabBarInactiveTintColor: currentTheme.inactive,
        tabBarStyle: {
          backgroundColor: currentTheme.tabBg,
          borderTopWidth: 0,
          elevation: 10,
          height: 75,
        },
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/home.png')}
              style={{
                width: 28,
                height: 28,
                tintColor: color,
              }}
            />
          ),
          headerStyle: {
            backgroundColor: "#6C4AB6",
          },
          headerTitle: () => (
            <Text
              style={{
                fontFamily: "Pacifico_400Regular",
                fontSize: 20,
                // backgroundColor: "#6C4AB6",
                color: "white",
              }}
            >
              Expense Tracker
            </Text>
          )
        }}
      />
      <Tabs.Screen
        name="incomes"
        options={{
          title: 'Income',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/wallet.png')}
              style={{
                width: 28,
                height: 28,
                tintColor: color,
              }}
            />
          ),
        
          headerTitle: () => (
            <Text
              style={{
                fontFamily: "Pacifico_400Regular",
                fontSize: 20,
                backgroundColor: currentTheme.tabBg,
                color: currentTheme.active,
              }}
            >
              Expense Tracker
            </Text>
          )
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          tabBarLabel: () => null,
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              style={{
                top: -20, // 🔥 moves button upward
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <View
                style={{
                  width: 60,
                  height: 60,
                  borderRadius: 30,
                  backgroundColor: '#6C4AB6', // your theme color
                  justifyContent: 'center',
                  alignItems: 'center',
                  elevation: 5, // shadow (android)
                  shadowColor: '#000', // shadow (ios)
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.3,
                  shadowRadius: 4,
                }}
              >
                <Ionicons name="add" size={30} color="#fff" />
              </View>
            </TouchableOpacity>
          ),
          headerTitle: () => (
            <Text
              style={{
                fontFamily: "Pacifico_400Regular",
                fontSize: 20,
                color: currentTheme.active,
              }}
            >
              Expense Tracker
            </Text>
          )
        }}
      />
      <Tabs.Screen
        name="expenses"
        options={{
          title: 'Expense',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/spending.png')}
              style={{
                width: 28,
                height: 28,
                tintColor: color,
              }}
            />
          ),
          headerTitle: () => (
            <Text
              style={{
                fontFamily: "Pacifico_400Regular",
                fontSize: 20,
                color: currentTheme.active,
              }}
            >
              Expense Tracker
            </Text>
          )
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/images/user.png')}
              style={{
                width: 28,
                height: 28,
                tintColor: color,
              }}
            />
          ),
          headerTitle: () => (
            <Text
              style={{
                fontFamily: "Pacifico_400Regular",
                fontSize: 20,
                color: currentTheme.active,
              }}
            >
              Expense Tracker
            </Text>
          )
        }}
      />
    </Tabs>
    // </ThemeProvider>
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
