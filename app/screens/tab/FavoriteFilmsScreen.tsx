import React from 'react';

import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from '@react-navigation/native';

import {Text, StyleSheet} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {getMovieDetails} from '../../api/movieDetails';
import {MovieItem} from '../../components/MovieItem';
import {RootContainer} from '../../components/RootContainer';
import {RootState} from '../../redux/rootReducer';
import {TrendingMovie} from '../../services/trendingMoviesSlice';
import {ScreenEnum} from '../types';

export const FavoriteFilmsScreen = () => {
  const {favoriteMovies} = useSelector((state: RootState) => state);

  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const getDetails = async (id: string) => {
    const item = await getMovieDetails(id);
    if (item) {
      navigation.navigate(ScreenEnum.DetailsScreen, {
        item,
        isFavorite: true,
      });
    }
  };

  return (
    <RootContainer>
      {favoriteMovies.length > 0 ? (
        <FlatList
          data={favoriteMovies}
          renderItem={({item}: {item: TrendingMovie}) => (
            <MovieItem item={item} onPress={getDetails} />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text>You have no favorite movies yet</Text>
      )}
    </RootContainer>
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: 90,
  },
});
