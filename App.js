import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigator from './src/navigations/BottomTabNavigation'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {
  const clearAll = async () => {
    try {
      await AsyncStorage.clear()
      console.log('Async Storage Clear Done.')
    } catch(e) {
      // clear error
    }
  }

  // clearAll();

  return (
    <NavigationContainer>
      <StatusBar />
      <BottomTabNavigator />
    </NavigationContainer>
  )
}