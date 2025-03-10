import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./themeSlice";
import sidebarReducer from "./sidebarSlice";
const appStore = configureStore({
  reducer: {
    theme: themeReducer,
     sidebar: sidebarReducer, 

  },
});

export default appStore;