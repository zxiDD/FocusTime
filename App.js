import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';
import { Focus } from './Features/Focus';
import { Timer } from './Features/Timer';
import { FocusHistory } from './Features/FocusHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STATUSES = {
  COMPLETED: 1,
  CANCELLED: 0
}
export default function App() {
  const [focusSubject, setfocusSubject] = useState(null);
  const [focusHistory, setfocusHistory] = useState([])

  const addFocusHistorySubjectWithStatus = (subject, status) => {
    setfocusHistory([...focusHistory, { key: String(focusHistory.length + 1), subject, status }])
  }

  const onClear = () => {
    setfocusHistory([])
  }

  useEffect(() => {
    saveFocusHistory()
  }, [focusHistory])

  useEffect(() => {
    loadFocusHistory()
  }, [])

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem('focusHistory', JSON.stringify(focusHistory))
    } catch (error) {
      console.log(error);
    }
  }

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory')
      console.log('history', JSON.parse(history))
      if (history && JSON.parse(history).length) {
        setfocusHistory(JSON.parse(history))
      }
    } catch (error) {
      console.log(error);
    }
  }

  console.log(focusHistory)
  return (
    <View style={styles.container}>
      <StatusBar false />
      {focusSubject ?
        (<Timer
          focusSubject={focusSubject}
          onTimerEnd={() => { addFocusHistorySubjectWithStatus(focusSubject, STATUSES.COMPLETED), setfocusSubject(null) }}
          clearSubject={() => { addFocusHistorySubjectWithStatus(focusSubject, STATUSES.CANCELLED), setfocusSubject(null) }} />
        ) : (
          <>
            <Focus addSubject={setfocusSubject} />
            <FocusHistory FocusHistory={focusHistory} onClear={onClear} />
          </>
        )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252250',
  },
});
