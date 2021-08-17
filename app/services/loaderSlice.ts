import {createSlice, PayloadAction} from '@reduxjs/toolkit';

type Loader = boolean;

const initialState: Loader = false;

const loaderSlice = createSlice({
  name: 'loader',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      return (state = action.payload);
    },
  },
});

export const {setLoading} = loaderSlice.actions;
export const loaderReducer = loaderSlice.reducer;
