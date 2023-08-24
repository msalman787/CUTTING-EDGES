import { createSlice } from '@reduxjs/toolkit';

const apiLoaderSlice = createSlice({
  name: 'apiloader',
  initialState: {
    isLoading: false,
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    finishLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const { startLoading, finishLoading } = apiLoaderSlice.actions;

export default apiLoaderSlice.reducer;
