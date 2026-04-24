import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  Modal,
} from "react-native";
import { getExpenses, deleteExpense } from "../../functions";
import { Ionicons } from "@expo/vector-icons";

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState(null);


  useEffect(() => {
    const loadExpenses = async () => {
      const data = await getExpenses();
      setExpenses(data);
      console.log(data);
      
    };
    loadExpenses();
  }, []);

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

  // ❌ Delete
  const confirmDelete = (id) => {
    setSelectedId(id);
    setModalVisible(true);
  };

  // 📅 Format date
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

  // 🧾 Render item
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View>
        <Text style={styles.note}>{item.note}</Text>
        <Text style={styles.sub}>
          {item.category} • {formatDate(item.date)}
        </Text>
      </View>

      <View style={styles.right}>
        <Text style={styles.amount}>₹{item.amount}</Text>

        <Pressable onPress={() => confirmDelete(item.id)}>
          <Ionicons name="trash-outline" size={18} color="red" />
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      
      {/* 🔍 Search */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={18} color="#888" />
        <TextInput
          placeholder="Search..."
          value={search}
          onChangeText={setSearch}
          style={styles.searchInput}
        />
      </View>

      {/* 📋 List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
      />

      {/* ❗ Delete Modal */}
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalText}>
              Are you sure you want to delete?
            </Text>

            <View style={styles.modalBtns}>
              <Pressable
                style={styles.cancelBtn}
                onPress={() => setModalVisible(false)}
              >
                <Text>Cancel</Text>
              </Pressable>

              <Pressable style={styles.deleteBtn} onPress={handleDelete}>
                <Text style={{ color: "#fff" }}>Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f8f9fb",
  },

  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    marginBottom: 15,
  },

  searchInput: {
    marginLeft: 8,
    flex: 1,
  },

  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
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
  },

  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4CAF50",
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