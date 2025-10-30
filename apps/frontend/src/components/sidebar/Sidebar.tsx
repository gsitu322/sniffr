import SidebarHeader from "./SidebarHeader";
import SidebarBanner from "./SidebarBanner";
import MessagesListItem from "./MessagesListItem";
import { useAppSelector } from "@/store/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import MessagesRealtime from "../messages/MessagesRealtime";
import { useEffect, useRef, useState } from "react";
import { setThreads } from "@/store/messagesSlice";
import { useAppDispatch } from "@/store/hooks";

export default function Sidebar() {
  const router = useRouter();
  const threads = useAppSelector((state) => state.messages.threads);
  const dispatch = useAppDispatch();
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const hasLoadedRef = useRef(false);

  const handleMessageClick = (threadId: string) => {
    // Navigate to the specific message thread
    router.push(`/messages/${threadId}`);
  };

  useEffect(() => {
    // Only fetch once
    if (hasLoadedRef.current) return;
    hasLoadedRef.current = true;

    fetch("/api/threads?userId=1")
      .then((response) => response.json())
      .then((data) => {
        console.log("threads from backend", data);
        dispatch(setThreads(data));
        setIsLoading(false);
        // After initial load completes, enable animations for future updates
        setTimeout(() => {
          setIsInitialLoad(false);
        }, 100);
      })
      .catch((error) => {
        console.error("Error fetching threads:", error);
        setIsLoading(false);
      });
  }, [dispatch]);

  return (
    <aside className="w-full sm:w-80 sm:min-w-[400px] sm:max-w-md  dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
      <MessagesRealtime />

      <SidebarHeader />
      <SidebarBanner />
      <div className="pt-2 px-4">
        <h4 className="text-lg font-semibold">Messages</h4>
      </div>
      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <div className="w-8 h-8 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      )}
      {!isLoading && Object.values(threads).length === 0 && (
        <div className="text-center text-gray-500 py-4">No messages yet</div>
      )}
      {!isLoading && (
        <AnimatePresence>
          {Object.values(threads).map((thread) => (
            <motion.div
              key={thread.threadId}
              initial={isInitialLoad ? false : { opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={isInitialLoad ? { duration: 0 } : { duration: 0.3 }}
            >
              <MessagesListItem
                key={thread.threadId}
                dogName={thread.dogName}
                imageUrl={thread.dogImage}
                message={thread.lastMessage}
                unreadCount={thread.unreadCount}
                onClick={() => handleMessageClick(thread.threadId)}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      )}
    </aside>
  );
}
