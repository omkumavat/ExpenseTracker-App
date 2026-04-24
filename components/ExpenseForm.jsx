import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function ExpenseForm() {
  const router = useRouter();

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

  const handleNext = () => {
    if (!validate()) return;

    setIsLoading(true);

    router.push({
      pathname: "/category",
      params: {
        amount,
        note,
        date: date.toISOString(),
      },
    });

    setIsLoading(false);
  };

  useEffect(() => {
    return () => {
      setIsLoading(false);
    };
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>

        {/* Amount */}
        <View style={styles.amountContainer}>
          <Text style={styles.rupee}>₹</Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="0"
            placeholderTextColor="#aaa"
            style={styles.amountInput}
          />
        </View>
        {errors.amount && <Text style={styles.error}>{errors.amount}</Text>}

        {/* Note */}
        <TextInput
          value={note}
          onChangeText={setNote}
          placeholder="Add note"
          placeholderTextColor="#aaa"
          style={styles.input}
        />
        {errors.note && <Text style={styles.error}>{errors.note}</Text>}

        {/* Date */}
        <Pressable style={styles.dateBtn} onPress={() => setShow(true)}>
          <Text style={{ color: date ? "#000" : "#aaa" }}>
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

        {/* Next Button */}
        <Pressable
          style={[styles.nextButton, isLoading && styles.disabledButton]}
          onPress={handleNext}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Text style={styles.nextText}>Next</Text>
              <Ionicons name="arrow-forward" size={16} color="#fff" />
            </>
          )}
        </Pressable>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#f8f9fb",
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
    elevation: 5,
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
    // backgroundColor: "#f5f5f5",
    marginTop: 15,
  },

  dateBtn: {
    textAlign: "center",
    padding: 15,
    borderRadius: 12,
    // backgroundColor: "#f5f5f5",
    alignItems: "center",
    marginTop: 15,
  },

  nextButton: {
    backgroundColor: "#4CAF50",
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

  error: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
    textAlign: "center",
  },
});