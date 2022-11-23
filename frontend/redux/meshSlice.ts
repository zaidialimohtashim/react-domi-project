import { createSlice } from "@reduxjs/toolkit";

export const meshSlice = createSlice({
  name: "errors",
  initialState: {
    meshes: [{ url: "", value: "", thumbnailURL: "" }],
  },
  reducers: {
    setErrors: (state, data) => {
      console.log(data);
      state.meshes = data.payload;
    },
  },
});
