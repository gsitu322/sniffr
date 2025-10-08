import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ViewType = "discover" | "messages";

export interface MessageThread {
  dogName: string;
  imageUrl: string;
}

interface UiState {
  currentView: ViewType;
  selectedThread: MessageThread | null;
}

const initialState: UiState = {
  currentView: "discover",
  selectedThread: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<ViewType>) => {
      state.currentView = action.payload;
    },
    setSelectedThread: (state, action: PayloadAction<MessageThread | null>) => {
      state.currentView = "messages";
      state.selectedThread = action.payload;
    },
  },
});

export const { setView, setSelectedThread } = uiSlice.actions;
export default uiSlice.reducer;
