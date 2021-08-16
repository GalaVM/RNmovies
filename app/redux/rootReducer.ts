import {combineReducers} from '@reduxjs/toolkit';
import {errorReducer} from '../services/errorSlice';
import {loaderReducer} from '../services/loaderSlice';
import {trendingMoviesReducer} from '../services/trendingMoviesSlice';

export const rootReducer = combineReducers({
  trendingMovies: trendingMoviesReducer,
  loader: loaderReducer,
  error: errorReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
