import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from "react-native";
import RenderTransactions from "../../components/RenderTransactions";
import { getExpenses, getIncomes, clearAllProfile, loadProfile } from "../../functions";
import { useTheme } from "../../context/ThemeContext";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";


export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const { themeName } = useTheme();
  const currentTheme = themeName === "dark" ? theme.dark : theme.light;
  // console.log(themeName);


  const loadData = async () => {
    const expenseData = await getExpenses();
    const incomeData = await getIncomes();

    const all = [
      ...expenseData.map((e) => ({ ...e, type: "expense" })),
      ...incomeData.map((i) => ({ ...i, type: "income" })),
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    setTransactions(all);

    // totals
    const incomeSum = incomeData.reduce((acc, i) => acc + Number(i.amount), 0);
    const expenseSum = expenseData.reduce((acc, e) => acc + Number(e.amount), 0);

    setIncomeTotal(incomeSum);
    setExpenseTotal(expenseSum);
  };


  useFocusEffect
    (useCallback(() => {
      loadData();
    }, [])
    );


  const balance = incomeTotal - expenseTotal;

  return (
    <>
      <StatusBar barStyle="light-content"
        backgroundColor={"#6C4AB6"} />
      <View style={[styles.container, { backgroundColor: currentTheme.background }]}>

        <View style={styles.header}>

          {/* Top Row */}
          <View style={styles.headerTop}>
            <Text style={styles.balanceLabel}>Total Balance</Text>
            <Ionicons name="wallet-outline" size={22} color="#fff" />
          </View>

          <Text style={[styles.balance, { color: currentTheme.text }]}>₹ {balance}</Text>

          <Text style={styles.date}>
            {new Date().toDateString()}
          </Text>

          <View style={styles.statsRow}>

            <View style={styles.bigBox}>
              <View style={styles.statBox}>
                <Ionicons name="arrow-down-circle" size={25} color="#4CAF50" />
                <Text style={[styles.statLabel, { color: currentTheme.text }]}>Income</Text>
              </View>
              <View style={styles.incomeBox}>
                <Text style={[styles.incomeText, { color: currentTheme.text }]}>₹ {incomeTotal}</Text>
              </View>
            </View>

            <View style={styles.bigBox}>
              <View style={styles.statBox}>
                <Ionicons name="arrow-up-circle" size={25} color="#E53935" />
                <Text style={[styles.statLabel, { color: currentTheme.text }]}>Expense</Text>
              </View>

              <View style={styles.expenseBox}>
                <Text style={[styles.expenseText, { color: currentTheme.text }]}>₹ {expenseTotal}</Text>
              </View>
            </View>

          </View>
        </View>

        <ScrollView>
          {
            transactions.length === 0 ? (
              <View style={{ marginTop: 50, alignItems: "center" }}>
                <Text style={{ color: currentTheme.text, fontSize: 16 }}>
                  No transactions yet. Start by adding some!
                </Text>
              </View>
            ) : (
              <FlatList
                data={transactions}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <RenderTransactions item={item} isDark={themeName === "dark"} />}
                contentContainerStyle={{ padding: 15 }}
              />
            )
          }
        </ScrollView>

      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "lightblue",
  },

  header: {
    backgroundColor: "#6C4AB6",
    paddingTop: 30,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  balanceLabel: {
    color: "#dcdcdc",
    fontSize: 14,
  },

  balance: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 8,
  },

  date: {
    color: "#cfcfcf",
    fontSize: 12,
    marginTop: 4,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },

  bigBox: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginHorizontal: 5,
    padding: 12,
    borderRadius: 20,
  },

  statBox: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    // backgroundColor: "rgba(255,255,255,0.1)",
    marginHorizontal: 5,
    padding: 12,
    borderRadius: 15,
  },

  statLabel: {
    color: "#ddd",
    fontSize: 15,
  },

  incomeBox: {
    backgroundColor: "rgba(76, 175, 80, 0.1)",
    padding: 12,
    borderRadius: 15,
    marginLeft: 5,
  },

  expenseBox: {
    backgroundColor: "rgba(229, 57, 53, 0.1)",
    padding: 12,
    borderRadius: 15,
    marginRight: 5,
  },

  incomeText: {
    color: "#4CAF50",
    fontWeight: "bold",
    marginTop: 2,
  },

  expenseText: {
    color: "#ff6b6b",
    fontWeight: "bold",
    marginTop: 2,
  },
});

const theme = {
  light: {
    background: "#f4f6fb",
    card: "#ffffff",
    text: "#000",
    subText: "#666",
    header: "#6C4AB6",
  },
  dark: {
    background: "#121212",
    card: "#1e1e1e",
    text: "#ffffff",
    subText: "#aaa",
    header: "#1f1f1f",
  },
};