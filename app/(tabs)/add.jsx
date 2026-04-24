import { Image } from 'expo-image';
import { Platform, Pressable, StyleSheet } from 'react-native';
import { ScrollView, Text, View } from 'react-native';

import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';
import { Button } from 'react-native-web';
import { useState } from 'react';
import ExpenseForm from '@/components/ExpenseForm';
import IncomeForm from '@/components/IncomeForm';
import { router } from 'expo-router';

export default function Add() {
    const [isExpense, setIsExpense] = useState(true);
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.headerSection}>
                    <Pressable style={styles.backBtn} onPress={() => router.back()}>
                        <Image source={require("../../assets/images/back.png")}
                            style={styles.backImage}
                        ></Image>
                    </Pressable>
                    <Text style={styles.transactionText}>Add Transaction</Text>
                </View>
                <View style={styles.transactionsButtons}>
                    <Pressable
                        style={[
                            styles.transactionButton,
                            isExpense && styles.activeButton,
                        ]}
                        onPress={() => setIsExpense(true)}
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                isExpense && styles.activeText,
                            ]}
                        >
                            Expense
                        </Text>
                    </Pressable>

                    <Pressable
                        style={[
                            styles.transactionButton,
                            !isExpense && styles.activeButton,
                        ]}
                        onPress={() => setIsExpense(false)}
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                !isExpense && styles.activeText,
                            ]}
                        >
                            Income
                        </Text>
                    </Pressable>
                </View>
                {
                    isExpense ?
                        <View style={styles.formContainer}><ExpenseForm /></View>
                        : <View style={styles.formContainer}><IncomeForm /></View>
                }
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 40,
    },

    headerSection: {
        width: "100%",
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
        marginTop: 20,
    },

    backImage: {
        width: 30,
        height: 30,
        marginRight: 10,
    },

    backBtn: {
    position: "absolute", 
    left: 0,
    right:10
  },


    transactionText: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        textAlign: "center",
    },

    transactionsButtons: {
        flexDirection: "row",
        width: "100%", // ✅ FIXED
        backgroundColor: "#f0f0f0",
        borderRadius: 50,
        padding: 5,
    },

    transactionButton: {
        flex: 1, // ✅ VERY IMPORTANT
        paddingVertical: 12,
        borderRadius: 50,
        alignItems: "center",
    },

    activeButton: {
        backgroundColor: "#4CAF50",
    },

    buttonText: {
        fontSize: 16,
        fontWeight: "600",
        color: "#333",
    },

    activeText: {
        color: "#fff",
    },

    formContainer: {
        marginTop: 30,
        width: "100%",
    },
});
