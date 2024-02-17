import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text, Vibration, Platform } from 'react-native';
import { Countdown } from "../Components/Countdown";
import { RoundedButton } from "../Components/RoundedButton";
import { ProgressBar } from "react-native-paper";
import { Timing } from "./Timing";
import { useKeepAwake } from "expo-keep-awake"

const DEFAULT_TIME = 0.1

export const Timer = ({ focusSubject, onTimerEnd, clearSubject }) => {
    useKeepAwake()
    const [isStarted, setIsStarted] = useState(false)
    const [progress, setProgress] = useState(1)
    const [minutes, setMinutes] = useState(DEFAULT_TIME)
    const changeTime = (min) => {
        setMinutes(min)
        setProgress(1)
        setIsStarted(false)
    }

    const vibrate = () => {
        if (Platform.OS === "ios") {
            const interval = setInterval(() => Vibration.vibrate(), 1000);
            setTimeout(() => clearInterval(interval), 2000)
        } else {
            Vibration.vibrate(2000)
        }
    }
    const onProgress = (progress) => {
        setProgress(progress)
    }

    const onEnd = () => {
        vibrate()
        setMinutes(DEFAULT_TIME)
        setProgress(1)
        setIsStarted(false)
        setTimeout(() => onTimerEnd(), 2000)
    }

    return (
        <View style={styles.container}>
            <View style={styles.countdown}>
                <Countdown minutes={minutes} isPaused={!isStarted} onProgress={onProgress} onEnd={onEnd} />
            </View>
            <View style={{ paddingTop: 40 }}>
                <Text style={styles.title}>Focusing on</Text>
                <Text style={styles.task}>{focusSubject}</Text>
            </View>
            <View style={{ paddingTop: 15 }}>
                <ProgressBar progress={progress} color="#5E84E2" style={{ height: 10 }} />
            </View>
            <View style={styles.buttonWrapper}>
                <Timing onChangeTime={changeTime} />
            </View>
            <View style={styles.buttonWrapper}>
                {!isStarted ?
                    (<RoundedButton title="Start" onPress={() => setIsStarted(true)} />)
                    :
                    (<RoundedButton title="Pause" onPress={() => setIsStarted(false)} />)}
            </View>
            <View style={styles.clearSubject}>
                <RoundedButton title="-" size={50} onPress={() => clearSubject()} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        color: "white",
        textAlign: "center"
    },
    task: {
        color: "white",
        textAlign: "center",
        fontWeight: 'bold'
    },
    countdown: {
        flex: 0.5,
        alignItems: "center",
        justifyContent: "center"
    },
    buttonWrapper: {
        flex: 0.3,
        flexDirection: "row",
        padding: 15,
        justifyContent: "center",
        alignItems: "center"
    },
    clearSubject: {
        paddingBottom: 25,
        paddingLeft: 25
    }
})