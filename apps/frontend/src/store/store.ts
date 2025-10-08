import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./uiSlice";
import messagesReducer from "./messagesSlice";

export const store = configureStore({
  reducer: {
    ui: uiReducer,
    messages: messagesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
