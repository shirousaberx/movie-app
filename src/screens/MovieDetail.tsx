import { API_ACCESS_TOKEN } from '@env'
import React, { useEffect, useState } from 'react'
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import { Movie, MovieItemProps } from '../types/app'
import { FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation, StackActions } from '@react-navigation/native'
import MovieList from '../components/movies/MovieList'

const MovieDetailHeading = ({ movie }: MovieItemProps): JSX.Element => {
  const navigation = useNavigation()
  const pushAction = StackActions.push('MovieDetail', { id: movie.id })

  const styles = StyleSheet.create({
    backgroundImage: {
      width: '100%',
      height: 200,
    },
    backgroundImageStyle: {

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
    },
    ratingContainer: {
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
    doubleColumnsContainer: {
      marginTop: 13,
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignContent: 'flex-start',
    },
    doubleColumnsItem: {
      width: '50%',
      height: 100,
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
          imageStyle={styles.backgroundImageStyle}
          source={{
            uri: `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`,
          }}
        >
          <LinearGradient
            colors={['#00000000', 'rgba(0, 0, 0, 0.7)']}
            locations={[0.6, 0.8]}
            style={styles.gradientStyle}
          >
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <View style={styles.ratingContainer}>
              <FontAwesome name="star" size={16} color="yellow" />
              <Text style={styles.rating}>{movie.vote_average.toFixed(1)}</Text>
            </View>
          </LinearGradient>
        </ImageBackground>
      </View>
      <View style={styles.overviewContainer}>
        <Text>{movie.overview}</Text>
        <View style={styles.doubleColumnsContainer}>
          <View style={styles.doubleColumnsItem}>
            <Text style={styles.fontBold}>Original Language</Text>
            <Text>{movie.original_language}</Text>
            <Text style={styles.fontBold}>Release Date</Text>
            <Text>{movie.release_date}</Text>
          </View>
          <View style={styles.doubleColumnsItem}>
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

const MovieDetail = ({ route }: any): JSX.Element => {
  const { id } = route.params
  const [movieDetail, setMovieDetail] = useState()
  
  useEffect(() => {
    console.log('id: ', id)
    getMovieDetail()
  }, [])
  
  const getMovieDetail = () => {
    const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_ACCESS_TOKEN}`,
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
