"use client";

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
        <div className="bg-gray-100 p-4 rounded-lg max-w-md">
          <p>{message}</p>
        </div>
        {/* Add more chat messages here */}
      </div>
    </motion.div>
  );
}
