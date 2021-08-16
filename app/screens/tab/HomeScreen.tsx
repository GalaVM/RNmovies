import React, {useState} from 'react';
import {
  useNavigation,
  NavigationProp,
  ParamListBase,
} from '@react-navigation/native';
import {Button, SafeAreaView} from 'react-native';
import {useDispatch} from 'react-redux';

import {ScreenEnum} from '../types';
import {trendingMovieDay} from '../../api/trendingMovie';
import {setTrendingMovies} from '../../services/trendingMoviesSlice';
import {setLoading} from '../../services/loaderSlice';

export const HomeScreen = () => {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const getList = async () => {
    dispatch(setLoading(true));

    const {data, error} = await trendingMovieDay(page);

    if (data) {
      dispatch(setTrendingMovies(data.results));
      console.log('data', data);
    } else {
      console.log('error!!!', error);
    }

    dispatch(setLoading(false));
  };

  return (
    <SafeAreaView>
      <Button title={'get popular'} onPress={getList} />
      <Button
        title={'Details'}
        onPress={() => navigation.navigate(ScreenEnum.DetailsScreen)}
      />
      {/* <FlatList /> */}
    </SafeAreaView>
  );
};
