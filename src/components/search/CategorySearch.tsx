import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { API_ACCESS_TOKEN } from '@env'
import { StackActions, useNavigation } from '@react-navigation/native'

const GenreItem = ({genre}) => {
  const navigation = useNavigation()
  const pushAction = StackActions.push('CategorySearchResult', { genre: genre })

  const styles = StyleSheet.create({
    categoryWrapper: {
      height: 60,
      width: '50%', 
      paddingHorizontal: 5,
      paddingVertical: 5,
    },
    categoryContainer: {
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#C0B4D5',
      borderRadius: 10,
    }
  })

  return (
    <View style={styles.categoryWrapper}>
      <TouchableOpacity 
        style={styles.categoryContainer}
        onPress={() => { navigation.dispatch(pushAction) }}
      >
        <Text>{genre.name}</Text>
      </TouchableOpacity>
    </View>
  )
}

const CategorySearch = () => {
  const [genreList, setGenreList] = useState([])

  useEffect(() => {
    getGenreList()
  }, [])

  const getGenreList = () => {
    const url = 'https://api.themoviedb.org/3/genre/movie/list?language=en';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`
      }
    };

    fetch(url, options)
      .then(res => res.json())
      .then(json => {
        setGenreList(json.genres)
      })
      .catch(err => console.error('error:' + err));
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: 15,
      justifyContent: 'center',
      alignItems: 'center',
    }
  })

  return (
    <View style={styles.container}>
      <FlatList 
        data={genreList}
        renderItem={
          ({ item }) => (
            <GenreItem 
              genre={item} 
            />
          )
        }
        numColumns={2}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

export default CategorySearch