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
  StatusBar,
} from "react-native";
import { getIncomes, deleteIncome } from "../../functions";
import { Ionicons } from "@expo/vector-icons";
import { loadProfile } from "../../functions";
import { useTheme } from "../../context/ThemeContext";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";

export default function Incomes() {
  const [incomes, setIncomes] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const { themeName } = useTheme();
  const currentTheme = themeName === "dark" ? theme.dark : theme.light;


  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);


  useFocusEffect(
    useCallback(() => {
      const loadIncomes = async () => {
        const data = await getIncomes();
        setIncomes(data);
        console.log(data);
      };
      loadIncomes();
    }, [])
  );

  useEffect(() => {
    const result = incomes.filter((item) => {
      const text = search.toLowerCase();

      return (
        item.note?.toLowerCase().includes(text) ||
        String(item.amount).includes(text) ||
        String(item.category).includes(text)
      );
    });

    setFiltered(result);
  }, [search, incomes]);

  useEffect(() => {
    const result = incomes.filter((item) => {
      const text = search.toLowerCase();

      return (
        item.note?.toLowerCase().includes(text) ||
        String(item.amount).includes(text) ||
        String(item.category).includes(text)
      );
    });

    setFiltered(result);
  }, [search, incomes]);

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
    await deleteIncome(selectedId);

    const updated = await getIncomes(); // refresh list
    setIncomes(updated);

    setModalVisible(false);
  };

  const renderItem = ({ item }) => {

    return (
      <View style={[styles.card, { backgroundColor: currentTheme.card }]}>
        {/* LEFT: ICON + TEXT */}
        <View style={[styles.left, { backgroundColor: currentTheme.card }]}>
          <View>
            <Text style={[styles.note, { color: currentTheme.text }]}>
              {item.note}
            </Text>
            <Text style={[styles.sub, { color: currentTheme.subText }]}>
              {formatDate(item.date)}
            </Text>
          </View>
        </View>

        {/* RIGHT */}
        <View style={[styles.right, { backgroundColor: currentTheme.card }]}>
          <Text style={[styles.amount]}>
            ₹{item.amount}
          </Text>

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
          <View
            style={[
              styles.searchBox,
              { backgroundColor: currentTheme.card },
            ]}
          >
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
              selectionColor={currentTheme.primary}
              style={[
                styles.searchInput,
                {
                  color: currentTheme.text,
                  backgroundColor: "transparent",
                },
              ]}
            />
          </View>
          <View style={styles.noexpenses}>
            <Text style={{ color: currentTheme.text }}>
              No incomes found
            </Text>
          </View>
        </View>
      </>
    );
  }

  if (incomes.length === 0) {
    return (
      <> <StatusBar barStyle={themeName === "dark" ? "light-content" : "dark-content"} 
      backgroundColor={currentTheme.background} />
        <View style={[styles.container, { backgroundColor: currentTheme.background }]}>
          <View
            style={[
              styles.searchBox,
              { backgroundColor: currentTheme.card },
            ]}
          >
            <Ionicons
              name="search"
              size={18}
              color={currentTheme.subText} // ✅ FIXED
            />

            <TextInput
              placeholder="Search..."
              placeholderTextColor={currentTheme.subText}
              value={search}
              onChangeText={setSearch}
              selectionColor={currentTheme.primary}
              style={[
                styles.searchInput,
                {
                  color: currentTheme.text,
                  backgroundColor: currentTheme.card,
                },
              ]}
            />
          </View>
          <View style={styles.noexpenses}>
            <Text style={{ color: currentTheme.text }}>
              No incomes found
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


        <View
          style={[
            styles.searchBox,
            {
              backgroundColor: currentTheme.card,
              // borderColor: currentTheme.border,
              // borderWidth: 1,
              // overflow: "hidden"
            },
          ]}
        >
          <Ionicons
            name="search"
            size={18}
            color={currentTheme.subText} />

          <TextInput
            placeholder="Search..."
            placeholderTextColor={currentTheme.subText}
            value={search}
            onChangeText={setSearch}
            // selectionColor={currentTheme.primary}
            // underlineColorAndroid="transparent"
            style={[
              styles.searchInput,
              {
                color: currentTheme.text,
                // backgroundColor: "transparent",
                backgroundColor: currentTheme.card,
              },
            ]} />
        </View>

        {/* 📋 List */}
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false} />


        <Modal transparent visible={modalVisible} animationType="fade">
          <View
            style={[
              styles.modalOverlay,
              { backgroundColor: currentTheme.modalBg },
            ]}
          >
            <View
              style={[
                styles.modalBox,
                { backgroundColor: currentTheme.card },
              ]}
            >
              <Text
                style={[
                  styles.modalText,
                  { color: currentTheme.text },
                ]}
              >
                Are you sure you want to delete?
              </Text>

              <View style={styles.modalBtns}>
                <Pressable
                  style={[
                    styles.cancelBtn,
                    { backgroundColor: currentTheme.card },
                  ]}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={{ color: currentTheme.text }}>
                    Cancel
                  </Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.deleteBtn,
                    { backgroundColor: currentTheme.deleteBtn },
                  ]}
                  onPress={handleDelete}
                >
                  <Text style={{ color: currentTheme.text }}>
                    Delete
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </Modal>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    // marginTop: 10,
    backgroundColor: "#f8f9fb",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
    // marginTop: 13,
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
    elevation: 2,
  },

  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#eee",
    padding: 8,
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
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: 15,
  },

  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00c400",
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
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    width: "80%",
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

const theme = {
  light: {
    background: "#f5f6fa",
    card: "#ffffff",
    text: "#000000",
    subText: "#666",
    border: "#eee",
    primary: "#6C4AB6",
    success: "#4CAF50",
    danger: "#E53935",
  },

  dark: {
    background: "#121212",
    card: "#1e1e1e",
    text: "#ffffff",
    subText: "#aaa",
    border: "#333",
    primary: "#9D7BFF",
    success: "#4CAF50",
    danger: "#EF5350",
  },
};