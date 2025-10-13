"use client";

import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { addMessage } from "@/store/messagesSlice";
import { motion } from "framer-motion";
import { useState } from "react";

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
  const [newMessage, setNewMessage] = useState("");
  const activeThreadId = useAppSelector(
    (state) => state.messages.activeThreadId
  );
  const thread = useAppSelector((state) =>
    activeThreadId ? state.messages.threads[activeThreadId] : null
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeThreadId || !newMessage.trim()) return;

    const messageObj = {
      id: Date.now().toString(),
      content: newMessage.trim(),
      senderId: "currentUser",
      timestamp: new Date().toISOString(),
      read: true,
    };

    dispatch(addMessage({ threadId: activeThreadId, message: messageObj }));
    setNewMessage("");
    // TODO: Send via WebSocket
  };

  return (
    <motion.div
      key={`messages-${dogName}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      <div className="flex items-center gap-4 mb-6 pb-4 border-b">
        <img
          src={imageUrl}
          alt={dogName}
          className="w-16 h-16 object-cover rounded-full border-amber-400 border-2"
        />
        <h1 className="text-2xl font-bold">{dogName}</h1>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {thread?.messages.map((msg) => (
          <div
            key={msg.id}
            className={`p-4 rounded-lg max-w-xs ${
              msg.senderId === "currentUser"
                ? "bg-blue-500 text-white ml-auto"
                : "bg-gray-100 text-gray-900"
            }`}
          >
            <p>{msg.content}</p>
            <span className="text-xs opacity-75 mt-2 block">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </span>
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={`Message ${dogName}...`}
          className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={!newMessage.trim()}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Send
        </button>
      </form>
    </motion.div>
  );
}
