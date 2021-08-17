import {combineReducers} from '@reduxjs/toolkit';
import {errorReducer} from '../services/errorSlice';
import {favoriteMoviesReducer} from '../services/favoriteMoviesSlice';
import {loaderReducer} from '../services/loaderSlice';
import {trendingMoviesReducer} from '../services/trendingMoviesSlice';

export const rootReducer = combineReducers({
  trendingMovies: trendingMoviesReducer,
  favoriteMovies: favoriteMoviesReducer,
  loader: loaderReducer,
  error: errorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
