import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uniqueIds: [],
  items: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: true,
};

export const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setUniqueIds: (state, action) => {
      state.uniqueIds = action.payload;
    },
    setItems: (state, action) => {
      state.items = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setTotalPages: (state, action) => {
      state.totalPages = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setUniqueIds,
  setItems,
  setCurrentPage,
  setTotalPages,
  setIsLoading,
} = listSlice.actions;

export default listSlice.reducer;
