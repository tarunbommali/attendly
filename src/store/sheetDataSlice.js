import { createSlice } from "@reduxjs/toolkit";

const sheetDataSlice = createSlice({
  name: "sheetdata",
  initialState: {
    students: [], // initially empty
  },
  reducers: {
    setStudentData: (state, action) => {
      state.students = action.payload;
    },
  },
});

export const { setStudentData } = sheetDataSlice.actions;
export default sheetDataSlice.reducer;
