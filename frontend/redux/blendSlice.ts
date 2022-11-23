import { createSlice } from "@reduxjs/toolkit";

export const blendSlice = createSlice({
  name: "errors",
  initialState: {
    blends: [{ url: "", value: "", thumbnailURL: "" }],
  },
  reducers: {
    setErrors: (state, data) => {
      console.log(data);
      state.blends = data.payload;
    },
  },
});
