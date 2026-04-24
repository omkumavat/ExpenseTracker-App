import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveExpense = async (expense) => {
  try {
    const existing = await AsyncStorage.getItem("expenses");
    const expenses = existing ? JSON.parse(existing) : [];

    const newExpense = {
      id: Date.now(), 
      ...expense,
    };

    expenses.push(newExpense);

    await AsyncStorage.setItem("expenses", JSON.stringify(expenses));
  } catch (e) {
    console.log(e);
  }
};

export const getExpenses = async () => {
  try {
    const data = await AsyncStorage.getItem("expenses");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const clearAll = async () => {
  await AsyncStorage.clear();
};


export const deleteExpense = async (id) => {
  try {
    const data = await AsyncStorage.getItem("expenses");
    const expenses = data ? JSON.parse(data) : [];

    const updatedExpenses = expenses.filter(item => item.id !== id);

    await AsyncStorage.setItem("expenses", JSON.stringify(updatedExpenses));
  } catch (e) {
    console.log(e);
  }
};