import React from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import BottomTabNavigator from './src/navigations/BottomTabNavigation'

export default function App(): JSX.Element {
  return (
    <NavigationContainer>
      <StatusBar />
      <BottomTabNavigator />
    </NavigationContainer>
  )
}