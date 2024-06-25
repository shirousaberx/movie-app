import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import MovieItem from '../components/movies/MovieItem'

const posterImageSize = {
  width: 100,
  height: 160,
}

const Favorite = (): JSX.Element => {
  const [movieList, setMovieList] =  useState([])
  const [favoriteExists, setFavoriteExists] = useState(false)

  useFocusEffect(
    useCallback(() => {
      getFavoriteMovieList();
      console.log('Favorite useFocusEffect() run')
    }, [])
  )

  const getFavoriteMovieList = async () => {
    try {
      let favoriteList = await AsyncStorage.getItem(
        '@FavoriteList'
      )
  
      if (favoriteList !== null) {
        favoriteList = JSON.parse(favoriteList)
        favoriteList.length !== 0 ? setFavoriteExists(true) : setFavoriteExists(false)
        setMovieList(favoriteList);
      } 
    } catch (error) {
      console.log(error)
    }
  }

  const styles = StyleSheet.create({
    backgroundImageStyle: {
      marginHorizontal: 7,
      marginBottom: 15,
    },
    container: {
      flex: 1,
      paddingTop: 20,
      paddingHorizontal: 7,
      alignItems: 'center',
      justifyContent: 'center'
    }
  })

  return (
    <View style={styles.container}>
      { favoriteExists ? (
        <FlatList 
        data={movieList}
        renderItem={
          ({ item }) => (
            <MovieItem 
              movie={item} 
              size={posterImageSize} 
              coverType='poster' 
              backgroundImageStyle={styles.backgroundImageStyle}
            />
          )
        }
        numColumns={3}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />) : (
        <Text>No Favorite</Text>
      )}
    </View>
  )
}

export default Favorite