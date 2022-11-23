import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//@ts-ignore
const user = JSON.parse(localStorage.getItem("user"));
export const authSlice = createSlice({
  name: "Auth",
  initialState: {
    user: user ?? {},
  },
  reducers: {
    setToken: (state, data) => {
      localStorage.setItem("user", JSON.stringify(data.payload));
      state.user = data.payload;
      axios.defaults.headers.common["Authorization"] = data.payload.token;
    },
  },
});

export const { setToken } = authSlice.actions;
