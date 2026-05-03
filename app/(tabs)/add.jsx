import { Image } from 'expo-image';
import { Pressable, StyleSheet, ScrollView, Text, View } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import ExpenseForm from '@/components/ExpenseForm';
import IncomeForm from '@/components/IncomeForm';
import { useTheme } from '../../context/ThemeContext';

export default function Add() {
  const [isExpense, setIsExpense] = useState(true);
  const { themeName } = useTheme();
  const currentTheme = themeName === "dark" ? theme.dark : theme.light;

  return (
    <ScrollView
      style={{ backgroundColor: currentTheme.bg }}
      contentContainerStyle={{ paddingBottom: 40 }}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.container, { backgroundColor: currentTheme.bg }]}>

        {/* 🔹 Header */}
        <View style={styles.headerSection}>
          <Pressable style={styles.backBtn} onPress={() => router.back()}>
            <Image
              source={require("../../assets/images/back.png")}
              style={[styles.backImage, { tintColor: currentTheme.text }]}
            />
          </Pressable>

          <Text style={[styles.transactionText, { color: currentTheme.text }]}>
            Add Transaction
          </Text>
        </View>

        {/* 🔹 Toggle Buttons */}
        <View
          style={[
            styles.transactionsButtons,
            { backgroundColor: currentTheme.card }
          ]}
        >
          <Pressable
            style={[
              styles.transactionButton,
              isExpense && { backgroundColor: currentTheme.primary },
            ]}
            onPress={() => setIsExpense(true)}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color: isExpense
                    ? "#fff"
                    : currentTheme.text,
                },
              ]}
            >
              Expense
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.transactionButton,
              !isExpense && { backgroundColor: currentTheme.primary },
            ]}
            onPress={() => setIsExpense(false)}
          >
            <Text
              style={[
                styles.buttonText,
                {
                  color: !isExpense
                    ? "#fff"
                    : currentTheme.text,
                },
              ]}
            >
              Income
            </Text>
          </Pressable>
        </View>

        {/* 🔹 Form Card */}
        <View
          style={[
            styles.formContainer,
            { backgroundColor: currentTheme.card }
          ]}
        >
          {isExpense ? <ExpenseForm /> : <IncomeForm />}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    padding: 25,
  },

  headerSection: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 25,
    // marginTop: 20,
  },

  backBtn: {
    position: "absolute",
    left: 0,
    padding: 5,
  },

  backImage: {
    width: 26,
    height: 26,
  },

  transactionText: {
    fontSize: 20,
    fontWeight: "700",
  },

  transactionsButtons: {
    flexDirection: "row",
    borderRadius: 50,
    padding: 5,
    marginBottom: 25,
  },

  transactionButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 50,
    alignItems: "center",
  },

  buttonText: {
    fontSize: 15,
    fontWeight: "600",
  },

  formContainer: {
    borderRadius: 16,
    padding: 15,
    elevation: 3, // Android shadow
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
});

const theme = {
  light: {
    bg: "#f9fafb",
    card: "#ffffff",
    text: "#111",
    primary: "#4CAF50",
  },
  dark: {
    bg: "#121212",
    card: "#1e1e1e",
    text: "#ffffff",
    primary: "#4CAF50",
  },
};