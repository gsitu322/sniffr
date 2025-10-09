import { INITIAL_MESSAGES } from "@/constants/discover";
import type { Message } from "@/types/messages";

// Get a random initial message content
const getInitialMessageContent = () => {
  return INITIAL_MESSAGES[Math.floor(Math.random() * INITIAL_MESSAGES.length)];
};

// 50% change that the inital message comes from the dog
export const getInitialMessage = (): Message[] => {
  return Math.random() < 0.5
    ? [
        {
          id: Date.now().toString(),
          content: getInitialMessageContent(),
          senderId: "system",
          timestamp: new Date().toISOString(),
          read: false,
        } as Message,
      ]
    : [];
};
