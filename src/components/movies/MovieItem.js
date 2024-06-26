import React from 'react'
import { ImageBackground, Text, StyleSheet, View, TouchableOpacity } from 'react-native'
import { FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation, StackActions } from '@react-navigation/native'

const MovieItem = ({ movie, size, coverType, backgroundImageStyle }) => {
  const navigation = useNavigation()
  const pushAction = StackActions.push('MovieDetail', { id: movie.id })
  
  const imageExists = Boolean(movie.backdrop_path) || Boolean(movie.poster_path)
  const defaultImageUri = 'https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=612x612&w=0&k=20&c=_zOuJu755g2eEUioiOUdz_mHKJQJn-tDgIAhQzyeKUQ='

  const styles = StyleSheet.create({
    backgroundImage: {
      ...backgroundImageStyle
    },
    backgroundImageStyle: {
      borderRadius: 8,
    },
    movieTitle: {
      color: 'white',
    },
    gradientStyle: {
      padding: 8,
      height: '100%',
      width: '100%',
      borderRadius: 8,
      display: 'flex',
      justifyContent: 'flex-end',
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 2,
    },
    rating: {
      color: 'yellow',
      fontWeight: '700',
    },
  })

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.dispatch(pushAction)
      }}
    >
      <ImageBackground
        resizeMode="cover"
        style={[size, styles.backgroundImage]}
        imageStyle={styles.backgroundImageStyle}
        source={{
          uri: imageExists ? `https://image.tmdb.org/t/p/w500${
            coverType === 'backdrop' ? movie.backdrop_path : movie.poster_path
          }` : defaultImageUri,
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
    </TouchableOpacity>
  )
}

export default MovieItem