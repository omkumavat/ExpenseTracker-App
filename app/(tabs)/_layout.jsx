import { Tabs } from 'expo-router';
import React from 'react';
import { Image } from 'expo-image';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="index"
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
                  backgroundColor: 'lightblue', // your theme color
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
        }}
      />
    </Tabs>
  );
}
