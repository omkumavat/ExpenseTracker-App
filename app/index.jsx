import { View, Text, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useRouter } from "expo-router";
import { Tabs } from "expo-router";

export default function Splash() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.replace("/home"); // go to home
        }, 2000); // 5 sec splash

        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <Tabs.Screen options={{ headerShown: false }} />
            <View style={styles.container}>
                <Text style={styles.logo}>💰 Expense Tracker</Text>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#6C4AB6",
        justifyContent: "center",
        alignItems: "center",
    },

    logo: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },
});