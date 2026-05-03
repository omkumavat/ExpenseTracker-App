import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Switch,
} from "react-native";
import { UserInfo } from "../../components/UserInfo";
import { loadProfile, saveProfile, clearAllProfile } from "../../functions";
import { useTheme } from "../../context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

export default function Profile() {
  const [errors, setErrors] = useState({});
  const [profile, setProfile] = useState({
    name: "",
    gender: "",
    email: "",
    // theme: true,
  });

  const { themeName, toggleTheme } = useTheme();
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [editable, setEditable] = useState(true);
  const isDark = themeName === "dark";
  const currentTheme = isDark ? theme.dark : theme.light;

  const loadP = async () => {
    const data = await loadProfile();
    console.log(data);

    if (data && Object.keys(data).length > 0 && data.name && data.email && data.gender) {
      setProfile(data);
      setIsFirstTime(false);
      setEditable(false);
    }
  };

  useEffect(() => {
    // clearAllProfile();
    loadP();
  }, []);


  const validate = () => {
    let err = {};

    if (!profile.name.trim()) err.name = "Name is required";

    if (!profile.email.trim()) {
      err.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(profile.email)) {
      err.email = "Invalid email";
    }

    if (!profile.gender) err.gender = "Select gender";

    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;

    await saveProfile(profile);
    setIsFirstTime(false);
    setEditable(false);
  };

  if (!isFirstTime) {
    return <UserInfo
      profile={profile}
      setProfile={setProfile}
    />;
  }

  return (
    <View style={[styles.container, { backgroundColor: currentTheme.background }]}>

      {/* <Text style={[styles.title, { color: currentTheme.text }]}>Profile</Text> */}

      {/* Name */}
      <View style={styles.field}>
        <TextInput
          placeholder="Enter Name"
          value={profile.name}
          editable={editable}
          placeholderTextColor={currentTheme.subText}
          onChangeText={(text) => setProfile({ ...profile, name: text })}
          style={[
            styles.input,
            {
              backgroundColor: currentTheme.inputBg,
              color: currentTheme.text,
              borderColor: errors.name ? "#ff4d4f" : "transparent",
              borderWidth: 1,
            },
          ]}
        />

        {errors.name && (
          <View style={styles.errorRow}>
            <Ionicons name="alert-circle" size={14} color="#ff4d4f" />
            <Text style={styles.errorText}>{errors.name}</Text>
          </View>
        )}
      </View>

      {/* Email */}
      <View style={styles.field}>
        <TextInput
          placeholder="Enter Email"
          value={profile.email}
          editable={editable}
          placeholderTextColor={currentTheme.subText}
          onChangeText={(text) => setProfile({ ...profile, email: text })}
          style={[
            styles.input,
            {
              backgroundColor: currentTheme.inputBg,
              color: currentTheme.text,
              borderColor: errors.email ? "#ff4d4f" : "transparent",
              borderWidth: 1,
            },
          ]}
        />

        {errors.email && (
          <View style={styles.errorRow}>
            <Ionicons name="alert-circle" size={14} color="#ff4d4f" />
            <Text style={styles.errorText}>{errors.email}</Text>
          </View>
        )}
      </View>

      {/* Gender */}
      <View style={styles.genderRow}>
        {["Male", "Female", "Other"].map((g) => (
          <Pressable
            key={g}
            disabled={!editable}
            onPress={() => setProfile({ ...profile, gender: g })}
            style={[
              styles.genderBtn,
              {
                backgroundColor:
                  profile.gender === g
                    ? currentTheme.primary
                    : currentTheme.inputBg,
              },
            ]}
          >
            <Text style={{ color: currentTheme.text }}>{g}</Text>
          </Pressable>
        ))}
      </View>

      {errors.gender && (
        <View style={styles.errorRow}>
          <Ionicons name="alert-circle" size={14} color="#ff4d4f" />
          <Text style={styles.errorText}>{errors.gender}</Text>
        </View>
      )}
      {/* Theme */}
      <View style={styles.row}>
        <Text style={{ color: currentTheme.text }}>Dark Mode</Text>
        <Switch
          value={themeName === "dark"}
          onValueChange={toggleTheme}
        />
      </View>

      <Text style={[styles.warning, { color: "#ff4d4f" }]}>
        Your profile will be locked after setup. Only theme can be changed.
      </Text>

      {/* Save / Edit Button */}
      {isFirstTime && (
        <Pressable style={[
          styles.saveBtn,
          { backgroundColor: currentTheme.primary },
        ]} onPress={handleSave}>
          <Text style={styles.btnText}>Save Profile</Text>
        </Pressable>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#f5f6fa",
  },

  warning: {
    fontSize: 12,
    textAlign: "center",
    marginBottom: 10,
  },

  field: {
    marginBottom: 10,
  },

  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginTop: 5,
    marginLeft: 5,
  },

  errorText: {
    color: "#ff4d4f",
    fontSize: 12,
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    // marginTop: 28,
    textAlign: "center",
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
  },

  genderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  genderBtn: {
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#eee",
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },

  selectedGender: {
    backgroundColor: "#4CAF50",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    alignItems: "center",
  },

  saveBtn: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },

  editBtn: {
    backgroundColor: "#6C4AB6",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "600",
  },
});

const theme = {
  light: {
    background: "#f5f6fa",
    card: "#ffffff",
    text: "#000",
    subText: "#666",
    inputBg: "#ffffff",
    border: "#eee",
    primary: "#6C4AB6",
  },
  dark: {
    background: "#121212",
    card: "#1e1e1e",
    text: "#ffffff",
    subText: "#ffffff",
    inputBg: "#2a2a2a",
    border: "#333",
    primary: "#9D7BFF",
  },
};