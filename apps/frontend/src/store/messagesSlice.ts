import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MessageState } from "@/types/messages";
import { Message, MessageThread } from "@/types/messages";

// Setup Initial State
const initialState: MessageState = {
  threads: {},
  activeThreadId: null,
};

// Create Slice
const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    // Set active thread
    setActiveThread: (state, action: PayloadAction<string>) => {
      state.activeThreadId = action.payload;
    },
    // Add or update a thread
    upsertThread: (state, action: PayloadAction<MessageThread>) => {
      state.threads[action.payload.id] = action.payload;
    },

    // Add a message to a thread
    addMessage: (
      state,
      action: PayloadAction<{ threadId: string; message: Message }>
    ) => {
      const { threadId, message } = action.payload;

      if (!state.threads[threadId]) {
        // Create thread if doesn't exist
        state.threads[threadId] = {
          id: threadId,
          dogName: "Unknown",
          dogImage: "",
          lastMessage: message.content,
          unreadCount: 0,
          messages: [],
        };
      }

      state.threads[threadId].messages.push(message);
      state.threads[threadId].lastMessage = message.content;

      // Increment unread if not active thread
      if (state.activeThreadId !== threadId) {
        state.threads[threadId].unreadCount += 1;
      }
    },

    // Mark thread as read
    markThreadAsRead: (state, action: PayloadAction<string>) => {
      const threadId = action.payload;
      if (state.threads[threadId]) {
        state.threads[threadId].unreadCount = 0;
        state.threads[threadId].messages.forEach((msg) => {
          msg.read = true;
        });
      }
    },

    // Load all threads (from initial fetch)
    // Converts array from API to Record keyed by thread id
    setThreads: (state, action: PayloadAction<MessageThread[]>) => {
      // Convert array to object keyed by thread id
      const threadsMap: Record<string, MessageThread> = {};
      action.payload.forEach((thread) => {
        threadsMap[thread.id] = thread;
      });

      state.threads = threadsMap;
    },

    // Clear all messages (logout)
    clearMessages: (state) => {
      state.threads = {};
      state.activeThreadId = null;
    },
  },
});

export const {
  setActiveThread,
  upsertThread,
  addMessage,
  markThreadAsRead,
  setThreads,
  clearMessages,
} = messagesSlice.actions;

export default messagesSlice.reducer;
