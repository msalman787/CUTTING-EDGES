
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './auth/authSlice';
import modelReducer from './model/modelSlice';
import apiLoaderReducer from './apiLoader/apiLoaderSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    model: modelReducer,
    apiloader: apiLoaderReducer,
  },
});

export default store;
