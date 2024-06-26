import React, { useCallback, useEffect, useState } from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation, useFocusEffect, StackActions } from '@react-navigation/native'
import MovieList from '../components/movies/MovieList'
import AsyncStorage from '@react-native-async-storage/async-storage'

const MovieDetailHeading = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false)

  const imageExists = Boolean(movie.backdrop_path) 
  const defaultImageUri = 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='

  useFocusEffect(
    useCallback(() => {
      (async() => setIsFavorite(await checkIsFavorite(movie.id)))()
      console.log('Movie Detail useEffect() run')
    }, [])
  )

  const addFavorite = async (movie) => {
    try {
      const initialData = await AsyncStorage.getItem(
        '@FavoriteList'
      )
  
      let favMovieList = []
      if (initialData !== null) {
        favMovieList = [...JSON.parse(initialData), movie]
      } else {
        favMovieList = [movie]
      }
  
      await AsyncStorage.setItem('@FavoriteList', JSON.stringify(favMovieList))
      setIsFavorite(true)

      // ================ FOR DEBUGGING ==================
      let favMovieListId = []
      for (let i in favMovieList) {
        favMovieListId.push(favMovieList[i].id)
      }
      console.log('ADD movie id: ', movie.id)
      console.log('ADD favMovieListId: ', favMovieListId)

    } catch (error) {
      console.log(error)
    }
  }

  const removeFavorite = async (movieid) => {
    try {
      const initialData = await AsyncStorage.getItem(
        '@FavoriteList'
      )

      let favMovieList;

      if (initialData !== null) {
        favMovieList = JSON.parse(initialData)
      } else {
        favMovieList = []
      }

      const newFavMovieList = favMovieList.filter((favMovieItem) => {
        return favMovieItem.id !== movieid;
      })

      await AsyncStorage.setItem('@FavoriteList', JSON.stringify(newFavMovieList))
      setIsFavorite(false)

      // ================ FOR DEBUGGING ==================
      let favMovieListId = []
      for (let i in newFavMovieList) {
        favMovieListId.push(newFavMovieList[i].id)
      }
      console.log('DELETE movie id: ', movie.id)
      console.log('DELETE favMovieListId: ', favMovieListId)

    } catch (error) {
      console.log(error)
    }
  }

  const checkIsFavorite = async (movieId) => {
    const initialData = await AsyncStorage.getItem(
      '@FavoriteList'
    )

    if (initialData !== null) {
      const favMovieList = JSON.parse(initialData)

      for (let i in favMovieList) {
        if (favMovieList[i].id === movieId) {
          console.log('checkIsFavorite: ', true)
          return true;
        }
      }
    }

    console.log('checkIsFavorite: ' , false)
    return false;
  }

  const styles = StyleSheet.create({
    backgroundImage: {
      width: '100%',
      height: 200,
    },
    movieTitle: {
      color: 'white',
      fontSize: 18,
    },
    gradientStyle: {
      padding: 20,
      height: '100%',
      width: '100%',
      display: 'flex',
      justifyContent: 'flex-end',
      flexWrap: 'wrap',
    },
    rateFavContainer: {  // double columns container
      marginTop: 13,
      flex: 0,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignContent: 'flex-start',
    },
    ratingWrapper: {  // double columns item
      width: '80%', 
      gap: 5,
    },
    favoriteWrapper: {   // double columns item
      width: '20%', 
      justifyContent: 'flex-end', 
      alignItems: 'flex-end',
    },
    starContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 5,
    },
    rating: {
      color: 'yellow',
      fontWeight: '700',
      fontSize: 12,
    },
    overviewContainer: {
      padding: 20,
    },
    infoContainer: {  // double columns container
      marginTop: 13,
      flex: 0,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignContent: 'flex-start',
    },
    infoItem: {   // double columns item
      flex: 1,
      gap: 10,
    },
    fontBold: {
      fontWeight: 'bold',
    }
  })
  
  return (
    <>
      <View
        onPress={() => {
          navigation.dispatch(pushAction)
        }}
      >
        <ImageBackground
          resizeMode="cover"
          style={styles.backgroundImage}
          source={{
            uri: imageExists ? 
              `https://image.tmdb.org/t/p/w500${movie.backdrop_path}` : defaultImageUri,
          }}
        >
          <LinearGradient
            colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
            locations={[0.6, 0.8]}
            style={styles.gradientStyle}
          >
            <View style={styles.rateFavContainer}>
              <View style={styles.ratingWrapper}>
                <Text style={styles.movieTitle}>{movie.title}</Text>
                <View style={styles.starContainer}>
                  <FontAwesome name="star" size={16} color="yellow" />
                  <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
                </View>
              </View>
              <TouchableOpacity 
                style={styles.favoriteWrapper}
                onPress={() => { isFavorite ? removeFavorite(movie.id) : addFavorite(movie) }}
              >
                <FontAwesome name={ isFavorite ? "heart" : "heart-o" } size={32} color="red" />
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
      <View style={styles.overviewContainer}>
        <Text>{movie.overview}</Text>
        <View style={[styles.infoContainer, { marginTop: 13 }]}>
          <View style={styles.infoItem}>
            <Text style={styles.fontBold}>Original Language</Text>
            <Text>{movie.original_language}</Text>
            <Text style={styles.fontBold}>Release Date</Text>
            <Text>{movie.release_date}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.fontBold}>Popularity</Text>
            <Text>{movie.popularity}</Text>
            <Text style={styles.fontBold}>Vote Count</Text>
            <Text>{movie.vote_count}</Text>
          </View>
        </View>
      </View>
    </>
  )
}

const MovieDetail = ({ route }) => {
  const { id } = route.params
  const [movieDetail, setMovieDetail] = useState()
  
  useEffect(() => {
    getMovieDetail()
  }, [])
  
  const getMovieDetail = () => {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_ACCESS_TOKEN}`,
      },
    }

    fetch(url, options)
      .then(async (response) => await response.json())
      .then((response) => {
        setMovieDetail(response)
      })
      .catch((errorResponse) => {
        console.log(errorResponse)
      })
  }

  const recommendationProp = {
    title: 'Recommendations',
    path: `movie/${id}/recommendations?language=en-US&page=1`,
    coverType: 'poster',
  }

  return (
    <ScrollView>
      {movieDetail && 
        <MovieDetailHeading 
          movie={movieDetail} 
        />
      }
      <MovieList {...recommendationProp} />
    </ScrollView>
  )
}

export default MovieDetail
