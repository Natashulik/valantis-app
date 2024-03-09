import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  category: "",
  brand: "",
  priceFrom: 0,
  priceTo: 0,
  uniqueFilteredIds: [],
  filteredItems: [],
  filteredTotalPages: 1,
  setPriceArr: [],
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setBrand: (state, action) => {
      state.brand = action.payload;
    },
    setPriceFrom: (state, action) => {
      state.priceFrom = action.payload;
    },
    setPriceTo: (state, action) => {
      state.priceTo = action.payload;
    },
    setUniqueFilteredIds: (state, action) => {
      state.uniqueFilteredIds = action.payload;
    },
    setFilteredItems: (state, action) => {
      state.filteredItems = action.payload;
    },
    setFilteredTotalPages: (state, action) => {
      state.filteredTotalPages = action.payload;
    },
    setPriceArr: (state, action) => {
      state.priceArr = action.payload;
    },
  },
});

export const {
  setCategory,
  setBrand,
  setPriceFrom,
  setPriceTo,
  setFilteredItems,
  setUniqueFilteredIds,
  setFilteredTotalPages,
  setPriceArr,
} = filterSlice.actions;

export default filterSlice.reducer;
