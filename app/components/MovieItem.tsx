import React from 'react';
import {View, Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {blackText, gray, screenWidth} from '../styles/constants';

interface MovieItemProps {
  imagePath: string | null;
  title: string;
  movieId: string;
  onPress: (movieId: string) => void;
}
export const MovieItem = ({
  imagePath,
  title,
  onPress,
  movieId,
}: MovieItemProps) => {
  return (
    <TouchableOpacity onPress={() => onPress(movieId)} style={styles.container}>
      {imagePath && (
        <Image
          style={styles.img}
          resizeMode="contain"
          source={{
            uri: `https://image.tmdb.org/t/p/w500${imagePath}`,
          }}
        />
      )}
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    flexDirection: 'row',
    borderBottomColor: gray,
    borderBottomWidth: 1,
    paddingVertical: 24,
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
});
