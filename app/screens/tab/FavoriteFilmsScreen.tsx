import React from 'react';
import {Text} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {MovieItem} from '../../components/MovieItem';
import {RootContainer} from '../../components/RootContainer';
import {RootState} from '../../redux/rootReducer';
import {TrendingMovie} from '../../services/trendingMoviesSlice';

export const FavoriteFilmsScreen = () => {
  const {favoriteMovies} = useSelector((state: RootState) => state);

  return (
    <RootContainer>
      {favoriteMovies.length > 0 ? (
        <FlatList
          data={favoriteMovies}
          renderItem={({item}: {item: TrendingMovie}) => (
            <MovieItem item={item} onPress={() => {}} />
          )}
          keyExtractor={(item, index) => index.toString()}
          // contentContainerStyle={styles.list}
        />
      ) : (
        <Text>You have no favorite movies yet</Text>
      )}
    </RootContainer>
  );
};
