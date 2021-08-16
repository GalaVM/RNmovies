import React from 'react';
import Config from 'react-native-config';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {blackText, gray, screenWidth} from '../styles/constants';

const API_IMAGE_URI = Config.API_IMAGE_URL;

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
            uri: `${API_IMAGE_URI}${imagePath}`,
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
