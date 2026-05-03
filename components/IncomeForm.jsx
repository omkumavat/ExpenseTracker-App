import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { getIncomes, saveIncome } from "../functions";
import { useTheme } from "../context/ThemeContext";

export default function IncomeForm() {
  const router = useRouter();

  const { themeName } = useTheme();
  const currentTheme = themeName === "dark" ? theme.dark : theme.light;

  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [date, setDate] = useState(null);
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    let err = {};
    if (!amount) err.amount = "Amount is required";
    if (!note) err.note = "Note is required";
    if (!date) err.date = "Date is required";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    setIsLoading(true);

    const newIncome = { amount, note, date };

    await saveIncome(newIncome);
    await getIncomes();

    router.push("/incomes");
    setIsLoading(false);
  };

  useEffect(() => {
    return () => setIsLoading(false);
  }, []);

  return (
    <>
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          { backgroundColor: currentTheme.bg },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={[
            styles.card,
            { backgroundColor: currentTheme.card },
          ]}
        >
          {/* 💰 Amount */}
          <View style={styles.amountContainer}>
            <Text style={[styles.rupee, { color: currentTheme.text }]}>₹</Text>

            <TextInput
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              placeholder="0"
              placeholderTextColor={currentTheme.subText}
              style={[
                styles.amountInput,
                { color: currentTheme.text },
              ]}
            />
          </View>
          {errors.amount && (
            <Text style={styles.error}>{errors.amount}</Text>
          )}

          {/* 📝 Note */}
          <TextInput
            value={note}
            onChangeText={setNote}
            placeholder="Add note"
            placeholderTextColor={currentTheme.subText}
            style={[
              styles.input,
              {
                backgroundColor: currentTheme.inputBg,
                color: currentTheme.text,
              },
            ]}
          />
          {errors.note && <Text style={styles.error}>{errors.note}</Text>}

          {/* 📅 Date */}
          <Pressable
            style={[
              styles.dateBtn,
              { backgroundColor: currentTheme.inputBg },
            ]}
            onPress={() => setShow(true)}
          >
            <Text
              style={{
                color: date
                  ? currentTheme.text
                  : currentTheme.subText,
              }}
            >
              {date ? date.toDateString() : "Select Date"}
            </Text>
          </Pressable>

          {errors.date && <Text style={styles.error}>{errors.date}</Text>}

          {show && (
            <DateTimePicker
              value={date || new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setShow(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}

          {/* 🚀 Button */}
          <Pressable
            style={[
              styles.nextButton,
              { backgroundColor: currentTheme.primary },
              isLoading && styles.disabledButton,
            ]}
            onPress={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <>
                <Text style={styles.nextText}>Save Income</Text>
                {/* <Ionicons name="arrow-forward" size={16} color="#fff" /> */}
              </>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </  TouchableWithoutFeedback>
    </KeyboardAvoidingView >
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },

  card: {
    borderRadius: 20,
    padding: 20,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },

  amountContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },

  rupee: {
    fontSize: 40,
    fontWeight: "bold",
  },

  amountInput: {
    fontSize: 40,
    fontWeight: "bold",
    marginLeft: 10,
    textAlign: "center",
  },

  input: {
    textAlign: "center",
    padding: 15,
    borderRadius: 12,
    marginTop: 15,
  },

  dateBtn: {
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
  },

  nextButton: {
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 25,
  },

  nextText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  disabledButton: {
    opacity: 0.6,
  },

  error: {
    color: "#ff4d4f",
    fontSize: 12,
    marginTop: 5,
    textAlign: "center",
  },
});

const theme = {
  light: {
    bg: "#f9fafb",
    card: "#ffffff",
    text: "#111",
    subText: "#888",
    inputBg: "#f3f4f6",
    primary: "#4CAF50",
  },
  dark: {
    bg: "#121212",
    card: "#1e1e1e",
    text: "#ffffff",
    subText: "#aaa",
    inputBg: "#2a2a2a",
    primary: "#4CAF50",
  }
}