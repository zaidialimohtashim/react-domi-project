import {
  createSlice,
  createAsyncThunk,
  configureStore,
} from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import { errorSlice } from "./errorSlice";
import { textureSlice } from "./textureSlice";
import { meshSlice } from "./meshSlice";
import { colorSlice } from "./colorSlice";
import { blendSlice } from "./blendSlice";
import { preloaderSlice } from "./preloaderSlice";
export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    errors: errorSlice.reducer,
    preloader: preloaderSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
