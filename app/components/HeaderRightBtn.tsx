import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {cleanupFavorite} from '../services/favoriteMoviesSlice';

export const HeaderRightBtn = () => {
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={() => dispatch(cleanupFavorite())}
    >
      <Text>Clean</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  btn: {
    paddingHorizontal: 16,
  },
});
