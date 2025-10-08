import SidebarHeader from "./SidebarHeader";
import SidebarBanner from "./SidebarBanner";
import MessagesListItem from "./MessagesListItem";
import { useAppSelector, useAppDispatch } from "@/store/hooks";
import { setActiveThread, markThreadAsRead } from "@/store/messagesSlice";
import { setSelectedThread } from "@/store/uiSlice";
import { AnimatePresence, motion } from "framer-motion";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const threads = useAppSelector((state) => state.messages.threads);

  const handleMessageClick = (
    threadId: string,
    dogName: string,
    imageUrl: string
  ) => {
    // Update UI to show messages view
    dispatch(setSelectedThread({ dogName, imageUrl, message: "" }));

    // Set active thread in messages state
    dispatch(setActiveThread(threadId));

    // Mark as read
    dispatch(markThreadAsRead(threadId));
  };

  return (
    <aside className="w-full sm:w-80 sm:min-w-[400px] sm:max-w-md  dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 overflow-y-auto">
      <SidebarHeader />
      <SidebarBanner />
      <div className="pt-2 px-4">
        <h4 className="text-lg font-semibold">Messages</h4>
      </div>
      {Object.values(threads).length === 0 && (
        <div className="text-center text-gray-500 py-4">No messages yet</div>
      )}
      {Object.values(threads).map((thread) => (
        <AnimatePresence mode="wait">
          <motion.div
            key={thread.threadId}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <MessagesListItem
              key={thread.threadId}
              dogName={thread.dogName}
              imageUrl={thread.dogImage}
              message={thread.lastMessage}
              unreadCount={thread.unreadCount}
              onClick={() =>
                handleMessageClick(
                  thread.threadId,
                  thread.dogName,
                  thread.dogImage
                )
              }
            />
          </motion.div>
        </AnimatePresence>
      ))}
    </aside>
  );
}
