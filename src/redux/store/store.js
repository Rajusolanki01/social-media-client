import { configureStore } from "@reduxjs/toolkit";
import appConfigReducer from "../slices/appConfigStore";
import postsReducer from "../slices/postSlices";
import feedDataReducer from "../slices/feedSlice";


const store = configureStore({
  reducer: {
    appConfigReducer,
    postsReducer,
    feedDataReducer,
  }
});

export default store;