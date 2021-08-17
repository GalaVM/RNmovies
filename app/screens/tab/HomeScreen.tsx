import React, {useState, useCallback, useEffect} from 'react';
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import {Button, FlatList, StyleSheet, Text} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import {ScreenEnum} from '../types';
import {trendingMovieDay} from '../../api/trendingMovie';
import {
  cleanupMovies,
  setTrendingMovies,
  TrendingMovie,
} from '../../services/trendingMoviesSlice';
import {setLoading} from '../../services/loaderSlice';
import {RootState} from '../../redux/rootReducer';
import {ErrorToast} from '../../components/ErrorToast';
import {Loader} from '../../components/Loader';
import {MovieItem} from '../../components/MovieItem';
import {white} from '../../styles/constants';
import {LoaderActivityIndicator} from '../../components/LoaderActivityIndicator';
import {Title} from '../../components/Title';
import {useAsyncStorage} from '../../helpers/asyncStorage';
import {NETWORK_ERROR, TRENDING_MOVIES} from '../../helpers/constants';
import {RootContainer} from '../../components/RootContainer';
import {setFavoriteMovies} from '../../services/favoriteMoviesSlice';

export const HomeScreen = () => {
  const {loader, trendingMovies} = useSelector((state: RootState) => state);
  const {setStorageItem, getStorageItem, removeStorageItem} = useAsyncStorage();

  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [errorText, setErrorText] = useState<string>('');
  const [loadingMore, setLoadingMore] = useState(false);

  const [storageList, setStorageList] = useState([]);

  const getList = useCallback(async () => {
    dispatch(setLoading(true));
    const {data, error} = await trendingMovieDay(page);

    if (data) {
      dispatch(setTrendingMovies(data.results));
    }
    if (error) {
      if (error) {
        setErrorText(error?.message);
      }
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
      setErrorText(error?.message);
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

  useEffect(() => {
    const addStorage = async () => {
      await setStorageItem(TRENDING_MOVIES, trendingMovies);
    };
    addStorage();
  }, [setStorageItem, trendingMovies]);

  useEffect(() => {
    const getStorageData = async () => {
      const data = await getStorageItem(TRENDING_MOVIES);
      if (data) {
        setStorageList(data);
      } else {
        console.log('error getStorageItem');
      }
    };

    if (errorText === NETWORK_ERROR) {
      getStorageData();
    }
  }, [getStorageItem, errorText]);

  const isList = Boolean(storageList.length > 0 || trendingMovies.length > 0);

  const addFavorite = (item: TrendingMovie) => {
    dispatch(setFavoriteMovies(item));
  };

  return (
    <RootContainer>
      <Loader isLoading={loader} />
      <ErrorToast
        visible={!!errorText && errorText !== NETWORK_ERROR}
        handleClose={() => setErrorText('')}
        errorText={errorText}
      />
      <Button title={'get popular'} onPress={getList} />
      <Button
        title={'reset'}
        onPress={() => {
          setPage(1);
          removeStorageItem(TRENDING_MOVIES);
          dispatch(cleanupMovies());
        }}
      />
      <Button
        title={'Details'}
        onPress={() => navigation.navigate(ScreenEnum.DetailsScreen)}
      />
      <Title text={trendingMovies.length > 0 ? 'Popular movies:' : undefined} />
      {isList && (
        <FlatList
          data={trendingMovies.length > 0 ? trendingMovies : storageList}
          renderItem={({item}: {item: TrendingMovie}) => (
            <MovieItem
              item={item}
              onPress={() => {}}
              addFavorite={addFavorite}
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
      )}
      {storageList.length === 0 && errorText === NETWORK_ERROR && (
        <Text>Oops... something went wrong</Text>
      )}
    </RootContainer>
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
