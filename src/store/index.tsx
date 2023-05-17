import { configureStore } from "@reduxjs/toolkit";

//reducers
import chatSlice from "./slices/chatSlice";

export const store = configureStore({
  reducer: {
    chatSlice,
  },
});
