import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { RoundedButton } from "../Components/RoundedButton";

export const FocusHistory = ({ FocusHistory, onClear }) => {
    const clearHistory = () => {
        onClear()
    }
    const HistoryItem = ({ item, index }) => {
        return (
            <Text style={styles.historyItem(item.status)}>
                {item.subject}
            </Text>
        )
    }
    return (
        <View style={{ flex: 1, alignItems: "center" }}>
            {!!FocusHistory.length &&
                (<>
                    <Text style={styles.title}>Things we've focused on</Text>
                    <FlatList
                        style={{ flex: 1 }}
                        contentContainerStyle={{ alignItems: "center" }}
                        data={FocusHistory}
                        renderItem={HistoryItem}
                    />
                    <View style={styles.clearContainer}>
                        <RoundedButton title='Clear' size={75} onPress={clearHistory}/>
                    </View>
                </>)
            }
        </View>
    )
}

const styles = StyleSheet.create({
    historyItem: (status) => ({
        color: status < 1 ? "red" : "green",
        fontSize: 20,
    }),
    title: {
        color: "white",
        fontSize: 25,
    },
    clearContainer:{
        alignItems:'center',
        justifyContent:'center',
        margin:10    
    }
})