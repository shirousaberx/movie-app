/* eslint-disable react/prop-types */
import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native'

const Home = ({ navigation }): JSX.Element => {
  return (
    <View>
      <Text>Home</Text>
      <Button 
        title='Go To Movie Detail'
        onPress={() => navigation.navigate('MovieDetail')}
      />
    </View>
  )
}

export default Home;