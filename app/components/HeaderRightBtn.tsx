import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';
import React from 'react';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useDispatch} from 'react-redux';
import {cleanupFavorite} from '../services/favoriteMoviesSlice';

export const HeaderRightBtn = ({id}: {id: string}) => {
  const dispatch = useDispatch();
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  return (
    <TouchableOpacity
      style={styles.btn}
      onPress={() => {
        dispatch(cleanupFavorite(id));
        navigation.goBack();
      }}
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
