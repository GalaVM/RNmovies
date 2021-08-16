import React, {useState, useCallback, useEffect} from 'react';
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import {Button, SafeAreaView, FlatList, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {ScreenEnum} from '../types';
import {trendingMovieDay} from '../../api/trendingMovie';
import {
  cleanupMovies,
  setTrendingMovies,
} from '../../services/trendingMoviesSlice';
import {setLoading} from '../../services/loaderSlice';
import {RootState} from '../../redux/rootReducer';
import {ErrorToast} from '../../components/ErrorToast';
import {Loader} from '../../components/Loader';
import {MovieItem} from '../../components/MovieItem';
import {white} from '../../styles/constants';
import {LoaderActivityIndicator} from '../../components/LoaderActivityIndicator';
import {Title} from '../../components/Title';

export const HomeScreen = () => {
  const {loader, trendingMovies} = useSelector((state: RootState) => state);
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [errorText, setErrorText] = useState<string>('');
  const [loadingMore, setLoadingMore] = useState(false);

  const getList = useCallback(async () => {
    dispatch(setLoading(true));
    const {data, error} = await trendingMovieDay(page);

    if (data) {
      dispatch(setTrendingMovies(data.results));
    }
    if (error) {
      setErrorText(error.message);
    }

    dispatch(setLoading(false));
  }, [dispatch, page]);

  const handleLoadMore = useCallback(async () => {
    setLoadingMore(true);
    const {data, error} = await trendingMovieDay(page);

    if (data) {
      dispatch(setTrendingMovies(data.results));
    }
    if (error) {
      setErrorText(error.message);
    }
    setLoadingMore(false);
  }, [dispatch, page]);

  useEffect(() => {
    if (page === 1) {
      getList();
    }
    if (page > 1) {
      handleLoadMore();
    }
  }, [getList, handleLoadMore, page]);

  return (
    <SafeAreaView style={styles.container}>
      <Loader isLoading={loader} />
      <ErrorToast
        visible={!!errorText}
        handleClose={() => setErrorText('')}
        errorText={errorText}
      />
      <Button title={'get popular'} onPress={getList} />
      <Button
        title={'reset'}
        onPress={() => {
          setPage(1);
          dispatch(cleanupMovies());
        }}
      />
      <Button
        title={'Details'}
        onPress={() => navigation.navigate(ScreenEnum.DetailsScreen)}
      />
      <Title text={trendingMovies.length > 0 ? 'Popular movies:' : undefined} />
      <FlatList
        data={trendingMovies}
        renderItem={({item}) => (
          <MovieItem
            movieId={item.id}
            title={item.title}
            imagePath={item.imgUrl}
            onPress={() => {}}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={() => setPage(page + 1)}
        onEndReachedThreshold={0}
        contentContainerStyle={styles.list}
        ListFooterComponent={
          <LoaderActivityIndicator loadingMore={loadingMore} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
  },
  list: {
    paddingBottom: 90,
  },
});
