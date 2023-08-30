import { configureStore } from "@reduxjs/toolkit";
import { filterReducer } from "../src/reducers/anecdoteReducer";
import anecdoteReducer from "../src/reducers/anecdoteReducer";

const store = configureStore({
  reducer: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
  },
});

export default store;
