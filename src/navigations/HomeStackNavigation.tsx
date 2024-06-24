import React from 'react'
import { Text } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from '../screens/Home';
import MovieDetail from '../screens/MovieDetail';

const Stack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen 
        name="Home" 
        component={Home} 
      />
      <Stack.Screen 
        name="MovieDetail" 
        component={MovieDetail} 
      />
    </Stack.Navigator>
  )
}

export default HomeStackNavigator;