import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export interface FavoriteMovie {
  id: string;
  imgUrl: string;
  title: string;
}

const initialState: FavoriteMovie[] = [];

const favoriteMoviesSlice = createSlice({
  name: 'favoriteMovies',
  initialState,
  reducers: {
    setFavoriteMovies: (state, action: PayloadAction<FavoriteMovie>) => {
      return [...state, action.payload];
    },
    cleanupFavorite: (state, action: PayloadAction<string>) => {
      return state.filter(
        (elem) => elem?.id.toString() !== action.payload.toString(),
      );
    },
  },
});

export const {setFavoriteMovies, cleanupFavorite} = favoriteMoviesSlice.actions;

export const favoriteMoviesReducer = favoriteMoviesSlice.reducer;
