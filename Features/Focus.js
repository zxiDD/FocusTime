import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import { RoundedButton } from '../Components/RoundedButton';

export const Focus = ({ addSubject }) => {
    const [subject, setSubject] = useState(null)
    return (
        <View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>What would you like to focus on</Text>
                <View style={styles.inputContainer}>
                    <TextInput style={{ flex: 1, marginRight: 10 }} onSubmitEditing={({ nativeEvent }) => { setSubject(nativeEvent.text) }} />
                    <RoundedButton size={50} title="+" onPress={() => { addSubject(subject) }} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleContainer: {
        flex: 0.5,
        padding: 16,
        justifyContent: 'center'
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 22,
    },
    inputContainer: {
        paddingTop: 20,
        flexDirection: 'row'
    }
});
