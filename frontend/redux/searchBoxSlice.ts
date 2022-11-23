import { createSlice } from "@reduxjs/toolkit";

//@ts-ignore

export const searchBoxSlice = createSlice({
  name: "Auth",
  initialState: {
    searchBox: "",
  },
  reducers: {
    setSearchVal: (state, data) => {
      state.searchBox = data.payload;
    },
  },
});
