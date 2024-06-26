import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MovieDetail from '../screens/MovieDetail';
import Favorite from '../screens/Favorite';

const Stack = createNativeStackNavigator();

const FavoriteStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Favorite'>
      <Stack.Screen 
        name="Home" 
        component={Favorite} 
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="MovieDetail" 
        component={MovieDetail} 
        options={{
          title: 'Movie Detail',
        }}
      />
    </Stack.Navigator>
  )
}

export default FavoriteStackNavigator;