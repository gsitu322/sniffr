import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// We can keep this for future UI state needs, but remove view switching
interface UiState {
  // Add future UI state here as needed
  sidebarCollapsed?: boolean;
}

const initialState: UiState = {};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    // Add future UI actions here as needed
    toggleSidebar: (state) => {
      state.sidebarCollapsed = !state.sidebarCollapsed;
    },
  },
});

export const { toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;
