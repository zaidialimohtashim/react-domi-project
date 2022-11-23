import { createSlice } from "@reduxjs/toolkit";

export const textureSlice = createSlice({
  name: "errors",
  initialState: {
    textures: [{ url: "", value: "", thumbnailURL: "" }],
  },
  reducers: {
    setErrors: (state, data) => {
      console.log(data);
      state.textures = data.payload;
    },
  },
});
