import { createSlice } from "@reduxjs/toolkit";

export const preloaderSlice = createSlice({
  name: "preloader",
  initialState: {
    start: false,
  },
  reducers: {
    setStart: (state, data) => {
      state.start = data.payload;
    },
  },
});

export const { setStart } = preloaderSlice.actions;
