import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uniqueIds: [],
  items: [],
  currentPage: 1,
  totalPages: 0,
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
  },
});

export const { setUniqueIds, setItems, setCurrentPage, setTotalPages } =
  listSlice.actions;

export default listSlice.reducer;
