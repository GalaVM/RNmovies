import React from 'react';
import Config from 'react-native-config';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {blackText, gray, screenWidth} from '../styles/constants';
import {TrendingMovie} from '../services/trendingMoviesSlice';

const API_IMAGE_URI = Config.API_IMAGE_URL;

interface MovieItemProps {
  item: TrendingMovie;
  onPress: (movieId: string) => void;
  addFavorite?: (item: TrendingMovie) => void;
}
export const MovieItem = ({item, onPress, addFavorite}: MovieItemProps) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(item?.id)}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        {item?.imgUrl && (
          <Image
            style={styles.img}
            resizeMode="contain"
            source={{
              uri: `${API_IMAGE_URI}${item.imgUrl}`,
            }}
          />
        )}
        {item?.title && <Text style={styles.title}>{item.title}</Text>}
      </View>
      {addFavorite && (
        <TouchableOpacity
          style={styles.btnFavorite}
          onPress={() => addFavorite(item)}
        >
          <Text>Add to Favorite</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    borderBottomColor: gray,
    borderBottomWidth: 1,
    paddingVertical: 24,
  },
  contentContainer: {
    flexDirection: 'row',
  },

  img: {width: 180, height: 180, alignSelf: 'center'},
  title: {
    paddingTop: 12,
    paddingLeft: 12,
    fontWeight: '600',
    fontSize: 16,
    color: blackText,
    width: screenWidth * 0.46,
  },
  btnFavorite: {
    alignSelf: 'flex-end',
    paddingRight: 47,
  },
});
