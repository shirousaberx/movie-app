import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Feather } from '@expo/vector-icons'
import SearchStackNavigator from './SearchStackNavigation'
import HomeStackNavigator from './HomeStackNavigation'
import FavoriteStackNavigator from './FavoriteStackNavigation'

const Tab = createBottomTabNavigator()

const BottomTabNavigator = (): JSX.Element => (
  <Tab.Navigator initialRouteName='HomeStackNavigation'>
    <Tab.Screen
      name="HomeStackNavigation"
      component={HomeStackNavigator}
      options={{
        title: 'Home',
        tabBarIcon: ({ color }) => (
          <Feather name="home" size={28} color={color} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="SearchStackNavigation"
      component={SearchStackNavigator}
      options={{
        title: 'Search',
        tabBarIcon: ({ color }) => (
          <Feather name="search" size={28} color={color} />
        ),
        headerShown: false,
      }}
    />
    <Tab.Screen
      name="FavoriteStackNavigation"
      component={FavoriteStackNavigator}
      options={{
        title: 'Favorite',
        tabBarIcon: ({ color }) => (
          <Feather name="heart" size={28} color={color} />
        ),
        headerShown: false,
      }}
    />
  </Tab.Navigator>
)

export default BottomTabNavigator