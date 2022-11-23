import { createSlice } from "@reduxjs/toolkit";

export const errorSlice = createSlice({
  name: "errors",
  initialState: {
    error: "",
  },
  reducers: {
    setErrors: (state, data) => {
      console.log(data);
      state.error = data.payload;
    },
  },
});
