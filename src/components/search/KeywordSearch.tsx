import React, { useCallback, useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { View, Text, FlatList, StyleSheet, TextInput } from 'react-native'
import MovieItem from '../movies/MovieItem'
import { Feather } from '@expo/vector-icons'

const posterImageSize = {
  width: 100,
  height: 160,
}

const KeywordSearch = () => {
  const [keyword, setKeyword] = useState('');
  const [movieList, setMovieList] = useState([])
  const [isFound, setIsFound] = useState(true)  // to denote if there movie from search keyword

  const searchMovie = () => {
    console.log('keyword: ', keyword)
    const url = `https://api.themoviedb.org/3/search/movie?query=${keyword.trim()}&include_adult=false&language=en-US&page=1`;
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjOWEzZjE3M2E0OTZkNDAwYzg0ODVmZThiODk2NjcxYyIsIm5iZiI6MTcxOTIzODUxNC4xNzcwNjcsInN1YiI6IjY2Nzk3YTE2NzYwOGMyZjBjNTdjMWYwYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.p8mrbBto96RNKq9PMDNUXvBmpOUnA2jmsZoZsdtG96o'
      }
    };

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        setMovieList(response.results)
        // check if there is movie with provided keyword
        if (response.results.length === 0) {
          setIsFound(false)
        } else {
          setIsFound(true)
        }
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
  }

  const styles = StyleSheet.create({
    searchContainer: {
      marginTop: 15,
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: 'black',
      paddingHorizontal: 15,
      paddingVertical: 12,
      backgroundColor: 'white',
      alignItems: 'center',
      borderRadius: 50,
    },
    searchBar: {
      backgroundColor: 'white',
      flex: 1,
    },
    searchResultContainer: {
      marginTop: 15,
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    backgroundImageStyle: {
      marginHorizontal: 3,
      marginBottom: 15,
    },
  })

  return (
    <>
      <View style={styles.searchContainer}>
        <TextInput 
          style={styles.searchBar}
          editable
          placeholder='Input movie title here'
          numberOfLines={1}
          onChangeText={setKeyword}
          onSubmitEditing={() => searchMovie()}
        />
        <Feather name="search" size={24} color="black" />
      </View>
      <View style={styles.searchResultContainer}>
        { isFound ? (
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
          <Text>No Movies Found</Text>)
        }
      </View>
    </>
  )
}

export default KeywordSearch