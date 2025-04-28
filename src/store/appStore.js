import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import sidebarReducer from "./sidebarSlice";
import graphSlice from "./graphSlice";
import sheetDataReducer from './sheetDataSlice'
import userReducer from "./userSlice";

 const appStore = configureStore({
  reducer: {
     theme: themeReducer,
     sidebar: sidebarReducer, 
     graph: graphSlice, 
     loggedUser: userReducer,
     sheetdata: sheetDataReducer,


    },
});

export default appStore;