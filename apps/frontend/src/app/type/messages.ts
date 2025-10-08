export interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
  read: boolean;
}

export interface MessageThread {
  threadId: string;
  dogName: string;
  dogImage: string;
  lastMessage: string;
  unreadCount: number;
  messages: Message[];
}

export interface MessageState {
  threads: Record<string, MessageThread>; // Key is threadId
  activeThreadId: string | null;
}