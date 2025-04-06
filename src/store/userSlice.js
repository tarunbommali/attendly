// userSlice.js
import { createSlice } from "@reduxjs/toolkit";
// userSlice.js

const userSlice = createSlice({
    name: "loggedUser",
    initialState: {
      department: null,
      semester: null,
    },
    reducers: {
      setUserDetails: (state, action) => {
        state.department = action.payload.department;
        state.semester = action.payload.semester;
      },
      clearUserDetails: (state) => {
        state.department = null;
        state.semester = null;
      },
    },
  });
  
  export const { setUserDetails, clearUserDetails } = userSlice.actions;
  