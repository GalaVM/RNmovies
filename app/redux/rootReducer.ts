import {combineReducers} from '@reduxjs/toolkit';

export const rootReducer = combineReducers({
  filmList: (list = []) => {
    return list;
  },
});

export type RootState = ReturnType<typeof rootReducer>;
