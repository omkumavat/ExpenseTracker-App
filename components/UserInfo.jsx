import { View, Text, StyleSheet, Switch } from "react-native";
import { saveProfile } from "../functions";
import { useTheme } from "../context/ThemeContext";

export function UserInfo({ profile, setProfile }) {
  const { themeName, toggleTheme } = useTheme();
  const isDark = themeName === "dark";
  const currentTheme = isDark ? theme.dark : theme.light;

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>

      {/* <Text style={[styles.title, { color: currentTheme.text }]}>Profile</Text> */}

      <View style={[styles.card, { backgroundColor: currentTheme.card }]}>

        <View style={styles.item}>
          <Text style={[styles.label, { color: currentTheme.text }]}>Name</Text>
          <Text style={[styles.value, { color: currentTheme.text }]}>
            {profile.name || "Not set"}
          </Text>
        </View>

        <View style={styles.item}>
          <Text style={[styles.label, { color: currentTheme.text }]}>Email</Text>
          <Text style={[styles.value, { color: currentTheme.text }]}>
            {profile.email || "Not set"}
          </Text>
        </View>

        <View style={styles.item}>
          <Text style={[styles.label, { color: currentTheme.text }]}>Gender</Text>
          <Text style={[styles.value, { color: currentTheme.text }]}>
            {profile.gender || "Not selected"}
          </Text>
        </View>
      </View>

      {/* Instruction */}
      <Text style={[styles.infoText, { color: currentTheme.text }]}>
        Your profile is locked after setup. Only theme can be changed.
      </Text>

      <View style={styles.row}>
        <Text style={{ color: currentTheme.text }}>Dark Mode</Text>
        <Switch
          value={themeName === "dark"}
          onValueChange={toggleTheme}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#f5f6fa",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 20,
    textAlign: "center",
  },

  row: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 18,
    elevation: 3,
  },

  item: {
    marginBottom: 15,
  },

  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },

  label: {
    fontSize: 12,
    color: "#888",
  },

  value: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 2,
  },

  subText: {
    fontSize: 11,
    color: "#aaa",
  },

  infoText: {
    marginTop: 20,
    textAlign: "center",
    fontSize: 12,
    color: "#666",
  },
});

const theme = {
  light: {
    background: "#f5f6fa",
    card: "#fff",
    text: "#000",
  },
  dark: {
    background: "#121212",
    card: "#1e1e1e",
    text: "#fff",
  },
};