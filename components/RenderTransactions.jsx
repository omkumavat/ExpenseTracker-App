import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import { getExpenses, getIncomes } from "../functions";


  const categories = [
  { id: 1, name: "Food",icon: require("@/assets/images/burger.png") },
  { id: 2, name: "Groceries" ,icon: require("@/assets/images/grocery.png")},
  { id: 3, name: "Travel", icon: require("@/assets/images/travel-bag.png") },
  { id: 4, name: "Transport", icon: require("@/assets/images/transportation.png") },
  { id: 5, name: "Fuel", icon: require("@/assets/images/gas-pump.png") },
  { id: 6, name: "Shopping", icon: require("@/assets/images/trolley.png") },
  { id: 7, name: "Clothing", icon: require("@/assets/images/brand.png") },
  { id: 8, name: "Bills", icon: require("@/assets/images/payment-check.png") },
  { id: 9, name: "Rent" , icon: require("@/assets/images/rent.png")},
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

const categoryMap = Object.fromEntries(
  categories.map((c) => [c.id, c])
);

export default function RenderTransactions({ item, isDark }) {
  const category = categoryMap[item.category];
  const currentTheme = isDark ? theme.dark : theme.light;

  return (
    <View style={[styles.card, { backgroundColor: currentTheme.card }]}>
      
      {/* LEFT */}
      <View style={styles.left}>
        <View style={[styles.iconWrapper, { backgroundColor: currentTheme.iconBg }]}>
          
          {item.type === "income" ? (
            <Image
              source={require("@/assets/images/revenue.png")}
              style={styles.icon}
            />
          ) : (
            <Image
              source={category?.icon}
              style={styles.icon}
            />
          )}

        </View>

        <View>
          <Text style={[styles.note, { color: currentTheme.text }]}>
            {item.note}
          </Text>

          <Text style={[styles.sub, { color: currentTheme.subText }]}>
            {item.type === "income"
              ? ""
              : category?.name + " • "}
            {new Date(item.date).toDateString()}
          </Text>
        </View>
      </View>

      {/* RIGHT */}
      <Text
        style={[
          styles.amount,
          item.type === "income" ? styles.income : styles.expense,
        ]}
      >
        {item.type === "income" ? "+" : "-"} ₹{item.amount}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 18,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    elevation: 3,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  iconWrapper: {
    width: 50,
    height: 50,
    borderRadius: 25, // 🔥 perfect circle
    backgroundColor: "#f1f3f6",
    justifyContent: "center",
    alignItems: "center",
  },

  icon: {
    width: 26,
    height: 26,
  },

  note: {
    fontSize: 15,
    fontWeight: "600",
  },

  sub: {
    fontSize: 12,
    color: "#888",
    marginTop: 2,
  },

  amount: {
    fontSize: 15,
    fontWeight: "bold",
  },

  income: {
    color: "#4CAF50",
  },

  expense: {
    color: "#E53935",
  },
});

const theme = {
  light: {
    card: "#ffffff",
    text: "#000",
    subText: "#888",
    iconBg: "#f1f3f6",
  },
  dark: {
    card: "#1e1e1e",
    text: "#fff",
    subText: "#aaa",
    iconBg: "#2a2a2a",
  },
};