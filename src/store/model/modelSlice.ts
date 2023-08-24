// path/to/modelSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isValidate: false,
  description: "",
};

const modelSlice = createSlice({
  name: 'model',
  initialState,
  reducers: {
    showModal(state, action) {
      state.isValidate = true;
      state.description = action.payload.description;
    },
    hideModal(state) {
      state.isValidate = false;
      state.description = ""; 
    },
  },
});

// Export the action creators
export const { showModal, hideModal } = modelSlice.actions;

// Export the reducer
export default modelSlice.reducer;
