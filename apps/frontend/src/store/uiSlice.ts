import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ViewType = "discover" | "messages";

interface UiState {
  currentView: ViewType;
}

const initialState: UiState = {
  currentView: "discover",
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<ViewType>) => {
      state.currentView = action.payload;
    },
  },
});

export const { setView } = uiSlice.actions;
export default uiSlice.reducer;
