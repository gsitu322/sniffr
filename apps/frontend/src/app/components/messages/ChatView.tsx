"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addMessage } from "@/store/messagesSlice";
import { motion } from "framer-motion";

interface ChatViewProps {
  dogName: string;
  imageUrl: string;
  message: string;
}

export default function ChatView({
  dogName,
  imageUrl,
  message,
}: ChatViewProps) {
  const dispatch = useAppDispatch();
  const activeThreadId = useAppSelector(
    (state) => state.messages.activeThreadId
  );
  const thread = useAppSelector((state) =>
    activeThreadId ? state.messages.threads[activeThreadId] : null
  );

  const handleSendMessage = (content: string) => {
    if (!activeThreadId) return;

    const newMessage = {
      id: Date.now().toString(),
      content,
      senderId: "currentUser",
      timestamp: new Date().toISOString(),
      read: true,
    };

    dispatch(addMessage({ threadId: activeThreadId, message: newMessage }));
    // TODO: Send via WebSocket
  };

  return (
    <motion.div
      key={`messages-${dogName}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-4 mb-6 pb-4 border-b">
        <img
          src={imageUrl}
          alt={dogName}
          className="w-16 h-16 object-cover rounded-full border-amber-400 border-2"
        />
        <h1 className="text-2xl font-bold">Chat with {dogName}</h1>
      </div>
      <div className="space-y-4">
        {thread?.messages.map((msg) => (
          <div key={msg.id} className="bg-gray-100 p-4 rounded-lg">
            <p>{msg.content}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
