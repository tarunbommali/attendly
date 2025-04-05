import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import sidebarReducer from "./sidebarSlice";
import graphSlice from "./graphSlice";
 const appStore = configureStore({
  reducer: {
     theme: themeReducer,
     sidebar: sidebarReducer, 
     graph: graphSlice, 
    },
});

export default appStore;