"use client";

import ChatView from "@/components/messages/ChatView";
import { useAppSelector } from "@/store/hooks";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { setActiveThread, markThreadAsRead } from "@/store/messagesSlice";

export default function MessageThreadPage() {
  const params = useParams();
  const dispatch = useAppDispatch();
  const threadId = params.threadId as string;
  
  const thread = useAppSelector((state) => 
    threadId ? state.messages.threads[threadId] : null
  );

  useEffect(() => {
    if (threadId && thread) {
      dispatch(setActiveThread(threadId));
      dispatch(markThreadAsRead(threadId));
    }
  }, [threadId, thread, dispatch]);

  if (!thread) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600">Thread not found</h2>
          <p className="text-gray-500 mt-2">This conversation doesn't exist or has been deleted.</p>
        </div>
      </div>
    );
  }

  return (
    <ChatView
      dogName={thread.dogName}
      imageUrl={thread.dogImage}
      message={thread.lastMessage}
    />
  );
}
