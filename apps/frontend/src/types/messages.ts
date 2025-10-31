export interface Message {
  id: string;
  content: string;
  senderId: string;
  timestamp: string;
  read: boolean;
}

export interface MessageThread {
  id: string;
  dogName: string;
  dogImage: string;
  lastMessage: string;
  unreadCount: number;
  messages: Message[];
}

export interface MessageState {
  threads: Record<string, MessageThread>; // Key is thread id
  activeThreadId: string | null;
}
