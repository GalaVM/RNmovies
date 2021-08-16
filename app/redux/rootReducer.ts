import {combineReducers} from '@reduxjs/toolkit';
import {loaderReducer} from '../services/loaderSlice';
import {trendingMoviesReducer} from '../services/trendingMoviesSlice';

export const rootReducer = combineReducers({
  filmList: (arr = []) => {
    return arr;
  },
  trendingMovies: trendingMoviesReducer,
  loader: loaderReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
