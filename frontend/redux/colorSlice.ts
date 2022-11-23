import { createSlice } from "@reduxjs/toolkit";

export const colorSlice = createSlice({
  name: "errors",
  initialState: {
    colors: [{ url: "", value: "", thumbnailURL: "" }],
  },
  reducers: {
    setErrors: (state, data) => {
      console.log(data);
      state.colors = data.payload;
    },
  },
});
