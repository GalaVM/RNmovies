import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {TrendingMovieDay} from '../api/trendingMovie';

interface TrendingMovie {
  id: string;
  imgUrl: string | null;
  title: string;
}

const initialState: TrendingMovie[] = [];

const trendingMoviesSlice = createSlice({
  name: 'trendingMovies',
  initialState,
  reducers: {
    setTrendingMovies: (state, action: PayloadAction<TrendingMovieDay[]>) => {
      // return (state = action.payload.map((el: TrendingMovieDay) => {
      //   return {
      //     id: el?.id ? el.id.toString() : '',
      //     imgUrl: el?.poster_path ? el.poster_path : '',
      //     title: el?.original_title ? el.original_title : '',
      //   };
      // }));

      return [
        ...state,
        ...action.payload.map((el: TrendingMovieDay) => {
          return {
            id: el?.id ? el.id.toString() : '',
            imgUrl: el?.poster_path ? el.poster_path : '',
            title: el?.original_title ? el.original_title : '',
          };
        }),
      ];
    },

    cleanupMovies: () => {
      return initialState;
    },
  },
});

export const {setTrendingMovies, cleanupMovies} = trendingMoviesSlice.actions;

export const trendingMoviesReducer = trendingMoviesSlice.reducer;
