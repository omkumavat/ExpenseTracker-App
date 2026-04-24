import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Image,
  TextInput,
  ScrollView,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { saveExpense, getExpenses, clearAll } from "../functions";
import { ActivityIndicator } from "react-native";

export default function CategoryScreen() {
  const { amount, note, date } = useLocalSearchParams();
  const router = useRouter();

  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

 const handleSubmit = async () => {
  setIsLoading(true);
  if (!selected) {
    setError("Please select a category");
    return;
  }

  setError("");

  const newExpense = {
    amount,
    note,
    date,
    category: selected,
  };

  await saveExpense(newExpense); 

  const data = await getExpenses(); 
  console.log("All Expenses:", data);
  router.push("/");
  setIsLoading(false);

};

  return (
    <View style={styles.container}>
      
      {/* Header */}
      <View style={styles.header}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </Pressable>

        <Text style={styles.headerTitle}>Select Category</Text>

        <View style={{ width: 24 }} /> {/* spacer */}
      </View>

      {/* Search */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#888" />
        <TextInput
          placeholder="Search category..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* Categories */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {filteredCategories.map((item) => (
            <Pressable
              key={item.id}
              onPress={() => {
                setSelected(item.id);
                setError("");
              }}
              style={styles.item}
            >
              <View
                style={[
                  styles.iconWrapper,
                  selected === item.id && styles.selectedCircle,
                ]}
              >
                <Image source={item.icon} style={styles.icon} />
              </View>

              <Text
                style={[
                  styles.label,
                  selected === item.id && { color: "#4CAF50" },
                ]}
              >
                {item.name}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      {/* Error */}
      {error ? <Text style={styles.error}>{error}</Text> : null}

      {/* Button */}
      {/* <Pressable style={styles.addButton} onPress={handleSubmit}>
        <Text style={styles.addText}>Add Expense</Text>
      </Pressable> */}

       <Pressable
                style={[styles.addButton, isLoading && styles.disabledButton]}
                onPress={handleSubmit}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <>
                    <Text style={styles.addText}>Add Expense</Text>
                    <Ionicons name="arrow-forward" size={16} color="#fff" />
                  </>
                )}
              </Pressable>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fb",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    marginTop: 28,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 15,
    elevation: 2,
  },

  searchInput: {
    marginLeft: 8,
    flex: 1,
  },

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  item: {
    width: "30%",
    alignItems: "center",
    marginBottom: 20,
  },

  iconWrapper: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },

  selectedCircle: {
    backgroundColor: "#4CAF50",
  },

  icon: {
    width: 30,
    height: 30,
  },

  label: {
    marginTop: 8,
    fontSize: 12,
    textAlign: "center",
  },

  // addButton: {
  //   backgroundColor: "#4CAF50",
  //   padding: 16,
  //   borderRadius: 30,
  //   alignItems: "center",
  //   marginTop: 10,
  // },

  // addText: {
  //   color: "#fff",
  //   fontSize: 16,
  //   fontWeight: "600",
  // },

   addButton: {
    backgroundColor: "#4CAF50",
    padding: 16,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    marginTop: 25,
  },

  addText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
});