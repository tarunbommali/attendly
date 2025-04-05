// src/redux/slices/graphSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  studentData: [], 
};

const graphSlice = createSlice({
  name: 'graphData',
  initialState,
  reducers: {
    setStudentData: (state, action) => {
      state.studentData = action.payload;
    },
  },
});

export const { setStudentData } = graphSlice.actions;
export default graphSlice.reducer;
