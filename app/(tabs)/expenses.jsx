import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  Modal,
  Image,
} from "react-native";
import { getExpenses, deleteExpense, loadProfile } from "../../functions";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../../context/ThemeContext";
import { StatusBar } from "react-native";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

const categories = [
  { id: 1, name: "Food", icon: require("@/assets/images/burger.png") },
  { id: 2, name: "Groceries", icon: require("@/assets/images/grocery.png") },
  { id: 3, name: "Travel", icon: require("@/assets/images/travel-bag.png") },
  { id: 4, name: "Transport", icon: require("@/assets/images/transportation.png") },
  { id: 5, name: "Fuel", icon: require("@/assets/images/gas-pump.png") },
  { id: 6, name: "Shopping", icon: require("@/assets/images/trolley.png") },
  { id: 7, name: "Clothing", icon: require("@/assets/images/brand.png") },
  { id: 8, name: "Bills", icon: require("@/assets/images/payment-check.png") },
  { id: 9, name: "Rent", icon: require("@/assets/images/rent.png") },
  { id: 10, name: "Electricity", icon: require("@/assets/images/eco-house.png") },
  { id: 11, name: "Water Bill", icon: require("@/assets/images/water-bill.png") },
  { id: 12, name: "Internet", icon: require("@/assets/images/wifi.png") },
  { id: 13, name: "Mobile Recharge", icon: require("@/assets/images/recharge.png") },
  { id: 14, name: "Health", icon: require("@/assets/images/healthcare.png") },
  { id: 15, name: "Medical", icon: require("@/assets/images/health-report.png") },
  { id: 16, name: "Education", icon: require("@/assets/images/bachelor.png") },
  { id: 17, name: "Entertainment", icon: require("@/assets/images/cinema.png") },
  { id: 18, name: "Subscriptions", icon: require("@/assets/images/subscription-active.png") },
  { id: 19, name: "Gym/Fitness", icon: require("@/assets/images/weightlifter.png") },
  { id: 20, name: "Personal Care", icon: require("@/assets/images/healthy.png") },
  { id: 21, name: "Gifts", icon: require("@/assets/images/gift.png") },
  { id: 22, name: "Donations", icon: require("@/assets/images/donation.png") },
  { id: 23, name: "Insurance", icon: require("@/assets/images/health-insurance.png") },
  { id: 24, name: "Investments", icon: require("@/assets/images/earning.png") },
  { id: 25, name: "Miscellaneous", icon: require("@/assets/images/belongings.png") },
];

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const { themeName } = useTheme();
  const currentTheme = themeName === "dark" ? theme.dark : theme.light;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);


  const loadExpenses = async () => {
    const data = await getExpenses();
    setExpenses(data);
    console.log(data);

  };

  useFocusEffect(
    useCallback(() => {
      loadExpenses();
    }, [])
  );

  useEffect(() => {
    const result = expenses.filter((item) => {
      const text = search.toLowerCase();

      return (
        item.note?.toLowerCase().includes(text) ||
        String(item.amount).includes(text) ||
        String(item.category).includes(text)
      );
    });

    setFiltered(result);
  }, [search, expenses]);

  const confirmDelete = (id) => {
    setSelectedId(id);
    setModalVisible(true);
  };

  const getCategory = (id) => {
    return categories.find((cat) => cat.id === id);
  };

  const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toDateString();
  };

  const handleDelete = async () => {
    await deleteExpense(selectedId);

    const updated = await getExpenses(); // refresh list
    setExpenses(updated);

    setModalVisible(false);
  };

  const renderItem = ({ item }) => {
    const category = getCategory(item.category);

    return (
      <View style={[styles.card, { backgroundColor: currentTheme.card }]}>

        {/* LEFT: ICON + TEXT */}
        <View style={styles.left}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: currentTheme.card }
            ]}
          >
            <Image
              source={category?.icon}
              style={styles.icon}
              resizeMode="cover"
            />
          </View>

          <View>
            <Text style={[styles.note, { color: currentTheme.text }]}>{item.note}</Text>
            <Text style={[styles.sub, { color: currentTheme.subText }]}>
              {category?.name} • {formatDate(item.date)}
            </Text>
          </View>
        </View>

        {/* RIGHT */}
        <View style={[styles.right, { backgroundColor: currentTheme.card }]}>
          <Text style={[styles.amount]}>₹{item.amount}</Text>

          <Pressable onPress={() => confirmDelete(item.id)}>
            <Ionicons name="trash-outline" size={25} color="red" />
          </Pressable>
        </View>

      </View>
    );
  };

  if (filtered.length === 0) {
    return (
      <> <StatusBar barStyle={themeName === "dark" ? "light-content" : "dark-content"}
      backgroundColor={currentTheme.background} />
        <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
          <View style={[styles.searchBox, { backgroundColor: currentTheme.card }]}>
            <Ionicons name="search" size={18} color={currentTheme.subText} />
            <TextInput
              placeholder="Search..."
              value={search}
              onChangeText={setSearch}
              style={[styles.searchInput, { color: currentTheme.text }]}
            />
          </View>
          <View style={styles.noexpenses}>
            <Text style={{ color: currentTheme.text }}>
              No expenses found
            </Text>
          </View>
        </View>
      </>
    );
  }

  if (expenses.length === 0) {
    return (
      <> <StatusBar barStyle={themeName === "dark" ? "light-content" : "dark-content"}
      backgroundColor={currentTheme.background} />
        <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
          <View style={[styles.searchBox, { backgroundColor: currentTheme.card }]}>
            <Ionicons name="search" size={18} color={currentTheme.subText} />
            <TextInput
              placeholder="Search..."
              value={search}
              onChangeText={setSearch}
              style={[styles.searchInput, { color: currentTheme.text }]}
            />
          </View>
          <View style={styles.noexpenses}>
            <Text style={{ color: currentTheme.text }}>
              No expenses found
            </Text>
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <StatusBar barStyle={themeName === "dark" ? "light-content" : "dark-content"}
      backgroundColor={currentTheme.background} />
      <View style={[styles.container, { backgroundColor: currentTheme.background }]}>

        <View style={[styles.searchBox, { backgroundColor: currentTheme.card }]}>
          <Ionicons
            name="search"
            size={18}
            color={currentTheme.subText}
          />
          <TextInput
            placeholder="Search..."
            placeholderTextColor={currentTheme.subText}
            value={search}
            onChangeText={setSearch}
            style={[
              styles.searchInput,
              {
                color: currentTheme.text,
                // backgroundColor: "transparent",
                backgroundColor: currentTheme.card,
              },
            ]}
          />
        </View>

        {/* 📋 List */}
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />

        <Modal transparent visible={modalVisible} animationType="fade">
          <View
            style={[
              styles.modalOverlay,
              { backgroundColor: "rgba(0,0,0,0.4)" },
            ]}
          >
            <View
              style={[
                styles.modalBox,
                { backgroundColor: currentTheme.card },
              ]}
            >
              <Text style={[styles.modalText, { color: currentTheme.text }]}>
                Are you sure you want to delete?
              </Text>

              <View style={styles.modalBtns}>
                <Pressable onPress={() => setModalVisible(false)}>
                  <Text style={{ color: currentTheme.text }}>Cancel</Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.deleteBtn,
                    { backgroundColor: currentTheme.deleteBtn },
                  ]}
                  onPress={handleDelete}
                >
                  <Text style={{ color: currentTheme.text }}>Delete</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>
      </View>
      {/* </StatusBar> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    // marginTop:10,
    backgroundColor: "#f8f9fb",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    // marginTop: 20,
    elevation: 2,
  },

  searchInput: {
    marginLeft: 8,
    flex: 1,
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 12,
    marginBottom: 10,
    // height
    elevation: 2,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  iconContainer: {
    width: 35,
    height: 35,
    borderRadius: 7,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    width: "100%",
    height: "100%",
  },

  note: {
    fontSize: 16,
    fontWeight: "600",
  },

  sub: {
    fontSize: 12,
    color: "#777",
    marginTop: 3,
  },

  right: {
    gap: 14,
    alignItems: "flex-end",
    justifyContent: "space-between",
  },

  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#f80000",
  },

  noexpenses: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    padding: 20,
    borderRadius: 12,
    width: 280,
    maxWidth: "80%",
    alignSelf: "center",
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },

  modalText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: "center",
  },

  modalBtns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cancelBtn: {
    padding: 10,
  },

  deleteBtn: {
    backgroundColor: "red",
    padding: 10,
    borderRadius: 8,
  },
});

export const theme = {
  light: {
    background: "#f5f6fa",
    card: "#ffffff",
    text: "#000000",
    subText: "#666",
    border: "#e0e0e0",
    inputBg: "#ffffff",

    primary: "#6C4AB6",
    success: "#4CAF50",
    danger: "#E53935",

    icon: "#888",
    modalBg: "#ffffff",
  },

  dark: {
    background: "#121212",
    card: "#1e1e1e",
    text: "#ffffff",
    subText: "#aaaaaa",
    border: "#2a2a2a",
    inputBg: "#1e1e1e",

    primary: "#9D7BFF",
    success: "#4CAF50",
    danger: "#EF5350",

    icon: "#aaaaaa",
    modalBg: "#1e1e1e",
  },
};