import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState = {};

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      return (state = {
        message: action.payload,
      });
    },
    resetError: () => {
      return initialState;
    },
  },
});

export const {setError} = errorSlice.actions;
export const errorReducer = errorSlice.reducer;
