import React, { useCallback, useEffect, useState } from 'react'
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native'
import MovieItem from '../movies/MovieItem'

const posterImageSize = {
  width: 100,
  height: 160,
}

// show movielist based on provided genre
const CategorySearchResult = ({route}) => {
  const genre = route.params.genre;
  const [movieList, setMovieList] = useState([])

  useEffect(() => {
    console.log('CategorySearchResult useEffect() run')
    getMovieList()
  }, [])

  const getMovieList = () => {
    const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&with_genres=${genre.id}`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_ACCESS_TOKEN}` 
      }
    };

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        setMovieList(response.results)
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingTop: 16,
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    backgroundImageStyle: {
      marginHorizontal: 3,
      marginBottom: 15,
    },
  })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{genre.name}</Text>
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
      />
    </View>
  )
}

export default CategorySearchResult