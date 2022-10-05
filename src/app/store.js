import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "../pages/pageSlice";

const rootReducer = {
  page: pageReducer,
};

const store = configureStore({ reducer: rootReducer });

export default store;
