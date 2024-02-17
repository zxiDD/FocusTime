import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from 'react-native';

const minutesToMillis = (min) => min * 1000 * 60;
const formatTime = (time) => time < 10 ? `0${time}` : time

export const Countdown = ({
    minutes = 0.1,
    isPaused,
    onProgress,
    onEnd
}) => {
    const interval = React.useRef(null)

    useEffect(() => {
        if (isPaused) {
            if (interval.current) clearInterval(interval.current)
            return
        }
        interval.current = setInterval(countDown, 1000)

        return () => clearInterval(interval.current)
    }, [isPaused])

    const countDown = () => {
        setMillis((time) => {
            if (time === 0) {
                clearInterval(interval.current)
                return time
            } else {
                const timeLeft = time - 1000
                return timeLeft
            }
        })
    }
    const [millis, setMillis] = useState(minutesToMillis(minutes))

    useEffect(()=>{
        onProgress(millis / minutesToMillis(minutes))
        if(millis===0){
            onEnd()
        }
    },[millis])

    useEffect(()=>{
        setMillis(minutesToMillis(minutes))
    },[minutes])

    const minute = Math.floor(millis / 1000 / 60) % 60
    const seconds = Math.floor(millis / 1000) % 60



    return (
        <View>
            <Text style={styles.text}>{formatTime(minute)}:{formatTime(seconds)}</Text>
        </View>
    )
}


const styles = StyleSheet.create({
    text: {
        color: "white",
        fontSize: 80,
        padding: 20,
        backgroundColor: "rgba(94,132,226,0.3)"
    }
})