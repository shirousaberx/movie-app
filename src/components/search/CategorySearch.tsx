import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native'
import MovieItem from '../components/movies/MovieItem'

const posterImageSize = {
  width: 100,
  height: 160,
}

const CategorySearchResult = () => {
  const [keyword, setKeyword] = useState('');

  const styles = StyleSheet.create({

  })

  return (
    <></>
  )
}

export default CategorySearchResult