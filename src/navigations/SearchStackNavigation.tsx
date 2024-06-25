import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Search from '../screens/Search';
import CategorySearchResult from '../components/search/CategorySearch';
import MovieDetail from '../screens/MovieDetail';

const Stack = createNativeStackNavigator();

const SearchStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen 
        name="Search" 
        component={Search} 
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
      <Stack.Screen 
        name="CategorySearchResult" 
        component={CategorySearchResult} 
        options={{
          title: 'Category Search Result',
        }}
      />
    </Stack.Navigator>
  )
}

export default SearchStackNavigator;