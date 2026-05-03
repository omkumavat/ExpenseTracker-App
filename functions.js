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

export const clearAllExpenses = async () => {
  await AsyncStorage.removeItem("expenses");
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



export const saveIncome = async (income) => {
  try {
    const existing = await AsyncStorage.getItem("incomes");
    const incomes = existing ? JSON.parse(existing) : [];

    const newIncome = {
      id: Date.now(),
      ...income,
    };

    incomes.push(newIncome);

    await AsyncStorage.setItem("incomes", JSON.stringify(incomes));
  } catch (e) {
    console.log(e);
  }
};

export const getIncomes = async () => {
  try {
    const data = await AsyncStorage.getItem("incomes");
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const clearAllIncomes = async () => {
  await AsyncStorage.removeItem("incomes");
};


export const deleteIncome = async (id) => {
  try {
    const data = await AsyncStorage.getItem("incomes");
    const incomes = data ? JSON.parse(data) : [];

    const updatedIncomes = incomes.filter(item => item.id !== id);

    await AsyncStorage.setItem("incomes", JSON.stringify(updatedIncomes));
  } catch (e) {
    console.log(e);
  }
};



const getAllTransactions = async () => {
  const expenseData = await AsyncStorage.getItem("expenses");
  const incomeData = await AsyncStorage.getItem("income");

  const expenses = expenseData ? JSON.parse(expenseData) : [];
  const income = incomeData ? JSON.parse(incomeData) : [];

  const expenseWithType = expenses.map((e) => ({
    ...e,
    type: "expense",
  }));

  const incomeWithType = income.map((i) => ({
    ...i,
    type: "income",
  }));

  const all = [...expenseWithType, ...incomeWithType].sort(
    (a, b) => new Date(b.date) - new Date(a.date)
  );

  return all;
};


export const loadProfile = async () => {
  try {
    const data = await AsyncStorage.getItem("profile");

    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.log(e);
    return [];
  }
};

export const saveProfile = async (profile) => {
  try {
    await AsyncStorage.setItem("profile", JSON.stringify(profile));
  } catch (e) {
    console.log(e);
  }
};

export const clearAllProfile = async () => {
  await AsyncStorage.removeItem("profile");
};