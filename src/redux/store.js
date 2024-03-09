import { configureStore } from "@reduxjs/toolkit";
import listReducer from "./listSlice";
import filterSlice from "./filterSlice";

export const store = configureStore({
  reducer: {
    list: listReducer,
    filter: filterSlice,
  },
});
